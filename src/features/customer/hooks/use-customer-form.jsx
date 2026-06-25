import { useForm, useFieldArray } from "react-hook-form";
import { customerService } from "../services/customer-service";
import { useCustomer } from "@/features/customer/hooks/use-customer";

export const useCustomerForm = () => {
  const { execute: createCustomer, isLoading: isSaving } = useCustomer(
    customerService.create,
  );

  const methods = useForm({
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
    try {
      await createCustomer(data);
      methods.reset();
    } catch (error) {
      methods.setError("email", { message: error.message });
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
