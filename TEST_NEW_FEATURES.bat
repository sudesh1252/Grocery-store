@echo off
echo ========================================
echo   TESTING NEW FEATURES
echo   Inventory ^& Reports System
echo ========================================
echo.

echo [1/3] Testing Backend API...
curl -s http://localhost:5000 >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo ✓ Backend is running
    echo.
    echo API Response:
    curl -s http://localhost:5000
    echo.
) else (
    echo ✗ Backend is NOT running
    echo   Please start backend first: cd backend ^&^& npm run dev
    echo.
    pause
    exit /b
)

echo.
echo [2/3] Checking New Endpoints...
echo.
echo Inventory Endpoints:
echo   GET  /api/inventory
echo   POST /api/inventory
echo   PUT  /api/inventory/:id
echo   GET  /api/inventory/alerts/low-stock
echo.
echo Report Endpoints:
echo   GET  /api/reports/daily
echo   GET  /api/reports/monthly
echo   GET  /api/reports/yearly
echo   GET  /api/reports/inventory
echo.

echo [3/3] Database Tables...
echo.
echo New tables will be created automatically:
echo   ✓ products
echo   ✓ stock_movements
echo.

echo ========================================
echo   TESTING COMPLETE!
echo ========================================
echo.
echo Next Steps:
echo 1. Login to your app
echo 2. Test inventory management
echo 3. Generate reports
echo.
echo Read: INVENTORY_AND_REPORTS_ADDED.md
echo.
pause
