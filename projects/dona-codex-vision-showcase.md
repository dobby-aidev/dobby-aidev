<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=2,8,15&height=200&section=header&text=DONA%20CODEX%3A%20VISION&fontSize=42&fontColor=fff&animation=twinkling&fontAlignY=35&desc=Proprietary%20Transformer%20LLM%20for%20Financial%20%26%20Crypto%20Intelligence&descAlignY=55&descSize=17" width="100%"/>

<br/>

[![PyTorch](https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white)](https://pytorch.org/)
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org/)
[![Transformers](https://img.shields.io/badge/Transformers-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black)](https://huggingface.co/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)

<br/>

> **🧠 A proprietary Transformer LLM foundation model fine-tuned on financial market datasets.**
> Trained on crypto price action, US Treasury yield bonds, X (Twitter) news streams, and trader execution psychology.

<br/>

</div>

---

## ✨ Overview

**Dona Codex: Vision** is a **custom-trained Transformer LLM platform** engineered specifically for real-time financial market reasoning, risk management, and interactive trader co-piloting.

Unlike generic wrapper apps, **Dona Codex: Vision** is built on a **proprietary Transformer model** pre-trained and fine-tuned by **Dobby B (@dobby-aidev)**. It digests multi-modal financial inputs — from real-time crypto order flows (CVD & Open Interest) to macro indicators (US 10-Year Treasury Yields) and live X (Twitter) crypto breaking news.

The web application provides a ChatGPT/Gemini-style conversational interface augmented with:
- 📈 **Live Crypto Ticker Streams** (`BTC/USDT`, `ETH/USDT`, `SOL/USDT`, `BNB/USDT`...)
- 💼 **Interactive Trading Journal** (`İşlem Defteri`)
- 📡 **Market Sentiment Radar** (`Piyasa Radarı`)
- 🤖 **Psychological Co-Pilot Persona** ("Patron, benim sana önerim...")

---

## 🧠 Model Architecture & Training Pipeline

| Pipeline Component | Data Source & Architecture | Technical Purpose |
|---|---|---|
| **Transformer Base Engine** | Custom PyTorch Multi-Head Self-Attention Transformer | Core language generation, financial reasoning, & context memory |
| **Crypto Market Data** | Binance Futures API, CVD, Open Interest, Order Flow | Real-time sentiment scoring & price action context |
| **Macro Financial News** | US 10-Year Treasury Yield Bonds, Fed Rate Expectations | Macroeconomic risk weighting & market regime detection |
| **Social Intelligence** | X (Twitter) Live Crypto News Streams & Sentiment Feeds | Rapid breaking news detection & volatility warnings |
| **Execution Psychology** | Custom Trader Journal & Risk Management Heuristics | Behavioral analysis, anti-FOMO warnings, & drawdown protection |

---

## 🚀 Key Features

| Feature | Description |
|---|---|
| 🤖 **Custom Transformer Core** | Proprietary LLM fine-tuned specifically for crypto and macro finance reasoning |
| 💬 **Interactive Chat Studio** | ChatGPT/Gemini-like conversational UI tailored for financial strategy |
| 📊 **Live Ticker Stream Bar** | Real-time WebSocket ticker stream for major crypto pairs across the top bar |
| 💼 **Trading Journal Engine** | Log trades, track execution mental states, and analyze historical performance |
| 📡 **Market Radar Panel** | Detect anomaly volume spikes, liquidation cascades, and news sentiment |
| 🛡️ **Anti-FOMO Guardrails** | AI recognizes emotional over-trading and recommends rest cycles ("Patron, biraz dinlenelim") |
| ⚡ **WebSocket Streaming** | Token-by-token response streaming via FastAPI & WebSockets |
| 🌙 **Deep Obsidian Dark UI** | Modern minimalist interface optimized for multi-monitor trading setups |

---

## 🛠️ Tech Stack

```
AI & Model Core:  PyTorch + Hugging Face Transformers + Custom Fine-Tuning Pipeline
Datasets:         Binance Futures Data + US Treasury Bonds + X (Twitter) Crypto News
Backend API:      Python 3.11+ + FastAPI + Uvicorn + WebSockets
Frontend UI:      React 18 + TypeScript + Vite + Tailwind CSS
State & Storage:  Firebase Firestore + Redis Caching
Design Aesthetic: Geist / Linear Dark Minimalist (#09090b)
```

---

## 📁 Project Structure

```
dona-codex-vision/
├── model/
│   ├── transformer_core.py      # PyTorch multi-head attention LLM definition
│   ├── train_finetune.py        # Fine-tuning pipeline script
│   ├── dataset_loader.py        # Multi-source dataset parser (Crypto, Bonds, X News)
│   └── inference_engine.py      # Token streaming & KV-cache inference
├── backend/
│   ├── main.py                  # FastAPI WebSocket & REST API server
│   ├── market_radar.py          # Real-time CVD, OI & News sentiment aggregator
│   └── journal_service.py       # Trading journal CRUD & psychological state tracker
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatWindow.tsx   # Live conversational window & streaming markdown
│   │   │   ├── TickerBar.tsx    # Top real-time crypto price ticker
│   │   │   ├── Sidebar.tsx      # Chat history, Journal & Radar navigation
│   │   │   └── JournalModal.tsx # Trading Journal interface
│   │   └── App.tsx              # Main dashboard layout
│   └── index.css                # Dark minimalist styling
└── README.md
```

---

## ⚡ Quick Start

### 1. Backend Server Setup (FastAPI & Inference)

```bash
# Clone the repository
git clone https://github.com/dobby-aidev/dona-codex-vision-showcase.git
cd dona-codex-vision-showcase/backend

# Create & activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Launch FastAPI inference server
uvicorn main:app --reload --port 8000
```

### 2. Frontend App Setup (React + Vite)

```bash
cd ../frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to launch the **Dona Codex: Vision** platform.

---

## 👤 Author & License

Developed with ❤️ by **Dobby B (@dobby-aidev) — AI Dev**.

- **GitHub**: [@dobby-aidev](https://github.com/dobby-aidev)
- **Whop Store**: [whop.com/dona-ai](https://whop.com/dona-ai)
- **LinkedIn**: [in/dobbyb-aidev](https://www.linkedin.com/in/dobbyb-aidev)
- **X (Twitter)**: [@dobbyb_ai](https://x.com/dobbyb_ai)

Distributed under the **MIT License**.
