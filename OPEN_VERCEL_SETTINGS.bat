@echo off
echo.
echo ============================================
echo   OPENING VERCEL SETTINGS
echo ============================================
echo.
echo 1. Go to Settings tab
echo 2. Click Environment Variables
echo 3. Edit REACT_APP_API_URL
echo 4. Change to: https://grocery-store-wygh.onrender.com/api
echo 5. Save and Redeploy
echo.
echo Opening browser...
echo.

start https://vercel.com/dashboard

timeout /t 3
