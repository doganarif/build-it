'use client';

import { useEffect } from 'react';
import { useStore } from '@/lib/store/index.js';
import { toast } from 'sonner';

export function NotificationsProvider() {
  const { notifications, removeNotification } = useStore();

  // Listen for new notifications and display them
  useEffect(() => {
    if (notifications.length > 0) {
      // Get the latest notification
      const latestNotification = notifications[notifications.length - 1];
      
      // Display toast based on notification type
      switch(latestNotification.type) {
        case 'success':
          toast.success(latestNotification.title, {
            description: latestNotification.message,
            onDismiss: () => removeNotification(latestNotification.id)
          });
          break;
        case 'error':
          toast.error(latestNotification.title, {
            description: latestNotification.message,
            onDismiss: () => removeNotification(latestNotification.id)
          });
          break;
        case 'warning':
          toast.warning(latestNotification.title, {
            description: latestNotification.message,
            onDismiss: () => removeNotification(latestNotification.id)
          });
          break;
        case 'info':
        default:
          toast.info(latestNotification.title, {
            description: latestNotification.message,
            onDismiss: () => removeNotification(latestNotification.id)
          });
          break;
      }
    }
  }, [notifications, removeNotification]);

  // This is a UI-less component
  return null;
} 