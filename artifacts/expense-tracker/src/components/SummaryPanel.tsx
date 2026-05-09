import { Expense } from "../types/expense";

interface SummaryPanelProps {
  expenses: Expense[];
  totalSpend: number;
}

export function SummaryPanel({ expenses, totalSpend }: SummaryPanelProps) {
  const categories = ['Food', 'Travel', 'Marketing', 'Utilities', 'Other'];
  
  const categoryColors: Record<string, string> = {
    Food: "bg-[hsl(16,100%,66%)]", // coral
    Travel: "bg-[hsl(200,98%,39%)]", // sky blue
    Marketing: "bg-[hsl(280,65%,60%)]", // purple
    Utilities: "bg-[hsl(175,70%,41%)]", // teal
    Other: "bg-[hsl(38,92%,50%)]" // amber
  };

  const breakdown = categories.map(cat => {
    const amount = expenses.filter(e => e.category === cat).reduce((sum, e) => sum + e.amount, 0);
    const percentage = totalSpend > 0 ? (amount / totalSpend) * 100 : 0;
    return { category: cat, amount, percentage };
  }).filter(b => b.amount > 0).sort((a, b) => b.amount - a.amount);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
      <h2 className="text-xl font-display font-bold mb-6 text-foreground">Spend Breakdown</h2>
      
      {breakdown.length === 0 ? (
        <p className="text-muted-foreground text-sm text-center py-4">No data to display.</p>
      ) : (
        <div className="space-y-4">
          {breakdown.map(({ category, amount, percentage }) => (
            <div key={category}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-foreground">{category}</span>
                <span className="font-bold text-foreground">${amount.toFixed(2)}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${categoryColors[category] || "bg-gray-400"}`}
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
