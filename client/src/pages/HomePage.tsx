import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";

export default function HomePage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16 relative">
          <div className="max-w-5xl mx-auto relative">
            {/* Floating background elements */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 dark:bg-blue-700 rounded-full animate-float opacity-30"></div>
            <div className="absolute top-32 right-16 w-16 h-16 bg-purple-200 dark:bg-purple-700 rounded-full animate-float opacity-40" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-10 left-1/4 w-12 h-12 bg-indigo-200 dark:bg-indigo-700 rounded-full animate-float opacity-20" style={{animationDelay: '2s'}}></div>
            
            <div className="relative z-10">
              <h1 className="text-5xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-pulse">
                🏋️‍♂️ داروفت 🏋️‍♂️
              </h1>
              <p className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mb-12 leading-relaxed font-medium">
                ✨ رحلتك نحو صحة أفضل ولياقة مثالية تبدأ من هنا ✨
              </p>
              
              <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-16">
                <Button 
                  onClick={() => setLocation("/free-login")}
                  className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 hover:from-green-700 hover:via-blue-700 hover:to-purple-700 text-white font-bold py-4 px-10 rounded-2xl transition-all duration-300 text-xl transform hover:scale-110 hover:shadow-2xl animate-glow"
                >
                  🆓 العضوية المجانية
                </Button>
                <Button 
                  onClick={() => setLocation("/subscription")}
                  className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white font-bold py-4 px-10 rounded-2xl transition-all duration-300 text-xl transform hover:scale-110 hover:shadow-2xl"
                >
                  🚀 الخطة المدفوعة
                </Button>
                <Button 
                  onClick={() => setLocation("/quit")}
                  className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 hover:from-emerald-700 hover:via-green-700 hover:to-teal-700 text-white font-bold py-4 px-10 rounded-2xl transition-all duration-300 text-xl transform hover:scale-110 hover:shadow-2xl"
                >
                  🌟 صفحة الإقلاع
                </Button>
                <Button 
                  onClick={() => setLocation("/azkar")}
                  className="bg-gradient-to-r from-teal-600 via-emerald-600 to-green-600 hover:from-teal-700 hover:via-emerald-700 hover:to-green-700 text-white font-bold py-4 px-10 rounded-2xl transition-all duration-300 text-xl transform hover:scale-110 hover:shadow-2xl"
                >
                  🕌 أذكار اليوم
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setLocation("/calories")}
                  className="border-2 border-purple-500 text-purple-600 hover:bg-purple-500 hover:text-white py-4 px-10 rounded-2xl transition-all duration-300 text-xl transform hover:scale-110 glass-morphism"
                >
                  🔥 حاسبة السعرات
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ✨ لماذا تختار داروفت؟ ✨
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-purple-200 dark:hover:shadow-purple-800">
              <div className="text-6xl mb-6 animate-bounce">🎯</div>
              <h3 className="text-2xl font-bold mb-6 text-blue-600">برامج مخصصة</h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                برامج غذائية وتدريبية مصممة خصيصاً لتناسب أهدافك وحالتك الصحية بشكل مثالي
              </p>
            </div>
            
            <div className="text-center p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-indigo-200 dark:hover:shadow-indigo-800">
              <div className="text-6xl mb-6 animate-bounce" style={{animationDelay: '0.5s'}}>📱</div>
              <h3 className="text-2xl font-bold mb-6 text-purple-600">متابعة مستمرة</h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                فريق متخصص يتابع تقدمك ويقدم النصائح والدعم على مدار الساعة
              </p>
            </div>
            
            <div className="text-center p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-green-200 dark:hover:shadow-green-800">
              <div className="text-6xl mb-6 animate-bounce" style={{animationDelay: '1s'}}>⚡</div>
              <h3 className="text-2xl font-bold mb-6 text-indigo-600">نتائج سريعة</h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                نتائج ملموسة وواضحة خلال أسابيع قليلة من بداية البرنامج
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              🚀 ابدأ رحلتك اليوم
            </h2>
            <p className="text-xl mb-8 leading-relaxed">
              انضم إلى آلاف الأشخاص الذين حققوا أهدافهم مع داروفت
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button 
                onClick={() => setLocation("/free-login")}
                className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-xl text-lg transform hover:scale-105"
              >
                العضوية المجانية
              </Button>
              <Button 
                onClick={() => setLocation("/subscription")}
                variant="outline"
                className="border-white text-white hover:bg-white/20 font-bold py-3 px-8 rounded-xl text-lg"
              >
                اختر خطتك
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
