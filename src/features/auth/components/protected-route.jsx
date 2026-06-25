import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/features/auth/store/auth-store";

export const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, role } = useAuthStore();
  console.log("mi estado" + isAuthenticated);
  if (!isAuthenticated) return <Navigate to="/login" />;

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};
