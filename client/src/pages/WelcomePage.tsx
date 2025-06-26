
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import { 
  Dumbbell, 
  Heart, 
  Target, 
  Zap, 
  Star, 
  Crown,
  Sparkles,
  ChevronRight,
  Play,
  Trophy,
  Users,
  Clock,
  CheckCircle
} from "lucide-react";

export default function WelcomePage() {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [animationStep, setAnimationStep] = useState(0);
  const [, setLocation] = useLocation();

  const features = [
    {
      icon: "🤖",
      title: "ذكاء اصطناعي متطور",
      description: "خطط مخصصة تماماً لجسمك وأهدافك",
      color: "from-emerald-500 to-emerald-600"
    },
    {
      icon: "🍽️",
      title: "تغذية متوازنة",
      description: "وجبات لذيذة ومتنوعة تناسب ذوقك",
      color: "from-emerald-400 to-emerald-500"
    },
    {
      icon: "💪",
      title: "تمارين فعالة",
      description: "برامج تدريبية تناسب مستواك ووقتك",
      color: "from-emerald-600 to-emerald-700"
    },
    {
      icon: "📊",
      title: "تتبع شامل",
      description: "راقب تقدمك وحقق أهدافك بسهولة",
      color: "from-emerald-300 to-emerald-400"
    }
  ];

  const achievements = [
    { icon: "👥", number: "5000+", label: "عضو نشط" },
    { icon: "🏆", number: "97%", label: "معدل النجاح" },
    { icon: "⚡", number: "30", label: "يوم للنتائج" },
    { icon: "🌟", number: "24/7", label: "دعم متواصل" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [features.length]);

  useEffect(() => {
    const animationInterval = setInterval(() => {
      setAnimationStep((prev) => (prev + 1) % 4);
    }, 1000);
    return () => clearInterval(animationInterval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Dynamic floating elements */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className={`absolute w-4 h-4 bg-gradient-to-r ${features[i % features.length]?.color || 'from-blue-400 to-purple-400'} rounded-full opacity-20 animate-float`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
        
        {/* Pulsing rings */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-emerald-400/20 rounded-full animate-ping"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-emerald-300/20 rounded-full animate-pulse"></div>
        
        {/* Floating fitness icons */}
        <div className="absolute top-20 left-10 text-4xl animate-bounce opacity-30">🏋️‍♂️</div>
        <div className="absolute top-40 right-20 text-3xl animate-float opacity-30" style={{animationDelay: '1s'}}>💪</div>
        <div className="absolute bottom-40 left-20 text-2xl animate-pulse opacity-30" style={{animationDelay: '2s'}}>🔥</div>
        <div className="absolute bottom-20 right-10 text-3xl animate-bounce opacity-30" style={{animationDelay: '1.5s'}}>🥇</div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col">
        {/* Main Hero Section */}
        <div className="flex-1 flex flex-col justify-center items-center text-center mb-16">
          {/* Logo with advanced animation */}
          <div className="mb-8 relative">
            <div className="flex justify-center items-center mb-6">
              <div className="relative group">
                {/* Outer glow ring */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 rounded-full blur-2xl opacity-75 group-hover:opacity-100 transition-opacity animate-pulse"></div>
                
                {/* Main logo container */}
                <div className="relative bg-gradient-to-br from-gray-800 to-black p-12 rounded-full border-4 border-emerald-400 shadow-2xl transform group-hover:scale-110 transition-all duration-500">
                  <Dumbbell className={`h-20 w-20 text-emerald-400 transition-all duration-500 ${animationStep % 2 === 0 ? 'animate-bounce' : 'animate-pulse'}`} />
                  
                  {/* Orbiting elements */}
                  <div className="absolute inset-0 animate-spin" style={{animationDuration: '8s'}}>
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                      <Star className="h-6 w-6 text-emerald-300" />
                    </div>
                    <div className="absolute top-1/2 -right-2 transform -translate-y-1/2">
                      <Target className="h-6 w-6 text-emerald-400" />
                    </div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <Zap className="h-6 w-6 text-emerald-500" />
                    </div>
                    <div className="absolute top-1/2 -left-2 transform -translate-y-1/2">
                      <Heart className="h-6 w-6 text-emerald-300" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Brand name with typewriter effect */}
            <h1 className="text-6xl md:text-8xl font-bold mb-4 relative">
              <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500 bg-clip-text text-transparent">
                DARWFIT
              </span>
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400/20 via-emerald-300/20 to-emerald-500/20 blur-2xl -z-10 animate-pulse"></div>
            </h1>
            
            {/* Dynamic badges */}
            <div className="flex justify-center items-center gap-3 mb-6 flex-wrap">
              <Badge className={`bg-gradient-to-r ${features[currentFeature].color} text-white px-6 py-3 text-lg font-bold animate-pulse border-0`}>
                <Crown className="h-5 w-5 ml-2" />
                {features[currentFeature].icon} قوة وإبداع
              </Badge>
              <Badge className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-3 text-lg font-bold animate-bounce">
                <Sparkles className="h-5 w-5 ml-2" />
                مجاني
              </Badge>
              <Badge className="bg-gradient-to-r from-emerald-400 to-emerald-500 text-white px-6 py-3 text-lg font-bold animate-pulse">
                <Trophy className="h-5 w-5 ml-2" />
                #1 في السعودية
              </Badge>
            </div>
          </div>

          {/* Main tagline */}
          <div className="max-w-4xl mx-auto mb-12">
            <p className="text-3xl md:text-4xl text-gray-200 mb-6 leading-relaxed font-bold">
              <span className="text-emerald-400">🔥 حوّل جسمك</span> •{' '}
              <span className="text-emerald-300">⚡ حقق أحلامك</span> •{' '}
              <span className="text-emerald-500">🚀 كن الأفضل</span>
            </p>
            <p className="text-xl text-gray-300 leading-relaxed">
              رحلتك نحو اللياقة المثالية والصحة الدائمة تبدأ من هنا
            </p>
          </div>

          {/* Rotating feature showcase */}
          <div className="mb-12 w-full max-w-3xl">
            <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center justify-center mb-6">
                  <div className={`text-7xl animate-bounce bg-gradient-to-r ${features[currentFeature].color} p-4 rounded-full`}>
                    {features[currentFeature].icon}
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4 animate-pulse">
                  {features[currentFeature].title}
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {features[currentFeature].description}
                </p>
                
                {/* Progress dots */}
                <div className="flex justify-center gap-2 mt-6">
                  {features.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentFeature 
                          ? 'bg-emerald-400 scale-125' 
                          : 'bg-gray-600 hover:bg-gray-500'
                      }`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-16">
            <Button 
              onClick={() => setLocation("/free-login")}
              className="bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-600 hover:from-emerald-600 hover:via-emerald-500 hover:to-emerald-700 text-white font-bold py-6 px-12 rounded-2xl transition-all duration-300 text-xl transform hover:scale-110 hover:shadow-2xl shadow-emerald-500/50 border-0"
            >
              <Play className="h-6 w-6 ml-3" />
              🆓 ابدأ مجاناً الآن
            </Button>
            
            <Button 
              onClick={() => setLocation("/subscription")}
              className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 hover:from-emerald-500 hover:via-emerald-600 hover:to-emerald-700 text-white font-bold py-6 px-12 rounded-2xl transition-all duration-300 text-xl transform hover:scale-110 hover:shadow-2xl shadow-emerald-500/50 border-0"
            >
              <Crown className="h-6 w-6 ml-3" />
              👑 الخطة المميزة
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => setLocation("/calories")}
              className="border-2 border-emerald-400/50 text-emerald-300 hover:bg-emerald-400/10 backdrop-blur-sm py-6 px-12 rounded-2xl transition-all duration-300 text-xl transform hover:scale-110 bg-transparent hover:text-emerald-400"
            >
              <Target className="h-6 w-6 ml-3" />
              🔥 حاسبة السعرات
            </Button>
          </div>

          {/* Member Login Section */}
          <div className="mb-16">
            <Card className="bg-white/5 backdrop-blur-lg border border-white/20 shadow-2xl max-w-md mx-auto">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-4 rounded-full inline-block mb-4">
                    <Users className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">عضو مدفوع؟</h3>
                  <p className="text-gray-300">سجل دخولك للوصول لخطتك المخصصة</p>
                </div>
                
                <Button 
                  onClick={() => setLocation("/login")}
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 text-lg transform hover:scale-105 shadow-lg"
                >
                  <CheckCircle className="h-5 w-5 ml-2" />
                  تسجيل دخول الأعضاء
                </Button>
                
                <p className="text-gray-400 text-sm mt-4">
                  لديك رقم اشتراك؟ استخدمه لتسجيل الدخول
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {achievements.map((achievement, index) => (
            <Card key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 text-center transform hover:scale-105 transition-all duration-300 hover:bg-white/10">
              <CardContent className="p-6">
                <div className="text-4xl mb-3">{achievement.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2 animate-pulse">
                  {achievement.number}
                </div>
                <div className="text-gray-400 text-sm">{achievement.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={`bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-500 hover:bg-white/10 hover:scale-105 cursor-pointer ${
                index === currentFeature ? `border-yellow-400 bg-gradient-to-br ${feature.color}/10 shadow-lg shadow-yellow-400/20` : ''
              }`}
              onClick={() => setCurrentFeature(index)}
            >
              <CardContent className="p-6 text-center">
                <div className="text-5xl mb-4 transform hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h4 className="text-lg font-bold text-white mb-3">{feature.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                {index === currentFeature && (
                  <div className="mt-4">
                    <CheckCircle className="h-6 w-6 text-green-400 mx-auto animate-pulse" />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Success Stories Ticker */}
        <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 backdrop-blur-sm rounded-3xl p-6 mb-8 border border-white/10">
          <div className="flex items-center justify-center gap-4 text-center">
            <Users className="h-8 w-8 text-green-400 animate-pulse" />
            <div className="text-white">
              <p className="text-lg font-bold">🎉 انضم إلى آلاف الأشخاص الذين غيروا حياتهم</p>
              <p className="text-gray-300 text-sm">فقدان وزن • بناء عضلات • لياقة عالية • ثقة أكبر</p>
            </div>
            <Trophy className="h-8 w-8 text-yellow-400 animate-bounce" />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-400 text-sm">
          <div className="flex justify-center items-center gap-2 mb-2">
            <Heart className="h-4 w-4 text-red-500 animate-pulse" />
            <p>صُنع بكل شغف في المملكة العربية السعودية</p>
            <Heart className="h-4 w-4 text-red-500 animate-pulse" />
          </div>
          <p>© 2025 DARWFIT - جميع الحقوق محفوظة</p>
        </div>
      </div>
    </div>
  );
}
