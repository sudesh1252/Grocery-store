@echo off
echo ========================================
echo   VERCEL FRONTEND DEPLOYMENT HELPER
echo ========================================
echo.

echo Step 1: Updating .env.example...
cd frontend
echo REACT_APP_API_URL=https://grocery-store-web6-manager.com > .env.example
echo Done!
echo.

echo Step 2: Committing changes to GitHub...
cd ..
git add frontend/.env.example
git commit -m "Update frontend environment configuration for Vercel deployment"
git push origin main
echo.

echo ========================================
echo   READY FOR VERCEL DEPLOYMENT!
echo ========================================
echo.
echo Next Steps:
echo 1. Go to: https://vercel.com
echo 2. Sign in with GitHub
echo 3. Click "Add New Project"
echo 4. Import "Grocery-store" repository
echo 5. Set Root Directory to: frontend
echo 6. Add Environment Variable:
echo    Name: REACT_APP_API_URL
echo    Value: https://grocery-store-web6-manager.com
echo 7. Click Deploy!
echo.
echo Full guide: VERCEL_FRONTEND_DEPLOYMENT.md
echo.
pause
