import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { StatCard } from "@/components/StatCard";
import { ExpenseForm } from "@/components/ExpenseForm";
import { ExpenseList } from "@/components/ExpenseList";
import { SummaryPanel } from "@/components/SummaryPanel";
import { CurrencyConverter } from "@/components/CurrencyConverter";
import { Expense } from "@/types/expense";
import { loadExpenses, saveExpenses } from "@/lib/expenseStorage";

interface DashboardProps { onLogout: () => void; }

export function Dashboard({ onLogout }: DashboardProps) {
  const [expenses, setExpenses] = useState<Expense[]>(loadExpenses);
  const [searchQuery, setSearchQuery] = useState("");

  const updateExpenses = (updated: Expense[]) => {
    setExpenses(updated);
    saveExpenses(updated);
  };

  const totalSpend = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const categoryTotals = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {} as Record<string, number>);
  const biggestCategory = Object.keys(categoryTotals).length > 0
    ? Object.keys(categoryTotals).reduce((a, b) => categoryTotals[a] > categoryTotals[b] ? a : b)
    : "None";

  const handleAddExpense = (expense: Omit<Expense, "id" | "createdAt">) => {
    const updated = [{ ...expense, id: Date.now().toString(), createdAt: new Date().toISOString() as unknown as Date }, ...expenses];
    updateExpenses(updated);
  };

  const handleDeleteExpense = (id: string) => updateExpenses(expenses.filter(e => e.id !== id));

  const filteredExpenses = expenses.filter(e =>
    e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppShell onLogout={onLogout} searchQuery={searchQuery} setSearchQuery={setSearchQuery}>
      <div className="mb-2">
        <h1 className="text-3xl font-display font-bold text-foreground">Hello, Alex!</h1>
        <p className="text-muted-foreground">Ready to track some expenses?</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard title="Total Spending" value={`$${totalSpend.toFixed(2)}`} variant={1} />
            <StatCard title="Expenses" value={expenses.length} variant={2} />
            <StatCard title="Top Category" value={biggestCategory} variant={3} />
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-border relative overflow-hidden">
            <h2 className="text-xl font-display font-bold mb-4">Add New Expense</h2>
            <ExpenseForm onAdd={handleAddExpense} />
          </div>
          <div>
            <h2 className="text-xl font-display font-bold mb-4">Recent Expenses</h2>
            <ExpenseList expenses={filteredExpenses} onDelete={handleDeleteExpense} />
          </div>
        </div>
        <div className="space-y-8">
          <CurrencyConverter totalUSD={totalSpend} />
          <SummaryPanel expenses={expenses} totalSpend={totalSpend} />
        </div>
      </div>
    </AppShell>
  );
}