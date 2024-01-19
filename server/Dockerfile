# Gunakan image node terbaru
FROM node:18-alpine

# Set direktori kerja di dalam container
WORKDIR /app

# Salin package.json dan package-lock.json ke dalam container
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin semua file ke dalam container
COPY . .

# Port yang digunakan oleh Express.js (sesuaikan jika perlu)
EXPOSE 8080

# Perintah untuk menjalankan aplikasi Express.js
CMD ["npm", "start"]




