import { Menu } from "lucide-react";

export const Navbar = ({ onToggle }) => (
  <header className="h-16 bg-white border-b border-slate-100 flex items-center px-4 md:px-8 justify-between sticky top-0 z-30">
    <button
      onClick={onToggle}
      className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors md:hidden"
    >
      <Menu size={24} />
    </button>

    <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
      Panel Main
    </div>
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-full bg-slate-200 border-2 border-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
        ADMIN
      </div>
    </div>
  </header>
);
