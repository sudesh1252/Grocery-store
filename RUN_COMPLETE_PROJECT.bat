@echo off
echo ========================================
echo   SHREE GROCERY STORE
echo   Starting Complete Project
echo ========================================
echo.

echo Opening Backend Server...
start "Backend Server" cmd /k "cd backend && npm run dev"

echo Waiting 5 seconds for backend to start...
timeout /t 5 /nobreak > nul

echo Opening Frontend Server...
start "Frontend Server" cmd /k "cd frontend && npm start"

echo.
echo ========================================
echo   BOTH SERVERS STARTING!
echo ========================================
echo.
echo Two terminal windows will open:
echo 1. Backend Server (port 5000)
echo 2. Frontend Server (port 3000)
echo.
echo Browser will open automatically in 30 seconds
echo.
echo To stop servers:
echo - Go to each terminal window
echo - Press Ctrl + C
echo - Type Y and press Enter
echo.
pause
