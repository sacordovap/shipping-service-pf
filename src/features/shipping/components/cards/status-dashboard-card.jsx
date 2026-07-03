export const StatusStatCard = ({ label, value, style, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`
      p-4 rounded-2xl border w-full text-left transition-all 
      ${style} 
      hover:scale-[1.02] hover:shadow-md cursor-pointer
      active:scale-[0.98]
    `}
  >
    <p className="text-[10px] font-bold uppercase truncate opacity-80">
      {label}
    </p>
    <h4 className="text-xl font-black mt-1 tabular-nums">{value}</h4>
  </button>
);
