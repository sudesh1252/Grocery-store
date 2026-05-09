@echo off
title Shree Grocery Store - Complete Application
color 0A

echo ========================================
echo SHREE GROCERY STORE
echo Starting Complete Application...
echo ========================================
echo.

echo [Step 1] Starting Backend Server...
start "Backend Server" cmd /k "cd backend && npm run dev"
timeout /t 3 /nobreak >nul

echo [Step 2] Starting Frontend Server...
start "Frontend Server" cmd /k "cd frontend && npm start"
timeout /t 3 /nobreak >nul

echo.
echo ========================================
echo APPLICATION STARTED SUCCESSFULLY!
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Two new windows have opened:
echo 1. Backend Server (Port 5000)
echo 2. Frontend Server (Port 3000)
echo.
echo The application will open in your browser automatically.
echo.
echo To stop the application:
echo - Close both server windows
echo - Or press Ctrl+C in each window
echo.
echo ========================================

pause
