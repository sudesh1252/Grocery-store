@echo off
echo ========================================
echo   FIXING SHREE GROCERY STORE FRONTEND
echo ========================================
echo.

cd frontend

echo Step 1: Cleaning old installation...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json
echo Done!
echo.

echo Step 2: Installing dependencies...
call npm install
echo Done!
echo.

echo Step 3: Installing Tailwind CSS...
call npm install -D tailwindcss postcss autoprefixer
echo Done!
echo.

echo Step 4: Verifying Tailwind installation...
call npm list tailwindcss
echo.

echo ========================================
echo   FIX COMPLETE!
echo ========================================
echo.
echo Now run: npm start
echo.
pause
