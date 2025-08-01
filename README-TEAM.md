# CMC Booking Room - Hướng dẫn cho Team

## 🚀 Cách chạy ứng dụng nhanh nhất

### Yêu cầu:

- Docker Desktop đã cài đặt và đang chạy
- Internet để download image

### Bước 1: Pull image từ Docker Hub

```bash
docker pull goribb/cmc-booking-room:latest
```

### Bước 2: Chạy ứng dụng

```bash
docker run -d -p 3000:80 --name cmc-booking-room goribb/cmc-booking-room:latest
```

### Bước 3: Truy cập ứng dụng

Mở trình duyệt và truy cập: **http://localhost:3000**

---

## 📋 Các lệnh hữu ích

### Dừng ứng dụng:

```bash
docker stop cmc-booking-room
```

### Khởi động lại:

```bash
docker start cmc-booking-room
```

### Xem logs:

```bash
docker logs cmc-booking-room
```

### Xóa container:

```bash
docker rm cmc-booking-room
```

---

## 🔧 Sử dụng Docker Compose (Khuyến nghị)

### Tạo file `docker-compose.yml`:

```yaml
version: "3.8"
services:
  cmc-booking-room:
    image: goribb/cmc-booking-room:latest
    ports:
      - "3000:80"
    container_name: cmc-booking-room
    restart: unless-stopped
```

### Chạy với Docker Compose:

```bash
docker-compose up -d
```

### Dừng với Docker Compose:

```bash
docker-compose down
```

---

## 🆘 Xử lý sự cố

### Nếu cổng 3000 đã được sử dụng:

```bash
docker run -d -p 8080:80 --name cmc-booking-room goribb/cmc-booking-room:latest
```

Sau đó truy cập: http://localhost:8080

### Nếu container không chạy:

```bash
docker logs cmc-booking-room
```

### Kiểm tra trạng thái container:

```bash
docker ps
```

---

## 📞 Liên hệ

Nếu có vấn đề, liên hệ: [Thông tin liên hệ của bạn]
