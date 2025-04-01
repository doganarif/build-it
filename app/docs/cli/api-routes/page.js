import Link from 'next/link';

export const metadata = {
  title: 'API Routes CLI - BuildIt Documentation',
  description: 'Documentation for generating API routes using the BuildIt CLI',
};

export default function ApiRoutesCliPage() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">API Routes CLI</h1>
      
      <div className="mt-6">
        <p className="text-lg text-gray-600">
          The BuildIt CLI provides tools for creating and managing API routes in your application.
          This guide explains how to use the CLI to generate well-structured API endpoints with minimal effort.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900">Creating API Routes</h2>
        
        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-900">Basic Usage</h3>
          <p>
            To create a new API route, run the following command:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>npm run cli -- generate api</code>
          </pre>
          <p className="mt-2">
            You can also use the shorthand version:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>npm run cli -- g a</code>
          </pre>
          <p className="mt-2">
            The CLI will prompt you for information about the API route:
          </p>
          <ul className="mt-4 space-y-2">
            <li><strong>Resource Name</strong>: The resource your API manages (e.g., "products", "users")</li>
            <li><strong>Route Type</strong>: REST Collection, REST Single Resource, or Custom Route</li>
            <li><strong>HTTP Methods</strong>: Which HTTP methods to implement (GET, POST, PUT, DELETE)</li>
            <li><strong>Authentication</strong>: Whether the route requires authentication</li>
            <li><strong>Add Validation</strong>: Whether to add request validation with zod</li>
            <li><strong>Add Database</strong>: Whether to add database operations</li>
          </ul>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Example</h3>
          <p>
            Here's an example of creating a products API route:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`$ npm run cli -- generate api

🌐 BuildIt API Route Generator 🌐

? Resource name: products
? Route type: REST Collection (e.g., /api/products)
? Which HTTP methods do you want to implement? GET, POST
? Require authentication? Yes
? Add request validation? Yes
? Include database operations? Yes

Creating API route for "products"...
✅ Created app/api/products/route.js
✅ Created app/api/products/schema.js

API route "products" created successfully!`}
            </code>
          </pre>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Route Types</h2>
        
        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-900">REST Collection Routes</h3>
          <p>
            Collection routes handle operations on a collection of resources (e.g., <code>/api/products</code>).
            These routes typically implement:
          </p>
          <ul className="mt-2 space-y-2">
            <li><code>GET</code>: List resources (with pagination, filtering, sorting)</li>
            <li><code>POST</code>: Create a new resource</li>
          </ul>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">REST Single Resource Routes</h3>
          <p>
            Single resource routes handle operations on a specific resource (e.g., <code>/api/products/[id]</code>).
            These routes typically implement:
          </p>
          <ul className="mt-2 space-y-2">
            <li><code>GET</code>: Retrieve a specific resource</li>
            <li><code>PUT</code>: Update a resource</li>
            <li><code>DELETE</code>: Delete a resource</li>
          </ul>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Custom Routes</h3>
          <p>
            Custom routes allow you to create specialized endpoints that don't follow REST conventions
            (e.g., <code>/api/auth/login</code>, <code>/api/stats/dashboard</code>).
          </p>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Generated Files</h2>
        <p>
          The CLI generates the following files for each API route:
        </p>
        
        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-900">Route Handler</h3>
          <p>
            The main route handler file at <code>app/api/[resource]/route.js</code>:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`// app/api/products/route.js
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { createProductSchema } from './schema';

/**
 * GET /api/products
 * 
 * List all products with pagination, sorting, and filtering
 */
export async function GET(request) {
  try {
    // Check authentication
    const session = await auth();
    if (!session) {
      return new NextResponse(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401 }
      );
    }

    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const sort = searchParams.get('sort') || 'createdAt';
    const order = searchParams.get('order') || 'desc';
    const status = searchParams.get('status');
    
    // Build filters
    const filters = {};
    if (status) {
      filters.status = status;
    }
    
    // Query database
    const skip = (page - 1) * limit;
    const [products, total] = await Promise.all([
      db.product.findMany({
        where: filters,
        orderBy: { [sort]: order },
        skip,
        take: limit,
      }),
      db.product.count({ where: filters }),
    ]);
    
    // Return paginated response
    return NextResponse.json({
      data: products,
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
      },
    });
  } catch (error) {
    console.error('Error listing products:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500 }
    );
  }
}

/**
 * POST /api/products
 * 
 * Create a new product
 */
