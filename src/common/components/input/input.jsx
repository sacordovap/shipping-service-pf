export const Input = ({
  label,
  name,
  error,
  register,
  readOnly,
  type = "text",
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <input
        {...register(name)}
        type={type}
        {...props}
        readOnly={readOnly}
        className={`w-full py-3 px-4 text-base rounded-xl border bg-slate-50 outline-none transition-all duration-200
          ${
            error
              ? "border-rose-400 focus:ring-2 focus:ring-rose-200"
              : "border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10"
          }
        `}
      />
      {error && (
        <span className="text-rose-500 text-xs font-semibold">{error}</span>
      )}
    </div>
  );
};
