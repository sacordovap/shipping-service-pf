import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Sidebar } from "../components/sidebar/sidebar";

export const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="relative min-h-screen flex bg-gray-50">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:relative md:translate-x-0`}
      >
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>
      <main className="flex-1 flex flex-col min-w-0">
        <div className="p-4 md:hidden">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 bg-slate-900 text-white rounded-md"
          >{isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
