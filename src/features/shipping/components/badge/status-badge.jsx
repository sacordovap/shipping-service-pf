import { SHIPPING_STATUS } from "@/features/shipping/constants/status/shipping-status";

export function StatusBadge({ status }) {
  const config = SHIPPING_STATUS[status] || {
    label: status,
    style: "bg-gray-100 text-gray-600 border-gray-200",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${config.style}`}
    >
      {config.label}
    </span>
  );
}
