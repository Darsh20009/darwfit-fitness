import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "../hooks/useAuth";
import { useLocation } from "wouter";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { isLoggedIn, username, subscriptionId, logout } = useAuth();
  const [, setLocation] = useLocation();
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
    setLocation(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-black to-gray-800 shadow-2xl relative border-b border-emerald-400/20">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="relative">
              <h1 
                onClick={() => setLocation("/")}
                className="text-3xl font-black bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500 bg-clip-text text-transparent relative z-10 cursor-pointer hover:scale-105 transition-all duration-300 btn-touch"
              >
                DARWFIT
              </h1>
              <div className="absolute inset-0 blur-sm bg-gradient-to-r from-emerald-400/20 to-emerald-600/20 animate-pulse"></div>
            </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 space-x-reverse">
            <button 
              onClick={() => setLocation("/calories")}
              className="text-sm font-medium text-gray-300 hover:text-emerald-400 transition-all duration-300 btn-touch hover:scale-105"
            >
              حاسبة السعرات
            </button>

            <button 
              onClick={() => setLocation("/design-life")}
              className="text-sm font-medium text-gray-300 hover:text-emerald-400 transition-all duration-300 btn-touch hover:scale-105"
            >
              🎯 صمم حياتك
            </button>

            <button 
              onClick={() => setLocation("/quit")}
              className="text-sm font-medium text-gray-300 hover:text-emerald-400 transition-all duration-300 btn-touch hover:scale-105"
            >الإقلاع</button>

            <button 
              onClick={() => setLocation("/azkar")}
              className="text-sm font-medium text-gray-300 hover:text-emerald-400 transition-all duration-300 btn-touch hover:scale-105"
            >
              أذكار اليوم
            </button>

            <button 
              onClick={() => setLocation("/subscription")}
              className="text-sm font-medium text-gray-300 hover:text-emerald-400 transition-all duration-300 btn-touch hover:scale-105"
            >
              الاشتراكات
            </button>

            {isLoggedIn && subscriptionId && (
              <Badge variant="outline" className="bg-emerald-400/10 text-emerald-400 border-emerald-400/30 px-2 py-1 backdrop-blur-sm">
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
              className="rounded-full w-9 h-9 btn-touch text-gray-300 hover:text-emerald-400 hover:bg-emerald-400/10 transition-all duration-300"
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </Button>

            {isLoggedIn ? (
              <div className="flex items-center space-x-3 space-x-reverse">
                <span className="text-sm font-medium text-gray-300">
                  أهلاً، {username}
                </span>

                {subscriptionId && (
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleWhatsAppClick}
                      className="text-emerald-400 border-emerald-400/30 hover:bg-emerald-400/10 backdrop-blur-sm btn-touch transition-all duration-300"
                    >
                      واتساب
                    </Button>


                  </div>
                )}

                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={logout}
                  className="text-red-400 border-red-400/30 hover:bg-red-400/10 backdrop-blur-sm btn-touch transition-all duration-300"
                >
                  تسجيل خروج
                </Button>
              </div>
            ) : (
              <Button 
                onClick={() => setLocation("/login")}
                size="sm"
                className="btn-touch bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white transition-all duration-300 hover:scale-105"
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
              className="rounded-full w-9 h-9 btn-touch text-gray-300 hover:text-emerald-400 hover:bg-emerald-400/10 transition-all duration-300"
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="btn-touch text-gray-300 hover:text-emerald-400 hover:bg-emerald-400/10 transition-all duration-300"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-gradient-to-b from-gray-900 to-black shadow-2xl z-50 border-t border-emerald-400/20 backdrop-blur-md">
            <div className="p-4 space-y-3">
              <button 
                onClick={() => handleNavigation("/calories")}
                className="block w-full text-right py-3 px-4 text-sm font-medium text-gray-300 hover:text-emerald-400 transition-all duration-300 btn-touch rounded-lg hover:bg-emerald-400/10 backdrop-blur-sm"
              >
                حاسبة السعرات
              </button>

              <button 
                onClick={() => handleNavigation("/design-life")}
                className="block w-full text-right py-3 px-4 text-sm font-medium text-gray-300 hover:text-emerald-400 transition-all duration-300 btn-touch rounded-lg hover:bg-emerald-400/10 backdrop-blur-sm"
              >
                🎯 صمم حياتك
              </button>

              <button 
                onClick={() => handleNavigation("/quit")}
                className="block w-full text-right py-3 px-4 text-sm font-medium text-gray-300 hover:text-emerald-400 transition-all duration-300 btn-touch rounded-lg hover:bg-emerald-400/10 backdrop-blur-sm"
              > الإقلاع</button>

              <button 
                onClick={() => handleNavigation("/azkar")}
                className="block w-full text-right py-3 px-4 text-sm font-medium text-gray-300 hover:text-emerald-400 transition-all duration-300 btn-touch rounded-lg hover:bg-emerald-400/10 backdrop-blur-sm"
              >
                أذكار اليوم
              </button>

              <button 
                onClick={() => handleNavigation("/subscription")}
                className="block w-full text-right py-3 px-4 text-sm font-medium text-gray-300 hover:text-emerald-400 transition-all duration-300 btn-touch rounded-lg hover:bg-emerald-400/10 backdrop-blur-sm"
              >
                الاشتراكات
              </button>

              {isLoggedIn && subscriptionId && (
                <div className="px-4 py-2">
                  <Badge variant="outline" className="bg-emerald-400/10 text-emerald-400 border-emerald-400/30 px-2 py-1 backdrop-blur-sm">
                    رقم الاشتراك: {subscriptionId}
                  </Badge>
                </div>
              )}

              {isLoggedIn ? (
                <div className="space-y-3 pt-3 border-t border-emerald-400/20">
                  <div className="px-4">
                    <span className="text-sm font-medium text-gray-300">
                      أهلاً، {username}
                    </span>
                  </div>

                  {subscriptionId && (
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        onClick={handleWhatsAppClick}
                        className="w-full text-emerald-400 border-emerald-400/30 hover:bg-emerald-400/10 backdrop-blur-sm btn-touch transition-all duration-300"
                      >
                        تواصل واتساب
                      </Button>
                    </div>
                  )}

                  <Button 
                    variant="outline" 
                    onClick={logout}
                    className="w-full text-red-400 border-red-400/30 hover:bg-red-400/10 backdrop-blur-sm btn-touch transition-all duration-300"
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