import { FormProvider } from "react-hook-form";
import { Trash2, Plus } from "lucide-react";
import { useCustomerForm } from "@/features/customer/hooks/use-customer-form";
import { Input } from "@/common/components/input/input";
import { Button } from "@/common/components/button/button";

export const CustomerRegisterPage = () => {
  const { methods, fields, append, remove, onSubmit, isSaving } =
    useCustomerForm();

  if (!methods) return null;

  const { errors } = methods.formState;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-sm border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        Registrar Cliente
      </h2>

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit, (errors) =>
            console.log("Errores de validación", errors),
          )}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="DNI"
              name="dni"
              register={methods.register}
              error={errors.dni?.message}
            />
            <Input
              label="Teléfono"
              name="phoneNumber"
              register={methods.register}
              error={errors.phoneNumber?.message}
            />
          </div>

          <Input
            label="Email"
            name="email"
            register={methods.register}
            error={errors.email?.message}
          />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-700">
              Direcciones
            </h3>
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
                  <Trash2 size={18} />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Input
                    label="Calle"
                    name={`addresses.${index}.street`}
                    register={methods.register}
                    error={errors.addresses?.[index]?.street?.message}
                  />
                  <Input
                    label="Ciudad"
                    name={`addresses.${index}.city`}
                    register={methods.register}
                    error={errors.addresses?.[index]?.city?.message}
                  />
                  <Input
                    label="Departamento"
                    name={`addresses.${index}.department`}
                    register={methods.register}
                    error={errors.addresses?.[index]?.department?.message}
                  />
                </div>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={() => append({ street: "", city: "", department: "" })}
              className="flex items-center gap-2"
            >
              + Añadir dirección
            </Button>
          </div>

          <Button type="submit" disabled={isSaving} className="w-full">
            {isSaving ? "Guardando..." : "Registrar Cliente"}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};
