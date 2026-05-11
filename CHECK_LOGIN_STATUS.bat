@echo off
echo ========================================
echo Checking Login Page Status
echo ========================================
echo.

echo 1. Checking if Frontend is running...
curl -s http://localhost:3000 >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Frontend is running on port 3000
) else (
    echo [ERROR] Frontend is NOT running!
    echo Please run: cd frontend ^&^& npm start
)
echo.

echo 2. Checking if Backend is running...
curl -s http://localhost:5000/health >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Backend is running on port 5000
) else (
    echo [ERROR] Backend is NOT running!
    echo Please run: cd backend ^&^& npm start
)
echo.

echo 3. Checking Login page file...
if exist "frontend\src\pages\auth\Login.jsx" (
    echo [OK] Login.jsx exists
) else (
    echo [ERROR] Login.jsx is missing!
)
echo.

echo 4. Checking Signup page file...
if exist "frontend\src\pages\auth\Signup.jsx" (
    echo [OK] Signup.jsx exists
) else (
    echo [ERROR] Signup.jsx is missing!
)
echo.

echo ========================================
echo Next Steps:
echo ========================================
echo 1. Open browser: http://localhost:3000/login
echo 2. Press F12 to open Developer Tools
echo 3. Check Console tab for errors
echo 4. Take a screenshot and show me
echo ========================================
echo.

pause
