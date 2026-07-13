import { Truck, Search, LogIn, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const LandingUserPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <nav className="flex justify-between items-center px-6 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 font-bold text-xl text-slate-900">
          <Truck className="w-8 h-8 text-slate-900" />
          Shipping Service
        </div>
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 bg-slate-800 text-white px-5 py-2 rounded-full font-semibold hover:bg-slate-800 transition"
        >
          <LogIn className="w-4 h-4" /> Login
        </button>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-24 grid md:grid-cols-2 gap-12 ">
        <div className="space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight">
            Logística <br /> <span className="text-sky-600">inteligente</span>{" "}
            para tu negocio.
          </h1>
          <p className="text-lg text-slate-600 max-w-md">
            Gestiona tus envíos en tiempo real con nuestra plataforma. Rapidez,
            seguridad y control total en cada kilómetro.
          </p>

          <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200 border border-slate-100 text-center">
            <h3 className="text-xl font-bold text-slate-800 mb-2">
              ¿Buscas tu envío?
            </h3>
            <p className="text-slate-500 mb-6">
              Consulta el estado de tu paquete aquí.
            </p>

            <button
              onClick={() => navigate("/tracking")}
              className="w-full flex items-center justify-center gap-2 bg-slate-800 text-white py-4 rounded-2xl font-bold text-lg hover:bg-sky-700 transition-all active:scale-95"
            >
              <Search className="w-5 h-5" />
              Rastrear mi paquete
            </button>
          </div>
        </div>

        <div className="hidden md:flex bg-sky-100 rounded-[3rem] h-96 items-center justify-center">
          <Package className="w-64 h-64 text-slate-800 animate-bounce" />
        </div>
      </main>

      <footer className="text-center py-10 text-slate-400 text-sm">
        © 2026. Todos los derechos reservados.
      </footer>
    </div>
  );
};
