export const useDashboardStats = () => {
  //TODO: Implementar lógica en back y en front
  const data = {
    REGISTRADO: 120,
    EN_TRANSITO: 450,
    EN_SUCURSAL: 300,
    EN_RUTA_ENTREGA: 200,
    ENTREGADO: 150,
    REBOTADO: 18,
    ELIMINADO: 10,
  };

  const total = Object.values(data).reduce((a, b) => a + b, 0);

  return {
    stats: data,
    total,
    isLoading: false,
  };
};
