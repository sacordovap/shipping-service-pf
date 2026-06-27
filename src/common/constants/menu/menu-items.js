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
    name: "Usuarios",
    icon: UserCheck,
    roles: ["ADMIN"],
    children: [
      {
        name: "Lista de Usuarios",
        path: "/shipping/list-users",
        roles: ["ADMIN"],
      },
      {
        name: "Registrar Usuario",
        path: "/shipping/register",
        roles: ["ADMIN"],
      },
    ],
  },
  {
    name: "Clientes",
    icon: Users2Icon,
    roles: ["ADMIN", "OPERADOR"],
    children: [
      {
        name: "Registrar Cliente",
        path: "/shipping/customer",
        roles: ["ADMIN", "OPERADOR"],
      },
      {
        name: "Lista de clientes",
        path: "/shipping/list-customers",
        roles: ["ADMIN"],
      },
    ],
  },
  {
    name: "Inventario",
    path: "/register",
    icon: Package2,
    roles: ["ADMIN", "OPERADOR"],
  },
];
