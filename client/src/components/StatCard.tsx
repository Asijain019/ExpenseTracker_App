import { Expense } from "../types/expense";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  variant: 1 | 2 | 3;
}

export function StatCard({ title, value, subtitle, variant }: StatCardProps) {
  const gradient = 
    variant === 1 ? "from-violet-50 to-indigo-50 border-violet-100 group-hover:border-violet-300" :
    variant === 2 ? "from-sky-50 to-blue-50 border-sky-100 group-hover:border-sky-300" :
    "from-emerald-50 to-teal-50 border-emerald-100 group-hover:border-emerald-300";

  return (
    <div className={`rounded-3xl p-6 bg-gradient-to-br ${gradient} border glass-panel shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden`}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/40 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
      <p className="text-sm font-bold uppercase tracking-wider mb-2 relative z-10 text-slate-500">{title}</p>
      <h3 className="text-3xl font-display font-extrabold relative z-10 text-slate-900">{value}</h3>
      {subtitle && <p className="text-sm mt-2 relative z-10 font-medium text-slate-500">{subtitle}</p>}
    </div>
  );
}