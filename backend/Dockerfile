# Sử dụng Node chính thức
FROM node:18

# Tạo thư mục làm việc
WORKDIR /app

# Copy file cấu hình trước
COPY package*.json ./

# Cài đặt dependency
RUN npm install

# Copy toàn bộ project vào container
COPY . .

# Build NestJS (chuyển TypeScript thành JavaScript)
RUN npm run build

# App khởi động từ thư mục dist
CMD ["node", "dist/main"]

EXPOSE 4000
