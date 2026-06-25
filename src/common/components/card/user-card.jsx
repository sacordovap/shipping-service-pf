import { RoleBadge } from "../../../features/auth/components/badge/badge";

export const UserCard = ({ user }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm border border-border mb-3 space-y-2">
    <div className="flex justify-between items-start">
      <h3 className="font-bold text-lg">{user.nombre}</h3>
      <span
        className={`px-2 py-1 rounded text-xs font-semibold ${user.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
      >
        {user.active ? "Activo" : "Inactivo"}
      </span>
    </div>
    <p className="text-sm text-gray-600 font-mono">{user.username}</p>
    <p className="text-sm text-gray-600">{user.email}</p>
    <div className="pt-2 border-t mt-2">
      
      <span className="text-xs uppercase text-gray-400 font-bold">Rol: </span>
      <RoleBadge role={user.role} />
    </div>
  </div>
);
