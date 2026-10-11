# ==============================================================================
# DONA CODEX // PRODUCTION 1-CLICK SELECTIVE DEPLOYMENT ENGINE
# Copyright (c) 2021-2026 Dona Codex. All Rights Reserved.
# https://dobby.donacodex.com
# ==============================================================================

[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "   DONA CODEX // SECURE SELECTIVE PRODUCTION DEPLOY" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

# ── 1. GIT EXECUTABLE RESOLUTION ─────────────────────────────────────────────
Write-Host "`n[1/5] Git komut satırı ortamı taranıyor..." -ForegroundColor Yellow

$gitCmd = "git"
$gitFound = $false

if (Get-Command git -ErrorAction SilentlyContinue) {
    $gitFound = $true
}
else {
    # Resolve GitHub Desktop's bundled git (version-agnostic glob)
    $ghDesktopGit = Get-ChildItem "$env:LOCALAPPDATA\GitHubDesktop\app-*\resources\app\git\cmd\git.exe" -ErrorAction SilentlyContinue |
                    Sort-Object { $_.Directory.Parent.Parent.Parent.Name } -Descending |
                    Select-Object -First 1 -ExpandProperty FullName

    $candidatePaths = @(
        "C:\Program Files\Git\cmd\git.exe",
        "C:\Program Files\Git\bin\git.exe",
        "$env:LOCALAPPDATA\Programs\Git\cmd\git.exe",
        "$env:LOCALAPPDATA\Programs\Git\bin\git.exe",
        "C:\Program Files (x86)\Git\cmd\git.exe",
        "$env:USERPROFILE\scoop\shims\git.exe"
    )
    # Append GitHub Desktop path if found
    if ($ghDesktopGit) { $candidatePaths += $ghDesktopGit }
    foreach ($path in $candidatePaths) {
        if (Test-Path $path) {
            $gitCmd = $path
            $gitFound = $true
            break
        }
    }
}

if (-not $gitFound) {
    Write-Host "[HATA] Sisteminizde Git (git.exe) bulunamadı!" -ForegroundColor Red
    Write-Host "Lütfen Git'i kurun: https://git-scm.com/download/win" -ForegroundColor White
    Write-Host "veya PowerShell'de şu komutu çalıştırın: winget install --id Git.Git -e --source winget" -ForegroundColor Cyan
    exit 1
}

$gitVersion = & $gitCmd --version 2>&1
Write-Host "[OK] Git bulundu: $gitVersion ($gitCmd)" -ForegroundColor Green

# ── 2. JAVASCRIPT SYNTAX & PRODUCTION INTEGRITY GATE ──────────────────────────
Write-Host "`n[2/5] Kod bütünlüğü ve JavaScript sözdizimi doğrulanıyor..." -ForegroundColor Yellow
$nodeCheck = node --check script.js 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "[HATA] script.js dosyasında sözdizimi hatası var! Canlı dağıtım durduruldu." -ForegroundColor Red
    Write-Host $nodeCheck
    exit 1
}
Write-Host "[OK] script.js sözdizimi kusursuz (Exit 0)." -ForegroundColor Green

# ── 3. REPOSITORY INITIALIZATION & REMOTE SYNC ──────────────────────────────
Write-Host "`n[3/5] Git repository ve uzak sunucu bağlantısı kontrol ediliyor..." -ForegroundColor Yellow
$repoUrl = "https://github.com/dobby-aidev/dobby-aidev.git"

if (-not (Test-Path ".git")) {
    Write-Host "[BİLGİ] .git deposu başlatılıyor (git init)..." -ForegroundColor Cyan
    & $gitCmd init
    & $gitCmd branch -M main
    & $gitCmd remote add origin $repoUrl
}

# Uzak depo adresini doğrula
$remotes = & $gitCmd remote -v 2>&1
if ($remotes -notmatch "dobby-aidev") {
    & $gitCmd remote remove origin 2>$null
    & $gitCmd remote add origin $repoUrl
}
Write-Host "[OK] Uzak depo: $repoUrl (branch: main)" -ForegroundColor Green

# ── 4. STRICT PRODUCTION FILE WHITELISTS (ZERO PERSONAL DATA LEAK) ───────────
Write-Host "`n[4/5] Güvenli Seçici Dosya Ekleme (Selective Staging)..." -ForegroundColor Yellow
Write-Host "-> Kişisel arşivler (kisisel_dosyalar, Sertifikalar, .agents) filtreleniyor..." -ForegroundColor DarkGray

