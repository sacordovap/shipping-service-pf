import { useAuthStore } from "@/features/auth/store/auth-store";
import { Menu } from "lucide-react";

export const Navbar = ({ onToggle }) => {
  const { user, role } = useAuthStore();

  return (
    <header className="h-20 bg-[#0f172a] border-b border-slate-200 flex items-center px-4 md:px-8 justify-between sticky top-0 z-30">
      <button
        onClick={onToggle}
        className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors md:hidden"
      >
        <Menu size={24} />
      </button>

      <div className="text-sm font-semibold text-slate-50 uppercase tracking-wider ml-0 md:ml-0">
        Panel Main
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-bold text-slate-50">
            {user || "Usuario"}
          </p>
          <p className="text-xs text-slate-50 font-medium">{role}</p>
        </div>

        <div className="w-10 h-10 rounded-full bg-sky-100 border-2 border-sky-200 flex items-center justify-center text-xs font-bold text-sky-700">
          {role ? role.substring(0, 2) : "GUEST"}
        </div>
      </div>
    </header>
  );
};
