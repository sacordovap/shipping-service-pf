import { useState } from "react";

export const useSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return {
    isSidebarOpen,
    toggleSidebar: () => setIsSidebarOpen(!isSidebarOpen),
    closeSidebar: () => setIsSidebarOpen(false),
  };
};
