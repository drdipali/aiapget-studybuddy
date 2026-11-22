/**
 * AIAPGET StudyBuddy - Core Application Logic
 * Dark-Midnight Academic Architecture with Per-User Multi-Account Persistence,
 * Sthana Picker, Dynamic Countdown, Spaced Repetition, and Focus DND Mode.
 */

// Storage Keys
const USERS_LIST_KEY = 'aiapget_users_list';
const ACTIVE_USER_KEY = 'aiapget_active_user_id';
const DEFAULT_DEMO_USER_ID = 'demo-ananya';

// Auto-roll tentative exam date to May 30 of upcoming cycle
function getDefaultExamDate() {
  const now = new Date();
  const currentYear = now.getFullYear();
  // May is month index 4 (0-based)
  const tentativeThisYear = new Date(currentYear, 4, 30, 23, 59, 59);
  if (now > tentativeThisYear) {
    return `${currentYear + 1}-05-30`;
  }
  return `${currentYear}-05-30`;
}

function getTodayString() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function addDaysToDate(dateStr, days) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  date.setDate(date.getDate() + days);
  const rY = date.getFullYear();
  const rM = String(date.getMonth() + 1).padStart(2, '0');
  const rD = String(date.getDate()).padStart(2, '0');
  return `${rY}-${rM}-${rD}`;
}

function createDefaultUserData(userName = 'Dr. Ananya Sharma') {
  return {
    examDate: getDefaultExamDate(),
    revisionBufferDays: 30,
    targetDailyHours: 6.0,
    targetDailyMcq: 100,
    todayStudyMinutes: 150, // 2.5 hours pre-seeded
    todayMcqSolved: 40,     // 40 MCQs pre-seeded
    lastActiveDate: getTodayString(),
    revisionIntervals: [...DEFAULT_REVISION_INTERVALS],
    syllabus: JSON.parse(JSON.stringify(DEFAULT_SYLLABUS)),
    revisions: getPreSeededRevisions(),
    history: []
  };
}

const AppState = {
  currentUser: null,
  users: [],
  data: createDefaultUserData(),

  init() {
    this.loadUsers();
    const activeId = localStorage.getItem(ACTIVE_USER_KEY);

    if (activeId && this.users.some(u => u.id === activeId)) {
      this.currentUser = this.users.find(u => u.id === activeId);
      this.loadUserData(this.currentUser.id);
    } else {
      // Default to quick demo user on first launch
      this.quickDemoLogin(false);
    }

    this.checkDayRollover();
  },

  loadUsers() {
    try {
      const raw = localStorage.getItem(USERS_LIST_KEY);
      this.users = raw ? JSON.parse(raw) : [];
      if (!this.users.some(u => u.id === DEFAULT_DEMO_USER_ID)) {
        this.users.unshift({
          id: DEFAULT_DEMO_USER_ID,
          name: 'Dr. Ananya Sharma',
          email: 'ananya.bams@ayush.in',
          targetYear: '2027',
          role: 'AIAPGET Aspirant',
          avatar: '🌿'
        });
        localStorage.setItem(USERS_LIST_KEY, JSON.stringify(this.users));
      }
    } catch (e) {
      this.users = [{
        id: DEFAULT_DEMO_USER_ID,
        name: 'Dr. Ananya Sharma',
        email: 'ananya.bams@ayush.in',
        targetYear: '2027',
        role: 'AIAPGET Aspirant',
        avatar: '🌿'
      }];
    }
  },

  loadUserData(userId) {
    try {
      const userKey = `aiapget_userdata_${userId}`;
      const raw = localStorage.getItem(userKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        this.data = {
          ...createDefaultUserData(this.currentUser?.name),
          ...parsed,
          syllabus: parsed.syllabus && parsed.syllabus.length > 0 ? parsed.syllabus : JSON.parse(JSON.stringify(DEFAULT_SYLLABUS)),
          revisions: parsed.revisions || getPreSeededRevisions(),
          revisionIntervals: parsed.revisionIntervals || [...DEFAULT_REVISION_INTERVALS]
        };
      } else {
        // Initialize fresh user data
        this.data = createDefaultUserData(this.currentUser?.name);
        this.save();
      }
    } catch (e) {
      console.warn('Could not load user data, creating default', e);
      this.data = createDefaultUserData();
    }
  },

  save() {
    if (!this.currentUser) return;
    try {
      const userKey = `aiapget_userdata_${this.currentUser.id}`;
      localStorage.setItem(userKey, JSON.stringify(this.data));
      localStorage.setItem(ACTIVE_USER_KEY, this.currentUser.id);

      // Optional Supabase background sync with userId
      if (window.SupabaseSync && window.SupabaseSync.isConfigured()) {
        window.SupabaseSync.pushStudyData(this.data, this.currentUser.id, null).catch(() => {});
      }
    } catch (e) {
      console.error('Failed to save user data', e);
    }
  },

  loginUser(name, email, targetYear = '2027') {
    if (!name || !email) {
      showToast('Name and email are required', 'warning');
      return false;
    }

    let existing = this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!existing) {
      existing = {
        id: 'user-' + Date.now(),
        name: name.trim(),
        email: email.trim().toLowerCase(),
        targetYear: targetYear,
        role: 'AIAPGET Aspirant',
        avatar: '🎓'
      };
      this.users.push(existing);
      localStorage.setItem(USERS_LIST_KEY, JSON.stringify(this.users));
    }

    this.currentUser = existing;
    localStorage.setItem(ACTIVE_USER_KEY, existing.id);
    this.loadUserData(existing.id);
    this.checkDayRollover();
    renderAll();
    closeModal('modal-onboarding');
    closeModal('modal-profile');
    showToast(`Welcome, ${existing.name}!`, 'success');
    return true;
  },

  quickDemoLogin(showNotification = true) {
    let demoUser = this.users.find(u => u.id === DEFAULT_DEMO_USER_ID);
    if (!demoUser) {
      demoUser = {
        id: DEFAULT_DEMO_USER_ID,
        name: 'Dr. Ananya Sharma',
        email: 'ananya.bams@ayush.in',
        targetYear: '2027',
        role: 'AIAPGET Aspirant',
        avatar: '🌿'
      };
      this.users.unshift(demoUser);
      localStorage.setItem(USERS_LIST_KEY, JSON.stringify(this.users));
    }

    this.currentUser = demoUser;
    localStorage.setItem(ACTIVE_USER_KEY, demoUser.id);
    this.loadUserData(demoUser.id);
    this.checkDayRollover();
    renderAll();
    closeModal('modal-onboarding');
    closeModal('modal-profile');
    if (showNotification) {
      showToast('Logged in as Dr. Ananya Sharma (Demo)', 'success');
    }
  },

  switchUser(userId) {
    const user = this.users.find(u => u.id === userId);
    if (!user) return;
    this.currentUser = user;
    localStorage.setItem(ACTIVE_USER_KEY, user.id);
    this.loadUserData(user.id);
    this.checkDayRollover();
    renderAll();
    closeModal('modal-profile');
    showToast(`Switched account to ${user.name}`, 'info');
  },

  logoutUser() {
    this.currentUser = null;
    localStorage.removeItem(ACTIVE_USER_KEY);
    openOnboardingModal();
  },

  checkDayRollover() {
    const today = getTodayString();
    if (this.data.lastActiveDate !== today) {
      if (this.data.todayStudyMinutes > 0 || this.data.todayMcqSolved > 0) {
        this.data.history.push({
          date: this.data.lastActiveDate,
          minutes: this.data.todayStudyMinutes,
          mcq: this.data.todayMcqSolved
        });
      }
      this.data.lastActiveDate = today;
      this.data.todayStudyMinutes = 0;
      this.data.todayMcqSolved = 0;
      this.save();
    }
  },

  resetAll(useSampleData = true) {
    if (useSampleData) {
      this.data = createDefaultUserData(this.currentUser?.name);
    } else {
      this.data = createDefaultUserData(this.currentUser?.name);
      this.data.todayStudyMinutes = 0;
      this.data.todayMcqSolved = 0;
      this.data.syllabus.forEach(cat => {
        cat.topics.forEach(t => {
          t.completed = false;
          if (t.subtopics) t.subtopics.forEach(st => st.completed = false);
        });
      });
      this.data.revisions = [];
      this.data.history = [];
    }
    this.save();
    renderAll();
    showToast(useSampleData ? 'Reset to sample data' : 'Cleared all data for this account', 'success');
  }
};

