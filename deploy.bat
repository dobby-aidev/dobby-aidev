@echo off
title DONA CODEX // PRODUCTION GITHUB DEPLOY
chcp 65001 > nul
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0deploy.ps1" %*
pause