# Önce sahneyi temizle
& $gitCmd reset 2>$null

# Yalnızca yayınlanması zorunlu olan temiz üretim dosyalarını ekle:
$productionWhitelist = @(
    "index.html",
    "work.html",
    "about.html",
    "resume.html",
    "cv_template.html",
    "en",
    "style.css",
    "script.js",
    "assets",
    "profile.png",
    "profile.webp",
    "profile-circle.png",
    "apple-touch-icon.png",
    "favicon.ico",
    "favicon-16x16.png",
    "favicon-32x32.png",
    "favicon-64x64.png",
    "favicon-192x192.png",
    "_headers",
    "_redirects",
    "robots.txt",
    "sitemap.xml",
    "llms.txt",
    "llms-full.txt",
    "README.md",
    "LICENSE",
    "NOTICE",
    "PRODUCT.md",
    "projects",
    ".gitignore",
    "deploy.bat",
    "deploy.ps1"
)

foreach ($item in $productionWhitelist) {
    if (Test-Path $item) {
        & $gitCmd add $item 2>$null
    }
}

# İstenmeyen klasörleri zorunlu olarak unstage et
& $gitCmd reset HEAD kisisel_dosyalar 2>$null
& $gitCmd reset HEAD Sertifikalar 2>$null
& $gitCmd reset HEAD .agents 2>$null
& $gitCmd reset HEAD .impeccable 2>$null
& $gitCmd reset HEAD desktop.ini 2>$null
& $gitCmd reset HEAD scratch 2>$null

# Sahnedeki dosyaları listele
$staged = & $gitCmd diff --name-only --cached 2>&1
$stagedCount = if ($staged) { ($staged -split "`r?`n" | Where-Object { $_ -ne "" }).Count } else { 0 }

Write-Host "[OK] Sahneye eklenen güvenli üretim dosyası sayısı: $stagedCount" -ForegroundColor Green

if ($stagedCount -eq 0) {
    # Eğer sahne boşsa bir değişiklik var mı kontrol et
    $status = & $gitCmd status --porcelain 2>&1
    if (-not $status) {
        Write-Host "[BİLGİ] Depo zaten en güncel durumda. Gönderilecek yeni değişiklik yok." -ForegroundColor Cyan
        Write-Host "Canlı site: https://dobby.donacodex.com/" -ForegroundColor White
        exit 0
    }
}

# ── 5. COMMIT & GITHUB PUSH (CLOUDFLARE PAGES TRIGGER) ───────────────────────
Write-Host "`n[5/5] GitHub'a commit ve push işlemi başlatılıyor..." -ForegroundColor Yellow

$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
$commitMsg = $args[0]
if (-not $commitMsg) {
    $commitMsg = "feat: release 13 production systems, crisp retina icons and Dona RAG assistant [$timestamp]"
}

& $gitCmd commit -m "$commitMsg"
Write-Host "[BİLGİ] GitHub'a aktarılıyor (git push origin main)..." -ForegroundColor Cyan
$pushOutput = & $gitCmd push origin main 2>&1
Write-Host $pushOutput

if ($LASTEXITCODE -eq 0 -or $pushOutput -match "Everything up-to-date") {
    Write-Host "`n==========================================================" -ForegroundColor Green
    Write-Host "  [BAŞARILI] DOSYALAR GITHUB'A GÖNDERİLDİ!" -ForegroundColor Green
    Write-Host "  Cloudflare Pages otomatik derleme ve dağıtımı başlattı." -ForegroundColor Cyan
    Write-Host "  Canlı URL : https://dobby.donacodex.com/" -ForegroundColor White
    Write-Host "  GitHub Repo: https://github.com/dobby-aidev/dobby-aidev" -ForegroundColor White
    Write-Host "==========================================================" -ForegroundColor Green
}
else {
    Write-Host "`n[BİLGİ] Push tamamlandı veya kimlik doğrulaması bekleniyor." -ForegroundColor Yellow
    Write-Host "Eğer ilk kez push yapıyorsanız GitHub şifre/token girişinizi tamamlayın." -ForegroundColor White
}
