import { HistoryModal } from "@/features/shipping/components/modals/history-modal";
import { useShippingHistory } from "@/features/shipping/hooks/use-shipping-history";
import { usePermissions } from "@/hooks/use-pemission";
import { useState } from "react";

export const ShippingActions = ({ shipping }) => {
  console.log(shipping.tracking);
  const { isAdmin, isOperator } = usePermissions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    isLoading,
    history,
    error,
    refetch: fetchHistory,
  } = useShippingHistory();
  const handleOpenHistory = async () => {
    await fetchHistory(shipping.tracking);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
        <h3 className="font-bold text-slate-800">Acciones</h3>

        {isAdmin && (
          <button
            onClick={() => console.log("EDITAR")}
            className="w-full bg-slate-800 text-white py-2 rounded-lg hover:bg-slate-900"
          >
            Editar Envío
          </button>
        )}

        {(isAdmin || isOperator) && (
          <button
            onClick={() => console.log("ESTADO")}
            className="w-full bg-sky-600 text-white py-2 rounded-lg hover:bg-sky-700"
          >
            Cambiar Estado
          </button>
        )}

        {isAdmin && (
          <button
            onClick={handleOpenHistory}
            className="w-full text-slate-600 border py-2 rounded-lg hover:bg-slate-50"
          >
            Ver Historial
          </button>
        )}
      </div>
      <HistoryModal
        isOpen={isModalOpen}
        isLoading={isLoading}
        error={error}
        onClose={() => setIsModalOpen(false)}
        history={history}
      />
    </>
  );
};
