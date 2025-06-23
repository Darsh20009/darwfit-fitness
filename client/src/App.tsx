import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import WelcomePage from "./pages/WelcomePage";
import SubscriptionPage from "./pages/SubscriptionPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import CaloriesPage from "./pages/CaloriesPage";
import CaloriesCalculatorPage from "./pages/CaloriesCalculatorPage";
import FreePlanPage from "./pages/FreePlanPage";
import FreePlanViewPage from "./pages/FreePlanViewPage";
import FreeLoginPage from "./pages/FreeLoginPage";
import NotFound from "@/pages/not-found";
import SuccessModal from "./components/SuccessModal";

import { useAuth } from "./hooks/useAuth";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

function ProtectedRoutes() {
  const { isLoggedIn } = useAuth();

  return (
    <Switch>
      <Route path="/" component={WelcomePage} />
      <Route path="/home" component={HomePage} />
      <Route path="/subscription" component={SubscriptionPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/calories" component={CaloriesPage} />
      <Route path="/calories-calculator" component={CaloriesCalculatorPage} />
      <Route path="/free-plan" component={FreePlanPage} />
      <Route path="/free-plan-view" component={FreePlanViewPage} />
      <Route path="/free-login" component={FreeLoginPage} />
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