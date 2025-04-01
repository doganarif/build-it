#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { promisify } = require('util');
const { mkdirp } = require('mkdirp');
const writeFile = promisify(fs.writeFile);
const exists = promisify(fs.exists);

// Set up paths
const rootDir = path.resolve(__dirname, '..');
const apiRoutesDir = path.join(rootDir, 'app', 'api');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (text) => new Promise((resolve) => rl.question(text, resolve));

/**
 * Generate API route with POST/GET/PUT/DELETE methods
 */
async function generateApiRoute() {
  console.log('\n🌐 API Route Generator');
  console.log('===================\n');
  
  // Get route name
  const routeName = await question('Route name (e.g. "users", "products/categories"): ');
  
  if (!routeName) {
    console.log('❌ Route name is required');
    rl.close();
    return;
  }
  
  // Route directory
  const routeDir = path.join(apiRoutesDir, routeName);
  
  // Check if the route already exists
  if (await exists(routeDir)) {
    const overwrite = await question('⚠️ Route already exists. Overwrite? (y/N): ');
    
    if (overwrite.toLowerCase() !== 'y') {
      console.log('Operation cancelled');
      rl.close();
      return;
    }
  }
  
  // Create directory and route.js file
  await mkdirp(routeDir);
  
  // Ask about HTTP methods to implement
  console.log('\nSelect HTTP methods to implement:');
  const includeGet = (await question('Include GET method? (Y/n): ')).toLowerCase() !== 'n';
  const includePost = (await question('Include POST method? (Y/n): ')).toLowerCase() !== 'n';
  const includePut = (await question('Include PUT method? (Y/n): ')).toLowerCase() !== 'n';
  const includeDelete = (await question('Include DELETE method? (Y/n): ')).toLowerCase() !== 'n';
  
  // Ask about database usage
  const usesDb = (await question('\nDoes this route interact with the database? (Y/n): ')).toLowerCase() !== 'n';
  
  // Ask about authentication
  const requiresAuth = (await question('Does this route require authentication? (Y/n): ')).toLowerCase() !== 'n';
  
  // Generate route file content
  let routeContent = `import { NextResponse } from 'next/server';\n`;
  
  if (usesDb) {
    routeContent += `import { db } from '@/lib/db';\n`;
  }
  
  if (requiresAuth) {
    routeContent += `import { getServerSession } from '@/lib/auth';\n`;
  }
  
  routeContent += `\n`;
  
  // Generate GET method
  if (includeGet) {
    routeContent += `/**
 * GET ${routeName}
 * @param {Request} request - The request object
 * @returns {Promise<NextResponse>} - The response object
 */
export async function GET(request) {
  try {`;
    
    if (requiresAuth) {
      routeContent += `
    // Check authentication
    const session = await getServerSession();
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }`;
    }
    
    if (usesDb) {
      routeContent += `
    // Example: Retrieve items from database
    const items = await db.${routeName.split('/').pop().replace(/-./g, x => x[1].toUpperCase())}?.findMany({
      take: 10,
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return NextResponse.json({ 
      items: items || [] 
    });`;
    } else {
      routeContent += `
    // Example: Return static data
    return NextResponse.json({ 
      items: [] 
    });`;
    }
    
    routeContent += `
  } catch (error) {
    console.error('Error in GET ${routeName}:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}\n\n`;
  }
  
  // Generate POST method
  if (includePost) {
    routeContent += `/**
 * POST ${routeName}
 * @param {Request} request - The request object
 * @returns {Promise<NextResponse>} - The response object
 */
export async function POST(request) {
  try {`;
    
    if (requiresAuth) {
      routeContent += `
    // Check authentication
    const session = await getServerSession();
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }`;
    }
    
    routeContent += `
    // Parse the request body
    const body = await request.json();
    
    // Validate request body
    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json(
        { error: 'Request body is required' },
        { status: 400 }
      );
    }`;
    
    if (usesDb) {
      routeContent += `
    
    // Example: Create a new item in the database
    const newItem = await db.${routeName.split('/').pop().replace(/-./g, x => x[1].toUpperCase())}?.create({
      data: {
        ...body,
        ${requiresAuth ? `userId: session.user.id,` : ''}
        createdAt: new Date()
      }
    });
    
    return NextResponse.json({ 
      item: newItem
    }, { status: 201 });`;
    } else {
      routeContent += `
    
    // Example: Return success response
    return NextResponse.json({ 
      success: true,
      data: body
    }, { status: 201 });`;
    }
    
    routeContent += `
  } catch (error) {
    console.error('Error in POST ${routeName}:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}\n\n`;
  }
  
  // Generate PUT method
  if (includePut) {
    routeContent += `/**
 * PUT ${routeName}
 * @param {Request} request - The request object
 * @returns {Promise<NextResponse>} - The response object
 */
export async function PUT(request) {
  try {`;
    
    if (requiresAuth) {
      routeContent += `
    // Check authentication
    const session = await getServerSession();
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }`;
    }
    
    routeContent += `
    // Parse the request body
    const body = await request.json();
    
    // Validate request body
    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json(
        { error: 'Request body is required' },
        { status: 400 }
      );
    }
    
    if (!body.id) {
      return NextResponse.json(
        { error: 'Item ID is required' },
        { status: 400 }
      );
    }`;
    
    if (usesDb) {
      routeContent += `
    
    // Example: Update an item in the database
    const updatedItem = await db.${routeName.split('/').pop().replace(/-./g, x => x[1].toUpperCase())}?.update({
      where: {
        id: body.id,
        ${requiresAuth ? `userId: session.user.id,` : ''}
      },
      data: {
        ...body,
        updatedAt: new Date()
      }
    });
    
    if (!updatedItem) {
      return NextResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      item: updatedItem
    });`;
    } else {
      routeContent += `
    
    // Example: Return success response
    return NextResponse.json({ 
      success: true,
      data: body
    });`;
    }
    
    routeContent += `
  } catch (error) {
    console.error('Error in PUT ${routeName}:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}\n\n`;
  }
  
  // Generate DELETE method
  if (includeDelete) {
    routeContent += `/**
 * DELETE ${routeName}
 * @param {Request} request - The request object
 * @returns {Promise<NextResponse>} - The response object
 */
export async function DELETE(request) {
  try {`;
    
    if (requiresAuth) {
      routeContent += `
    // Check authentication
    const session = await getServerSession();
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }`;
    }
    
    routeContent += `
    // Get id from search params
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Item ID is required' },
        { status: 400 }
      );
    }`;
    
    if (usesDb) {
      routeContent += `
    
    // Example: Delete an item from the database
    const deletedItem = await db.${routeName.split('/').pop().replace(/-./g, x => x[1].toUpperCase())}?.delete({
      where: {
        id,
        ${requiresAuth ? `userId: session.user.id,` : ''}
      }
    });
    
    if (!deletedItem) {
      return NextResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true,
      id
    });`;
    } else {
      routeContent += `
    
    // Example: Return success response
    return NextResponse.json({ 
      success: true,
      id
    });`;
    }
    
    routeContent += `
  } catch (error) {
    console.error('Error in DELETE ${routeName}:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}\n`;
  }
  
  // Write route file
  const routeFilePath = path.join(routeDir, 'route.js');
  await writeFile(routeFilePath, routeContent);
  
  console.log(`\n✅ API route "${routeName}" created successfully!`);
  console.log(`📄 File created: ${routeFilePath}`);
  
  console.log('\nAPI endpoint is available at:');
  console.log(`/api/${routeName}`);
  
  // Sample usage
  console.log('\nSample usage with fetch:');
  
  if (includeGet) {
    console.log(`
// GET example
fetch('/api/${routeName}')
  .then(response => response.json())
  .then(data => console.log(data));`);
  }
  
  if (includePost) {
    console.log(`
// POST example
fetch('/api/${routeName}', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    // request data
  })
})
  .then(response => response.json())
  .then(data => console.log(data));`);
  }
  
  rl.close();
}

// Start generator
generateApiRoute().catch(err => {
  console.error('An error occurred:', err);
  rl.close();
}); 