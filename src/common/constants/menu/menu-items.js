import {
  LayoutDashboardIcon,
  Users2Icon,
  Package2,
  UserCheck,
} from "lucide-react";

export const MENU_ITEMS = [
  {
    name: "Dashboard",
    path: "/shipping/dashboard",
    icon: LayoutDashboardIcon,
    roles: ["ADMIN", "OPERADOR", "CLIENTE"],
  },
  {
    name: "Tracking",
    path: "/shipping/tracking",
    icon: LayoutDashboardIcon,
    roles: ["ADMIN", "OPERADOR", "CLIENTE"],
  },
  {
    name: "Usuarios",
    icon: UserCheck,
    roles: ["ADMIN"],
    children: [
      {
        name: "Lista de Usuarios",
        path: "/shipping/list-users",
        roles: ["ADMIN"],
      },
      // {
      //   name: "Registrar Usuario",
      //   path: "/shipping/register",
      //   roles: ["ADMIN"],
      // },
    ],
  },
  {
    name: "Clientes",
    icon: Users2Icon,
    roles: ["ADMIN", "OPERADOR"],
    children: [
      // {
      //   name: "Registrar Cliente",
      //   path: "/shipping/reg-customer",
      //   roles: ["ADMIN"],
      // },
      {
        name: "Lista de clientes",
        path: "/shipping/list-customers",
        roles: ["ADMIN", "OPERADOR"],
      },
    ],
  },
  {
    name: "Envios",
    icon: Package2,
    roles: ["ADMIN", "OPERADOR", "CLIENTE"],
    children: [
      // {
      //   name: "Registrar un Envío",
      //   path: "/shipping/reg-shipping",
      //   roles: ["ADMIN", "OPERADOR", "CLIENTE"],
      // },
      {
        name: "Mis Envíos",
        path: "/shipping/my-shippings",
        roles: ["ADMIN", "OPERADOR"],
      },
      {
        name: "Envíos realizados",
        path: "/shipping/shipping-paged",
        roles: ["ADMIN", "OPERADOR"],
      },
      {
        name: "Todos los envíos",
        path: "/shipping/shipping-list",
        roles: ["ADMIN", "OPERADOR"],
      },
    ],
  },
];
