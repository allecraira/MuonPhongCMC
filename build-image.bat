@echo off
echo Building Docker image for CMC Booking Room...

REM Set variables
set IMAGE_NAME=muonphongcmc
set VERSION=%1
set DOCKER_USERNAME=thanhngan16

if "%VERSION%"=="" (
    set VERSION=latest
)

echo Building image: %IMAGE_NAME%:%VERSION%

REM Build the Docker image
docker build -t %IMAGE_NAME%:%VERSION% .

if %ERRORLEVEL% EQU 0 (
    echo.
    echo Docker image built successfully!
    echo.
    echo To run the container, use:
    echo docker run -p 3000:80 %IMAGE_NAME%:%VERSION%
    echo.
    echo To push to Docker Hub:
    echo docker tag %IMAGE_NAME%:%VERSION% %DOCKER_USERNAME%/%IMAGE_NAME%:%VERSION%
    echo docker push %DOCKER_USERNAME%/%IMAGE_NAME%:%VERSION%
) else (
    echo.
    echo Failed to build Docker image.
    echo Please check the build logs above.
) 