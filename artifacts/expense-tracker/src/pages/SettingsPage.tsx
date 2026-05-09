import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { saveExpenses } from "@/lib/expenseStorage";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { User, Bell, Download, Trash2, Shield, CreditCard } from "lucide-react";

interface SettingsPageProps { onLogout: () => void; }

export function SettingsPage({ onLogout }: SettingsPageProps) {
  const [currency, setCurrency] = useState(() => localStorage.getItem("et_currency") || "USD");
  const { toast } = useToast();

  const handleClearExpenses = () => {
    saveExpenses([]);
    toast({
      title: "Expenses Cleared",
      description: "All your expense data has been deleted.",
    });
    // Optional: force reload or state update if we relied on a global context
    window.location.reload(); 
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setCurrency(val);
    localStorage.setItem("et_currency", val);
    toast({
      title: "Currency Updated",
      description: `Default currency is now ${val}`,
    });
  };

  return (
    <AppShell onLogout={onLogout}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your preferences</p>
        </div>

        <div className="space-y-6">
          
          {/* Profile Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
            <div className="p-6 border-b border-border flex items-center gap-3">
              <User className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-display font-bold">Profile</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-2xl shadow-inner">
                  A
                </div>
                <div>
                  <button className="px-4 py-2 bg-muted text-foreground rounded-lg font-medium text-sm hover:bg-muted/80 transition-colors">
                    Change Avatar
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Name</label>
                  <input defaultValue="Alex" className="w-full px-3 py-2 border border-border rounded-lg bg-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Email</label>
                  <input defaultValue="alex@example.com" type="email" className="w-full px-3 py-2 border border-border rounded-lg bg-white" />
                </div>
              </div>
              <div className="flex justify-end">
                <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          </div>

          {/* Currency Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
            <div className="p-6 border-b border-border flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-sky-500" />
              <h2 className="text-xl font-display font-bold">Currency Preferences</h2>
            </div>
            <div className="p-6">
              <label className="block text-sm font-medium text-foreground mb-1">Default Currency</label>
              <select 
                value={currency} 
                onChange={handleCurrencyChange}
                className="w-full max-w-xs px-3 py-2 border border-border rounded-lg bg-white"
              >
                {["USD", "EUR", "GBP", "INR", "AUD", "CAD", "JPY"].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <p className="text-sm text-muted-foreground mt-2">This currency will be used as the base for conversions.</p>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
            <div className="p-6 border-b border-border flex items-center gap-3">
              <Bell className="w-5 h-5 text-amber-500" />
              <h2 className="text-xl font-display font-bold">Notifications</h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-foreground">Weekly Summary</h4>
                  <p className="text-sm text-muted-foreground">Receive a weekly email with your spending summary.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-foreground">New Expense Reminder</h4>
                  <p className="text-sm text-muted-foreground">Get reminded to log expenses every evening.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Data Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
            <div className="p-6 border-b border-border flex items-center gap-3">
              <Shield className="w-5 h-5 text-purple-500" />
              <h2 className="text-xl font-display font-bold">Data Management</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-border">
                <div>
                  <h4 className="font-medium text-foreground">Export Data</h4>
                  <p className="text-sm text-muted-foreground">Download all your expenses as a CSV file.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border border-border bg-white text-foreground rounded-lg hover:bg-muted transition-colors font-medium">
                  <Download className="w-4 h-4" /> Export CSV
                </button>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h4 className="font-medium text-foreground">Clear All Data</h4>
                  <p className="text-sm text-muted-foreground">Permanently delete all your expenses. This cannot be undone.</p>
                </div>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className="flex items-center gap-2 px-4 py-2 bg-destructive/10 text-destructive border border-destructive/20 rounded-lg hover:bg-destructive/20 transition-colors font-medium">
                      <Trash2 className="w-4 h-4" /> Clear Data
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your expense data from local storage.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleClearExpenses} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                        Yes, delete data
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="text-center py-6 text-sm text-muted-foreground">
            <p className="font-medium">Expense Tracker v1.0.0</p>
            <p className="opacity-70 mt-1">Built with React, Recharts & Tailwind CSS</p>
          </div>

        </div>
      </div>
    </AppShell>
  );
}