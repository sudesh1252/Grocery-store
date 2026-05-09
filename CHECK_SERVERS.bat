@echo off
echo ========================================
echo   CHECKING SERVERS STATUS
echo ========================================
echo.

echo [1/2] Checking Backend (Port 5000)...
netstat -an | find ":5000" | find "LISTENING" >nul
if %ERRORLEVEL% EQU 0 (
    echo ✓ Backend is LISTENING on port 5000
    echo.
    echo Testing backend API...
    curl -s http://localhost:5000 2>nul
    if !ERRORLEVEL! EQU 0 (
        echo.
        echo ✓ Backend API is responding!
    ) else (
        echo ✗ Backend port is open but not responding
    )
) else (
    echo ✗ Backend is NOT running on port 5000
    echo.
    echo Solution:
    echo   cd backend
    echo   npm run dev
)
echo.

echo [2/2] Checking Frontend (Port 3000)...
netstat -an | find ":3000" | find "LISTENING" >nul
if %ERRORLEVEL% EQU 0 (
    echo ✓ Frontend is LISTENING on port 3000
) else (
    echo ✗ Frontend is NOT running on port 3000
    echo.
    echo Solution:
    echo   cd frontend
    echo   npm start
)
echo.

echo ========================================
echo   DIAGNOSIS COMPLETE
echo ========================================
echo.
pause
