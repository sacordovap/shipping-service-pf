import { useParams } from "react-router-dom";
import { useShippingDetail } from "@/features/shipping/hooks/use-shipping-detail";
import { usePermissions } from "@/hooks/use-pemission";
import { StatusBadge } from "@/features/shipping/components/badge/status-badge";
import { ShippingActions } from "@/features/shipping/components/actions/shipping-actions";
import { Package, User, MapPin, DollarSign, Scale, Tag } from "lucide-react";

export const ShippingDetailPage = () => {
  const { id } = useParams();
  const { shipping, isLoading, error } = useShippingDetail(id);
  const { isAdmin, isOperator } = usePermissions();

  if (isLoading)
    return (
      <div className="p-10 text-center animate-pulse">Cargando detalles...</div>
    );
  if (error)
    return (
      <div className="p-10 text-center text-rose-500 font-bold">{error}</div>
    );

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex-1 justify-evenly items-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm ">
        <div>
          <p className="text-sm text-slate-400 font-medium">Envío N°</p>

          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {shipping.tracking}
          </h1>
        </div>
        <StatusBadge status={shipping.status} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-sky-600" /> Descripción del Envío
            </h3>
            <p className="text-slate-600 bg-slate-50 p-4 rounded-lg">
              {shipping.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-slate-400" />{" "}
                <span className="text-sm text-slate-500">Peso:</span>{" "}
                <span className="font-semibold">{shipping.weight}</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-slate-400" />{" "}
                <span className="text-sm text-slate-500">Cat:</span>{" "}
                <span className="font-semibold">
                  {shipping.categories.join(", ")}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h4 className="text-sm font-bold text-slate-400 uppercase mb-2">
                Remitente
              </h4>
              <p className="font-bold text-slate-800">
                {shipping.sender?.name || "Sin remitente"}
              </p>
              <p className="text-sm text-slate-500">
                DNI: {shipping.sender.dni}
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h4 className="text-sm font-bold text-slate-400 uppercase mb-2">
                Destinatario
              </h4>
              <p className="font-bold text-slate-800">
                {shipping.receiver?.name || "Sin remitente"}
              </p>
              <p className="text-sm text-slate-500">
                DNI: {shipping.receiver.dni}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-sky-600" /> Ruta
            </h3>
            <p className="font-semibold text-slate-700">
              {shipping.origin} ➔ {shipping.destination}
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <p className="text-sm text-slate-500">Costo Total</p>
              <p className="text-2xl font-black text-emerald-600">
                S/ {shipping.cost}
              </p>
            </div>
          </div>

          {(isAdmin || isOperator) && <ShippingActions shipping={shipping} />}
        </div>
      </div>
    </div>
  );
};
