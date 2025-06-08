import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      authToken: null,
      
      login: (token) => set({ isAuthenticated: true, authToken: token }),
      logout: () => set({ isAuthenticated: false, authToken: null }),
      
      currentBooking: null,
      
      setCurrentBooking: (booking) => set({ currentBooking: booking }),
      clearCurrentBooking: () => set({ currentBooking: null }),
    }),
    {
      name: 'flight-booking-storage',
      partialize: (state) => ({ 
        isAuthenticated: state.isAuthenticated,
        authToken: state.authToken 
      }),
    }
  )
) 