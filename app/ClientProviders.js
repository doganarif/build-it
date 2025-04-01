'use client';

import { Toaster } from 'sonner';
import { NotificationsProvider } from '@/components/NotificationsProvider.jsx';

export function ClientProviders({ children }) {
  return (
    <>
      {children}
      <NotificationsProvider />
      <Toaster richColors closeButton position="top-right" />
    </>
  );
} 