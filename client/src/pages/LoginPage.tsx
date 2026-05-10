import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Logo } from "@/components/Logo";

interface LoginPageProps {
  onLogin: (token: string, user: any) => void;
}

const loginSchema = z.object({
  email: z.string().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

const signupSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().min(1, "Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export function LoginPage({ onLogin }: LoginPageProps) {
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const {
    register: registerSignup,
    handleSubmit: handleSignupSubmit,
    formState: { errors: signupErrors },
  } = useForm({ resolver: zodResolver(signupSchema) });

  const onLoginSubmit = async (data: any) => {
    setLoading(true);
    try {
      const res = await api.login(data);
      if (res.token) {
        onLogin(res.token, res.user);
        setLocation("/dashboard");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (e) {
      toast({ title: "Login failed", description: "Please check your email and password.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const onSignupSubmit = async (data: any) => {
    setLoading(true);
    try {
      const res = await api.register({ name: data.name, email: data.email, password: data.password });
      if (res.token) {
        onLogin(res.token, res.user);
        setLocation("/dashboard");
      } else {
        throw new Error("Registration failed");
      }
    } catch (e) {
      toast({ title: "Sign up failed", description: "Could not create account.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen flex bg-slate-50 font-sans">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-[50%] text-white p-12 relative overflow-hidden">
        {/* Vibrant Abstract Background */}
        <div className="absolute inset-0 z-0">
          <img src="/abstract_bg.png" alt="Abstract Background" className="w-full h-full object-cover opacity-90 mix-blend-screen" />
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 via-purple-900/70 to-violet-950/90 mix-blend-multiply" />
        </div>
        <div className="relative z-10 glass-panel-dark rounded-3xl p-8 mb-auto">
          <Logo size="md" light asLink />
        </div>

        <div className="relative z-10 glass-panel-dark rounded-3xl p-8 mt-12 backdrop-blur-2xl border-white/20 animate-float">
          <h2 className="text-5xl font-extrabold mb-5 leading-tight bg-clip-text text-transparent bg-gradient-to-br from-white to-violet-200">
            Hello,<br />Welcome Back 👋
          </h2>
          <p className="text-violet-100 text-lg leading-relaxed max-w-sm mb-8">
            Your financial dashboard is waiting. Track smarter, spend less, and build the future you want.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { val: "10K+", lbl: "Active Users" },
              { val: "15+", lbl: "Currencies" },
              { val: "99.9%", lbl: "Uptime" },
            ].map((s) => (
              <div key={s.lbl} className="bg-white/5 hover:bg-white/10 transition-colors backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <p className="text-2xl font-extrabold text-white">{s.val}</p>
                <p className="text-violet-300 text-xs font-bold mt-1 tracking-wide uppercase">{s.lbl}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative circles */}
        <div className="absolute top-24 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-24 right-16 w-32 h-32 bg-violet-400/20 rounded-full blur-2xl" />
      </div>

      {/* Right panel — Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 relative bg-gradient-to-br from-slate-50 to-slate-100/50">
        <Link
          href="/"
          className="absolute top-8 left-8 text-sm font-semibold text-slate-500 hover:text-violet-600 transition-colors flex items-center gap-1.5 bg-white/50 px-4 py-2 rounded-full border border-slate-200 backdrop-blur-sm shadow-sm hover:shadow-md"
        >
          ← Back to Home
        </Link>

        <div className="w-full max-w-md glass-panel p-8 sm:p-10 rounded-[2rem]">
          {/* Tab toggle */}
          <div className="flex bg-slate-100 rounded-xl p-1 mb-8">
            <button
              onClick={() => setIsLoginTab(true)}
              className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${
                isLoginTab ? "bg-white shadow text-slate-900" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLoginTab(false)}
              className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${
                !isLoginTab ? "bg-white shadow text-slate-900" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Sign Up
            </button>
          </div>

          <div className="mb-7">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-1.5">
              {isLoginTab ? "Welcome back" : "Create your account"}
            </h1>
            <p className="text-slate-500">
              {isLoginTab
                ? "Enter your credentials to continue to your dashboard."
                : "Get started completely free — no credit card required."}
            </p>
          </div>

          {isLoginTab ? (
            <form onSubmit={handleLoginSubmit(onLoginSubmit)} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Email</label>
                <input
                  {...registerLogin("email")}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all text-slate-900 bg-slate-50 focus:bg-white"
                  placeholder="name@example.com"
                />
                {loginErrors.email && (
                  <p className="text-red-500 text-xs mt-1.5 font-medium">{String(loginErrors.email.message)}</p>
                )}
              </div>
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-sm font-bold text-slate-700">Password</label>
                  <a href="#" className="text-xs text-violet-600 font-semibold hover:underline">
                    Forgot Password?
                  </a>
                </div>
                <input
                  {...registerLogin("password")}
                  type="password"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all text-slate-900 bg-slate-50 focus:bg-white"
                  placeholder="••••••••"
                />
                {loginErrors.password && (
                  <p className="text-red-500 text-xs mt-1.5 font-medium">{String(loginErrors.password.message)}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-violet-500/30 transition-all flex justify-center items-center gap-2 hover:-translate-y-0.5 disabled:opacity-70 disabled:transform-none"
              >
                {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                Sign In
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignupSubmit(onSignupSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Full Name</label>
                <input
                  {...registerSignup("name")}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all bg-slate-50 focus:bg-white"
                  placeholder="John Doe"
                />
                {signupErrors.name && (
                  <p className="text-red-500 text-xs mt-1.5 font-medium">{String(signupErrors.name.message)}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Email</label>
                <input
                  {...registerSignup("email")}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all bg-slate-50 focus:bg-white"
                  placeholder="name@example.com"
                />
                {signupErrors.email && (
                  <p className="text-red-500 text-xs mt-1.5 font-medium">{String(signupErrors.email.message)}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Password</label>
                <input
                  {...registerSignup("password")}
                  type="password"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all bg-slate-50 focus:bg-white"
                  placeholder="At least 6 characters"
                />
                {signupErrors.password && (
                  <p className="text-red-500 text-xs mt-1.5 font-medium">{String(signupErrors.password.message)}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Confirm Password</label>
                <input
                  {...registerSignup("confirmPassword")}
                  type="password"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all bg-slate-50 focus:bg-white"
                  placeholder="••••••••"
                />
                {signupErrors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1.5 font-medium">
                    {String(signupErrors.confirmPassword.message)}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-violet-500/30 transition-all flex justify-center items-center gap-2 hover:-translate-y-0.5 disabled:opacity-70 disabled:transform-none"
              >
                {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                Create Account
              </button>
            </form>
          )}



          <p className="text-center text-sm text-slate-500 mt-6">
            {isLoginTab ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => setIsLoginTab(!isLoginTab)} className="text-violet-600 font-bold hover:underline">
              {isLoginTab ? "Sign up free" : "Sign in"}
            </button>
          </p>
        </div>
      </div>


    </div>
  );
}
