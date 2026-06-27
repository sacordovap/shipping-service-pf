import { FormProvider, useForm, useFieldArray } from "react-hook-form";
import { Trash2, Plus } from "lucide-react";
import { Input } from "@/common/components/input/input";
import { Button } from "@/common/components/button/button";
import { customerSchema } from "@/features/customer/schemas/customer-schema";
import { zodResolver } from "@hookform/resolvers/zod";

export const EditCustomerModal = ({ customer, onClose, onSave }) => {
  const methods = useForm({
    defaultValues: customer,
    resolver: zodResolver(customerSchema),
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: "addresses",
  });

  const { errors } = methods.formState;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl p-6 shadow-xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-6 text-slate-800">
          Editar Cliente
        </h2>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSave)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="DNI"
                name="dni"
                register={methods.register}
                error={errors.dni?.message}
                disabled
              />
              <Input
                label="Email"
                name="email"
                register={methods.register}
                error={errors.email?.message}
                disabled
              />
            </div>

            <Input
              label="Teléfono"
              name="phoneNumber"
              register={methods.register}
              error={errors.phoneNumber?.message}
            />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-700">
                Direcciones
              </h3>
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="p-4 border border-slate-200 rounded-xl bg-slate-50 relative"
                >
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="absolute top-2 right-2 text-rose-500 hover:text-rose-700"
                  >
                    <Trash2 size={25} />
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
                className="w-full flex items-center justify-center gap-2"
              >
                + Añadir dirección
              </Button>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="w-full"
              >
                Cancelar
              </Button>
              <Button type="submit" className="w-full">
                Guardar Cambios
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};
