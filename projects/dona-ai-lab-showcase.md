<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=14,7,2&height=200&section=header&text=DONA%20AI%20LAB&fontSize=52&fontColor=fff&animation=twinkling&fontAlignY=35&desc=Crypto%20Trading%20Model%20Training%20%26%20Research%20Laboratory&descAlignY=55&descSize=18" width="100%"/>

<br/>

[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org/)
[![PyTorch](https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white)](https://pytorch.org/)
[![XGBoost](https://img.shields.io/badge/XGBoost-FF6600?style=for-the-badge&logo=xgboost&logoColor=white)](https://xgboost.readthedocs.io/)
[![CatBoost](https://img.shields.io/badge/CatBoost-FFCC00?style=for-the-badge&logo=yandex&logoColor=black)](https://catboost.ai/)
[![Google Colab](https://img.shields.io/badge/Colab-F9AB00?style=for-the-badge&logo=google-colab&logoColor=white)](https://colab.research.google.com/)

<br/>

> **🔬 AI trading model training lab — from data to production-ready models.**
> Transformer backbone + XGBoost/CatBoost ensemble training pipeline with GPU optimization (A100/T4/V100 auto-detection) and Telegram signal delivery.

<br/>

</div>

---

## ✨ Overview

**DONA AI Lab** is the **research and model training laboratory** behind the DONA trading ecosystem. This is where raw market data becomes trained, production-ready AI models. The lab implements a full end-to-end ML pipeline: data fetching → feature engineering → ensemble training (XGBoost + CatBoost + PyTorch Transformer) → model evaluation → Telegram signal delivery.

The training pipeline automatically detects available GPU hardware (A100, T4, V100) and scales batch sizes accordingly, from local machines to Google Colab Pro.

---

## 🔬 ML Architecture

### Ensemble Model Stack
```
Market Features (180+ dimensions)
            │
    ┌───────┼───────┐
    │       │       │
XGBoost  CatBoost  PyTorch Transformer
    │       │       │ (d_model=256, trained on GPU)
    └───────┴───────┘
            │
      Meta-Ensemble (confidence voting)
            │
      Entry / Exit Signal
```

### GPU Auto-Configuration
| GPU | Batch Size | Notes |
|---|---|---|
| **A100** | 8,192 | TF32 Tensor Cores activated |
| **V100** | 4,096 | Mixed precision |
| **T4** | 2,048 | Standard CUDA |
| **CPU** | 512 | Fallback mode |

---

## 🚀 Key Features

| Feature | Description |
|---|---|
| 📊 **Feature Refinery** | `lab_market_features_refinery.py` — 180+ technical & order flow features |
| 🤖 **Ensemble Training** | XGBoost + CatBoost + RecurrentPPO unified pipeline |
| ⚡ **GPU Optimization** | Auto-detect A100/T4/V100, enable TF32 for Tensor Cores |
| 💾 **RAM-Friendly** | 1GB RAM optimization via thread limiting + lazy imports |
| 📈 **Live Trading** | `lab_ultimate_live_trader.py` — production trading (3,800+ lines) |
| 🔄 **Data Pipeline** | `dona_data_fetcher.py` — historical + live market data ingestion |
| 📱 **Telegram Signals** | `dona_telegram_bot.py` — live signal broadcasts |
| ☁️ **Colab Support** | Automatic Colab Secrets detection for API keys |
| 🔍 **Model Inspection** | Parquet data validation, dimension checking utilities |
| 📤 **Export Pipeline** | `export_for_sale.py` — model packaging for deployment |
| 🌐 **Web Sync** | `sync_web_history.py` — cloud trade history synchronization |

---

## 🛠️ Tech Stack

```
Language:         Python 3.10+
Deep Learning:    PyTorch + RecurrentPPO (Stable Baselines3)
Gradient Boost:   XGBoost + CatBoost + LightGBM
RL Framework:     Stable Baselines3 + sb3-contrib
GPU:              CUDA (A100/T4/V100) + Google Colab
Data:             Pandas, NumPy, Parquet
Signal Delivery:  Telegram Bot API
```

---

## 📁 Project Structure

```
dona-ai-lab/
├── lab_ultimate_live_trader.py      # Production live trader (3,847 lines)
├── lab_ultra_models_tranier_sniper.py  # Model training pipeline (2,647 lines)
├── lab_market_features_refinery.py  # Feature engineering engine
├── lab_dona_config.py               # Lab configuration system
├── dona_data_fetcher.py             # Market data fetcher
├── dona_telegram_bot.py             # Telegram signal bot
├── sync_web_history.py              # Cloud history sync
├── export_for_sale.py               # Model export utility
├── models/                          # Trained model checkpoints (.pth, .pkl)
├── data/                            # Historical market data
├── logs_v9/                         # Training & trading logs
└── DONA_WEB_DEPLOY/                 # Web deployment package
```

---

## ⚡ Quick Start

**Prerequisites:** Python 3.10+, CUDA GPU (optional but recommended)

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/dona-ai-lab.git
cd dona-ai-lab

# 2. Install dependencies (auto-installed on first run)
pip install torch xgboost catboost stable-baselines3 sb3-contrib gymnasium pandas numpy

# 3. Set API keys (choose one method):
# Method A - Google Colab Secrets: add OPENAI_API_KEY to Secrets panel
# Method B - Local .env file:
cp .env.example .env

# 4. Fetch training data
python dona_data_fetcher.py

# 5. Train models
python lab_ultra_models_tranier_sniper.py

# 6. Start live trading (after model validation)
python run_bot.bat
# or:
python lab_ultimate_live_trader.py
```

---

## 📊 Training Pipeline

```
1. Data Fetch       → dona_data_fetcher.py → Parquet files
2. Feature Refinery → lab_market_features_refinery.py → 180+ features
3. Model Training   → lab_ultra_models_tranier_sniper.py
   ├── XGBoost (trend classification)
   ├── CatBoost (entry timing)
   └── PyTorch Transformer (sequential pattern recognition)
4. Evaluation       → Backtesting on validation set
5. Champion Export  → models/apex_predator_gen_XXXX.pth
6. Live Deployment  → lab_ultimate_live_trader.py
```

---

## 📈 Training History

The `01.05.26 finetune eğitim log.txt` contains full fine-tuning logs from Gen 1→3200+ evolutionary training sessions — documenting accuracy improvements, loss curves, and calibration adjustments across hundreds of generations.

---

## ⚠️ Disclaimer

> This is an active research project. Model performance varies with market conditions. Always validate any model in paper mode before live trading. Financial losses are possible. The authors accept no liability for trading outcomes.

---

## 📜 License

MIT © [Your Name](https://github.com/yourusername)

<div align="center">
<br/>
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=14,7,2&height=100&section=footer" width="100%"/>
</div>
