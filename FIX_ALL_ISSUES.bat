@echo off
echo ========================================
echo FIXING ALL PROJECT ISSUES
echo ========================================
echo.

echo Step 1: Stopping all Node processes...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 >nul
echo [OK] All Node processes stopped
echo.

echo Step 2: Installing Backend Dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Backend npm install failed!
    pause
    exit /b 1
)
echo [OK] Backend dependencies installed
echo.

echo Step 3: Installing Frontend Dependencies...
cd ..\frontend
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Frontend npm install failed!
    pause
    exit /b 1
)
echo [OK] Frontend dependencies installed
echo.

echo Step 4: Checking MySQL Connection...
cd ..\backend
echo Checking if MySQL is accessible...
node -e "const {sequelize} = require('./src/config/db'); sequelize.authenticate().then(() => {console.log('MySQL Connected'); process.exit(0);}).catch(err => {console.error('MySQL Error:', err.message); process.exit(1);});"
if %errorlevel% neq 0 (
    echo [WARNING] MySQL connection failed!
    echo Please make sure MySQL is running
    echo.
)
echo.

echo Step 5: Syncing Database Tables...
node -e "const {sequelize} = require('./src/config/db'); const models = require('./src/models'); sequelize.sync({alter: true}).then(() => {console.log('Database synced!'); process.exit(0);}).catch(err => {console.error('Sync Error:', err.message); process.exit(1);});"
if %errorlevel% neq 0 (
    echo [WARNING] Database sync had issues
    echo.
)
echo.

echo ========================================
echo ALL FIXES APPLIED!
echo ========================================
echo.
echo Next Steps:
echo 1. Start Backend:  START_BACKEND.bat
echo 2. Start Frontend: START_FRONTEND.bat
echo 3. Open: http://localhost:3000/login
echo.
echo ========================================
pause
