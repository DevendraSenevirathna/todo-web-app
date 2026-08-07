FROM node:22-alpine

WORKDIR /app

COPY src/backend/package*.json ./

RUN npm ci

COPY src/backend/ ./
COPY src/frontend/ ./frontend/

EXPOSE 5000

CMD ["node", "server.js"]