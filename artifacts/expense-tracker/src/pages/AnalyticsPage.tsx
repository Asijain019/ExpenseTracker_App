import { useState, useEffect } from "react";
import { AppShell } from "@/components/AppShell";
import { Expense } from "@/types/expense";
import { api } from "@/lib/api";
import { LineChart, Line, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AnalyticsPageProps { onLogout: () => void; user: any; }

const CATEGORY_COLORS: Record<string, string> = {
  Food: "#F97316",
  Travel: "#0EA5E9",
  Marketing: "#8B5CF6",
  Utilities: "#14B8A6",
  Other: "#F59E0B"
};

export function AnalyticsPage({ onLogout, user }: AnalyticsPageProps) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<"Daily"|"Weekly"|"Monthly">("Monthly");
  const { toast } = useToast();

  useEffect(() => {
    let mounted = true;
    api.getExpenses().then(data => {
      if(mounted) {
        setExpenses(data);
        setLoading(false);
      }
    }).catch(e => {
      if(mounted) {
        toast({ title: "Failed to load data", variant: "destructive" });
        setLoading(false);
      }
    })
    return () => { mounted = false; };
  }, [toast]);

  const filteredExpenses = expenses.filter(e =>
    e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalSpent = filteredExpenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
  const avgExpense = filteredExpenses.length ? (totalSpent / filteredExpenses.length) : 0;
  const highestExpense = filteredExpenses.length ? Math.max(...filteredExpenses.map(e => Number(e.amount))) : 0;
  
  const categoryTotals = filteredExpenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + Number(exp.amount);
    return acc;
  }, {} as Record<string, number>);
  
  const mostActiveCategory = Object.keys(categoryTotals).length > 0
    ? Object.keys(categoryTotals).reduce((a, b) => categoryTotals[a] > categoryTotals[b] ? a : b)
    : "None";

  // Chart Data based on timeRange
  const getTimeData = () => {
    const map: Record<string, number> = {};
    filteredExpenses.forEach(exp => {
      const d = new Date(exp.createdAt);
      let key = "";
      if (timeRange === "Daily") {
        key = d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
      } else if (timeRange === "Weekly") {
        // simple week grouping by start of week
        const first = d.getDate() - d.getDay();
        const start = new Date(d.setDate(first)).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
        key = `Week of ${start}`;
      } else {
        key = d.toLocaleDateString(undefined, { month: 'short', year: '2-digit' });
      }
      map[key] = (map[key] || 0) + Number(exp.amount);
    });

    return Object.entries(map).map(([name, amount]) => ({ name, amount })).reverse().slice(0, 14).reverse();
  };

  const chartData = getTimeData();
  const pieData = Object.entries(categoryTotals).map(([name, value]) => ({ name, value }));
  const barData = Object.entries(categoryTotals).map(([name, amount]) => ({ name, amount })).sort((a, b) => b.amount - a.amount);
  const highestCatPercent = totalSpent ? ((categoryTotals[mostActiveCategory] || 0) / totalSpent * 100).toFixed(0) : 0;

  return (
    <AppShell onLogout={onLogout} searchQuery={searchQuery} setSearchQuery={setSearchQuery} user={user}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">Analytics</h1>
          <p className="text-slate-500">Deep dive into your spending patterns</p>
        </div>
        <div className="bg-slate-100 p-1 rounded-lg flex shadow-sm border border-slate-200">
          {["Daily", "Weekly", "Monthly"].map(tab => (
            <button 
              key={tab}
              onClick={() => setTimeRange(tab as any)}
              className={`px-4 py-2 text-sm font-bold rounded-md transition-all ${timeRange === tab ? "bg-white text-slate-900 shadow" : "text-slate-500 hover:text-slate-900"}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-purple-500" />
              <p className="text-sm font-bold text-slate-500 mb-2 uppercase tracking-wider">Total Spent</p>
              <h3 className="text-3xl font-display font-bold text-slate-900">${totalSpent.toFixed(2)}</h3>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-sky-500" />
              <p className="text-sm font-bold text-slate-500 mb-2 uppercase tracking-wider">Avg Expense</p>
              <h3 className="text-3xl font-display font-bold text-slate-900">${avgExpense.toFixed(2)}</h3>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500" />
              <p className="text-sm font-bold text-slate-500 mb-2 uppercase tracking-wider">Highest Single</p>
              <h3 className="text-3xl font-display font-bold text-slate-900">${highestExpense.toFixed(2)}</h3>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-amber-500" />
              <p className="text-sm font-bold text-slate-500 mb-2 uppercase tracking-wider">Top Category</p>
              <h3 className="text-3xl font-display font-bold text-slate-900">{mostActiveCategory}</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
              <h2 className="text-xl font-display font-bold mb-6 text-slate-900">Spending Overview ({timeRange})</h2>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: "#64748b"}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: "#64748b"}} tickFormatter={(val) => `$${val}`} dx={-10} />
                  <Tooltip cursor={{fill: '#f8fafc'}} formatter={(value: number) => `$${value.toFixed(2)}`} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                  <Bar dataKey="amount" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 flex flex-col">
              <h2 className="text-xl font-display font-bold mb-6 text-slate-900">AI Insights</h2>
              <div className="space-y-4 flex-1">
                <div className="p-5 bg-purple-50 rounded-2xl border border-purple-100">
                  <span className="text-2xl mb-2 block">💡</span>
                  <p className="text-sm text-purple-900 font-medium leading-relaxed">
                    You spent most on <span className="font-bold">{mostActiveCategory}</span>, accounting for <span className="font-bold bg-white px-1.5 py-0.5 rounded text-purple-700">{highestCatPercent}%</span> of your total expenses.
                  </p>
                </div>
                <div className="p-5 bg-sky-50 rounded-2xl border border-sky-100">
                  <span className="text-2xl mb-2 block">📊</span>
                  <p className="text-sm text-sky-900 font-medium leading-relaxed">
                    Your average expense is <span className="font-bold bg-white px-1.5 py-0.5 rounded text-sky-700">${avgExpense.toFixed(2)}</span>. Consider setting a cap on individual purchases.
                  </p>
                </div>
                <div className="p-5 bg-amber-50 rounded-2xl border border-amber-100">
                  <span className="text-2xl mb-2 block">🔥</span>
                  <p className="text-sm text-amber-900 font-medium leading-relaxed">
                    Your highest single expense was <span className="font-bold bg-white px-1.5 py-0.5 rounded text-amber-700">${highestExpense.toFixed(2)}</span>. Review large purchases to ensure they fit your budget.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
              <h2 className="text-xl font-display font-bold mb-6 text-slate-900">Category Distribution</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={70} outerRadius={100} paddingAngle={5} dataKey="value">
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[entry.name] || "#ccc"} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                  <Legend iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
              <h2 className="text-xl font-display font-bold mb-6 text-slate-900">Totals by Category</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                  <XAxis type="number" axisLine={false} tickLine={false} tickFormatter={(val) => `$${val}`} tick={{fontSize: 12, fill: "#64748b"}} />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: "#1e293b", fontWeight: 600}} />
                  <Tooltip cursor={{fill: '#f8fafc'}} formatter={(value: number) => `$${value.toFixed(2)}`} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                  <Bar dataKey="amount" radius={[0, 6, 6, 0]}>
                    {barData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[entry.name] || "#8b5cf6"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </AppShell>
  );
}