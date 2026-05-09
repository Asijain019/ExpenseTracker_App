import { useState, useEffect } from "react";
import { AppShell } from "@/components/AppShell";
import { StatCard } from "@/components/StatCard";
import { ExpenseForm } from "@/components/ExpenseForm";
import { ExpenseList } from "@/components/ExpenseList";
import { SummaryPanel } from "@/components/SummaryPanel";
import { CurrencyConverter } from "@/components/CurrencyConverter";
import { MiniCalendar } from "@/components/MiniCalendar";
import { Expense } from "@/types/expense";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface DashboardProps { onLogout: () => void; user: any; }

export function Dashboard({ onLogout, user }: DashboardProps) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    let mounted = true;
    api.getExpenses().then(data => {
      if (mounted) {
        setExpenses(data);
        setLoading(false);
      }
    }).catch(err => {
      if (mounted) {
        toast({ title: "Unable to load data", description: "Please try again later", variant: "destructive" });
        setLoading(false);
      }
    });
    return () => { mounted = false; };
  }, [toast]);

  const totalSpend = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
  const thisMonthSpend = expenses.filter(e => {
    const d = new Date(e.createdAt);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).reduce((sum, exp) => sum + Number(exp.amount), 0);

  const categoryTotals = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + Number(exp.amount);
    return acc;
  }, {} as Record<string, number>);
  
  const biggestCategory = Object.keys(categoryTotals).length > 0
    ? Object.keys(categoryTotals).reduce((a, b) => categoryTotals[a] > categoryTotals[b] ? a : b)
    : "None";

  const handleAddExpense = async (expense: Omit<Expense, "id" | "createdAt">) => {
    try {
      const newExp = await api.addExpense(expense);
      setExpenses([newExp, ...expenses]);
      toast({ title: "Expense Added" });
    } catch (e) {
      toast({ title: "Failed to add expense", variant: "destructive" });
    }
  };

  const handleDeleteExpense = async (id: string) => {
    try {
      await api.deleteExpense(id);
      setExpenses(expenses.filter(e => e.id !== id));
      toast({ title: "Expense Deleted" });
    } catch(e) {
      toast({ title: "Failed to delete", variant: "destructive" });
    }
  };

  const filteredExpenses = expenses.filter(e =>
    e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppShell onLogout={onLogout} searchQuery={searchQuery} setSearchQuery={setSearchQuery} user={user}>
      <div className="mb-6">
        <h1 className="text-3xl font-display font-bold text-foreground">Good morning, {user?.name || "User"}!</h1>
        <p className="text-muted-foreground">Here's what's happening with your money today.</p>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard title="Total Spending" value={`$${totalSpend.toFixed(2)}`} variant={1} />
              <StatCard title="This Month" value={`$${thisMonthSpend.toFixed(2)}`} variant={2} />
              <StatCard title="Expenses" value={expenses.length} variant={3} />
              <StatCard title="Top Category" value={biggestCategory} variant={1} />
            </div>
            
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-border">
              <h2 className="text-xl font-display font-bold mb-6 text-slate-900">Quick Add</h2>
              <ExpenseForm onAdd={handleAddExpense} />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-display font-bold text-slate-900">Recent Expenses</h2>
              </div>
              <ExpenseList expenses={filteredExpenses.slice(0, 10)} onDelete={handleDeleteExpense} />
            </div>
          </div>
          
          <div className="space-y-8">
            <MiniCalendar expenses={expenses} />
            <CurrencyConverter totalUSD={totalSpend} />
            <SummaryPanel expenses={expenses} totalSpend={totalSpend} />
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-border">
              <h2 className="text-xl font-display font-bold mb-4 text-slate-900">Pro Tip</h2>
              <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100 flex items-start gap-4">
                <span className="text-2xl">💡</span>
                <p className="text-sm text-purple-900 font-medium">Tracking every small expense gives you a 30% better chance of staying under budget this month.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}