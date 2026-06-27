import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "@/common/layouts/main-layout";
import { ProtectedRoute } from "@/features/auth/components/protected-route";
import { AdminUserListPage } from "@/features/auth/pages/list/user-list-page";
import { RegisterCustomer } from "@/app/page/customer/register/register-customer";
import { AuthLogin } from "@/app/page/auth/auth-login";
import { AuthRegister } from "@/app/page/auth/register/auth-register";
import { ListUsers } from "@/app/page/auth/list-user/list-user";
import { UnauthtorizedRoute } from "@/app/page/auth/unauthorized";
import { ListCustomer } from "@/app/page/customer/list-customer/list-customer";

export const router = createBrowserRouter([
  { path: "/login", Component: AuthLogin },
  { path: "/register", Component: AuthRegister },
  { path: "/unauthorized", Component: UnauthtorizedRoute },

  {
    path: "/shipping",
    element: <ProtectedRoute allowedRoles={["ADMIN", "OPERADOR"]} />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { path: "dashboard", Component: AdminUserListPage },
          { path: "customer", Component: RegisterCustomer },
          {
            element: <ProtectedRoute allowedRoles={["ADMIN"]} />,
            children: [
              { path: "list-users", Component: ListUsers },
              { path: "register", Component: AuthRegister },
              { path: "list-customers", Component: ListCustomer },
            ],
          },
        ],
      },
    ],
  },
]);