export async function POST(request) {
  try {
    // Check authentication
    const session = await auth();
    if (!session) {
      return new NextResponse(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validation = createProductSchema.safeParse(body);
    
    if (!validation.success) {
      return new NextResponse(
        JSON.stringify({
          error: {
            message: 'Validation error',
            details: validation.error.errors,
          },
        }),
        { status: 400 }
      );
    }
    
    const data = validation.data;
    
    // Create product in database
    const product = await db.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        status: data.status || 'draft',
        userId: session.user.id,
      },
    });
    
    // Return created product
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500 }
    );
  }
}`}
            </code>
          </pre>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Validation Schema</h3>
          <p>
            If you choose to add validation, a schema file is created at <code>app/api/[resource]/schema.js</code>:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`// app/api/products/schema.js
import { z } from 'zod';

/**
 * Schema for creating a product
 */
export const createProductSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }).max(100),
  description: z.string().optional(),
  price: z.number().min(0, { message: 'Price cannot be negative' }),
  status: z.enum(['draft', 'published', 'archived']).optional(),
  // Add more fields as needed
});

/**
 * Schema for updating a product
 */
export const updateProductSchema = createProductSchema.partial();

/**
 * Schema for filtering products
 */
export const filterProductsSchema = z.object({
  status: z.enum(['draft', 'published', 'archived']).optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  // Add more filters as needed
});`}
            </code>
          </pre>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Single Resource Route</h3>
          <p>
            For single resource routes, an additional folder with a dynamic route is created:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`// app/api/products/[id]/route.js
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { updateProductSchema } from '../schema';

/**
 * GET /api/products/[id]
 * 
 * Get a specific product by ID
 */
