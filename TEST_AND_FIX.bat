@echo off
echo ========================================
echo   TESTING MYSQL CONNECTION
echo ========================================
echo.

echo Testing with password: root
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -proot -e "SELECT 'Success' as Status;" 2>nul

if %ERRORLEVEL% EQU 0 (
    echo ✓ Password "root" works!
    echo.
    echo Creating database...
    "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -proot -e "CREATE DATABASE IF NOT EXISTS shree_grocery;"
    echo ✓ Database created!
    echo.
    echo ========================================
    echo   ALL GOOD! Now restart backend:
    echo   1. Press Ctrl+C in backend terminal
    echo   2. Run: npm run dev
    echo ========================================
) else (
    echo ✗ Password "root" doesn't work!
    echo.
    echo Let's try empty password...
    "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -e "SELECT 'Success' as Status;" 2>nul
    
    if !ERRORLEVEL! EQU 0 (
        echo ✓ Empty password works!
        echo.
        echo Updating backend\.env...
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
            echo DB_PASSWORD=
            echo.
            echo # JWT Configuration
            echo JWT_SECRET=shree_grocery_super_secret_key_2026_change_in_production
            echo JWT_EXPIRE=7d
            echo.
            echo # CORS Configuration
            echo CLIENT_URL=http://localhost:3000
        ) > backend\.env
        echo ✓ Updated backend\.env with empty password!
        echo.
        echo Creating database...
        "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -e "CREATE DATABASE IF NOT EXISTS shree_grocery;"
        echo ✓ Database created!
        echo.
        echo ========================================
        echo   FIXED! Now restart backend:
        echo   1. Press Ctrl+C in backend terminal
        echo   2. Run: npm run dev
        echo ========================================
    ) else (
        echo ✗ Neither password works!
        echo.
        echo Please run: FIX_MYSQL_PASSWORD.bat
        echo And enter your correct MySQL password.
    )
)

echo.
pause
