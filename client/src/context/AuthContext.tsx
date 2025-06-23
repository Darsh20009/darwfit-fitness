import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "wouter";
import { getClientByCredentials, ClientProfile } from "../data/clientProfiles";

interface AuthContextType {
  isLoggedIn: boolean;
  username: string | null;
  subscriptionId: string | null;
  subscriptionEndDate: string | null;
  clientProfile: ClientProfile | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [subscriptionId, setSubscriptionId] = useState<string | null>(null);
  const [subscriptionEndDate, setSubscriptionEndDate] = useState<string | null>(null);
  const [clientProfile, setClientProfile] = useState<ClientProfile | null>(null);
  const [, navigate] = useLocation();

  // Check if user is already logged in
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedSubscriptionId = localStorage.getItem("subscriptionId");
    const storedEndDate = localStorage.getItem("subscriptionEndDate");
    const storedClientId = localStorage.getItem("clientId");
    
    if (storedUsername && storedClientId) {
      // يمكن تحسين هذا بتخزين معرف العميل واسترجاع البيانات
      const mockProfile: ClientProfile = {
        id: storedClientId,
        name: storedUsername,
        username: storedUsername,
        password: "",
        subscriptionId: storedSubscriptionId || "",
        subscriptionEndDate: storedEndDate || "",
        workoutPlanId: "beginner_plan",
        mealPlanId: "weight_loss_plan",
        personalInfo: {}
      };
      
      setIsLoggedIn(true);
      setUsername(storedUsername);
      setSubscriptionId(storedSubscriptionId);
      setSubscriptionEndDate(storedEndDate);
      setClientProfile(mockProfile);
    }
  }, []);

  const login = (username: string, password: string) => {
    // البحث عن العميل في قاعدة البيانات
    const client = getClientByCredentials(username, password);
    
    if (client) {
      // Calculate subscription end date (3 months from today)
      const today = new Date();
      const endDateObj = new Date(today.getFullYear(), today.getMonth() + 3, today.getDate());
      
      // Format to Arabic date string
      const arabicMonths = [
        "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
        "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
      ];
      const endDate = `${endDateObj.getDate()} ${arabicMonths[endDateObj.getMonth()]} ${endDateObj.getFullYear()}`;
      
      // تحديث تاريخ انتهاء الاشتراك في بيانات العميل
      const updatedClient = { ...client, subscriptionEndDate: endDate };
      
      setIsLoggedIn(true);
      setUsername(client.name);
      setSubscriptionId(client.subscriptionId);
      setSubscriptionEndDate(endDate);
      setClientProfile(updatedClient);
      
      // Save to localStorage
      const authData = {
        isLoggedIn: true,
        username: client.name,
        subscriptionId: client.subscriptionId,
        subscriptionEndDate: endDate,
        clientId: client.id,
        loginTime: new Date().toISOString()
      };
      
      localStorage.setItem("auth", JSON.stringify(authData));
      localStorage.setItem("username", client.name);
      localStorage.setItem("subscriptionId", client.subscriptionId);
      localStorage.setItem("subscriptionEndDate", endDate);
      localStorage.setItem("clientId", client.id);
      
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername(null);
    setSubscriptionId(null);
    setSubscriptionEndDate(null);
    setClientProfile(null);
    
    // Clear auth data but keep user preferences
    localStorage.removeItem("auth");
    localStorage.removeItem("username");
    localStorage.removeItem("subscriptionId");
    localStorage.removeItem("subscriptionEndDate");
    localStorage.removeItem("clientId");
    
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn, 
      username, 
      subscriptionId, 
      subscriptionEndDate,
      clientProfile,
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
