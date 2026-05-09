import { Link } from "wouter";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans overflow-x-hidden flex flex-col selection:bg-purple-200">
      {/* Section 1 - Navbar */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto w-full sticky top-0 z-50 bg-[#FDFDFD]/80 backdrop-blur-md border-b border-purple-100/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
          </div>
          <span className="text-2xl font-display font-bold text-slate-900 tracking-tight">Expense Tracker</span>
        </div>
        <div className="hidden md:flex items-center gap-8 font-medium text-slate-600">
          <a href="#features" className="hover:text-purple-600 transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-purple-600 transition-colors">How It Works</a>
          <a href="#pricing" className="hover:text-purple-600 transition-colors">Pricing</a>
        </div>
        <div className="flex gap-4 items-center">
          <Link href="/login" className="font-medium text-slate-700 hover:text-purple-600 transition-colors">
            Sign In
          </Link>
          <Link href="/login" className="bg-slate-900 text-white px-6 py-2.5 rounded-full font-medium shadow-md hover:bg-slate-800 transition-colors">
            Get Started Free
          </Link>
        </div>
      </nav>

      {/* Section 2 - Hero */}
      <main className="flex-1 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-20 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-400/20 rounded-full blur-3xl pointer-events-none -z-10" />
        
        <div className="md:w-1/2 text-left z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-100 text-purple-700 font-semibold text-sm mb-6 border border-purple-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            V1.0 is now live
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-6">
            Take Full Control <br/>of Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Finances</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-lg">
            Stop wondering where your money went. Track expenses, analyze trends, and build real wealth with the most beautiful finance app ever built.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/login" className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl shadow-purple-500/25 hover:-translate-y-1 transition-all duration-300 text-center">
              Start Free Today
            </Link>
            <button className="px-8 py-4 rounded-full font-bold text-lg text-slate-700 bg-white border-2 border-slate-200 hover:border-slate-300 transition-colors flex items-center justify-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              Watch Demo
            </button>
          </div>
        </div>

        <div className="md:w-1/2 mt-16 md:mt-0 relative">
          <div className="relative z-10 bg-white p-4 rounded-3xl shadow-2xl shadow-purple-900/10 border border-slate-100 transform rotate-2 hover:rotate-0 transition-transform duration-500">
            <svg viewBox="0 0 600 400" className="w-full h-auto rounded-2xl" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="600" height="400" rx="16" fill="#F8FAFC"/>
              <rect x="32" y="32" width="200" height="120" rx="16" fill="#FFF" filter="url(#drop)"/>
              <circle cx="72" cy="72" r="24" fill="#E0E7FF"/>
              <rect x="112" y="60" width="80" height="12" rx="6" fill="#CBD5E1"/>
              <rect x="112" y="80" width="40" height="10" rx="5" fill="#E2E8F0"/>
              <rect x="32" y="92" width="200" height="60" rx="0" fill="#FFF"/>
              <text x="50" y="130" fill="#0F172A" fontSize="32" fontWeight="bold">$4,250.00</text>
              
              <rect x="256" y="32" width="312" height="240" rx="16" fill="#FFF" filter="url(#drop)"/>
              <path d="M280 200 Q 330 150 380 180 T 480 100 T 550 120" stroke="#8B5CF6" strokeWidth="6" strokeLinecap="round" fill="none"/>
              <circle cx="550" cy="120" r="8" fill="#8B5CF6"/>
              <rect x="280" y="240" width="264" height="1" fill="#E2E8F0"/>

              <rect x="32" y="176" width="200" height="192" rx="16" fill="#FFF" filter="url(#drop)"/>
              <circle cx="132" cy="272" r="60" fill="none" stroke="#E2E8F0" strokeWidth="24"/>
              <path d="M132 212 A 60 60 0 0 1 192 272 L 132 272 Z" fill="none" stroke="#8B5CF6" strokeWidth="24"/>
              <path d="M192 272 A 60 60 0 0 1 132 332 L 132 272 Z" fill="none" stroke="#0EA5E9" strokeWidth="24"/>

              <defs>
                <filter id="drop" x="-10" y="-10" width="120%" height="120%">
                  <feDropShadow dx="0" dy="8" stdDeviation="12" floodOpacity="0.05"/>
                </filter>
              </defs>
            </svg>
          </div>

          <div className="absolute -top-10 -right-10 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4 animate-bounce" style={{animationDuration: '3s'}}>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-xl font-bold">🎉</span>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">$2,450 saved</p>
              <p className="text-xs text-slate-500">this month</p>
            </div>
          </div>
          <div className="absolute -bottom-10 -left-10 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4 animate-bounce" style={{animationDuration: '4s'}}>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">32% under budget</p>
              <p className="text-xs text-slate-500">Looking good!</p>
            </div>
          </div>
        </div>
      </main>

      {/* Section 3 - Trust bar */}
      <section className="border-y border-slate-200 bg-slate-50 py-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm font-bold tracking-widest uppercase text-slate-400 mb-6">Trusted by 10,000+ users worldwide</p>
          <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale">
            <svg className="h-8" viewBox="0 0 100 30" fill="currentColor"><text x="0" y="20" fontSize="20" fontWeight="bold">Acme Corp</text></svg>
            <svg className="h-8" viewBox="0 0 100 30" fill="currentColor"><text x="0" y="20" fontSize="20" fontWeight="bold">Globex</text></svg>
            <svg className="h-8" viewBox="0 0 100 30" fill="currentColor"><text x="0" y="20" fontSize="20" fontWeight="bold">Initech</text></svg>
            <svg className="h-8" viewBox="0 0 100 30" fill="currentColor"><text x="0" y="20" fontSize="20" fontWeight="bold">Soylent</text></svg>
          </div>
        </div>
      </section>

      {/* Section 4 - Features */}
      <section id="features" className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6">Everything you need to master your money</h2>
            <p className="text-xl text-slate-600">No bloat, no clutter. Just powerful tools designed to give you complete financial clarity.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:shadow-xl hover:border-purple-200 transition-all group">
              <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Smart Tracking</h3>
              <p className="text-slate-600">Log expenses instantly. Categorize automatically. Know exactly where your money goes.</p>
            </div>
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:shadow-xl hover:border-sky-200 transition-all group">
              <div className="w-14 h-14 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Live Currency</h3>
              <p className="text-slate-600">Support for 15+ currencies with real-time exchange rates. Perfect for travelers and digital nomads.</p>
            </div>
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:shadow-xl hover:border-emerald-200 transition-all group">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Visual Analytics</h3>
              <p className="text-slate-600">Beautiful, interactive charts that turn your raw data into actionable insights instantly.</p>
            </div>
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:shadow-xl hover:border-amber-200 transition-all group">
              <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Bank-level Security</h3>
              <p className="text-slate-600">Your financial data is encrypted and securely stored. We never sell your personal information.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 - How It Works */}
      <section id="how-it-works" className="py-32 px-6 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxjaXJjbGUgY3g9IjEwIiBjeT0iMTAiIHI9IjEiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=')] mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">How It Works</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">Three simple steps to financial freedom.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-purple-500/0 via-purple-500 to-purple-500/0"></div>
            
            <div className="text-center relative">
              <div className="w-24 h-24 bg-slate-800 border-4 border-purple-500 rounded-full mx-auto flex items-center justify-center text-3xl font-bold text-white mb-8 z-10 relative">1</div>
              <h3 className="text-2xl font-bold mb-4">Create Account</h3>
              <p className="text-slate-400">Sign up in seconds. No credit card required, completely free forever.</p>
            </div>
            <div className="text-center relative">
              <div className="w-24 h-24 bg-slate-800 border-4 border-purple-500 rounded-full mx-auto flex items-center justify-center text-3xl font-bold text-white mb-8 z-10 relative">2</div>
              <h3 className="text-2xl font-bold mb-4">Log Expenses</h3>
              <p className="text-slate-400">Add expenses on the go with our lightning-fast interface and quick categories.</p>
            </div>
            <div className="text-center relative">
              <div className="w-24 h-24 bg-slate-800 border-4 border-purple-500 rounded-full mx-auto flex items-center justify-center text-3xl font-bold text-white mb-8 z-10 relative">3</div>
              <h3 className="text-2xl font-bold mb-4">Get Insights</h3>
              <p className="text-slate-400">Watch your data transform into beautiful charts and actionable AI insights.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6 - Stats */}
      <section className="py-24 bg-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <div>
            <p className="text-5xl font-display font-bold mb-2">10K+</p>
            <p className="text-purple-200 font-medium">Active Users</p>
          </div>
          <div>
            <p className="text-5xl font-display font-bold mb-2">1M+</p>
            <p className="text-purple-200 font-medium">Expenses Tracked</p>
          </div>
          <div>
            <p className="text-5xl font-display font-bold mb-2">15</p>
            <p className="text-purple-200 font-medium">Currencies</p>
          </div>
          <div>
            <p className="text-5xl font-display font-bold mb-2">99.9%</p>
            <p className="text-purple-200 font-medium">Uptime</p>
          </div>
        </div>
      </section>

      {/* Section 7 - Testimonials */}
      <section className="py-32 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6">Loved by thousands</h2>
            <p className="text-xl text-slate-600">Don't just take our word for it.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <div className="flex gap-1 text-yellow-400 mb-6">
                {"★★★★★".split("").map((s,i)=><span key={i}>{s}</span>)}
              </div>
              <p className="text-slate-700 mb-8 text-lg leading-relaxed">"This is hands down the best expense tracker I've ever used. The UI is gorgeous and the analytics actually make sense."</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-purple-100">
                  <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#FFDBB5"/><circle cx="35" cy="45" r="5"/><circle cx="65" cy="45" r="5"/><path d="M40 65 Q50 75 60 65" stroke="black" strokeWidth="3" fill="transparent"/></svg>
                </div>
                <div>
                  <p className="font-bold text-slate-900">Sarah Jenkins</p>
                  <p className="text-sm text-slate-500">Freelance Designer</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <div className="flex gap-1 text-yellow-400 mb-6">
                {"★★★★★".split("").map((s,i)=><span key={i}>{s}</span>)}
              </div>
              <p className="text-slate-700 mb-8 text-lg leading-relaxed">"The multi-currency support is a game changer for me. I travel constantly and this keeps all my spending in check."</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-sky-100">
                  <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#8D5524"/><circle cx="35" cy="45" r="5"/><circle cx="65" cy="45" r="5"/><path d="M40 65 Q50 75 60 65" stroke="black" strokeWidth="3" fill="transparent"/></svg>
                </div>
                <div>
                  <p className="font-bold text-slate-900">Marcus Chen</p>
                  <p className="text-sm text-slate-500">Digital Nomad</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <div className="flex gap-1 text-yellow-400 mb-6">
                {"★★★★★".split("").map((s,i)=><span key={i}>{s}</span>)}
              </div>
              <p className="text-slate-700 mb-8 text-lg leading-relaxed">"Finally, a finance app that doesn't look like an Excel spreadsheet. It actually makes budgeting somewhat enjoyable!"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-emerald-100">
                  <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#F1C27D"/><circle cx="35" cy="45" r="5"/><circle cx="65" cy="45" r="5"/><path d="M40 65 Q50 75 60 65" stroke="black" strokeWidth="3" fill="transparent"/></svg>
                </div>
                <div>
                  <p className="font-bold text-slate-900">Emily Rodriguez</p>
                  <p className="text-sm text-slate-500">Small Business Owner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8 - CTA */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-indigo-700 -z-10" />
        <div className="absolute top-0 right-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxjaXJjbGUgY3g9IjEwIiBjeT0iMTAiIHI9IjEiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=')] mix-blend-overlay"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl font-display font-bold text-white mb-8">Ready to Master Your Money?</h2>
          <p className="text-2xl text-purple-100 mb-12">Join 10,000+ users who have already taken control of their financial future.</p>
          <Link href="/login" className="inline-block bg-white text-purple-600 px-10 py-5 rounded-full font-bold text-xl shadow-2xl hover:scale-105 transition-transform duration-300">
            Get Started for Free
          </Link>
          <p className="text-purple-200 mt-6 font-medium">No credit card required. Setup takes 30 seconds.</p>
        </div>
      </section>

      {/* Section 9 - Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
            </div>
            <span className="text-xl font-display font-bold text-white tracking-tight">Expense Tracker</span>
          </div>
          <div className="flex gap-8 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          <p className="text-sm">© {new Date().getFullYear()} Expense Tracker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}