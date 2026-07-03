import { FormProvider } from "react-hook-form";
import { useShippingForm } from "@/features/shipping/hooks/use-shipping-form";
import { useCategories } from "@/features/shipping/hooks/use-categories";
import { Input } from "@/common/components/input/input";
import { Button } from "@/common/components/button/button";
import { useEffect } from "react";

export const CreateShippingModal = ({ isOpen, onClose, onSuccess }) => {
  const { categories, isLoading, error } = useCategories();
  const { methods, onSubmit, isSaving } = useShippingForm();

  if (!isOpen) return null;

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = methods;
  const selectedCategories = watch("categoryIds") || [];

  const toggleCategory = (id) => {
    const isSelected = selectedCategories.includes(id);
    const next = isSelected
      ? selectedCategories.filter((c) => c !== id)
      : [...selectedCategories, id];
    setValue("categoryIds", next, { shouldValidate: true });
  };

  const handleFormSubmit = async (data) => {
    await onSubmit(data);
    onSuccess?.();
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`bg-white p-6 rounded-2xl w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto transition-transform duration-300 ${
          isOpen ? "scale-100" : "scale-95"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Nuevo Envío</h2>
            <p className="text-sm text-slate-500">
              Completa los detalles para registrar.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 font-bold text-xl"
          >
            ✕
          </button>
        </div>

        {isLoading ? (
          <div className="p-10 text-center">Cargando categorías...</div>
        ) : error ? (
          <div className="p-10 text-center text-rose-500">{error}</div>
        ) : (
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="space-y-6"
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
                    Categorías
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => toggleCategory(cat.id)}
                        className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                          selectedCategories.includes(cat.id)
                            ? "bg-blue-600 border-blue-600 text-white"
                            : "bg-white border-slate-300 text-slate-600 hover:border-blue-400"
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                  {errors.categoryIds && (
                    <p className="text-red-500 text-xs mt-2">
                      {errors.categoryIds.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <Button type="button" variant="ghost" onClick={onClose}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? "Guardando..." : "Registrar Envío"}
                </Button>
              </div>
            </form>
          </FormProvider>
        )}
      </div>
    </div>
  );
};
