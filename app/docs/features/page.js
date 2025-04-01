import Link from 'next/link';

export const metadata = {
  title: 'Features - BuildIt Documentation',
  description: 'Overview of the features in the BuildIt SaaS boilerplate',
};

export default function FeaturesPage() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">Features</h1>
      
      <div className="mt-6">
        <p className="text-lg text-gray-600">
          BuildIt comes packed with features to help you build your SaaS application quickly and effectively.
          This page provides an overview of the main features and links to more detailed documentation.
        </p>
      </div>

      <div className="mt-8 space-y-12">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mr-2 h-6 w-6 text-blue-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
              />
            </svg>
            Authentication
          </h2>
          <p>
            BuildIt includes a complete authentication system powered by Auth.js (previously NextAuth.js).
            It supports various authentication methods and provides secure user management.
          </p>
          <div className="mt-4 space-y-2">
            <h3 className="text-xl font-bold text-gray-900">Key Features:</h3>
            <ul>
              <li>Email/password authentication</li>
              <li>Social login providers (Google, GitHub, etc.)</li>
              <li>Email verification</li>
              <li>Password reset functionality</li>
              <li>Session management</li>
              <li>Role-based access control</li>
            </ul>
          </div>
          <div className="mt-4">
            <Link
              href="/docs/features/authentication"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Learn more about Authentication →
            </Link>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mr-2 h-6 w-6 text-blue-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
              />
            </svg>
            Database Integration
          </h2>
          <p>
            BuildIt uses Prisma ORM for database access, making it easy to work with your data
            and manage database migrations. The schema is defined in a declarative way,
            and Prisma handles the rest.
          </p>
          <div className="mt-4 space-y-2">
            <h3 className="text-xl font-bold text-gray-900">Key Features:</h3>
            <ul>
              <li>Type-safe database access</li>
              <li>Auto-generated migrations</li>
              <li>Relational database support</li>
              <li>Database seeding scripts</li>
              <li>Production-ready configuration</li>
            </ul>
          </div>
          <div className="mt-4">
            <Link
              href="/docs/features/database"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Learn more about Database Integration →
            </Link>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mr-2 h-6 w-6 text-blue-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
            Email Service
          </h2>
          <p>
            BuildIt includes a flexible email service that supports multiple providers
            and a templating system for beautiful transactional emails. You can easily
            switch between providers without changing your application code.
          </p>
          <div className="mt-4 space-y-2">
            <h3 className="text-xl font-bold text-gray-900">Key Features:</h3>
            <ul>
              <li>Multi-provider support (SendGrid, SES, Mailchimp, Resend)</li>
              <li>HTML and text email templates</li>
              <li>Template variable interpolation</li>
              <li>File-based template discovery</li>
              <li>Fallback to inline templates</li>
              <li>Code generation for new templates</li>
            </ul>
          </div>
          <div className="mt-4">
            <Link
              href="/docs/features/email"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Learn more about Email Service →
            </Link>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mr-2 h-6 w-6 text-blue-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Cron Jobs
          </h2>
          <p>
            BuildIt includes a built-in scheduler for running background tasks and automated
            processes. You can define tasks that run on a schedule and monitor their execution.
          </p>
          <div className="mt-4 space-y-2">
            <h3 className="text-xl font-bold text-gray-900">Key Features:</h3>
            <ul>
              <li>Easy-to-use task scheduling</li>
              <li>Task registration system</li>
              <li>Error handling and logging</li>
              <li>Execution history tracking</li>
              <li>Manual task execution for testing</li>
              <li>Code generation for new tasks</li>
            </ul>
          </div>
          <div className="mt-4">
            <Link
              href="/docs/features/cron-jobs"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Learn more about Cron Jobs →
            </Link>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mr-2 h-6 w-6 text-blue-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
              />
            </svg>
            Payment Processing
          </h2>
          <p>
            BuildIt includes integration with Stripe and LemonSqueezy for payment processing
            and subscription management. You can easily accept payments and manage
            subscriptions for your SaaS application.
          </p>
          <div className="mt-4 space-y-2">
            <h3 className="text-xl font-bold text-gray-900">Key Features:</h3>
            <ul>
              <li>Multi-provider support (Stripe, LemonSqueezy)</li>
              <li>Subscription management</li>
              <li>Webhook handling</li>
              <li>Payment form components</li>
              <li>Pricing page</li>
              <li>Customer portal</li>
            </ul>
          </div>
          <div className="mt-4">
            <Link
              href="/docs/features/payments"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Learn more about Payment Processing →
            </Link>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mr-2 h-6 w-6 text-blue-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
            CLI Tools
          </h2>
          <p>
            BuildIt includes powerful command-line tools to help you generate code for various
            components of your application, such as email templates, cron jobs, and API routes.
          </p>
          <div className="mt-4 space-y-2">
            <h3 className="text-xl font-bold text-gray-900">Key Features:</h3>
            <ul>
              <li>Email template generation</li>
              <li>Cron job task generation</li>
              <li>API route generation</li>
              <li>Resource listing</li>
              <li>Test email sending</li>
              <li>Manual cron job execution</li>
            </ul>
          </div>
          <div className="mt-4">
            <Link
              href="/docs/cli"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Learn more about CLI Tools →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 