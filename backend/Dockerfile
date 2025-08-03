FROM node:20

WORKDIR /app

# Install dockerize via curl
RUN curl -L https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-alpine-linux-amd64-v0.6.1.tar.gz \
  | tar -C /usr/local/bin -xz

# Install dependencies
COPY package*.json ./
COPY prisma ./prisma
RUN npm install

# Copy app and build
COPY . .
RUN npm run build

# Wait for Postgres and run app
CMD ["dockerize", "-wait", "tcp://postgres:5432", "-timeout", "30s", "npm", "run", "start"]
