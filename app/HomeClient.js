'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useStore } from '@/lib/store/index.js';
import { useEffect } from 'react';

export default function HomeClient() {
  const { theme, toggleTheme, addNotification } = useStore();
  
  // Show welcome notification when component mounts
  useEffect(() => {
    addNotification({
      type: 'info',
      title: 'Welcome to BuildIt',
      message: 'Your Next.js boilerplate with Zustand state management!'
    });
  }, []);

  return (
    <div className={`overflow-hidden ${theme === 'dark' ? 'bg-gray-900 text-white' : ''}`}>
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-10">
        <Button 
          variant="outline" 
          size="sm"
          onClick={toggleTheme}
          className="flex items-center gap-2"
        >
          {theme === 'dark' ? '☀️ Light' : '🌙 Dark'} Mode
        </Button>
      </div>

      {/* Hero Section */}
      <section className={`py-20 md:py-28 ${theme === 'dark' ? 'bg-gray-900' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">
                  BuildIt
                </span>{' '}
                - Your Next.js Boilerplate
              </h1>
              <p className={`text-xl mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Start your next project with this powerful, feature-rich boilerplate. Save time and focus on building great products.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link href="/dashboard">
                  <Button size="lg" className="w-full sm:w-auto">
                    Get Started
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    View Pricing
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className={`relative w-full h-[400px] ${theme === 'dark' ? 'bg-gray-800' : 'bg-gradient-to-r from-blue-50 to-indigo-50'} rounded-lg flex items-center justify-center`}>
                <div className={`absolute inset-0 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} border rounded-lg shadow-md overflow-hidden`}>
                  <div className="relative w-full h-full">
                    <div className={`absolute top-0 w-full h-8 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} flex items-center px-4`}>
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                    </div>
                    <div className={`mt-8 p-6 h-[calc(100%-32px)] ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} font-mono text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'} overflow-hidden`}>
                      <div className="text-blue-600">
                        # Next.js 15 Boilerplate
                      </div>
                      <div className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>
                        - 🔐 Auth.js Authentication
                      </div>
                      <div className={theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}>
                        - 💳 Stripe Integration
                      </div>
                      <div className={theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}>
                        - 🗄️ Prisma ORM
                      </div>
                      <div className={theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}>
                        - 🎨 Tailwind CSS
                      </div>
                      <div className={theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}>
                        - 📦 Zustand State Management
                      </div>
                      <div className={theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}>
                        - 🔔 Sonner Notifications
                      </div>
                      <div className="mt-4 text-blue-600">
                        $ npm run dev
                      </div>
                      <div className="mt-2 text-green-600">
                        Ready on http://localhost:3000
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-16 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything You Need</h2>
            <p className={`text-xl max-w-3xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              This boilerplate comes packed with all the essential features to build modern web applications
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Authentication',
                description: 'Secure authentication with Auth.js supporting multiple providers and JWT sessions',
                icon: '🔐',
              },
              {
                title: 'Database & ORM',
                description: 'Prisma ORM configured with SQLite (easily switchable to other databases)',
                icon: '🗄️',
              },
              {
                title: 'Payments',
                description: 'Stripe integration with subscription management and checkout sessions',
                icon: '💳',
              },
              {
                title: 'Modern UI',
                description: 'Beautiful UI components built with Tailwind CSS and modern design patterns',
                icon: '🎨',
              },
              {
                title: 'State Management',
                description: 'Simple and efficient state management with Zustand',
                icon: '📦',
              },
              {
                title: 'Notifications',
                description: 'Clean toast notifications with Sonner for better user experience',
                icon: '🔔',
              },
            ].map((feature, index) => (
              <div key={index} className={`${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'} p-6 rounded-lg shadow-sm border`}>
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Build Your Next Project?</h2>
          <p className="text-xl mb-8 opacity-90">
            Get started with this feature-rich boilerplate and build amazing web applications in no time.
          </p>
          <Link href="/pricing">
            <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
              View Pricing Plans
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
} 