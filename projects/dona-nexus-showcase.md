<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=20,15,8&height=200&section=header&text=DONA%20NEXUS&fontSize=52&fontColor=fff&animation=twinkling&fontAlignY=35&desc=Deep%20Reinforcement%20Learning%20Crypto%20Trading%20System&descAlignY=55&descSize=18" width="100%"/>

<br/>

[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org/)
[![PyTorch](https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white)](https://pytorch.org/)
[![Binance](https://img.shields.io/badge/Binance%20API-F0B90B?style=for-the-badge&logo=binance&logoColor=black)](https://binance.com/)
[![Stable Baselines3](https://img.shields.io/badge/Stable%20Baselines3-FF6F00?style=for-the-badge&logo=openai&logoColor=white)](https://stable-baselines3.readthedocs.io/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

<br/>

> **🧠 Production-grade deep reinforcement learning trading system.**
> Dual-policy neural network (ApexBrain) with entry/exit heads, action masking, entropy-based confidence, and live Binance futures execution.

<br/>

</div>

---

## ✨ Overview

**DONA Nexus** is a production-ready **deep reinforcement learning (DRL) trading system** for cryptocurrency futures. At its core is **ApexBrain** — a custom dual-policy PyTorch neural network that separately handles entry decisions (when/how to enter a position) and exit decisions (when to close), with sophisticated confidence metrics and action masking.

The system is designed for **7/24 autonomous operation** on VPS/AWS with live Binance API execution, configurable kill zones, and a comprehensive risk management framework defined in `dona_config.json`.

---

## 🧠 ApexBrain Architecture

**ApexBrain** is a dual-policy neural network with separate entry and exit heads:

```
Input (64-dim obs vector)
        │
   ┌────┴────┐
   │ Backbone│ (Transformer encoder, d_model=256)
   └────┬────┘
        │
   ┌────┴────────────────────┐
   │                         │
Entry Policy               Exit Policy
(backbone_entry)          (backbone_exit)
   │                         │
   ├── entry_sniper           ├── exit_main
   ├── entry_trend            └── exit_crisis
   ├── entry_momentum
   └── entry_meta (mixer)
        │
   Risk Heads: exposure + leverage
```

| Head | Output | Action Space |
|---|---|---|
| `entry_sniper` | 3-class | HOLD / L_BUY / L_SELL |
| `entry_trend` | 3-class | HOLD / L_BUY / L_SELL |
| `entry_meta` | 3-weight | Mixer for 3 entry heads |
| `exit_main` | 2-class | HOLD / CLOSE |
| `exit_crisis` | 2-class | HOLD / CLOSE (crisis override) |

---

## 🚀 Key Features

| Feature | Description |
|---|---|
| 🤖 **Dual Policy** | Separate entry/exit networks prevent policy interference |
| 🎭 **Action Masking** | Invalid actions masked to -inf (open position can't re-enter) |
| 📊 **Entropy Confidence** | True uncertainty measurement via softmax entropy |
| 🚧 **Kill Zones** | Weekend, Asian session, low-volume session filters |
| ⏱️ **Min Hold Lock** | 15-min position lock prevents premature exit noise |
| 🔥 **Temperature Scaling** | Separate entry/exit temperature calibration |
| 💀 **Hard Stop** | Hard stop at -10% ROE, independent of model |
| 📈 **Trailing Stop** | Configurable trailing activation at +5% ROE |
| 🔄 **Checkpoint Compat** | Gen-160→161+ partial weight loading (`strict=False`) |
| 🌐 **AWS Ready** | `aws_install.sh` for cloud deployment |
| 📱 **Telegram Alerts** | Live trade notifications via Telegram bot |

---

## 🛠️ Tech Stack

```
Language:       Python 3.10+
Deep Learning:  PyTorch (custom nn.Module)
RL Framework:   Stable Baselines3 + RecurrentPPO
Exchange:       Binance Futures API
Data Feed:      Real-time OHLCV + order book
Config:         dona_config.json (live calibration)
Deployment:     AWS / VPS + Task Scheduler
Notifications:  Telegram Bot API
```

---

## 📁 Project Structure

```
dona-nexus/
├── agents/
│   └── apex_brain.py          # Dual-policy neural network (ApexBrain)
├── core/
│   ├── paper_engine.py        # Paper trading simulation
│   └── live_engine.py         # Autonomous live execution engine
├── models/
│   └── apex_predator_gen_*.pth  # Champion model checkpoints
├── data/                      # Historical training data
├── live/                      # Live session logs & state
├── train/                     # Training scripts & callbacks
├── dona_config.json           # Live calibration parameters
├── requirements.txt
├── install.bat                # Windows setup
├── aws_install.sh             # AWS cloud setup
└── start_live_bot.bat         # Production launcher
```

---

## ⚙️ Configuration (`dona_config.json`)

The entire trading behavior is controlled via `dona_config.json` — no code changes needed for recalibration:

```json
{
  "trading": {
    "mode": "live",
    "symbols": ["BTCUSDT", "ETHUSDT", "SOLUSDT"],
    "live_confidence_threshold": {"BTCUSDT": 0.40, "ETHUSDT": 0.30},
    "entry_temperature": 0.45,
    "exit_temperature": 1.00,
    "hold_suppression": 0.60,
    "min_hold_sec": 900,
    "hard_stop_roe_pct": -10.0,
    "trailing_stop_activation_roe": 5.0,
    "use_killzones": true
  },
  "model": {
    "champion_path": "models/apex_predator_gen_3200.pth",
    "d_model": 256
  }
}
```

---

## ⚡ Quick Start

```bash
# 1. Clone & install
git clone https://github.com/yourusername/dona-nexus.git
cd dona-nexus
pip install -r requirements.txt   # or: ./install.bat

# 2. Set API keys
cp .env.example .env
# Add BINANCE_API_KEY, BINANCE_API_SECRET, OPENAI_API_KEY

# 3. Paper trading (safe)
python main.py  # Select option 1 (analysis) or 3 (paper wallet)

# 4. Live trading (AWS recommended)
./start_live_bot.bat
# or: python main.py → option 4 (Autonomous Live Mode)
```

---

## ⚠️ Disclaimer

> Algorithmic trading involves substantial risk of financial loss. This system is provided for educational purposes. Always validate in paper mode before live deployment. Past model performance does not guarantee future results.

---

## 📜 License

MIT © [Your Name](https://github.com/yourusername)

<div align="center">
<br/>
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=20,15,8&height=100&section=footer" width="100%"/>
</div>
