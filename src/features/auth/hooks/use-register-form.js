import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authService } from "@/features/auth/services/auth-service";
import { registerSchema } from "@/features/auth/schemas/register-schema";
import toast from "react-stacked-toast";

export const useRegisterForm = () => {
  const [isSaving, setIsSaving] = useState(false);
  const methods = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      nombre: "",
      username: "",
      email: "",
      password: "",
      role: "CLIENTE",
    },
  });

  const onSubmit = async (data) => {
    setIsSaving(true);
    try {
      const { confirmPassword, ...payload } = data;
      await authService.register(payload);
      methods.reset();
      toast.success("Usuario registrado");
    } catch (error) {
      const serverMessage = error.message || "Información con errores";
      methods.setError("error", { message: serverMessage });
      toast.error(serverMessage);

      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  return {
    methods,
    onSubmit,
    isSaving,
  };
};
