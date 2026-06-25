export const Input = ({
  label,
  name,
  error,
  register,
  type = "text",
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm font-semibold text-text-main">{label}</label>

      <input
        {...register(name)}
        type={type}
        {...props}
        className={`w-full p-3 rounded-lg border bg-transparent outline-none transition-colors
          ${
            error
              ? "border-red-500 ring-1 ring-red-500"
              : "border-border focus:ring-2 focus:ring-primary"
          }`}
      />
      {error && (
        <span className="text-red-500 text-xs font-medium animate-pulse">
          {error}
        </span>
      )}
    </div>
  );
};
