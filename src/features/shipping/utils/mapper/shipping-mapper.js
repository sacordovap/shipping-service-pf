export const mapShippingToList = (data) => ({
  id: data.id,
  tracking: data.trackingNumber,
  sender: data.remitente,
  receiver: data.destinatario,
  route: `${data.originBranch} -> ${data.destinationBranch}`,
  cost: data.shippingCost.toFixed(2),
  status: data.currentState,
  date: new Date(data.createdAt).toLocaleDateString(),
});

export const mapShippingList = (list) => list.map(mapShippingToList);
