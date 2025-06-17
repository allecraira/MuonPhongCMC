# CMC Room Booking

## Giới thiệu

Dự án CMC Room Booking là một ứng dụng web được xây dựng bằng Next.js, cho phép người dùng đặt phòng họp một cách dễ dàng và hiệu quả.

## Công nghệ sử dụng

- **Frontend Framework**: Next.js 14
- **Ngôn ngữ lập trình**: TypeScript
- **UI Framework**:
  - Tailwind CSS
  - Radix UI Components
  - Shadcn UI
- **State Management & Form Handling**:
  - React Hook Form
  - Zod (validation)
- **Database**: MongoDB
- **Authentication**: AWS Credentials

## Tính năng chính

- Đặt phòng họp
- Quản lý lịch họp
- Giao diện người dùng thân thiện
- Responsive design
- Dark/Light mode

## Cài đặt và Chạy dự án

### Yêu cầu hệ thống

- Node.js
- npm hoặc pnpm

### Các bước cài đặt

1. Clone repository:

```bash
git clone https://github.com/allecra/Trien_khai_PM.git
```

2. Cài đặt dependencies:

```bash
npm install
# hoặc
pnpm install
```

3. Chạy dự án ở môi trường development:

```bash
npm run dev
# hoặc
pnpm dev
```

4. Build dự án:

```bash
npm run build
# hoặc
pnpm build
```

## Cấu trúc thư mục

- `/app`: Chứa các routes và pages của ứng dụng
- `/components`: Chứa các components tái sử dụng
- `/lib`: Chứa các utility functions và configurations
- `/public`: Chứa các static assets
- `/styles`: Chứa các file CSS và Tailwind configurations
- `/hooks`: Chứa các custom React hooks

## Scripts

- `npm run dev`: Chạy dự án ở môi trường development
- `npm run build`: Build dự án cho production
- `npm run start`: Chạy dự án đã được build
- `npm run lint`: Kiểm tra lỗi code

## Đóng góp

Mọi đóng góp đều được hoan nghênh. Vui lòng tạo pull request hoặc issue để đóng góp vào dự án.

## License

Dự án này được phát triển bởi CMC và được bảo vệ bởi bản quyền.
