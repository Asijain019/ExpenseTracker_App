import { Expense } from "../types/expense";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  variant: 1 | 2 | 3;
}

export function StatCard({ title, value, subtitle, variant }: StatCardProps) {
  const styles = {
    1: "bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-purple-500/20",
    2: "bg-gradient-to-br from-sky-400 to-blue-500 text-white shadow-blue-500/20",
    3: "bg-white text-slate-900 shadow-slate-200/50 border border-slate-100"
  };

  const titleStyles = {
    1: "text-purple-100",
    2: "text-blue-100",
    3: "text-slate-500"
  }

  return (
    <div className={`p-6 rounded-3xl shadow-lg relative overflow-hidden ${styles[variant]}`}>
      {/* Decorative SVG background */}
      <svg className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10" viewBox="0 0 100 100" fill="currentColor">
        <circle cx="50" cy="50" r="40" />
      </svg>
      {variant === 1 && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
      )}
      
      <p className={`text-sm font-bold uppercase tracking-wider mb-2 relative z-10 ${titleStyles[variant]}`}>{title}</p>
      <h3 className="text-3xl font-display font-bold relative z-10">{value}</h3>
      {subtitle && <p className="text-sm opacity-80 mt-2 relative z-10 font-medium">{subtitle}</p>}
    </div>
  );
}