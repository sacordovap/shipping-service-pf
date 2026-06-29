import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { LogOut, ChevronDown, ChevronUp } from "lucide-react";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { MENU_ITEMS } from "@/common/constants/menu/menu-items";

export const Sidebar = ({ onClose }) => {
  const { role, logout } = useAuthStore();
  const location = useLocation();

  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (menuName) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
      isActive
        ? "bg-[#0284c7] text-white shadow-lg shadow-[#0284c7]/20"
        : "hover:bg-white/5 hover:text-white"
    }`;

  return (
    <aside className="w-full h-screen bg-[#0f172a] text-slate-300 flex flex-col p-4 shadow-xl select-none">
      <h1 className="text-xl font-bold text-white mb-8 px-2 tracking-tight">
        Shipping Service
      </h1>

      <nav className="flex-1 space-y-1 overflow-y-auto pr-2 custom-scrollbar">
        {MENU_ITEMS.filter((item) => item.roles.includes(role)).map((item) => {
          const Icon = item.icon;
          const hasChildren = item.children && item.children.length > 0;
          const isOpen = !!openMenus[item.name];

          const allowedChildren = hasChildren
            ? item.children.filter((child) => child.roles.includes(role))
            : [];

          if (hasChildren && allowedChildren.length === 0) return null;

          if (!hasChildren) {
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={linkClass}
              >
                <span className="opacity-80">
                  <Icon size={20} />
                </span>
                <span className="font-medium">{item.name}</span>
              </NavLink>
            );
          }

          return (
            <div key={item.name} className="space-y-1">
              <button
                onClick={() => toggleMenu(item.name)}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 hover:text-white transition-all duration-200 text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="opacity-80">
                    <Icon size={20} />
                  </span>
                  <span className="font-medium">{item.name}</span>
                </div>
                {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {isOpen && (
                <div className="pl-6 space-y-1 border-l border-slate-700/50 ml-5 animate-in slide-in-from-top-1 duration-200">
                  {allowedChildren.map((child) => (
                    <NavLink
                      key={child.path}
                      to={child.path}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `flex items-center gap-3 p-2 text-sm rounded-lg transition-all ${
                          isActive
                            ? "text-white font-semibold"
                            : "text-slate-400 hover:text-white hover:bg-white/5"
                        }`
                      }
                    >
                      {child.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <button
        onClick={logout}
        className="flex items-center gap-3 p-3 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl transition-colors mt-auto"
      >
        <LogOut size={20} /> <span className="font-medium">Salir</span>
      </button>
    </aside>
  );
};
