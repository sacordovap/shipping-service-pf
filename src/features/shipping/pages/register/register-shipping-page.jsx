import { FormProvider } from "react-hook-form";
import { useShippingForm } from "@/features/shipping/hooks/use-shipping-form";
import { Input } from "@/common/components/input/input";
import { Button } from "@/common/components/button/button";
import { useCategories } from "@/features/shipping/hooks/use-categories";

// const categories = [
//   { id: "46a49012-feea-4095-9c22-d2b2b19923b1", name: "Electrónicos" },
//   { id: "b2a49012-feea-4095-9c22-d2b2b19923b2", name: "Documentos" },
// ];

export const RegisterShippingPage = () => {
  const { categories, isLoading, error } = useCategories();
  const { methods, onSubmit, isSaving } = useShippingForm();

  const { watch, setValue } = methods;
  const selectedCategories = watch("categoryIds") || [];

  const toggleCategory = (id) => {
    const isSelected = selectedCategories.includes(id);
    const next = isSelected
      ? selectedCategories.filter((c) => c !== id)
      : [...selectedCategories, id];

    setValue("categoryIds", next, { shouldValidate: true });
  };

  if (isLoading)
    return <div className="p-10 text-center">Cargando Categorias...</div>;
  if (error)
    return <div className="p-10 text-center text-rose-500">{error}</div>;
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Nuevo Envío</h1>
        <p className="text-slate-500 text-sm">
          Completa los detalles para registrar el paquete.
        </p>
      </div>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-2">
              <Input label="DNI Remitente" name="dniRemitente" />
            </div>
            <div className="md:col-span-2">
              <Input label="DNI Destinatario" name="dniDestinatario" />
            </div>

            <div className="md:col-span-2">
              <Input label="Origen" name="originBranch" />
            </div>
            <div className="md:col-span-2">
              <Input label="Destino" name="destinationBranch" />
            </div>

            <div className="md:col-span-1">
              <Input label="Peso (kg)" name="weight" />
            </div>
            <div className="md:col-span-1">
              <Input label="Valor (S/.)" name="declaredValue" />
            </div>

            <div className="md:col-span-4">
              <Input label="Descripción" name="description" />
            </div>
            <div className="md:col-span-4 border-t border-slate-100 pt-4">
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Categorías del paquete
              </label>
              <div className="flex flex-wrap gap-3">
                {categories.map((cat) => {
                  const isSelected = selectedCategories.includes(cat.id);
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => toggleCategory(cat.id)}
                      title={cat.description}
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                        isSelected
                          ? "bg-blue-600 border-blue-600 text-white"
                          : "bg-white border-slate-300 text-slate-600 hover:border-blue-400"
                      }`}
                    >
                      {cat.name}
                    </button>
                  );
                })}
              </div>
              {methods.formState.errors.categoryIds && (
                <p className="text-red-500 text-xs mt-2">
                  {methods.formState.errors.categoryIds.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <Button
              type="submit"
              disabled={isSaving}
              className="w-full md:w-auto"
            >
              {isSaving ? "Guardando..." : "Registrar Envío"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
