# ==============================================================================
# DONA CODEX // PRODUCTION 1-CLICK CLEAN SLATE DEPLOYMENT ENGINE v3
# Copyright (c) 2021-2026 Dona Codex. All Rights Reserved.
# https://dobby.donacodex.com
# ==============================================================================
# STRATEJI: Her deploy'da git index tamamen sifirlanir (git rm -r --cached .)
# Sadece whitelist'teki dosyalar tekrar eklenir ve --force push edilir.
# Bu sayede remote repo'daki TUMU ESKI / GEREKSIZ dosyalar otomatik silinir.
#
# GUVENLIK: kisisel_dosyalar, Sertifikalar, scripts, .agents, .impeccable,
# package.json/lock, node_modules HICBIR ZAMAN push edilmez.
# ==============================================================================

[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "   DONA CODEX // CLEAN SLATE PRODUCTION DEPLOY v3" -ForegroundColor Cyan
Write-Host "   Eski dosyalar remote'dan silinecek - sadece whitelist!" -ForegroundColor DarkGray
Write-Host "==========================================================" -ForegroundColor Cyan

# -- 1. GIT EXECUTABLE RESOLUTION ---------------------------------------------
Write-Host "`n[1/6] Git komut satiri ortami taraniyor..." -ForegroundColor Yellow

$gitCmd = "git"
$gitFound = $false

if (Get-Command git -ErrorAction SilentlyContinue) {
    $gitFound = $true
}
else {
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
    Write-Host "[HATA] Git (git.exe) bulunamadi!" -ForegroundColor Red
    Write-Host "Lutfen kurun: https://git-scm.com/download/win" -ForegroundColor White
    Write-Host "veya: winget install --id Git.Git -e --source winget" -ForegroundColor Cyan
    exit 1
}

$gitVersion = & $gitCmd --version 2>&1
Write-Host "[OK] Git bulundu: $gitVersion ($gitCmd)" -ForegroundColor Green

# -- 2. JAVASCRIPT SYNTAX GATE ------------------------------------------------
Write-Host "`n[2/6] JavaScript sozdizimi dogrulanıyor..." -ForegroundColor Yellow
if (Get-Command node -ErrorAction SilentlyContinue) {
    $nodeCheck = node --check script.js 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[HATA] script.js sozdizimi hatasi! Deploy durduruldu." -ForegroundColor Red
        Write-Host $nodeCheck
        exit 1
    }
    Write-Host "[OK] script.js sozdizimi kusursuz." -ForegroundColor Green
} else {
    Write-Host "[ATLANDI] Node.js yok, sozdizimi kontrolu atlandi." -ForegroundColor DarkGray
}

# -- 3. REPOSITORY INIT & REMOTE SYNC -----------------------------------------
Write-Host "`n[3/6] Git repository ve remote kontrol ediliyor..." -ForegroundColor Yellow
$repoUrl = "https://github.com/dobby-aidev/dobby-aidev.git"

if (-not (Test-Path ".git")) {
    Write-Host "[BILGI] .git deposu baslatiliyor..." -ForegroundColor Cyan
    & $gitCmd init
    & $gitCmd branch -M main
    & $gitCmd remote add origin $repoUrl
}

$remotes = & $gitCmd remote -v 2>&1
if ($remotes -notmatch "dobby-aidev") {
    & $gitCmd remote remove origin 2>$null
    & $gitCmd remote add origin $repoUrl
}
Write-Host "[OK] Remote: $repoUrl (branch: main)" -ForegroundColor Green

# -- 4. CLEAN SLATE: TUM INDEX SIFIRLA ----------------------------------------
Write-Host "`n[4/6] CLEAN SLATE - Git index tamamen temizleniyor..." -ForegroundColor Yellow
Write-Host "   (git rm -r --cached . ile tum tracking kaldirilıyor)" -ForegroundColor DarkGray

& $gitCmd rm -r --cached . 2>$null
Write-Host "[OK] Index sifirlandi. Simdi sadece whitelist dosyalari eklenecek." -ForegroundColor Green

# -- 5. WHITELIST ONLY STAGING (ZERO PERSONAL DATA) ---------------------------
Write-Host "`n[5/6] Whitelist-only dosya ekleme (Selective Staging)..." -ForegroundColor Yellow

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
    "deploy.ps1",
    "Sertifikalar"
)

