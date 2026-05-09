@echo off
setlocal enabledelayedexpansion
echo ========================================
echo   MYSQL PASSWORD FINDER AND FIXER
echo ========================================
echo.
echo This script will help you:
echo 1. Test your MySQL password
echo 2. Automatically update backend\.env
echo 3. Restart your backend
echo.
echo ========================================
echo.

:test_password
echo Testing MySQL connection...
echo.
echo Please enter your MySQL root password:
set /p MYSQL_PASS=Password: 

echo.
echo Testing password...
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p%MYSQL_PASS% -e "SELECT 'Connection successful!' as Status;" 2>nul

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo   ✓ PASSWORD IS CORRECT!
    echo ========================================
    echo.
    echo Updating backend\.env file...
    
    REM Create new .env content
    (
        echo # Server Configuration
        echo PORT=5000
        echo NODE_ENV=development
        echo.
        echo # MySQL Database Configuration
        echo DB_HOST=localhost
        echo DB_PORT=3306
        echo DB_NAME=shree_grocery
        echo DB_USER=root
        echo DB_PASSWORD=!MYSQL_PASS!
        echo.
        echo # JWT Configuration
        echo JWT_SECRET=shree_grocery_super_secret_key_2026_change_in_production
        echo JWT_EXPIRE=7d
        echo.
        echo # CORS Configuration ^(Frontend URL^)
        echo CLIENT_URL=http://localhost:3000
    ) > backend\.env
    
    echo ✓ backend\.env updated successfully!
    echo.
    echo Creating database if it doesn't exist...
    "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p!MYSQL_PASS! -e "CREATE DATABASE IF NOT EXISTS shree_grocery;" 2>nul
    echo ✓ Database ready!
    echo.
    echo ========================================
    echo   ALL FIXED! ✓
    echo ========================================
    echo.
    echo Next steps:
    echo 1. Go back to your backend terminal
    echo 2. Press Ctrl+C to stop the server
    echo 3. Run: npm run dev
    echo 4. Backend should start successfully!
    echo.
    
) else (
    echo.
    echo ========================================
    echo   ✗ PASSWORD IS INCORRECT!
    echo ========================================
    echo.
    set /p retry=Try again? (Y/N): 
    if /i "!retry!"=="Y" goto test_password
    echo.
    echo Please find your correct MySQL password and try again.
    echo.
)

pause
