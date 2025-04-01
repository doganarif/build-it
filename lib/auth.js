import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { db } from '@/lib/db';
import { emailService } from '@/lib/email';

// Define auth config here to avoid circular dependencies
export const authConfig = {
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
    error: '/auth/error',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user) {
          return null;
        }

        return user;
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      
      if (token.customerId && session.user) {
        session.user.customerId = token.customerId;
      }
      
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.customerId = user.customerId;
      }
      return token;
    }
  },
  events: {
    createUser: async ({ user }) => {
      // Send welcome email when a new user is created
      try {
        await emailService.sendWelcomeEmail(user);
      } catch (error) {
        console.error('Failed to send welcome email:', error);
        // Non-blocking - we don't want auth to fail if email fails
      }
    },
  },
};

// Initialize NextAuth
const handlers = NextAuth(authConfig);

// Helper function for getting session on server
export async function getServerSession() {
  const session = await handlers.auth();
  return session;
}

// Export specific handlers for route.js
export const { auth, signIn, signOut, handlers: { GET, POST } } = handlers; 