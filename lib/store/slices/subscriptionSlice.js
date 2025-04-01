export const createSubscriptionSlice = (set) => ({
  // User subscription state
  subscription: null,
  setSubscription: (subscription) => set({ subscription }),
  clearSubscription: () => set({ subscription: null }),
}); 