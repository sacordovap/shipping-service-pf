import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authService } from "@/features/auth/services/auth-service";
import { registerSchema } from "@/features/auth/schemas/register-schema";

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
      alert("¡Envío registrado con éxito!");
    } catch (error) {
      const serverMessage = error.response?.data?.message || error.message;
      methods.setError("error", { message: serverMessage });
      alert(serverMessage);

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
