import { NavLink } from "react-router-dom";
import { LogOut, Package2, Users2Icon, LayoutDashboardIcon } from "lucide-react";
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
      path: "/admin/products",
      icon: <Package2 />,
      roles: ["ADMIN", "OPERADOR"],
    },
  ];

  return (
    <aside className="w-64 h-screen bg-sidebar text-white flex flex-col p-4">
      <h1 className="text-xl font-bold mb-8 px-2">Shipping Service</h1>

      <nav className="flex-1 space-y-2">
        {menuItems
          .filter((item) => item.roles.includes(role)) 
          .map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-primary text-white shadow-lg"
                    : "hover:bg-white/10"
                }`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
      </nav>

      <button
        onClick={logout}
        className="flex items-center gap-3 p-3 text-red-300 hover:text-red-100"
      >
        <LogOut size={20} /> Salir
      </button>
    </aside>
  );
};
