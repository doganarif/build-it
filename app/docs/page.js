import Link from 'next/link';

export const metadata = {
  title: 'BuildIt Documentation',
  description: 'Documentation for the BuildIt SaaS boilerplate',
};

export default function DocsPage() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">BuildIt Documentation</h1>
      <div className="mt-4 flex items-center space-x-2 text-sm text-gray-500">
        <span>Last updated:</span>
        <time dateTime={new Date().toISOString()}>
          {new Intl.DateTimeFormat('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          }).format(new Date())}
        </time>
      </div>

      <div className="mt-8">
        <p className="text-xl text-gray-600">
          Welcome to the BuildIt documentation. Here you'll find comprehensive guides and 
          documentation to help you start working with BuildIt as quickly as possible.
        </p>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900">What is BuildIt?</h2>
        <p>
          BuildIt is a comprehensive SaaS boilerplate built with Next.js, providing everything you need to kickstart your 
          software-as-a-service project. It includes authentication, database integration, payment processing, email services, 
          and automated tasks right out of the box.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900">Key Features</h2>
        <div className="mt-4 grid gap-6 sm:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-blue-100 text-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Authentication</h3>
            <p className="mt-2 text-gray-600">
              Complete authentication system with login, registration, and password reset using Auth.js.
            </p>
            <div className="mt-4">
              <Link
                href="/docs/features/authentication"
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                Learn more →
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-blue-100 text-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Database Integration</h3>
            <p className="mt-2 text-gray-600">
              Ready-to-use database setup with Prisma ORM, making data modeling and migrations easy.
            </p>
            <div className="mt-4">
              <Link
                href="/docs/features/database"
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                Learn more →
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-blue-100 text-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Email Service</h3>
            <p className="mt-2 text-gray-600">
              Multi-provider email service with templating system for transactional emails.
            </p>
            <div className="mt-4">
              <Link
                href="/docs/features/email"
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                Learn more →
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-blue-100 text-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Cron Jobs</h3>
            <p className="mt-2 text-gray-600">
              Built-in scheduler for running background tasks and automated processes.
            </p>
            <div className="mt-4">
              <Link
                href="/docs/features/cron-jobs"
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                Learn more →
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-blue-100 text-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Payment Processing</h3>
            <p className="mt-2 text-gray-600">
              Subscription management with Stripe and LemonSqueezy integration.
            </p>
            <div className="mt-4">
              <Link
                href="/docs/features/payments"
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                Learn more →
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-blue-100 text-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">CLI Tools</h3>
            <p className="mt-2 text-gray-600">
              Code generation tools for creating email templates, cron jobs, and API routes.
            </p>
            <div className="mt-4">
              <Link
                href="/docs/cli"
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                Learn more →
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900">Get Started</h2>
        <p className="mt-4">
          Ready to dive in? Start with our getting started guide to set up your BuildIt project.
        </p>
        <div className="mt-4">
          <Link
            href="/docs/getting-started"
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Getting Started Guide →
          </Link>
        </div>
      </div>
    </div>
  );
} 