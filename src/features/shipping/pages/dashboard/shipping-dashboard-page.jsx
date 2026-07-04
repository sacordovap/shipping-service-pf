import { StatusStatCard } from "@/features/shipping/components/cards/status-dashboard-card";
import { CriticalShippingsList } from "@/features/shipping/components/info/critical-shippings-list";
import {
  SHIPPING_ORDER,
  SHIPPING_STATUS,
} from "@/features/shipping/constants/status/shipping-status";
import { useDashboardStats } from "@/features/shipping/hooks/use-dashboard-stats";
import { Map as MapIcon, Radio } from "lucide-react";

import L from "leaflet";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { VehicleMap } from "@/features/shipping/components/map/vehicle-map";
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

export function ShippingDashboardPage() {
  const { stats, total, isLoading } = useDashboardStats();

  if (isLoading) return <div className="p-10 text-center">Cargando...</div>;

  return (
    <div className="p-6 md:p-8 space-y-8 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Operaciones</h1>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase font-bold text-slate-400">
            Total Envíos
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
            />
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-slate-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col relative min-h-96">
          <div className="p-6 flex justify-between items-center z-10">
            <h3 className="text-white font-bold flex items-center gap-2">
              <MapIcon className="w-5 h-5 text-blue-400" /> Monitoreo en Tiempo Real
            </h3>
            <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
              <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
              <span className="text-emerald-400 text-[10px] font-bold uppercase">
                Online
              </span>
            </div>
          </div>

          <div className="flex-1 w-full h-full z-0">
            <VehicleMap
              vehicles={[
                { id: 1, position: [-16.4, -71.53] },
                { id: 2, position: [-16.41, -71.55] },
              ]}
            />
          </div>
        </div>

        <CriticalShippingsList />
      </div>
    </div>
  );
}
