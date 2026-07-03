export const SHIPPING_STATUS = {
  REGISTRADO: {
    label: "Registrado",
    style: "bg-slate-100 text-slate-700 border-slate-200",
    isTerminal: false,
  },
  EN_TRANSITO: {
    label: "En tránsito",
    style: "bg-amber-100 text-amber-700 border-amber-200",
    isTerminal: false,
  },
  EN_SUCURSAL: {
    label: "En sucursal",
    style: "bg-blue-100 text-blue-700 border-blue-200",
    isTerminal: false,
  },
  EN_RUTA_ENTREGA: {
    label: "En ruta",
    style: "bg-sky-100 text-sky-700 border-sky-200",
    isTerminal: false,
  },
  ENTREGADO: {
    label: "Entregado",
    style: "bg-emerald-100 text-emerald-700 border-emerald-200",
    isTerminal: true,
  },
  REBOTADO: {
    label: "Rebotado",
    style: "bg-orange-100 text-orange-700 border-orange-200",
    isTerminal: true,
  },
  ELIMINADO: {
    label: "Eliminado",
    style: "bg-rose-100 text-rose-700 border-rose-200",
    isTerminal: true,
  },
};

export const NORMAL_FLOW = [
  "REGISTRADO",
  "EN_TRANSITO",
  "EN_SUCURSAL",
  "EN_RUTA_ENTREGA",
  "ENTREGADO",
];
export const SPECIAL_STATES = {
  REBOTADO: "REBOTADO",
  ELIMINADO: "ELIMINADO",
};

export const SHIPPING_ORDER = [
  "REGISTRADO",
  "EN_TRANSITO",
  "EN_SUCURSAL",
  "EN_RUTA_ENTREGA",
  "ENTREGADO",
  "REBOTADO",
  "ELIMINADO",
];

export const ALLOWED_TRANSITIONS = {
  REGISTRADO: ["EN_TRANSITO", "ELIMINADO"],
  EN_TRANSITO: ["EN_SUCURSAL", "ELIMINADO"],
  EN_SUCURSAL: ["EN_RUTA_ENTREGA", "ELIMINADO"],
  EN_RUTA_ENTREGA: ["ENTREGADO", "REBOTADO", "ELIMINADO"],
  REBOTADO: ["EN_TRANSITO", "ELIMINADO"],
  ENTREGADO: [],
  ELIMINADO: [],
};
