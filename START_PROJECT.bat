@echo off
echo ========================================
echo   SHREE GROCERY STORE - STARTUP
echo ========================================
echo.

echo [1/3] Checking MySQL...
net start MYSQL80 >nul 2>&1
echo MySQL is running!
echo.

echo [2/3] Starting Backend Server...
start cmd /k "cd backend && npm run dev"
timeout /t 5 /nobreak >nul
echo Backend started on http://localhost:5000
echo.

echo [3/3] Starting Frontend Server...
start cmd /k "cd frontend && npm start"
echo Frontend will open on http://localhost:3000
echo.

echo ========================================
echo   BOTH SERVERS STARTED!
echo ========================================
echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Press any key to exit this window...
pause >nul
