FROM node:18-alpine

RUN apk add --no-cache openssl

WORKDIR /app

COPY . .

RUN npm install --production

RUN npx prisma generate

EXPOSE 3000

# Run migrations at container startup when env vars are available
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start"]
