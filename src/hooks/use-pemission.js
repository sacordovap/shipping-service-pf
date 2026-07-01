import { useAuthStore } from "@/features/auth/store/auth-store";

export const usePermissions = () => {
  const { role } = useAuthStore();

  return {
    isAdmin: role === "ADMIN",
    isOperator: role === "OPERADOR",
    isCustomer: role === "CLIENTE",
    canEditAll: role === "ADMIN",
    canEditSpecific: role === "ADMIN" || role === "OPERADOR",
    canChangeStatus: role === "ADMIN" || role === "OPERADOR",
  };
};
