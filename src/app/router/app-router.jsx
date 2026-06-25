import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "@/common/layouts/main-layout";
import { ProtectedRoute } from "@/features/auth/components/protected-route";
import { AdminUserListPage } from "@/features/auth/pages/list/user-list-page";
import { Register } from "../page/auth/register/auth";
import { Auth } from "../page/auth/auth";
import { UnauthtorizedRoute } from "../page/auth/unauthorized";

export const router = createBrowserRouter([
  { path: "/login", Component: Auth },
  { path: "/register", Component: Register },
  { path: "/unauthorized", Component: UnauthtorizedRoute },

  {
    path: "/admin",
    element: <ProtectedRoute allowedRoles={["ADMIN"]} />,
    children: [
      {
        element: <MainLayout />, 
        children: [
          { path: "list-users", Component: AdminUserListPage },
          { path: "dashboard", Component: AdminUserListPage },
          { path: "customer-service", Component: AdminUserListPage }, 
        ],
      },
    ],
  },
]);
