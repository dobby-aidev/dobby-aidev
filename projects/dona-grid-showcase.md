<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=24,21,17&height=200&section=header&text=DONA%20GRID&fontSize=55&fontColor=fff&animation=twinkling&fontAlignY=35&desc=Algorithmic%20Spot%20Grid%20Trading%20Engine%20%7C%20Binance&descAlignY=55&descSize=18" width="100%"/>

<br/>

[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org/)
[![Binance](https://img.shields.io/badge/Binance%20API-F0B90B?style=for-the-badge&logo=binance&logoColor=black)](https://binance.com/)
[![NumPy](https://img.shields.io/badge/NumPy-013243?style=for-the-badge&logo=numpy&logoColor=white)](https://numpy.org/)
[![Pandas](https://img.shields.io/badge/Pandas-150458?style=for-the-badge&logo=pandas&logoColor=white)](https://pandas.pydata.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

<br/>

> **📈 Autonomous spot grid trading engine for Binance.**
> Smart ATR-recentering grids, RSI filtering, anti-toxicity logic, paper/live trading, and a full GUI dashboard — all in Python.

<br/>

</div>

---

## ✨ Overview

**DONA Grid** is a production-grade **algorithmic grid trading bot** for Binance spot markets. It implements an advanced `SpotVenomSniper` grid strategy with dynamic ATR-based recentering, multi-threaded price monitoring at 0.5s latency, and intelligent anti-toxicity filters to protect against adverse market conditions.

The system supports both **paper trading** (simulated via `DonaPaperEngine`) and **live trading** via signed Binance API requests, with a full GUI dashboard for real-time monitoring.

---

## 🚀 Core Features

| Feature | Description |
|---|---|
| 📐 **Smart Grid Engine** | Configurable grid levels with ATR-based dynamic recentering |
| ⚡ **Hyper-Socket Monitoring** | WebSocket price feed at 0.5s latency (vs 20s polling) |
| 🛡️ **Anti-Toxicity Logic** | RSI filter + stop-loss + take-profit guard layers |
| 📊 **Paper Mode** | Full `DonaPaperEngine` simulation before going live |
| 🖥️ **GUI Dashboard** | Real-time `dona_gui.py` monitoring panel with live P&L |
| 📰 **News Engine** | `dona_news.py` for market sentiment filtering |
| 🔒 **Encrypted Vault** | API keys stored in `dona_vault.v68` (encrypted) |
| 🤖 **ATR Recentering** | Grid automatically repositions around current price |
| 🧮 **Multi-Symbol Support** | Run parallel grid instances across multiple pairs |
| 🖥️ **VPS Ready** | `startup_vps.bat` + `vps_launcher.py` for unattended server deployment |

---

## ⚙️ Strategy Parameters

```python
config = {
    "lower": 95000,        # Grid lower bound (price)
    "upper": 105000,       # Grid upper bound (price)
    "grids": 20,           # Number of grid levels
    "stop_loss": 0.95,     # Stop loss at 95% of lower bound
    "take_profit": 1.05,   # Take profit at 105% of upper bound
    "timeout": 21600       # Max runtime: 6 hours
}
```

---

## 🛠️ Tech Stack

```
Language:     Python 3.10+
Exchange:     Binance Spot API (HMAC-SHA256 signed)
Data:         NumPy, Pandas
Real-Time:    WebSocket (websocket-client)
GUI:          Tkinter / CustomTkinter (dona_gui.py)
Scheduling:   Threading + event loop
Deployment:   VPS (Windows/Linux batch launcher)
```

---

## 📁 Project Structure

```
dona-grid/
├── dona_venom_executor.py    # Core grid engine (SpotVenomSniper, 625 lines)
├── dona_venom_hunter.py      # Multi-symbol hunter & opportunity scanner
├── dona_ai_grid.py           # AI-powered grid parameter optimizer
├── dona_gui.py               # Real-time GUI monitoring dashboard
├── dona_paper_engine.py      # Paper trading simulation engine
├── dona_api_core.py          # Binance API rate-limit manager
├── dona_vault.py             # Encrypted API key storage
├── dona_news.py              # News sentiment engine
├── vps_launcher.py           # VPS deployment orchestrator
├── startup_vps.bat           # Windows auto-start script
├── requirements.txt
└── DONA_STRATEGY_PLAN.md     # Strategy documentation
```

---

## ⚡ Quick Start

**Prerequisites:** Python 3.10+, Binance account with API access

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/dona-grid.git
cd dona-grid

# 2. Install dependencies
pip install -r requirements.txt

# 3. Store API keys (encrypted)
python dona_vault.py --store

# 4. Run in paper mode (safe)
python dona_venom_executor.py --paper

# 5. Launch GUI dashboard
python dona_gui.py

# 6. VPS deployment
python vps_launcher.py
```

---

## 🔐 Security

- API keys are **never stored in plaintext** — encrypted via `dona_vault.v68`
- All Binance requests use **HMAC-SHA256 signatures**
- Paper mode available for strategy validation before live deployment

---

## ⚠️ Disclaimer

> This software is for educational purposes only. Algorithmic trading involves substantial risk of financial loss. Always test in paper mode before deploying with real funds. Past performance does not guarantee future results.

---

## 📜 License

MIT © [Your Name](https://github.com/yourusername)

<div align="center">
<br/>
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=24,21,17&height=100&section=footer" width="100%"/>
</div>
