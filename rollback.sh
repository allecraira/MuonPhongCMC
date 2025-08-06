#!/bin/bash

# Rollback script for CMC Booking Room
set -e

PREVIOUS_TAG=${1:-"previous"}

echo "Rolling back to tag: $PREVIOUS_TAG"

# Stop current container
echo "Stopping current container..."
docker stop cmc-booking-room-app || true
docker rm cmc-booking-room-app || true

# Pull previous image
echo "Pulling previous image..."
docker pull ghcr.io/$GITHUB_REPOSITORY:$PREVIOUS_TAG

# Run previous container
echo "Starting previous container..."
docker run -d \
  --name cmc-booking-room-app \
  --restart unless-stopped \
  -p 3000:80 \
  -e NODE_ENV=production \
  ghcr.io/$GITHUB_REPOSITORY:$PREVIOUS_TAG

echo "Rollback completed successfully!" 