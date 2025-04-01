'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const sidebarItems = [
  {
    title: 'Introduction',
    href: '/docs',
  },
  {
    title: 'Getting Started',
    href: '/docs/getting-started',
  },
  {
    title: 'Features',
    href: '/docs/features',
    items: [
      { title: 'Authentication', href: '/docs/features/authentication' },
      { title: 'Database (Prisma)', href: '/docs/features/database' },
      { title: 'Email Service', href: '/docs/features/email' },
      { title: 'Cron Jobs', href: '/docs/features/cron-jobs' },
      { title: 'Payment Integration', href: '/docs/features/payments' },
    ],
  },
  {
    title: 'CLI Tools',
    href: '/docs/cli',
    items: [
      { title: 'Email Templates', href: '/docs/cli/email-templates' },
      { title: 'Cron Tasks', href: '/docs/cli/cron-tasks' },
      { title: 'API Routes', href: '/docs/cli/api-routes' },
    ],
  },
  {
    title: 'Deployment',
    href: '/docs/deployment',
  },
  {
    title: 'AI',
    href: '/docs/ai',
  },
  {
    title: 'API Reference',
    href: '/docs/api-reference',
  },
];

export default function DocsLayout({ children }) {
  const pathname = usePathname();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  // Close mobile sidebar when pathname changes
  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [pathname]);
  
  return (
    <div className="bg-white">
      {/* Mobile sidebar toggle */}
      <div className="fixed top-20 left-4 z-50 lg:hidden">
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-md bg-white shadow-md"
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        >
          <span className="sr-only">Toggle sidebar</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>

      <div className="mx-auto flex max-w-7xl">
        {/* Sidebar for desktop */}
        <div className="hidden w-64 flex-shrink-0 border-r border-gray-200 lg:block">
          <div className="h-full py-6 pl-8 pr-2 sticky top-20">
            <nav className="space-y-8">
              {sidebarItems.map((section) => (
                <div key={section.href} className="space-y-3">
                  <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-900">
                    <Link 
                      href={section.href}
                      className={pathname === section.href ? 'text-blue-600' : ''}
                    >
                      {section.title}
                    </Link>
                  </h3>
                  {section.items && (
                    <ul className="space-y-2">
                      {section.items.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className={`block text-sm ${
                              pathname === item.href
                                ? 'font-medium text-blue-600'
                                : 'text-gray-600 hover:text-gray-900'
                            }`}
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>

        {/* Mobile sidebar */}
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div 
              className="fixed inset-0 bg-gray-600 bg-opacity-75"
              onClick={() => setIsMobileSidebarOpen(false)}
            />
            <div className="fixed inset-y-0 left-0 flex w-full max-w-xs flex-col bg-white shadow-lg">
              <div className="h-full overflow-y-auto py-6 px-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Documentation</h2>
                  <button
                    type="button"
                    className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-600"
                    onClick={() => setIsMobileSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <nav className="mt-6 space-y-6">
                  {sidebarItems.map((section) => (
                    <div key={section.href} className="space-y-3">
                      <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-900">
                        <Link 
                          href={section.href}
                          className={pathname === section.href ? 'text-blue-600' : ''}
                          onClick={() => setIsMobileSidebarOpen(false)}
                        >
                          {section.title}
                        </Link>
                      </h3>
                      {section.items && (
                        <ul className="space-y-2">
                          {section.items.map((item) => (
                            <li key={item.href}>
                              <Link
                                href={item.href}
                                className={`block text-sm ${
                                  pathname === item.href
                                    ? 'font-medium text-blue-600'
                                    : 'text-gray-600 hover:text-gray-900'
                                }`}
                                onClick={() => setIsMobileSidebarOpen(false)}
                              >
                                {item.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        )}

        {/* Main content */}
        <div className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
} 