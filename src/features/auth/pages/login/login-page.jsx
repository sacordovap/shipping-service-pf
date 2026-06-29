import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Input } from "@/common/components/input/input";
import { Button } from "@/common/components/button/button";
import { authService } from "@/features/auth/services/auth-service";
import { useAuthStore } from "@/features/auth/store/auth-store";


export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    try {
      const userData = await authService.login(formData);
      setAuth(userData);
      navigate("/shipping/dashboard");
    } catch (error) {
      console.error("Error completo:", error);
      alert("Error al iniciar sesión");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Bienvenido</h1>
        <p className="text-slate-500 mb-8 text-sm">
          Ingresa tus credenciales para continuar.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <Input
            label="Correo"
            name="email"
            register={register}
            required
            error={"No se ingreso el correo"}
          />
          <Input
            label="Contraseña"
            name="password"
            type="password"
            register={register}
            required
            error={"No se ingreso la contraseña"}
          />
          <Button type="submit">Entrar</Button>
        </form>
      </div>
    </div>
  );
};
