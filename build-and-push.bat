@echo off
echo Building and pushing Docker image for CMC Booking Room...

REM Set your Docker Hub username
set DOCKER_USERNAME=your-username
set IMAGE_NAME=cmc-booking-room
set VERSION=%1

if "%VERSION%"=="" (
    set VERSION=latest
)

echo Building image: %DOCKER_USERNAME%/%IMAGE_NAME%:%VERSION%

REM Build the Docker image
docker build -t %DOCKER_USERNAME%/%IMAGE_NAME%:%VERSION% .

if %ERRORLEVEL% EQU 0 (
    echo.
    echo Docker image built successfully!
    echo.
    echo Pushing to Docker Hub...
    
    REM Push to Docker Hub
    docker push %DOCKER_USERNAME%/%IMAGE_NAME%:%VERSION%
    
    if %ERRORLEVEL% EQU 0 (
        echo.
        echo Image pushed successfully!
        echo.
        echo To run the container, use:
        echo docker run -p 3000:80 %DOCKER_USERNAME%/%IMAGE_NAME%:%VERSION%
        echo.
        echo Or use docker-compose.prod.yml:
        echo docker-compose -f docker-compose.prod.yml up -d
    ) else (
        echo.
        echo Failed to push image to Docker Hub.
        echo Please make sure you are logged in to Docker Hub:
        echo docker login
    )
) else (
    echo.
    echo Failed to build Docker image.
    echo Please check the build logs above.
) 