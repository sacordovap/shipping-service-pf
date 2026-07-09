import { Button } from "@/common/components/button/button";
import {
  InfoGroup,
  InfoItem,
} from "@/features/shipping/components/info/tracking-info";
import { useTracking } from "@/features/shipping/hooks/use-tracking";
import { Scale3D, MapPinCheck, User, Package, Search } from "lucide-react";
import { useState } from "react";

export const ShippingTrackingPage = () => {
  const [code, setCode] = useState("");
  const { getTracking, data, isLoading, error } = useTracking();
  const isButtonDisabled = !code.trim() || isLoading;
  const handleSearch = () => {
    if (code.trim()) {
      getTracking(code);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 lg:p-12">
      <div className="max-w-lg mx-auto mb-12 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Rastrea tu envío
        </h1>
        <p className="text-slate-500 mb-6 text-sm">
          Ingresa tu número de guía para obtener el estado en tiempo real.
        </p>

        <div className="flex gap-2">
          <input
            required
            type="text"
            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-slate-900/10 focus:border-slate-900 outline-none transition-all"
            placeholder="Ej. TRK-999..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && !isButtonDisabled && handleSearch()
            }
          />
          <Button onClick={handleSearch} disabled={isLoading} className="px-6">
            {isLoading ? "Buscando..." : <Search className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {error && (
        <div className="max-w-xl mx-auto p-4 bg-rose-50 text-rose-600 rounded-xl mb-6 text-sm text-center">
          {error}
        </div>
      )}

      {data && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 p-6 md:p-10 animate-in fade-in slide-in-from-bottom-8">
          <div className="flex flex-col md:flex-row justify-between items-start mb-10 gap-6">
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                Guía de seguimiento
              </p>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900">
                {data.trackingNumber}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-bold uppercase border border-blue-100">
                {data.currentState.replace("_", " ")}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-8">
              <InfoGroup title="Información de Ruta">
                <InfoItem
                  icon={MapPinCheck}
                  label="Origen"
                  value={data.originBranch}
                />
                <InfoItem
                  icon={MapPinCheck}
                  label="Destino"
                  value={data.destinationBranch}
                />
              </InfoGroup>

              <InfoGroup title="Detalles del Paquete">
                <InfoItem
                  icon={Scale3D}
                  label="Peso"
                  value={`${data.weight} kg`}
                />
                <InfoItem
                  icon={Package}
                  label="Contenido"
                  value={data.description}
                />
              </InfoGroup>
            </div>

            <div className="space-y-8">
              <InfoGroup title="Información de Contacto">
                <InfoItem
                  icon={User}
                  label="Remitente"
                  value={data.remitente}
                />
                <InfoItem
                  icon={User}
                  label="Destinatario"
                  value={data.destinatario}
                />
              </InfoGroup>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase mb-4">
                  Resumen Financiero
                </p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-slate-600">Costo de Envío</span>
                  <span className="font-bold text-slate-900">
                    S/ {data.shippingCost.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center border-t border-slate-200 pt-4">
                  <span className="text-slate-600">Valor Declarado</span>
                  <span className="font-bold text-slate-900">
                    S/ {data.declaredValue.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
