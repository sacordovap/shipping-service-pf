import { Loader2 } from "lucide-react";

export const Button = ({
  children,
  isLoading,
  variant = "primary",
  className = "",
  ...rest
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-900 shadow-sm",
    outline:
      "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-200 shadow-sm",
    ghost:
      "bg-transparent text-slate-600 hover:bg-slate-100 focus:ring-slate-200",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      {...rest}
      disabled={isLoading || rest.disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes.md} ${className}`}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          <span>Procesando...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};
