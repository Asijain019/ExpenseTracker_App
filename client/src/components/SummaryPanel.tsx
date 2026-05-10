import { Expense } from "../types/expense";

interface SummaryPanelProps {
  expenses: Expense[];
  totalSpend: number;
}

export function SummaryPanel({ expenses, totalSpend }: SummaryPanelProps) {
  const categories = ['Food', 'Travel', 'Marketing', 'Utilities', 'Other'];
  
  const categoryColors: Record<string, string> = {
    Food: "bg-orange-500", 
    Travel: "bg-sky-500",
    Marketing: "bg-purple-500", 
    Utilities: "bg-teal-500", 
    Other: "bg-amber-500" 
  };

  const breakdown = categories.map(cat => {
    const amount = expenses.filter(e => e.category === cat).reduce((sum, e) => sum + Number(e.amount), 0);
    const percentage = totalSpend > 0 ? (amount / totalSpend) * 100 : 0;
    return { category: cat, amount, percentage };
  }).filter(b => b.amount > 0).sort((a, b) => b.amount - a.amount);

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
      <h2 className="text-xl font-display font-bold mb-6 text-slate-900">Spend Breakdown</h2>
      
      {breakdown.length === 0 ? (
        <p className="text-slate-500 text-sm font-medium text-center py-8 bg-slate-50 rounded-2xl">No data to display.</p>
      ) : (
        <div className="space-y-5">
          {breakdown.map(({ category, amount, percentage }) => (
            <div key={category}>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-bold text-slate-700">{category}</span>
                <span className="font-bold text-slate-900">${amount.toFixed(2)}</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ease-out ${categoryColors[category] || "bg-slate-400"}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}