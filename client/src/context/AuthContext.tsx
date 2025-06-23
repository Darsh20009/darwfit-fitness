import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "wouter";

interface AuthContextType {
  isLoggedIn: boolean;
  username: string | null;
  subscriptionId: string | null;
  subscriptionEndDate: string | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [subscriptionId, setSubscriptionId] = useState<string | null>(null);
  const [subscriptionEndDate, setSubscriptionEndDate] = useState<string | null>(null);
  const [, navigate] = useLocation();

  // Check if user is already logged in
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedSubscriptionId = localStorage.getItem("subscriptionId");
    const storedEndDate = localStorage.getItem("subscriptionEndDate");
    
    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
      setSubscriptionId(storedSubscriptionId);
      setSubscriptionEndDate(storedEndDate);
    }
  }, []);

  const login = (username: string, password: string) => {
    // Fixed credentials check
    if (username === "محمد السهلي" && password === "123456") {
      // Hard-coded subscription details for demo purposes
      const subsId = "5001";
      const endDate = "30 يوليو 2025"; // 3 months from now
      
      setIsLoggedIn(true);
      setUsername(username);
      setSubscriptionId(subsId);
      setSubscriptionEndDate(endDate);
      
      // Save to localStorage with better structure
      const authData = {
        isLoggedIn: true,
        username,
        subscriptionId: subsId,
        subscriptionEndDate: endDate,
        loginTime: new Date().toISOString()
      };
      
      localStorage.setItem("auth", JSON.stringify(authData));
      localStorage.setItem("username", username);
      localStorage.setItem("subscriptionId", subsId);
      localStorage.setItem("subscriptionEndDate", endDate);
      
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername(null);
    setSubscriptionId(null);
    setSubscriptionEndDate(null);
    
    // Clear auth data but keep user preferences
    localStorage.removeItem("auth");
    localStorage.removeItem("username");
    localStorage.removeItem("subscriptionId");
    localStorage.removeItem("subscriptionEndDate");
    
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn, 
      username, 
      subscriptionId, 
      subscriptionEndDate,
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
