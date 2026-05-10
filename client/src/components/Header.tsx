import { Search, Bell, User } from "lucide-react";

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export function Header({ searchQuery, setSearchQuery }: HeaderProps) {
  return (
    <header className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">Hello, Alex!</h1>
        <p className="text-muted-foreground text-sm mt-1">Ready to track some expenses?</p>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search expenses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-2 bg-white rounded-full border border-border focus:outline-none focus:ring-2 focus:ring-primary w-64"
            data-testid="input-search"
          />
        </div>
        
        <button className="relative p-2 bg-white rounded-full border border-border text-foreground hover:bg-muted transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
        </button>

        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
          A
        </div>
      </div>
    </header>
  );
}
