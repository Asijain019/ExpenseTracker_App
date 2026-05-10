import { Link } from "wouter";
import { Logo } from "@/components/Logo";

const HERO_IMG = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80";
const FEATURE_IMG = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80";

const dicebear = (seed: string, bg: string) =>
  `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=${bg}&radius=50`;

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden flex flex-col selection:bg-violet-200">

      {/* ── Navbar ── */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <Logo size="md" />
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <a href="#features" className="hover:text-violet-600 transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-violet-600 transition-colors">How It Works</a>
          <a href="#testimonials" className="hover:text-violet-600 transition-colors">Reviews</a>
        </div>
        <div className="flex gap-3 items-center">
          <Link href="/login" className="text-sm font-semibold text-slate-700 hover:text-violet-600 transition-colors">
            Sign In
          </Link>
          <Link
            href="/login"
            className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-md shadow-violet-500/20 transition-all hover:-translate-y-0.5"
          >
            Get Started Free
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative flex flex-col lg:flex-row items-center gap-12 max-w-7xl mx-auto px-6 pt-20 pb-28">
        <div className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-violet-100 rounded-full blur-3xl opacity-40 pointer-events-none" />
        <div className="absolute top-40 right-0 w-[400px] h-[400px] bg-indigo-100 rounded-full blur-3xl opacity-40 pointer-events-none" />

        {/* Left */}
        <div className="lg:w-1/2 z-10 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs font-bold mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
            </span>
            Free — No credit card needed
          </div>
          <h1 className="text-5xl lg:text-[4.25rem] font-extrabold text-slate-900 leading-[1.08] tracking-tight mb-6">
            Take Full Control<br />of Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-500">
              Finances
            </span>
          </h1>
          <p className="text-xl text-slate-500 mb-10 leading-relaxed max-w-lg mx-auto lg:mx-0">
            Stop wondering where your money went. Track expenses, visualize trends, and build lasting wealth with the most beautiful finance app ever made.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              href="/login"
              className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl shadow-violet-500/25 hover:-translate-y-1 transition-all duration-200 text-center"
            >
              Start Free Today
            </Link>
            <a
              href="#how-it-works"
              className="px-8 py-4 rounded-full font-bold text-lg text-slate-700 bg-white border-2 border-slate-200 hover:border-violet-300 hover:text-violet-600 transition-all text-center"
            >
              See How It Works
            </a>
          </div>
          <div className="flex items-center gap-4 mt-8 justify-center lg:justify-start">
            <div className="flex -space-x-2.5">
              {["Felix","Maria","James","Sofia"].map((s, i) => (
                <img
                  key={i}
                  src={dicebear(s, ["b6e3f4","c0aede","ffd5dc","d1d4f9"][i])}
                  className="w-9 h-9 rounded-full border-2 border-white"
                  alt={s}
                />
              ))}
            </div>
            <p className="text-sm text-slate-500 font-medium">
              <span className="font-bold text-slate-900">10,000+</span> people already saving smarter
            </p>
          </div>
        </div>

        {/* Right — Dashboard image */}
        <div className="lg:w-1/2 z-10 relative">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/15 border border-slate-100 rotate-1 hover:rotate-0 transition-transform duration-500">
            <img src={HERO_IMG} alt="Finance dashboard" className="w-full h-auto object-cover" />
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-900/20 to-transparent" />
          </div>
          {/* Floating badge 1 */}
          <div className="absolute -top-5 -left-5 bg-white rounded-2xl shadow-xl border border-slate-100 px-4 py-3 flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-lg">💰</div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Monthly savings</p>
              <p className="text-sm font-bold text-slate-900">+$2,450</p>
            </div>
          </div>
          {/* Floating badge 2 */}
          <div className="absolute -bottom-5 -right-4 bg-white rounded-2xl shadow-xl border border-slate-100 px-4 py-3 flex items-center gap-3">
            <div className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-violet-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Under budget</p>
              <p className="text-sm font-bold text-violet-600">32% this month</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Feature strip ── */}
      <section id="features" className="bg-slate-50 border-y border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: "💳", label: "Smart Tracking", desc: "Log & categorize instantly" },
            { icon: "🌍", label: "15+ Currencies", desc: "Real-time exchange rates" },
            { icon: "📊", label: "Visual Analytics", desc: "Charts that make sense" },
            { icon: "🔒", label: "Bank Security", desc: "Encrypted at rest & in transit" },
          ].map((f) => (
            <div key={f.label} className="flex items-start gap-4">
              <div className="text-3xl mt-0.5">{f.icon}</div>
              <div>
                <p className="font-bold text-slate-900 text-sm">{f.label}</p>
                <p className="text-slate-500 text-xs mt-0.5">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features detail ── */}
      <section className="py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-violet-600 font-bold text-sm uppercase tracking-widest mb-3">Everything in one place</p>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
              Built for people who want clarity
            </h2>
            <p className="text-lg text-slate-500 mt-4">
              No complexity. No bloat. Powerful tools that actually help you understand your money.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                color: "bg-violet-50 border-violet-100",
                iconBg: "bg-violet-100 text-violet-600",
                icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
                title: "Expense Tracking",
                desc: "Add, categorize, and manage all your expenses in seconds. Filter by date, category, and amount. Export to CSV anytime.",
              },
              {
                color: "bg-sky-50 border-sky-100",
                iconBg: "bg-sky-100 text-sky-600",
                icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
                title: "Rich Analytics",
                desc: "Daily, weekly, and monthly views. Bar charts, pie charts, category breakdowns. AI-powered spending insights you can act on.",
              },
              {
                color: "bg-emerald-50 border-emerald-100",
                iconBg: "bg-emerald-100 text-emerald-600",
                icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>,
                title: "Multi-Currency",
                desc: "Live exchange rates for 15+ currencies. Perfect for travelers, remote workers, and global teams tracking expenses.",
              },
            ].map((card) => (
              <div key={card.title} className={`rounded-2xl border p-8 hover:shadow-lg transition-all group ${card.color}`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform ${card.iconBg}`}>
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{card.title}</h3>
                <p className="text-slate-600 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Split section with image ── */}
      <section className="py-24 px-6 bg-violet-50">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 relative">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-violet-100">
              <img src={FEATURE_IMG} alt="Analytics on laptop" className="w-full h-auto object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-lg border border-slate-100 p-4">
              <p className="text-xs text-slate-500 font-medium mb-1">Average savings</p>
              <p className="text-2xl font-extrabold text-violet-600">$847/mo</p>
              <div className="flex items-center gap-1 mt-1">
                <svg className="w-3 h-3 text-green-500" viewBox="0 0 24 24" fill="currentColor"><polyline points="18 15 12 9 6 15"/></svg>
                <span className="text-xs text-green-600 font-bold">+23% vs last month</span>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <p className="text-violet-600 font-bold text-sm uppercase tracking-widest mb-3">Why teams love it</p>
            <h2 className="text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
              Designed to make budgeting actually enjoyable
            </h2>
            <div className="space-y-5">
              {[
                { icon: "⚡", title: "Instant setup", desc: "Create your account and add your first expense in under 60 seconds. No tutorials needed." },
                { icon: "📅", title: "Calendar view", desc: "See your expenses plotted on a calendar. Spot heavy-spending days at a glance." },
                { icon: "🤖", title: "Smart insights", desc: "Our AI analysis highlights unusual spending, top categories, and savings opportunities." },
                { icon: "📤", title: "CSV export", desc: "Export all your expenses anytime. Your data, always yours — never locked in." },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="text-2xl mt-0.5 shrink-0">{item.icon}</div>
                  <div>
                    <p className="font-bold text-slate-900">{item.title}</p>
                    <p className="text-slate-500 text-sm mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/login"
              className="inline-block mt-8 bg-violet-600 hover:bg-violet-700 text-white px-7 py-3.5 rounded-full font-bold shadow-lg shadow-violet-500/20 transition-all hover:-translate-y-0.5"
            >
              Try It Free
            </Link>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how-it-works" className="py-28 px-6 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-violet-900/30 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <p className="text-violet-400 font-bold text-sm uppercase tracking-widest mb-3">Simple as 1-2-3</p>
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-4">How It Works</h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">Three steps to total financial clarity.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-10 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
            {[
              { num: "01", title: "Create Your Account", desc: "Sign up in under 30 seconds. Free forever — no credit card, no hidden fees." },
              { num: "02", title: "Add Your Expenses", desc: "Log spending instantly with quick categories: food, travel, bills, entertainment, and more." },
              { num: "03", title: "Gain Real Insights", desc: "Watch your raw data transform into beautiful charts and actionable AI-powered insights." },
            ].map((step) => (
              <div key={step.num} className="text-center relative">
                <div className="w-20 h-20 bg-slate-800 border-2 border-violet-500/50 rounded-2xl mx-auto flex items-center justify-center text-2xl font-extrabold text-violet-400 mb-6 relative z-10">
                  {step.num}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section id="testimonials" className="py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-violet-600 font-bold text-sm uppercase tracking-widest mb-3">Real reviews</p>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900">Loved by thousands</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                seed: "Sarah", bg: "b6e3f4",
                text: "This is hands down the most beautiful finance app I've ever used. The analytics are incredible — I actually look forward to checking my spending now.",
                name: "Sarah Jenkins", role: "Freelance Designer",
              },
              {
                seed: "Marcus", bg: "c0aede",
                text: "The multi-currency support changed everything for me. I travel constantly and this keeps all my global spending perfectly organized and in check.",
                name: "Marcus Chen", role: "Digital Nomad",
              },
              {
                seed: "Emily", bg: "ffd5dc",
                text: "Finally, a finance app that doesn't look like a spreadsheet from 2005. It's clean, fast, and the calendar view is genuinely genius.",
                name: "Emily Rodriguez", role: "Small Business Owner",
              },
            ].map((t) => (
              <div key={t.name} className="bg-slate-50 border border-slate-100 rounded-2xl p-8 hover:shadow-md transition-shadow">
                <div className="flex gap-1 text-yellow-400 mb-5 text-lg">★★★★★</div>
                <p className="text-slate-700 leading-relaxed mb-7 text-[1.05rem]">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={dicebear(t.seed, t.bg)} alt={t.name} className="w-12 h-12 rounded-full" />
                  <div>
                    <p className="font-bold text-slate-900">{t.name}</p>
                    <p className="text-sm text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 px-6 bg-gradient-to-br from-violet-900 to-indigo-900">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex -space-x-2.5 justify-center mb-6">
            {["Felix","Maria","James","Sofia","Carlos"].map((s, i) => (
              <img
                key={i}
                src={dicebear(s, ["b6e3f4","c0aede","ffd5dc","d1d4f9","c3e6cb"][i])}
                className="w-10 h-10 rounded-full border-2 border-violet-800"
                alt={s}
              />
            ))}
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-5 leading-tight">
            Ready to Master Your Money?
          </h2>
          <p className="text-xl text-violet-200 mb-10">
            Join 10,000+ people who've taken control of their financial future — completely free.
          </p>
          <Link
            href="/login"
            className="inline-block bg-white text-violet-700 px-10 py-4 rounded-full font-extrabold text-lg shadow-2xl hover:scale-105 transition-transform duration-200"
          >
            Get Started for Free
          </Link>
          <p className="text-violet-300 mt-5 text-sm font-medium">
            No credit card required · Setup in 30 seconds · Free forever
          </p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-slate-950 text-slate-400 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <Logo size="sm" light />
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
