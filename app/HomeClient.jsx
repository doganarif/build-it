'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useStore } from '@/lib/store/index.js';
import { useEffect } from 'react';

export default function HomeClient() {
  const { addNotification } = useStore();
  
  // Show welcome notification when component mounts
  useEffect(() => {
    addNotification({
      type: 'info',
      title: 'Welcome to BuildIt',
      message: 'A modern Next.js 15 boilerplate with everything you need'
    });
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-white to-blue-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2 text-center md:text-left">
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-4">
                Next.js 15 • React 19
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900">
                Launch <span className="text-blue-600">Faster</span>
              </h1>
              <p className="text-xl mb-6 text-gray-700 leading-tight">
                Ship production-ready Next.js apps in days, not months. Everything you need, nothing you don't.
              </p>
              <div className="flex flex-row gap-4 justify-center md:justify-start">
                <Link href="/docs">
                  <Button size="lg" className="w-full font-medium">
                    Get Started →
                  </Button>
                </Link>
                <a href="https://github.com/yourusername/buildit" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="lg" className="w-full font-medium">
                    GitHub
                  </Button>
                </a>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative w-full h-[320px] bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                <div className="absolute top-0 w-full h-8 bg-gray-100 flex items-center px-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                </div>
                <div className="mt-8 p-6 h-[calc(100%-32px)] bg-black font-mono text-sm text-gray-100 overflow-hidden">
                  <div className="text-blue-400 font-semibold">
                    # BuildIt: Complete Next.js Stack
                  </div>
                  <div className="mt-4 text-gray-100">
                    <span className="text-green-400">✓</span> Auth.js Authentication
                  </div>
                  <div className="text-gray-100">
                    <span className="text-green-400">✓</span> Prisma ORM & Database
                  </div>
                  <div className="text-gray-100">
                    <span className="text-green-400">✓</span> Stripe & LemonSqueezy
                  </div>
                  <div className="text-gray-100">
                    <span className="text-green-400">✓</span> Email Service
                  </div>
                  <div className="text-gray-100">
                    <span className="text-green-400">✓</span> Zustand Store
                  </div>
                  <div className="text-gray-100">
                    <span className="text-green-400">✓</span> Background Tasks
                  </div>
                  <div className="mt-6 text-blue-400">
                    $ npm create next-app -e github.com/yourusername/buildit
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3 text-gray-900">Everything You Need</h2>
            <p className="text-lg max-w-2xl mx-auto text-gray-600">
              Pre-built features so you can focus on what matters
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Authentication',
                description: 'Social logins, JWT sessions, email verification',
                icon: '🔐',
              },
              {
                title: 'Database',
                description: 'Prisma ORM with migrations and flexible DB support',
                icon: '🗄️',
              },
              {
                title: 'Payments',
                description: 'Stripe and LemonSqueezy with subscription management',
                icon: '💳',
              },
              {
                title: 'Email',
                description: 'Multi-provider system with templates',
                icon: '📨',
              },
              {
                title: 'State',
                description: 'Zustand store with slice pattern',
                icon: '📦',
              },
              {
                title: 'Background Jobs',
                description: 'Scheduled tasks and processes',
                icon: '⏱️',
              },
            ].map((feature, index) => (
              <div key={index} className="bg-gray-50 p-5 rounded-lg border border-gray-100">
                <div className="text-2xl mb-2">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-1 text-gray-900">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Getting Started Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-3 text-gray-900">Up and Running in Minutes</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">1. Create project</h3>
              <div className="bg-gray-900 text-gray-200 p-3 rounded-md font-mono text-sm overflow-auto">
                npm create next-app -e github.com/yourusername/buildit
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">2. Set up environment</h3>
              <div className="bg-gray-900 text-gray-200 p-3 rounded-md font-mono text-sm overflow-auto">
                cp .env.example .env.local
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">3. Initialize database</h3>
              <div className="bg-gray-900 text-gray-200 p-3 rounded-md font-mono text-sm overflow-auto">
                npx prisma migrate dev
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">4. Start development</h3>
              <div className="bg-gray-900 text-gray-200 p-3 rounded-md font-mono text-sm overflow-auto">
                npm run dev
              </div>
            </div>
          </div>
          
          <div className="mt-10 text-center">
            <Link href="/docs">
              <Button size="lg" className="font-medium px-8">
                Read Documentation
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-10 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Build Something Amazing?</h2>
          <div className="inline-flex">
            <Link href="/docs">
              <Button variant="secondary" size="lg" className="font-medium">
                Get Started Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 