export async function GET(request, { params }) {
  try {
    // Check authentication
    const session = await auth();
    if (!session) {
      return new NextResponse(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401 }
      );
    }

    const id = params.id;
    
    // Fetch product from database
    const product = await db.product.findUnique({
      where: { id },
    });
    
    if (!product) {
      return new NextResponse(
        JSON.stringify({ error: 'Product not found' }),
        { status: 404 }
      );
    }
    
    // Check if user has access to this product
    if (product.userId !== session.user.id && session.user.role !== 'admin') {
      return new NextResponse(
        JSON.stringify({ error: 'Forbidden' }),
        { status: 403 }
      );
    }
    
    // Return product
    return NextResponse.json(product);
  } catch (error) {
    console.error(\`Error fetching product \${params.id}:\`, error);
    return new NextResponse(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500 }
    );
  }
}

/**
 * PUT /api/products/[id]
 * 
 * Update a product
 */
export async function PUT(request, { params }) {
  try {
    // Check authentication
    const session = await auth();
    if (!session) {
      return new NextResponse(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401 }
      );
    }

    const id = params.id;
    
    // Check if product exists and user has access
    const existingProduct = await db.product.findUnique({
      where: { id },
    });
    
    if (!existingProduct) {
      return new NextResponse(
        JSON.stringify({ error: 'Product not found' }),
        { status: 404 }
      );
    }
    
    if (existingProduct.userId !== session.user.id && session.user.role !== 'admin') {
      return new NextResponse(
        JSON.stringify({ error: 'Forbidden' }),
        { status: 403 }
      );
    }
    
    // Parse and validate request body
    const body = await request.json();
    const validation = updateProductSchema.safeParse(body);
    
    if (!validation.success) {
      return new NextResponse(
        JSON.stringify({
          error: {
            message: 'Validation error',
            details: validation.error.errors,
          },
        }),
        { status: 400 }
      );
    }
    
    // Update product in database
    const updatedProduct = await db.product.update({
      where: { id },
      data: validation.data,
    });
    
    // Return updated product
    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error(\`Error updating product \${params.id}:\`, error);
    return new NextResponse(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/products/[id]
 * 
 * Delete a product
 */
export async function DELETE(request, { params }) {
  try {
    // Check authentication
    const session = await auth();
    if (!session) {
      return new NextResponse(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401 }
      );
    }

    const id = params.id;
    
    // Check if product exists and user has access
    const existingProduct = await db.product.findUnique({
      where: { id },
    });
    
    if (!existingProduct) {
      return new NextResponse(
        JSON.stringify({ error: 'Product not found' }),
        { status: 404 }
      );
    }
    
    if (existingProduct.userId !== session.user.id && session.user.role !== 'admin') {
      return new NextResponse(
        JSON.stringify({ error: 'Forbidden' }),
        { status: 403 }
      );
    }
    
    // Delete product from database
    await db.product.delete({
      where: { id },
    });
    
    // Return success response
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(\`Error deleting product \${params.id}:\`, error);
    return new NextResponse(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500 }
    );
  }
}`}
            </code>
          </pre>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">API Best Practices</h2>
        
        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-900">Authentication</h3>
          <p>
            The generated API routes include authentication when requested:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`// Check authentication
const session = await auth();
if (!session) {
  return new NextResponse(
    JSON.stringify({ error: 'Unauthorized' }),
    { status: 401 }
  );
}`}
            </code>
          </pre>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Error Handling</h3>
          <p>
            All routes include standardized error handling:
          </p>
          <ul className="mt-2 space-y-2">
            <li>Authentication errors (401 Unauthorized)</li>
            <li>Authorization errors (403 Forbidden)</li>
            <li>Not found errors (404 Not Found)</li>
            <li>Validation errors (400 Bad Request)</li>
            <li>Server errors (500 Internal Server Error)</li>
          </ul>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Validation</h3>
          <p>
            Request validation is implemented using Zod schemas:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`// Parse and validate request body
const body = await request.json();
const validation = createProductSchema.safeParse(body);

if (!validation.success) {
  return new NextResponse(
    JSON.stringify({
      error: {
        message: 'Validation error',
        details: validation.error.errors,
      },
    }),
    { status: 400 }
  );
}`}
            </code>
          </pre>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Pagination</h3>
          <p>
            Collection routes include built-in pagination, sorting, and filtering:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`// Parse query parameters
const { searchParams } = new URL(request.url);
const page = parseInt(searchParams.get('page') || '1');
const limit = parseInt(searchParams.get('limit') || '10');
const sort = searchParams.get('sort') || 'createdAt';
const order = searchParams.get('order') || 'desc';

// Return paginated response
return NextResponse.json({
  data: products,
  pagination: {
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    totalItems: total,
  },
});`}
            </code>
          </pre>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Customizing API Routes</h2>
        
        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-900">Adding Middleware</h3>
          <p>
            You can add custom middleware to your API routes:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`// app/api/middleware.js
import { NextResponse } from 'next/server';

export function withLogging(handler) {
  return async (request, context) => {
    console.log(\`API Request: \${request.method} \${request.url}\`);
    const start = Date.now();
    
    try {
      const response = await handler(request, context);
      const duration = Date.now() - start;
      console.log(\`API Response: \${response.status} (\${duration}ms)\`);
      return response;
    } catch (error) {
      const duration = Date.now() - start;
      console.error(\`API Error: \${error.message} (\${duration}ms)\`);
      throw error;
    }
  };
}

// Usage in a route
import { withLogging } from '../middleware';

export const GET = withLogging(async (request) => {
  // Route handler logic
});`}
            </code>
          </pre>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Rate Limiting</h3>
          <p>
            You can add rate limiting to your API routes:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`// app/api/middleware.js
import { NextResponse } from 'next/server';
import { redis } from '@/lib/redis';

export function withRateLimit(handler, { limit = 100, window = 60 } = {}) {
  return async (request, context) => {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const key = \`rate-limit:\${ip}\`;
    
    // Get current count
    const count = await redis.incr(key);
    if (count === 1) {
      await redis.expire(key, window);
    }
    
    // Add rate limit headers
    const remaining = Math.max(0, limit - count);
    const reset = await redis.ttl(key);
    
    // Check if rate limit exceeded
    if (count > limit) {
      return new NextResponse(
        JSON.stringify({ error: 'Too Many Requests' }),
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': reset.toString(),
          }
        }
      );
    }
    
    // Process the request
    const response = await handler(request, context);
    
    // Add rate limit headers to response
    response.headers.set('X-RateLimit-Limit', limit.toString());
    response.headers.set('X-RateLimit-Remaining', remaining.toString());
    response.headers.set('X-RateLimit-Reset', reset.toString());
    
    return response;
  };
}

// Usage in a route
import { withRateLimit } from '../middleware';

export const GET = withRateLimit(
  async (request) => {
    // Route handler logic
  },
  { limit: 100, window: 60 }
);`}
            </code>
          </pre>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Advanced API Features</h2>
        
        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-900">File Uploads</h3>
          <p>
            Handling file uploads in API routes:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`// app/api/uploads/route.js
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { uploadToStorage } from '@/lib/storage';

export async function POST(request) {
  try {
    // Check authentication
    const session = await auth();
    if (!session) {
      return new NextResponse(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401 }
      );
    }

    // Parse form data
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file) {
      return new NextResponse(
        JSON.stringify({ error: 'No file uploaded' }),
        { status: 400 }
      );
    }
    
    // Upload file to storage
    const result = await uploadToStorage(file, session.user.id);
    
    // Return file details
    return NextResponse.json({
      url: result.url,
      filename: result.filename,
      size: result.size,
      contentType: result.contentType,
    }, { status: 201 });
  } catch (error) {
    console.error('Error uploading file:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500 }
    );
  }
}`}
            </code>
          </pre>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">API Versioning</h3>
          <p>
            Structure your API with versioning:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`app/
  api/
    v1/
      products/
        route.js
        [id]/
          route.js
        schema.js
    v2/
      products/
        route.js
        [id]/
          route.js
        schema.js`}
            </code>
          </pre>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">API Documentation</h3>
          <p>
            Generate API documentation with Swagger/OpenAPI:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`// app/api/docs/route.js
import { NextResponse } from 'next/server';
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BuildIt API',
      version: '1.0.0',
      description: 'API documentation for BuildIt application',
    },
    servers: [
      {
        url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        description: 'API server',
      },
    ],
  },
  apis: ['./app/api/**/*.js'], // Path to the API files
};

const swaggerSpec = swaggerJsdoc(options);

export async function GET() {
  return NextResponse.json(swaggerSpec);
}`}
            </code>
          </pre>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Testing API Routes</h2>
        
        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-900">Unit Testing</h3>
          <p>
            Test API routes with Vitest and Supertest:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`// __tests__/api/products.test.js
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { createRequest, createResponse } from 'node-mocks-http';
import { GET, POST } from '@/app/api/products/route';
import { db } from '@/lib/db';

// Mock dependencies
vi.mock('@/lib/auth', () => ({
  auth: vi.fn(() => ({
    user: { id: 'test-user-id', role: 'user' }
  }))
}));

vi.mock('@/lib/db', () => ({
  db: {
    product: {
      findMany: vi.fn(),
      count: vi.fn(),
      create: vi.fn(),
    }
  }
}));

describe('Products API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/products', () => {
    it('should return a list of products with pagination', async () => {
      // Mock database response
      db.product.findMany.mockResolvedValue([
        { id: '1', name: 'Product 1' },
        { id: '2', name: 'Product 2' }
      ]);
      db.product.count.mockResolvedValue(2);
      
      // Create mock request
      const req = createRequest({
        method: 'GET',
        url: '/api/products?page=1&limit=10',
      });
      
      // Call the handler
      const res = await GET(req);
      const data = await res.json();
      
      // Assertions
      expect(res.status).toBe(200);
      expect(data.data).toHaveLength(2);
      expect(data.pagination).toEqual({
        page: 1,
        limit: 10,
        totalPages: 1,
        totalItems: 2,
      });
    });
  });

  describe('POST /api/products', () => {
    it('should create a new product', async () => {
      // Mock database response
      const createdProduct = {
        id: '1',
        name: 'New Product',
        description: 'A test product',
        price: 99.99,
        status: 'draft',
        userId: 'test-user-id',
      };
      db.product.create.mockResolvedValue(createdProduct);
      
      // Create mock request
      const req = createRequest({
        method: 'POST',
        url: '/api/products',
        body: {
          name: 'New Product',
          description: 'A test product',
          price: 99.99,
        },
      });
      
      // Call the handler
      const res = await POST(req);
      const data = await res.json();
      
      // Assertions
      expect(res.status).toBe(201);
      expect(data).toEqual(createdProduct);
      expect(db.product.create).toHaveBeenCalledWith({
        data: {
          name: 'New Product',
          description: 'A test product',
          price: 99.99,
          status: 'draft',
          userId: 'test-user-id',
        },
      });
    });
  });
});`}
            </code>
          </pre>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Integration Testing</h3>
          <p>
            Test the entire API flow with integration tests:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`// __tests__/api/integration/products.test.js
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { fetch } from '@/lib/test-utils';
import { createTestUser, createAuthToken } from '@/lib/test-utils';
import { db } from '@/lib/db';

let testUser;
let authToken;

describe('Products API Integration', () => {
  beforeAll(async () => {
    // Create a test user
    testUser = await createTestUser();
    authToken = await createAuthToken(testUser);
  });

  afterAll(async () => {
    // Clean up
    await db.product.deleteMany({
      where: { userId: testUser.id },
    });
    await db.user.delete({
      where: { id: testUser.id },
    });
  });

  it('should create and retrieve a product', async () => {
    // Create a product
    const createRes = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${authToken}\`,
      },
      body: JSON.stringify({
        name: 'Integration Test Product',
        description: 'Created during integration tests',
        price: 49.99,
      }),
    });
    
    expect(createRes.status).toBe(201);
    const product = await createRes.json();
    
    // Retrieve the product
    const getRes = await fetch(\`/api/products/\${product.id}\`, {
      headers: {
        'Authorization': \`Bearer \${authToken}\`,
      },
    });
    
    expect(getRes.status).toBe(200);
    const retrievedProduct = await getRes.json();
    
    expect(retrievedProduct.id).toBe(product.id);
    expect(retrievedProduct.name).toBe('Integration Test Product');
    expect(retrievedProduct.price).toBe(49.99);
  });
});`}
            </code>
          </pre>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Next Steps</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900">API Reference</h3>
            <p className="mt-2 text-gray-600">
              Learn about all available API endpoints in the BuildIt application.
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
            <h3 className="text-lg font-medium text-gray-900">Database Integration</h3>
            <p className="mt-2 text-gray-600">
              Learn how to work with the database in your API routes.
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
        </div>
      </div>
    </div>
  );
} 