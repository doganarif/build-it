import Link from 'next/link';

export const metadata = {
  title: 'Database Integration - BuildIt Documentation',
  description: 'Learn about the database integration in BuildIt using Prisma ORM',
};

export default function DatabasePage() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">Database Integration</h1>
      
      <div className="mt-6">
        <p className="text-lg text-gray-600">
          BuildIt uses Prisma ORM for database access, making it easy to work with your data
          in a type-safe manner. This documentation covers how to use and configure the database
          layer in your BuildIt application.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900">Overview</h2>
        <p>
          The database layer in BuildIt provides:
        </p>
        <ul className="mt-4 space-y-2">
          <li>Type-safe database queries with auto-completion</li>
          <li>Database migrations and versioning</li>
          <li>Support for PostgreSQL, MySQL, SQLite, and more</li>
          <li>Data validation and relationships</li>
          <li>Seeding scripts for development data</li>
        </ul>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Schema Definition</h2>
        <p>
          The database schema is defined in <code>prisma/schema.prisma</code> file.
          This is where you define your models, their fields, relationships, and other database settings.
        </p>

        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-900">Example Schema</h3>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  password      String?
  image         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  accounts      Account[]
  sessions      Session[]
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

// Add more models as needed for your application...`}
            </code>
          </pre>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Configuration</h2>
        
        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-900">Database Connection</h3>
          <p>
            Set up your database connection by adding the connection string to your <code>.env</code> file:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>DATABASE_URL="postgresql://username:password@localhost:5432/buildit_db?schema=public"</code>
          </pre>
          <p className="mt-2">
            Replace the values with your actual database credentials.
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Changing Database Providers</h3>
          <p>
            You can switch to a different database provider by changing the <code>provider</code> in 
            your <code>schema.prisma</code> file and updating your connection string:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`datasource db {
  provider = "mysql" // Change to mysql, sqlite, sqlserver, etc.
  url      = env("DATABASE_URL")
}`}
            </code>
          </pre>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Migrations</h2>
        <p>
          Prisma provides tools for managing database migrations. When you make changes to your 
          schema, you can create and apply migrations to update your database structure.
        </p>

        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-900">Creating Migrations</h3>
          <p>
            After modifying your schema, create a migration:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>npx prisma migrate dev --name descriptive_name</code>
          </pre>
          <p className="mt-2">
            This command will:
          </p>
          <ol className="mt-2 space-y-1">
            <li>Generate a new SQL migration file</li>
            <li>Apply the migration to your database</li>
            <li>Regenerate the Prisma Client</li>
          </ol>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Applying Migrations in Production</h3>
          <p>
            For production environments, use:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>npx prisma migrate deploy</code>
          </pre>
          <p className="mt-2">
            This will apply all pending migrations without generating new ones.
          </p>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Using the Database</h2>
        
        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-900">Database Client</h3>
          <p>
            BuildIt sets up a global Prisma client instance in <code>lib/db.js</code>:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`// lib/db.js
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global;

export const db = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;`}
            </code>
          </pre>
          <p className="mt-2">
            Import this client to perform database operations:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`import { db } from '@/lib/db';

// Example: Find all users
const users = await db.user.findMany();`}
            </code>
          </pre>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Common Database Operations</h3>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`// Create a record
const newUser = await db.user.create({
  data: {
    name: 'John Doe',
    email: 'john@example.com',
  },
});

// Read records
const user = await db.user.findUnique({
  where: { email: 'john@example.com' },
});

const users = await db.user.findMany({
  where: { 
    name: { contains: 'John' },
  },
  orderBy: { createdAt: 'desc' },
  take: 10,
});

// Update a record
const updatedUser = await db.user.update({
  where: { id: '123' },
  data: { name: 'John Smith' },
});

// Delete a record
await db.user.delete({
  where: { id: '123' },
});

// Relations
const userWithAccounts = await db.user.findUnique({
  where: { id: '123' },
  include: { accounts: true },
});`}
            </code>
          </pre>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Seeding the Database</h2>
        <p>
          BuildIt includes a seed script to populate your database with initial data for development.
          The seed script is defined in <code>prisma/seed.js</code>.
        </p>
        <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
          <code>
{`// prisma/seed.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Create example users
  const alice = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: {
      name: 'Alice',
      email: 'alice@example.com',
      // Add more fields as needed
    },
  });

  console.log({ alice });
  
  // Add more seed data as needed
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });`}
          </code>
        </pre>
        <p className="mt-4">
          Run the seed script with:
        </p>
        <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
          <code>npx prisma db seed</code>
        </pre>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Database Management Tools</h2>
        
        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-900">Prisma Studio</h3>
          <p>
            Prisma Studio is a visual database browser that allows you to view and edit your data:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>npx prisma studio</code>
          </pre>
          <p className="mt-2">
            This launches a web interface at <code>http://localhost:5555</code> where you can browse and
            modify your database tables.
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Database Reset</h3>
          <p>
            During development, you may want to reset your database:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`# Reset the database and apply migrations
npx prisma migrate reset

# This will:
# 1. Drop the database and recreate it
# 2. Apply all migrations
# 3. Run the seed script`}
            </code>
          </pre>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Next Steps</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900">Authentication Integration</h3>
            <p className="mt-2 text-gray-600">
              Learn how authentication works with the database.
            </p>
            <div className="mt-4">
              <Link
                href="/docs/features/authentication"
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                Authentication →
              </Link>
            </div>
          </div>
          
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900">API Routes</h3>
            <p className="mt-2 text-gray-600">
              Build API routes that interact with your database.
            </p>
            <div className="mt-4">
              <Link
                href="/docs/cli/api-routes"
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                API Routes →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 