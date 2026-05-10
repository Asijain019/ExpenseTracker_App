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
import { Loader2, Zap, BarChart3, Lightbulb } from "lucide-react";

interface DashboardProps { onLogout: () => void; user: any; }

export function Dashboard({ onLogout, user }: DashboardProps) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
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

  const handleAddExpense = async (expense: Omit<Expense, "id">) => {
    try {
      const newExp = await api.addExpense(expense);
      // Sort expenses by date (newest first) after adding
      const updated = [newExp, ...expenses].sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setExpenses(updated);
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

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <AppShell onLogout={onLogout} searchQuery={searchQuery} setSearchQuery={setSearchQuery} user={user}>
      <div className="mb-8 mesh-bg rounded-3xl p-8 text-white shadow-xl shadow-indigo-500/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" />
        <div className="relative z-10">
          <h1 className="text-4xl font-display font-extrabold mb-2 text-white drop-shadow-md">{getGreeting()}, {user?.name || "User"}!</h1>
          <p className="text-white/90 text-lg font-medium">Here's what's happening with your money today.</p>
        </div>
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
            
            <div className="glass-panel rounded-3xl p-6 relative overflow-hidden border-t border-white/60">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-violet-400/10 rounded-full blur-2xl" />
              <h2 className="text-xl font-display font-extrabold mb-6 text-slate-900 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Zap className="w-6 h-6 text-violet-600" /> Add Items
                </span>
                <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-tighter">
                  For: {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </h2>
              <div className="relative z-10">
                <ExpenseForm onAdd={handleAddExpense} selectedDate={selectedDate} />
              </div>
            </div>
            
            <div className="glass-panel rounded-3xl p-6 mt-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-display font-extrabold text-slate-900 flex items-center gap-2">
                  <BarChart3 className="w-6 h-6 text-indigo-600" /> Recent Expenses
                </h2>
              </div>
              <ExpenseList expenses={filteredExpenses.slice(0, 10)} onDelete={handleDeleteExpense} />
            </div>
          </div>
          
          <div className="space-y-8">
            <MiniCalendar expenses={expenses} selectedDate={selectedDate} onSelectDate={setSelectedDate} />
            <CurrencyConverter totalUSD={totalSpend} />
            <SummaryPanel expenses={expenses} totalSpend={totalSpend} />
            <div className="glass-panel rounded-3xl p-6 border-t border-white/60 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-amber-400/10 rounded-full blur-xl" />
              <h2 className="text-xl font-display font-extrabold mb-4 text-slate-900 flex items-center gap-2">
                <Lightbulb className="w-6 h-6 text-amber-500" /> Pro Tip
              </h2>
              <div className="p-4 bg-gradient-to-br from-violet-50 to-fuchsia-50 rounded-2xl border border-violet-100 flex items-start gap-4 shadow-sm">
                <p className="text-sm text-slate-700 font-medium leading-relaxed">Tracking every small expense gives you a <span className="text-violet-600 font-bold">30% better chance</span> of staying under budget this month.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}