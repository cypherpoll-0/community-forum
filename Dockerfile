FROM node:18-alpine

# Optional: openssl required by Prisma
RUN apk add --no-cache openssl

WORKDIR /app

COPY . .

RUN npm install

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

# Run migrations and start the app (env vars available now)
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start"]
