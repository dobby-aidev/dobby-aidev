<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12,18,24&height=200&section=header&text=ZAMANI%E2%80%99N%20BEKC%CC%A7I%CC%87SI%CC%87&fontSize=45&fontColor=fff&animation=twinkling&fontAlignY=35&desc=Time-Travel%20Interactive%20Text%20Adventure&descAlignY=55&descSize=18" width="100%"/>

<br/>

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

<br/>

> **⏳ Navigate time itself. Make choices that echo across civilizations.**
> A narrative text-adventure spanning Ancient Egypt, the Medieval era, the Cyberpunk future, and beyond.

<br/>

</div>

---

## ✨ Overview

**Zamanın Bekçisi** (*The Guardian of Time*) is an immersive, branching interactive fiction game set across multiple historical eras. You play as a temporal agent sent to fix anomalies in the timeline — each decision costs energy, unlocks items, and shapes the outcome of history.

Built entirely in **React + TypeScript** with cinematic **Framer Motion** animations, the game features a rich story graph with dozens of interconnected nodes across 5 distinct time periods.

---

## 🌍 Time Periods

| Era | Year | Setting |
|---|---|---|
| 🏙️ **Günümüz** | 2026 | Time Agency HQ — Briefing and departure |
| 🏺 **Antik Mısır** | MÖ 2500 | Giza Plateau — Anti-gravity technology anomaly |
| ⚔️ **Orta Çağ** | ~1200s | Medieval kingdoms — Rogue AI interference |
| 🤖 **Siber Gelecek** | 2087 | Cyberpunk megacity — Neural network uprising |
| ❓ **Bilinmeyen** | ??? | Hidden realm — Ultimate confrontation |

---

## 🎮 Gameplay Mechanics

| Feature | Description |
|---|---|
| ⚡ **Energy System** | Every action costs energy (100 max) — manage it wisely |
| 🎒 **Item Collection** | Find and use ancient artifacts across timelines |
| 🔀 **Branching Narrative** | Dozens of nodes — every choice matters |
| 💡 **Hint System** | Spend 5 energy to unlock strategic hints |
| 🚪 **Choice Types** | `portal`, `door`, `action`, `combat`, `hack` mechanics |
| 💀 **Multiple Endings** | Victory, defeat, and secret paths await |

---

## 🛠️ Tech Stack

```
Frontend:    React 18 + TypeScript
Build Tool:  Vite
Animations:  Motion (Framer Motion)
Icons:       Lucide React
State:       React useState + useMemo
Styling:     Tailwind CSS
```

---

## 📁 Project Structure

```
zamanın-bekçisi/
├── src/
│   ├── App.tsx       # Complete game engine + story graph (780 lines)
│   ├── index.css     # Global styles
│   └── main.tsx      # React entry point
├── index.html
├── vite.config.ts
└── package.json
```

---

## ⚡ Quick Start

**Prerequisites:** Node.js 18+

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/zamanin-bekcisi.git
cd zamanin-bekcisi

# 2. Install dependencies
npm install

# 3. Start the game
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and begin your temporal mission.

---

## 🏗️ Architecture

### Story Graph System
The entire narrative is stored as a `Record<string, StoryNode>` — a directed graph where each node contains:

```typescript
interface StoryNode {
  id: string;
  era: Era;
  year: string;
  title: string;
  text: string;
  hint?: string;
  choices: Choice[];  // Each choice connects to another node
}
```

### Choice Types
```typescript
type ChoiceType = 'portal' | 'door' | 'action' | 'combat' | 'hack';
```

Each choice carries an `energyCost`, optional `requiredItem` gate, and `gainedItem` reward — creating a lightweight RPG inventory system within a pure story graph.

---

## 🗺️ Story Graph Preview

```
start ──→ start_scan ──→ egypt_arrival
                              │
              ┌───────────────┼───────────────┐
              ↓               ↓               ↓
         egypt_tomb    egypt_sabotage   egypt_confront
              │               │
              └───────────────┘
                     │
                  medieval
                     │
                 cyberpunk
                     │
               final_confrontation
```

---

## 🌟 Design Highlights

- **Zero Backend Required** — All state lives in React, runs fully client-side
- **Cinematic Transitions** — `AnimatePresence` + layout animations between story nodes
- **Era-Themed Color Palettes** — Each time period has unique visual theming
- **Accessibility** — Keyboard-navigable, semantic HTML5 structure

---

## 📜 License

MIT © [Your Name](https://github.com/yourusername)

<div align="center">
<br/>
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12,18,24&height=100&section=footer" width="100%"/>
</div>
