@echo off
title Push to GitHub - Sagar Electranics
cd /d "%~dp0"
echo ========================================================
echo   Pushing Sagar Electranics code to:
echo   https://github.com/websirg/Electrician.git
echo ========================================================
echo.
"C:\Users\HP\AppData\Local\Programs\MinGit\cmd\git.exe" push -u origin main
echo.
if %ERRORLEVEL% EQU 0 (
    echo [SUCCESS] Code pushed successfully to GitHub!
) else (
    echo [NOTE] If GitHub asked for password, use your GitHub Personal Access Token ^(PAT^).
)
echo.
pause