// ==========================================
// 2. PACE & COUNTDOWN ENGINE
// ==========================================

function calculatePaceAndStats() {
  const now = new Date();
  const examDateParts = AppState.data.examDate.split('-').map(Number);
  const examDate = new Date(examDateParts[0], examDateParts[1] - 1, examDateParts[2], 23, 59, 59);

  const diffTime = examDate - now;
  const daysRemaining = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  const bufferDays = AppState.data.revisionBufferDays || 0;
  const effectiveStudyDays = Math.max(1, daysRemaining - bufferDays);

  let totalTopics = 0;
  let completedTopics = 0;
  let totalSubtopics = 0;
  let completedSubtopics = 0;

  let brihatTotal = 0, brihatDone = 0;
  let laghuTotal = 0, laghuDone = 0;
  let subjectsTotal = 0, subjectsDone = 0;

  AppState.data.syllabus.forEach(subject => {
    subject.topics.forEach(topic => {
      totalTopics++;
      if (topic.completed) completedTopics++;

      if (subject.category === 'brihattrayi') {
        brihatTotal++;
        if (topic.completed) brihatDone++;
      } else if (subject.category === 'laghutrayi') {
        laghuTotal++;
        if (topic.completed) laghuDone++;
      } else {
        subjectsTotal++;
        if (topic.completed) subjectsDone++;
      }

      if (topic.subtopics && topic.subtopics.length > 0) {
        topic.subtopics.forEach(sub => {
          totalSubtopics++;
          if (sub.completed) completedSubtopics++;
        });
      } else {
        totalSubtopics++;
        if (topic.completed) completedSubtopics++;
      }
    });
  });

  const pendingTopics = Math.max(0, totalTopics - completedTopics);
  const pendingSubtopics = Math.max(0, totalSubtopics - completedSubtopics);

  const requiredTopicPace = (pendingTopics / effectiveStudyDays).toFixed(1);
  const requiredSubtopicPace = (pendingSubtopics / effectiveStudyDays).toFixed(1);

  const todayStr = getTodayString();
  const overdueCount = AppState.data.revisions.filter(r => r.dueDate < todayStr).length;
  const dueTodayCount = AppState.data.revisions.filter(r => r.dueDate === todayStr).length;

  const brihatPct = brihatTotal > 0 ? Math.round((brihatDone / brihatTotal) * 100) : 0;
  const laghuPct = laghuTotal > 0 ? Math.round((laghuDone / laghuTotal) * 100) : 0;
  const subjectsPct = subjectsTotal > 0 ? Math.round((subjectsDone / subjectsTotal) * 100) : 0;
  const overallSyllabusPct = totalSubtopics > 0 ? Math.round((completedSubtopics / totalSubtopics) * 100) : 0;

  // Blended Readiness Score (0-100%)
  const revisionAdherence = overdueCount === 0 ? 100 : Math.max(0, 100 - (overdueCount * 12));
  const todayHourPct = Math.min(100, ((AppState.data.todayStudyMinutes / 60) / AppState.data.targetDailyHours) * 100);
  const todayMcqPct = Math.min(100, (AppState.data.todayMcqSolved / AppState.data.targetDailyMcq) * 100);
  const dailyRhythm = (todayHourPct + todayMcqPct) / 2;

  const readinessScore = Math.min(100, Math.round(
    (0.50 * overallSyllabusPct) +
    (0.30 * revisionAdherence) +
    (0.20 * dailyRhythm)
  ));

  let readinessLevel = 'Needs Momentum';
  let readinessColor = 'text-amber-400 bg-amber-950/50 border-amber-800/60';
  if (readinessScore >= 85) {
    readinessLevel = 'Rank Contender 🏆';
    readinessColor = 'text-emerald-400 bg-emerald-950/50 border-emerald-800/60';
  } else if (readinessScore >= 65) {
    readinessLevel = 'Exam Ready ⚡';
    readinessColor = 'text-indigo-400 bg-indigo-950/50 border-indigo-800/60';
  } else if (readinessScore >= 40) {
    readinessLevel = 'Steadily Progressing 📈';
    readinessColor = 'text-sky-400 bg-sky-950/50 border-sky-800/60';
  }

  return {
    daysRemaining,
    effectiveStudyDays,
    bufferDays,
    totalTopics,
    completedTopics,
    pendingTopics,
    totalSubtopics,
    completedSubtopics,
    pendingSubtopics,
    requiredTopicPace,
    requiredSubtopicPace,
    overdueCount,
    dueTodayCount,
    brihatPct,
    laghuPct,
    subjectsPct,
    overallSyllabusPct,
    readinessScore,
    readinessLevel,
    readinessColor,
    todayHourPct,
    todayMcqPct,
    revisionAdherence,
    dailyRhythm
  };
}

// ==========================================
// 3. SPACED REPETITION ENGINE
// ==========================================

function scheduleNewTopicRevision(topicName, category, categoryName, priority = 'High-Yield') {
  const today = getTodayString();
  const intervals = AppState.data.revisionIntervals || DEFAULT_REVISION_INTERVALS;
  const firstIntervalDays = intervals[0] || 3;
  const dueDate = addDaysToDate(today, firstIntervalDays);

  const newRev = {
    id: 'rev-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
    topicName: topicName,
    category: category || 'subjects',
    categoryName: categoryName || 'Ayurveda',
    priority: priority,
    studiedDate: today,
    dueDate: dueDate,
    intervalIndex: 0,
    intervalDays: firstIntervalDays,
    reviewCount: 0,
    overdue: false,
    lastConfidence: null
  };

  AppState.data.revisions.push(newRev);
  AppState.save();
  renderAll();
  return newRev;
}

function processRevisionReview(revId, confidence) {
  const rev = AppState.data.revisions.find(r => r.id === revId);
  if (!rev) return;

  const today = getTodayString();
  const intervals = AppState.data.revisionIntervals || DEFAULT_REVISION_INTERVALS;

  rev.lastConfidence = confidence;
  rev.reviewCount = (rev.reviewCount || 0) + 1;
  rev.studiedDate = today;

  if (confidence === 'Weak') {
    rev.dueDate = addDaysToDate(today, 2);
    rev.intervalDays = 2;
    showToast(`"${rev.topicName}" rescheduled in 2 days for reinforcement`, 'info');
  } else if (confidence === 'Medium') {
    const nextIdx = (rev.intervalIndex || 0) + 1;
    if (nextIdx < intervals.length) {
      rev.intervalIndex = nextIdx;
      rev.intervalDays = intervals[nextIdx];
      rev.dueDate = addDaysToDate(today, intervals[nextIdx]);
      showToast(`Advanced to Day ${intervals[nextIdx]} interval`, 'success');
    } else {
      rev.dueDate = addDaysToDate(today, 30);
      rev.intervalDays = 30;
      showToast(`Mastery confirmed! Next review in 30 days`, 'success');
    }
  } else if (confidence === 'Strong') {
    rev.dueDate = addDaysToDate(today, 30);
    rev.intervalDays = 30;
    rev.intervalIndex = Math.min(intervals.length - 1, (rev.intervalIndex || 0) + 2);
    showToast(`Strong recall! Pushed 30 days out`, 'success');
  }

  AppState.save();
  renderAll();
}

function rebalanceOverdueRevisions() {
  const today = getTodayString();
  const overdueList = AppState.data.revisions.filter(r => r.dueDate < today);

  if (overdueList.length === 0) {
    showToast('No overdue revisions to rebalance!', 'info');
    return;
  }

  const spreadDays = Math.min(5, Math.max(3, overdueList.length));
  overdueList.forEach((rev, index) => {
    const dayOffset = (index % spreadDays) + 1;
    rev.dueDate = addDaysToDate(today, dayOffset);
    rev.intervalDays = dayOffset;
  });

  AppState.save();
  renderAll();
  showToast(`⚖️ Balanced ${overdueList.length} overdue revisions over next ${spreadDays} days!`, 'success');
}

// ==========================================
// 4. FOCUS TIMER & DHARANA DND MODE
// ==========================================

