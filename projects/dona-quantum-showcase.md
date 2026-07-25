<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=18,10,4&height=200&section=header&text=DONA%20QUANTUM&fontSize=50&fontColor=fff&animation=twinkling&fontAlignY=35&desc=Multi-Agent%20AI%20Crypto%20Analysis%20%26%20Autonomous%20Trading&descAlignY=55&descSize=18" width="100%"/>

<br/>

[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org/)
[![CrewAI](https://img.shields.io/badge/CrewAI-FF6B6B?style=for-the-badge&logo=robot&logoColor=white)](https://crewai.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com/)
[![Binance](https://img.shields.io/badge/Binance%20API-F0B90B?style=for-the-badge&logo=binance&logoColor=black)](https://binance.com/)
[![AWS](https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)](https://aws.amazon.com/)

<br/>

> **⚛️ Multi-agent AI crew for cryptocurrency market analysis and autonomous trading.**
> CrewAI-powered analyst team + Binance live engine with ban-safe parallel scanning and 7/24 AWS deployment.

<br/>

</div>

---

## ✨ Overview

**DONA Quantum** is a **multi-agent AI trading crew** built on CrewAI and OpenAI GPT, designed for deep cryptocurrency market analysis and autonomous live trading. A coordinated team of AI agents analyzes market conditions across multiple symbols simultaneously, applies two-stage filtering (cheap klines → deep CVD/OI/LLM analysis), and executes trades via the Binance API.

The system is designed for **AWS cloud deployment** with auto-installation, Colab compatibility, and 7/24 autonomous operation.

---

## 🤖 AI Agent Crew

| Agent | Specialty | Tools |
|---|---|---|
| **Market Scanner** | Rapid opportunity detection | Klines data, volume filters |
| **Deep Analyst** | CVD, OI, LLM signal analysis | Order book, funding rates |
| **Risk Manager** | Position sizing, drawdown control | Portfolio state, risk params |
| **Executor** | Trade placement & management | Binance futures API |

---

## 🚀 Key Features

| Feature | Description |
|---|---|
| 🌐 **Ban-Safe Parallel Scan** | Two-stage filter: cheap scan → deep analysis only on candidates |
| 🧠 **LLM Market Analysis** | GPT-4 reasoning over technical indicators + order flow |
| 📊 **CVD + OI Analysis** | Cumulative Volume Delta and Open Interest tracking |
| 🔄 **Auto Paper → Live** | Seamless switch between paper and live execution |
| ☁️ **AWS Ready** | `aws_install.sh` for one-command cloud deployment |
| 🔑 **Dual Secret Support** | Google Colab Secrets OR local `.env` file |
| ⚡ **ThreadPool Scanning** | Multi-threaded parallel symbol analysis |
| 🏭 **Autonomous Live Engine** | `AutonomousLiveEngine` — self-monitoring 24/7 trading loop |
| 🌐 **Flask API** | `api.py` — REST API for remote monitoring and control |

---

## 🛠️ Tech Stack

```
Language:       Python 3.10+
AI Framework:   CrewAI (multi-agent orchestration)
LLM:            OpenAI GPT-4 / GPT-4o
Exchange:       Binance Futures API
Data:           BinanceFeed (OHLCV, order book, funding)
Simulation:     PaperEngine (full paper trading)
Concurrency:    multiprocessing.pool.ThreadPool
Deployment:     AWS EC2 / Google Colab
API:            Flask REST API
```

---

## 📁 Project Structure

```
dona-quantum/
├── main.py                    # Entry point + interactive menu
├── api.py                     # Flask REST API server
├── agents/
│   └── crew_setup.py          # CrewAI crew definition
├── core/
│   ├── paper_engine.py        # Paper trading simulation
│   ├── live_engine.py         # Autonomous live execution
│   └── config.json            # Trading configuration
├── data_feed/
│   └── binance_data.py        # Binance market data feed
├── aws_install.sh             # AWS one-command setup
├── requirements.txt
└── .env.example
```

---

## ⚡ Quick Start

**Prerequisites:** Python 3.10+, OpenAI API key, Binance account

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/dona-quantum.git
cd dona-quantum

# Auto-installs dependencies on first run!
python main.py
```

**Or on AWS:**
```bash
bash aws_install.sh
python main.py
```

**Menu Options:**
```
1️⃣  Get DONA Quantum Analysis (Full List Scan)
2️⃣  Query Specific Coin Only
3️⃣  Paper Wallet & Open Position Status
4️⃣  🚀 AUTONOMOUS AWS LIVE MODE (24/7 Real Trading)
0️⃣  Shutdown
```

---

## 🔑 Environment Variables

```env
# Google Colab: use Secrets Manager
# Local / AWS: use .env file
OPENAI_API_KEY=your_openai_key
BINANCE_API_KEY=your_binance_key
BINANCE_API_SECRET=your_binance_secret
```

---

## 🏗️ Architecture: Two-Stage Scanning

```
All symbols (50+)
       │
  Stage 1: Cheap klines filter (fast, ban-safe)
       │
  Candidates (5-10 symbols)
       │
  Stage 2: Deep analysis (CVD + OI + LLM)
       │
  High-conviction signals
       │
  AutonomousLiveEngine → Binance execution
```

This prevents API bans from over-requesting while ensuring comprehensive market coverage.

---

## ⚠️ Disclaimer

> Cryptocurrency trading involves substantial financial risk. This system is provided for research and educational purposes only. Always test with paper trading before deploying real capital. The authors are not responsible for any financial losses.

---

## 📜 License

MIT © [Your Name](https://github.com/yourusername)

<div align="center">
<br/>
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=18,10,4&height=100&section=footer" width="100%"/>
</div>
