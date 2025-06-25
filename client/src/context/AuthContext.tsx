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
    // التحقق من وجود بيانات الجلسة بطرق متعددة لضمان الاستمرارية
    const storedAuth = localStorage.getItem("auth");
    const storedUsername = localStorage.getItem("username");
    const storedSubscriptionId = localStorage.getItem("subscriptionId");
    const storedEndDate = localStorage.getItem("subscriptionEndDate");
    const sessionAuth = sessionStorage.getItem("auth");
    
    // محاولة استرداد البيانات من localStorage أو sessionStorage
    let authData = null;
    try {
      authData = storedAuth ? JSON.parse(storedAuth) : null;
      if (!authData && sessionAuth) {
        authData = JSON.parse(sessionAuth);
      }
    } catch (error) {
      console.warn("Error parsing auth data:", error);
    }
    
    // إذا كانت البيانات موجودة في أي من المصادر
    if (storedUsername || (authData && authData.username)) {
      const username = storedUsername || authData?.username;
      
      // If it's محمد السهلي, force the correct end date
      if (username === "محمد السهلي") {
        const correctEndDate = "23 يوليو 2025";
        const correctSubId = "5001";
        
        setIsLoggedIn(true);
        setUsername(username);
        setSubscriptionId(correctSubId);
        setSubscriptionEndDate(correctEndDate);
        
        // حفظ البيانات في كلا المكانين لضمان الاستمرارية
        const authData = {
          isLoggedIn: true,
          username,
          subscriptionId: correctSubId,
          subscriptionEndDate: correctEndDate,
          loginTime: new Date().toISOString(),
          lastActive: new Date().toISOString()
        };
        
        localStorage.setItem("auth", JSON.stringify(authData));
        localStorage.setItem("username", username);
        localStorage.setItem("subscriptionId", correctSubId);
        localStorage.setItem("subscriptionEndDate", correctEndDate);
        sessionStorage.setItem("auth", JSON.stringify(authData));
      }
      // If it's يوسف درويش, calculate 6 months from today
      else if (username === "يوسف درويش") {
        const today = new Date();
        const endDateObj = new Date(today.getFullYear(), today.getMonth() + 6, today.getDate());
        
        const arabicMonths = [
          "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
          "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
        ];
        const correctEndDate = `${endDateObj.getDate()} ${arabicMonths[endDateObj.getMonth()]} ${endDateObj.getFullYear()}`;
        const correctSubId = "2009";
        
        setIsLoggedIn(true);
        setUsername(username);
        setSubscriptionId(correctSubId);
        setSubscriptionEndDate(correctEndDate);
        
        // حفظ البيانات في كلا المكانين
        const authData = {
          isLoggedIn: true,
          username,
          subscriptionId: correctSubId,
          subscriptionEndDate: correctEndDate,
          loginTime: new Date().toISOString(),
          lastActive: new Date().toISOString()
        };
        
        localStorage.setItem("auth", JSON.stringify(authData));
        localStorage.setItem("username", username);
        localStorage.setItem("subscriptionId", correctSubId);
        localStorage.setItem("subscriptionEndDate", correctEndDate);
        sessionStorage.setItem("auth", JSON.stringify(authData));
      } else {
        setIsLoggedIn(true);
        setUsername(username);
        setSubscriptionId(storedSubscriptionId || authData?.subscriptionId);
        setSubscriptionEndDate(storedEndDate || authData?.subscriptionEndDate);
      }
    }
    
    // إضافة listener لتحديث وقت النشاط الأخير
    const updateLastActive = () => {
      const currentAuth = localStorage.getItem("auth");
      if (currentAuth) {
        try {
          const authData = JSON.parse(currentAuth);
          authData.lastActive = new Date().toISOString();
          localStorage.setItem("auth", JSON.stringify(authData));
          sessionStorage.setItem("auth", JSON.stringify(authData));
        } catch (error) {
          console.warn("Error updating last active:", error);
        }
      }
    };
    
    // تحديث النشاط عند الحركة أو النقر
    window.addEventListener('click', updateLastActive);
    window.addEventListener('keypress', updateLastActive);
    window.addEventListener('scroll', updateLastActive);
    
    return () => {
      window.removeEventListener('click', updateLastActive);
      window.removeEventListener('keypress', updateLastActive);
      window.removeEventListener('scroll', updateLastActive);
    };
  }, []);

  const login = (username: string, password: string) => {
    let subsId = "";
    let endDate = "";
    let isValid = false;

    // Check for محمد السهلي
    if (username === "محمد السهلي" && password === "123456") {
      subsId = "5001";
      endDate = "23 يوليو 2025";
      isValid = true;
    }
    // Check for يوسف درويش
    else if (username === "يوسف درويش" && password === "182009") {
      subsId = "2009";
      // Calculate 6 months from today
      const today = new Date();
      const endDateObj = new Date(today.getFullYear(), today.getMonth() + 6, today.getDate());
      
      const arabicMonths = [
        "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
        "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
      ];
      endDate = `${endDateObj.getDate()} ${arabicMonths[endDateObj.getMonth()]} ${endDateObj.getFullYear()}`;
      isValid = true;
    }

    if (isValid) {
      setIsLoggedIn(true);
      setUsername(username);
      setSubscriptionId(subsId);
      setSubscriptionEndDate(endDate);
      
      // Save to localStorage with better structure and multiple backup methods
      const authData = {
        isLoggedIn: true,
        username,
        subscriptionId: subsId,
        subscriptionEndDate: endDate,
        loginTime: new Date().toISOString(),
        lastActive: new Date().toISOString(),
        persistent: true // علامة للإشارة إلى أن هذه الجلسة دائمة
      };
      
      // حفظ في localStorage (دائم)
      localStorage.setItem("auth", JSON.stringify(authData));
      localStorage.setItem("username", username);
      localStorage.setItem("subscriptionId", subsId);
      localStorage.setItem("subscriptionEndDate", endDate);
      localStorage.setItem("loginPersistent", "true");
      
      // حفظ في sessionStorage كنسخة احتياطية
      sessionStorage.setItem("auth", JSON.stringify(authData));
      sessionStorage.setItem("username", username);
      sessionStorage.setItem("subscriptionId", subsId);
      sessionStorage.setItem("subscriptionEndDate", endDate);
      
      // حفظ في cookies كنسخة احتياطية إضافية (30 يوم)
      try {
        const cookieData = `auth=${encodeURIComponent(JSON.stringify(authData))}; max-age=${30 * 24 * 60 * 60}; path=/; SameSite=Strict`;
        document.cookie = cookieData;
      } catch (error) {
        console.warn("Could not save to cookies:", error);
      }
      
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername(null);
    setSubscriptionId(null);
    setSubscriptionEndDate(null);
    
    // Clear auth data from all storage methods
    localStorage.removeItem("auth");
    localStorage.removeItem("username");
    localStorage.removeItem("subscriptionId");
    localStorage.removeItem("subscriptionEndDate");
    localStorage.removeItem("loginPersistent");
    
    sessionStorage.removeItem("auth");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("subscriptionId");
    sessionStorage.removeItem("subscriptionEndDate");
    
    // Clear cookies
    try {
      document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    } catch (error) {
      console.warn("Could not clear cookies:", error);
    }
    
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
