# Hướng dẫn Build và Chạy Docker cho CMC Booking Room

## Yêu cầu hệ thống
- Docker Desktop đã được cài đặt và chạy
- Node.js 18+ (cho development)

## Các bước thực hiện

### 1. Kiểm tra lỗi và build ứng dụng
```bash
# Cài đặt dependencies
npm install

# Kiểm tra lỗi TypeScript
npm run typecheck

# Build ứng dụng
npm run build
```

### 2. Build Docker Image
```bash
# Cách 1: Sử dụng script batch (Windows)
build-docker.bat

# Cách 2: Sử dụng lệnh Docker trực tiếp
docker build -t cmc-booking-room .
```

### 3. Chạy ứng dụng với Docker

#### Cách 1: Sử dụng Docker run
```bash
docker run -p 3000:80 cmc-booking-room
```

#### Cách 2: Sử dụng Docker Compose
```bash
# Chạy trong background
docker-compose up -d

# Xem logs
docker-compose logs -f

# Dừng container
docker-compose down
```

### 4. Truy cập ứng dụng
Sau khi chạy thành công, truy cập ứng dụng tại: http://localhost:3000

## Cấu trúc Docker

### Dockerfile
- **Build stage**: Sử dụng Node.js 18 Alpine để build ứng dụng
- **Production stage**: Sử dụng Nginx Alpine để serve static files
- **Multi-stage build**: Giảm kích thước image cuối cùng

### Nginx Configuration
- Hỗ trợ React Router với `try_files`
- Gzip compression cho performance
- Cache static assets
- Security headers

### Docker Compose
- Port mapping: 3000:80
- Auto restart policy
- Environment variables

## Troubleshooting

### Lỗi "docker command not found"
- Cài đặt Docker Desktop từ: https://www.docker.com/products/docker-desktop
- Khởi động lại terminal sau khi cài đặt

### Lỗi build
- Kiểm tra Docker Desktop đã chạy chưa
- Kiểm tra kết nối internet để download base images
- Xóa cache: `docker system prune -a`

### Lỗi port đã được sử dụng
- Thay đổi port trong docker-compose.yml
- Hoặc dừng service đang sử dụng port 3000

## Lệnh hữu ích

```bash
# Xem danh sách images
docker images

# Xem danh sách containers
docker ps -a

# Xóa image
docker rmi cmc-booking-room

# Xóa tất cả containers và images không sử dụng
docker system prune -a

# Xem logs container
docker logs cmc-booking-room-app
``` 