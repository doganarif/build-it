export const createNotificationsSlice = (set) => ({
  // Notifications
  notifications: [],
  addNotification: (notification) =>
    set((state) => ({
      notifications: [...state.notifications, {
        id: Date.now().toString(),
        timestamp: new Date(),
        ...notification
      }]
    })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id)
    })),
  clearNotifications: () => set({ notifications: [] })
}); 