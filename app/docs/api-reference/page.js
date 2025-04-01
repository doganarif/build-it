import Link from 'next/link';

export const metadata = {
  title: 'API Reference - BuildIt Documentation',
  description: 'API Reference documentation for the BuildIt SaaS boilerplate',
};

export default function ApiReferencePage() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">API Reference</h1>
      
      <div className="mt-6">
        <p className="text-lg text-gray-600">
          BuildIt provides a complete REST API for interacting with your application data.
          This reference documents all available endpoints, request parameters, and response formats.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900">Authentication</h2>
        <p>
          Most API endpoints require authentication. BuildIt uses JWT (JSON Web Tokens) for API authentication.
        </p>
        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-900">Token Authentication</h3>
          <p>
            Include your JWT token in the Authorization header:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`Authorization: Bearer your_jwt_token`}
            </code>
          </pre>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Obtaining a Token</h3>
          <p>
            You can obtain an API token by making a POST request to the authentication endpoint:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`POST /api/auth/token

// Request Body
{
  "email": "user@example.com",
  "password": "your_password"
}

// Successful Response
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresAt": "2023-12-31T23:59:59Z"
}`}
            </code>
          </pre>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">API Endpoints</h2>
        
        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">User Management</h3>
          <table className="min-w-full divide-y divide-gray-300 mt-4">
            <thead>
              <tr>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-900">Endpoint</th>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-900">Method</th>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-900">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="py-2 px-4 text-sm text-gray-900"><code>/api/users</code></td>
                <td className="py-2 px-4 text-sm text-gray-500">GET</td>
                <td className="py-2 px-4 text-sm text-gray-500">List users (admin only)</td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-sm text-gray-900"><code>/api/users/:id</code></td>
                <td className="py-2 px-4 text-sm text-gray-500">GET</td>
                <td className="py-2 px-4 text-sm text-gray-500">Get user details</td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-sm text-gray-900"><code>/api/users/:id</code></td>
                <td className="py-2 px-4 text-sm text-gray-500">PUT</td>
                <td className="py-2 px-4 text-sm text-gray-500">Update user profile</td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-sm text-gray-900"><code>/api/users/me</code></td>
                <td className="py-2 px-4 text-sm text-gray-500">GET</td>
                <td className="py-2 px-4 text-sm text-gray-500">Get current user profile</td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-sm text-gray-900"><code>/api/users/me/password</code></td>
                <td className="py-2 px-4 text-sm text-gray-500">PUT</td>
                <td className="py-2 px-4 text-sm text-gray-500">Change password</td>
              </tr>
            </tbody>
          </table>
          
          <div className="mt-6">
            <h4 className="text-lg font-bold text-gray-900">Example: Get Current User</h4>
            <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
              <code>
{`GET /api/users/me
Authorization: Bearer your_jwt_token

// Response
{
  "id": "user_123",
  "email": "user@example.com",
  "name": "John Doe",
  "image": "https://example.com/avatar.jpg",
  "emailVerified": true,
  "createdAt": "2023-01-15T10:00:00Z",
  "updatedAt": "2023-06-20T14:30:00Z"
}`}
              </code>
            </pre>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-xl font-bold text-gray-900">Subscription Management</h3>
          <table className="min-w-full divide-y divide-gray-300 mt-4">
            <thead>
              <tr>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-900">Endpoint</th>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-900">Method</th>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-900">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="py-2 px-4 text-sm text-gray-900"><code>/api/subscriptions</code></td>
                <td className="py-2 px-4 text-sm text-gray-500">GET</td>
                <td className="py-2 px-4 text-sm text-gray-500">Get current subscription</td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-sm text-gray-900"><code>/api/subscriptions/checkout</code></td>
                <td className="py-2 px-4 text-sm text-gray-500">POST</td>
                <td className="py-2 px-4 text-sm text-gray-500">Create checkout session</td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-sm text-gray-900"><code>/api/subscriptions/portal</code></td>
                <td className="py-2 px-4 text-sm text-gray-500">POST</td>
                <td className="py-2 px-4 text-sm text-gray-500">Create customer portal session</td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-sm text-gray-900"><code>/api/subscriptions/invoices</code></td>
                <td className="py-2 px-4 text-sm text-gray-500">GET</td>
                <td className="py-2 px-4 text-sm text-gray-500">List invoices</td>
              </tr>
            </tbody>
          </table>
          
          <div className="mt-6">
            <h4 className="text-lg font-bold text-gray-900">Example: Create Checkout Session</h4>
            <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
              <code>
{`POST /api/subscriptions/checkout
Authorization: Bearer your_jwt_token

// Request Body
{
  "priceId": "price_1234567890",
  "successUrl": "https://your-app.com/success",
  "cancelUrl": "https://your-app.com/cancel"
}

// Response
{
  "sessionId": "cs_1234567890",
  "url": "https://checkout.stripe.com/c/pay/cs_1234567890"
}`}
              </code>
            </pre>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-xl font-bold text-gray-900">Data Resources</h3>
          <table className="min-w-full divide-y divide-gray-300 mt-4">
            <thead>
              <tr>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-900">Endpoint</th>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-900">Method</th>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-900">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="py-2 px-4 text-sm text-gray-900"><code>/api/projects</code></td>
                <td className="py-2 px-4 text-sm text-gray-500">GET</td>
                <td className="py-2 px-4 text-sm text-gray-500">List projects</td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-sm text-gray-900"><code>/api/projects</code></td>
                <td className="py-2 px-4 text-sm text-gray-500">POST</td>
                <td className="py-2 px-4 text-sm text-gray-500">Create a project</td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-sm text-gray-900"><code>/api/projects/:id</code></td>
                <td className="py-2 px-4 text-sm text-gray-500">GET</td>
                <td className="py-2 px-4 text-sm text-gray-500">Get project details</td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-sm text-gray-900"><code>/api/projects/:id</code></td>
                <td className="py-2 px-4 text-sm text-gray-500">PUT</td>
                <td className="py-2 px-4 text-sm text-gray-500">Update a project</td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-sm text-gray-900"><code>/api/projects/:id</code></td>
                <td className="py-2 px-4 text-sm text-gray-500">DELETE</td>
                <td className="py-2 px-4 text-sm text-gray-500">Delete a project</td>
              </tr>
            </tbody>
          </table>
          
          <div className="mt-6">
            <h4 className="text-lg font-bold text-gray-900">Example: List Projects</h4>
            <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
              <code>
{`GET /api/projects?page=1&limit=10
Authorization: Bearer your_jwt_token

// Response
{
  "data": [
    {
      "id": "project_123",
      "name": "Marketing Website",
      "description": "Company marketing website redesign",
      "status": "in_progress",
      "createdAt": "2023-03-15T10:00:00Z",
      "updatedAt": "2023-06-20T14:30:00Z"
    },
    {
      "id": "project_456",
      "name": "Mobile App",
      "description": "iOS and Android mobile application",
      "status": "completed",
      "createdAt": "2023-01-10T08:00:00Z",
      "updatedAt": "2023-04-15T11:20:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "totalPages": 1,
    "totalItems": 2
  }
}`}
              </code>
            </pre>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Request and Response Format</h2>
        <p>
          All API requests and responses use JSON format.
        </p>
        
        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-900">Content Type</h3>
          <p>
            Set the Content-Type header for all requests:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>Content-Type: application/json</code>
          </pre>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Pagination</h3>
          <p>
            List endpoints support pagination with the following query parameters:
          </p>
          <ul className="mt-2 space-y-2">
            <li><code>page</code>: Page number (default: 1)</li>
            <li><code>limit</code>: Items per page (default: 10, max: 100)</li>
            <li><code>sort</code>: Sort field (e.g., <code>createdAt</code>)</li>
            <li><code>order</code>: Sort order (<code>asc</code> or <code>desc</code>, default: <code>desc</code>)</li>
          </ul>
          <p className="mt-4">
            Paginated responses include a <code>pagination</code> object:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "totalPages": 5,
    "totalItems": 48
  }
}`}
            </code>
          </pre>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Filtering</h3>
          <p>
            List endpoints support filtering with query parameters:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`// Example: Filter projects by status
