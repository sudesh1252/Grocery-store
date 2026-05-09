@echo off
echo ========================================
echo   MYSQL DATABASE SETUP
echo ========================================
echo.
echo This will create the database for Shree Grocery Store
echo.
echo INSTRUCTIONS:
echo 1. Enter your MySQL root password when prompted
echo 2. The database 'shree_grocery' will be created
echo 3. Press Ctrl+C to exit after seeing "Database created"
echo.
echo ========================================
echo.

mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS shree_grocery; SHOW DATABASES LIKE 'shree_grocery';"

echo.
echo ========================================
echo   DATABASE SETUP COMPLETE!
echo ========================================
echo.
echo Database 'shree_grocery' is ready!
echo.
echo NEXT STEP:
echo 1. Update backend/.env with your MySQL password
echo 2. Run START_PROJECT.bat to start the application
echo.
pause
