export const useCriticalShippings = () => {
  // TODO: Implementar lógica en back y en front
  const criticalShippings = [
    {
      id: 1,
      trackingNumber: "TRK-8829",
      state: "REBOTADO",
      location: "Arequipa",
    },
    { id: 2, trackingNumber: "TRK-7741", state: "REBOTADO", location: "Lima" },
    {
      id: 3,
      trackingNumber: "TRK-9902",
      state: "EN_RUTA_ENTREGA",
      location: "Cusco",
    },
  ];

  return {
    data: criticalShippings,
    isLoading: false,
  };
};
