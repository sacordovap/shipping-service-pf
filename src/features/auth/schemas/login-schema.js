import * as z from "zod";
/*Usando el formato de mi back*/
export const loginSchema = z.object({
  email: z.string().email("Correo electrónico inválido"),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*/\-_\.]).{8,}$/,
      "Debe incluir mayúsculas, minúsculas, números y un carácter especial",
    ),
});
