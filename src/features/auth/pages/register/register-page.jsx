import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/common/components/input/input";
import { Button } from "@/common/components/button/button";
import { authService } from "../../services/auth-service";
import { useAuthStore } from "../../store/auth-store";
import { registerSchema } from "../../schemas/login-schema";

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
      alert("Usuario registrado con éxito");
    } catch (error) {
      alert("Error al registrar: " + (error.message || "Intenta de nuevo"));
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-8 bg-white shadow-xl rounded-xl border border-border">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-sidebar">Nuevo Usuario</h2>
        <p className="text-text-main mt-2">
          Completa los datos para crear una nueva cuenta.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
  );
};
