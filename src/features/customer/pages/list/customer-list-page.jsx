import { useState } from "react";
import { Plus, UserRoundCog, UserLock, UserRoundPen } from "lucide-react";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { StatusCustomer } from "@/features/customer/components/badge/status-customer";
import { useListCustomers } from "@/features/customer/hooks/use-list-customer";
import { EditCustomerModal } from "@/features/customer/pages/list/modal-edit/edit-customer-modal";
import { CustomerRegisterDrawer } from "@/features/customer/components/drawer/customer-register-drawer";

export const CustomerListPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
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

  if (isLoading)
    return (
      <div className="p-8 text-center text-slate-500 animate-pulse">
        Cargando gestión de clientes...
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Clientes
          </h2>
          <p className="text-slate-500 mt-1">
            Gestiona y visualiza la base de datos de clientes registrados.
          </p>
        </div>

        <button
          onClick={() => setIsDrawerOpen(true)}
          className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl active:scale-95"
        >
          <Plus className="w-5 h-5" />
          <span>Nuevo Cliente</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {customers.length === 0 ? (
          <div className="p-20 text-center text-slate-400">
            No se encontraron clientes registrados.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {customers.map((c) => (
              <div
                key={c.id}
                className="group flex flex-col md:flex-row md:items-center p-5 hover:bg-slate-50/80 transition-colors gap-4"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 border border-slate-200">
                    {c.fullName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-lg">
                      {c.fullName}
                    </p>
                    <div className="flex items-center gap-3 text-sm text-slate-500">
                      <span>{c.dni}</span>
                      <span>•</span>
                      <span>{c.email}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6">
                  <StatusCustomer status={c.active} />

                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {role === "ADMIN" && !c.active && (
                      <button
                        onClick={() => handleActivate(c.id)}
                        className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                        title="Activar"
                      >
                        <UserRoundCog size={20} />
                      </button>
                    )}
                    {role === "ADMIN" && (
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Bloquear"
                      >
                        <UserLock size={20} />
                      </button>
                    )}
                    <button
                      onClick={() => setEditingCustomer(c)}
                      className="p-2 text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                      title="Editar"
                    >
                      <UserRoundPen size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {editingCustomer && (
        <EditCustomerModal
          customer={editingCustomer}
          onClose={() => setEditingCustomer(null)}
          onSave={handleSaveEdit}
        />
      )}

      <CustomerRegisterDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSuccess={() => {
          setIsDrawerOpen(false);
        }}
      />
    </div>
  );
};
