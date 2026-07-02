import { z } from "zod";

export const shippingSchema = z.object({
  dniRemitente: z.string().min(8, "DNI remitente inválido"),
  dniDestinatario: z.string().min(8, "DNI destinatario inválido"),
  originBranch: z.string().min(4, "Campo de origen requerido"),
  destinationBranch: z.string().min(4, "Campo de destino requerido"),
  description: z.string().min(10, "Necesitas describir con más detalle el paquete"),
  weight: z.coerce.number().positive("Peso debe ser mayor a 0"),
  declaredValue: z.coerce.number().positive("Valor debe ser mayor a 0"),
  categoryIds: z.array(z.string()).min(1, "Selecciona al menos una categoría"),
});
