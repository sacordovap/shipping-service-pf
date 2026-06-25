import * as z from "zod";
/*Usando el formato de mi back*/
export const registerSchema = z
  .object({
    nombre: z.string().min(15, "Mínimo 15 caracteres"),
    email: z.string().email("Formato de correo inválido"),
    username: z.string().min(6, "Mínimo 6 caracteres"),
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .regex(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*/\-_\.]).{8,}$/,
        "Debe incluir mayúsculas, minúsculas, números y un carácter especial",
      ),
    confirmPassword: z.string().min(8, "Confirma tu contraseña"),
    role: z.enum(["ADMIN", "OPERADOR", "CLIENTE"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });
