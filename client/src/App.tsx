import { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "./components/Navbar";
import WelcomeScreen from "./components/WelcomeScreen";
import HomePage from "./pages/HomePage";
import WelcomePage from "./pages/WelcomePage";
import SubscriptionPage from "./pages/SubscriptionPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import CaloriesPage from "./pages/CaloriesPage";
import CaloriesCalculatorPage from "./pages/CaloriesCalculatorPage";
import FreePlanPage from "./pages/FreePlanPage";
import EnhancedFreePlanPage from "./pages/EnhancedFreePlanPage";
import FreePlanViewPage from "./pages/FreePlanViewPage";
import FreeLoginPage from "./pages/FreeLoginPage";
import QuitPage from "./pages/QuitPage";
import AzkarPage from "./pages/AzkarPage";
import DesignLifePage from "./pages/DesignLifePage";
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
      <Route path="/enhanced-free-plan" component={EnhancedFreePlanPage} />
      <Route path="/free-plan-view" component={FreePlanViewPage} />
      <Route path="/free-login" component={FreeLoginPage} />
      <Route path="/quit" component={QuitPage} />
      <Route path="/azkar" component={AzkarPage} />
      <Route path="/design-life" component={DesignLifePage} />
      <Route path="/dashboard">
        {isLoggedIn ? <DashboardPage /> : <LoginPage />}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function AppContent() {
  const [showWelcome, setShowWelcome] = useState(true);

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
  };

  if (showWelcome) {
    return <WelcomeScreen onComplete={handleWelcomeComplete} />;
  }

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