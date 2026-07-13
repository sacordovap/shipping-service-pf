import {
  ALLOWED_TRANSITIONS,
  SHIPPING_STATUS,
} from "@/features/shipping/constants/status/shipping-status";
import { usePermissions } from "@/hooks/use-pemission";
import { useForm } from "react-hook-form";

export const StatusModal = ({ isOpen, onClose, onConfirm, currentStatus }) => {
  const { isAdmin, isOperator } = usePermissions();
  const { register, handleSubmit } = useForm();
  const validNextStates = ALLOWED_TRANSITIONS[currentStatus] || [];

  if (!isOpen || !currentStatus) return null;

  const filteredStates = isAdmin
    ? validNextStates
    : validNextStates.filter((state) => state !== "ELIMINADO");

  const handleFormSubmit = async (data) => {
    await onConfirm(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-xl border border-slate-100 overflow-hidden relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors p-2"
        >
          ✕
        </button>

        <div className="p-6">
          <h3 className="font-bold text-lg text-slate-800 mb-1">
            Cambiar Estado
          </h3>
          <p className="text-sm text-slate-500 mb-6">
            Estado actual:{" "}
            <span className="font-semibold">
              {SHIPPING_STATUS[currentStatus]?.label}
            </span>
          </p>

          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <select
              {...register("newState", { required: true })}
              className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
            >
              <option value="" className="text-sm font-bold">
                Seleccione el nuevo estado...
              </option>
              {filteredStates.map((state) => (
                <option
                  key={state}
                  value={state}
                  className={
                    state === "ELIMINADO"
                      ? "text-sm text-rose-600 font-bold"
                      : "text-sm font-bold text-slate-700"
                  }
                >
                  {state === "ELIMINADO"
                    ? "⚠️ Eliminar envío"
                    : SHIPPING_STATUS[state].label}
                </option>
              ))}
            </select>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2 text-slate-600 font-medium hover:bg-slate-50 rounded-xl transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 bg-slate-900 text-white py-2 rounded-xl font-bold hover:bg-slate-800 transition"
              >
                Confirmar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
