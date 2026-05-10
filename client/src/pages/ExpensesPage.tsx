import { useState, useEffect } from "react";
import { AppShell } from "@/components/AppShell";
import { Expense } from "@/types/expense";
import { api } from "@/lib/api";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Trash2, Download, ArrowUpDown, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ExpensesPageProps { onLogout: () => void; user: any; }

const CATEGORY_COLORS: Record<string, string> = {
  Food: "#F97316",
  Travel: "#0EA5E9",
  Marketing: "#8B5CF6",
  Utilities: "#14B8A6",
  Other: "#F59E0B"
};

export function ExpensesPage({ onLogout, user }: ExpensesPageProps) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [dateFilter, setDateFilter] = useState<string>("All Time");
  const [sortField, setSortField] = useState<keyof Expense>("createdAt");
  const [sortAsc, setSortAsc] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    let mounted = true;
    api.getExpenses().then(data => {
      if(mounted) {
        setExpenses(data);
        setLoading(false);
      }
    }).catch(() => {
      if(mounted) {
        toast({ title: "Failed to load data", variant: "destructive" });
        setLoading(false);
      }
    });
    return () => { mounted = false; };
  }, [toast]);

  const handleDeleteExpense = async (id: string) => {
    try {
      await api.deleteExpense(id);
      setExpenses(expenses.filter(e => e.id !== id));
      toast({ title: "Expense deleted" });
    } catch(e) {
      toast({ title: "Failed to delete expense", variant: "destructive" });
    }
  };

  const handleDownloadCSV = () => {
    const headers = ["Name,Category,Amount,Date"];
    const rows = expenses.map(e => `"${e.name}","${e.category}","$${Number(e.amount).toFixed(2)}","${new Date(e.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}"`);
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
    if (sortField === "amount") {
      valA = Number(a.amount);
      valB = Number(b.amount);
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
      acc[exp.category] = (acc[exp.category] || 0) + Number(exp.amount);
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }));

  const barData = [...filteredExpenses]
    .sort((a, b) => Number(b.amount) - Number(a.amount))
    .slice(0, 5)
    .map(e => ({ name: e.name, amount: Number(e.amount) }));

  return (
    <AppShell onLogout={onLogout} searchQuery={searchQuery} setSearchQuery={setSearchQuery} user={user}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">Expense Report</h1>
          <p className="text-slate-500">Complete overview of your spending history</p>
        </div>
        <button 
          onClick={handleDownloadCSV}
          className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl shadow-sm hover:bg-slate-50 transition-colors font-bold text-slate-700"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
              <h2 className="text-xl font-display font-bold mb-6 text-slate-900">Spending by Category</h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[entry.name] || "#ccc"} stroke="none"/>
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                  <Legend iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
              <h2 className="text-xl font-display font-bold mb-6 text-slate-900">Top 5 Expenses</h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: "#64748b"}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: "#64748b"}} tickFormatter={(val) => `$${val}`} dx={-10}/>
                  <Tooltip cursor={{fill: '#f8fafc'}} formatter={(value: number) => `$${value.toFixed(2)}`} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                  <Bar dataKey="amount" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex flex-wrap gap-4 items-center justify-between bg-slate-50">
              <div className="flex gap-4">
                <select 
                  value={categoryFilter}
                  onChange={e => setCategoryFilter(e.target.value)}
                  className="px-4 py-2 bg-white border border-slate-200 rounded-xl font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                  className="px-4 py-2 bg-white border border-slate-200 rounded-xl font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="All Time">All Time</option>
                  <option value="This Week">This Week</option>
                  <option value="This Month">This Month</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-white text-slate-500 font-bold border-b border-slate-100 uppercase tracking-wider text-xs">
                  <tr>
                    <th className="px-6 py-4 cursor-pointer hover:text-slate-900 transition-colors" onClick={() => toggleSort("name")}>
                      <div className="flex items-center gap-1">Expense Name <ArrowUpDown className="w-3 h-3" /></div>
                    </th>
                    <th className="px-6 py-4 cursor-pointer hover:text-slate-900 transition-colors" onClick={() => toggleSort("category")}>
                      <div className="flex items-center gap-1">Category <ArrowUpDown className="w-3 h-3" /></div>
                    </th>
                    <th className="px-6 py-4 cursor-pointer hover:text-slate-900 transition-colors" onClick={() => toggleSort("createdAt")}>
                      <div className="flex items-center gap-1">Date <ArrowUpDown className="w-3 h-3" /></div>
                    </th>
                    <th className="px-6 py-4 cursor-pointer hover:text-slate-900 transition-colors" onClick={() => toggleSort("amount")}>
                      <div className="flex items-center gap-1">Amount <ArrowUpDown className="w-3 h-3" /></div>
                    </th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedExpenses.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                          <svg className="w-8 h-8 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">No expenses found</h3>
                        <p className="text-slate-500">Try adjusting your filters or search query.</p>
                      </td>
                    </tr>
                  ) : (
                    sortedExpenses.map((expense) => (
                      <tr key={expense.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors group">
                        <td className="px-6 py-5 font-bold text-slate-900">{expense.name}</td>
                        <td className="px-6 py-5">
                          <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold uppercase tracking-wider">
                            {expense.category}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-slate-500 font-medium">
                          {new Date(expense.createdAt).toLocaleDateString(undefined, {month:'short', day:'numeric', year:'numeric'})}
                        </td>
                        <td className="px-6 py-5 font-display font-bold text-base text-slate-900">
                          ${Number(expense.amount).toFixed(2)}
                        </td>
                        <td className="px-6 py-5 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => handleDeleteExpense(expense.id)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors inline-flex"
                            title="Delete"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </AppShell>
  );
}