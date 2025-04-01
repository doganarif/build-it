# BuildIt - Next.js 15 Boilerplate

A comprehensive Next.js 15 boilerplate with authentication, database integration, payment processing, and modern UI components.

## Features

- 🚀 **Next.js 15** - The latest version of Next.js
- 🔐 **Auth.js (Next Auth)** - Complete authentication system
- 🗄️ **Prisma ORM** - With SQLite as the default database (easily switchable)
- 💳 **Stripe Integration** - For subscriptions and payments
- 🎨 **Tailwind CSS** - For styling
- 📦 **Zustand** - Simple state management
- 🔔 **Sonner** - Toast notifications
- 📱 **Responsive Design** - Mobile-first approach

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Stripe account (for payment features)
- OAuth provider credentials (if using social login)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/buildit.git
cd buildit
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

4. Edit the `.env.local` file with your credentials:
   - Generate AUTH_SECRET with `openssl rand -base64 32`
   - Add your OAuth provider credentials
   - Add your Stripe API keys

5. Initialize the database:

```bash
npx prisma migrate dev --name init
```

6. Start the development server:

```bash
npm run dev
```

## Project Structure

```
buildit/
├── app/             # Next.js app directory
│   ├── api/         # API routes
│   ├── auth/        # Authentication pages
│   ├── dashboard/   # Dashboard pages
│   └── pricing/     # Pricing pages
├── components/      # React components
│   ├── ui/          # UI components
│   └── ...          # Other components
├── lib/             # Utility functions
│   ├── auth.js      # Auth.js configuration
│   ├── db.js        # Database client
│   ├── stripe.js    # Stripe utilities
│   └── store.js     # Zustand store
├── prisma/          # Prisma schema and migrations
└── public/          # Static assets
```

## Authentication

This boilerplate uses Auth.js (next-auth) with the following providers:

- Credentials (email/password)
- Google
- GitHub

Configure your providers in the `.env.local` file.

## Database

Prisma ORM is used with SQLite as the default database. The schema includes models for:

- Users
- Accounts (for OAuth)
- Sessions
- Verification Tokens
- Subscriptions
- Products
- Prices

To change to a different database (PostgreSQL, MySQL, etc.), update the `prisma/schema.prisma` file and the `DATABASE_URL` in your `.env.local` file.

## Stripe Integration

The boilerplate includes:

- Subscription management
- Checkout sessions
- Customer portal
- Webhook handling

Configure your Stripe keys in the `.env.local` file.

## State Management

Zustand is used for global state management. The store is defined in `lib/store.js`.

## UI Components

Custom UI components are located in the `components/ui/` directory, including:

- Button
- Card
- Input
- Toaster (using Sonner)

## Deployment

This project can be deployed to Vercel with zero configuration:

```bash
npm run build
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org)
- [Auth.js](https://authjs.dev)
- [Prisma](https://prisma.io)
- [Stripe](https://stripe.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Zustand](https://github.com/pmndrs/zustand)
- [Sonner](https://sonner.emilkowal.ski)
