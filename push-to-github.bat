@echo off
title Push ScaleReach AI to GitHub
color 0b

cd /d "%~dp0"
if not exist ".git" (
    if exist "viral clip\.git" (
        cd /d "%~dp0viral clip"
    ) else if exist "C:\Users\AA\Desktop\viral clip\.git" (
        cd /d "C:\Users\AA\Desktop\viral clip"
    )
)

echo ========================================================
echo   ScaleReach AI - Pushing Project to GitHub
echo ========================================================
echo.

git remote remove origin >nul 2>&1
git remote add origin https://github.com/MuhammadAbdullahShahid546/scalereach-ai.git

echo Committing changes...
git add -A
git commit -m "Update ScaleReach AI 100 percent in-browser" >nul 2>&1

echo.
echo Pushing to GitHub...
git push -u origin main --force

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================================
    echo   [SUCCESS] Code GitHub par upload ho gaya!
    echo ========================================================
) else (
    echo.
    echo [Push incomplete.]
)

echo.
pause
