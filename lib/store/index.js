import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { createSubscriptionSlice } from './slices/subscriptionSlice';
import { createUISlice } from './slices/uiSlice';
import { createNotificationsSlice } from './slices/notificationsSlice';
import { createTodoSlice } from './slices/todoSlice';

export const useStore = create(
  persist(
    (...a) => ({
      ...createSubscriptionSlice(...a),
      ...createUISlice(...a),
      ...createNotificationsSlice(...a),
      ...createTodoSlice(...a),
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // Only persist specific states to localStorage
        subscription: state.subscription,
        todos: state.todos,
      }),
    }
  )
); 