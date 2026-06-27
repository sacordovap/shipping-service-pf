export default function Unauthtorized() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4 text-center">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 max-w-md w-full">
        <div className="text-6xl mb-4">🚫</div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Acceso Denegado
        </h2>
        <p className="text-slate-600 mb-6">
          No tienes los permisos necesarios para visualizar esta sección.
        </p>
        <button
          onClick={() => window.history.back()}
          className="w-full py-3 bg-[#0284c7] text-white rounded-xl font-semibold hover:bg-[#0369a1] transition-all"
        >
          Volver atrás
        </button>
      </div>
    </div>
  );
}
