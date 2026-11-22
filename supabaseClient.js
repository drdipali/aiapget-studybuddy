/**
 * Supabase Client & Cloud Sync Adapter for AIAPGET StudyBuddy
 * 
 * By default, AIAPGET StudyBuddy runs 100% offline using localStorage.
 * When the student wants multi-device sync or cloud backup, they can simply
 * enter their Supabase Project URL and Anon Public Key in Settings or set them below.
 * 
 * Recommended Supabase SQL Table Schema:
 * ---------------------------------------
 * create table public.user_study_data (
 *   id uuid references auth.users not null primary key,
 *   payload jsonb not null,
 *   updated_at timestamp with time zone default timezone('utc'::text, now()) not null
 * );
 * alter table public.user_study_data enable row level security;
 * create policy "User can read own study data" on public.user_study_data for select using (auth.uid() = id);
 * create policy "User can insert/update own study data" on public.user_study_data for all using (auth.uid() = id);
 */

const SupabaseSync = (() => {
  const STORAGE_KEY_CONFIG = 'aiapget_supabase_config';

  // Load configured keys from localStorage if saved
  function getConfig() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_CONFIG);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return {
      url: '',
      anonKey: '',
      enabled: false,
      lastSync: null
    };
  }

  function saveConfig(cfg) {
    localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(cfg));
  }

  function isConfigured() {
    const cfg = getConfig();
    return Boolean(cfg.enabled && cfg.url && cfg.anonKey);
  }

  /**
   * Minimal lightweight REST client to avoid heavy SDK dependencies
   */
  async function makeRequest(endpoint, method = 'GET', body = null, token = null) {
    const cfg = getConfig();
    if (!cfg.url || !cfg.anonKey) {
      throw new Error('Supabase is not configured.');
    }

    const headers = {
      'apikey': cfg.anonKey,
      'Content-Type': 'application/json'
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    } else {
      headers['Authorization'] = `Bearer ${cfg.anonKey}`;
    }

    const url = `${cfg.url.replace(/\/$/, '')}/rest/v1/${endpoint}`;
    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Supabase request failed: ${response.status} ${errText}`);
    }

    return response.json();
  }

  /**
   * Push local state to Supabase
   */
  async function pushStudyData(appData, userId, userToken) {
    if (!isConfigured()) return { success: false, reason: 'Not configured' };
    try {
      const cfg = getConfig();
      const payload = {
        id: userId,
        payload: appData,
        updated_at: new Date().toISOString()
      };

      await makeRequest('user_study_data', 'POST', payload, userToken);
      cfg.lastSync = new Date().toISOString();
      saveConfig(cfg);
      return { success: true, timestamp: cfg.lastSync };
    } catch (err) {
      console.warn('Supabase sync push failed:', err);
      return { success: false, error: err.message };
    }
  }

  /**
   * Pull latest study state from Supabase
   */
  async function pullStudyData(userId, userToken) {
    if (!isConfigured()) return null;
    try {
      const rows = await makeRequest(`user_study_data?id=eq.${userId}&select=*`, 'GET', null, userToken);
      if (rows && rows.length > 0) {
        return rows[0].payload;
      }
      return null;
    } catch (err) {
      console.warn('Supabase sync pull failed:', err);
      return null;
    }
  }

  return {
    getConfig,
    saveConfig,
    isConfigured,
    pushStudyData,
    pullStudyData
  };
})();

// Export globally for browser & module environments
if (typeof window !== 'undefined') {
  window.SupabaseSync = SupabaseSync;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SupabaseSync;
}
