import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth-store";
import { authService } from "../../services/auth-service";
import { Input } from "@/common/components/input/input";
import { Button } from "@/common/components/button/button";

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
      navigate(userData.role === "ADMIN" ? "/admin/users" : "/shipping");
    } catch (error) {
      console.error("Error completo:", error);
      alert("Error al iniciar sesión");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Correo" name="email" register={register} required />
        <Input
          label="Contraseña"
          name="password"
          type="password"
          register={register}
          required
        />
        <Button type="submit">Entrar</Button>
      </form>
    </div>
  );
};
