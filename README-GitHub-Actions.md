# Hướng dẫn GitHub Actions cho CMC Booking Room

## Tổng quan
Dự án này có 3 workflow GitHub Actions:
1. **docker-build.yml**: Build và push lên GitHub Container Registry
2. **docker-hub.yml**: Build và push lên Docker Hub
3. **deploy.yml**: Deploy tự động lên server

## Cài đặt Secrets

### 1. GitHub Container Registry (Không cần setup thêm)
- Sử dụng `GITHUB_TOKEN` tự động
- Image sẽ được push lên: `ghcr.io/your-username/cmc-bookinh-room-v6`

### 2. Docker Hub
Thêm secrets sau trong repository settings:

| Secret Name | Value |
|-------------|-------|
| `DOCKER_USERNAME` | Tên user Docker Hub của bạn |
| `DOCKER_PASSWORD` | Access token Docker Hub |

**Cách tạo Docker Hub Access Token:**
1. Đăng nhập Docker Hub
2. Vào Account Settings > Security
3. Tạo New Access Token
4. Copy token và lưu vào secret `DOCKER_PASSWORD`

### 3. Server Deployment
Thêm secrets sau để deploy lên server:

| Secret Name | Value |
|-------------|-------|
| `HOST` | IP hoặc domain của server |
| `USERNAME` | Username SSH |
| `SSH_KEY` | Private SSH key |
| `PORT` | Port SSH (thường là 22) |

## Cách sử dụng

### 1. Push lên GitHub Container Registry
```bash
# Push code lên main branch
git push origin main

# Hoặc tạo tag để release
git tag v1.0.0
git push origin v1.0.0
```

### 2. Push lên Docker Hub
```bash
# Chỉnh sửa file .github/workflows/docker-hub.yml
# Thay đổi IMAGE_NAME thành username của bạn
# Sau đó push code
git push origin main
```

### 3. Deploy tự động
- Workflow sẽ tự động chạy khi push lên main/master
- Hoặc chạy manual từ GitHub Actions tab

## Pull và chạy image

### Từ GitHub Container Registry
```bash
# Pull image
docker pull ghcr.io/your-username/cmc-bookinh-room-v6:main

# Chạy container
docker run -p 3000:80 ghcr.io/your-username/cmc-bookinh-room-v6:main
```

### Từ Docker Hub
```bash
# Pull image
docker pull your-username/cmc-booking-room:main

# Chạy container
docker run -p 3000:80 your-username/cmc-booking-room:main
```

### Sử dụng docker-compose
```bash
# Chỉnh sửa docker-compose.prod.yml
# Thay đổi image name
# Sau đó chạy
docker-compose -f docker-compose.prod.yml up -d
```

## Build và Push locally

### Sử dụng script
```bash
# Build và push với version mặc định (latest)
build-and-push.bat

# Build và push với version cụ thể
build-and-push.bat v1.0.0
```

### Sử dụng lệnh trực tiếp
```bash
# Login Docker Hub
docker login

# Build image
docker build -t your-username/cmc-booking-room:v1.0.0 .

# Push image
docker push your-username/cmc-booking-room:v1.0.0
```

## Monitoring và Logs

### Xem logs container
```bash
docker logs cmc-booking-room-app
```

### Health check
```bash
docker ps
# Kiểm tra STATUS column
```

### Restart container
```bash
docker restart cmc-booking-room-app
```

## Troubleshooting

### Lỗi permission GitHub Container Registry
- Kiểm tra repository có public không
- Hoặc cấp quyền cho GitHub Actions trong repository settings

### Lỗi Docker Hub login
- Kiểm tra username và password trong secrets
- Đảm bảo access token có quyền push

### Lỗi SSH deployment
- Kiểm tra SSH key format (phải có newline ở cuối)
- Kiểm tra server có Docker không
- Kiểm tra port SSH có đúng không

### Lỗi build
- Kiểm tra Dockerfile syntax
- Kiểm tra dependencies trong package.json
- Xem logs trong GitHub Actions

## Tags và Versions

### Automatic tags
- `main`: Latest version từ main branch
- `v1.0.0`: Semantic versioning
- `v1.0`: Major.minor version
- `sha-abc123`: Commit hash

### Manual tags
```bash
# Tạo tag
git tag v1.0.0
git push origin v1.0.0

# Xóa tag
git tag -d v1.0.0
git push origin --delete v1.0.0
```

## Security

### Best practices
- Sử dụng access tokens thay vì password
- Rotate tokens định kỳ
- Sử dụng least privilege principle
- Scan images với security tools

### Image scanning
```bash
# Sử dụng Trivy
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
  aquasec/trivy image your-username/cmc-booking-room:latest
``` 