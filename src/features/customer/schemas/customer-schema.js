import { z } from "zod";

export const customerSchema = z.object({
  dni: z
    .string()
    .min(1, "El DNI es requerido")
    .regex(/^\d+$/, "El DNI solo debe contener números")
    .length(8, "El DNI debe tener exactamente 8 dígitos"),
  email: z
    .string()
    .min(1, "El email es requerido")
    .email("Formato de email inválido"),
  phoneNumber: z.string().min(1, "El teléfono es requerido"),
  addresses: z
    .array(
      z.object({
        street: z.string().min(1, "La calle es requerida"),
        city: z.string().min(1, "La ciudad es requerida"),
        department: z.string().min(1, "El departamento es requerido"),
      }),
    )
    .min(1, "Debe ingresar al menos una dirección"),
});