const FocusTimer = {
  durationSeconds: 25 * 60,
  remainingSeconds: 25 * 60,
  isRunning: false,
  timerInterval: null,
  activeTopicName: 'Charaka Samhita - Sutrasthana Chatushka',
  activeCategory: 'Major Samhitas (Brihattrayi)',
  audioEnabled: true,

  start(seconds = null, topicName = null, category = null) {
    if (seconds) {
      this.durationSeconds = seconds;
      this.remainingSeconds = seconds;
    }
    if (topicName) this.activeTopicName = topicName;
    if (category) this.activeCategory = category;

    this.isRunning = true;
    this.playBellChime(true);

    clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      if (this.remainingSeconds > 0) {
        this.remainingSeconds--;
        this.updateDNDDisplay();
      } else {
        this.completeSession();
      }
    }, 1000);

    this.openDNDOverlay();
    this.updateDNDDisplay();
  },

  pause() {
    this.isRunning = false;
    clearInterval(this.timerInterval);
    this.updateDNDDisplay();
  },

  resume() {
    this.isRunning = true;
    clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      if (this.remainingSeconds > 0) {
        this.remainingSeconds--;
        this.updateDNDDisplay();
      } else {
        this.completeSession();
      }
    }, 1000);
    this.updateDNDDisplay();
  },

  addTime(minutes) {
    this.durationSeconds += minutes * 60;
    this.remainingSeconds += minutes * 60;
    this.updateDNDDisplay();
    showToast(`+${minutes} minutes added to timer`, 'info');
  },

  completeSession() {
    this.pause();
    this.playBellChime(false);

    const elapsedSeconds = this.durationSeconds - this.remainingSeconds;
    const elapsedMinutes = Math.max(1, Math.round(elapsedSeconds / 60));

    AppState.data.todayStudyMinutes += elapsedMinutes;
    AppState.save();
    renderAll();

    const overlay = document.getElementById('dnd-overlay');
    if (overlay) {
      document.getElementById('dnd-timer-view').classList.add('hidden');
      document.getElementById('dnd-congrats-view').classList.remove('hidden');
      document.getElementById('dnd-logged-minutes').textContent = `${elapsedMinutes} Minutes`;
    }
  },

  endEarly() {
    const elapsedSeconds = this.durationSeconds - this.remainingSeconds;
    const elapsedMinutes = Math.round(elapsedSeconds / 60);

    if (elapsedMinutes >= 1) {
      AppState.data.todayStudyMinutes += elapsedMinutes;
      AppState.save();
      renderAll();
      showToast(`Focus session saved: +${elapsedMinutes} mins logged`, 'success');
    }
    this.closeDNDOverlay();
  },

  openDNDOverlay() {
    const overlay = document.getElementById('dnd-overlay');
    if (overlay) {
      overlay.classList.remove('hidden');
      document.getElementById('dnd-timer-view').classList.remove('hidden');
      document.getElementById('dnd-congrats-view').classList.add('hidden');
      document.body.style.overflow = 'hidden';
    }
  },

  closeDNDOverlay() {
    this.pause();
    const overlay = document.getElementById('dnd-overlay');
    if (overlay) {
      overlay.classList.add('hidden');
      document.body.style.overflow = '';
    }
  },

  updateDNDDisplay() {
    const m = Math.floor(this.remainingSeconds / 60);
    const s = this.remainingSeconds % 60;
    const timeStr = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;

    const timerText = document.getElementById('dnd-timer-digits');
    if (timerText) timerText.textContent = timeStr;

    const topicEl = document.getElementById('dnd-topic-name');
    if (topicEl) topicEl.textContent = this.activeTopicName;

    const catEl = document.getElementById('dnd-topic-cat');
    if (catEl) catEl.textContent = this.activeCategory;

    const circle = document.getElementById('dnd-progress-circle');
    if (circle) {
      const radius = circle.r.baseVal.value;
      const circumference = 2 * Math.PI * radius;
      const progress = this.durationSeconds > 0 ? (this.durationSeconds - this.remainingSeconds) / this.durationSeconds : 0;
      const offset = circumference - (progress * circumference);
      circle.style.strokeDasharray = `${circumference} ${circumference}`;
      circle.style.strokeDashoffset = offset;
    }

    const pauseBtn = document.getElementById('dnd-pause-btn');
    if (pauseBtn) {
      pauseBtn.innerHTML = this.isRunning
        ? `<svg class="w-6 h-6 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> Pause`
        : `<svg class="w-6 h-6 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> Resume`;
    }
  },

  playBellChime(isStart = true) {
    if (!this.audioEnabled) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      const fundamentalFreq = isStart ? 440 : 528;
      const duration = 2.5;

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(fundamentalFreq, ctx.currentTime);

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(fundamentalFreq * 2.02, ctx.currentTime);

      gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + duration);
      osc2.stop(ctx.currentTime + duration);
    } catch (e) {}
  }
};

// ==========================================
// 5. TOAST NOTIFICATION SYSTEM
// ==========================================

