import { FormProvider } from "react-hook-form";
import { X, Trash2, MapPin, Info, Phone } from "lucide-react";
import { useCustomerForm } from "@/features/customer/hooks/use-customer-form";
import { Input } from "@/common/components/input/input";
import { Button } from "@/common/components/button/button";
import { useEffect } from "react";

export const CustomerRegisterDrawer = ({ isOpen, onClose, onSuccess }) => {
  const { methods, fields, append, remove, onSubmit, isSaving } =
    useCustomerForm();
 
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

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
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleClose}
      />
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-lg bg-white shadow-2xl transform transition-transform duration-800 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-6 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-bold text-slate-800">
                Nuevo cliente
              </h2>
              <p className="text-sm text-slate-500">
                Completa los campos para registrar.
              </p>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(handleFormSubmit)}
                className="space-y-6"
              >
                <section className="space-y-4">
                  <h3 className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <Info size={12} /> Info Básica
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="DNI"
                      name="dni"
                      register={register}
                      error={errors.dni?.message}
                    />
                    <Input
                      label="Teléfono"
                      name="phoneNumber"
                      register={register}
                      error={errors.phoneNumber?.message}
                    />
                  </div>
                  <Input
                    label="Email"
                    name="email"
                    register={register}
                    error={errors.email?.message}
                  />
                </section>

                <section className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      <MapPin size={12} /> Direcciones
                    </h3>
                  </div>

                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="p-4 border border-slate-200 rounded-xl bg-slate-50 relative animate-in fade-in"
                    >
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="absolute top-2 right-2 text-rose-500 hover:text-rose-700"
                      >
                        <Trash2 size={16} />
                      </button>
                      <div className="grid grid-cols-1 md:grid-rows-2 gap-3">
                        <Input
                          label="Calle"
                          name={`addresses.${index}.street`}
                          register={register}
                          error={errors.addresses?.[index]?.street?.message}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <Input
                            label="Ciudad"
                            name={`addresses.${index}.city`}
                            register={register}
                            error={errors.addresses?.[index]?.city?.message}
                          />
                          <Input
                            label="Depto"
                            name={`addresses.${index}.department`}
                            register={register}
                            error={
                              errors.addresses?.[index]?.department?.message
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      append({ street: "", city: "", department: "" })
                    }
                    className="w-full flex items-center justify-center gap-2"
                  >
                    + Añadir dirección
                  </Button>
                </section>
              </form>
            </FormProvider>
          </div>

          <div className="p-6 bg-white">
            <Button
              onClick={handleSubmit(handleFormSubmit)}
              disabled={isSaving}
              className="w-full"
            >
              {isSaving ? "Guardando..." : "Registrar Cliente"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
