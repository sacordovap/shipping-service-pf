import { StatusStatCard } from "@/features/shipping/components/cards/status-dashboard-card";
import { CriticalShippingsList } from "@/features/shipping/components/info/critical-shippings-list";
import {
  SHIPPING_ORDER,
  SHIPPING_STATUS,
} from "@/features/shipping/constants/status/shipping-status";
import { useDashboardStats } from "@/features/shipping/hooks/use-dashboard-stats";
import { Package, Map, AlertTriangle } from "lucide-react";

export function ShippingDashboardPage() {
  const { stats, total, isLoading } = useDashboardStats();

  if (isLoading) return <div className="p-10 text-center">Cargando...</div>;

  return (
    <div className="p-6 md:p-8 space-y-8 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Operaciones</h1>
          <p className="text-slate-500">Resumen del sistema.</p>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase font-bold text-slate-400">
            TOTAL DE ENVIOS
          </p>
          <h2 className="text-3xl font-black text-slate-900">{total}</h2>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {SHIPPING_ORDER.map((key) => {
          const config = SHIPPING_STATUS[key];
          if (!config) return null;

          return (
            <StatusStatCard
              key={key}
              label={config.label}
              value={stats[key] || 0}
              style={config.style}
              onClick={() => console.log(key)}
            />
          );
        })}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-slate-900 p-8 rounded-3xl shadow-2xl flex flex-col items-center justify-center min-h-96 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/e0/Peru_location_map.svg')] bg-center bg-no-repeat bg-contain" />
          <div className="relative z-10 text-center">
            <Map className="w-12 h-12 text-blue-400 mb-4 mx-auto" />
            <h3 className="text-white font-bold text-lg">Monitoreo de Flota</h3>
            <div className="mt-6 grid grid-cols-3 gap-4">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="w-20 h-20 rounded-full border border-blue-500/30 flex items-center justify-center animate-pulse text-blue-300 text-[10px]"
                >
                  Nodo {n}
                </div>
              ))}
            </div>
          </div>
        </div>

        <CriticalShippingsList />
      </div>
    </div>
  );
}
