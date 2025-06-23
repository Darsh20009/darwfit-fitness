import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "wouter";
import { 
  Dumbbell, 
  Heart, 
  Target, 
  Zap, 
  Star, 
  Crown,
  Sparkles,
  ChevronRight,
  Play
} from "lucide-react";

export default function WelcomePage() {
  const [currentFeature, setCurrentFeature] = useState(0);
  const navigate = useNavigate();

  const features = [
    {
      icon: "🤖",
      title: "ذكاء اصطناعي متطور",
      description: "خطط مخصصة تماماً لجسمك وأهدافك"
    },
    {
      icon: "🍽️",
      title: "تغذية متوازنة",
      description: "وجبات لذيذة ومتنوعة تناسب ذوقك"
    },
    {
      icon: "💪",
      title: "تمارين فعالة",
      description: "برامج تدريبية تناسب مستواك ووقتك"
    },
    {
      icon: "📊",
      title: "تتبع شامل",
      description: "راقب تقدمك وحقق أهدافك بسهولة"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/10 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-purple-500/10 rounded-full animate-float"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-green-500/10 rounded-full animate-bounce"></div>
        <div className="absolute bottom-40 right-20 w-28 h-28 bg-yellow-500/10 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        
        {/* Floating Dumbbells */}
        <div className="absolute top-1/4 left-10 text-4xl animate-float opacity-20">🏋️‍♂️</div>
        <div className="absolute top-3/4 right-10 text-3xl animate-float opacity-20" style={{animationDelay: '2s'}}>💪</div>
        <div className="absolute top-1/2 left-1/4 text-2xl animate-bounce opacity-20" style={{animationDelay: '1.5s'}}>🔥</div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col">
        {/* Header */}
        <div className="text-center mb-16 flex-1 flex flex-col justify-center">
          {/* Logo Animation */}
          <div className="mb-8 relative">
            <div className="flex justify-center items-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full blur-xl opacity-60 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-gray-800 to-gray-900 p-8 rounded-full border-4 border-yellow-400 shadow-2xl">
                  <Dumbbell className="h-16 w-16 text-yellow-400 animate-bounce" />
                </div>
              </div>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-4 relative">
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent animate-pulse">
                DARWFIT
              </span>
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/20 via-orange-500/20 to-red-500/20 blur-lg -z-10"></div>
            </h1>
            
            <div className="flex justify-center items-center gap-2 mb-6">
              <Badge className="bg-yellow-500 text-black px-4 py-2 text-lg font-bold animate-pulse">
                <Crown className="h-4 w-4 ml-1" />
                حديد
              </Badge>
              <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 text-lg font-bold">
                <Sparkles className="h-4 w-4 ml-1" />
                إبداع
              </Badge>
            </div>
          </div>

          {/* Tagline */}
          <p className="text-2xl md:text-3xl text-gray-300 mb-8 leading-relaxed max-w-4xl mx-auto">
            <span className="text-yellow-400 font-bold">القوة</span> تبدأ من الإرادة، و
            <span className="text-blue-400 font-bold">الإبداع</span> يحقق المعجزات
          </p>

          {/* Rotating Features */}
          <div className="mb-12">
            <Card className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
              <CardContent className="p-8 text-center">
                <div className="text-6xl mb-4 animate-bounce">
                  {features[currentFeature].icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {features[currentFeature].title}
                </h3>
                <p className="text-gray-300 text-lg">
                  {features[currentFeature].description}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <Button 
              onClick={() => navigate("/free-plan")}
              className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white font-bold py-4 px-10 rounded-2xl transition-all duration-300 text-xl transform hover:scale-110 hover:shadow-2xl shadow-green-500/50"
            >
              <Play className="h-6 w-6 ml-2" />
              🆓 جرب مجاناً - 30 يوم
            </Button>
            
            <Button 
              onClick={() => navigate("/subscription")}
              className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:from-yellow-600 hover:via-orange-600 hover:to-red-600 text-white font-bold py-4 px-10 rounded-2xl transition-all duration-300 text-xl transform hover:scale-110 hover:shadow-2xl shadow-orange-500/50"
            >
              <Crown className="h-6 w-6 ml-2" />
              👑 الخطة المميزة
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => navigate("/login")}
              className="border-2 border-white/50 text-white hover:bg-white/10 backdrop-blur-sm py-4 px-10 rounded-2xl transition-all duration-300 text-xl transform hover:scale-110"
            >
              <ChevronRight className="h-6 w-6 ml-2" />
              دخول الأعضاء
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">1000+</div>
            <div className="text-gray-400">عضو نشط</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">50+</div>
            <div className="text-gray-400">برنامج تدريبي</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">95%</div>
            <div className="text-gray-400">معدل النجاح</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">24/7</div>
            <div className="text-gray-400">دعم متواصل</div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={`bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-500 hover:bg-white/10 hover:scale-105 cursor-pointer ${
                index === currentFeature ? 'border-yellow-400 bg-yellow-400/10' : ''
              }`}
              onClick={() => setCurrentFeature(index)}
            >
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h4 className="text-lg font-bold text-white mb-2">{feature.title}</h4>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm">
          <p>© 2025 DARWFIT - حقوق الطبع والنشر محفوظة</p>
          <p className="mt-1">صُنع بـ <Heart className="h-4 w-4 inline text-red-500" /> في المملكة العربية السعودية</p>
        </div>
      </div>
    </div>
  );
}