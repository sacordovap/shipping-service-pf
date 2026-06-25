import { Outlet } from "react-router-dom";
import { useSidebar } from "@/hooks/use-sidebar";
import { Sidebar } from "../components/sidebar/sidebar";
import { Navbar } from "../components/navbar/navbar";
import { SidebarWrapper } from "../components/sidebar/sidebar-wrp";

export const MainLayout = () => {
  const { isSidebarOpen, toggleSidebar, closeSidebar } = useSidebar();

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarWrapper isOpen={isSidebarOpen} onClose={closeSidebar}>
        <Sidebar onClose={closeSidebar} />
      </SidebarWrapper>

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar onToggle={toggleSidebar} />
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
