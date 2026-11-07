@echo off
title Push ScaleReach AI to GitHub
color 0b
echo ========================================================
echo   ScaleReach AI - Pushing Project to GitHub
echo   Repository: https://github.com/MuhammadAbdullahShahid546/scalereach-ai.git
echo ========================================================
echo.
echo Pushing commits to GitHub...
echo (Agar browser window pop-up aaye, toh 'Authorize / Sign in' par click karein)
echo.

git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================================
    echo   [SUCCESS] Mubarak ho! Project GitHub par upload ho gaya!
    echo   Check karein: https://github.com/MuhammadAbdullahShahid546/scalereach-ai
    echo ========================================================
) else (
    echo.
    echo ========================================================
    echo   [NOTE] Agar authentication error aya ho, toh GitHub login karein
    echo ========================================================
)
echo.
pause
