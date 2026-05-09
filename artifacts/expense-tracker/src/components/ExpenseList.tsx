import { Expense } from "../types/expense";
import { Trash2, Coffee, Plane, Briefcase, Zap, Box } from "lucide-react";

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

const CategoryIcons = {
  Food: Coffee,
  Travel: Plane,
  Marketing: Briefcase,
  Utilities: Zap,
  Other: Box
};

const CategoryColors = {
  Food: "bg-coral-100 text-coral-700 border-l-coral-500",
  Travel: "bg-sky-100 text-sky-700 border-l-sky-500",
  Marketing: "bg-purple-100 text-purple-700 border-l-purple-500",
  Utilities: "bg-teal-100 text-teal-700 border-l-teal-500",
  Other: "bg-amber-100 text-amber-700 border-l-amber-500"
};

export function ExpenseList({ expenses, onDelete }: ExpenseListProps) {
  if (expenses.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center border border-border flex flex-col items-center">
        <svg className="w-32 h-32 text-muted-foreground/30 mb-4" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="50" cy="50" r="40" />
          <path d="M30 60 Q 50 80 70 60" />
          <circle cx="35" cy="40" r="5" fill="currentColor" />
          <circle cx="65" cy="40" r="5" fill="currentColor" />
        </svg>
        <h3 className="text-xl font-display font-bold text-foreground">No expenses found</h3>
        <p className="text-muted-foreground mt-2">Add some expenses to get started or adjust your search.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {expenses.map((expense) => {
        const Icon = CategoryIcons[expense.category] || Box;
        const colorClass = CategoryColors[expense.category] || "border-l-gray-500";
        
        return (
          <div key={expense.id} className={`bg-white border border-border border-l-4 rounded-xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow ${colorClass}`} data-testid={`card-expense-${expense.id}`}>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-muted rounded-xl text-foreground">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">{expense.name}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground font-medium">
                    {expense.category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(expense.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <span className="text-lg font-bold text-foreground">
                ${expense.amount.toFixed(2)}
              </span>
              <button 
                onClick={() => onDelete(expense.id)}
                className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                data-testid={`button-delete-${expense.id}`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
