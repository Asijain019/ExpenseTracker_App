import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Router, Route, Switch, Redirect } from "wouter";
import { useState } from "react";
import { LandingPage } from "@/pages/LandingPage";
import { LoginPage } from "@/pages/LoginPage";
import { Dashboard } from "@/pages/Dashboard";
import { ExpensesPage } from "@/pages/ExpensesPage";
import { AnalyticsPage } from "@/pages/AnalyticsPage";
import { SettingsPage } from "@/pages/SettingsPage";

const queryClient = new QueryClient();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem("et_auth") === "true");

  const login = () => { localStorage.setItem("et_auth", "true"); setIsLoggedIn(true); };
  const logout = () => { localStorage.removeItem("et_auth"); setIsLoggedIn(false); };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router>
          <Switch>
            <Route path="/" component={() => <LandingPage />} />
            <Route path="/login" component={() => <LoginPage onLogin={login} />} />
            <Route path="/dashboard" component={() => isLoggedIn ? <Dashboard onLogout={logout} /> : <Redirect to="/login" />} />
            <Route path="/expenses" component={() => isLoggedIn ? <ExpensesPage onLogout={logout} /> : <Redirect to="/login" />} />
            <Route path="/analytics" component={() => isLoggedIn ? <AnalyticsPage onLogout={logout} /> : <Redirect to="/login" />} />
            <Route path="/settings" component={() => isLoggedIn ? <SettingsPage onLogout={logout} /> : <Redirect to="/login" />} />
            <Route component={() => <Redirect to="/" />} />
          </Switch>
        </Router>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
export default App;