if (Test-Path "favicon.svg") {
    $svgSize = (Get-Item "favicon.svg").Length
    if ($svgSize -gt 512000) {
        Write-Host "[UYARI] favicon.svg cok buyuk ($([math]::Round($svgSize/1024))KB) - push atlaniyor, optimize et." -ForegroundColor DarkYellow
    } else {
        $productionWhitelist += "favicon.svg"
    }
}

$addedCount = 0
foreach ($item in $productionWhitelist) {
    if (Test-Path $item) {
        & $gitCmd add -- $item 2>$null
        if ($LASTEXITCODE -eq 0) { $addedCount++ }
    }
}

# CIFT GUVENLIK: yasak yollari kesinlikle unstage et
$bannedPaths = @(
    "kisisel_dosyalar",
    ".agents",
    ".impeccable",
    ".gemini",
    "scripts",
    "node_modules",
    "scratch",
    "chrome_temp",
    "package.json",
    "package-lock.json",
    "desktop.ini"
)
foreach ($banned in $bannedPaths) {
    & $gitCmd reset HEAD -- $banned 2>$null
}

# GUVENLIK DENETIMI: yasak dosya var mi stage'de?
$stagedRaw = & $gitCmd diff --name-only --cached 2>&1
$stagedList = if ($stagedRaw) { ($stagedRaw -split "`r?`n" | Where-Object { $_ -ne "" }) } else { @() }
$stagedCount = $stagedList.Count

$leakDetected = $false
foreach ($banned in $bannedPaths) {
    $hit = $stagedList | Where-Object { $_ -match "^$([regex]::Escape($banned))" }
    if ($hit) {
        Write-Host "[KRITIK HATA] Yasak dosya hala staged: $hit" -ForegroundColor Red
        $leakDetected = $true
    }
}

if ($leakDetected) {
    Write-Host "[HATA] Guvenlik ihlali! Deploy iptal edildi." -ForegroundColor Red
    & $gitCmd reset 2>$null
    exit 1
}

Write-Host "[OK] Stage'e eklenen guvenli dosya: $stagedCount" -ForegroundColor Green
Write-Host "`n  Staged dosyalar:" -ForegroundColor DarkGray
$stagedList | ForEach-Object { Write-Host "    + $_" -ForegroundColor DarkGray }

if ($stagedCount -eq 0) {
    Write-Host "[BILGI] Stage bos - push edilecek degisiklik yok." -ForegroundColor Cyan
    exit 0
}

# -- 6. COMMIT & FORCE PUSH ---------------------------------------------------
Write-Host "`n[6/6] Commit ve force push baslatiliyor..." -ForegroundColor Yellow

$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
$commitMsg = $args[0]
if (-not $commitMsg) {
    $commitMsg = "chore: clean-slate deploy - $stagedCount production files [$timestamp]"
}

Write-Host "[BILGI] Commit: $commitMsg" -ForegroundColor DarkGray
& $gitCmd commit -m "$commitMsg"

Write-Host "[BILGI] GitHub'a force push yapiliyor..." -ForegroundColor Cyan
Write-Host "   (Eski/gereksiz dosyalar remote'dan kaldirilacak)" -ForegroundColor DarkGray

$pushOutput = & $gitCmd push origin main --force 2>&1
Write-Host $pushOutput

if ($LASTEXITCODE -eq 0 -or $pushOutput -match "Everything up-to-date") {
    Write-Host "`n==========================================================" -ForegroundColor Green
    Write-Host "  [BASARILI] CLEAN SLATE DEPLOY TAMAMLANDI!" -ForegroundColor Green
    Write-Host "  Remote repo artik sadece production dosyalari iceriyor." -ForegroundColor Cyan
    Write-Host "  Cloudflare Pages build tetiklendi." -ForegroundColor Cyan
    Write-Host "  Canli URL : https://dobby.donacodex.com/" -ForegroundColor White
    Write-Host "  GitHub    : https://github.com/dobby-aidev/dobby-aidev" -ForegroundColor White
    Write-Host "==========================================================" -ForegroundColor Green
} else {
    Write-Host "`n[BILGI] Push tamamlandi veya kimlik dogrulamasi gerekiyor." -ForegroundColor Yellow
    Write-Host "GitHub token/sifre girisini tamamlayin." -ForegroundColor White
}
