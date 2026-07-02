import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { shippingSchema } from "@/features/shipping/schema/shipping-schema";
import { shippingService } from "@/features/shipping/services/shipping-service";

export const useShippingForm = () => {
  const [isSaving, setIsSaving] = useState(false);

  const methods = useForm({
    resolver: zodResolver(shippingSchema),
    defaultValues: { categoryIds: [] },
  });

  const onSubmit = async (data) => {
    setIsSaving(true);
    try {
      await shippingService.create(data);
      methods.reset();
      alert("¡Envío registrado con éxito!");
    } catch (error) {
      methods.setError("error", { message: error.message });
      alert(error.response?.data?.message || "Ocurrió un error");
    } finally {
      setIsSaving(false);
    }
  };

  return { methods, onSubmit, isSaving };
};
