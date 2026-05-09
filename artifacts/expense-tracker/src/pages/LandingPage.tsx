import { Link } from "wouter";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
          <span className="text-xl font-display font-bold text-foreground tracking-tight">Expense Tracker</span>
        </div>
        <div className="flex gap-4 items-center">
          <Link href="/login" className="font-medium text-foreground hover:text-primary transition-colors">
            Login
          </Link>
          <Link href="/login" className="bg-primary text-primary-foreground px-5 py-2 rounded-full font-medium shadow-sm hover:bg-primary/90 transition-colors">
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col justify-center items-center text-center px-6 pt-20 pb-32 relative">
        {/* Background decorations */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-20 left-10 w-32 h-32 bg-secondary/10 rounded-full blur-2xl pointer-events-none -z-10" />
        
        <h1 className="text-5xl md:text-7xl font-display font-extrabold text-foreground max-w-4xl leading-tight tracking-tight mb-6">
          Track Every Penny, <br/><span className="text-primary">Build Real Wealth</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
          The dead-simple expense tracker that actually makes you want to budget. Visual analytics, multiple currencies, and complete control over your money.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Link href="/login" className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto">
            Get Started Free
          </Link>
          <a href="#features" className="px-8 py-4 rounded-full font-bold text-lg text-foreground bg-muted hover:bg-muted/80 transition-colors w-full sm:w-auto">
            Learn More
          </a>
        </div>

        {/* Floating Doodles */}
        <svg className="absolute hidden md:block top-40 left-[10%] w-16 h-16 text-primary opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
        <svg className="absolute hidden md:block bottom-40 right-[15%] w-20 h-20 text-secondary opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
          <path d="M12 18V6" />
        </svg>
      </main>

      {/* Features Section */}
      <section id="features" className="bg-white py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">Why SpendSmart?</h2>
            <p className="text-muted-foreground mt-4 text-lg">Everything you need to master your finances.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Smart Tracking</h3>
              <p className="text-muted-foreground leading-relaxed">Log expenses in seconds with automatic categorization and smart defaults.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Live Currency</h3>
              <p className="text-muted-foreground leading-relaxed">Traveling? Convert expenses automatically with live exchange rates built right in.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Visual Analytics</h3>
              <p className="text-muted-foreground leading-relaxed">Understand your spending at a glance with beautiful, interactive charts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-sidebar text-sidebar-foreground py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxjaXJjbGUgY3g9IjEwIiBjeT0iMTAiIHI9IjEiIGZpbGw9IiNmZmZmZmYiLz4KPC9zdmc+')] mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative z-10">
          <div>
            <p className="text-5xl font-display font-bold text-primary mb-2">500+</p>
            <p className="text-lg opacity-80">Happy Users</p>
          </div>
          <div>
            <p className="text-5xl font-display font-bold text-secondary mb-2">10K+</p>
            <p className="text-lg opacity-80">Expenses Tracked</p>
          </div>
          <div>
            <p className="text-5xl font-display font-bold text-teal-400 mb-2">15</p>
            <p className="text-lg opacity-80">Currencies Supported</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 text-center px-6">
        <h2 className="text-4xl font-display font-bold mb-6">Ready to take control?</h2>
        <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">Join hundreds of others who have transformed their relationship with money.</p>
        <Link href="/login" className="inline-block bg-foreground text-background px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
          Start Tracking Now
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center text-muted-foreground">
        <p>© {new Date().getFullYear()} SpendSmart. All rights reserved.</p>
      </footer>
    </div>
  );
}