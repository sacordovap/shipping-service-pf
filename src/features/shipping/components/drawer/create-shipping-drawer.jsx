import { FormProvider } from "react-hook-form";
import { useShippingForm } from "@/features/shipping/hooks/use-shipping-form";
import { useCategories } from "@/features/shipping/hooks/use-categories";
import { Input } from "@/common/components/input/input";
import { Button } from "@/common/components/button/button";
import { useEffect } from "react";

export const CreateShippingDrawer = ({ isOpen, onClose, onSuccess }) => {
  const { categories, isLoading, error } = useCategories();
  const { methods, onSubmit, isSaving } = useShippingForm();

  const {
    watch,
    setValue, 
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const selectedCategories = watch("categoryIds") || [];
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

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
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-3xl bg-white shadow-2xl transform transition-transform duration-800 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-6 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Nuevo Envío</h2>
              <p className="text-sm text-slate-500">
                Completa los detalles para registrar.
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input label="DNI Remitente" name="dniRemitente" />
                  <Input label="DNI Destinatario" name="dniDestinatario" />
                  <div className="md:col-span-2">
                    <Input label="Origen" name="originBranch" />
                    <Input label="Destino" name="destinationBranch" />
                  </div>

                  <div className="md:col-span-1">
                    <Input label="Peso (kg)" name="weight" />
                    <Input label="Valor (S/.)" name="declaredValue" />
                  </div>

                  <div className="md:col-span-2">
                    <Input label="Descripción" name="description" />
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4">
                  <label className="block text-sm font-medium text-slate-700 mb-3">
                    Categorías
                  </label>
                  {isLoading ? (
                    <div className="text-sm text-slate-400 animate-pulse">
                      Cargando...
                    </div>
                  ) : error ? (
                    <div className="text-sm text-rose-500">{error}</div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          title={cat.description}
                          onClick={() => toggleCategory(cat.id)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                            selectedCategories.includes(cat.id)
                              ? "bg-blue-600 border-blue-600 text-white"
                              : "bg-white border-slate-300 text-slate-600 hover:border-blue-400"
                          }`}
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  )}
                  {errors.categoryIds && (
                    <p className="text-red-500 text-xs mt-2">
                      {errors.categoryIds.message}
                    </p>
                  )}
                </div>
              </form>
            </FormProvider>
          </div>
          <div className="p-6 border-t bg-white">
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
