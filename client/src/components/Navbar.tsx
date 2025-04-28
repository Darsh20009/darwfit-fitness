import { useLocation } from "wouter";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const [, navigate] = useLocation();
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav className="bg-white dark:bg-neutral-800 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4 space-x-reverse">
          <h1 
            className="text-2xl font-bold cursor-pointer"
            onClick={() => navigate("/")}
          >
            <span className="text-secondary">Darw</span>
            <span className="text-primary">fit</span>
          </h1>
        </div>
        <div className="flex items-center space-x-4 space-x-reverse">
          <ThemeToggle />
          
          {isLoggedIn && (
            <button 
              onClick={logout}
              className="text-sm text-red-500 hover:text-red-600 dark:hover:text-red-400 font-medium"
            >
              تسجيل الخروج
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
