export const createUISlice = (set) => ({
  // UI state
  isNavOpen: false,
  setNavOpen: (isOpen) => set({ isNavOpen: isOpen }),
  toggleNav: () => set((state) => ({ isNavOpen: !state.isNavOpen })),
  
  // Theme state
  theme: 'light',
  setTheme: (theme) => set({ theme }),
  toggleTheme: () => set((state) => ({ 
    theme: state.theme === 'light' ? 'dark' : 'light' 
  })),
}); 