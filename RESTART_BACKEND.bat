@echo off
echo ========================================
echo   RESTARTING BACKEND
echo ========================================
echo.

echo Killing any existing backend process on port 5000...
for /f "tokens=5" %%a in ('netstat -ano ^| find ":5000" ^| find "LISTENING"') do (
    echo Killing process %%a
    taskkill /F /PID %%a >nul 2>&1
)

echo.
echo Starting backend...
echo.

cd backend
start cmd /k "npm run dev"

echo.
echo ========================================
echo   BACKEND STARTING...
echo ========================================
echo.
echo Wait 5 seconds, then check:
echo http://localhost:5000
echo.
pause
