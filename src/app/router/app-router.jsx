import { createBrowserRouter } from "react-router-dom";
import { Auth } from "../page/auth/auth";
import { Register } from "../page/auth/register/auth";
import { MainLayout } from "@/common/layouts/main-layout";
import { ProtectedRoute } from "@/features/auth/components/protected-route";
import { AdminUserListPage } from "@/features/auth/pages/list/user-list-page";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Auth,
  },
  {
    path: "/register",
    Component: Register,
  },

  // RUTAS PROTEGIDAS DE ADMIN (Layout dedicado)
  {
    path: "/admin",
    element: <ProtectedRoute allowedRoles={["ADMIN"]} />, // Wrapper que verifica rol
    Component: MainLayout,
    children: [
      { path: "list-users", Component: AdminUserListPage },
      { path: "products", Component: AdminUserListPage },
      { path: "dashboard", Component: AdminUserListPage },
    ],
  },
]);
