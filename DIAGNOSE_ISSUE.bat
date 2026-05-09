@echo off
echo ========================================
echo   DIAGNOSING LOGIN ISSUE
echo ========================================
echo.

echo [1/5] Checking MySQL Service...
sc query MYSQL80 | find "RUNNING" >nul
if %ERRORLEVEL% EQU 0 (
    echo ✓ MySQL is running
) else (
    echo ✗ MySQL is NOT running
    echo   Solution: net start MYSQL80
)
echo.

echo [2/5] Checking if database exists...
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p -e "USE shree_grocery; SELECT 'Database exists' as status;" 2>nul
if %ERRORLEVEL% EQU 0 (
    echo ✓ Database 'shree_grocery' exists
) else (
    echo ✗ Database 'shree_grocery' does NOT exist
    echo   Solution: Run CREATE_DATABASE.bat
)
echo.

echo [3/5] Checking backend port 5000...
netstat -an | find ":5000" | find "LISTENING" >nul
if %ERRORLEVEL% EQU 0 (
    echo ✓ Backend is running on port 5000
) else (
    echo ✗ Backend is NOT running
    echo   Solution: cd backend ^&^& npm run dev
)
echo.

echo [4/5] Checking frontend port 3000...
netstat -an | find ":3000" | find "LISTENING" >nul
if %ERRORLEVEL% EQU 0 (
    echo ✓ Frontend is running on port 3000
) else (
    echo ✗ Frontend is NOT running
    echo   Solution: cd frontend ^&^& npm start
)
echo.

echo [5/5] Testing backend API...
curl -s http://localhost:5000 >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo ✓ Backend API is responding
    echo.
    echo Backend Response:
    curl -s http://localhost:5000
) else (
    echo ✗ Backend API is NOT responding
    echo   Solution: Make sure backend is running
)
echo.

echo ========================================
echo   DIAGNOSIS COMPLETE
echo ========================================
echo.
echo Next Steps:
echo 1. Fix any issues marked with ✗
echo 2. Read FIX_LOGIN_ISSUE.md for detailed solutions
echo 3. Try logging in again
echo.
pause
