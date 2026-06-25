export function RoleBadge({ role }) {
  const styles = {
    ADMIN: "bg-purple-100 text-purple-700",
    OPERADOR: "bg-blue-100 text-blue-700",
    CLIENTE: "bg-slate-100 text-slate-700",
  };

  return (
    <span
      className={`px-2 py-1 rounded-md text-xs font-semibold ${styles[role] || styles.CLIENTE}`}
    >
      {role}
    </span>
  );
}
