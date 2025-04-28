import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SubscriptionPage from "./pages/SubscriptionPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import NotFound from "@/pages/not-found";
import SuccessModal from "./components/SuccessModal";
import { useAuth } from "./hooks/useAuth";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

function ProtectedRoutes() {
  const { isLoggedIn } = useAuth();

  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/subscription" component={SubscriptionPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/dashboard">
        {isLoggedIn ? <DashboardPage /> : <LoginPage />}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function AppContent() {
  return (
    <div className="min-h-screen gradient-bg">
      <Navbar />
      <Toaster />
      <ProtectedRoutes />
      <SuccessModal />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
