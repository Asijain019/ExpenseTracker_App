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
  Food: "bg-orange-50 text-orange-600 border-l-orange-500 group-hover:border-orange-500",
  Travel: "bg-sky-50 text-sky-600 border-l-sky-500 group-hover:border-sky-500",
  Marketing: "bg-purple-50 text-purple-600 border-l-purple-500 group-hover:border-purple-500",
  Utilities: "bg-teal-50 text-teal-600 border-l-teal-500 group-hover:border-teal-500",
  Other: "bg-amber-50 text-amber-600 border-l-amber-500 group-hover:border-amber-500"
};

const IconBgColors = {
  Food: "bg-orange-100",
  Travel: "bg-sky-100",
  Marketing: "bg-purple-100",
  Utilities: "bg-teal-100",
  Other: "bg-amber-100"
};

export function ExpenseList({ expenses, onDelete }: ExpenseListProps) {
  if (expenses.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 flex flex-col items-center">
        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
          <svg className="w-10 h-10 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
        <h3 className="text-xl font-display font-bold text-slate-900">No expenses found</h3>
        <p className="text-slate-500 mt-2 font-medium">Add some expenses to get started or adjust your search.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {expenses.map((expense) => {
        const Icon = CategoryIcons[expense.category] || Box;
        const colorClass = CategoryColors[expense.category] || "border-l-slate-200";
        const iconBg = IconBgColors[expense.category] || "bg-slate-100";
        
        return (
          <div key={expense.id} className={`group bg-white border border-slate-200 border-l-[6px] rounded-2xl p-4 flex items-center justify-between transition-all hover:shadow-md hover:-translate-y-0.5 ${colorClass}`} data-testid={`card-expense-${expense.id}`}>
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBg}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base">{expense.name}</h4>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[10px] uppercase tracking-wider font-bold opacity-70">
                    {expense.category}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                  <span className="text-[11px] font-medium text-slate-500">
                    {new Date(expense.createdAt).toLocaleDateString(undefined, {month:'short', day:'numeric'})}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <span className="text-lg font-display font-bold text-slate-900">
                ${Number(expense.amount).toFixed(2)}
              </span>
              <button 
                onClick={() => onDelete(expense.id)}
                className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100"
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