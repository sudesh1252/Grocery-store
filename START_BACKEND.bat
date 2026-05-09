@echo off
title Backend Server - Shree Grocery Store
color 0B

echo ========================================
echo BACKEND SERVER
echo Shree Grocery Store API
echo ========================================
echo.

cd backend

echo Checking dependencies...
if not exist node_modules (
    echo Installing dependencies...
    call npm install
)

echo.
echo Starting backend server...
echo Server will run on: http://localhost:5000
echo.
echo ========================================

npm run dev

pause
