import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Expense } from "@/types/expense";
import { loadExpenses, saveExpenses } from "@/lib/expenseStorage";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Trash2, Download, ArrowUpDown } from "lucide-react";

interface ExpensesPageProps { onLogout: () => void; }

const CATEGORY_COLORS: Record<string, string> = {
  Food: "#F97316",
  Travel: "#0EA5E9",
  Marketing: "#8B5CF6",
  Utilities: "#14B8A6",
  Other: "#F59E0B"
};

export function ExpensesPage({ onLogout }: ExpensesPageProps) {
  const [expenses, setExpenses] = useState<Expense[]>(loadExpenses);
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [dateFilter, setDateFilter] = useState<string>("All Time");
  const [sortField, setSortField] = useState<keyof Expense>("createdAt");
  const [sortAsc, setSortAsc] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleDeleteExpense = (id: string) => {
    const updated = expenses.filter(e => e.id !== id);
    setExpenses(updated);
    saveExpenses(updated);
  };

  const handleDownloadCSV = () => {
    const headers = ["Name,Category,Amount,Date"];
    const rows = expenses.map(e => `"${e.name}",${e.category},${e.amount},${new Date(e.createdAt).toLocaleDateString()}`);
    const csv = headers.concat(rows).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "expenses.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredExpenses = expenses.filter(e => {
    if (categoryFilter !== "All" && e.category !== categoryFilter) return false;
    if (searchQuery && !e.name.toLowerCase().includes(searchQuery.toLowerCase()) && !e.category.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    if (dateFilter === "This Week") {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      if (new Date(e.createdAt) < oneWeekAgo) return false;
    } else if (dateFilter === "This Month") {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      if (new Date(e.createdAt) < oneMonthAgo) return false;
    }
    return true;
  });

  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    let valA = a[sortField];
    let valB = b[sortField];
    
    if (sortField === "createdAt") {
      valA = new Date(a.createdAt).getTime();
      valB = new Date(b.createdAt).getTime();
    }
    
    if (valA < valB) return sortAsc ? -1 : 1;
    if (valA > valB) return sortAsc ? 1 : -1;
    return 0;
  });

  const toggleSort = (field: keyof Expense) => {
    if (sortField === field) setSortAsc(!sortAsc);
    else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  // Chart Data
  const pieData = Object.entries(
    filteredExpenses.reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }));

  const barData = [...filteredExpenses]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5)
    .map(e => ({ name: e.name, amount: e.amount }));

  return (
    <AppShell onLogout={onLogout} searchQuery={searchQuery} setSearchQuery={setSearchQuery}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Expense Report</h1>
          <p className="text-muted-foreground">Complete overview of your spending</p>
        </div>
        <button 
          onClick={handleDownloadCSV}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-lg shadow-sm hover:bg-muted transition-colors font-medium text-sm"
        >
          <Download className="w-4 h-4" />
          Download Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-border">
          <h2 className="text-lg font-display font-bold mb-4">Spending by Category</h2>
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
          <h2 className="text-lg font-display font-bold mb-4">Top 5 Expenses</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} tickFormatter={(val) => `$${val}`} />
              <Tooltip cursor={{fill: '#f5f5f5'}} formatter={(value: number) => `$${value.toFixed(2)}`} />
              <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
        <div className="p-4 border-b border-border flex flex-wrap gap-4 items-center justify-between bg-muted/30">
          <div className="flex gap-4">
            <select 
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="px-3 py-1.5 bg-white border border-border rounded-lg text-sm"
            >
              <option value="All">All Categories</option>
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Marketing">Marketing</option>
              <option value="Utilities">Utilities</option>
              <option value="Other">Other</option>
            </select>
            
            <select 
              value={dateFilter}
              onChange={e => setDateFilter(e.target.value)}
              className="px-3 py-1.5 bg-white border border-border rounded-lg text-sm"
            >
              <option value="All Time">All Time</option>
              <option value="This Week">This Week</option>
              <option value="This Month">This Month</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground font-medium border-b border-border">
              <tr>
                <th className="px-6 py-3 cursor-pointer hover:text-foreground" onClick={() => toggleSort("name")}>
                  <div className="flex items-center gap-1">Expense <ArrowUpDown className="w-3 h-3" /></div>
                </th>
                <th className="px-6 py-3 cursor-pointer hover:text-foreground" onClick={() => toggleSort("category")}>
                  <div className="flex items-center gap-1">Category <ArrowUpDown className="w-3 h-3" /></div>
                </th>
                <th className="px-6 py-3 cursor-pointer hover:text-foreground" onClick={() => toggleSort("createdAt")}>
                  <div className="flex items-center gap-1">Date <ArrowUpDown className="w-3 h-3" /></div>
                </th>
                <th className="px-6 py-3 cursor-pointer hover:text-foreground" onClick={() => toggleSort("amount")}>
                  <div className="flex items-center gap-1">Amount <ArrowUpDown className="w-3 h-3" /></div>
                </th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedExpenses.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                    No expenses match your filters.
                  </td>
                </tr>
              ) : (
                sortedExpenses.map((expense) => (
                  <tr key={expense.id} className="border-b border-border last:border-0 hover:bg-muted/20">
                    <td className="px-6 py-4 font-medium">{expense.name}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-muted rounded-full text-xs font-medium">
                        {expense.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {new Date(expense.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 font-bold">
                      ${expense.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => handleDeleteExpense(expense.id)}
                        className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}