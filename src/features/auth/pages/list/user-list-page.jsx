import { RoleBadge } from "../../components/badge/badge";
import { StatusUser } from "../../components/badge/status-user";
import { useUsers } from "../../hooks/useUser";

export const AdminUserListPage = () => {
  const { users, loading, error, refetch } = useUsers();

  if (loading)
    return <div className="p-8 text-center">Cargando usuarios...</div>;
  if (error)
    return (
      <div className="p-8 text-center">
        <p className="text-red-500">{error}</p>
        <button onClick={refetch} className="mt-4 underline">
          Reintentar
        </button>
      </div>
    );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-sidebar">
        Gestión de Usuarios
      </h2>

      <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-border">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-border">
            <tr>
              <th className="p-4 font-semibold">Nombre</th>
              <th className="p-4 font-semibold">Username</th>
              <th className="p-4 font-semibold">Email</th>
              <th className="p-4 font-semibold">Rol</th>
              <th className="p-4 font-semibold">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {users.map((user) => (
              <tr
                key={user.username}
                className="hover:bg-slate-50 transition-colors"
              >
                <td className="p-4">{user.nombre}</td>
                <td className="p-4 font-mono text-sm">{user.username}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">
                  <RoleBadge role={user.role} />
                </td>
                <td className="p-4">
                  <StatusUser status={user.active} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
