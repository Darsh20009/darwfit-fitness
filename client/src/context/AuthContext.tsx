import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "wouter";

interface AuthContextType {
  isLoggedIn: boolean;
  username: string | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [, navigate] = useLocation();

  // Check if user is already logged in
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
  }, []);

  const login = (username: string, password: string) => {
    // Fixed credentials check
    if (username === "محمد السهلي" && password === "123456") {
      setIsLoggedIn(true);
      setUsername(username);
      localStorage.setItem("username", username);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername(null);
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, login, logout }}>
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
