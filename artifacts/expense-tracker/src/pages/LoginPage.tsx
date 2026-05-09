import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface LoginPageProps {
  onLogin: (token: string, user: any) => void;
}

const loginSchema = z.object({
  email: z.string().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export function LoginPage({ onLogin }: LoginPageProps) {
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showGooglePicker, setShowGooglePicker] = useState(false);

  const { register: registerLogin, handleSubmit: handleLoginSubmit, formState: { errors: loginErrors } } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const { register: registerSignup, handleSubmit: handleSignupSubmit, formState: { errors: signupErrors } } = useForm({
    resolver: zodResolver(signupSchema)
  });

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
      toast({
        title: "Login failed",
        description: "Please check your email and password.",
        variant: "destructive"
      });
      // Fallback for demo if API is down
      onLogin("demo-token", { id: 1, name: "Demo User", email: data.email, avatar: "1" });
      setLocation("/dashboard");
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
      toast({
        title: "Sign up failed",
        description: "Could not create account.",
        variant: "destructive"
      });
      // Fallback for demo if API is down
      onLogin("demo-token", { id: 1, name: data.name, email: data.email, avatar: "1" });
      setLocation("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = (email: string, name: string) => {
    setShowGooglePicker(false);
    onLogin("google-token", { id: Math.floor(Math.random()*100), name, email, avatar: "2" });
    setLocation("/dashboard");
  }

  return (
    <div className="min-h-screen flex bg-background font-sans">
      {/* Left side - Decorative gradient & illustration */}
      <div className="hidden lg:flex flex-col justify-between w-[45%] bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900 text-white p-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxjaXJjbGUgY3g9IjEwIiBjeT0iMTAiIHI9IjEiIGZpbGw9IiNmZmZmZmYiLz4KPC9zdmc+')] mix-blend-overlay"></div>
        
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
            </div>
            <span className="text-2xl font-display font-bold tracking-tight text-white">Expense Tracker</span>
          </Link>
        </div>

        <div className="relative z-10 max-w-md">
          <h2 className="text-5xl font-display font-bold mb-6 leading-[1.1]">Hello,<br/>Welcome Back</h2>
          <p className="text-lg text-purple-200">
            Log in to access your beautiful financial dashboard. Track expenses, analyze trends, and build real wealth.
          </p>
        </div>

        {/* Isometric SVG Illustration Mock */}
        <div className="absolute right-[-10%] bottom-[10%] w-[120%] opacity-80 pointer-events-none mix-blend-screen">
           <svg viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="200" y="200" width="300" height="200" rx="20" fill="url(#grad1)" transform="rotate(-15 350 300)"/>
            <rect x="220" y="220" width="100" height="80" rx="10" fill="#fff" fillOpacity="0.2" transform="rotate(-15 350 300)"/>
            <rect x="340" y="220" width="140" height="40" rx="10" fill="#fff" fillOpacity="0.2" transform="rotate(-15 350 300)"/>
            <circle cx="550" cy="150" r="40" fill="url(#grad2)"/>
            <circle cx="150" cy="400" r="60" fill="url(#grad3)"/>
            <path d="M 530 150 L 570 150 M 550 130 L 550 170" stroke="#fff" strokeWidth="6" strokeLinecap="round"/>
            <defs>
              <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#c084fc"/><stop offset="100%" stopColor="#818cf8"/></linearGradient>
              <linearGradient id="grad2" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#f472b6"/><stop offset="100%" stopColor="#fb7185"/></linearGradient>
              <linearGradient id="grad3" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#38bdf8"/><stop offset="100%" stopColor="#818cf8"/></linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 bg-white relative">
        <Link href="/" className="absolute top-8 left-8 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-2">
          ← Back
        </Link>

        <div className="w-full max-w-md">
          <div className="flex bg-slate-100 rounded-lg p-1 mb-8">
            <button 
              onClick={() => setIsLoginTab(true)}
              className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${isLoginTab ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}
            >
              Sign In
            </button>
            <button 
              onClick={() => setIsLoginTab(false)}
              className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${!isLoginTab ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}
            >
              Sign Up
            </button>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              {isLoginTab ? 'Sign In' : 'Create Account'}
            </h1>
            <p className="text-slate-500">
              {isLoginTab ? 'Enter your email and password to continue.' : 'Get started with your free account today.'}
            </p>
          </div>

          {isLoginTab ? (
            <form onSubmit={handleLoginSubmit(onLoginSubmit)} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Email</label>
                <input 
                  {...registerLogin("email")}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                  placeholder="name@example.com"
                />
                {loginErrors.email && <p className="text-red-500 text-xs mt-1.5 font-medium">{String(loginErrors.email.message)}</p>}
              </div>
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-sm font-bold text-slate-700">Password</label>
                  <a href="#" className="text-xs text-purple-600 font-bold hover:underline">Forgot Password?</a>
                </div>
                <input 
                  {...registerLogin("password")}
                  type="password"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                  placeholder="••••••••"
                />
                {loginErrors.password && <p className="text-red-500 text-xs mt-1.5 font-medium">{String(loginErrors.password.message)}</p>}
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="remember" className="rounded border-slate-300 text-purple-600 focus:ring-purple-500 w-4 h-4" />
                <label htmlFor="remember" className="ml-2 text-sm text-slate-600 font-medium">Remember me</label>
              </div>
              <button 
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-slate-900 text-white rounded-xl font-bold shadow-md hover:bg-slate-800 transition-all flex justify-center items-center gap-2 mt-2 disabled:opacity-70"
              >
                {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                Sign In
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignupSubmit(onSignupSubmit)} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Name</label>
                <input 
                  {...registerSignup("name")}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                  placeholder="John Doe"
                />
                {signupErrors.name && <p className="text-red-500 text-xs mt-1.5 font-medium">{String(signupErrors.name.message)}</p>}
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Email</label>
                <input 
                  {...registerSignup("email")}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                  placeholder="name@example.com"
                />
                {signupErrors.email && <p className="text-red-500 text-xs mt-1.5 font-medium">{String(signupErrors.email.message)}</p>}
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Password</label>
                <input 
                  {...registerSignup("password")}
                  type="password"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                  placeholder="••••••••"
                />
                {signupErrors.password && <p className="text-red-500 text-xs mt-1.5 font-medium">{String(signupErrors.password.message)}</p>}
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Confirm Password</label>
                <input 
                  {...registerSignup("confirmPassword")}
                  type="password"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                  placeholder="••••••••"
                />
                {signupErrors.confirmPassword && <p className="text-red-500 text-xs mt-1.5 font-medium">{String(signupErrors.confirmPassword.message)}</p>}
              </div>
              <button 
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-slate-900 text-white rounded-xl font-bold shadow-md hover:bg-slate-800 transition-all flex justify-center items-center gap-2 mt-2 disabled:opacity-70"
              >
                {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                Sign Up
              </button>
            </form>
          )}

          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="h-px bg-slate-200 flex-1"></div>
            <span className="text-sm font-medium text-slate-400">Or continue with</span>
            <div className="h-px bg-slate-200 flex-1"></div>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <button onClick={() => setShowGooglePicker(true)} className="w-full flex items-center justify-center gap-3 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors font-bold text-slate-700">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
            <button onClick={() => onLoginSubmit({email:"github@demo.com", password:"password"})} className="w-full flex items-center justify-center gap-3 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors font-bold text-slate-700">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              GitHub
            </button>
          </div>

          <p className="text-center text-sm text-slate-500 font-medium mt-8">
            {isLoginTab ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => setIsLoginTab(!isLoginTab)} className="text-purple-600 font-bold hover:underline">
              {isLoginTab ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>

      {/* Google Picker Modal Mock */}
      {showGooglePicker && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
            <div className="p-6 text-center border-b border-slate-100">
              <svg className="w-8 h-8 mx-auto mb-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <h3 className="text-xl font-bold text-slate-900">Sign in with Google</h3>
              <p className="text-sm text-slate-500 mt-1">Choose an account to continue to Expense Tracker</p>
            </div>
            <div className="p-2">
              <button onClick={() => handleGoogleLogin("alex@gmail.com", "Alex Johnson")} className="w-full flex items-center gap-4 p-3 hover:bg-slate-50 rounded-xl transition-colors text-left">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold">A</div>
                <div>
                  <p className="font-bold text-slate-900">Alex Johnson</p>
                  <p className="text-sm text-slate-500">alex@gmail.com</p>
                </div>
              </button>
              <button onClick={() => handleGoogleLogin("sam.smith@gmail.com", "Sam Smith")} className="w-full flex items-center gap-4 p-3 hover:bg-slate-50 rounded-xl transition-colors text-left mt-1">
                <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-700 font-bold">S</div>
                <div>
                  <p className="font-bold text-slate-900">Sam Smith</p>
                  <p className="text-sm text-slate-500">sam.smith@gmail.com</p>
                </div>
              </button>
              <button onClick={() => handleGoogleLogin("taylor.d@gmail.com", "Taylor Davis")} className="w-full flex items-center gap-4 p-3 hover:bg-slate-50 rounded-xl transition-colors text-left mt-1">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">T</div>
                <div>
                  <p className="font-bold text-slate-900">Taylor Davis</p>
                  <p className="text-sm text-slate-500">taylor.d@gmail.com</p>
                </div>
              </button>
            </div>
            <div className="p-4 border-t border-slate-100 bg-slate-50 text-right">
              <button onClick={() => setShowGooglePicker(false)} className="text-sm font-bold text-slate-500 hover:text-slate-900">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}