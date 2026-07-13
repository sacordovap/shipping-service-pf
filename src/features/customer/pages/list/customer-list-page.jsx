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
    fetchCustomers
  } = useListCustomers();
  const { role } = useAuthStore();

  const handleSaveEdit = async (data) => {
    await handleEdit(editingCustomer.id, data);
    setEditingCustomer(null);
  };

  if (isLoading)
    return (
      <div className="p-8 text-center text-slate-500 animate-pulse">
        Cargando listado de clientes...
      </div>
    );
  if (error)
    return <div className="p-10 text-center text-rose-500">{error}</div>;

  return (
    <>
      <div className="max-w-8xl mx-auto p-6 md:p-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              Clientes
            </h2>
            <p className="text-slate-500 mt-1">
              Clientes registrados en el sistema
            </p>
          </div>

          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-medium shadow-md transition-all active:scale-[0.98]"
          >
            <Plus className="w-5 h-5" />
            <span>Nuevo Cliente</span>
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {customers.length === 0 ? (
            <div className="p-16 text-center text-slate-400">
              No se encontraron clientes registrados.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {customers.map((c) => (
                <div
                  key={c.id}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between p-5 hover:bg-slate-50/50 transition-all duration-200 gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center font-bold text-indigo-600">
                      {c.fullName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">
                        {c.fullName}
                      </p>
                      <div className="flex items-center gap-3 text-sm text-slate-500 mt-0.5">
                        <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-xs text-slate-600">
                          {c.dni}
                        </span>
                        <span>{c.email}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                    <StatusCustomer status={c.active} />

                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {role === "ADMIN" && (
                        <>
                          <button
                            onClick={() =>
                              !c.active
                                ? handleActivate(c.id)
                                : handleDelete(c.id)
                            }
                            className={`p-2 rounded-lg transition-colors ${!c.active ? "text-emerald-600 hover:bg-emerald-50" : "text-rose-600 hover:bg-rose-50"}`}
                            title={!c.active ? "Activar" : "Bloquear"}
                          >
                            {!c.active ? (
                              <UserRoundCog size={18} />
                            ) : (
                              <UserLock size={18} />
                            )}
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => setEditingCustomer(c)}
                        className="p-2 text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                        title="Editar"
                      >
                        <UserRoundPen size={18} />
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
      </div>
      <CustomerRegisterDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSuccess={() => {
          fetchCustomers();
          setIsDrawerOpen(false);
        }}
      />
    </>
  );
};