let toastTimeout = null;
function showToast(message, type = 'info', icon = null) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  clearTimeout(toastTimeout);
  container.innerHTML = '';

  const toast = document.createElement('div');
  toast.className = `toast-enter flex items-center space-x-3 px-4 py-3 rounded-2xl shadow-2xl text-xs font-semibold border backdrop-blur-md ${
    type === 'success' ? 'bg-[#0f1f2e]/95 border-emerald-500/70 text-emerald-200' :
    type === 'warning' ? 'bg-[#261b0d]/95 border-amber-500/70 text-amber-200' :
    type === 'rose'    ? 'bg-[#2d121c]/95 border-rose-500/70 text-rose-200' :
    'bg-[#0f1629]/95 border-indigo-500/70 text-indigo-100'
  }`;

  const defaultIcon = type === 'success' 
    ? `<svg class="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>`
    : `<svg class="w-4 h-4 text-indigo-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;

  toast.innerHTML = `
    <span>${icon || defaultIcon}</span>
    <span class="flex-1">${message}</span>
  `;

  container.appendChild(toast);

  toastTimeout = setTimeout(() => {
    toast.classList.remove('toast-enter');
    toast.classList.add('toast-exit');
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }, 3200);
}

// ==========================================
// 6. RENDERING FUNCTIONS
// ==========================================

function renderAll() {
  const stats = calculatePaceAndStats();
  renderHeaderUser();
  renderDashboard(stats);
  renderSyllabus(stats);
  renderRevisions();
  renderFocusTab();
  renderSthanaPicker();
}

function renderHeaderUser() {
  const userNameEl = document.getElementById('header-user-name');
  const userAvatarEl = document.getElementById('header-user-avatar');
  if (userNameEl && AppState.currentUser) {
    userNameEl.textContent = AppState.currentUser.name;
  }
  if (userAvatarEl && AppState.currentUser) {
    userAvatarEl.textContent = AppState.currentUser.avatar || '🌿';
  }
}

function renderDashboard(stats) {
  // Days Remaining & Targets
  const daysEl = document.getElementById('dash-days-remaining');
  if (daysEl) daysEl.textContent = stats.daysRemaining;

  const targetDateEl = document.getElementById('dash-exam-date');
  if (targetDateEl) {
    const d = new Date(AppState.data.examDate);
    const dateFormatted = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    targetDateEl.textContent = dateFormatted;
  }

  const bufferEl = document.getElementById('dash-buffer-days');
  if (bufferEl) bufferEl.textContent = `${stats.bufferDays} Days Buffer`;

  const effDaysEl = document.getElementById('dash-effective-days');
  if (effDaysEl) effDaysEl.textContent = `${stats.effectiveStudyDays} Study Days`;

  // Required Daily Pace
  const paceEl = document.getElementById('dash-daily-pace');
  if (paceEl) paceEl.textContent = `${stats.requiredTopicPace} Topics / Day`;

  const subPaceEl = document.getElementById('dash-subtopic-pace');
  if (subPaceEl) subPaceEl.textContent = `(${stats.requiredSubtopicPace} subtopics/day)`;

  // Readiness Score
  const scoreEl = document.getElementById('dash-readiness-score');
  if (scoreEl) scoreEl.textContent = `${stats.readinessScore}%`;

  const levelEl = document.getElementById('dash-readiness-level');
  if (levelEl) {
    levelEl.textContent = stats.readinessLevel;
    levelEl.className = `text-xs font-bold px-2.5 py-1 rounded-full border ${stats.readinessColor}`;
  }

  // Animated Circular SVG Ring
  const circle = document.getElementById('readiness-ring-circle');
  if (circle) {
    const radius = 54;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (stats.readinessScore / 100) * circumference;
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = offset;
  }

  // Sub-metrics
  const covEl = document.getElementById('dash-syllabus-pct');
  if (covEl) covEl.textContent = `${stats.overallSyllabusPct}%`;

  const revAdhEl = document.getElementById('dash-revision-pct');
  if (revAdhEl) revAdhEl.textContent = `${stats.revisionAdherence}%`;

  const rhythmEl = document.getElementById('dash-rhythm-pct');
  if (rhythmEl) rhythmEl.textContent = `${Math.round(stats.dailyRhythm)}%`;

  // Daily Targets Card
  const curHours = (AppState.data.todayStudyMinutes / 60).toFixed(1);
  const tgtHours = AppState.data.targetDailyHours.toFixed(1);
  const hourPct = Math.min(100, Math.round(((AppState.data.todayStudyMinutes / 60) / AppState.data.targetDailyHours) * 100));

  const hoursText = document.getElementById('dash-hours-text');
  if (hoursText) hoursText.textContent = `${curHours} / ${tgtHours} hrs`;

  const hoursBar = document.getElementById('dash-hours-bar');
  if (hoursBar) hoursBar.style.width = `${hourPct}%`;

  const curMcq = AppState.data.todayMcqSolved;
  const tgtMcq = AppState.data.targetDailyMcq;
  const mcqPct = Math.min(100, Math.round((curMcq / tgtMcq) * 100));

  const mcqText = document.getElementById('dash-mcq-text');
  if (mcqText) mcqText.textContent = `${curMcq} / ${tgtMcq} MCQs`;

  const mcqBar = document.getElementById('dash-mcq-bar');
  if (mcqBar) mcqBar.style.width = `${mcqPct}%`;

  // Revisions Snapshot
  const dueSnapshot = document.getElementById('dash-due-snapshot');
  if (dueSnapshot) {
    const todayStr = getTodayString();
    const dueList = AppState.data.revisions.filter(r => r.dueDate <= todayStr);
    if (dueList.length === 0) {
      dueSnapshot.innerHTML = `
        <div class="text-center py-4 text-slate-400 text-xs">
          ✨ All caught up! No pending revisions due today.
        </div>
      `;
    } else {
      dueSnapshot.innerHTML = dueList.slice(0, 3).map(rev => `
        <div class="flex items-center justify-between p-3 bg-[#131d33] rounded-2xl border border-slate-800">
          <div class="truncate mr-2">
            <div class="text-xs font-semibold text-slate-100 truncate">${rev.topicName}</div>
            <div class="text-[10px] text-slate-400">${rev.dueDate < todayStr ? '<span class="text-rose-400 font-bold">⚠️ Overdue</span>' : 'Due Today'} · Int ${rev.intervalDays}d</div>
          </div>
          <button onclick="switchTab('revisions')" class="shrink-0 text-xs px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium tap-feedback">
            Review
          </button>
        </div>
      `).join('');
    }
  }

  updateNavBadges(stats);
}

function updateNavBadges(stats) {
  const badge = document.getElementById('nav-rev-badge');
  if (badge) {
    const totalDue = stats.overdueCount + stats.dueTodayCount;
    if (totalDue > 0) {
      badge.textContent = totalDue;
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  }
}

// Current Syllabus filters
let syllabusCategoryFilter = 'brihattrayi';
let syllabusPriorityFilter = 'all';
let syllabusStatusFilter = 'all';
let syllabusSearchQuery = '';

function renderSyllabus(stats) {
  const pendTopicsEl = document.getElementById('syl-pending-topics');
  if (pendTopicsEl) pendTopicsEl.textContent = stats.pendingTopics;

  const pendSubEl = document.getElementById('syl-pending-subtopics');
  if (pendSubEl) pendSubEl.textContent = stats.pendingSubtopics;

  const overdueEl = document.getElementById('syl-overdue-revs');
  if (overdueEl) overdueEl.textContent = stats.overdueCount;

  const paceBannerEl = document.getElementById('syl-pace-banner');
  if (paceBannerEl) paceBannerEl.textContent = `${stats.requiredTopicPace} / day`;

  const bBar = document.getElementById('syl-brihat-bar');
  if (bBar) bBar.style.width = `${stats.brihatPct}%`;
  const bText = document.getElementById('syl-brihat-text');
  if (bText) bText.textContent = `${stats.brihatPct}%`;

  const lBar = document.getElementById('syl-laghu-bar');
  if (lBar) lBar.style.width = `${stats.laghuPct}%`;
  const lText = document.getElementById('syl-laghu-text');
  if (lText) lText.textContent = `${stats.laghuPct}%`;

  const sBar = document.getElementById('syl-sub-bar');
  if (sBar) sBar.style.width = `${stats.subjectsPct}%`;
  const sText = document.getElementById('syl-sub-text');
  if (sText) sText.textContent = `${stats.subjectsPct}%`;

  const container = document.getElementById('syllabus-list-container');
  if (!container) return;

  const filteredSubjects = AppState.data.syllabus.filter(s => {
    if (syllabusCategoryFilter !== 'all' && s.category !== syllabusCategoryFilter) return false;
    return true;
  });

  const query = syllabusSearchQuery.toLowerCase().trim();
  let html = '';

  filteredSubjects.forEach(subject => {
    const matchingTopics = subject.topics.filter(t => {
      if (syllabusPriorityFilter !== 'all' && t.priority !== syllabusPriorityFilter) return false;
      if (syllabusStatusFilter === 'completed' && !t.completed) return false;
      if (syllabusStatusFilter === 'pending' && t.completed) return false;

      if (query) {
        const matchTitle = t.name.toLowerCase().includes(query) || (t.sanskrit && t.sanskrit.toLowerCase().includes(query));
        const matchSubject = subject.title.toLowerCase().includes(query) || (subject.sanskritTitle && subject.sanskritTitle.toLowerCase().includes(query));
        const matchSub = t.subtopics && t.subtopics.some(sub => sub.name.toLowerCase().includes(query));
        return matchTitle || matchSubject || matchSub;
      }
      return true;
    });

    if (matchingTopics.length === 0 && query) return;

    html += `
      <div id="subject-card-${subject.id}" class="bg-[#0f1629] rounded-3xl border border-slate-800 shadow-sm overflow-hidden mb-4">
        <!-- Subject Header with Hindi & English titles -->
        <div class="p-4 bg-gradient-to-r from-[#141c33] to-[#16223d] border-b border-slate-800 flex items-center justify-between">
          <div class="flex-1 pr-2">
            <div class="flex items-center space-x-2">
              <span class="text-sm font-extrabold text-white">${subject.sanskritTitle || subject.title}</span>
              <span class="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold ${
                subject.priority === 'High-Yield' ? 'bg-rose-950/70 border border-rose-800/80 text-rose-300' :
                subject.priority === 'Core' ? 'bg-indigo-950/70 border border-indigo-800/80 text-indigo-300' :
                'bg-emerald-950/70 border border-emerald-800/80 text-emerald-300'
              }">${subject.priority}</span>
            </div>
            <div class="text-xs text-indigo-400 font-medium mt-0.5">${subject.title}</div>
          </div>
          <button onclick="openAddTopicModal('${subject.id}')" class="text-xs px-2.5 py-1 bg-[#1c2742] border border-slate-700 rounded-xl text-slate-200 hover:bg-[#253356] font-medium tap-feedback shrink-0 flex items-center space-x-1">
            <span>+ Topic</span>
          </button>
        </div>

        <!-- Topics Accordion List -->
        <div class="divide-y divide-slate-800/60">
          ${matchingTopics.map(topic => {
            const subCount = topic.subtopics ? topic.subtopics.length : 0;
            const subDone = topic.subtopics ? topic.subtopics.filter(st => st.completed).length : (topic.completed ? 1 : 0);
            const topicProgress = subCount > 0 ? Math.round((subDone / subCount) * 100) : (topic.completed ? 100 : 0);

            return `
              <div id="topic-item-${topic.id}" class="p-3.5 hover:bg-[#141d33] transition">
                <div class="flex items-center justify-between">
                  <!-- Checkbox & Topic Info -->
                  <div class="flex items-start space-x-3 flex-1 mr-2">
                    <input type="checkbox" ${topic.completed ? 'checked' : ''} 
                      onchange="toggleTopicCompletion('${subject.id}', '${topic.id}', this.checked)"
                      class="mt-1 w-4 h-4 text-emerald-500 rounded border-slate-700 bg-slate-900 focus:ring-emerald-500 cursor-pointer">
                    <div class="flex-1 cursor-pointer" onclick="toggleSubtopicAccordion('${topic.id}')">
                      <div class="flex items-center space-x-2">
                        <span class="text-xs font-bold ${topic.completed ? 'line-through text-slate-500' : 'text-slate-100'}">${topic.sanskrit || topic.name}</span>
                        <span class="text-[9px] px-1.5 py-0.2 rounded font-semibold ${
                          topic.priority === 'High-Yield' ? 'text-rose-400 bg-rose-950/60 border border-rose-900/60' :
                          topic.priority === 'Core' ? 'text-indigo-400 bg-indigo-950/60 border border-indigo-900/60' :
                          'text-emerald-400 bg-emerald-950/60 border border-emerald-900/60'
                        }">${topic.priority}</span>
                      </div>
                      <div class="text-[11px] text-slate-400 font-sans mt-0.5">${topic.name}</div>
                      
                      <!-- Subtopic count pill -->
                      <div class="flex items-center space-x-2 mt-1">
                        <span class="text-[10px] text-slate-500">${subDone}/${subCount} completed</span>
                        <div class="w-16 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div class="bg-emerald-500 h-1.5 rounded-full" style="width: ${topicProgress}%"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Quick Action Buttons -->
                  <div class="flex items-center space-x-1 shrink-0">
                    <button onclick="scheduleNewTopicRevision('${topic.name}', '${subject.category}', '${subject.title}', '${topic.priority}'); showToast('Added to Spaced Repetition queue (+3d)', 'success');" 
                      title="Add to Spaced Repetition" 
                      class="px-2 py-1 bg-indigo-950/60 hover:bg-indigo-900/80 text-indigo-300 rounded-xl text-xs font-semibold tap-feedback flex items-center space-x-1 border border-indigo-800/80">
                      <span>+ Rev</span>
                    </button>
                    <button onclick="toggleSubtopicAccordion('${topic.id}')" class="p-1 text-slate-400 hover:text-slate-200">
                      <svg id="arrow-${topic.id}" class="w-4 h-4 transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- Subtopics Accordion Tray -->
                <div id="subtopics-${topic.id}" class="hidden mt-3 pl-7 pr-1 pt-2 border-t border-dashed border-slate-800">
                  <div class="space-y-2 mb-2">
                    ${(topic.subtopics || []).map(sub => `
                      <div class="flex items-center justify-between text-xs py-1 group">
                        <label class="flex items-center space-x-2 cursor-pointer flex-1 mr-2">
                          <input type="checkbox" ${sub.completed ? 'checked' : ''}
                            onchange="toggleSubtopicCompletion('${subject.id}', '${topic.id}', '${sub.id}', this.checked)"
                            class="w-3.5 h-3.5 text-emerald-500 rounded border-slate-700 bg-slate-900 focus:ring-emerald-500">
                          <span class="${sub.completed ? 'line-through text-slate-500' : 'text-slate-300'}">${sub.name}</span>
                        </label>
                        <div class="flex items-center space-x-1 opacity-80 group-hover:opacity-100">
                          <button onclick="scheduleNewTopicRevision('${sub.name}', '${subject.category}', '${subject.title}'); showToast('Subtopic added to revision (+3d)', 'success');" 
                            title="Add subtopic to revision" 
                            class="text-[10px] text-indigo-400 hover:underline px-1 py-0.5">
                            + Rev
                          </button>
                          ${sub.isCustom ? `
                            <button onclick="deleteCustomSubtopic('${subject.id}', '${topic.id}', '${sub.id}')" class="text-rose-400 hover:text-rose-300 p-0.5">
                              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                            </button>
                          ` : ''}
                        </div>
                      </div>
                    `).join('')}
                  </div>

                  <!-- Inline Add Subtopic Input -->
                  <div class="flex items-center space-x-2 pt-2 border-t border-slate-800">
                    <input type="text" id="new-sub-${topic.id}" placeholder="+ Add new Adhyaya / Subtopic..." 
                      onkeydown="if(event.key === 'Enter') addInlineSubtopic('${subject.id}', '${topic.id}')"
                      class="flex-1 text-xs px-2.5 py-1.5 rounded-xl border border-slate-700 bg-[#070b19] text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500">
                    <button onclick="addInlineSubtopic('${subject.id}', '${topic.id}')" 
                      class="text-xs px-2.5 py-1.5 bg-[#1c2742] hover:bg-[#253356] text-slate-200 rounded-xl font-medium tap-feedback">
                      Add
                    </button>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  });

  if (!html) {
    container.innerHTML = `
      <div class="text-center py-12 bg-[#0f1629] rounded-3xl border border-slate-800 p-6">
        <svg class="w-12 h-12 mx-auto text-slate-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
        <p class="text-slate-400 text-sm">No topics match your current search/filters.</p>
        <button onclick="resetSyllabusFilters()" class="mt-3 text-xs text-indigo-400 font-semibold underline">Reset Filters</button>
      </div>
    `;
  } else {
    container.innerHTML = html;
  }
}

function toggleSubtopicAccordion(topicId) {
  const tray = document.getElementById(`subtopics-${topicId}`);
  const arrow = document.getElementById(`arrow-${topicId}`);
  if (tray) {
    if (tray.classList.contains('hidden')) {
      tray.classList.remove('hidden');
      if (arrow) arrow.classList.add('rotate-180');
    } else {
      tray.classList.add('hidden');
      if (arrow) arrow.classList.remove('rotate-180');
    }
  }
}

function toggleTopicCompletion(subjectId, topicId, completed) {
  const subject = AppState.data.syllabus.find(s => s.id === subjectId);
  if (!subject) return;
  const topic = subject.topics.find(t => t.id === topicId);
  if (!topic) return;

  topic.completed = completed;
  if (topic.subtopics) {
    topic.subtopics.forEach(st => st.completed = completed);
  }

  AppState.save();
  renderAll();
  showToast(completed ? `Completed "${topic.name}"` : `Marked incomplete`, completed ? 'success' : 'info');
}

function toggleSubtopicCompletion(subjectId, topicId, subtopicId, completed) {
  const subject = AppState.data.syllabus.find(s => s.id === subjectId);
  if (!subject) return;
  const topic = subject.topics.find(t => t.id === topicId);
  if (!topic || !topic.subtopics) return;

  const sub = topic.subtopics.find(st => st.id === subtopicId);
  if (sub) {
    sub.completed = completed;
    const allDone = topic.subtopics.every(st => st.completed);
    topic.completed = allDone;
  }

  AppState.save();
  renderAll();
}

function addInlineSubtopic(subjectId, topicId) {
  const input = document.getElementById(`new-sub-${topicId}`);
  if (!input) return;
  const val = input.value.trim();
  if (!val) return;

  const subject = AppState.data.syllabus.find(s => s.id === subjectId);
  if (!subject) return;
  const topic = subject.topics.find(t => t.id === topicId);
  if (!topic) return;

  if (!topic.subtopics) topic.subtopics = [];
  topic.subtopics.push({
    id: 'sub-' + Date.now(),
    name: val,
    completed: false,
    isCustom: true
  });

  input.value = '';
  AppState.save();
  renderAll();
  const tray = document.getElementById(`subtopics-${topicId}`);
  if (tray) tray.classList.remove('hidden');
  showToast(`Added subtopic: "${val}"`, 'success');
}

function deleteCustomSubtopic(subjectId, topicId, subtopicId) {
  const subject = AppState.data.syllabus.find(s => s.id === subjectId);
  if (!subject) return;
  const topic = subject.topics.find(t => t.id === topicId);
  if (!topic || !topic.subtopics) return;

  topic.subtopics = topic.subtopics.filter(st => st.id !== subtopicId);
  AppState.save();
  renderAll();
  showToast('Custom subtopic removed', 'info');
}

function resetSyllabusFilters() {
  syllabusCategoryFilter = 'all';
  syllabusPriorityFilter = 'all';
  syllabusStatusFilter = 'all';
  syllabusSearchQuery = '';

  const searchInput = document.getElementById('syllabus-search-input');
  if (searchInput) searchInput.value = '';

  renderAll();
}

function renderRevisions() {
  const todayStr = getTodayString();
  const revisions = AppState.data.revisions;

  const overdue = revisions.filter(r => r.dueDate < todayStr);
  const dueToday = revisions.filter(r => r.dueDate === todayStr);
  const upcoming = revisions.filter(r => r.dueDate > todayStr).sort((a, b) => a.dueDate.localeCompare(b.dueDate));

  const overdueCountEl = document.getElementById('rev-overdue-count');
  if (overdueCountEl) overdueCountEl.textContent = overdue.length;

  const dueTodayCountEl = document.getElementById('rev-due-count');
  if (dueTodayCountEl) dueTodayCountEl.textContent = dueToday.length;

  const upcomingCountEl = document.getElementById('rev-upcoming-count');
  if (upcomingCountEl) upcomingCountEl.textContent = upcoming.length;

  const overdueContainer = document.getElementById('rev-overdue-list');
  const overdueCardWrapper = document.getElementById('rev-overdue-card');
  if (overdueContainer) {
    if (overdue.length === 0) {
      if (overdueCardWrapper) overdueCardWrapper.classList.add('hidden');
    } else {
      if (overdueCardWrapper) overdueCardWrapper.classList.remove('hidden');
      overdueContainer.innerHTML = overdue.map(r => renderRevisionCard(r, 'overdue')).join('');
    }
  }

  const dueContainer = document.getElementById('rev-due-list');
  if (dueContainer) {
    if (dueToday.length === 0) {
      dueContainer.innerHTML = `
        <div class="text-center py-6 text-slate-500 text-xs bg-[#131d33] rounded-2xl border border-dashed border-slate-800">
          🎉 No revisions due today! You're completely up to date.
        </div>
      `;
    } else {
      dueContainer.innerHTML = dueToday.map(r => renderRevisionCard(r, 'today')).join('');
    }
  }

  const upcomingContainer = document.getElementById('rev-upcoming-list');
  if (upcomingContainer) {
    if (upcoming.length === 0) {
      upcomingContainer.innerHTML = `
        <div class="text-center py-6 text-slate-500 text-xs">
          No upcoming revisions scheduled. Study a topic to queue it up!
        </div>
      `;
    } else {
      upcomingContainer.innerHTML = upcoming.map(r => renderRevisionCard(r, 'upcoming')).join('');
    }
  }
}

function renderRevisionCard(rev, statusType) {
  const todayStr = getTodayString();
  const dDiff = Math.ceil((new Date(rev.dueDate) - new Date(todayStr)) / (1000 * 60 * 60 * 24));
  let dueLabel = '';

  if (dDiff < 0) {
    dueLabel = `<span class="text-rose-400 font-bold">${Math.abs(dDiff)} days overdue</span>`;
  } else if (dDiff === 0) {
    dueLabel = `<span class="text-amber-400 font-bold">Due Today</span>`;
  } else {
    dueLabel = `<span class="text-emerald-400">Due in ${dDiff} days (${rev.dueDate})</span>`;
  }

  return `
    <div class="bg-[#0f1629] p-4 rounded-2xl border ${
      statusType === 'overdue' ? 'border-rose-900/60 bg-[#1f101a]/50' : 
      statusType === 'today' ? 'border-amber-900/60 bg-[#21190f]/50' : 
      'border-slate-800'
    } shadow-sm space-y-3">
      <div class="flex items-start justify-between">
        <div class="flex-1 mr-2">
          <div class="text-[11px] text-indigo-400 font-bold uppercase tracking-wider">${rev.categoryName || rev.category}</div>
          <h4 class="text-xs font-bold text-slate-100">${rev.topicName}</h4>
          <div class="text-[11px] text-slate-400 mt-0.5">
            ${dueLabel} · <span class="text-slate-500">Interval: ${rev.intervalDays}d (Reviewed ${rev.reviewCount || 0}x)</span>
          </div>
        </div>
        <span class="text-[9px] px-2 py-0.5 rounded-full font-bold ${
          rev.priority === 'High-Yield' ? 'bg-rose-950 border border-rose-800 text-rose-300' :
          rev.priority === 'Core' ? 'bg-indigo-950 border border-indigo-800 text-indigo-300' :
          'bg-emerald-950 border border-emerald-800 text-emerald-300'
        }">${rev.priority || 'Core'}</span>
      </div>

      <div class="pt-2 border-t border-slate-800">
        <div class="text-[10px] font-semibold text-slate-400 mb-2">Mark Revision & Rate Recall Confidence:</div>
        <div class="grid grid-cols-3 gap-2">
          <button onclick="processRevisionReview('${rev.id}', 'Weak')" 
            class="px-2 py-2 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 rounded-xl text-xs font-bold tap-feedback border border-rose-900 flex flex-col items-center">
            <span>⚡ Weak</span>
            <span class="text-[9px] font-normal opacity-75 mt-0.5">+2 days</span>
          </button>
          <button onclick="processRevisionReview('${rev.id}', 'Medium')" 
            class="px-2 py-2 bg-indigo-950/40 hover:bg-indigo-900/60 text-indigo-300 rounded-xl text-xs font-bold tap-feedback border border-indigo-900 flex flex-col items-center">
            <span>👍 Medium</span>
            <span class="text-[9px] font-normal opacity-75 mt-0.5">Next Interval</span>
          </button>
          <button onclick="processRevisionReview('${rev.id}', 'Strong')" 
            class="px-2 py-2 bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 rounded-xl text-xs font-bold tap-feedback border border-emerald-900 flex flex-col items-center">
            <span>🌟 Strong</span>
            <span class="text-[9px] font-normal opacity-75 mt-0.5">+30 days</span>
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderFocusTab() {
  const select = document.getElementById('focus-topic-select');
  if (select && select.children.length <= 1) {
    select.innerHTML = '<option value="">-- Choose from Syllabus or Type Below --</option>';
    AppState.data.syllabus.forEach(subject => {
      const optgroup = document.createElement('optgroup');
      optgroup.label = `${subject.title} (${subject.sanskritTitle || ''})`;
      subject.topics.forEach(t => {
        const opt = document.createElement('option');
        opt.value = `${subject.title} - ${t.name}`;
        opt.textContent = `${t.name} (${t.priority})`;
        optgroup.appendChild(opt);
      });
      select.appendChild(optgroup);
    });
  }

  const logSelect = document.getElementById('log-studied-topic-select');
  if (logSelect && logSelect.children.length <= 1) {
    logSelect.innerHTML = '<option value="">-- Select from Pre-Loaded Syllabus --</option>';
    AppState.data.syllabus.forEach(subject => {
      const group = document.createElement('optgroup');
      group.label = `${subject.title} (${subject.sanskritTitle || ''})`;
      subject.topics.forEach(t => {
        const o = document.createElement('option');
        o.value = `${subject.id}|${t.id}|${t.name}|${subject.title}|${t.priority}`;
        o.textContent = `${t.name} [${t.priority}]`;
        group.appendChild(o);
      });
      logSelect.appendChild(group);
    });
  }
}

// ==========================================
// 7. STHANA PICKER (QUICK JUMP & AUDIT)
// ==========================================

function openSthanaPicker() {
  renderSthanaPicker();
  document.getElementById('modal-sthana-picker').classList.remove('hidden');
}

function renderSthanaPicker() {
  const container = document.getElementById('sthana-picker-cards');
  if (!container) return;

  let html = '';
  AppState.data.syllabus.forEach(subject => {
    // Only display subjects with topics
    if (!subject.topics || subject.topics.length === 0) return;

    const totalTopics = subject.topics.length;
    const completedTopics = subject.topics.filter(t => t.completed).length;
    const pct = Math.round((completedTopics / totalTopics) * 100);

    html += `
      <div class="bg-[#131d33] p-3.5 rounded-2xl border border-slate-800 space-y-2.5">
        <div class="flex items-start justify-between">
          <div>
            <span class="text-xs font-bold text-white">${subject.sanskritTitle || subject.title}</span>
            <div class="text-[11px] text-slate-400">${subject.title}</div>
          </div>
          <span class="text-[9px] px-2 py-0.5 rounded-full font-bold bg-indigo-950 border border-indigo-800 text-indigo-300">
            ${completedTopics}/${totalTopics} Sthanas
          </span>
        </div>

        <!-- Progress bar -->
        <div class="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
          <div class="bg-gradient-to-r from-indigo-500 to-emerald-500 h-1.5 rounded-full" style="width: ${pct}%"></div>
        </div>

        <!-- Mini Topic Pills & Jump Action -->
        <div class="flex flex-wrap gap-1.5 pt-1">
          ${subject.topics.map(t => `
            <button onclick="jumpToSthana('${subject.id}', '${t.id}')" class="text-[10px] px-2 py-1 rounded-lg border ${
              t.completed 
                ? 'bg-emerald-950/60 border-emerald-800 text-emerald-300 line-through' 
                : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-indigo-500'
            } tap-feedback">
              ${t.sanskrit ? t.sanskrit.split(' ')[0] : t.name.split(' ')[0]}
            </button>
          `).join('')}
        </div>

        <!-- Bulk toggle Sthana -->
        <div class="flex items-center justify-between pt-1 border-t border-slate-800/80 text-[11px]">
          <button onclick="toggleWholeSubjectCompletion('${subject.id}', ${pct < 100})" class="text-xs font-semibold ${pct === 100 ? 'text-amber-400' : 'text-emerald-400'} hover:underline">
            ${pct === 100 ? 'Mark Incomplete' : '✓ Mark Sthana Complete'}
          </button>
          <button onclick="jumpToSubject('${subject.id}')" class="text-indigo-400 hover:underline">
            View in Syllabus →
          </button>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function toggleWholeSubjectCompletion(subjectId, completed) {
  const subject = AppState.data.syllabus.find(s => s.id === subjectId);
  if (!subject) return;

  subject.topics.forEach(t => {
    t.completed = completed;
    if (t.subtopics) t.subtopics.forEach(st => st.completed = completed);
  });

  AppState.save();
  renderAll();
  showToast(completed ? `Marked all Sthanas completed for ${subject.title}` : `Marked pending for ${subject.title}`, 'info');
}

function jumpToSthana(subjectId, topicId) {
  closeModal('modal-sthana-picker');
  switchTab('syllabus');

  const subject = AppState.data.syllabus.find(s => s.id === subjectId);
  if (subject) {
    syllabusCategoryFilter = subject.category;
    renderAll();
  }

  setTimeout(() => {
    const el = document.getElementById(`topic-item-${topicId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('ring-2', 'ring-indigo-500');
      setTimeout(() => el.classList.remove('ring-2', 'ring-indigo-500'), 2000);
    }
  }, 300);
}

