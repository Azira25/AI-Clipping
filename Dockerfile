# --- STAGE 1: Build Aplikasi Go ---
FROM golang:1.21-bullseye AS builder

WORKDIR /app

# Copy file dan build
COPY go.mod ./
COPY main.go ./

# Compile menjadi binary static bernama 'server'
# CGO_ENABLED=0 memastikan binary bisa jalan di linux manapun tanpa library C tambahan
RUN CGO_ENABLED=0 GOOS=linux go build -o server main.go

# --- STAGE 2: Runtime Environment ---
# Kita pakai Debian Slim agar ringan tapi kompatibel
FROM debian:bullseye-slim

WORKDIR /app

# 1. Install dependensi sistem wajib
# python3 & ca-certificates diperlukan agar yt-dlp bisa jalan (yt-dlp butuh python runtime minimal)
RUN apt-get update && apt-get install -y \
    ffmpeg \
    python3 \
    ca-certificates \
    curl \
    && rm -rf /var/lib/apt/lists/*

# 2. Install yt-dlp (Download Binary Langsung)
# Ini JAUH lebih stabil daripada pip install
RUN curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp \
    && chmod a+rx /usr/local/bin/yt-dlp

# 3. Copy aplikasi Go yang sudah jadi dari Stage 1
COPY --from=builder /app/server .

# Buat folder kerja dengan izin penuh
RUN mkdir -p temp public && chmod 777 temp public

# Expose port standar
EXPOSE 7860

# Jalankan server binary
CMD ["./server"]
