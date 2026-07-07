import { useForm, useFieldArray } from "react-hook-form";
import { useCustomer } from "@/features/customer/hooks/use-customer";
import { customerSchema } from "@/features/customer/schemas/customer-schema";
import { customerService } from "@/features/customer/services/customer-service";
import { zodResolver } from "@hookform/resolvers/zod";

export const useCustomerForm = () => {
  const { execute: createCustomer, isLoading: isSaving } = useCustomer(
    customerService.create,
  );
 
  const methods = useForm({
    resolver: zodResolver(customerSchema),
    mode: "onChange",
    defaultValues: {
      dni: "",
      email: "",
      phoneNumber: "",
      addresses: [{ street: "", city: "", department: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: "addresses",
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      await createCustomer(data);
      methods.reset();
      alert("¡Cliente registrado con éxito!");
    } catch (error) {
      methods.setError("error", { message: error.message });
      alert(error.message);
    }
  };

  return {
    methods,
    fields,
    append,
    remove,
    onSubmit,
    isSaving,
  };
};
