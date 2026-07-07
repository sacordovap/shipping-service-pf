import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { AuthRegisterDrawer } from "@/features/auth/components/drawer/auth-register-drawer";
import { useUsers } from "@/features/auth/hooks/useUser";
import { UserCard } from "@/common/components/card/user-card";
import { StatusUser } from "@/features/auth/components/badge/status-user";
import { RoleBadge } from "@/features/auth/components/badge/badge";

export const AdminUserListPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { users, loading, error, refetch } = useUsers();

  if (error)
    return <div className="p-10 text-center text-rose-500">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
            Usuarios
          </h2>
          <p className="text-slate-500 text-sm">
            Gestiona los accesos y roles del sistema.
          </p>
        </div>
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-semibold transition-all active:scale-95 shadow-lg"
        >
          <Plus className="w-5 h-5" /> <span>Nuevo Usuario</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400">
            Cargando usuarios...
          </div>
        ) : users.length === 0 ? (
          <div className="p-16 text-center text-slate-400">
            No se encontraron usuarios registrados.
          </div>
        ) : (
          <>
            <div className="md:hidden divide-y divide-slate-100">
              {users.map((user) => (
                <div key={user.username} className="p-4 hover:bg-slate-50">
                  <UserCard user={user} />
                </div>
              ))}
            </div>

            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="p-5">Nombre</th>
                    <th className="p-5">Username</th>
                    <th className="p-5">Email</th>
                    <th className="p-5">Rol</th>
                    <th className="p-5">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.map((user) => (
                    <tr
                      key={user.username}
                      className="hover:bg-slate-50/80 transition-colors"
                    >
                      <td className="p-5 font-medium text-slate-900">
                        {user.nombre}
                      </td>
                      <td className="p-5 font-mono text-sm text-slate-500">
                        {user.username}
                      </td>
                      <td className="p-5 text-slate-600">{user.email}</td>
                      <td className="p-5">
                        <RoleBadge role={user.role} />
                      </td>
                      <td className="p-5">
                        <StatusUser status={user.active} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      <AuthRegisterDrawer
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
