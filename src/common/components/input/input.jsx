import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react"; // Asegúrate de instalarlos

export const Input = ({ label, name, error, register, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  let context = null;

  try {
    context = useFormContext();
  } catch (e) {}

  const hookRegister = register || (context ? context.register : null);
  const hookError =
    error || (context ? context.formState.errors[name]?.message : null);

  const isPassword = props.type === "password";
  const inputType = isPassword
    ? showPassword
      ? "text"
      : "password"
    : props.type || "text";

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-sm font-medium text-slate-700">{label}</label>

      <div className="relative w-full">
        <input
          {...(hookRegister ? hookRegister(name) : {})}
          {...props}
          type={inputType}
          className={`w-full py-3 px-4 text-base rounded-xl border bg-slate-50 outline-none transition-all duration-200
            ${isPassword ? "pr-12" : ""}
            ${
              hookError
                ? "border-rose-400 focus:ring-2 focus:ring-rose-200"
                : "border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10"
            }
          `}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-600 transition-colors"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {hookError && (
        <span className="text-rose-500 text-xs font-semibold">{hookError}</span>
      )}
    </div>
  );
};
