'use client';

import { Toaster } from 'sonner';
import { NotificationsProvider } from '@/components/NotificationsProvider.jsx';
import { useStore } from '@/lib/store/index.js';

export function ClientProviders({ children }) {
  const { theme } = useStore();
  
  return (
    <>
      {children}
      <NotificationsProvider />
      <Toaster theme={theme} richColors closeButton position="top-right" />
    </>
  );
} 