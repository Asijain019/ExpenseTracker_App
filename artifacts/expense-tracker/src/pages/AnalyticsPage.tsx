import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Expense } from "@/types/expense";
import { loadExpenses } from "@/lib/expenseStorage";
import { LineChart, Line, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { StatCard } from "@/components/StatCard";

interface AnalyticsPageProps { onLogout: () => void; }

const CATEGORY_COLORS: Record<string, string> = {
  Food: "#F97316",
  Travel: "#0EA5E9",
  Marketing: "#8B5CF6",
  Utilities: "#14B8A6",
  Other: "#F59E0B"
};

export function AnalyticsPage({ onLogout }: AnalyticsPageProps) {
  const [expenses] = useState<Expense[]>(loadExpenses);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredExpenses = expenses.filter(e =>
    e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalSpent = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  const avgExpense = filteredExpenses.length ? (totalSpent / filteredExpenses.length) : 0;
  const highestExpense = filteredExpenses.length ? Math.max(...filteredExpenses.map(e => e.amount)) : 0;
  
  const categoryTotals = filteredExpenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {} as Record<string, number>);
  
  const mostActiveCategory = Object.keys(categoryTotals).length > 0
    ? Object.keys(categoryTotals).reduce((a, b) => categoryTotals[a] > categoryTotals[b] ? a : b)
    : "None";

  // Line Chart Data - Group by Date
  const dailyTotals = filteredExpenses.reduce((acc, exp) => {
    const date = new Date(exp.createdAt).toLocaleDateString();
    acc[date] = (acc[date] || 0) + exp.amount;
    return acc;
  }, {} as Record<string, number>);
  
  const lineData = Object.entries(dailyTotals)
    .map(([date, amount]) => ({ date, amount }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-7); // Last 7 entries

  // Pie Chart Data
  const pieData = Object.entries(categoryTotals).map(([name, value]) => ({ name, value }));

  // Bar Chart Data (Horizontal)
  const barData = Object.entries(categoryTotals)
    .map(([name, amount]) => ({ name, amount }))
    .sort((a, b) => b.amount - a.amount);

  const highestCatPercent = totalSpent ? ((categoryTotals[mostActiveCategory] || 0) / totalSpent * 100).toFixed(0) : 0;

  return (
    <AppShell onLogout={onLogout} searchQuery={searchQuery} setSearchQuery={setSearchQuery}>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground">Deep dive into your spending patterns</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-border border-l-4 border-l-primary">
          <p className="text-sm font-medium text-muted-foreground mb-1">Total Spent</p>
          <h3 className="text-2xl font-bold text-foreground">${totalSpent.toFixed(2)}</h3>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-border border-l-4 border-l-sky-500">
          <p className="text-sm font-medium text-muted-foreground mb-1">Avg per Expense</p>
          <h3 className="text-2xl font-bold text-foreground">${avgExpense.toFixed(2)}</h3>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-border border-l-4 border-l-purple-500">
          <p className="text-sm font-medium text-muted-foreground mb-1">Highest Single Expense</p>
          <h3 className="text-2xl font-bold text-foreground">${highestExpense.toFixed(2)}</h3>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-border border-l-4 border-l-amber-500">
          <p className="text-sm font-medium text-muted-foreground mb-1">Most Active Category</p>
          <h3 className="text-2xl font-bold text-foreground">{mostActiveCategory}</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-border">
          <h2 className="text-lg font-display font-bold mb-4">Spending Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} tickFormatter={(val) => `$${val}`} />
              <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
              <Line type="monotone" dataKey="amount" stroke="hsl(var(--primary))" strokeWidth={3} dot={{r: 4, fill: "hsl(var(--primary))"}} activeDot={{r: 6}} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-border flex flex-col justify-center">
          <h2 className="text-lg font-display font-bold mb-4">AI Insights</h2>
          <div className="space-y-4">
            <div className="p-4 bg-primary/10 rounded-xl border border-primary/20">
              <span className="text-lg">💡</span>
              <p className="text-sm text-foreground mt-2">
                You spent most on <span className="font-bold">{mostActiveCategory}</span>, accounting for <span className="font-bold">{highestCatPercent}%</span> of your total expenses.
              </p>
            </div>
            <div className="p-4 bg-sky-500/10 rounded-xl border border-sky-500/20">
              <span className="text-lg">📊</span>
              <p className="text-sm text-foreground mt-2">
                Your average expense is <span className="font-bold">${avgExpense.toFixed(2)}</span>. Consider setting a cap on individual purchases to lower this.
              </p>
            </div>
            <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
              <span className="text-lg">🔥</span>
              <p className="text-sm text-foreground mt-2">
                Your highest single expense was <span className="font-bold">${highestExpense.toFixed(2)}</span>. Review large purchases to ensure they fit your budget.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-border">
          <h2 className="text-lg font-display font-bold mb-4">Category Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[entry.name] || "#ccc"} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-border">
          <h2 className="text-lg font-display font-bold mb-4">Totals by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#eee" />
              <XAxis type="number" axisLine={false} tickLine={false} tickFormatter={(val) => `$${val}`} />
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} />
              <Tooltip cursor={{fill: '#f5f5f5'}} formatter={(value: number) => `$${value.toFixed(2)}`} />
              <Bar dataKey="amount" radius={[0, 4, 4, 0]}>
                {barData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[entry.name] || "hsl(var(--primary))"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </AppShell>
  );
}