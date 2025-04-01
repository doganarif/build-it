import Link from 'next/link';

export const metadata = {
  title: 'Authentication - BuildIt Documentation',
  description: 'Learn about the authentication system in BuildIt',
};

export default function AuthenticationPage() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">Authentication</h1>
      
      <div className="mt-6">
        <p className="text-lg text-gray-600">
          BuildIt includes a complete authentication system built on Auth.js (previously NextAuth.js).
          This integration provides secure, flexible authentication with minimal setup.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900">Overview</h2>
        <p>
          The authentication system in BuildIt provides the following features:
        </p>
        <ul className="mt-4 space-y-2">
          <li>Email/password authentication</li>
          <li>OAuth providers (Google, GitHub, etc.)</li>
          <li>Session management</li>
          <li>JWT and database session strategies</li>
          <li>Password reset flows</li>
          <li>User registration</li>
          <li>Protected routes and components</li>
        </ul>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Configuration</h2>
        <p>
          Authentication is configured in the <code>lib/auth.js</code> file. The default configuration
          uses a database adapter for Prisma to store user accounts and sessions.
        </p>

        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-900">Providers</h3>
          <p>
            You can enable various authentication providers by adding them to the providers array:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`// lib/auth.js
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from '@/lib/db';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      // Credentials provider configuration
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // Add more providers as needed
  ],
  // Other configuration options
};`}
            </code>
          </pre>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Environment Variables</h3>
          <p>
            Add the required environment variables to your <code>.env</code> file:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`# Authentication
AUTH_SECRET=your_auth_secret_key
AUTH_URL=http://localhost:3000

# OAuth Providers (if using)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret`}
            </code>
          </pre>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Usage</h2>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Server-Side Authentication</h3>
          <p>
            You can access the user session on the server using the <code>getServerSession</code> function:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`// Server Component
import { getServerSession } from '@/lib/auth';

export default async function Page() {
  const session = await getServerSession();
  
  if (!session) {
    // Handle unauthenticated state
    return <div>Please sign in</div>;
  }
  
  // User is authenticated
  return <div>Welcome, {session.user.name}</div>;
}`}
            </code>
          </pre>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Client-Side Authentication</h3>
          <p>
            In client components, you can use the <code>useSession</code> hook:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`'use client';

import { useSession } from 'next-auth/react';

export default function ClientComponent() {
  const { data: session, status } = useSession();
  
  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  
  if (status === 'unauthenticated') {
    return <div>Please sign in</div>;
  }
  
  // User is authenticated
  return <div>Welcome, {session.user.name}</div>;
}`}
            </code>
          </pre>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Authentication Actions</h3>
          <p>
            You can perform login, logout, and registration operations:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`// Login
import { signIn } from 'next-auth/react';

// Sign in with credentials
await signIn('credentials', {
  email,
  password,
  redirect: true,
  callbackUrl: '/dashboard'
});

// Sign in with OAuth provider
await signIn('google', {
  redirect: true,
  callbackUrl: '/dashboard'
});

// Logout
import { signOut } from 'next-auth/react';

await signOut({
  redirect: true,
  callbackUrl: '/'
});`}
            </code>
          </pre>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Protected Routes</h2>
        <p>
          You can protect routes by creating middleware that checks for authentication:
        </p>
        <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
          <code>
{`// middleware.js
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    // Additional custom middleware logic if needed
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
    pages: {
      signIn: '/auth/login'
    }
  }
);

export const config = {
  matcher: ['/dashboard/:path*', '/settings/:path*']
};`}
          </code>
        </pre>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Custom Authentication Flow</h2>
        <p>
          BuildIt includes custom authentication flows, including:
        </p>
        <ul className="mt-4 space-y-2">
          <li>User registration with email verification</li>
          <li>Password reset via email</li>
          <li>Account linking with multiple providers</li>
          <li>Customizable login and registration pages</li>
        </ul>
        <p className="mt-4">
          These are implemented using server actions in the <code>app/actions/auth.js</code> file.
        </p>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Authentication UI Components</h2>
        <p>
          BuildIt comes with pre-built authentication UI components:
        </p>
        <ul className="mt-4 space-y-2">
          <li>
            <code>/app/auth/login/page.js</code> - Login page
          </li>
          <li>
            <code>/app/auth/register/page.js</code> - Registration page
          </li>
          <li>
            <code>/app/auth/reset-password/page.js</code> - Password reset page
          </li>
          <li>
            <code>/app/auth/verify/page.js</code> - Email verification page
          </li>
        </ul>
        <p className="mt-4">
          These components are fully customizable to match your application's design.
        </p>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Next Steps</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900">Learn about Database Integration</h3>
            <p className="mt-2 text-gray-600">
              See how user data is stored and retrieved from the database.
            </p>
            <div className="mt-4">
              <Link
                href="/docs/features/database"
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                Database Integration →
              </Link>
            </div>
          </div>
          
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900">Authentication Email Templates</h3>
            <p className="mt-2 text-gray-600">
              Customize the email templates used for authentication flows.
            </p>
            <div className="mt-4">
              <Link
                href="/docs/features/email"
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                Email Service →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 