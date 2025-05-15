# Dockerfile (final, production-optimized)
FROM node:18-alpine

# Install necessary packages
RUN apk add --no-cache openssl

# Set working directory
WORKDIR /app

# Install only production dependencies first
COPY package*.json ./
RUN npm install

# Copy rest of the app
COPY . .

# Prisma: Generate client & apply migrations
RUN npx prisma generate
RUN npx prisma migrate deploy

# Expose port for Render or Docker
EXPOSE 3000

# Start the app
CMD ["npm", "run", "start"]
