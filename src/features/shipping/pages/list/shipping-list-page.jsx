import { useListShippings } from "@/features/shipping/hooks/use-list-shipping";
import { useNavigate } from "react-router-dom";

export const ShippingListPage = () => {
  const { shippings, isLoading, error } = useListShippings();
  const navigate = useNavigate();

  if (isLoading)
    return <div className="p-10 text-center">Cargando envíos...</div>;
  if (error)
    return <div className="p-10 text-center text-rose-500">{error}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800">
          Envíos Registrados
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {shippings.map((ship) => (
          <div
            key={ship.id}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
            onClick={() => console.log(ship.tracking)}
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold text-sky-600 bg-sky-50 px-2 py-1 rounded-lg">
                {ship.tracking}
              </span>

              <span className="text-[10px] text-slate-400 font-medium">
                {ship.date}
              </span>
            </div>

            <h3 className="font-bold text-slate-800 text-lg mb-1">
              {ship.sender}
            </h3>

            <p className="text-sm text-slate-500 mb-4 truncate">{ship.route}</p>

            <div className="border-t border-slate-100 pt-3 flex justify-between items-center">
              <span className="text-sm font-bold text-emerald-600">
                S/ {ship.cost}
              </span>
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-slate-100 text-slate-600">
                {ship.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
