@echo off
title DONA CODEX // CLEAN SLATE PRODUCTION DEPLOY v3
chcp 65001 >nul
echo.
echo  DONA CODEX // CLEAN SLATE DEPLOY
echo  Remote repo tamamen temizlenip sadece production dosyalari yuklenecek.
echo  Kisisel dosyalar (kisisel_dosyalar, Sertifikalar, scripts, .agents) HICBIR ZAMAN push edilmez.
echo.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0deploy.ps1" %*
pause
