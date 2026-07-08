import { FormProvider } from "react-hook-form";
import { Info, Shield, User } from "lucide-react";
import { useEffect } from "react";
import { useRegisterForm } from "@/features/auth/hooks/use-register-form";
import { Input } from "@/common/components/input/input";
import { Button } from "@/common/components/button/button";
import { useAuthStore } from "@/features/auth/store/auth-store";

export const AuthRegisterDrawer = ({ isOpen, onClose, onSuccess }) => {
  const { methods, onSubmit, isSaving } = useRegisterForm();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const { role: currentUserRole } = useAuthStore();
  const isAdmin = currentUserRole === "ADMIN";

  // Lógica de cierre con tecla Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleFormSubmit = async (data) => {
    await onSubmit(data);
    onSuccess?.();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-800 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleClose}
      />
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-lg bg-white shadow-2xl transform transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-6 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-bold text-slate-800">
                Nuevo Usuario
              </h2>
              <p className="text-sm text-slate-500">
                Completa los datos del sistema.
              </p>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 flex flex-col">
            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(handleFormSubmit)}
                className="space-y-6"
              >
                <section className="space-y-4">
                  <h3 className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <Info size={12} /> Info Básica
                  </h3>
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
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    register={register}
                    error={errors.email?.message}
                  />
                </section>

                <section className="space-y-4">
                  <h3 className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <Shield size={12} /> Seguridad
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Contraseña"
                      name="password"
                      type="password"
                      register={register}
                      error={errors.password?.message}
                    />
                    <Input
                      label="Confirmar"
                      name="confirmPassword"
                      type="password"
                      register={register}
                      error={errors.confirmPassword?.message}
                    />
                  </div>

                  {isAdmin && (
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-slate-400 uppercase">
                        Rol del Sistema
                      </label>
                      <select
                        {...register("role")}
                        className="w-full p-3 rounded-lg border border-slate-200 bg-transparent focus:ring-2 focus:ring-slate-900 outline-none"
                      >
                        <option value="CLIENTE">Cliente</option>
                        <option value="OPERADOR">Operador</option>
                        <option value="ADMIN">Administrador</option>
                      </select>
                    </div>
                  )}
                </section>
              </form>
            </FormProvider>
          </div>

          <div className="p-6 border-t-2 bg-white">
            <Button
              onClick={handleSubmit(handleFormSubmit)}
              disabled={isSaving}
            >
              {isSaving ? "Guardando..." : "Registrar Usuario"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
