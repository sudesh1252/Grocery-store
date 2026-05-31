@echo off
title Shree Grocery Store - Fast Start
color 0A

echo ========================================
echo   SHREE GROCERY STORE - FAST START
echo ========================================
echo.

REM Check if MySQL is running
echo [1/4] Checking MySQL service...
sc query MySQL80 | find "RUNNING" >nul
if %errorlevel% neq 0 (
    echo MySQL is not running. Starting MySQL...
    net start MySQL80
    timeout /t 2 /nobreak >nul
) else (
    echo MySQL is already running!
)
echo.

REM Start Backend (faster - no dependency check)
echo [2/4] Starting Backend Server...
cd backend
start "Backend Server" cmd /k "node src/server.js"
cd ..
timeout /t 3 /nobreak >nul
echo Backend starting on port 5000...
echo.

REM Start Frontend (faster - skip dependency check)
echo [3/4] Starting Frontend Server...
cd frontend
start "Frontend Server" cmd /k "set BROWSER=none && npm start"
cd ..
timeout /t 5 /nobreak >nul
echo Frontend starting on port 3000...
echo.

echo [4/4] Opening browser...
timeout /t 8 /nobreak >nul
start http://localhost:3000
echo.

echo ========================================
echo   SERVERS STARTED SUCCESSFULLY!
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Login: kirolkarsudesh06@gmail.com
echo Pass:  admin123
echo.
echo KEEP THIS WINDOW OPEN!
echo Press any key to stop all servers...
pause >nul

echo.
echo Stopping servers...
taskkill /FI "WINDOWTITLE eq Backend Server*" /T /F 2>nul
taskkill /FI "WINDOWTITLE eq Frontend Server*" /T /F 2>nul
echo Servers stopped!
pause
