@echo off
echo ========================================
echo   SHREE GROCERY STORE - AUTO SETUP
echo ========================================
echo.

echo Step 1: Installing Backend Dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Backend installation failed!
    pause
    exit /b 1
)
echo Backend dependencies installed successfully!
echo.

echo Step 2: Installing Frontend Dependencies...
cd ..\frontend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Frontend installation failed!
    pause
    exit /b 1
)
echo Frontend dependencies installed successfully!
echo.

echo ========================================
echo   INSTALLATION COMPLETE!
echo ========================================
echo.
echo Next steps:
echo 1. Make sure MySQL is running
echo 2. Create database: CREATE DATABASE shree_grocery;
echo 3. Update backend/.env with your MySQL password
echo 4. Run START_BACKEND.bat in one terminal
echo 5. Run START_FRONTEND.bat in another terminal
echo.
pause
