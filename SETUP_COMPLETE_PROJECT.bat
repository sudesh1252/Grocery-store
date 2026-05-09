@echo off
echo ========================================
echo SHREE GROCERY STORE - COMPLETE SETUP
echo Professional Industry-Level Application
echo ========================================
echo.

echo [1/5] Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
echo Node.js: OK

echo.
echo [2/5] Installing Backend Dependencies...
cd backend
if not exist node_modules (
    echo Installing backend packages...
    call npm install
) else (
    echo Backend dependencies already installed
)
cd ..

echo.
echo [3/5] Installing Frontend Dependencies...
cd frontend
if not exist node_modules (
    echo Installing frontend packages...
    call npm install
) else (
    echo Frontend dependencies already installed
)
cd ..

echo.
echo [4/5] Checking MySQL Connection...
echo Please ensure MySQL is running on localhost:3306
echo Database: shree_grocery
echo Username: root
echo Password: (check backend/.env file)

echo.
echo [5/5] Setup Complete!
echo.
echo ========================================
echo HOW TO RUN THE APPLICATION:
echo ========================================
echo.
echo Option 1: Run both servers together
echo    - Double-click: RUN_COMPLETE_APP.bat
echo.
echo Option 2: Run servers separately
echo    - Backend: Double-click START_BACKEND.bat
echo    - Frontend: Double-click START_FRONTEND.bat
echo.
echo ========================================
echo IMPORTANT NOTES:
echo ========================================
echo 1. Make sure MySQL is running
echo 2. Database 'shree_grocery' should exist
echo 3. Backend runs on: http://localhost:5000
echo 4. Frontend runs on: http://localhost:3000
echo 5. Default login: Check after signup
echo.
echo ========================================

pause
