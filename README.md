# 🌿 AIAPGET StudyBuddy
> **Mobile-First Progressive Web App (PWA) for BAMS & Ayurveda PG Entrance (AIAPGET) Aspirants**

[![PWA Ready](https://img.shields.io/badge/PWA-Ready-10b981.svg)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
[![Offline First](https://img.shields.io/badge/Offline-LocalStorage-4f46e5.svg)](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
[![Theme](https://img.shields.io/badge/Theme-Dark_Midnight-070b19.svg)](https://github.com/)
[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub_Pages-blue.svg)](https://pages.github.com/)

---

## 📖 Overview

**AIAPGET StudyBuddy** is an academic, distraction-free progressive web app designed specifically for BAMS doctors and Ayurveda scholars preparing for the **AIAPGET (All India Ayush Post Graduate Entrance Test)**.

Designed with a **Dark-Midnight academic aesthetic** (`#070B19` background, elevated `#0F1629` cards) and rich Hindi + English subtitles for classical Sanskrit treatises, it integrates:
- **Per-Account Local Storage & Quick Demo Login** (Dr. Ananya Sharma)
- **Classical Sthana Picker Modal** for rapid high-level progress auditing and jumping across Sthanas
- **Dynamic Exam Countdown & Adaptive Pace Engine** (Target: May 30 annual cycle)
- **Composite Readiness Score (0–100%)** with an animated circular progress ring
- **Complete 3-Category AIAPGET Syllabus** (Brihattrayi, Laghutrayi, 15 Core BAMS Subjects) with nested Adhyayas
- **Scientific Spaced Repetition Queue** (Default Day 3, 7, 14, 21, 45 intervals) with 1-tap **Rebalance Overdue**
- **Dharana Focus Study Timer & Full-Screen Dark DND Mode** with pure Web Audio meditation singing bowl feedback
- **100% Offline-First Architecture** via `localStorage` + Service Worker, with modular Supabase Cloud Sync adapters.

---

## 📱 Navigation & App Structure

| Header / Tab | Feature | Description |
|---|---|---|
| **Header: Sthanas** | 📖 Sthana Picker | Modal listing Charaka, Sushruta, Ashtanga Hridaya, etc., with progress meters, bulk complete/incomplete toggles, and direct jump links. |
| **Header: Profile** | 🌿 Student Profile | Shows active student credentials (`Dr. Ananya Sharma`), switch between saved student accounts on the device, or register a new profile. |
| **Tab 1: Dashboard** | 📊 Countdown & Pace | May 30 countdown, required daily pace engine, circular readiness score ring, today's targets card (+10/+25 MCQs), and 1-tap "Log Studied Topic". |
| **Tab 2: Syllabus** | 📚 Comprehensive Syllabus | Real-time pending audit banner, Brihattrayi / Laghutrayi / 15 Subjects tabs, search bar, expandable Adhyayas, inline custom subtopics, and `+ Rev` buttons. |
| **Tab 3: Revisions** | 🔁 Spaced Repetition | Segregated into **Overdue**, **Due Today**, and **Upcoming**. Includes 1-tap **⚖️ Rebalance Overdue** and 3-way recall confidence ratings. |
| **Tab 4: Focus** | ⏱️ Dharana DND Mode | 25m, 50m, 90m presets, syllabus topic linking, manual offline book reading logger, and full-screen **Dharana DND Overlay** with ambient chime. |

---

## 🏛️ Comprehensive Classical Syllabus

### 1. Major Samhitas (Brihattrayi)
- **Charaka Samhita (चरक संहिता):** Sutrasthana (8 Chatushkas: Bheshaja, Swastha, Nirdesha, Kalpana, Roga, Yojana, Annapana, Sangraha), Nidanasthana (8 vyadhis), Vimanasthana (8 adhyayas), Sharirasthana (8 adhyayas), Indriyasthana (12 arishta adhyayas), Chikitsasthana (30 adhyayas), Kalpasthana (12 vamana/virechana kalpas), and Siddhisthana (12 basti/vyapad adhyayas).
- **Sushruta Samhita (सुश्रुत संहिता):** Sutrasthana (46 adhyayas: Yantra, Shastra, Kshara, Agnikarma, Jalauka, Vrana), Nidanasthana (16 adhyayas), Sharirasthana (10 adhyayas: 107 Marmas, Sira, Dhamani), Chikitsasthana (40 adhyayas: Shashti Upakrama, Bhagna, Anorectal), Kalpasthana (8 Agada adhyayas), and Uttaratantra (66 adhyayas: Shalakya & Kaumarabhritya).
- **Ashtanga Hridaya (अष्टाङ्ग हृदयम्):** Sutrasthana (30 adhyayas: Dinacharya, Ritucharya, Vegas, Doshabhediya), Sharirasthana, Nidanasthana, Chikitsasthana, Kalpasiddhisthana, and Uttarasthana.
- **Ashtanga Sangraha (अष्टाङ्ग सङ्ग्रहः):** Distinct views, 40 Sutrasthana chapters, unique commentators (Indu Shashilekha).

### 2. Minor Samhitas (Laghutrayi & Others)
- **Madhava Nidana (माधव निदानम्):** Purvardha & Uttarardha (79 chapters, Pancha Nidana, Amlapitta, Shula, Kshudrarogas).
- **Sharangadhara Samhita (शार्ङ्गधर संहिता):** Prathama Khanda (Paribhasha, Mana, Nadi, Shvasana), Madhyama Khanda (Panchavidha Kashaya Kalpana, Sneha Paka, Sandhana), Uttara Khanda (Netrakarma, Panchakarma).
- **Bhavaprakasha (भावप्रकाश):** Purva Khanda & Nighantu Varga, introduction of Phiranga & exotic herbs, Madhyama & Uttara Khanda.
- **Kashyapa Samhita (काश्यप संहिता):** Kaumarabhritya: Jatakarma, Lehana, Dhatri, Phakka, 20 Revati grahas, Khilasthana (Pushpaghni Jataharini).
- **Bhela & Harita Samhita (भेल व हारीत संहिता):** Alochaka Pitta duality, Manas concepts, 8-fold Jwara, Mrittika-bhakshana Pandu, and Karmavipaka.
- **Yoga Ratnakara & Chakradatta (योगरत्नाकर व चक्रदत्त):** Ashta Sthana Pariksha (Nadi, Mutra, Mala, Jihva, Shabda, Sparsha, Druk, Akruti), Mutra Taila Bindu test, Parpati kalpanas, and Ksharasutra.

### 3. 15 Core BAMS Subjects
- Kayachikitsa, Dravyaguna Vijnana, Rasashastra & Bhaishajya Kalpana, Shalya Tantra, Shalakya Tantra, Prasuti Tantra & Stri Roga, Kaumarabhritya, Panchakarma, Roganidana & Vikriti Vigyana, Rachana Sharira, Kriya Sharira, Padartha Vigyana & Ayurveda Itihasa, Samhita Siddhanta, Swasthavritta & Yoga, and Agada Tantra & Vyavahara Ayurveda.

---

## ⚡ Quick Start & Local Server

To run locally:
```bash
cd C:\Users\dipal\.gemini\antigravity\scratch\aiapget-studybuddy
node server.js
```
Open **[http://localhost:3000](http://localhost:3000)** in any browser.

---

## 🚀 Deploying to GitHub Pages (Static Hosting)

1. Initialize a git repository and commit the folder:
   ```bash
   git init
   git add .
   git commit -m "AIAPGET StudyBuddy PWA initial release"
   git branch -M main
   git remote add origin https://github.com/<your-username>/aiapget-studybuddy.git
   git push -u origin main
   ```
2. In your GitHub repository:
   - Go to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
   - Select `main` branch and `/ (root)` folder.
   - Click **Save**.
3. Live in 1 minute at `https://<your-username>.github.io/aiapget-studybuddy/`.

---

## 📲 Install as Mobile PWA

- **Android (Chrome):** Tap browser menu `⋮` > **"Add to Home screen"** or **"Install App"**.
- **iOS / iPhone (Safari):** Tap **Share** button > **"Add to Home Screen"**.
