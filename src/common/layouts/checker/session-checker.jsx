import { useAuthStore } from "@/features/auth/store/auth-store";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

export const SessionChecker = ({ children }) => {
  const { logout } = useAuthStore();

  useEffect(() => {
    const checkSession = () => {
      const token = useAuthStore.getState().token;
      // const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const decoded = jwtDecode(token);
        const isExpired = decoded.exp * 1000 < Date.now();

        if (isExpired) {
          logout();
          window.location.href = "/";
        }
      } catch (error) {
        logout();
        window.location.href = "/";
      }
    };

    checkSession();
    const interval = setInterval(checkSession, 30000);
    return () => clearInterval(interval);
  }, [logout]);

  return children;
};
