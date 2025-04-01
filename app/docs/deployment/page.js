import Link from 'next/link';

export const metadata = {
  title: 'Deployment - BuildIt Documentation',
  description: 'Documentation for deploying your BuildIt SaaS application',
};

export default function DeploymentPage() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">Deployment</h1>
      
      <div className="mt-6">
        <p className="text-lg text-gray-600">
          This guide covers how to deploy your BuildIt SaaS application to production environments,
          ensuring optimal performance, security, and reliability.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900">Overview</h2>
        <p>
          BuildIt is designed to be easily deployed to various hosting platforms, with primary
          support for Vercel and other Next.js-compatible hosting providers.
        </p>
        <ul className="mt-4 space-y-2">
          <li>One-click deployments with Vercel</li>
          <li>Support for containerized deployments with Docker</li>
          <li>Automated CI/CD pipeline configuration</li>
          <li>Environment variable management</li>
          <li>Database migration handling for production</li>
          <li>CDN integration and static asset optimization</li>
        </ul>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Deployment Options</h2>
        
        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-900">Vercel (Recommended)</h3>
          <p>
            Vercel provides the easiest deployment experience for BuildIt, with built-in support for Next.js
            applications and seamless Git integration.
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`# Deploy to Vercel
1. Connect your Git repository at vercel.com
2. Configure environment variables
3. Deploy with a single click`}
            </code>
          </pre>
          <p className="mt-2">
            Alternatively, install the Vercel CLI for deployments from your local machine:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel`}
            </code>
          </pre>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Docker Deployment</h3>
          <p>
            BuildIt includes Docker support for containerized deployments to platforms like AWS, GCP, or
            any Kubernetes cluster.
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`# Build Docker image
docker build -t buildit-app .

# Run Docker container
docker run -p 3000:3000 \\
  --env-file .env.production \\
  buildit-app`}
            </code>
          </pre>
          <p className="mt-2">
            The included Dockerfile optimizes for production builds with multi-stage builds for 
            smaller image sizes and better security.
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Self-Hosting</h3>
          <p>
            For self-hosted environments, you can deploy BuildIt to any server that can run Node.js applications:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`# Build for production
npm run build

# Start production server
npm start`}
            </code>
          </pre>
          <p className="mt-2">
            For production reliability, consider using a process manager like PM2:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`# Install PM2
npm install -g pm2

# Start with PM2
pm2 start npm --name "buildit" -- start

# Ensure app starts on system reboot
pm2 startup
pm2 save`}
            </code>
          </pre>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Environment Configuration</h2>
        <p>
          Proper environment configuration is critical for a secure and functioning production deployment.
        </p>

        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-900">Required Environment Variables</h3>
          <p>
            Create a <code>.env.production</code> file with the following variables:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`# Base URL and Environment
NEXT_PUBLIC_APP_URL=https://your-production-domain.com
NODE_ENV=production

# Authentication
AUTH_SECRET=your_long_random_secret_key
AUTH_URL=https://your-production-domain.com

# Database
DATABASE_URL=your_production_database_connection_string

# Email Service
EMAIL_PROVIDER=sendgrid  # or your preferred provider
EMAIL_FROM=noreply@your-domain.com
SENDGRID_API_KEY=your_sendgrid_api_key

# Payment Processing (if using)
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Additional Service Keys
# Add any other service API keys used by your application`}
            </code>
          </pre>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Platform-specific Configuration</h3>
          <p>
            When deploying to platforms like Vercel, you'll need to configure these environment variables
            in your project settings rather than in a file:
          </p>
          <ol className="mt-2 space-y-2">
            <li>Go to your project in the Vercel dashboard</li>
            <li>Navigate to Settings → Environment Variables</li>
            <li>Add each variable from your <code>.env.production</code> file</li>
            <li>Choose the appropriate environments (production, preview, development)</li>
          </ol>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Database Migrations</h2>
        <p>
          Running database migrations safely in production is essential for maintaining data integrity.
        </p>

        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-900">Applying Migrations</h3>
          <p>
            In production, use Prisma's deploy command to apply migrations:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>npx prisma migrate deploy</code>
          </pre>
          <p className="mt-2">
            This command applies all pending migrations without generating new ones.
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Migration Best Practices</h3>
          <ul className="mt-2 space-y-2">
            <li>Always back up your database before running migrations in production</li>
            <li>Test migrations on a staging environment first</li>
            <li>Include migrations in your CI/CD pipeline before deploying application code</li>
            <li>Avoid destructive migrations (like dropping columns) without a data migration strategy</li>
            <li>Consider database downtime and performance impact for large migrations</li>
          </ul>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Automated Migration in CI/CD</h3>
          <p>
            Include database migrations in your CI/CD pipeline with a script like this:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`#!/bin/bash
# Example deployment script that includes migrations

# Apply database migrations
echo "Running database migrations..."
npx prisma migrate deploy

# Build the application
echo "Building application..."
npm run build

# Start or restart the application
echo "Starting application..."
npm start`}
            </code>
          </pre>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Continuous Integration/Deployment</h2>
        
        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-900">GitHub Actions</h3>
          <p>
            BuildIt includes a GitHub Actions workflow configuration for CI/CD:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`# .github/workflows/main.yml
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test

  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: \${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: \${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'`}
            </code>
          </pre>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Deployment Checks</h3>
          <p>
            Implement these checks in your CI/CD pipeline to ensure successful deployments:
          </p>
          <ul className="mt-2 space-y-2">
            <li>Test suite passes (unit and integration tests)</li>
            <li>Database migrations apply cleanly</li>
            <li>Build process completes without errors</li>
            <li>Security scanning for dependencies (npm audit)</li>
            <li>Environment variables are properly configured</li>
          </ul>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">SSL Configuration</h2>
        <p>
          Always use HTTPS in production to ensure secure communication between clients and your server.
        </p>
        
        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-900">With Vercel</h3>
          <p>
            Vercel automatically provisions and manages SSL certificates for your custom domains.
            Simply add your domain in the Vercel dashboard, and SSL will be configured automatically.
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Self-Hosted SSL</h3>
          <p>
            For self-hosted deployments, you can use Let's Encrypt for free SSL certificates:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`# Install Certbot
