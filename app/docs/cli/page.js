import Link from 'next/link';

export const metadata = {
  title: 'CLI Tools - BuildIt Documentation',
  description: 'Documentation for BuildIt CLI code generation tools',
};

export default function CliDocsPage() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">CLI Tools</h1>
      
      <div className="mt-6">
        <p className="text-lg text-gray-600">
          BuildIt comes with powerful command-line tools to help you generate code for various
          components of your application. These tools make it easier to create consistent,
          well-structured code following best practices.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900">Overview</h2>
        <p>
          The BuildIt CLI provides tools for generating:
        </p>
        <ul>
          <li>Email templates with HTML and text versions</li>
          <li>Cron job tasks for scheduled background processing</li>
          <li>API routes with proper validation and error handling</li>
        </ul>
        <p>
          The CLI is dynamic and interactive, guiding you through the creation process
          and customizing the generated code based on your responses.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900">Installation</h2>
        <p>
          The CLI tools are already included in your BuildIt project. You can use them in 
          two ways:
        </p>
        
        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-900">Using npm script</h3>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4">
            <code>npm run cli -- &lt;command&gt;</code>
          </pre>
        </div>
        
        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-900">Using global installation</h3>
          <p>
            You can install the CLI globally to use it directly from the command line:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4">
            <code>npm link</code>
          </pre>
          <p className="mt-2">
            Then use it as:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4">
            <code>buildit &lt;command&gt;</code>
          </pre>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900">Available Commands</h2>
        
        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-900">Generate Code</h3>
          <p>
            Generate various code artifacts with the following commands:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4">
            <code>
              # Generate an email template<br />
              npm run cli -- generate email<br />
              <br />
              # Generate a cron job<br />
              npm run cli -- generate cron<br />
              <br />
              # Generate an API route<br />
              npm run cli -- generate api
            </code>
          </pre>
          <p className="mt-2">
            Shorthand aliases are also available:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4">
            <code>
              npm run cli -- g e  # Generate email template<br />
              npm run cli -- g c  # Generate cron job<br />
              npm run cli -- g a  # Generate API route
            </code>
          </pre>
        </div>
        
        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">List Resources</h3>
          <p>
            List existing resources in your application:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4">
            <code>
              # List all email templates<br />
              npm run cli -- list --emails<br />
              <br />
              # List all cron jobs<br />
              npm run cli -- list --cron<br />
              <br />
              # List all API routes<br />
              npm run cli -- list --api<br />
              <br />
              # List all resources<br />
              npm run cli -- list --emails --cron --api
            </code>
          </pre>
        </div>
        
        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Run Cron Jobs Manually</h3>
          <p>
            Execute a cron job manually for testing:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4">
            <code>npm run cli -- run-job &lt;jobName&gt;</code>
          </pre>
          <p className="mt-2">Example:</p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4">
            <code>npm run cli -- run-job cleanup</code>
          </pre>
        </div>
        
        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Send Test Emails</h3>
          <p>
            Send a test email using a specific template:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4">
            <code>npm run cli -- send-test-email &lt;templateName&gt; &lt;emailAddress&gt;</code>
          </pre>
          <p className="mt-2">Example:</p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4">
            <code>npm run cli -- send-test-email welcome test@example.com</code>
          </pre>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900">Detailed Documentation</h2>
        <p>
          For more detailed information on specific CLI tools, check the following pages:
        </p>
        <ul className="mt-4 space-y-3">
          <li>
            <Link 
              href="/docs/cli/email-templates" 
              className="inline-flex items-center text-lg font-medium text-blue-600 hover:text-blue-800"
            >
              Email Templates
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="ml-1 h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </Link>
            <p className="mt-1 text-gray-600">
              Learn how to generate and customize email templates.
            </p>
          </li>
          <li>
            <Link 
              href="/docs/cli/cron-tasks" 
              className="inline-flex items-center text-lg font-medium text-blue-600 hover:text-blue-800"
            >
              Cron Tasks
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="ml-1 h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </Link>
            <p className="mt-1 text-gray-600">
              Learn how to create and schedule background tasks.
            </p>
          </li>
          <li>
            <Link 
              href="/docs/cli/api-routes" 
              className="inline-flex items-center text-lg font-medium text-blue-600 hover:text-blue-800"
            >
              API Routes
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="ml-1 h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </Link>
            <p className="mt-1 text-gray-600">
              Learn how to generate and customize API routes.
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
} 