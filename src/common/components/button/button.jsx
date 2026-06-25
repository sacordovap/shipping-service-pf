export const Button = ({ children, isLoading, ...rest }) => {
  return (
    <button
      {...rest}
      disabled={isLoading}
      className="w-full py-3 px-4 rounded-xl font-semibold text-white bg-sky-600 hover:bg-sky-700 active:scale-[0.98] transition-all shadow-md shadow-sky-500/20 focus:ring-4 focus:ring-sky-500/30"
    >
      {isLoading ? "Procesando..." : children}
    </button>
  );
};