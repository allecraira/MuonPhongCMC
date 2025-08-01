@echo off
echo ========================================
echo    CMC Booking Room - Quick Start
echo ========================================
echo.

echo [1/3] Pulling latest image from Docker Hub...
docker pull goribb/cmc-booking-room:latest
if %errorlevel% neq 0 (
    echo ERROR: Failed to pull image!
    pause
    exit /b 1
)
echo ✓ Image pulled successfully

echo.
echo [2/3] Stopping existing container...
docker stop cmc-booking-room >nul 2>&1
docker rm cmc-booking-room >nul 2>&1
echo ✓ Cleaned up existing container

echo.
echo [3/3] Starting application...
docker run -d -p 3000:80 --name cmc-booking-room goribb/cmc-booking-room:latest
if %errorlevel% neq 0 (
    echo ERROR: Failed to start application!
    pause
    exit /b 1
)
echo ✓ Application started successfully

echo.
echo ========================================
echo    Success! 
echo ========================================
echo.
echo Your application is now running at:
echo    http://localhost:3000
echo.
echo Press any key to open in browser...
pause >nul
start http://localhost:3000 