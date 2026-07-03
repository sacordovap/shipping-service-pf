import { HistoryModal } from "@/features/shipping/components/modals/history-modal";
import { StatusModal } from "@/features/shipping/components/modals/status-modal";
import { useShippingHistory } from "@/features/shipping/hooks/use-shipping-history";
import { useUpdateStatus } from "@/features/shipping/hooks/use-update-status";
import { usePermissions } from "@/hooks/use-pemission";
import { useState } from "react";

export const ShippingActions = ({ shipping, onDetailUpdate }) => {
  const { isAdmin, isOperator } = usePermissions();

  const [activeModal, setActiveModal] = useState(null);

  const { isLoading, history, error, refetch } = useShippingHistory();
  const { updateStatus } = useUpdateStatus(shipping.id);

  const handleOpenHistory = async () => {
    setActiveModal("history");
    await refetch(shipping.tracking);
  };

  const handleConfirmStatus = async (data) => {
    try {
      await updateStatus(data);
      alert("Estado actualizado exitosamente");
      if (onDetailUpdate) {
        await onDetailUpdate();
      }
    } catch (err) {
      alert(err.message);
    }
    setActiveModal(null);
  };

  return (
    <>
      <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
        <h3 className="font-bold text-slate-800">Acciones</h3>

        {/*TODO: Habilitar edición de envío solo para admin y cuando el estado sea REGISTRADO 
        /* {isAdmin && shipping.status === "REGISTRADO" && (
          <button
            onClick={() => console.log("EDITAR")}
            className="w-full bg-slate-800 text-white py-2 rounded-lg hover:bg-slate-900"
          >
            Editar Envío
          </button>
        )} */}

        {(isAdmin || isOperator) && shipping.status !== "ENTREGADO" && (
          <button
            onClick={() => setActiveModal("status")}
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
        isOpen={activeModal === "history"}
        isLoading={isLoading}
        error={error}
        onClose={() => setActiveModal(null)}
        history={history}
      />
      <StatusModal
        isOpen={activeModal === "status"}
        onClose={() => setActiveModal(null)}
        onConfirm={handleConfirmStatus}
        currentStatus={shipping.status}
      />
    </>
  );
};
