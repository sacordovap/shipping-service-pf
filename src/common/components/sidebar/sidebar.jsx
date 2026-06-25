import { NavLink } from "react-router-dom";
import {
  LogOut,
  Package2,
  Users2Icon,
  LayoutDashboardIcon,
} from "lucide-react";
import { useAuthStore } from "@/features/auth/store/auth-store";

export const Sidebar = ({ onClose }) => {
  const { role, logout } = useAuthStore();
  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <LayoutDashboardIcon />,
      roles: ["ADMIN", "OPERADOR", "CLIENTE"],
    },
    {
      name: "Usuarios",
      path: "/admin/list-users",
      icon: <Users2Icon />,
      roles: ["ADMIN"],
    },
    {
      name: "Inventario",
      path: "/register",
      icon: <Package2 />,
      roles: ["ADMIN", "OPERADOR"],
    },
  ];

  return (
    <aside className="w-64 h-screen bg-[#0f172a] text-slate-300 flex flex-col p-4 shadow-xl">
      <h1 className="text-xl font-bold text-white mb-8 px-2 tracking-tight">
        Shipping Service
      </h1>

      <nav className="flex-1 space-y-1">
        {menuItems
          .filter((item) => item.roles.includes(role))
          .map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-[#0284c7] text-white shadow-lg shadow-[#0284c7]/20"
                    : "hover:bg-white/5 hover:text-white"
                }`
              }
            >
              {/* Aumentamos un poco el tamaño del icono */}
              <span className="opacity-80">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </NavLink>
          ))}
      </nav>

      <button
        onClick={logout}
        className="flex items-center gap-3 p-3 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl transition-colors"
      >
        <LogOut size={20} /> <span className="font-medium">Salir</span>
      </button>
    </aside>
  );
};
