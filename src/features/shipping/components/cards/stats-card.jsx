export const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
    <div>
      <p className="text-sm text-slate-500 font-medium mb-1">{title}</p>
      <h4 className="text-2xl font-bold text-slate-900">{value}</h4>
    </div>
    <div className={`p-3 bg-slate-50 rounded-2xl ${color}`}>
      <Icon className="w-6 h-6" />
    </div>
  </div>
);
