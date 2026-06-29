import { useAuthStore } from "@/features/auth/store/auth-store";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

export const SessionChecker = ({ children }) => {
  const { logout } = useAuthStore();

  useEffect(() => {
    const checkSession = () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const decoded = jwtDecode(token);
      const isExpired = decoded.exp * 1000 < Date.now(); // JWT

      if (isExpired) {
        logout();
        window.location.href = "/login";
      }
    };

    checkSession();
    const interval = setInterval(checkSession, 60000);
    return () => clearInterval(interval);
  }, [logout]);

  return children;
};
