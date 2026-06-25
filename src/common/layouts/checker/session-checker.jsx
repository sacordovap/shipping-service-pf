// src/components/auth/SessionChecker.jsx
import { useEffect } from "react";
import { useAuthStore } from "@/features/auth/store/auth-store";

export const SessionChecker = ({ children }) => {
  const { logout } = useAuthStore();

  useEffect(() => {
    const checkSession = () => {
      const loginTime = localStorage.getItem("loginTime");
      if (loginTime) {
        const hourInMs = 60 * 60 * 1000;
        if (Date.now() - parseInt(loginTime) > hourInMs) {
          logout();
          window.location.href = "/login";
        }
      }
    };
    const interval = setInterval(checkSession, 60000);
    return () => clearInterval(interval);
  }, [logout]);

  return children;
};
