import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePermissions } from "@/hooks/use-pemission";

export const AuthRedirect = () => {
  const navigate = useNavigate();
  const { isAdmin, isOperator } = usePermissions();

  useEffect(() => {
    if (isAdmin || isOperator) {
      navigate("/shipping/dashboard", { replace: true });
    } else {
      navigate("/shipping/tracking", { replace: true });
    }
  }, [isAdmin, isOperator, navigate]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p>Cargando sesión...</p>
    </div>
  );
};
