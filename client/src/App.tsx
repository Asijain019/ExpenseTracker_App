import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Router, Route, Switch, Redirect } from "wouter";
import { useState, useEffect } from "react";
import { LandingPage } from "@/pages/LandingPage";
import { LoginPage } from "@/pages/LoginPage";
import { Dashboard } from "@/pages/Dashboard";
import { ExpensesPage } from "@/pages/ExpensesPage";
import { AnalyticsPage } from "@/pages/AnalyticsPage";
import { SettingsPage } from "@/pages/SettingsPage";
import { getToken, getStoredUser, storeAuth, clearAuth } from "@/lib/api";

const queryClient = new QueryClient();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!(getToken() && getStoredUser()));
  const [user, setUser] = useState(getStoredUser());

  const login = (token: string, userData: any) => { 
    storeAuth(token, userData); 
    setUser(userData);
    setIsLoggedIn(true); 
  };
  
  const logout = () => { 
    clearAuth(); 
    setUser(null);
    setIsLoggedIn(false); 
  };

  const updateUser = (userData: any) => {
    storeAuth(getToken()!, userData);
    setUser(userData);
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router>
          <Switch>
            <Route path="/" component={() => <LandingPage />} />
            <Route path="/login" component={() => <LoginPage onLogin={login} />} />
            <Route path="/dashboard" component={() => isLoggedIn ? <Dashboard onLogout={logout} user={user} /> : <Redirect to="/login" />} />
            <Route path="/expenses" component={() => isLoggedIn ? <ExpensesPage onLogout={logout} user={user} /> : <Redirect to="/login" />} />
            <Route path="/analytics" component={() => isLoggedIn ? <AnalyticsPage onLogout={logout} user={user} /> : <Redirect to="/login" />} />
            <Route path="/settings" component={() => isLoggedIn ? <SettingsPage onLogout={logout} user={user} onUpdateUser={updateUser} /> : <Redirect to="/login" />} />
            <Route component={() => <Redirect to="/" />} />
          </Switch>
        </Router>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
export default App;