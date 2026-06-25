export function StatusUser({ status}) {
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-bold ${status ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
    >
      {status ? "Activo" : "Inactivo"}
    </span>
  );
}
