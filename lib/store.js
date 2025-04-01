import { create } from 'zustand';

export const useStore = create((set) => ({
  // User subscription state
  subscription: null,
  setSubscription: (subscription) => set({ subscription }),
  
  // UI state
  isNavOpen: false,
  setNavOpen: (isOpen) => set({ isNavOpen: isOpen }),
  toggleNav: () => set((state) => ({ isNavOpen: !state.isNavOpen })),
  
  // Notifications
  notifications: [],
  addNotification: (notification) =>
    set((state) => ({
      notifications: [...state.notifications, notification],
    })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
  clearNotifications: () => set({ notifications: [] }),
})); 