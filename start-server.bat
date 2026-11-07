@echo off
echo Starting ScaleReach AI Local Server...
start "" powershell -WindowStyle Hidden -ExecutionPolicy Bypass -File "%~dp0server.ps1"
timeout /t 1 /nobreak >nul
start http://localhost:8080/
exit
