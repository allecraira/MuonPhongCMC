FROM node:20

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy file package.json và cài đặt dependencies
COPY package*.json ./
RUN npm install

# Copy toàn bộ mã nguồn
COPY . .

# Build ứng dụng
RUN npm run build

# Expose cổng
EXPOSE 3000

# Chạy ứng dụng
CMD ["npm", "run", "preview"]