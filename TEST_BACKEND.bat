@echo off
echo ========================================
echo   TESTING BACKEND CONNECTION
echo ========================================
echo.
echo Testing if backend is running on port 5000...
echo.

curl http://localhost:5000 2>nul

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo   BACKEND IS RUNNING! ✓
    echo ========================================
) else (
    echo.
    echo ========================================
    echo   BACKEND IS NOT RUNNING! ✗
    echo ========================================
    echo.
    echo Please start the backend first:
    echo   cd backend
    echo   npm run dev
)

echo.
pause
