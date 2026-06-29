import { create } from "zustand";
import { persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";
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
        console.log(userData);
        const decoded = jwtDecode(userData.token);
        localStorage.setItem("token", userData.token);
        set({
          user: decoded.username,
          role: decoded.role,
          email: decoded.sub,
          isAuthenticated: true,
        });
      },

      logout: () => {
        localStorage.removeItem("token");
        set({ user: null, role: null, email: null, isAuthenticated: false });
      },
    }),
    { name: "auth-storage" },
  ),
);
