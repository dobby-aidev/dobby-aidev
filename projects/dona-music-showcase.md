<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,12,21&height=200&section=header&text=DONA%20MUSIC&fontSize=52&fontColor=fff&animation=twinkling&fontAlignY=35&desc=AI-Powered%20Music%20Streaming%20Growth%20Automation&descAlignY=55&descSize=18" width="100%"/>

<br/>

[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org/)
[![Selenium](https://img.shields.io/badge/Selenium-43B02A?style=for-the-badge&logo=selenium&logoColor=white)](https://selenium.dev/)
[![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)](https://sqlite.org/)
[![Android](https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white)](https://developer.android.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

<br/>

> **🎵 Autonomous music streaming growth automation platform.**
> Multi-profile browser orchestration, human behavior simulation, mobile/desktop support, and a real-time analytics dashboard.

<br/>

</div>

---

## ✨ Overview

**DONA Music** is a sophisticated automation framework for music streaming platform research and growth testing. It combines stealth browser automation, human behavior simulation engines, multi-account management, and a comprehensive analytics dashboard — all orchestrated from a single control system.

The platform supports both **desktop web automation** (via Selenium Wire + Stealth) and **mobile automation** (via UIAutomator2/ADB), with an SQLite-backed account management system and real-time logging.

---

## 🚀 Core Features

| Feature | Description |
|---|---|
| 🌐 **Stealth Browser Engine** | Selenium Wire + `selenium-stealth` for fingerprint evasion |
| 🤖 **Human Behavior Engine** | `human_behavior_engine.py` — realistic mouse movements, timing patterns |
| 📱 **Mobile Automation** | UIAutomator2 + ADB for Android device control |
| 👤 **Persona System** | Unique browser profiles with realistic user personas |
| 🌍 **Proxy Manager** | Multi-proxy rotation with `proxy_utils.py` |
| 📊 **Analytics Dashboard** | `dashboard.py` — real-time session metrics and reporting |
| 🗄️ **SQLite Database** | `dona_music.db` — full account, session, and task tracking |
| 🔒 **AdsPower Integration** | Anti-detect browser profile management |
| 🧠 **RL Behavior Agent** | `rl_behavior_agent.py` — reinforcement learning for behavior optimization |
| 🔄 **Multi-Account System** | Create, manage, and cycle accounts at scale |
| 🛡️ **Error Recovery** | Automatic session recovery and retry mechanisms |
| 📋 **Task Scheduler** | CSV-based task queue with priority management |

---

## 🛠️ Tech Stack

```
Language:      Python 3.10+
Browser:       Selenium Wire + selenium-stealth (desktop)
Mobile:        UIAutomator2 + ADB (Android)
Database:      SQLite (dona_music.db)
Dashboard:     Flask + custom UI (dashboard.py)
Profiles:      AdsPower API integration
Proxies:       Rotating proxy pool (CSV-based)
RL:            Custom RL behavior optimization agent
```

---

## 📁 Project Structure

```
dona-music/
├── worker.py                  # Core automation worker (9,700+ lines)
├── manager.py                 # Multi-account orchestration manager
├── dashboard.py               # Real-time analytics dashboard
├── tiktok_automation.py       # Platform-specific automation module
├── human_behavior_engine.py   # Realistic behavior simulation
├── rl_behavior_agent.py       # RL-based behavior optimizer
├── persona_engine.py          # User persona generator
├── proxy_utils.py             # Proxy rotation & validation
├── antidetect_manager.py      # AdsPower profile management
├── db_manager.py              # SQLite database layer
├── account_creator.py         # Automated account creation
├── Dona_Mobile/               # Android automation subsystem
├── personas/                  # Generated persona profiles
└── dona_music.db              # SQLite database
```

---

## ⚡ Quick Start

**Prerequisites:** Python 3.10+, Chrome/Chromium, Android device (optional)

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/dona-music.git
cd dona-music

# 2. Quick launch (auto-installs dependencies)
./baslat_hizli.bat
# or manually:
pip install -r requirements.txt

# 3. Launch main worker
python worker.py

# 4. Launch dashboard
python dashboard.py

# 5. Mobile automation (requires ADB)
python nexus_main.py
```

---

## 🧠 Architecture Highlights

### Human Behavior Engine
Simulates realistic user interactions:
- Variable typing speeds with natural pauses
- Randomized scroll patterns and dwell times
- Mouse trajectory curves with micro-jitter
- Session duration distributions matching real users

### RL Behavior Agent
A reinforcement learning agent that:
- Learns optimal interaction patterns from session outcomes
- Adapts timing and behavior based on detection signals
- Continuously improves evasion strategy over time

### Multi-Platform Support
- **Desktop**: Chrome + Selenium Wire (fingerprint-cleaned)
- **Mobile**: Android devices via ADB + UIAutomator2
- **Server**: VPS-ready headless operation

---

## ⚠️ Disclaimer

> This project is for **research and educational purposes only**. Automation of streaming platforms may violate their Terms of Service. Users are solely responsible for ensuring compliance with applicable laws and platform policies.

---

## 📜 License

MIT © [Your Name](https://github.com/yourusername)

<div align="center">
<br/>
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,12,21&height=100&section=footer" width="100%"/>
</div>
