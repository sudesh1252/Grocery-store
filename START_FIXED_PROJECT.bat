@echo off
echo ========================================
echo   SHREE GROCERY STORE v2.0
echo   All Errors Fixed + UI Improved
echo ========================================
echo.

echo [INFO] Starting servers with all fixes applied...
echo.

echo [1/2] Starting Backend (Fixed)...
start "Backend Server" cmd /k "cd backend && echo Starting backend with fixes... && npm run dev"
timeout /t 3 /nobreak >nul

echo [2/2] Starting Frontend (Improved UI)...
start "Frontend Server" cmd /k "cd frontend && echo Starting frontend with new UI... && npm start"

echo.
echo ========================================
echo   SERVERS STARTING!
echo ========================================
echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo What's New:
echo  ✓ Fixed database sync errors
echo  ✓ Fixed server crash issues
echo  ✓ Improved UI with modern design
echo  ✓ Better colors and animations
echo  ✓ Professional appearance
echo.
echo Browser will open automatically in a few seconds...
echo.
echo Read ALL_FIXED_SUMMARY.md for complete details!
echo.
pause
