import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from 'next-auth';
import { db } from '@/lib/prisma';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "database", // Required for Prisma persistence
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id; // attach Prisma user ID
      }
      return session;
    },
  },
  debug: true
};
