export const Button = ({
  children,
  isLoading,
  variant = "primary",
  ...rest
}) => {
  const baseStyle = "w-full py-2 px-4 rounded-lg font-semibold transition-all";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-slate-200 text-slate-800 hover:bg-slate-300",
  };

  return (
    <button
      {...rest}
      disabled={isLoading}
      className={`${baseStyle} ${variants[variant]} ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {isLoading ? "Cargando..." : children}
    </button>
  );
};
