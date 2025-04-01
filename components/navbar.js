'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';

export function Navbar({ user }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
  };

  const navigationItems = [
    { name: 'Home', href: '/' },
    { name: 'Documentation', href: '/docs' },
    { name: 'Features', href: '/features' },
    { 
      name: 'Examples', 
      href: '#', 
      children: [
        { name: 'Email Service', href: '/features/email' },
        { name: 'Cron Jobs', href: '/features/cronjobs' },
        { name: 'AI Integration', href: '/ai-demo' },
        { name: 'Payment Processing', href: '/pricing' },
      ]
    },
    { name: 'Dashboard', href: '/dashboard', auth: true },
  ];

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <span className="text-xl font-semibold text-blue-600">BuildIt</span>
                <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">Next.js 15</span>
              </Link>
            </div>
            <div className="hidden sm:ml-10 sm:flex sm:space-x-6">
              {navigationItems.map((item) => {
                if (item.auth && !user) return null;
                
                const isActive = pathname === item.href || 
                  (item.children && item.children.some(child => pathname === child.href));
                
                if (!item.children) {
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                        isActive
                          ? 'border-blue-600 text-gray-900'
                          : 'border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-800'
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                } else {
                  // This would ideally be a dropdown, but for simplicity we're keeping it as links
                  return (
                    <div key={item.name} className="relative inline-block text-left pt-1">
                      <span className={`inline-flex items-center px-1 border-b-2 text-sm font-medium cursor-default ${
                        isActive
                          ? 'border-blue-600 text-gray-900'
                          : 'border-transparent text-gray-600'
                      }`}>
                        {item.name}
                      </span>
                    </div>
                  );
                }
              })}
            </div>
          </div>
          <div className="hidden sm:flex sm:items-center sm:ml-6">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">Hi, {user.name || user.email}</span>
                <Button variant="outline" size="sm" onClick={handleSignOut}>Sign out</Button>
              </div>
            ) : (
              <div className="space-x-3">
                <Link href="/auth/login">
                  <Button variant="outline" size="sm">Sign in</Button>
                </Link>
                <Link href="/auth/register">
                  <Button size="sm">Sign up</Button>
                </Link>
              </div>
            )}
          </div>
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden border-t border-gray-200">
          <div className="pt-2 pb-3 space-y-1">
            {navigationItems.map((item) => {
              if (item.auth && !user) return null;
              
              const isActive = pathname === item.href || 
                (item.children && item.children.some(child => pathname === child.href));
              
              return (
                <div key={item.name}>
                  {!item.children ? (
                    <Link
                      href={item.href}
                      className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                        isActive
                          ? 'bg-blue-50 border-blue-600 text-blue-700'
                          : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <>
                      <div className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                        isActive
                          ? 'bg-blue-50 border-blue-600 text-blue-700'
                          : 'border-transparent text-gray-600'
                      }`}>
                        {item.name}
                      </div>
                      <div className="pl-6 space-y-1">
                        {item.children.map(child => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className={`block pl-3 pr-4 py-2 border-l-4 text-sm font-medium ${
                              pathname === child.href
                                ? 'bg-blue-50 border-blue-400 text-blue-700'
                                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
                            }`}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200 bg-gray-50">
            {user ? (
              <div className="space-y-3 px-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">{user.name || user.email}</p>
                </div>
                <Button variant="outline" className="w-full" size="sm" onClick={handleSignOut}>
                  Sign out
                </Button>
              </div>
            ) : (
              <div className="space-y-3 px-4">
                <Link href="/auth/login">
                  <Button variant="outline" className="w-full" size="sm">Sign in</Button>
                </Link>
                <Link href="/auth/register">
                  <Button className="w-full" size="sm">Sign up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
} 