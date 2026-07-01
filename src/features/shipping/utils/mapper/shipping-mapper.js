export const mapShippingToList = (data) => ({
  id: data.id,
  tracking: data.trackingNumber,
  sender: { name: data.remitente, dni: data.dniRemitente },
  receiver: { name: data.destinatario, dni: data.dniDestinatario },
  description: data.description,
  origin: data.originBranch,
  destination: data.destinationBranch,
  route: `${data.originBranch} ➔ ${data.destinationBranch}`,
  weight: `${data.weight} kg`,
  declaredValue: `S/ ${data.declaredValue.toFixed(2)}`,
  cost: data.shippingCost.toFixed(2),
  categories: data.categories || [],
  status: data.currentState,
  date: new Date(data.createdAt).toLocaleDateString(),
});

export const mapShippingList = (list) => list.map(mapShippingToList);
