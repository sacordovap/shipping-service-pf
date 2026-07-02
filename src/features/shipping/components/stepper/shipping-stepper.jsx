import {
  NORMAL_FLOW,
  SPECIAL_STATES,
} from "@/features/shipping/constants/status/shipping-status";
import { Check, XCircle, AlertTriangle } from "lucide-react";

export const ShippingStepper = ({ currentStatus }) => {
  const isSpecialState = Object.values(SPECIAL_STATES).includes(currentStatus);
  const currentIndex = NORMAL_FLOW.indexOf(currentStatus);

  if (isSpecialState) {
    const isEliminated = currentStatus === SPECIAL_STATES.ELIMINADO;

    return (
      <div
        className={`p-6 rounded-2xl border-2 flex items-center gap-4 animate-in fade-in duration-500 ${
          isEliminated
            ? "bg-rose-50 border-rose-200 text-rose-700"
            : "bg-amber-50 border-amber-200 text-amber-700"
        }`}
      >
        {isEliminated ? <XCircle size={32} /> : <AlertTriangle size={32} />}
        <div>
          <h4 className="font-bold text-lg uppercase">
            Estado: {currentStatus.replace("_", " ")}
          </h4>
          <p className="text-sm opacity-90">
            {isEliminated
              ? "El envío ha sido marcado como eliminado del sistema."
              : "El envío ha sido rebotado y no pudo ser completado."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative gap-6 md:gap-0">
        <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-slate-200 md:left-0 md:top-4 md:w-full md:h-0.5" />
        {NORMAL_FLOW.map((step, index) => {
          const isCompleted = index <= currentIndex;
          return (
            <div
              key={step}
              className="relative z-10 flex items-center md:flex-col md:items-center gap-4 md:gap-0"
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-500 shrink-0 ${
                  isCompleted
                    ? "bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-200"
                    : "bg-white border-slate-300 text-slate-400"
                }`}
              >
                {isCompleted ? (
                  <Check size={18} strokeWidth={3} />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>

              <span
                className={`text-sm md:text-xs font-bold md:mt-3 uppercase tracking-wider ${
                  isCompleted ? "text-emerald-600" : "text-slate-400"
                }`}
              >
                {step.replace("_", " ")}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
