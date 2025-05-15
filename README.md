# 🗣️ Community Forums App

A fullstack web application where users can sign up, create discussion forums, and engage through questions and comments — similar to GitHub Discussions.

---

## 🚀 Tech Stack

### 🧠 Frontend
- **Next.js (App Router)** – React-based framework for SSR, SSG, and routing
- **TypeScript** – Type-safe development
- **Redux Toolkit** – State management
- **Tailwind CSS** – Utility-first CSS framework

### 🛠️ Backend
- **Node.js + Express** – RESTful API services
- **Prisma ORM** – Database modeling and query layer
- **PostgreSQL** – Relational database
- **JWT Auth** – Secure login sessions with role-based access control

### 🐳 DevOps
- **Docker** – Containerization for backend/frontend services
- **Docker Compose** – Multi-container orchestration

---

## 📦 Folder Structure

root
├── client/ # Next.js frontend
│ ├── app/ # App directory for routing
│ ├── components/ # Reusable UI components
│ └── redux/ # Redux slices and store
├── server/ # Express backend
│ ├── prisma/ # Prisma schema and migrations
│ ├── src/
│ │ ├── routes/ # REST route handlers
│ │ ├── services/ # Business logic
│ │ └── utils/ # Auth, validation helpers
├── docker/ # Docker & docker-compose configs
└── shared/ # Shared types/utilities

yaml
Copy code

---

## 🔧 Setup Instructions

### 🖥️ Prerequisites
- [Docker](https://www.docker.com/products/docker-desktop) & Docker Compose
- [Node.js](https://nodejs.org/) (only if running outside Docker)

---

### 📦 1. Clone & Setup

```bash
git clone https://github.com/your-username/community-forums.git
cd community-forums
🐳 2. Run with Docker
bash
Copy code
docker-compose up --build
This will:

Build both frontend and backend containers

Apply Prisma migrations

Start both services on:

Service	URL
Frontend	http://localhost:3000
Backend	http://localhost:4000
Postgres	localhost:5432

🔑 3. Environment Variables
Create .env files in both server/ and client/ directories.

server/.env
ini
Copy code
DATABASE_URL=postgresql://postgres:postgres@db:5432/forumsdb
JWT_SECRET=your_jwt_secret_here
client/.env
ini
Copy code
NEXT_PUBLIC_API_URL=http://localhost:4000
✨ Features
✅ Authentication
User registration and login

JWT-based authentication with role-based access (if needed)

✅ Forums
Create, update, and delete forums

View list of public or personal forums

✅ Comments
Add comments/questions to a forum

Support for threaded replies

✅ Dashboard
View user’s own forums and interactions

🧪 Development Notes
🧹 Prisma Commands (if running manually)
bash
Copy code
cd server
npx prisma generate
npx prisma migrate dev
🔍 Common Issues
ESLint errors during build (CI/CD or Docker)?
To bypass for now, add this in next.config.js inside the client folder:

ts
Copy code
module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
};
📌 Future Improvements
✅ WebSocket-based real-time updates

✅ Likes / Upvotes

✅ User profiles

✅ Forum tags & filtering

✅ Pagination & infinite scroll

🧑‍💻 Author
Built with 💻 by Your Name

📄 License
MIT