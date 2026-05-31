@echo off
title Load & Stress Testing - Shree Grocery Store
color 0A

echo ========================================
echo   LOAD & STRESS TESTING
echo ========================================
echo.

echo [1/3] Checking if backend is running...
curl -s http://localhost:5000/health >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Backend is NOT running!
    echo.
    echo Please start the backend first:
    echo   START_FAST.bat
    echo.
    pause
    exit /b 1
) else (
    echo ✅ Backend is running
)
echo.

echo [2/3] Installing test dependencies...
npm install axios --no-save
echo.

echo [3/3] Running load tests...
echo.
node LOAD_TEST.js
echo.

echo ========================================
echo   TESTING COMPLETE
echo ========================================
echo.
pause
