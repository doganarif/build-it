import { Toaster as SonnerToaster } from 'sonner';

export function Toaster() {
  return (
    <SonnerToaster
      position="bottom-right"
      toastOptions={{
        duration: 5000,
        style: {
          background: 'white',
          border: '1px solid #E2E8F0',
          color: 'black',
          borderRadius: '0.5rem',
        },
        className: 'shadow-lg',
      }}
    />
  );
} 