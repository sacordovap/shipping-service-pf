import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/common/components/input/input";
import { Button } from "@/common/components/button/button";
import { registerSchema } from "@/features/auth/schemas/register-schema";
import { authService } from "@/features/auth/services/auth-service";
import { useAuthStore } from "@/features/auth/store/auth-store";
import toast from "react-stacked-toast";

export const RegisterPage = () => {
  const { role: currentUserRole } = useAuthStore();
  const isAdmin = currentUserRole === "ADMIN";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "CLIENTE",
    },
  });

  const onSubmit = async (data) => {
    const { confirmPassword, ...dataToSubmit } = data;

    try {
      await authService.register(dataToSubmit);
      toast.success("Usuario registrado con exito");
      navigate("/login");
    } catch (error) {
      toast.error(
        "Error al registrar: " + (error.message || "Intenta de nuevo"),
      );
    }
  };

  return (
    <div className=" min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          Nuevo Usuario
        </h1>
        <p className="text-slate-500 mb-8 text-sm">
          Completa los datos para crear una nueva cuenta.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nombre Completo"
              name="nombre"
              register={register}
              error={errors.nombre?.message}
            />
            <Input
              label="Username"
              name="username"
              register={register}
              error={errors.username?.message}
            />
          </div>

          <Input
            label="Correo Electrónico"
            name="email"
            type="email"
            register={register}
            error={errors.email?.message}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Contraseña"
              name="password"
              type="password"
              register={register}
              error={errors.password?.message}
            />
            <Input
              label="Confirmar Contraseña"
              name="confirmPassword"
              type="password"
              register={register}
              error={errors.confirmPassword?.message}
            />
          </div>

          {isAdmin && (
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-text-main">
                Rol del Sistema
              </label>
              <select
                {...register("role")}
                className="w-full p-3 rounded-lg border border-border bg-transparent focus:ring-2 focus:ring-primary outline-none"
              >
                <option value="CLIENTE">Cliente</option>
                <option value="OPERADOR">Operador</option>
                <option value="ADMIN">Administrador</option>
              </select>
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary-hover transition-colors text-white py-3 rounded-lg font-bold"
          >
            {isSubmitting ? "Registrando..." : "Crear Usuario"}
          </Button>
        </form>
      </div>
    </div>
  );
};
