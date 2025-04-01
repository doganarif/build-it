import Link from 'next/link';

export const metadata = {
  title: 'Getting Started - BuildIt Documentation',
  description: 'Get started with the BuildIt SaaS boilerplate',
};

export default function GettingStartedPage() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">Getting Started</h1>
      
      <div className="mt-6">
        <p className="text-lg text-gray-600">
          This guide will help you set up and run your BuildIt project. Follow these steps to get 
          your SaaS application up and running quickly.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900">Prerequisites</h2>
        <p>Before you begin, make sure you have the following installed:</p>
        <ul>
          <li>Node.js (v18 or later)</li>
          <li>npm (v9 or later)</li>
          <li>Git</li>
          <li>PostgreSQL (or another database of your choice)</li>
        </ul>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900">Installation</h2>
        
        <div className="mt-4 space-y-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">1. Clone the repository</h3>
            <pre className="overflow-x-auto rounded-md bg-gray-100 p-4">
              <code>git clone https://github.com/yourusername/buildit.git my-saas-app</code>
            </pre>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900">2. Navigate to the project directory</h3>
            <pre className="overflow-x-auto rounded-md bg-gray-100 p-4">
              <code>cd my-saas-app</code>
            </pre>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900">3. Install dependencies</h3>
            <pre className="overflow-x-auto rounded-md bg-gray-100 p-4">
              <code>npm install</code>
            </pre>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900">4. Set up environment variables</h3>
            <p>Create a <code>.env</code> file in the root directory by copying the example:</p>
            <pre className="overflow-x-auto rounded-md bg-gray-100 p-4">
              <code>cp .env.example .env</code>
            </pre>
            <p className="mt-2">
              Update the variables in the <code>.env</code> file with your own values.
              At minimum, you'll need to set the database connection string.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900">5. Initialize the database</h3>
            <pre className="overflow-x-auto rounded-md bg-gray-100 p-4">
              <code>npx prisma migrate dev --name init</code>
            </pre>
            <p className="mt-2">
              This will create the database tables and run the initial migration.
            </p>
            <p className="mt-2">
              You can also seed the database with sample data:
            </p>
            <pre className="overflow-x-auto rounded-md bg-gray-100 p-4">
              <code>npm run init-db</code>
            </pre>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900">6. Start the development server</h3>
            <pre className="overflow-x-auto rounded-md bg-gray-100 p-4">
              <code>npm run dev</code>
            </pre>
            <p className="mt-2">
              This will start the Next.js development server at <a href="http://localhost:3000" className="text-blue-600 hover:text-blue-800">http://localhost:3000</a>.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900">Configuration</h2>
        
        <div className="mt-4 space-y-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Authentication</h3>
            <p>
              BuildIt uses Auth.js (previously NextAuth.js) for authentication. You can configure
              the authentication providers in <code>lib/auth.js</code>.
            </p>
            <p className="mt-2">
              By default, it includes email/password authentication, but you can add other providers
              like Google, GitHub, etc.
            </p>
            <div className="mt-2">
              <Link
                href="/docs/features/authentication"
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                Learn more about authentication →
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900">Database</h3>
            <p>
              BuildIt uses Prisma ORM for database access. The schema is defined in 
              <code>prisma/schema.prisma</code>.
            </p>
            <p className="mt-2">
              You can modify the schema to add or change models according to your needs.
              After changing the schema, run a migration:
            </p>
            <pre className="overflow-x-auto rounded-md bg-gray-100 p-4">
              <code>npx prisma migrate dev --name your_migration_name</code>
            </pre>
            <div className="mt-2">
              <Link
                href="/docs/features/database"
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                Learn more about the database →
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900">Email Services</h3>
            <p>
              BuildIt supports multiple email providers. By default, it's configured to use
              SendGrid, but you can switch to other providers like Amazon SES, Mailchimp, or Resend.
            </p>
            <p className="mt-2">
              Configure your email provider in the <code>.env</code> file:
            </p>
            <pre className="overflow-x-auto rounded-md bg-gray-100 p-4">
              <code>
                EMAIL_PROVIDER=sendgrid<br />
                SENDGRID_API_KEY=your_sendgrid_api_key<br />
                EMAIL_FROM=noreply@yourdomain.com
              </code>
            </pre>
            <div className="mt-2">
              <Link
                href="/docs/features/email"
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                Learn more about email services →
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900">Payment Processing</h3>
            <p>
              BuildIt includes integration with Stripe and LemonSqueezy for payment processing
              and subscription management.
            </p>
            <p className="mt-2">
              Configure your payment providers in the <code>.env</code> file:
            </p>
            <pre className="overflow-x-auto rounded-md bg-gray-100 p-4">
              <code>
                # Stripe configuration<br />
                STRIPE_SECRET_KEY=your_stripe_secret_key<br />
                STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret<br />
                <br />
                # LemonSqueezy configuration<br />
                LEMONSQUEEZY_API_KEY=your_lemonsqueezy_api_key<br />
                LEMONSQUEEZY_WEBHOOK_SECRET=your_lemonsqueezy_webhook_secret
              </code>
            </pre>
            <div className="mt-2">
              <Link
                href="/docs/features/payments"
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                Learn more about payment processing →
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900">Next Steps</h2>
        
        <p>
          Now that you have your BuildIt project up and running, you can:
        </p>
        
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900">Explore the Features</h3>
            <p className="mt-2 text-gray-600">
              Learn about all the built-in features and how to customize them for your needs.
            </p>
            <div className="mt-4">
              <Link
                href="/docs/features"
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                View features →
              </Link>
            </div>
          </div>
          
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900">Try the CLI Tools</h3>
            <p className="mt-2 text-gray-600">
              Use the built-in CLI tools to generate code for email templates, cron jobs, and API routes.
            </p>
            <div className="mt-4">
              <Link
                href="/docs/cli"
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                View CLI tools →
              </Link>
            </div>
          </div>
          
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900">Customize the UI</h3>
            <p className="mt-2 text-gray-600">
              Modify the UI components to match your brand and design system.
            </p>
            <div className="mt-4">
              <Link
                href="/docs/features/ui-components"
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                View UI components →
              </Link>
            </div>
          </div>
          
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900">Deploy Your Application</h3>
            <p className="mt-2 text-gray-600">
              Learn how to deploy your BuildIt application to production environments.
            </p>
            <div className="mt-4">
              <Link
                href="/docs/deployment"
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                View deployment options →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 