# Gunakan node image versi LTS sebagai base image
FROM node:18-alpine

# Set working directory di dalam container
WORKDIR /usr/src/app

# Copy package.json dan package-lock.json ke dalam container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy seluruh konten proyek ke dalam container
COPY . .

# Build proyek React
RUN npm run build

# Port yang akan di-expose
EXPOSE 3000

# Command untuk menjalankan aplikasi React
CMD ["npm", "start"]
