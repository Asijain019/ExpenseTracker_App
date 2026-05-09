import { useLocation, Link } from "wouter";
import { LayoutDashboard, Receipt, BarChart2, Settings, LogOut } from "lucide-react";

interface AppShellProps {
  children: React.ReactNode;
  onLogout: () => void;
  searchQuery?: string;
  setSearchQuery?: (q: string) => void;
}

export function AppShell({ children, onLogout, searchQuery, setSearchQuery }: AppShellProps) {
  const [location] = useLocation();
  
  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/expenses", label: "Expenses", icon: Receipt },
    { path: "/analytics", label: "Analytics", icon: BarChart2 },
    { path: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 bg-sidebar text-sidebar-foreground min-h-screen flex flex-col p-6 sticky top-0 shrink-0">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 mb-12 cursor-pointer">
          <img src="/logo.png" alt="Expense Tracker" className="w-10 h-10 object-contain" />
          <span className="text-lg font-display font-bold text-white leading-tight">Expense<br/>Tracker</span>
        </Link>

        {/* Nav */}
        <nav className="flex flex-col gap-2 flex-1">
          {navItems.map(({ path, label, icon: Icon }) => {
            const isActive = location === path;
            return (
              <Link key={path} href={path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30" 
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-white"
                }`}
                data-testid={`nav-${label.toLowerCase()}`}
              >
                <Icon className="w-5 h-5" />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Decorative squiggle */}
        <svg className="absolute bottom-24 left-6 w-12 h-8 opacity-20 text-accent" viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="4">
          <path d="M5 25 Q 25 5 50 25 T 95 25" />
        </svg>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sidebar-foreground/50 hover:text-destructive hover:bg-destructive/10 transition-colors mt-4"
          data-testid="button-logout"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
        <p className="text-xs text-sidebar-foreground/30 text-center mt-4">Version 1.0.0</p>
      </div>

      {/* Main */}
      <main className="flex-1 min-w-0 p-8 overflow-y-auto">
        {/* Header with search */}
        <div className="flex items-center justify-between mb-8">
          {setSearchQuery ? (
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <input
                value={searchQuery ?? ""}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search expenses..."
                className="pl-10 pr-4 py-2 bg-white border border-border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary w-64"
                data-testid="input-search"
              />
            </div>
          ) : <div />}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">A</div>
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}