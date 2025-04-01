import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function FeaturesPage() {
  const features = [
    {
      title: 'Next.js 15',
      description: 'The latest version of Next.js with Server Components, App Router, and Turbopack.',
      details: [
        'Server Components for improved performance',
        'App Router for simplified routing',
        'Turbopack for faster development and builds',
        'Improved SEO with server-rendered content',
      ],
    },
    {
      title: 'Authentication with Auth.js',
      description: 'Complete authentication system with multiple providers and secure sessions.',
      details: [
        'Multiple authentication providers (Google, GitHub, Credentials)',
        'JWT sessions for improved security',
        'Protected routes and middleware',
        'Easy to extend with additional providers',
      ],
    },
    {
      title: 'Prisma ORM',
      description: 'Modern database toolkit with type-safe queries and migrations.',
      details: [
        'SQLite included by default (easily switchable)',
        'Type-safe database queries',
        'Schema migrations and versioning',
        'Comprehensive models for users, subscriptions, and more',
      ],
    },
    {
      title: 'Stripe Integration',
      description: 'Complete payment processing with subscriptions, checkouts, and customer management.',
      details: [
        'Subscription management and recurring billing',
        'Checkout sessions for one-time payments',
        'Customer portal for managing payment methods',
        'Webhook handling for real-time events',
      ],
    },
    {
      title: 'Modern UI Components',
      description: 'Beautiful UI components built with Tailwind CSS for a responsive experience.',
      details: [
        'Responsive design for all devices',
        'Accessible components following best practices',
        'Customizable with Tailwind classes',
        'Clean and consistent visual design',
      ],
    },
    {
      title: 'State Management',
      description: 'Simple and efficient state management with Zustand.',
      details: [
        'Lightweight and performant global state',
        'Easy to use hooks-based API',
        'Persistent storage options',
        'DevTools support for debugging',
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Features</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          BuildIt comes packed with everything you need to build modern web applications.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {features.map((feature, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-gray-600">{feature.description}</p>
              <ul className="space-y-2">
                {feature.details.map((detail, i) => (
                  <li key={i} className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          BuildIt provides a solid foundation for your next project. Check out our pricing plans or dive right in!
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/pricing">
            <Button size="lg">View Pricing</Button>
          </Link>
          <Link href="https://github.com/yourusername/buildit" target="_blank" rel="noopener noreferrer">
            <Button variant="secondary" size="lg">GitHub Repository</Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 