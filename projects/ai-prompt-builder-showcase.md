<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=200&section=header&text=AI%20PROMPT%20BUILDER&fontSize=50&fontColor=fff&animation=twinkling&fontAlignY=35&desc=Conversational%20AI%20Prompt%20Optimization%20Engine&descAlignY=55&descSize=18" width="100%"/>

<br/>

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Gemini AI](https://img.shields.io/badge/Gemini%20AI-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

<br/>

> **🤖 Design production-grade prompts for elite AI models through structured conversation.**
> Built with Gemini API, React, and a premium glassmorphism UI — available in Turkish & English.

<br/>

</div>

---

## ✨ Overview

**AI Prompt Builder** is a conversational prompt engineering tool that transforms your raw ideas into high-fidelity, production-ready prompts for Gemini, ChatGPT, and other large language models. Instead of writing prompts manually, you **chat** with the system — and it structures, refines, and compiles the perfect prompt for your use case.

The app features a full **coin economy**, **PDF/JSON export**, **history management**, and a **dual-language** interface (TR/EN) — making it suitable as a premium mobile-ready web application.

---

## 🚀 Features

| Feature | Description |
|---|---|
| 💬 **Conversational Builder** | Chat-based prompt design instead of manual writing |
| 🧠 **Gemini API Integration** | Real-time AI optimization via Google Gemini |
| 🌐 **Bilingual UI** | Full Turkish & English interface with toggle |
| 📂 **8 Domain Categories** | Web, Mobile, AI/Python, Crypto, Academic, SEO, DB, Automation |
| 📄 **PDF & JSON Export** | Download your prompts via `jsPDF` for external use |
| 🪙 **Coin Economy** | Rewarded ad system + coin packs for prompt generation |
| 📜 **History System** | Browse, restore, and manage past prompt sessions |
| 🎨 **Glassmorphism UI** | Framer Motion animations + premium dark mode |
| 🔄 **Dynamic Refinement** | Apply constraints iteratively to improve prompts |
| 📱 **Mobile-Ready** | Responsive layout optimized for all screen sizes |

---

## 🛠️ Tech Stack

```
Frontend:    React 18 + TypeScript
Build Tool:  Vite
Animations:  Motion (Framer Motion)
AI Backend:  Google Gemini API
PDF Export:  jsPDF
Icons:       Lucide React
Styling:     Tailwind CSS + Custom CSS
```

---

## 📁 Project Structure

```
ai-prompt-builder/
├── src/
│   ├── App.tsx           # Core UI logic (2500+ lines, full state machine)
│   ├── types.ts          # Language/Category types + full UI translation map
│   ├── index.css         # Global styles + glassmorphism theme
│   └── services/         # Gemini API service layer
├── index.html
├── vite.config.ts
├── tsconfig.json
└── .env.example
```

---

## ⚡ Quick Start

**Prerequisites:** Node.js 18+

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/ai-prompt-builder.git
cd ai-prompt-builder

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env.local
# Add your GEMINI_API_KEY to .env.local

# 4. Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to see the app.

---

## 🔑 Environment Variables

```env
GEMINI_API_KEY=your_google_gemini_api_key_here
```

Get your free API key at [Google AI Studio](https://aistudio.google.com/app/apikey).

---

## 🎯 How It Works

```
1. Choose Language (TR/EN) & Category (Web/AI/Crypto/...)
2. Chat with the AI to describe your use case
3. The system interactively extracts requirements
4. Click "Generate" — Gemini compiles the perfect prompt
5. Refine iteratively with constraints
6. Export as PDF or JSON
```

---

## 🏗️ Architecture Highlights

- **State Machine Design**: The app uses a multi-phase conversational flow (`splash → category → chat → output → editor`)
- **Inline Token Highlighting**: Custom-built syntax highlighter for system prompt visualization
- **Coin Economy Engine**: In-app currency system with rewarded video ad simulation and premium pack management
- **Dual Export Pipeline**: Both PDF (jsPDF) and structured JSON for downstream integration

---

## 📸 Screenshots

> *Premium glassmorphism UI with animated chat interface, full-screen prompt editor, and coin reward system.*

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---

## 📜 License

MIT © [Your Name](https://github.com/yourusername)

<div align="center">
<br/>
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=100&section=footer" width="100%"/>
</div>
