import { useState } from "react";
import { Edit, ListRestart, Trash2, UserLock, UserRoundCog, UserRoundPen } from "lucide-react";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { StatusCustomer } from "@/features/customer/components/badge/status-customer";
import { useListCustomers } from "@/features/customer/hooks/use-list-customer";
import { EditCustomerModal } from "@/features/customer/pages/list/modal-edit/edit-customer-modal";

export const CustomerListPage = () => {
  const [editingCustomer, setEditingCustomer] = useState(null);

  const {
    customers,
    isLoading,
    error,
    handleEdit,
    handleActivate,
    handleDelete,
  } = useListCustomers();
  const { role } = useAuthStore();

  const handleSaveEdit = async (data) => {
    await handleEdit(editingCustomer.id, data);
    setEditingCustomer(null);
  };

  if (isLoading) {
    return <div className="p-6">Cargando clientes...</div>;
  }
  if (error)
    return (
      <div className="p-8 text-center">
        <p className="text-red-500">{error}</p>
        Ocurrio un error
      </div>
    );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Clientes Registrados</h2>

      <div className="space-y-4">
        {customers.map((c) => (
          <div
            key={c.id}
            className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 transition-hover hover:shadow-md"
          >
            <div className="flex-1">
              <p className="font-bold text-slate-800 text-lg">{c.fullName}</p>
              <p className="text-sm text-slate-500">{c.dni}</p>
              <p className="text-sm text-slate-500">{c.email}</p>
              <StatusCustomer status={c.active} />
            </div>
            <div className="flex items-center gap-2">
              {role === "ADMIN" && !c.active && (
                <button
                  onClick={() => handleActivate(c.id)}
                  className="p-2 text-yellow-500 hover:bg-rose-50 rounded-lg"
                >
                  <UserRoundCog size={30} />
                </button>
              )}
              {role === "ADMIN" && (
                <button
                  onClick={() => handleDelete(c.id)}
                  className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg"
                >
                  <UserLock size={30} />
                </button>
              )}
              <button
                onClick={() => setEditingCustomer(c)}
                className="p-2 text-sky-600 hover:bg-sky-50 rounded-lg"
              >
                <UserRoundPen size={30} />
              </button>
            </div>
          </div>
        ))}
      </div>
      {editingCustomer && (
        <EditCustomerModal
          customer={editingCustomer}
          onClose={() => setEditingCustomer(null)}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
};
