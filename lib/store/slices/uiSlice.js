export const createUISlice = (set) => ({
  // UI state
  isNavOpen: false,
  setNavOpen: (isOpen) => set({ isNavOpen: isOpen }),
  toggleNav: () => set((state) => ({ isNavOpen: !state.isNavOpen })),
}); 