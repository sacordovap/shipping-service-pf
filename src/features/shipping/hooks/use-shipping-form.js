import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { shippingSchema } from "@/features/shipping/schema/shipping-schema";
import { shippingService } from "@/features/shipping/services/shipping-service";

export const useShippingForm = () => {
  const [isSaving, setIsSaving] = useState(false);

  const methods = useForm({
    resolver: zodResolver(shippingSchema),
    mode: "onChange",
    defaultValues: { categoryIds: [] },
  });

  const onSubmit = async (data) => {
    setIsSaving(true);
    try {
      await shippingService.create(data);
      methods.reset();
      alert("¡Envío registrado con éxito!");
    } catch (error) {
      console.log(error);
      const serverMessage = error?.message || "Ocurrió un error";
      methods.setError("error", { message: serverMessage });
      alert(serverMessage);
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  return { methods, onSubmit, isSaving };
};
