import { Expense } from "../types/expense";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  variant: 1 | 2 | 3;
}

export function StatCard({ title, value, subtitle, variant }: StatCardProps) {
  const bgClasses = {
    1: "bg-gradient-to-br from-teal-200 to-teal-400 text-teal-950",
    2: "bg-gradient-to-br from-purple-200 to-purple-400 text-purple-950",
    3: "bg-gradient-to-br from-coral-200 to-coral-400 text-orange-950"
  };

  return (
    <div className={`p-6 rounded-2xl shadow-sm relative overflow-hidden ${bgClasses[variant]}`}>
      {/* Decorative doodle */}
      <svg className="absolute -right-4 -top-4 w-24 h-24 opacity-20" viewBox="0 0 100 100" fill="currentColor">
        <path d="M50 0 L55 35 L90 40 L60 60 L65 95 L40 70 L5 80 L25 50 L0 20 L35 25 Z" />
      </svg>
      
      <p className="text-sm font-medium opacity-80 mb-1 relative z-10">{title}</p>
      <h3 className="text-3xl font-display font-bold relative z-10">{value}</h3>
      {subtitle && <p className="text-xs opacity-70 mt-2 relative z-10">{subtitle}</p>}
    </div>
  );
}
