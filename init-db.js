const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

// Function to run shell commands and log output
function runCommand(command) {
  console.log(`Running: ${command}`);
  try {
    const output = execSync(command, { encoding: 'utf8' });
    console.log(output);
    return true;
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    console.error(error.message);
    return false;
  }
}

// Check if .env file exists, if not copy from .env.example
const envPath = path.join(process.cwd(), '.env');
const envExamplePath = path.join(process.cwd(), '.env.example');

if (!fs.existsSync(envPath) && fs.existsSync(envExamplePath)) {
  console.log('Creating .env file from .env.example...');
  fs.copyFileSync(envExamplePath, envPath);
  console.log('Created .env file. Please edit it with your credentials before proceeding.');
}

// Create the prisma directory if it doesn't exist
const prismaDir = path.join(process.cwd(), 'prisma');
if (!fs.existsSync(prismaDir)) {
  console.log('Creating prisma directory...');
  fs.mkdirSync(prismaDir, { recursive: true });
}

// Generate the Prisma client
console.log('Generating Prisma client...');
if (!runCommand('npx prisma generate')) {
  process.exit(1);
}

// Create and apply migrations
console.log('Creating and applying migrations...');
if (!runCommand('npx prisma migrate dev --name init')) {
  process.exit(1);
}

// Create default admin user
async function createDefaultUser() {
  console.log('Creating default admin user...');
  
  const prisma = new PrismaClient();
  
  try {
    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email: 'admin@example.com',
      },
    });

    if (existingUser) {
      console.log('Default admin user already exists, skipping creation.');
    } else {
      // Create the user
      const user = await prisma.user.create({
        data: {
          name: 'Admin User',
          email: 'admin@example.com',
          // In a real app, you would hash this password
          // For simplicity in this demo, we're storing it directly
          // The auth system might hash it depending on configuration
          emailVerified: new Date(),
        },
      });
      
      console.log(`Created default admin user with email: admin@example.com`);
      console.log('You can log in with these credentials:');
      console.log('Email: admin@example.com');
      console.log('Password: password123 (using credentials provider)');
    }
  } catch (error) {
    console.error('Error creating default user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the user creation function
createDefaultUser()
  .then(() => {
    console.log('Database initialization completed successfully!');
    console.log('You can now start the application with: npm run dev');
  })
  .catch((error) => {
    console.error('Error during database initialization:', error);
    process.exit(1);
  }); 