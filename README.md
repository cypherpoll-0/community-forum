# 🗣️ Community Forums App

A fullstack discussion forum platform where users can sign in with Google, create forums, post comments, and interact with other users — similar to GitHub Discussions.

---

## 🧠 Tech Stack

### Frontend & Backend (Monorepo - Next.js Fullstack)
- **Next.js 14 (App Router)** – UI, routing, and fullstack capabilities
- **API Routes (Pages Router)** – Backend logic for auth, forums, and comments
- **NextAuth.js** – OAuth2 authentication via Google
- **TypeScript** – Type-safe development
- **Tailwind CSS** – Utility-first styling

### Database & ORM
- **PostgreSQL** – Relational DB for users, forums, and comments
- **Prisma** – Type-safe ORM for PostgreSQL

---

## 📁 Project Structure

/app
├── /api
│ ├── /auth [...nextauth] # Google OAuth login/logout
│ ├── /forums # Forum CRUD API
│ └── /comments # Comment CRUD API
├── /forums
│ ├── [id]/page.tsx # Forum detail page
│ └── new/page.tsx # Create forum form
└── page.tsx # Home page (list of forums)

├── /components
├── AuthButton.tsx # Google sign-in/sign-out button
├── ForumCard.tsx # Forum preview card
└── CommentSection.tsx # Comments UI for forums

├── /lib
├── prisma.ts # Prisma client instance
└── auth.ts # NextAuth config

├── /types
└── types.ts # Shared type definitions

├── /prisma
└── schema.prisma # Database schema

├── middleware.ts # Middleware for protecting routes

yaml
Copy code

---

## 🚀 Features

### ✅ Authentication
- Google OAuth login via **NextAuth.js**
- Session-based auth with server/client support
- Protected routes using `middleware.ts`

### ✅ Forums
- Create, read, and view individual forums
- Authenticated users only can create forums

### ✅ Comments
- Post comments under forums
- Only logged-in users can comment

### ✅ User Experience
- Conditional UI (AuthButton) based on user session
- Forum cards and comment sections styled with Tailwind

---

## 🛠️ Setup Instructions

### 🔧 Prerequisites
- Node.js (v18+)
- PostgreSQL DB (local or cloud like Supabase, Neon)
- Google OAuth2 credentials

---

### 📦 1. Clone & Install

```bash
git clone https://github.com/your-username/community-forums.git
cd community-forums
npm install
📄 2. Setup Environment
Create a .env file in the root directory:

env
Copy code
DATABASE_URL=postgresql://your_user:your_pass@localhost:5432/forumsdb

NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
🧪 Tip: Use openssl rand -base64 32 to generate a strong NEXTAUTH_SECRET.

🗄️ 3. Setup Database
bash
Copy code
npx prisma generate
npx prisma migrate dev --name init
🏃 4. Run the App
bash
Copy code
npm run dev
Visit: http://localhost:3000

✨ Screens / Pages
Page	Description
/	Home – list all forums
/forums/new	Create a new forum (auth)
/forums/[id]	Forum detail with comments
/api/auth/*	NextAuth login/logout APIs


🧑‍💻 Author
Built by Ayush Kedia

📄 License
MIT