function jumpToSubject(subjectId) {
  closeModal('modal-sthana-picker');
  switchTab('syllabus');

  const subject = AppState.data.syllabus.find(s => s.id === subjectId);
  if (subject) {
    syllabusCategoryFilter = subject.category;
    renderAll();
  }

  setTimeout(() => {
    const el = document.getElementById(`subject-card-${subjectId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 300);
}

// ==========================================
// 8. NAVIGATION & TAB SWITCHING
// ==========================================

let activeTab = 'dashboard';

function switchTab(tabId) {
  activeTab = tabId;
  const tabs = ['dashboard', 'syllabus', 'revisions', 'focus'];

  tabs.forEach(t => {
    const el = document.getElementById(`tab-content-${t}`);
    const navBtn = document.getElementById(`nav-btn-${t}`);
    if (el) {
      if (t === tabId) el.classList.remove('hidden');
      else el.classList.add('hidden');
    }
    if (navBtn) {
      if (t === tabId) {
        navBtn.classList.add('text-indigo-400');
        navBtn.classList.remove('text-slate-500');
      } else {
        navBtn.classList.remove('text-indigo-400');
        navBtn.classList.add('text-slate-500');
      }
    }
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function incrementMcq(amount) {
  AppState.data.todayMcqSolved += amount;
  AppState.save();
  renderAll();
  showToast(`+${amount} MCQs logged! Total today: ${AppState.data.todayMcqSolved}`, 'success');
}

// ==========================================
// 9. MODALS & FORMS
// ==========================================

function openOnboardingModal() {
  document.getElementById('modal-onboarding').classList.remove('hidden');
}

function handleOnboardingSubmit(e) {
  if (e) e.preventDefault();
  const name = document.getElementById('onboard-name').value;
  const email = document.getElementById('onboard-email').value;
  const year = document.getElementById('onboard-year').value;
  AppState.loginUser(name, email, year);
}

function openProfileModal() {
  const profileName = document.getElementById('prof-user-name');
  const profileEmail = document.getElementById('prof-user-email');
  const profileRole = document.getElementById('prof-user-role');
  const userListContainer = document.getElementById('prof-accounts-list');

  if (AppState.currentUser) {
    if (profileName) profileName.textContent = AppState.currentUser.name;
    if (profileEmail) profileEmail.textContent = AppState.currentUser.email;
    if (profileRole) profileRole.textContent = `${AppState.currentUser.role} · Target ${AppState.currentUser.targetYear || '2027'}`;
  }

  if (userListContainer) {
    userListContainer.innerHTML = AppState.users.map(u => `
      <div class="flex items-center justify-between p-2.5 bg-[#131d33] rounded-xl border border-slate-800">
        <div class="flex items-center space-x-2 truncate">
          <span class="text-base">${u.avatar || '🎓'}</span>
          <div class="truncate">
            <div class="text-xs font-bold text-white truncate">${u.name}</div>
            <div class="text-[10px] text-slate-400 truncate">${u.email}</div>
          </div>
        </div>
        ${u.id === AppState.currentUser?.id ? `
          <span class="text-[9px] px-2 py-0.5 bg-emerald-950 border border-emerald-800 text-emerald-300 font-bold rounded-full">Active</span>
        ` : `
          <button onclick="AppState.switchUser('${u.id}')" class="text-xs px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium tap-feedback">
            Switch
          </button>
        `}
      </div>
    `).join('');
  }

  document.getElementById('modal-profile').classList.remove('hidden');
}

function openEditTargetsModal() {
  document.getElementById('input-exam-date').value = AppState.data.examDate;
  document.getElementById('input-buffer-days').value = AppState.data.revisionBufferDays;
  document.getElementById('input-target-hours').value = AppState.data.targetDailyHours;
  document.getElementById('input-target-mcq').value = AppState.data.targetDailyMcq;
  document.getElementById('modal-edit-targets').classList.remove('hidden');
}

function saveEditTargetsModal() {
  const dateVal = document.getElementById('input-exam-date').value;
  const bufferVal = parseInt(document.getElementById('input-buffer-days').value, 10);
  const hoursVal = parseFloat(document.getElementById('input-target-hours').value);
  const mcqVal = parseInt(document.getElementById('input-target-mcq').value, 10);

  if (dateVal) AppState.data.examDate = dateVal;
  if (!isNaN(bufferVal) && bufferVal >= 0) AppState.data.revisionBufferDays = bufferVal;
  if (!isNaN(hoursVal) && hoursVal > 0) AppState.data.targetDailyHours = hoursVal;
  if (!isNaN(mcqVal) && mcqVal > 0) AppState.data.targetDailyMcq = mcqVal;

  AppState.save();
  closeModal('modal-edit-targets');
  renderAll();
  showToast('Exam date & target metrics updated!', 'success');
}

function openLogTopicModal() {
  document.getElementById('modal-log-topic').classList.remove('hidden');
}

function saveLogTopicModal() {
  const select = document.getElementById('log-studied-topic-select');
  const customInput = document.getElementById('log-custom-topic-input');
  const selectedVal = select ? select.value : '';
  const customVal = customInput ? customInput.value.trim() : '';

  let topicName = '';
  let category = 'subjects';
  let categoryName = 'Ayurveda';
  let priority = 'High-Yield';

  if (customVal) {
    topicName = customVal;
  } else if (selectedVal) {
    const [subId, topId, topName, subTitle, topPriority] = selectedVal.split('|');
    topicName = `${subTitle} - ${topName}`;
    categoryName = subTitle;
    priority = topPriority;

    const subject = AppState.data.syllabus.find(s => s.id === subId);
    if (subject) {
      const topic = subject.topics.find(t => t.id === topId);
      if (topic) {
        topic.completed = true;
        if (topic.subtopics) topic.subtopics.forEach(st => st.completed = true);
      }
    }
  } else {
    showToast('Please select or type a topic name', 'warning');
    return;
  }

  scheduleNewTopicRevision(topicName, category, categoryName, priority);
  closeModal('modal-log-topic');
  if (customInput) customInput.value = '';
  AppState.save();
  renderAll();
  showToast(`Logged "${topicName}" & added to Day-3 Revision!`, 'success');
}

function saveManualStudyHours() {
  const hoursInput = document.getElementById('offline-hours-input');
  const topicInput = document.getElementById('offline-topic-input');
  const hours = parseFloat(hoursInput ? hoursInput.value : '0');

  if (isNaN(hours) || hours <= 0) {
    showToast('Please enter a valid study duration', 'warning');
    return;
  }

  const minutes = Math.round(hours * 60);
  AppState.data.todayStudyMinutes += minutes;
  AppState.save();
  renderAll();

  if (hoursInput) hoursInput.value = '';
  if (topicInput) topicInput.value = '';

  showToast(`Logged +${hours} hrs (${minutes} mins) study time!`, 'success');
  closeModal('modal-offline-log');
}

let activeSubjectForAddTopic = null;
function openAddTopicModal(subjectId) {
  activeSubjectForAddTopic = subjectId;
  const subject = AppState.data.syllabus.find(s => s.id === subjectId);
  const titleEl = document.getElementById('add-topic-subject-name');
  if (titleEl && subject) titleEl.textContent = subject.title;
  document.getElementById('modal-add-topic').classList.remove('hidden');
}

function saveAddTopicModal() {
  if (!activeSubjectForAddTopic) return;
  const nameInput = document.getElementById('new-topic-name');
  const sanskritInput = document.getElementById('new-topic-sanskrit');
  const priorityInput = document.getElementById('new-topic-priority');
  const subtopicsInput = document.getElementById('new-topic-subtopics');

  const name = nameInput ? nameInput.value.trim() : '';
  if (!name) {
    showToast('Topic name is required', 'warning');
    return;
  }

  const subject = AppState.data.syllabus.find(s => s.id === activeSubjectForAddTopic);
  if (!subject) return;

  const subtopicsArray = [];
  if (subtopicsInput && subtopicsInput.value.trim()) {
    subtopicsInput.value.split(',').forEach((st, idx) => {
      const clean = st.trim();
      if (clean) {
        subtopicsArray.push({
          id: 'sub-' + Date.now() + '-' + idx,
          name: clean,
          completed: false,
          isCustom: true
        });
      }
    });
  }

  subject.topics.push({
    id: 'top-' + Date.now(),
    name: name,
    sanskrit: sanskritInput ? sanskritInput.value.trim() : '',
    priority: priorityInput ? priorityInput.value : 'High-Yield',
    completed: false,
    subtopics: subtopicsArray
  });

  AppState.save();
  closeModal('modal-add-topic');
  if (nameInput) nameInput.value = '';
  if (sanskritInput) sanskritInput.value = '';
  if (subtopicsInput) subtopicsInput.value = '';

  renderAll();
  showToast(`Added new topic "${name}"`, 'success');
}

function openAddSubjectModal() {
  document.getElementById('modal-add-subject').classList.remove('hidden');
}

function saveAddSubjectModal() {
  const catSelect = document.getElementById('new-subject-cat');
  const nameInput = document.getElementById('new-subject-name');
  const sanskritInput = document.getElementById('new-subject-sanskrit');
  const prioritySelect = document.getElementById('new-subject-priority');

  const name = nameInput ? nameInput.value.trim() : '';
  if (!name) {
    showToast('Subject title is required', 'warning');
    return;
  }

  const category = catSelect ? catSelect.value : 'subjects';
  let categoryName = '15 BAMS Subjects';
  if (category === 'brihattrayi') categoryName = 'Major Samhitas (Brihattrayi)';
  if (category === 'laghutrayi') categoryName = 'Minor Samhitas (Laghutrayi & Others)';

  const newSubject = {
    id: 'subj-' + Date.now(),
    category: category,
    categoryName: categoryName,
    title: name,
    sanskritTitle: sanskritInput ? sanskritInput.value.trim() : '',
    author: 'Ayurveda Shastra',
    priority: prioritySelect ? prioritySelect.value : 'High-Yield',
    topics: []
  };

  AppState.data.syllabus.push(newSubject);
  AppState.save();
  closeModal('modal-add-subject');
  if (nameInput) nameInput.value = '';
  if (sanskritInput) sanskritInput.value = '';

  renderAll();
  showToast(`Created custom subject "${name}"`, 'success');
}

function openSettingsModal() {
  const intervals = AppState.data.revisionIntervals || DEFAULT_REVISION_INTERVALS;
  document.getElementById('setting-intervals-input').value = intervals.join(', ');

  if (window.SupabaseSync) {
    const cfg = window.SupabaseSync.getConfig();
    document.getElementById('supabase-url-input').value = cfg.url || '';
    document.getElementById('supabase-key-input').value = cfg.anonKey || '';
    document.getElementById('supabase-enabled-toggle').checked = Boolean(cfg.enabled);
  }

  document.getElementById('modal-settings').classList.remove('hidden');
}

function saveSettingsModal() {
  const intervalsVal = document.getElementById('setting-intervals-input').value;
  if (intervalsVal) {
    const arr = intervalsVal.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n) && n > 0);
    if (arr.length > 0) {
      AppState.data.revisionIntervals = arr;
    }
  }

  if (window.SupabaseSync) {
    const url = document.getElementById('supabase-url-input').value.trim();
    const key = document.getElementById('supabase-key-input').value.trim();
    const enabled = document.getElementById('supabase-enabled-toggle').checked;
    window.SupabaseSync.saveConfig({
      url,
      anonKey: key,
      enabled,
      lastSync: null
    });
  }

  AppState.save();
  closeModal('modal-settings');
  renderAll();
  showToast('Settings saved successfully', 'success');
}

function exportDataBackup() {
  const payload = {
    user: AppState.currentUser,
    data: AppState.data
  };
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(payload, null, 2));
  const dlAnchor = document.createElement('a');
  dlAnchor.setAttribute('href', dataStr);
  dlAnchor.setAttribute('download', `aiapget_backup_${AppState.currentUser?.name.replace(/\s+/g, '_')}_${getTodayString()}.json`);
  dlAnchor.click();
  showToast('Backup downloaded successfully', 'success');
}

function importDataBackup(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const parsed = JSON.parse(e.target.result);
      if (parsed && (parsed.syllabus || (parsed.data && parsed.data.syllabus))) {
        AppState.data = parsed.data ? parsed.data : parsed;
        if (parsed.user) AppState.currentUser = parsed.user;
        AppState.save();
        renderAll();
        showToast('Backup restored successfully!', 'success');
        closeModal('modal-settings');
      } else {
        showToast('Invalid backup file format', 'rose');
      }
    } catch (err) {
      showToast('Error reading backup file', 'rose');
    }
  };
  reader.readAsText(file);
}

function closeModal(modalId) {
  const m = document.getElementById(modalId);
  if (m) m.classList.add('hidden');
}

function selectFocusPreset(minutes) {
  const customInput = document.getElementById('focus-custom-duration');
  if (customInput) customInput.value = minutes;

  const presets = [25, 50, 90];
  presets.forEach(p => {
    const pill = document.getElementById(`preset-${p}`);
    if (pill) {
      if (p === minutes) {
        pill.classList.add('bg-indigo-600', 'text-white');
        pill.classList.remove('bg-[#141d33]', 'text-slate-300');
      } else {
        pill.classList.remove('bg-indigo-600', 'text-white');
        pill.classList.add('bg-[#141d33]', 'text-slate-300');
      }
    }
  });
}

function startFocusSessionFromSetup() {
  const customInput = document.getElementById('focus-custom-duration');
  const select = document.getElementById('focus-topic-select');
  const customTopicInput = document.getElementById('focus-custom-topic');

  const minutes = customInput ? (parseInt(customInput.value, 10) || 25) : 25;
  const selectVal = select ? select.value : '';
  const customTopic = customTopicInput ? customTopicInput.value.trim() : '';

  const topicName = customTopic || selectVal || 'Ayurveda Shastra Deep Study';
  const category = 'AIAPGET Prep';

  FocusTimer.start(minutes * 60, topicName, category);
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  AppState.init();
  renderAll();

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').then((reg) => {
        console.log('Service Worker registered:', reg.scope);
      }).catch((err) => {
        console.warn('Service Worker registration failed:', err);
      });
    });
  }
});
