import { useState, useEffect, useCallback } from "react";
import { X, Search, MapPin, User, Package, Filter } from "lucide-react";

const DebouncedInput = ({
  label,
  icon: Icon,
  value,
  onChange,
  placeholder,
}) => {
  const [localValue, setLocalValue] = useState(value || "");

  useEffect(() => {
    setLocalValue(value || "");
  }, [value]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (localValue !== value) onChange(localValue);
    }, 700);
    return () => clearTimeout(handler);
  }, [localValue, onChange, value]);

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
        <input
          className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none transition-all shadow-sm"
          placeholder={placeholder}
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export const ShippingFilterBar = ({ filters, setFilters }) => {
  const updateFilter = useCallback(
    (newFilter) => setFilters(newFilter),
    [setFilters],
  );

  return (
    <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-200 mb-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4 text-slate-700">
        <Filter className="w-4 h-4" />
        <h3 className="font-bold text-sm">Filtros de búsqueda</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <DebouncedInput
          label="Tracking"
          icon={Search}
          placeholder="TRK-..."
          value={filters.term}
          onChange={(val) => updateFilter({ term: val })}
        />

        <DebouncedInput
          label="Nombre"
          icon={User}
          placeholder="Ej. Juan Perez"
          value={filters.name}
          onChange={(val) => updateFilter({ name: val })}
        />

        <DebouncedInput
          label="Sucursal"
          icon={MapPin}
          placeholder="Ej. Arequipa"
          value={filters.branch}
          onChange={(val) => updateFilter({ branch: val })}
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Estado
          </label>
          <select
            className="w-full p-2 text-sm bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-slate-900 shadow-sm"
            value={filters.state || ""}
            onChange={(e) => updateFilter({ state: e.target.value })}
          >
            <option value="">Todos los estados</option>
            {[
              "REGISTRADO",
              "EN_TRANSITO",
              "EN_SUCURSAL",
              "EN_RUTA_ENTREGA",
              "ENTREGADO",
              "ELIMINADO",
              "REBOTADO",
            ].map((s) => (
              <option key={s} value={s}>
                {s.replace("_", " ")}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Categoría
          </label>
          <select
            className="w-full p-2 text-sm bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-slate-900 shadow-sm"
            value={filters.category || ""}
            onChange={(e) => updateFilter({ category: e.target.value })}
          >
            <option value="">Todas las categorías</option>
            {["Documentos", "Electrónicos", "Frágil", "Vestimenta"].map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-slate-200 flex justify-end">
        <button
          onClick={() =>
            setFilters({
              term: "",
              state: "",
              category: "",
              name: "",
              branch: "",
              manual: false,
            })
          }
          className="flex items-center gap-2 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 rounded-xl transition-colors font-semibold"
        >
          <X className="w-4 h-4" /> Limpiar filtros
        </button>
      </div>
    </div>
  );
};
