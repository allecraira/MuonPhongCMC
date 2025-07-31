# 🏢 CMC Booking Room System

Hệ thống đặt phòng họp cho CMC với giao diện hiện đại và tính năng quản lý toàn diện.

## 📋 Mục lục

- [Tính năng](#-tính-năng)
- [Công nghệ sử dụng](#-công-nghệ-sử-dụng)
- [Cài đặt](#-cài-đặt)
- [Chạy ứng dụng](#-chạy-ứng-dụng)
- [Docker](#-docker)
- [GitHub Actions](#-github-actions)
- [Cấu trúc dự án](#-cấu-trúc-dự-án)
- [API Documentation](#-api-documentation)
- [Troubleshooting](#-troubleshooting)

## ✨ Tính năng

### 👥 Người dùng

- **Đăng ký/Đăng nhập** với xác thực JWT
- **Tìm kiếm phòng** với bộ lọc nâng cao
- **Đặt phòng** với validation số người tham gia
- **Xem lịch sử** đặt phòng cá nhân
- **Hủy đặt phòng** trước thời gian diễn ra

### 👨‍💼 Admin

- **Quản lý người dùng** (CRUD)
- **Quản lý phòng** (CRUD)
- **Quản lý đặt phòng** (Duyệt/Từ chối)
- **Dashboard** với thống kê
- **Phân trang** cho tất cả danh sách

### 🎯 Tính năng đặc biệt

- **Giới hạn số người** theo sức chứa phòng
- **Phân trang** hiển thị 10 phòng/trang
- **Responsive design** cho mobile
- **Real-time notifications**
- **Email notifications**

## 🛠 Công nghệ sử dụng

### Frontend

- **React 18** - UI Framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Radix UI** - Component library
- **React Router** - Routing
- **React Hook Form** - Form handling
- **Zod** - Validation
- **Lucide React** - Icons

### Backend (Mock)

- **MongoDB** - Database
- **JWT** - Authentication
- **Nodemailer** - Email service
- **Axios** - HTTP client

### DevOps

- **Docker** - Containerization
- **GitHub Actions** - CI/CD
- **GitHub Container Registry** - Image registry
- **Nginx** - Web server

## 🚀 Cài đặt

### Yêu cầu hệ thống

- Node.js 18+
- npm hoặc yarn
- Git

### Bước 1: Clone repository

```bash
git clone https://github.com/Hoangkans/cmc-bookinh-room-v6.git
cd cmc-bookinh-room-v6
```

### Bước 2: Cài đặt dependencies

```bash
npm install
```

### Bước 3: Chạy ứng dụng

```bash
# Development mode
npm run dev

# Build production
npm run build

# Preview production build
npm run preview
```

## 🐳 Docker

### Pull và chạy Docker Image

```bash
# Pull image từ GitHub Container Registry
docker pull ghcr.io/hoangkans/cmc-bookinh-room-v6:latest

# Chạy container
docker run -p 3000:80 ghcr.io/hoangkans/cmc-bookinh-room-v6:latest
```

### Sử dụng Docker Compose

```bash
# Development
docker-compose up -d

# Production
docker-compose -f docker-compose.prod.yml up -d
```

### Build Docker Image locally

```bash
# Build image
docker build -t cmc-booking-room .

# Chạy container
docker run -p 3000:80 cmc-booking-room
```

## ⚡ GitHub Actions

### Workflows hiện có

1. **docker-build.yml** - Build và push Docker image lên GHCR
2. **docker-hub.yml** - Build và push lên Docker Hub (tạm tắt)
3. **deploy.yml** - Deploy lên server (tạm tắt)

### Trigger

- **Push** vào `main` branch
- **Pull Request** vào `main` branch
- **Tags** với pattern `v*`

### Secrets cần thiết

- `GITHUB_TOKEN` - Tự động có sẵn
- `DOCKERHUB_USER` - Docker Hub username
- `DOCKERHUB_TOKEN` - Docker Hub access token

## 📁 Cấu trúc dự án

```
cmc-bookinh-room-v6/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # UI components (Radix UI)
│   │   ├── Header.tsx      # Header component
│   │   ├── BookingHistory.tsx
│   │   └── WeeklyCalendar.tsx
│   ├── pages/              # Page components
│   │   ├── Index.tsx       # Home page
│   │   ├── Login.tsx       # Login page
│   │   ├── RoomSearch.tsx  # Room search with pagination
│   │   ├── BookingForm.tsx # Booking form with validation
│   │   ├── AdminDashboard.tsx # Admin dashboard
│   │   └── PCTSVDashboard.tsx # PCTSV dashboard
│   ├── contexts/           # React contexts
│   │   ├── AuthProvider.tsx
│   │   └── NotificationContext.tsx
│   ├── hooks/              # Custom hooks
│   ├── lib/                # Utilities and services
│   │   ├── auth.ts         # Authentication service
│   │   ├── cmcApi.ts       # API service
│   │   ├── emailService.ts # Email service
│   │   └── utils.ts        # Utility functions
│   └── main.tsx           # App entry point
├── public/                # Static assets
├── .github/workflows/     # GitHub Actions
├── Dockerfile            # Docker configuration
├── docker-compose.yml    # Docker Compose
├── nginx.conf           # Nginx configuration
└── package.json         # Dependencies
```

## 🔌 API Documentation

### Authentication

```typescript
// Login
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password"
}

// Register
POST /api/auth/register
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "password",
  "role": "user"
}
```

### Rooms

```typescript
// Get all rooms
GET /api/rooms

// Get room by ID
GET /api/rooms/:id

// Create room (Admin only)
POST /api/rooms
{
  "name": "Room Name",
  "capacity": 20,
  "equipment": ["Projector", "Whiteboard"]
}
```

### Bookings

```typescript
// Create booking
POST /api/bookings
{
  "roomId": "room_id",
  "date": "2024-01-15",
  "startTime": "09:00",
  "endTime": "10:00",
  "attendees": 15,
  "purpose": "Team meeting"
}

// Get user bookings
GET /api/bookings/user

// Update booking status (Admin only)
PUT /api/bookings/:id/status
{
  "status": "approved" | "cancelled"
}
```

## 🔧 Troubleshooting

### Lỗi thường gặp

#### 1. "docker command not found"

```bash
# Cài đặt Docker Desktop
# Windows: https://www.docker.com/products/docker-desktop
# Restart terminal sau khi cài đặt
```

#### 2. "npm ci failed"

```bash
# Xóa node_modules và package-lock.json
rm -rf node_modules package-lock.json
npm install
```

#### 3. "Port 3000 already in use"

```bash
# Tìm process sử dụng port 3000
netstat -ano | findstr :3000
# Kill process
taskkill /PID <process_id> /F
```

#### 4. "GitHub Actions failed"

- Kiểm tra secrets trong repository settings
- Đảm bảo workflow file syntax đúng
- Xem logs chi tiết trong Actions tab

### Performance Optimization

#### Build optimization

```bash
# Analyze bundle size
npm run build -- --analyze

# Optimize images
# Sử dụng WebP format cho images
```

#### Docker optimization

```dockerfile
# Multi-stage build
# Layer caching
# Alpine base images
```

## 📞 Hỗ trợ

- **Issues**: https://github.com/Hoangkans/cmc-bookinh-room-v6/issues
- **Discussions**: https://github.com/Hoangkans/cmc-bookinh-room-v6/discussions
- **Email**: []

## 📄 License

MIT License - xem file [LICENSE](LICENSE) để biết thêm chi tiết.

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

---

**Made with ❤️ by Hoi ban tron Team**
