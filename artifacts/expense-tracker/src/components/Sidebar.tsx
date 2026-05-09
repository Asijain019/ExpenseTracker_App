import { LayoutDashboard, Receipt, PieChart, Settings } from "lucide-react";

export function Sidebar() {
  return (
    <div className="w-64 bg-sidebar text-sidebar-foreground h-full min-h-screen flex flex-col p-6 sticky top-0">
      <div className="flex items-center gap-2 mb-12">
        <span className="text-2xl">💰</span>
        <h2 className="text-2xl font-display font-bold text-white">SpendSmart</h2>
      </div>

      <nav className="flex flex-col gap-2 flex-1">
        <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary text-primary-foreground font-medium transition-colors">
          <LayoutDashboard className="w-5 h-5" />
          Dashboard
        </a>
        <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-sidebar-accent text-sidebar-foreground/70 hover:text-sidebar-accent-foreground font-medium transition-colors">
          <Receipt className="w-5 h-5" />
          Expenses
        </a>
        <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-sidebar-accent text-sidebar-foreground/70 hover:text-sidebar-accent-foreground font-medium transition-colors">
          <PieChart className="w-5 h-5" />
          Analytics
        </a>
        <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-sidebar-accent text-sidebar-foreground/70 hover:text-sidebar-accent-foreground font-medium transition-colors">
          <Settings className="w-5 h-5" />
          Settings
        </a>
      </nav>

      <div className="mt-auto pt-8 text-sm text-sidebar-foreground/40 text-center relative">
        <svg className="absolute -top-10 left-1/2 -translate-x-1/2 w-12 h-12 opacity-20 text-accent" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4">
          <path d="M10 50 Q 30 10 50 50 T 90 50" />
        </svg>
        <p>Version 1.0.0</p>
      </div>
    </div>
  );
}
