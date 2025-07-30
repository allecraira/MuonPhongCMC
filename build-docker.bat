@echo off
echo Building Docker image for CMC Booking Room...

REM Build the Docker image
docker build -t cmc-booking-room .

if %ERRORLEVEL% EQU 0 (
    echo.
    echo Docker image built successfully!
    echo.
    echo To run the container, use:
    echo docker run -p 3000:80 cmc-booking-room
    echo.
    echo Or use docker-compose:
    echo docker-compose up -d
) else (
    echo.
    echo Failed to build Docker image.
    echo Please make sure Docker is installed and running.
) 