sudo apt-get update
sudo apt-get install certbot

# Obtain SSL certificate
sudo certbot certonly --standalone -d your-domain.com

# Configure your web server (Nginx example)
server {
    listen 443 ssl;
    server_name your-domain.com;
    
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    
    # Other SSL configurations...
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}`}
            </code>
          </pre>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Monitoring and Logging</h2>
        <p>
          Implement proper monitoring and logging for your production deployment.
        </p>
        
        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-900">Application Logging</h3>
          <p>
            BuildIt includes a logging utility that integrates with various logging services:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`# Configure logging in .env.production
LOG_LEVEL=info  # Options: debug, info, warn, error
LOG_OUTPUT=json  # Options: pretty, json

# For third-party logging services
LOGFLARE_API_KEY=your_logflare_api_key
LOGFLARE_SOURCE_ID=your_logflare_source_id`}
            </code>
          </pre>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Error Tracking</h3>
          <p>
            Integrate error tracking services for monitoring exceptions:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`# Add to .env.production
SENTRY_DSN=your_sentry_dsn`}
            </code>
          </pre>
          <p className="mt-2">
            The error tracking is already integrated in <code>app/lib/error-tracking.js</code>.
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Performance Monitoring</h3>
          <p>
            Monitor application performance with services like Vercel Analytics or other APM tools:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`# For Vercel Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS=true

# For Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga_id`}
            </code>
          </pre>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Scaling</h2>
        <p>
          As your application grows, consider these scaling strategies:
        </p>
        
        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-900">Horizontal Scaling</h3>
          <ul className="mt-2 space-y-2">
            <li>Deploy multiple instances behind a load balancer</li>
            <li>Use stateless architecture to enable easy scaling</li>
            <li>Implement caching strategies (Redis, Memcached)</li>
            <li>Consider serverless deployments for automatic scaling</li>
          </ul>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Database Scaling</h3>
          <ul className="mt-2 space-y-2">
            <li>Implement read replicas for read-heavy workloads</li>
            <li>Consider database sharding for very large datasets</li>
            <li>Use connection pooling for efficient database connections</li>
            <li>Optimize queries and indexes for better performance</li>
          </ul>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Edge Caching</h3>
          <p>
            Leverage Vercel's edge network or CDNs for global distribution:
          </p>
          <ul className="mt-2 space-y-2">
            <li>Use static site generation (SSG) for cacheable pages</li>
            <li>Implement incremental static regeneration (ISR) for dynamic content</li>
            <li>Configure cache headers for browser and CDN caching</li>
          </ul>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Deployment Checklist</h2>
        <p>
          Use this checklist before deploying to production:
        </p>
        
        <div className="mt-4 space-y-4">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900">Pre-Deployment</h3>
            <ul className="mt-2 space-y-2">
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Run full test suite (<code>npm test</code>)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Check for security vulnerabilities (<code>npm audit</code>)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Ensure all environment variables are configured</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Backup production database</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Verify OAuth callback URLs in provider dashboards</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Test payment processing in test mode</span>
              </li>
            </ul>
          </div>
          
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900">Deployment</h3>
            <ul className="mt-2 space-y-2">
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Run database migrations (<code>npx prisma migrate deploy</code>)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Deploy application code</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Verify SSL certificate is valid</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Check application logs for errors</span>
              </li>
            </ul>
          </div>
          
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900">Post-Deployment</h3>
            <ul className="mt-2 space-y-2">
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Test critical user flows (signup, login, payments)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Verify all API endpoints are functioning</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Check third-party integrations (email, payments)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Monitor error rates and performance</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Validate webhook endpoints</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Next Steps</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900">API Reference</h3>
            <p className="mt-2 text-gray-600">
              Learn about the available API endpoints for your application.
            </p>
            <div className="mt-4">
              <Link
                href="/docs/api-reference"
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                API Reference →
              </Link>
            </div>
          </div>
          
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900">Feature Documentation</h3>
            <p className="mt-2 text-gray-600">
              Review all the features available in your application.
            </p>
            <div className="mt-4">
              <Link
                href="/docs/features"
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                Features →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 