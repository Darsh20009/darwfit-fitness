import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "../hooks/useAuth";
import { useLocation } from "wouter";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { isLoggedIn, username, subscriptionId, logout } = useAuth();
  const [, navigate] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleWhatsAppClick = () => {
    if (!subscriptionId) return;

    const message = `مرحباً، أحتاج للتواصل معكم بخصوص اشتراكي رقم: ${subscriptionId}`;
    const phoneNumber = "201155201921"; 
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");
    setIsMobileMenuOpen(false);
  };

  

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white dark:bg-neutral-800 shadow-md relative">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <h1 
            className="text-xl md:text-2xl font-bold cursor-pointer btn-touch"
            onClick={() => handleNavigation("/")}
          >
            <span className="text-secondary">Darw</span>
            <span className="text-primary">fit</span>
          </h1>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 space-x-reverse">
            <button 
              onClick={() => navigate("/calories")}
              className="text-sm font-medium text-neutral-700 hover:text-primary dark:text-neutral-300 dark:hover:text-primary transition-colors btn-touch"
            >
              حاسبة السعرات
            </button>

            <button 
              onClick={() => navigate("/subscription")}
              className="text-sm font-medium text-neutral-700 hover:text-primary dark:text-neutral-300 dark:hover:text-primary transition-colors btn-touch"
            >
              الاشتراكات
            </button>

            <button 
              onClick={() => navigate("/admin")}
              className="text-sm font-medium text-neutral-700 hover:text-primary dark:text-neutral-300 dark:hover:text-primary transition-colors btn-touch"
            >
              إدارة العملاء
            </button>

            {isLoggedIn && subscriptionId && (
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary px-2 py-1">
                رقم الاشتراك: {subscriptionId}
              </Badge>
            )}
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center space-x-2 space-x-reverse">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full w-9 h-9 btn-touch"
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </Button>

            {isLoggedIn ? (
              <div className="flex items-center space-x-3 space-x-reverse">
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  أهلاً، {username}
                </span>

                {subscriptionId && (
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleWhatsAppClick}
                      className="text-green-600 border-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 btn-touch"
                    >
                      واتساب
                    </Button>

                    
                  </div>
                )}

                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={logout}
                  className="text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 btn-touch"
                >
                  تسجيل خروج
                </Button>
              </div>
            ) : (
              <Button 
                onClick={() => navigate("/login")}
                size="sm"
                className="btn-touch"
              >
                تسجيل دخول
              </Button>
            )}
          </div>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="flex md:hidden items-center space-x-2 space-x-reverse">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full w-9 h-9 btn-touch"
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="btn-touch"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-neutral-800 shadow-lg z-50 border-t border-neutral-200 dark:border-neutral-700">
            <div className="p-4 space-y-3">
              <button 
                onClick={() => handleNavigation("/calories")}
                className="block w-full text-right py-3 px-4 text-sm font-medium text-neutral-700 hover:text-primary dark:text-neutral-300 dark:hover:text-primary transition-colors btn-touch rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700"
              >
                حاسبة السعرات
              </button>

              <button 
                onClick={() => handleNavigation("/subscription")}
                className="block w-full text-right py-3 px-4 text-sm font-medium text-neutral-700 hover:text-primary dark:text-neutral-300 dark:hover:text-primary transition-colors btn-touch rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700"
              >
                الاشتراكات
              </button>

              <button 
                onClick={() => handleNavigation("/admin")}
                className="block w-full text-right py-3 px-4 text-sm font-medium text-neutral-700 hover:text-primary dark:text-neutral-300 dark:hover:text-primary transition-colors btn-touch rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700"
              >
                إدارة العملاء
              </button>

              {isLoggedIn && subscriptionId && (
                <div className="px-4 py-2">
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary px-2 py-1">
                    رقم الاشتراك: {subscriptionId}
                  </Badge>
                </div>
              )}

              {isLoggedIn ? (
                <div className="space-y-3 pt-3 border-t border-neutral-200 dark:border-neutral-700">
                  <div className="px-4">
                    <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      أهلاً، {username}
                    </span>
                  </div>

                  {subscriptionId && (
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        onClick={handleWhatsAppClick}
                        className="w-full text-green-600 border-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 btn-touch"
                      >
                        تواصل واتساب
                      </Button>

                      
                    </div>
                  )}

                  <Button 
                    variant="outline" 
                    onClick={logout}
                    className="w-full text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 btn-touch"
                  >
                    تسجيل خروج
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={() => handleNavigation("/login")}
                  className="w-full btn-touch"
                >
                  تسجيل دخول
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}