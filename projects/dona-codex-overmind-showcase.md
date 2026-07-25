<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=2,8,15&height=200&section=header&text=DONA%20CODEX%3A%20OVERMIND&fontSize=42&fontColor=fff&animation=twinkling&fontAlignY=35&desc=Autonomous%20Multi-Agent%20AI%20Company%20OS&descAlignY=55&descSize=18" width="100%"/>

<br/>

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=white)](https://socket.io/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini%20AI-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)

<br/>

> **🧠 A local-first, multi-agent AI company simulation system.**
> Deploy autonomous AI agents as CEO, Researcher, Developer, and Analyst — watch them run your virtual company in real-time.

<br/>

</div>

---

## ✨ Overview

**Dona Codex: Overmind** is a professional-grade **SaaS simulation platform** where multiple AI agents autonomously run a virtual software company. Built on a React + Node.js + Firebase stack, it serves as the **Overmind.OS** — a control center where you monitor AI agents conducting R&D, writing code, performing market analysis, and managing finances — all without human intervention.

This is not just a demo: it's a fully-wired multi-agent orchestration system with real-time WebSocket telemetry, Firebase persistence, and pluggable LLM backends (Gemini API or local Ollama).

---

## 🤖 Agent Workforce

| Node | Role | Responsibilities |
|---|---|---|
| **Alpha Node** | CEO / Chief Architect | Macro strategy, project approval, inter-agent coordination |
| **Beta Node** | Chief Researcher | OSINT data gathering, sector analysis, theoretical frameworks |
| **Gamma Node** | Senior Engineer | Rapid prototyping, code generation, product shipping |
| **Delta Node** | Market Analyst / Finance | Market reaction tracking, pricing optimization, capital flow |

---

## 🚀 Key Features

| Feature | Description |
|---|---|
| 🏢 **Company Simulation Loop** | Persistent game loop: agents tick every cycle, run tasks autonomously |
| 🔄 **Real-Time WebSockets** | Socket.IO broadcasts agent states, logs, and project progress live |
| 🧠 **LLM-Powered Agents** | Each agent calls Gemini API (or local Ollama) to reason and act |
| 🗄️ **Firebase Persistence** | Isolated Firestore per user: `users/{uid}/companies/{companyId}` |
| 🔐 **Firebase Auth** | Google OAuth + Email/Password with secure session management |
| 📋 **Task Queue System** | Claim/release task architecture prevents agent conflicts |
| 🏗️ **Project Lifecycle** | Launch → Develop → Export pipeline with staged milestones |
| 🧪 **Upgrades & Training** | Buy hardware upgrades and train individual agents to improve performance |
| 📊 **Live Telemetry Panel** | Split-pane dashboard: company list + live Overmind console |
| 🔧 **Local LLM Support** | Configurable Ollama endpoint (e.g., `localhost:11434`, model: `llama3`) |
| 🐙 **GitHub API Optimizer** | Built-in rate-limit-aware GitHub integration for project export |

---

## 🛠️ Tech Stack

```
Frontend:      React 18 + TypeScript + Tailwind CSS v4
Animations:    Motion (Framer Motion)
Backend:       Express.js + Node.js (Single Process Architecture)
Real-Time:     Socket.IO WebSockets
AI:            Google Gemini API / Ollama (local LLM)
Database:      Firebase Firestore
Auth:          Firebase Authentication
Build:         Vite
```

---

## 📁 Project Structure

```
dona-codex-overmind/
├── src/
│   ├── server/
│   │   ├── simulation.js        # Core game loop & state machine
│   │   ├── firebase.js          # Firestore CRUD operations
│   │   ├── ceoAgent.js          # Alpha Node: goal decomposition
│   │   ├── researcherAgent.js   # Beta Node: OSINT research
│   │   ├── developerAgent.js    # Gamma Node: code generation
│   │   ├── analystAgent.js      # Delta Node: market analysis
│   │   └── taskQueue.js         # Concurrent task claim system
│   └── types.ts                 # Shared LLMConfig, GameState types
├── server.ts                    # Express + Socket.IO orchestration (1200+ lines)
├── firebase-applet-config.json  # Firebase project config
├── firestore.rules              # Security rules
└── github-api-optimizer/        # Custom GitHub rate-limit optimizer
```

---

## ⚡ Quick Start

**Prerequisites:** Node.js 18+, Firebase project, Gemini API key

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/dona-codex-overmind.git
cd dona-codex-overmind

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env.local
# Add GEMINI_API_KEY and Firebase credentials

# 4. Development mode (Vite + Express concurrently)
npm run dev

# 5. Production build
npm run build
npm run start
```

---

## 🏗️ Architecture Highlights

### Single Process Architecture (SPA Backend)
The entire backend — Express REST API, Socket.IO server, and simulation loop — runs as a single Node.js process. This enables:
- **Zero cold-start** between API calls and WebSocket events
- **Shared in-memory state** between simulation and transport layers
- **Debounced Firestore saves** (2s buffer) to minimize write operations

### Task Queue with Claim System
```typescript
getPendingTasks() → claimPendingTask(agentId) → executeTask() → updateTaskStatus()
```
Prevents multiple agents from working on the same task simultaneously.

### Simulation Tick Loop
Each tick evaluates all active agents → runs their LLM reasoning → updates project progress → broadcasts via WebSocket → debounces Firestore save.

---

## 🔧 LLM Configuration

Configure your LLM backend in the settings modal:

```json
{
  "provider": "gemini",     // or "ollama"
  "endpoint": "http://localhost:11434",
  "model": "llama3"
}
```

---

## 📜 License

MIT © [Your Name](https://github.com/yourusername)

<div align="center">
<br/>
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=2,8,15&height=100&section=footer" width="100%"/>
</div>
