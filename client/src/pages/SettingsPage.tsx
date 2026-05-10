import { useState, useRef } from "react";
import { AppShell } from "@/components/AppShell";
import { AvatarDisplay, AVATARS } from "@/components/AvatarDisplay";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { User, Bell, Download, Trash2, Shield, CreditCard, Camera } from "lucide-react";
import { Loader2 } from "lucide-react";

interface SettingsPageProps { onLogout: () => void; user: any; onUpdateUser: (u: any) => void; }

export function SettingsPage({ onLogout, user, onUpdateUser }: SettingsPageProps) {
  const [currency, setCurrency] = useState(() => localStorage.getItem("et_currency") || "USD");
  const { toast } = useToast();
  
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [avatarId, setAvatarId] = useState(user?.avatar || "1");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      const updated = await api.updateProfile({ name, email, avatar: avatarId });
      onUpdateUser(updated);
      toast({ title: "Profile updated successfully" });
    } catch (e) {
      toast({ title: "Failed to update profile", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleClearExpenses = async () => {
    toast({ title: "Expenses cleared (not implemented in API demo)" });
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setCurrency(val);
    localStorage.setItem("et_currency", val);
    toast({ title: "Currency Updated", description: `Default currency is now ${val}` });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarId(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExportCSV = async () => {
    try {
      const expenses = await api.getExpenses();
      const headers = ["Name,Category,Amount,Date"];
      const rows = expenses.map((e: any) => `"${e.name}","${e.category}","$${Number(e.amount).toFixed(2)}","${new Date(e.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}"`);
      const csv = headers.concat(rows).join("\n");
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expenses.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch(e) {
      toast({ title: "Failed to export data", variant: "destructive" });
    }
  };

  return (
    <AppShell onLogout={onLogout} user={user}>
      <div className="max-w-4xl mx-auto pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-slate-900">Settings</h1>
          <p className="text-slate-500">Manage your preferences and profile.</p>
        </div>

        <div className="space-y-6">
          {/* Profile Section */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
                <User className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-display font-bold text-slate-900">Profile</h2>
            </div>
            <div className="p-8 space-y-8">
              <div className="flex flex-col items-center sm:items-start sm:flex-row gap-8">
                <div className="relative group">
                  <AvatarDisplay avatarId={avatarId} size={100} className="shadow-lg" />
                </div>
                <div className="flex-1 space-y-4">
                  <h3 className="font-bold text-slate-900">Choose an Avatar</h3>
                  <div className="flex gap-3 flex-wrap">
                    {Object.keys(AVATARS).map(id => (
                      <button 
                        key={id} 
                        onClick={() => setAvatarId(id)}
                        className={`transition-all rounded-full p-1 ${avatarId === id ? 'ring-2 ring-purple-500 ring-offset-2 scale-110' : 'hover:scale-105 hover:shadow-md'}`}
                      >
                        <AvatarDisplay avatarId={id} size={40} />
                      </button>
                    ))}
                  </div>
                  <div>
                    <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
                    <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 text-sm font-medium text-slate-600 bg-slate-100 px-4 py-2 rounded-full hover:bg-slate-200 transition-colors">
                      <Camera className="w-4 h-4" /> Or upload photo
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                  <input value={name} onChange={e=>setName(e.target.value)} className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all font-medium text-slate-900" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                  <input value={email} onChange={e=>setEmail(e.target.value)} type="email" className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all font-medium text-slate-900" />
                </div>
              </div>
              
              <div className="flex justify-end pt-2">
                <button onClick={handleSaveProfile} disabled={loading} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors flex items-center gap-2 disabled:opacity-70">
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  Save Changes
                </button>
              </div>
            </div>
          </div>

          {/* Currency Section */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center text-sky-600">
                <CreditCard className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-display font-bold text-slate-900">Preferences</h2>
            </div>
            <div className="p-8">
              <label className="block text-sm font-bold text-slate-700 mb-2">Default Currency</label>
              <select 
                value={currency} 
                onChange={handleCurrencyChange}
                className="w-full max-w-xs px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {["USD", "EUR", "GBP", "INR", "AUD", "CAD", "JPY"].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <p className="text-sm text-slate-500 mt-2 font-medium">This currency will be used as the base for conversions.</p>
            </div>
          </div>

          {/* Data Section */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                <Shield className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-display font-bold text-slate-900">Data Management</h2>
            </div>
            <div className="p-8 space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-100">
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Export Data</h4>
                  <p className="text-sm text-slate-500 font-medium">Download all your expenses as a CSV file.</p>
                </div>
                <button onClick={handleExportCSV} className="flex items-center gap-2 px-6 py-3 border-2 border-slate-200 bg-white text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-bold shadow-sm">
                  <Download className="w-4 h-4" /> Export CSV
                </button>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h4 className="font-bold text-red-600 mb-1">Clear All Data</h4>
                  <p className="text-sm text-slate-500 font-medium">Permanently delete all your expenses. This cannot be undone.</p>
                </div>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className="flex items-center gap-2 px-6 py-3 bg-red-50 text-red-600 border border-red-200 rounded-xl hover:bg-red-100 transition-colors font-bold">
                      <Trash2 className="w-4 h-4" /> Clear Data
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="rounded-3xl p-6">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="font-display font-bold text-2xl">Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription className="text-base">
                        This action cannot be undone. This will permanently delete your expense data.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-6">
                      <AlertDialogCancel className="rounded-xl font-bold py-3">Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleClearExpenses} className="bg-red-600 text-white hover:bg-red-700 rounded-xl font-bold py-3">
                        Yes, delete data
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}