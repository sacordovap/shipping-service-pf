export const HistoryModal = ({
  isLoading,
  error,
  isOpen,
  onClose,
  history,
}) => {
  if (!isOpen) return null;
  if (isLoading)
    return <div className="p-10 text-center">Cargando Historial ...</div>;
  if (error)
    return <div className="p-10 text-center text-rose-500">{error}</div>;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-lg text-slate-800">
            Historial de Envío
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 font-bold"
          >
            ✕
          </button>
        </div>

        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <div className="space-y-6">
            {history.map((item) => (
              <div
                key={item.id}
                className="relative pl-6 border-l-2 border-slate-200"
              >
                <div className="absolute -left-2.5 top-0 w-4 h-4 rounded-full bg-sky-600" />
                <p className="font-bold text-slate-800">{item.state}</p>
                <p className="text-xs text-slate-500">Por: {item.changedBy}</p>
                <p className="text-xs text-slate-400 mt-1">
                  {new Date(item.timestamp).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
