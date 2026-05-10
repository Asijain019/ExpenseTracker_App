import { useLocation, Link } from "wouter";
import { LayoutDashboard, Receipt, BarChart2, Settings, LogOut } from "lucide-react";
import { AvatarDisplay } from "./AvatarDisplay";
import { LogoIcon } from "./Logo";

interface AppShellProps {
  children: React.ReactNode;
  onLogout: () => void;
  searchQuery?: string;
  setSearchQuery?: (q: string) => void;
  user?: any;
}

export function AppShell({ children, onLogout, searchQuery, setSearchQuery, user }: AppShellProps) {
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
        <Link href="/" className="flex items-center gap-3 mb-12 cursor-pointer group">
          <LogoIcon size={36} />
          <div>
            <span className="text-base font-bold text-white leading-tight block">Expense</span>
            <span className="text-base font-bold text-white/70 leading-tight block">Tracker</span>
          </div>
        </Link>

        {/* Nav */}
        <nav className="flex flex-col gap-1.5 flex-1">
          {navItems.map(({ path, label, icon: Icon }) => {
            const isActive = location === path;
            return (
              <Link
                key={path}
                href={path}
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

        {/* Logout */}
        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sidebar-foreground/50 hover:text-destructive hover:bg-destructive/10 transition-colors mt-4"
          data-testid="button-logout"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
        <p className="text-xs text-sidebar-foreground/30 text-center mt-4">v1.0.0</p>
      </div>

      {/* Main */}
      <main className="flex-1 min-w-0 p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          {setSearchQuery ? (
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                value={searchQuery ?? ""}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search expenses..."
                className="pl-10 pr-4 py-2 bg-white border border-border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary w-64"
                data-testid="input-search"
              />
            </div>
          ) : (
            <div />
          )}
          <div className="flex items-center gap-3">
            {user?.name && (
              <span className="text-sm font-medium text-foreground">{user.name}</span>
            )}
            <AvatarDisplay avatarId={user?.avatar || "1"} size={36} />
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}
