# 🐙 GitHub Setup Guide — dobby-aidev

Tüm projeleri GitHub'a yüklemek için adım adım rehber.

---

## ✅ Ön Koşullar

```bash
# Git kurulu mu kontrol et
git --version

# GitHub CLI (opsiyonel ama hız kazandırır)
gh --version

# Global Git ayarları (bir kere yap)
git config --global user.name "dobby-aidev"
git config --global user.email "your@email.com"
```

---

## 🔑 GitHub Authentication

```bash
# GitHub CLI ile giriş (önerilen)
gh auth login

# veya SSH key oluştur
ssh-keygen -t ed25519 -C "your@email.com"
cat ~/.ssh/id_ed25519.pub
# Çıktıyı GitHub → Settings → SSH Keys → New SSH Key'e yapıştır
```

---

## 🚀 Profil Vitrin Reposu (İlk Önce!)

```bash
# 1. GitHub'da "dobby-aidev" isimli özel repo oluştur (Settings → Repositories)
# 2. Bu klasörden push yap:

cd "C:\Users\ferda\Desktop\GitHub Portfolio"

git init
git add README.md
git commit -m "feat: add professional profile vitrin README"
git branch -M main
git remote add origin https://github.com/dobby-aidev/dobby-aidev.git
git push -u origin main
```

---

## 📦 Proje Push Komutları

### 🕵️ Agent Critiq

```bash
cd "C:\Users\ferda\Desktop\GitHub Portfolio\Agent Critiq"

git init
git add .
git commit -m "feat: initial professional release — AI discovery & review platform"
git branch -M main
git remote add origin https://github.com/dobby-aidev/agent-critiq.git
git push -u origin main
```

**GitHub'da Topics ekle:**
`ai-tools`, `mcp-server`, `review-platform`, `typescript`, `react`, `hugging-face`

---

### 🧠 Dona Codex: Overmind

```bash
cd "C:\Users\ferda\Desktop\GitHub Portfolio\Dona Codex Overmind"

git init
git add .
git commit -m "feat: initial release — autonomous multi-agent company OS"
git branch -M main
git remote add origin https://github.com/dobby-aidev/dona-codex-overmind.git
git push -u origin main
```

**Topics:** `multi-agent`, `autonomous-agents`, `websocket`, `firebase`, `gemini-api`, `typescript`

---

### 🪙 AI Coin Empire

```bash
cd "C:\Users\ferda\Desktop\GitHub Portfolio\ai-coin-empire"

git init
git add .
git commit -m "feat: initial release — real-time multiplayer crypto strategy game"
git branch -M main
git remote add origin https://github.com/dobby-aidev/ai-coin-empire.git
git push -u origin main
```

**Topics:** `game`, `multiplayer`, `firebase`, `react`, `typescript`, `crypto-strategy`

---

### 🤖 AI Prompt Builder

```bash
cd "C:\Users\ferda\Desktop\GitHub Portfolio\ai-prompt-builder"

git init
git add .
git commit -m "feat: initial release — conversational prompt engineering studio"
git branch -M main
git remote add origin https://github.com/dobby-aidev/ai-prompt-builder.git
git push -u origin main
```

**Topics:** `prompt-engineering`, `gemini-api`, `react`, `typescript`, `glassmorphism`

---

### ⏳ Zamanın Bekçisi

```bash
cd "C:\Users\ferda\Desktop\GitHub Portfolio\zamanın-bekçisi"

git init
git add .
git commit -m "feat: initial release — time-travel interactive text adventure"
git branch -M main
git remote add origin https://github.com/dobby-aidev/zamani-bekcisi.git
git push -u origin main
```

**Topics:** `game`, `interactive-fiction`, `react`, `typescript`, `framer-motion`, `text-adventure`

---

### 📊 Dona Grid

```bash
cd "C:\Users\ferda\Desktop\GitHub Portfolio\Dona_Grid"

git init
git add .
git commit -m "feat: initial release — AI-powered data grid & analytics"
git branch -M main
git remote add origin https://github.com/dobby-aidev/dona-grid.git
git push -u origin main
```

---

### 🎵 Dona Music

```bash
cd "C:\Users\ferda\Desktop\GitHub Portfolio\Dona_Music"

git init
git add .
git commit -m "feat: initial release — autonomous music generation engine"
git branch -M main
git remote add origin https://github.com/dobby-aidev/dona-music.git
git push -u origin main
```

---

### 🔗 Dona Nexus

```bash
cd "C:\Users\ferda\Desktop\GitHub Portfolio\Dona_Nexus"

git init
git add .
git commit -m "feat: initial release — Dona ecosystem orchestration hub"
git branch -M main
git remote add origin https://github.com/dobby-aidev/dona-nexus.git
git push -u origin main
```

---

### ⚡ Dona Quantum

```bash
cd "C:\Users\ferda\Desktop\GitHub Portfolio\Dona_Quantum"

git init
git add .
git commit -m "feat: initial release — quant strategy engine with RL"
git branch -M main
git remote add origin https://github.com/dobby-aidev/dona-quantum.git
git push -u origin main
```

**Topics:** `quant-finance`, `reinforcement-learning`, `pytorch`, `trading`, `financial-ai`

---

### 🔬 Dona AI Lab

```bash
cd "C:\Users\ferda\Desktop\GitHub Portfolio\Dona_ai_lab"

git init
git add .
git commit -m "feat: initial release — experimental AI research sandbox"
git branch -M main
git remote add origin https://github.com/dobby-aidev/dona-ai-lab.git
git push -u origin main
```

**Topics:** `ai-research`, `machine-learning`, `python`, `hugging-face`, `experimental`

---

## 🏷️ Tüm Repolara Ortak Topics

Her repoya şunları da ekle:
- `dobby-aidev` (marka etiketi)
- `open-source`
- `mit-license`

---

## 📌 Pinned Repos Sıralaması (Önerilen)

GitHub profilinde en üste sabit olarak şunları sabitle:

1. **agent-critiq** (en büyük proje, live site var)
2. **dona-codex-overmind** (multi-agent wow faktörü)
3. **ai-coin-empire** (oyun + Firebase = etkileyici)
4. **ai-prompt-builder** (Gemini API entegrasyonu)
5. **dona-quantum** (quant/finance uzmanlığı)
6. **zamani-bekcisi** (yaratıcılık gösterir)

---

## ✅ Son Kontrol Listesi

- [ ] Her repo için `About` bölümüne açıklama ve website linki eklendi
- [ ] Topics/Etiketler eklendi
- [ ] `dobby-aidev/dobby-aidev` profil vitrin repo'su oluşturuldu
- [ ] 6 repo pinned olarak ayarlandı
- [ ] GitHub profile picture & bio güncellendi
