import { StatusBadge } from "@/features/shipping/components/badge/status-badge";
import { TrackingBadge } from "@/features/shipping/components/badge/tracking-badge";
import { CreateShippingDrawer } from "@/features/shipping/components/drawer/create-shipping-drawer";
import { ShippingFilterBar } from "@/features/shipping/components/filter/shipping-filter-bar";
import { useListShippingsPaged } from "@/features/shipping/hooks/use-list-shipping-paged";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ShippingListPaged = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const {
    shippings,
    totalPages,
    currentPage,
    setCurrentPage,
    isLoading,
    error,
    filters,
    setFilters,
    refetch,
  } = useListShippingsPaged();
  const navigate = useNavigate();

  if (isLoading)
    return <div className="p-10 text-center">Cargando envíos...</div>;
  if (error)
    return <div className="p-10 text-center text-rose-500">{error}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800">
          Envíos Registrados
        </h2>
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-xl font-semibold hover:bg-slate-800"
        >
          <Plus className="w-5 h-5" /> Nuevo Envío
        </button>
      </div>

      <ShippingFilterBar filters={filters} setFilters={setFilters} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {(shippings || []).map((ship) => (
          <div
            key={ship?.id}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all cursor-pointer"
            onClick={() => navigate(`/shipping/detail/${ship.id}`)}
          >
            <div className="flex justify-between items-center mb-3">
              <TrackingBadge trackId={ship?.sender?.name || "N/A"} />
              <span className="text-[10px] text-slate-400 font-medium">
                {ship?.date}
              </span>
            </div>
            <h3 className="font-bold text-slate-800 text-lg mb-1">
              {ship?.tracking}
            </h3>
            <p className="text-sm text-slate-500 mb-4 truncate">
              {ship?.route}
            </p>
            <p className="text-sm text-slate-500 mb-4 truncate">
              {ship?.receiver.name}
            </p>
            <div className="border-t border-slate-100 pt-3 flex justify-between items-center">
              <span className="text-sm font-bold italic text-emerald-600">
                S/ {ship?.cost}
              </span>
              <StatusBadge status={ship?.status} />
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-10">
          <button
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-4 py-2 text-sm font-medium text-slate-600 transition-all bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Anterior
          </button>

          <div className="flex items-center justify-center w-12 h-10 text-sm font-bold text-slate-900 bg-slate-100 rounded-xl">
            {currentPage}
          </div>
          <span className="text-sm text-slate-400">/</span>
          <div className="flex items-center justify-center w-12 h-10 text-sm font-medium text-slate-500 bg-white border border-slate-200 rounded-xl">
            {totalPages}
          </div>

          <button
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-4 py-2 text-sm font-medium text-slate-600 transition-all bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Siguiente
          </button>
        </div>
      )}

      <CreateShippingDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSuccess={() => {
          refetch();
          setIsDrawerOpen(false);
        }}
      />
    </div>
  );
};
