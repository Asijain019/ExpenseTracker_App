import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { StatCard } from "@/components/StatCard";
import { ExpenseForm } from "@/components/ExpenseForm";
import { ExpenseList } from "@/components/ExpenseList";
import { SummaryPanel } from "@/components/SummaryPanel";
import { CurrencyConverter } from "@/components/CurrencyConverter";
import { Expense } from "@/types/expense";

export function Dashboard() {
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: "1", name: "Groceries", amount: 120.50, category: "Food", createdAt: new Date() },
    { id: "2", name: "Uber", amount: 24.00, category: "Travel", createdAt: new Date(Date.now() - 86400000) },
    { id: "3", name: "Facebook Ads", amount: 350.00, category: "Marketing", createdAt: new Date(Date.now() - 172800000) },
  ]);
  const [searchQuery, setSearchQuery] = useState("");

  const totalSpend = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  
  const categoryTotals = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {} as Record<string, number>);
  
  const biggestCategory = Object.keys(categoryTotals).length > 0 
    ? Object.keys(categoryTotals).reduce((a, b) => categoryTotals[a] > categoryTotals[b] ? a : b) 
    : "None";

  const handleAddExpense = (expense: Omit<Expense, "id" | "createdAt">) => {
    const newExpense: Expense = {
      ...expense,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setExpenses([newExpense, ...expenses]);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  const filteredExpenses = expenses.filter(e => 
    e.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    e.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 p-8 overflow-y-auto">
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard title="Total Spending" value={`$${totalSpend.toFixed(2)}`} variant={1} />
              <StatCard title="Expenses" value={expenses.length} variant={2} />
              <StatCard title="Top Category" value={biggestCategory} variant={3} />
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-border relative overflow-hidden">
              <svg className="absolute right-0 bottom-0 w-32 h-32 opacity-10 text-primary pointer-events-none" viewBox="0 0 100 100" fill="currentColor">
                <circle cx="50" cy="50" r="40" />
              </svg>
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
            
            <div className="bg-primary text-primary-foreground rounded-2xl p-6 shadow-sm relative">
              <svg className="absolute -left-4 -top-4 w-20 h-20 opacity-20" viewBox="0 0 100 100" fill="currentColor">
                 <polygon points="50,0 60,40 100,50 60,60 50,100 40,60 0,50 40,40" />
              </svg>
              <h3 className="text-xl font-display font-bold relative z-10 mb-2">Pro Tip</h3>
              <p className="text-sm opacity-90 relative z-10">Keep tracking daily to see your wealth grow! Don't let sneaky subscriptions drain your wallet.</p>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}
