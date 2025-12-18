import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '@/lib/db';

// Check if Google OAuth credentials are available
const hasGoogleAuth = process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET;

// Configure providers based on available credentials
const providers = hasGoogleAuth
  ? [
      Google({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
    ]
  : [];

export const { handlers, auth, signIn, signOut } = NextAuth({
  // Only use database adapter if providers are configured
  adapter: hasGoogleAuth ? DrizzleAdapter(db) : undefined,
  providers,
  callbacks: {
    async session({ session, user, token }) {
      // Handle both database and JWT sessions
      if (session?.user) {
        if (user) {
          session.user.id = user.id;
        } else if (token?.sub) {
          session.user.id = token.sub;
        }
      }
      return session;
    },
    async jwt({ user, token }) {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  // Use JWT session if no database adapter
  session: {
    strategy: hasGoogleAuth ? 'database' : 'jwt',
  },
});