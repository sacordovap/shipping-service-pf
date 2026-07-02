import { useFormContext } from "react-hook-form";

export const Input = ({ label, name, error, register, ...props }) => {
  let context = null;
  try {
    context = useFormContext();
  } catch (e) {}

  const hookRegister = register || (context ? context.register : null);

  const hookError =
    error || (context ? context.formState.errors[name]?.message : null);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <input
        {...(hookRegister ? hookRegister(name) : {})}
        type={props.type || "text"}
        {...props}
        className={`w-full py-3 px-4 text-base rounded-xl border bg-slate-50 outline-none transition-all duration-200
          ${
            hookError
              ? "border-rose-400 focus:ring-2 focus:ring-rose-200"
              : "border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10"
          }
        `}
      />
      {hookError && (
        <span className="text-rose-500 text-xs font-semibold">{hookError}</span>
      )}
    </div>
  );
};
