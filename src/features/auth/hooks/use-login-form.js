import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authService } from "@/features/auth/services/auth-service";
import { loginSchema } from "@/features/auth/schemas/login-schema";
import { useAuthStore } from "@/features/auth/store/auth-store";
import toast from "react-stacked-toast";

export const useLoginForm = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  const methods = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data) => {
    try {
      const userData = await authService.login(data);
      setAuth(userData);
      toast.success("Bienvenido al sistema");
    } catch (err) {
      const message = err.message || "Credenciales inválidas";
      methods.setError("error", { message });
      // toast.error(message);
      throw err;
    }
  };

  return { methods, onSubmit };
};
