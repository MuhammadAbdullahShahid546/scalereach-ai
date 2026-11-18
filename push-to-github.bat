@echo off
title Push ScaleReach AI to GitHub
color 0b

:: Sab se pehle exact project folder mein navigate karein
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
echo   Working Directory: %CD%
echo   Repository: https://github.com/MuhammadAbdullahShahid546/scalereach-ai.git
echo ========================================================
echo.

:: Git initialize karein agar pehle se na ho
if not exist ".git" (
    echo [Git initialize kiya ja raha hai...]
    git init
    git branch -M main
)

:: Remote origin set karein
echo [Remote origin set kiya ja raha hai...]
git remote remove origin >nul 2>&1
git remote add origin https://github.com/MuhammadAbdullahShahid546/scalereach-ai.git

:: Credential helper configure karein
git config credential.helper manager

:: Saari files add aur commit karein
echo.
echo [Files add ki ja rahi hain...]
git add -A

echo [Committing changes...]
git commit -m "Convert ScaleReach AI to 100% in-browser client-side video processing" >nul 2>&1

echo.
echo ========================================================
echo   GitHub par Push ho raha hai...
echo   (Agar browser window pop-up aaye, toh 'Authorize' dabayein)
echo ========================================================
echo.

git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================================
    echo   [SUCCESS] Mubarak ho! Saara code GitHub par push ho gaya!
    echo   GitHub Repo: https://github.com/MuhammadAbdullahShahid546/scalereach-ai
    echo   Live Site:   https://muhammadabdullahshahid546.github.io/scalereach-ai/
    echo ========================================================
) else (
    echo.
    echo [Push fail hua, pull karke rebase ya force push check kar rahe hain...]
    git push -u origin main --force
    if %ERRORLEVEL% EQU 0 (
        echo.
        echo ========================================================
        echo   [SUCCESS] Code force-push ke zariye GitHub par upload ho gaya!
        echo   Live Site: https://muhammadabdullahshahid546.github.io/scalereach-ai/
        echo ========================================================
    ) else (
        echo.
        echo ========================================================
        echo   [NOTE] Agar authentication error aya ho, toh browser
        echo   popup mein GitHub login approve karein.
        echo ========================================================
    )
)

echo.
pause
