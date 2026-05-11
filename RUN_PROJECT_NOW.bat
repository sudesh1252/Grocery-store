@echo off
title Shree Grocery Store - Complete Setup
color 0A

echo ========================================
echo SHREE GROCERY STORE
echo Complete Project Setup
echo ========================================
echo.

echo This will:
echo 1. Install all dependencies
echo 2. Setup database
echo 3. Start backend server
echo 4. Start frontend server
echo.
echo Press any key to continue...
pause >nul
cls

echo ========================================
echo STEP 1: Installing Dependencies
echo ========================================
echo.

echo Installing Backend Dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Backend installation failed!
    pause
    exit /b 1
)
echo [OK] Backend dependencies installed
echo.

echo Installing Frontend Dependencies...
cd ..\frontend
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Frontend installation failed!
    pause
    exit /b 1
)
echo [OK] Frontend dependencies installed
cd ..
echo.

echo ========================================
echo STEP 2: Database Setup
echo ========================================
echo.

echo Checking MySQL connection...
cd backend
node -e "const {sequelize} = require('./src/config/db'); sequelize.authenticate().then(() => {console.log('[OK] MySQL Connected'); process.exit(0);}).catch(err => {console.error('[ERROR]', err.message); process.exit(1);});"

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Cannot connect to MySQL!
    echo.
    echo Please:
    echo 1. Start MySQL server
    echo 2. Check backend/.env file
    echo 3. Create database: CREATE DATABASE shree_grocery;
    echo.
    pause
    exit /b 1
)

echo.
echo Syncing database tables...
node -e "const {sequelize} = require('./src/config/db'); const models = require('./src/models'); sequelize.sync({alter: true}).then(() => {console.log('[OK] Database synced'); process.exit(0);}).catch(err => {console.error('[ERROR]', err.message); process.exit(1);});"

if %errorlevel% neq 0 (
    echo [WARNING] Database sync had issues
)
cd ..
echo.

echo ========================================
echo STEP 3: Starting Servers
echo ========================================
echo.

echo Starting Backend Server...
start "Backend Server" cmd /k "cd backend && npm start"
timeout /t 5 >nul

echo Starting Frontend Server...
start "Frontend Server" cmd /k "cd frontend && npm start"
timeout /t 3 >nul

echo.
echo ========================================
echo PROJECT IS STARTING!
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Two new windows will open:
echo 1. Backend Server (port 5000)
echo 2. Frontend Server (port 3000)
echo.
echo Wait for "Compiled successfully!" message
echo Then open: http://localhost:3000/login
echo.
echo Demo Login:
echo Email: admin@shreegrocery.com
echo Password: admin123
echo.
echo ========================================
echo.
pause
