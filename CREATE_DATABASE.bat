@echo off
echo ========================================
echo   CREATING MYSQL DATABASE
echo ========================================
echo.
echo Enter your MySQL root password when prompted...
echo.

"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p -e "CREATE DATABASE IF NOT EXISTS shree_grocery; SHOW DATABASES LIKE 'shree_grocery';"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo   DATABASE CREATED SUCCESSFULLY!
    echo ========================================
    echo.
    echo Database 'shree_grocery' is ready!
    echo.
) else (
    echo.
    echo ========================================
    echo   ERROR CREATING DATABASE
    echo ========================================
    echo.
    echo Please check your MySQL password and try again.
    echo.
)

pause
