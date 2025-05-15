# Dockerfile (final)
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate

# Run Prisma migrations before starting
RUN npx prisma migrate deploy

EXPOSE 3000

CMD ["npm", "run", "start"]
