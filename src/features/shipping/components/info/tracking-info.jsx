import { Info } from "lucide-react";

export const InfoGroup = ({ title, children }) => (
  <div>
    <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
      <Info className="w-4 h-4 text-blue-500" /> {title}
    </h3>
    <div className="space-y-4">{children}</div>
  </div>
);

export const InfoItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="p-2 bg-blue-50 rounded-lg">
      <Icon className="w-4 h-4 text-blue-600" />
    </div>
    <div>
      <p className="text-[10px] text-slate-400 uppercase font-bold">{label}</p>
      <p className="font-semibold text-slate-700 text-sm">{value}</p>
    </div>
  </div>
);
