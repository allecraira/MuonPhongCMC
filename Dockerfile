FROM node:20

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy file package.json và package-lock.json
COPY package*.json ./

# Kiểm tra file đã copy
RUN ls -la

# Cài đặt công cụ build
RUN apt-get update && apt-get install -y python3 build-essential

# Cài đặt dependencies với legacy-peer-deps (nếu cần)
RUN npm config set registry https://registry.npmjs.org/ && \
    npm install --verbose --legacy-peer-deps

# Copy toàn bộ mã nguồn
COPY . .

# Build ứng dụng
RUN npm run build

# Expose cổng
EXPOSE 3000

# Chạy ứng dụng
CMD ["npm", "run", "preview"]