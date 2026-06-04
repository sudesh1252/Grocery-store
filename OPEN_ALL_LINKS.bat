@echo off
echo.
echo ================================================
echo   OPENING ALL IMPORTANT LINKS
echo ================================================
echo.
echo 1. Opening Vercel Dashboard (to update env var)
echo 2. Opening Frontend (to test)
echo 3. Opening Inventory Page (to see responsive)
echo 4. Opening Backend Health (to verify)
echo.
echo Press any key to open all links...
pause >nul

start https://vercel.com/dashboard
timeout /t 2 >nul

start https://grocery-store-wheat-psi.vercel.app
timeout /t 2 >nul

start https://grocery-store-wheat-psi.vercel.app/inventory
timeout /t 2 >nul

start https://grocery-store-wygh.onrender.com/health

echo.
echo ================================================
echo   ALL LINKS OPENED!
echo ================================================
echo.
echo Next Steps:
echo 1. Update REACT_APP_API_URL in Vercel
echo 2. Add "/api" at the end
echo 3. Redeploy
echo 4. Test login and signup
echo.
timeout /t 5
