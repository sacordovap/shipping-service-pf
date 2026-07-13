import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "@/common/layouts/main-layout";
import { ProtectedRoute } from "@/features/auth/components/protected-route";
import { AdminUserListPage } from "@/features/auth/pages/list/user-list-page";
import { RegisterCustomer } from "@/app/page/customer/register/register-customer";
import { AuthLogin } from "@/app/page/auth/auth-login";
import { AuthRegister } from "@/app/page/auth/register/auth-register";
import { UnauthtorizedRoute } from "@/app/page/auth/unauthorized";
import { ListCustomer } from "@/app/page/customer/list-customer/list-customer";
import { ShippingList } from "@/app/page/shipping/list-shipping/shipping-list";
import { ShippingDetail } from "@/app/page/shipping/shipping/shipping-detail-page";
import { ShippingDashboard } from "@/app/page/shipping/dashboard/shipping-dashboard";
import { ShippingRegister } from "@/app/page/shipping/register/shipping-register";
import { ShippingTracking } from "@/app/page/shipping/tracking/shipping-tracking";
import { ShippingOwnerList } from "@/app/page/shipping/list-shipping/shipping-list-owner";
import { ShippingPaged } from "@/app/page/shipping/list-shipping/shipping-paged";
import { LandingPage } from "@/app/page/landing/landing-page";
import { Redirect } from "@/app/page/auth/redirect/redirect";

export const router = createBrowserRouter([
  { path: "/", Component: LandingPage },
  { path: "/login", Component: AuthLogin },
  { path: "/auth-redirect", Component: Redirect },
  { path: "/register", Component: AuthRegister },
  { path: "/unauthorized", Component: UnauthtorizedRoute },
  { path: "/tracking", Component: ShippingTracking },

  {
    path: "/shipping",
    element: <ProtectedRoute allowedRoles={["ADMIN", "OPERADOR", "CLIENTE"]} />,
    children: [
      {
        element: <MainLayout />,
        children: [
          //TODOS MIS ROL

          { path: "detail/:id", Component: ShippingDetail },
          { path: "my-shippings", Component: ShippingOwnerList },
          { path: "reg-shipping", Component: ShippingRegister },
          { path: "tracking", Component: ShippingTracking },

          //OPE Y ADMIN
          {
            element: <ProtectedRoute allowedRoles={["ADMIN", "OPERADOR"]} />,
            children: [
              { path: "dashboard", Component: ShippingDashboard },
              { path: "reg-customer", Component: RegisterCustomer },
              { path: "list-customers", Component: ListCustomer },
              { path: "shipping-list", Component: ShippingList },
              { path: "shipping-paged", Component: ShippingPaged },
            ],
          },

          //SOLO ADMIN
          {
            element: <ProtectedRoute allowedRoles={["ADMIN"]} />,
            children: [
              { path: "list-users", Component: AdminUserListPage },
              { path: "register", Component: AuthRegister },
              // { path: "list-customers", Component: ListCustomer },
            ],
          },
        ],
      },
    ],
  },
]);
