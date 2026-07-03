import { useCriticalShippings } from "@/features/shipping/hooks/use-critical-shipping";
import { AlertTriangle } from "lucide-react";

export const CriticalShippingsList = () => {
  const { data, isLoading } = useCriticalShippings();

  if (isLoading) return <div className="text-sm p-4">Cargando alertas...</div>;

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
      <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
        <AlertTriangle className="text-orange-500 w-5 h-5" /> Envíos Críticos
      </h3>
      <div className="space-y-3">
        {data.map((shipment) => (
          <div
            onClick={()=>{console.log(shipment.id)}}
            key={shipment.id}
            className="p-4 bg-orange-50 rounded-2xl border border-orange-100 hover:border-orange-200 transition-colors"
          >
            <p className="text-xs font-bold text-orange-800">
              {shipment.trackingNumber} - {shipment.state}
            </p>
            <p className="text-[10px] text-orange-600 mt-0.5">
              Ubicación: {shipment.location} • Requiere acción inmediata
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
