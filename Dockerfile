# ==============================================================================
# ScaleReach AI - Cloud Production Dockerfile (Render.com / Railway.app)
# Includes Node.js 20, FFmpeg with libass, and yt-dlp pre-configured
# ==============================================================================

FROM node:20-bookworm-slim

# 1. Install system utilities, python, and ffmpeg with libass
RUN apt-get update && apt-get install -y --no-install-recommends \
    ffmpeg \
    python3 \
    python3-pip \
    curl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# 2. Install latest official yt-dlp binary
RUN curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp \
    && chmod a+rx /usr/local/bin/yt-dlp

WORKDIR /app

# 3. Install NPM dependencies
COPY package*.json ./
RUN npm install --production

# 4. Copy backend source code
COPY . .

# 5. Create storage directories
RUN mkdir -p /app/temp_processing /app/clips

EXPOSE 8080

ENV PORT=8080
ENV NODE_ENV=production

CMD ["node", "server.js"]
