import { usePermissions } from "@/hooks/use-pemission";

export const ShippingActions = ({ shipping }) => {
  const { isAdmin, isOperator } = usePermissions();

  return (
    <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
      <h3 className="font-bold text-slate-800">Acciones</h3>

      {isAdmin && (
        <button className="w-full bg-slate-800 text-white py-2 rounded-lg hover:bg-slate-900">
          Editar Envío
        </button>
      )}

      {(isAdmin || isOperator) && (
        <button className="w-full bg-sky-600 text-white py-2 rounded-lg hover:bg-sky-700">
          Cambiar Estado
        </button>
      )}

      {isAdmin && (
        <button className="w-full text-slate-600 border py-2 rounded-lg hover:bg-slate-50">
          Ver Historial
        </button>
      )}
    </div>
  );
};
