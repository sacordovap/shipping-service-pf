import { FormProvider } from "react-hook-form";
import { useLoginForm } from "@/features/auth/hooks/use-login-form";
import { Input } from "@/common/components/input/input";
import { Button } from "@/common/components/button/button";
import { AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { methods, onSubmit, isLoading } = useLoginForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;
  const handleFormSubmit = async (data) => {
    try {
      await onSubmit(data);
      navigate("/shipping/dashboard");
    } catch (error) {}
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            Bienvenido de nuevo
          </h1>
          <p className="text-slate-500">
            Ingresa tus credenciales para continuar
          </p>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            {errors.error && (
              <div className="flex items-center gap-2 p-3 bg-rose-50 text-rose-600 text-sm rounded-lg">
                <AlertCircle size={16} /> {errors.error.message}
              </div>
            )}

            <Input
              label="Correo"
              name="email"
            />
            <Input
              label="Contraseña"
              name="password"
              type="password"
            />

            <Button type="submit" className="w-full mt-4" disabled={isLoading}>
              {isLoading ? "Autenticando..." : "Iniciar Sesión"}
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};
