import * as z from "zod";
/*Usando el formato de mi back*/
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "El correo es obligatorio")
    .email("Correo electrónico inválido"),
  password: z.string().min(1, "La contraseña es obligatoria"),
});
