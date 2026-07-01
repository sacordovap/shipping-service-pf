const statusConfig = {
  REGISTRADO: "bg-slate-100 text-slate-700 border-slate-200",
  EN_TRANSITO: "bg-amber-100 text-amber-700 border-amber-200",
  EN_SUCURSAL: "bg-blue-100 text-blue-700 border-blue-200",
  EN_RUTA_ENTREGA: "bg-sky-100 text-sky-700 border-sky-200",
  ENTREGADO: "bg-emerald-100 text-emerald-700 border-emerald-200",
  REBOTADO: "bg-orange-100 text-orange-700 border-orange-200",
  ELIMINADO: "bg-rose-100 text-rose-700 border-rose-200",
};

export function StatusBadge({ status }) {
  const styles =
    statusConfig[status] || "bg-gray-100 text-gray-600 border-gray-200";

  return (
    <span
      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${styles}`}
    >
      {status}
    </span>
  );
}