GET /api/projects?status=in_progress

// Multiple filters
GET /api/projects?status=in_progress&createdAt[gte]=2023-01-01`}
            </code>
          </pre>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Error Handling</h2>
        <p>
          The API uses conventional HTTP response codes to indicate success or failure.
        </p>
        
        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-900">HTTP Status Codes</h3>
          <table className="min-w-full divide-y divide-gray-300 mt-2">
            <thead>
              <tr>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-900">Code</th>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-900">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="py-2 px-4 text-sm text-gray-900"><code>200 OK</code></td>
                <td className="py-2 px-4 text-sm text-gray-500">Request succeeded</td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-sm text-gray-900"><code>201 Created</code></td>
                <td className="py-2 px-4 text-sm text-gray-500">Resource created successfully</td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-sm text-gray-900"><code>400 Bad Request</code></td>
                <td className="py-2 px-4 text-sm text-gray-500">Invalid request format or parameters</td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-sm text-gray-900"><code>401 Unauthorized</code></td>
                <td className="py-2 px-4 text-sm text-gray-500">Authentication required or failed</td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-sm text-gray-900"><code>403 Forbidden</code></td>
                <td className="py-2 px-4 text-sm text-gray-500">Insufficient permissions</td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-sm text-gray-900"><code>404 Not Found</code></td>
                <td className="py-2 px-4 text-sm text-gray-500">Resource not found</td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-sm text-gray-900"><code>422 Unprocessable Entity</code></td>
                <td className="py-2 px-4 text-sm text-gray-500">Validation error</td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-sm text-gray-900"><code>429 Too Many Requests</code></td>
                <td className="py-2 px-4 text-sm text-gray-500">Rate limit exceeded</td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-sm text-gray-900"><code>500 Internal Server Error</code></td>
                <td className="py-2 px-4 text-sm text-gray-500">Server error</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Error Response Format</h3>
          <p>
            Error responses follow a standard format:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`{
  "error": {
    "code": "validation_error",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}`}
            </code>
          </pre>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Rate Limiting</h2>
        <p>
          API requests are subject to rate limiting to prevent abuse.
        </p>
        
        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-900">Rate Limit Headers</h3>
          <p>
            The API includes rate limit information in response headers:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`X-RateLimit-Limit: 100
X-RateLimit-Remaining: 98
X-RateLimit-Reset: 1624507393`}
            </code>
          </pre>
          <p className="mt-2">
            If you exceed the rate limit, you'll receive a 429 Too Many Requests response.
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Rate Limit Tiers</h3>
          <p>
            Rate limits vary by subscription tier:
          </p>
          <table className="min-w-full divide-y divide-gray-300 mt-2">
            <thead>
              <tr>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-900">Plan</th>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-900">Rate Limit</th>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-900">Period</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="py-2 px-4 text-sm text-gray-900">Free</td>
                <td className="py-2 px-4 text-sm text-gray-500">100 requests</td>
                <td className="py-2 px-4 text-sm text-gray-500">Per hour</td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-sm text-gray-900">Pro</td>
                <td className="py-2 px-4 text-sm text-gray-500">1,000 requests</td>
                <td className="py-2 px-4 text-sm text-gray-500">Per hour</td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-sm text-gray-900">Enterprise</td>
                <td className="py-2 px-4 text-sm text-gray-500">10,000 requests</td>
                <td className="py-2 px-4 text-sm text-gray-500">Per hour</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Webhooks</h2>
        <p>
          BuildIt can send webhook notifications for important events in your application.
        </p>
        
        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-900">Configuring Webhooks</h3>
          <p>
            Configure webhook endpoints in your dashboard settings:
          </p>
          <ol className="mt-2 space-y-2">
            <li>Go to Settings → Webhooks</li>
            <li>Add a new webhook endpoint URL</li>
            <li>Select events to subscribe to</li>
            <li>Generate a signing secret to verify webhook authenticity</li>
          </ol>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Webhook Payload</h3>
          <p>
            Webhook payloads follow this format:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`{
  "id": "evt_1234567890",
  "type": "subscription.created",
  "createdAt": "2023-06-15T10:30:00Z",
  "data": {
    // Event-specific data
  }
}`}
            </code>
          </pre>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Verifying Webhooks</h3>
          <p>
            Verify webhook signatures to ensure they're from BuildIt:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`// Webhook signature is included in the header
X-BuildIt-Signature: t=1624507393,v1=5257a869e7ecebeda32affa62cdca3fa51cad7e77a0e56ff536d0ce8e108d8bd

// Code example for verifying signature
const crypto = require('crypto');

function verifyWebhook(payload, signature, secret) {
  const [timestamp, signatureHash] = signature.split(',')[0].split('=')[1];
  
  // Create the expected signature
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(\`\${timestamp}.\${JSON.stringify(payload)}\`)
    .digest('hex');
  
  // Compare signatures
  return crypto.timingSafeEqual(
    Buffer.from(signatureHash),
    Buffer.from(expectedSignature)
  );
}`}
            </code>
          </pre>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">SDKs and Client Libraries</h2>
        <p>
          BuildIt provides client libraries for common programming languages to interact with the API.
        </p>
        
        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-900">JavaScript/TypeScript</h3>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`// Install the SDK
npm install @buildit/sdk

// Usage
import { BuilditClient } from '@buildit/sdk';

const client = new BuilditClient({
  apiKey: 'your_api_key',
});

// Example: List projects
const projects = await client.projects.list({
  limit: 10,
  status: 'in_progress',
});`}
            </code>
          </pre>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Other Languages</h3>
          <p>
            SDKs for additional languages are available:
          </p>
          <ul className="mt-2 space-y-2">
            <li>
              <a href="#" className="text-blue-600 hover:text-blue-800">
                Python SDK
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:text-blue-800">
                PHP SDK
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:text-blue-800">
                Ruby SDK
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:text-blue-800">
                Go SDK
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Creating Custom API Routes</h2>
        <p>
          You can extend the API with custom routes using the BuildIt CLI.
        </p>
        
        <div className="mt-4">
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>npm run cli -- generate api</code>
          </pre>
          <p className="mt-2">
            For more information on creating custom API routes:
          </p>
          <div className="mt-2">
            <Link
              href="/docs/cli/api-routes"
              className="text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              API Routes CLI Documentation →
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Next Steps</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900">API Routes Generation</h3>
            <p className="mt-2 text-gray-600">
              Learn how to create custom API routes using the CLI.
            </p>
            <div className="mt-4">
              <Link
                href="/docs/cli/api-routes"
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                API Routes CLI →
              </Link>
            </div>
          </div>
          
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900">Deployment</h3>
            <p className="mt-2 text-gray-600">
              Learn how to deploy your application to production.
            </p>
            <div className="mt-4">
              <Link
                href="/docs/deployment"
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                Deployment →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 