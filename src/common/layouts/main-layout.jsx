import { Outlet } from "react-router-dom";
import { useSidebar } from "@/hooks/use-sidebar";
import { Sidebar } from "../components/sidebar/sidebar";
import { Navbar } from "../components/navbar/navbar";
import { SidebarWrapper } from "../components/sidebar/sidebar-wrp";

export const MainLayout = () => {
  const { isSidebarOpen, toggleSidebar, closeSidebar } = useSidebar();

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-50">
      <SidebarWrapper isOpen={isSidebarOpen} onClose={closeSidebar}>
        <Sidebar onClose={closeSidebar} />
      </SidebarWrapper>

      <div className="flex-1 flex flex-col h-full overflow-y-auto">
        <Navbar onToggle={toggleSidebar} />
        <main className="p-3">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
