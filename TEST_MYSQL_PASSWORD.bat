@echo off
echo ========================================
echo   TEST MYSQL PASSWORD
echo ========================================
echo.
echo This will help you find your correct MySQL password.
echo.
echo Enter your MySQL root password when prompted.
echo If it works, you'll see a list of databases.
echo.
echo ========================================
echo.

"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p -e "SHOW DATABASES;"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo   PASSWORD IS CORRECT! ✓
    echo ========================================
    echo.
    echo Now update backend\.env file:
    echo 1. Open: backend\.env
    echo 2. Find: DB_PASSWORD=your_mysql_password
    echo 3. Change to: DB_PASSWORD=YourPasswordYouJustUsed
    echo 4. Save the file
    echo 5. Restart backend: npm run dev
    echo.
) else (
    echo.
    echo ========================================
    echo   PASSWORD IS INCORRECT! ✗
    echo ========================================
    echo.
    echo Try again with the correct password.
    echo.
)

pause
