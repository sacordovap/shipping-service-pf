import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      role: null,
      email: null,
      isAuthenticated: false,

      setAuth: (userData) => {
        if (!userData || !userData.token) {
          console.error("Error: userData está malformado", userData);
          return;
        }

        localStorage.setItem("token", userData.token);
        localStorage.setItem("loginTime", Date.now().toString());
        set({
          user: userData.username,
          role: userData.role,
          email: userData.email,
          isAuthenticated: true,
        });
      },

      logout: () => {
        localStorage.removeItem("token");
        set({ email:null, user: null, role: null, isAuthenticated: false });
        localStorage.removeItem("auth-storage")
        localStorage.removeItem("loginTime")
        
        
      },
    }),
    { name: "auth-storage" },
  ),
);
