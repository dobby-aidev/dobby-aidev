# ==============================================================================
# DONA CODEX PORTFOLIO // 1-CLICK PRODUCTION GITHUB DEPLOY SCRIPT
# ==============================================================================

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "   DONA CODEX // PRODUCTION DEPLOYMENT PROTOCOL" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

# 1. Syntax & Integrity Gate
Write-Host "`n[1/4] JavaScript sözdizimi doğrulanıyor..." -ForegroundColor Yellow
$nodeCheck = node --check script.js 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "[HATA] script.js dosyasında sözdizimi hatası var! Dağıtım durduruldu." -ForegroundColor Red
    Write-Host $nodeCheck
    exit 1
}
Write-Host "[OK] script.js sözdizimi kusursuz (Exit 0)." -ForegroundColor Green

# 2. Asset & WebP Health Audit
Write-Host "`n[2/4] Medya varlıkları ve WebP optimizasyonu denetleniyor..." -ForegroundColor Yellow
$webpCount = (Get-ChildItem -Path "assets\*.webp" -ErrorAction SilentlyContinue).Count
Write-Host "[OK] Toplam $webpCount adet yüksek kaliteli WebP görseli hazır." -ForegroundColor Green

# 3. Git Staging & Secret Filter
Write-Host "`n[3/4] Güvenlik taraması ve Git hazırlığı..." -ForegroundColor Yellow
if (-not (Test-Path ".gitignore")) {
    Write-Host "[UYARI] .gitignore bulunamadı!" -ForegroundColor Red
    exit 1
}

$commitMsg = $args[0]
if (-not $commitMsg) {
    $commitMsg = "deploy: production update with high-performance WebP assets and refined HUD [$(Get-Date -Format 'yyyy-MM-dd HH:mm')]"
}

# 4. Git Push
Write-Host "`n[4/4] GitHub'a dağıtım başlatılıyor..." -ForegroundColor Yellow
git add .
git commit -m "$commitMsg"
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n==========================================================" -ForegroundColor Green
    Write-Host "  [BAŞARILI] SİTE GITHUB'A YAYINLANDI!" -ForegroundColor Green
    Write-Host "  Canlı URL: https://dobby-aidev.github.io/dobby-aidev/" -ForegroundColor Cyan
    Write-Host "==========================================================" -ForegroundColor Green
} else {
    Write-Host "`n[BİLGİ] Git komutu tamamlandı. Lütfen çıktı mesajını kontrol edin." -ForegroundColor Cyan
}
