import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

interface LoginPageProps {
  onLogin: () => void;
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

  const { register: registerLogin, handleSubmit: handleLoginSubmit, formState: { errors: loginErrors } } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const { register: registerSignup, handleSubmit: handleSignupSubmit, formState: { errors: signupErrors } } = useForm({
    resolver: zodResolver(signupSchema)
  });

  const onSubmit = () => {
    onLogin();
    setLocation("/dashboard");
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left side - Decorative */}
      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 bg-sidebar text-sidebar-foreground p-12 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent pointer-events-none" />
        
        <div className="relative z-10 text-center">
          <Link href="/" className="inline-flex items-center gap-3 mb-12">
            <img src="/logo.png" alt="Logo" className="w-12 h-12 object-contain" />
            <span className="text-3xl font-display font-bold tracking-tight text-white">Expense Tracker</span>
          </Link>
          
          <h2 className="text-4xl font-display font-bold mb-6 leading-tight">Your money,<br/>organized.</h2>
          <p className="text-lg opacity-80 max-w-md mx-auto">
            Join Expense Tracker today and take the first step towards total financial clarity.
          </p>

          {/* Doodles */}
          <div className="mt-16 flex justify-center gap-8 opacity-60">
            <svg className="w-16 h-16 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
            <svg className="w-16 h-16 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <line x1="2" y1="10" x2="22" y2="10" />
            </svg>
            <svg className="w-16 h-16 text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
              <path d="M22 12A10 10 0 0 0 12 2v10z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 bg-white relative">
        <Link href="/" className="absolute top-8 left-8 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
          ← Back to Home
        </Link>

        <div className="w-full max-w-md">
          <div className="flex bg-muted rounded-full p-1 mb-8">
            <button 
              onClick={() => setIsLoginTab(true)}
              className={`flex-1 py-2 text-sm font-medium rounded-full transition-all ${isLoginTab ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Login
            </button>
            <button 
              onClick={() => setIsLoginTab(false)}
              className={`flex-1 py-2 text-sm font-medium rounded-full transition-all ${!isLoginTab ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Sign Up
            </button>
          </div>

          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              {isLoginTab ? 'Welcome back' : 'Create an account'}
            </h1>
            <p className="text-muted-foreground">
              {isLoginTab ? 'Enter your details to access your dashboard.' : 'Start tracking your expenses in seconds.'}
            </p>
          </div>

          {isLoginTab ? (
            <form onSubmit={handleLoginSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Email</label>
                <input 
                  {...registerLogin("email")}
                  className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary focus:border-primary outline-none bg-white transition-all"
                  placeholder="name@example.com"
                />
                {loginErrors.email && <p className="text-destructive text-xs mt-1">{String(loginErrors.email.message)}</p>}
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-medium text-foreground">Password</label>
                  <a href="#" className="text-xs text-primary font-medium hover:underline">Forgot password?</a>
                </div>
                <input 
                  {...registerLogin("password")}
                  type="password"
                  className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary focus:border-primary outline-none bg-white transition-all"
                  placeholder="••••••••"
                />
                {loginErrors.password && <p className="text-destructive text-xs mt-1">{String(loginErrors.password.message)}</p>}
              </div>
              <button 
                type="submit"
                className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-bold shadow-md hover:bg-primary/90 hover:shadow-lg transition-all mt-4"
              >
                Sign In
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignupSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Name</label>
                <input 
                  {...registerSignup("name")}
                  className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary focus:border-primary outline-none bg-white transition-all"
                  placeholder="John Doe"
                />
                {signupErrors.name && <p className="text-destructive text-xs mt-1">{String(signupErrors.name.message)}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Email</label>
                <input 
                  {...registerSignup("email")}
                  className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary focus:border-primary outline-none bg-white transition-all"
                  placeholder="name@example.com"
                />
                {signupErrors.email && <p className="text-destructive text-xs mt-1">{String(signupErrors.email.message)}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Password</label>
                <input 
                  {...registerSignup("password")}
                  type="password"
                  className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary focus:border-primary outline-none bg-white transition-all"
                  placeholder="••••••••"
                />
                {signupErrors.password && <p className="text-destructive text-xs mt-1">{String(signupErrors.password.message)}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Confirm Password</label>
                <input 
                  {...registerSignup("confirmPassword")}
                  type="password"
                  className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary focus:border-primary outline-none bg-white transition-all"
                  placeholder="••••••••"
                />
                {signupErrors.confirmPassword && <p className="text-destructive text-xs mt-1">{String(signupErrors.confirmPassword.message)}</p>}
              </div>
              <button 
                type="submit"
                className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-bold shadow-md hover:bg-primary/90 hover:shadow-lg transition-all mt-4"
              >
                Create Account
              </button>
            </form>
          )}

          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="h-px bg-border flex-1"></div>
            <span className="text-sm text-muted-foreground">or continue with</span>
            <div className="h-px bg-border flex-1"></div>
          </div>

          <div className="mt-6 flex gap-4">
            <button onClick={onSubmit} className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-border rounded-xl hover:bg-muted transition-colors font-medium text-sm">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
            <button onClick={onSubmit} className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-border rounded-xl hover:bg-muted transition-colors font-medium text-sm">
              <svg className="w-5 h-5 text-foreground" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}