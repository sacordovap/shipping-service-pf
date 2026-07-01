import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      role: null,
      email: null,
      isAuthenticated: false,
      token: null,

      setAuth: (userData) => {
        const decoded = jwtDecode(userData.token);
        // localStorage.setItem("token", userData.token);
        set({
          user: decoded.username,
          role: decoded.role,
          email: decoded.sub,
          isAuthenticated: true,
          token: userData.token,
        });
      },

      logout: () => {
        // localStorage.removeItem("token");
        set({
          user: null,
          role: null,
          email: null,
          isAuthenticated: false,
          token: null,
        });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ token: state.token }),
      onRehydrateStorage: () => (state) => {
        if (state?.token) {
          try {
            const decoded = jwtDecode(state.token);
            state.user = decoded.username;
            state.role = decoded.role;
            state.email = decoded.sub;
            state.isAuthenticated = true;
          } catch (e) {
            // localStorage.removeItem("token");
            state.logout();
          }
        }
      },
    },
  ),
);
