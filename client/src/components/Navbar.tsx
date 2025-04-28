import { useLocation } from "wouter";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../hooks/useAuth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LogOut, MessageCircle, User } from "lucide-react";

export default function Navbar() {
  const [, navigate] = useLocation();
  const { isLoggedIn, username, subscriptionId, subscriptionEndDate, logout } = useAuth();

  // Function to handle WhatsApp contact
  const contactCoach = () => {
    window.open("https://api.whatsapp.com/send/?phone=201155201921&text=مرحبا،%20أنا%20مشترك%20في%20Darwfit%20ورقم%20اشتراكي%20" + subscriptionId, "_blank");
  };

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
          
          <nav className="hidden md:flex items-center mr-6 space-x-6 space-x-reverse">
            <button 
              onClick={() => navigate("/calories")}
              className="text-sm font-medium text-neutral-700 hover:text-primary dark:text-neutral-300 dark:hover:text-primary transition-colors"
            >
              حاسبة السعرات
            </button>
            
            <button 
              onClick={() => navigate("/subscription")}
              className="text-sm font-medium text-neutral-700 hover:text-primary dark:text-neutral-300 dark:hover:text-primary transition-colors"
            >
              الاشتراكات
            </button>
          </nav>
          
          {isLoggedIn && subscriptionId && (
            <div className="hidden md:flex items-center mr-4 space-x-2 space-x-reverse">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary px-2 py-1">
                رقم الاشتراك: {subscriptionId}
              </Badge>
              <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary px-2 py-1">
                ينتهي في: {subscriptionEndDate}
              </Badge>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-3 space-x-reverse">
          <ThemeToggle />
          
          {isLoggedIn && (
            <>
              <div className="hidden md:flex items-center">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={contactCoach}
                  className="text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20"
                >
                  <MessageCircle className="h-4 w-4 ml-2" />
                  تواصل مع المدرب
                </Button>
              </div>
              
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs md:text-sm"
                >
                  <User className="h-4 w-4 ml-1 text-primary" />
                  <span className="hidden md:inline">{username}</span>
                </Button>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={logout}
                className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <LogOut className="h-4 w-4" />
                <span className="sr-only md:not-sr-only md:ml-2">تسجيل الخروج</span>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
