import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Leaf, Activity, Apple, Heart, TrendingUp, Shield, Star, Check, Zap, Sparkles, ArrowRight } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/context/LanguageContext";
import { SEOHead } from "@/components/SEOHead";

const testimonials = [
  {
    name: "أحمد الدوسري",
    role: "لاعب كمال أجسام",
    comment: "منصة رائعة ساعدتني على تحقيق أهدافي في 3 أشهر فقط",
    rating: 5,
    avatar: "🏋️",
  },
  {
    name: "سارة الحربي",
    role: "خبيرة تغذية",
    comment: "الحاسبة الذكية للسعرات توفر الكثير من الوقت والجهد",
    rating: 5,
    avatar: "👨‍⚕️",
  },
  {
    name: "محمد السعد",
    role: "محترف اللياقة",
    comment: "أفضل منصة عربية للتدريب والتغذية بلا منازع",
    rating: 5,
    avatar: "💪",
  },
];

export default function HomePage() {
  const [, setLocation] = useLocation();
  const { t, language } = useLanguage();

  return (
    <>
      <SEOHead 
        title="Darwfit - منصة اللياقة الذكية | حاسبة سعرات وتمارين مخصصة"
        description="Darwfit - منصة عربية شاملة للياقة والتغذية. حاسبة وجبات ذكية بـ 10,000+ طعام، تمارين مخصصة، خطط تغذية، وأذكار إسلامية. مجاني 100% بدون اشتراكات."
      />
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white dark:bg-gradient-to-br dark:from-slate-950 dark:via-blue-950 dark:to-black overflow-hidden">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-400 dark:bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600 dark:bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-15 dark:opacity-5 animate-pulse" style={{ animationDelay: "2s" }}></div>
          <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-purple-400 dark:bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-5 animate-pulse" style={{ animationDelay: "4s" }}></div>
        </div>

        <div className="relative z-10">
          {/* Header */}
          <header className="sticky top-0 z-50 border-b border-gray-200/50 dark:border-gray-800/50 bg-white/70 dark:bg-slate-950/70 backdrop-blur-2xl">
            <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center bg-gradient-to-br from-green-500 to-green-600 dark:from-green-500 dark:to-green-700 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110" data-testid="logo-icon">
                  <Leaf className="w-6 h-6 sm:w-9 sm:h-9 text-white stroke-[2.5]" strokeWidth={2.5} />
                </div>
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black bg-gradient-to-r from-green-600 via-green-600 to-blue-600 dark:from-green-400 dark:via-green-400 dark:to-blue-400 bg-clip-text text-transparent" data-testid="logo-text">
                  Darwfit
                </h1>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 md:gap-4">
                <LanguageToggle />
                <ThemeToggle />
                <Button
                  onClick={() => setLocation("/signup")}
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg shadow-green-600/50 dark:shadow-green-600/30 hover:shadow-xl transition-all duration-300"
                  size="sm"
                  data-testid="button-signup-header"
                >
                  <span className="hidden sm:inline text-sm">{t.home.startYourJourney}</span>
                  <span className="sm:hidden text-xs">{language === "ar" ? "ابدأ" : "Start"}</span>
                </Button>
              </div>
            </div>
          </header>

          {/* Hero Section */}
          <section className="container mx-auto px-4 py-12 sm:py-16 md:py-20 lg:py-28 text-center relative">
            <div className="max-w-5xl mx-auto">
              <div className="inline-block mb-6 sm:mb-8 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/40 dark:to-blue-900/40 rounded-full border border-green-200 dark:border-green-800/50 backdrop-blur">
                <p className="text-green-700 dark:text-green-400 font-bold text-xs sm:text-sm flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">{language === "ar" ? "✨ منصة مجانية 100% - بدون اشتراكات مخفية" : "✨ 100% Free Platform - No Hidden Fees"}</span>
                  <span className="sm:hidden">{language === "ar" ? "✨ مجاني 100%" : "✨ 100% Free"}</span>
                </p>
              </div>

              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-gray-900 dark:text-white mb-6 sm:mb-8 leading-tight px-2">
                {language === "ar" ? "حول جسدك " : "Transform Your "}
                <span className="bg-gradient-to-r from-green-600 via-blue-600 to-green-600 dark:from-green-400 dark:via-blue-400 dark:to-green-400 bg-clip-text text-transparent animate-pulse">
                  {language === "ar" ? "الآن" : "Body"}
                </span>
              </h2>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 mb-8 sm:mb-12 leading-relaxed max-w-3xl mx-auto px-4">
                {language === "ar"
                  ? "حاسبة وجبات ذكية بآلاف الأطعمة، تمارين مخصصة، خطط تغذية متقدمة، وأذكار إسلامية يومية - كل ما تحتاجه في تطبيق واحد"
                  : "Smart meal calculator with thousands of foods, personalized exercises, advanced nutrition plans, and daily Islamic reminders - everything you need in one app"}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 sm:mb-16 px-4">
                <Button
                  onClick={() => setLocation("/signup")}
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-base sm:text-lg py-5 sm:py-6 md:py-7 px-6 sm:px-8 md:px-10 shadow-2xl shadow-green-600/40 dark:shadow-green-600/20 rounded-xl sm:rounded-2xl font-bold flex items-center justify-center gap-2 w-full sm:w-auto hover:shadow-xl hover:scale-105 transition-all duration-300"
                  data-testid="button-start"
                >
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="hidden sm:inline">{t.home.startYourJourney}</span>
                  <span className="sm:hidden">{language === "ar" ? "ابدأ الآن" : "Start Now"}</span>
                </Button>
                <Button
                  onClick={() => setLocation("/calories")}
                  variant="outline"
                  className="border-2 border-green-600 dark:border-green-400 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 text-base sm:text-lg py-5 sm:py-6 md:py-7 px-6 sm:px-8 md:px-10 rounded-xl sm:rounded-2xl font-bold flex items-center justify-center gap-2 w-full sm:w-auto hover:scale-105 transition-all duration-300"
                  data-testid="button-calculator"
                >
                  <Apple className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="hidden sm:inline">{t.home.tryMealCalculator}</span>
                  <span className="sm:hidden">{language === "ar" ? "حاسبة" : "Calculator"}</span>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8 mb-6 sm:mb-8 px-2 max-w-3xl mx-auto">
                <Card className="p-4 sm:p-6 bg-white/60 dark:bg-gray-800/40 backdrop-blur-lg border border-gray-200/60 dark:border-gray-700/60 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 bg-clip-text text-transparent">10K+</div>
                  <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2 font-semibold">
                    {language === "ar" ? "وجبة وطعام" : "Food Items"}
                  </div>
                </Card>
                <Card className="p-4 sm:p-6 bg-white/60 dark:bg-gray-800/40 backdrop-blur-lg border border-gray-200/60 dark:border-gray-700/60 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">500+</div>
                  <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2 font-semibold">
                    {language === "ar" ? "تمرين مختلف" : "Exercises"}
                  </div>
                </Card>
                <Card className="p-4 sm:p-6 bg-white/60 dark:bg-gray-800/40 backdrop-blur-lg border border-gray-200/60 dark:border-gray-700/60 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">{language === "ar" ? "مجاني" : "FREE"}</div>
                  <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2 font-semibold">
                    {language === "ar" ? "بلا شروط" : "Forever"}
                  </div>
                </Card>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm text-gray-700 dark:text-gray-300 px-4">
                <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-2 bg-green-100/60 dark:bg-green-900/30 rounded-full">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400" />
                  <span className="font-semibold">{language === "ar" ? "مجاني تماماً" : "100% Free"}</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-2 bg-blue-100/60 dark:bg-blue-900/30 rounded-full">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
                  <span className="font-semibold">{language === "ar" ? "بدون إعلانات" : "No Ads"}</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-2 bg-purple-100/60 dark:bg-purple-900/30 rounded-full">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400" />
                  <span className="font-semibold">{language === "ar" ? "حماية البيانات" : "Secure Data"}</span>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="py-12 sm:py-16 md:py-20 px-4 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-900/20 dark:to-transparent">
            <div className="container mx-auto">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-center text-gray-900 dark:text-white mb-8 sm:mb-12 md:mb-16 px-4">
                {t.home.howItWorks}
              </h3>
              <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
                <div className="relative">
                  <div className="absolute top-0 left-0 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg">
                    1
                  </div>
                  <Card className="p-6 sm:p-8 pt-20 sm:pt-24 text-center hover:shadow-lg transition-all duration-300 dark:bg-gray-800/50">
                    <div className="text-4xl mb-4">📝</div>
                    <h4 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {t.home.step1}
                    </h4>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                      {t.home.step1Desc}
                    </p>
                  </Card>
                </div>

                <div className="relative hidden sm:block">
                  <div className="absolute top-1/3 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-transparent -z-10"></div>
                </div>

                <div className="relative">
                  <div className="absolute top-0 left-0 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg">
                    2
                  </div>
                  <Card className="p-6 sm:p-8 pt-20 sm:pt-24 text-center hover:shadow-lg transition-all duration-300 dark:bg-gray-800/50">
                    <div className="text-4xl mb-4">✨</div>
                    <h4 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {t.home.step2}
                    </h4>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                      {t.home.step2Desc}
                    </p>
                  </Card>
                </div>

                <div className="relative hidden sm:block">
                  <div className="absolute top-1/3 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-transparent -z-10"></div>
                </div>

                <div className="relative">
                  <div className="absolute top-0 left-0 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg">
                    3
                  </div>
                  <Card className="p-6 sm:p-8 pt-20 sm:pt-24 text-center hover:shadow-lg transition-all duration-300 dark:bg-gray-800/50">
                    <div className="text-4xl mb-4">🚀</div>
                    <h4 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {t.home.step3}
                    </h4>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                      {t.home.step3Desc}
                    </p>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-12 sm:py-16 md:py-20 px-4">
            <div className="container mx-auto">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-center text-gray-900 dark:text-white mb-8 sm:mb-12 md:mb-16 px-4">
                {language === "ar" ? "الميزات " : "Amazing "}
                <span className="bg-gradient-to-r from-green-600 via-blue-600 to-green-600 dark:from-green-400 dark:via-blue-400 dark:to-green-400 bg-clip-text text-transparent">
                  {language === "ar" ? "المذهلة" : "Features"}
                </span>
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <Card className="p-6 sm:p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300 dark:bg-gray-800/50 dark:border-gray-700/50 border-gray-200 backdrop-blur group">
                  <div className="p-3 sm:p-4 bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/20 rounded-xl sm:rounded-2xl w-fit mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Apple className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
                    {language === "ar" ? "10,000+ وجبة" : "10K+ Foods"}
                  </h4>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    {language === "ar" ? "حاسبة ذكية تتعرف على أي وجبة واحسب السعرات فوراً" : "Smart calculator recognizes any meal and calculates calories instantly"}
                  </p>
                </Card>

                <Card className="p-6 sm:p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300 dark:bg-gray-800/50 dark:border-gray-700/50 border-gray-200 backdrop-blur group">
                  <div className="p-3 sm:p-4 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20 rounded-xl sm:rounded-2xl w-fit mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Activity className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
                    {language === "ar" ? "تمارين مخصصة" : "Custom Workouts"}
                  </h4>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    {language === "ar" ? "برامج تدريبية حسب هدفك والأوزان التي تشيلها" : "Training programs tailored to your goals and strength level"}
                  </p>
                </Card>

                <Card className="p-6 sm:p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300 dark:bg-gray-800/50 dark:border-gray-700/50 border-gray-200 backdrop-blur group">
                  <div className="p-3 sm:p-4 bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-900/30 dark:to-purple-800/20 rounded-xl sm:rounded-2xl w-fit mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
                    {language === "ar" ? "خطط تغذية" : "Nutrition Plans"}
                  </h4>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    {language === "ar" ? "خطط غذائية مخصصة تناسب أهدافك وتفضيلاتك" : "Personalized meal plans matching your goals and preferences"}
                  </p>
                </Card>

                <Card className="p-6 sm:p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300 dark:bg-gray-800/50 dark:border-gray-700/50 border-gray-200 backdrop-blur group">
                  <div className="p-3 sm:p-4 bg-gradient-to-br from-orange-100 to-orange-50 dark:from-orange-900/30 dark:to-orange-800/20 rounded-xl sm:rounded-2xl w-fit mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600 dark:text-orange-400" />
                  </div>
                  <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
                    {language === "ar" ? "آمان وأذكار" : "Islamic Azkar"}
                  </h4>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    {language === "ar" ? "أذكار إسلامية يومية وحماية كاملة لبيانات المستخدمين" : "Daily Islamic reminders with complete data protection"}
                  </p>
                </Card>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="py-12 sm:py-16 md:py-20 px-4 bg-gradient-to-b from-gray-50/50 to-transparent dark:from-gray-800/30 dark:to-transparent">
            <div className="container mx-auto">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-center text-gray-900 dark:text-white mb-8 sm:mb-12 md:mb-16 px-4">
                {language === "ar" ? "آراء " : "User "}
                <span className="bg-gradient-to-r from-green-600 via-blue-600 to-green-600 dark:from-green-400 dark:via-blue-400 dark:to-green-400 bg-clip-text text-transparent">
                  {language === "ar" ? "المستخدمين" : "Reviews"}
                </span>
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {testimonials.map((testimonial, index) => (
                  <Card key={index} className="p-6 sm:p-8 dark:bg-gray-800/50 dark:border-gray-700/50 border-gray-200 backdrop-blur hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <div className="flex items-start justify-between mb-4 sm:mb-6">
                      <div className="text-4xl sm:text-5xl">{testimonial.avatar}</div>
                      <div className="flex gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 italic">{testimonial.comment}</p>
                    <div>
                      <p className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">{testimonial.name}</p>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 sm:py-20 md:py-24 px-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600/15 via-blue-600/15 to-green-600/15 dark:from-green-600/5 dark:via-blue-600/5 dark:to-green-600/5"></div>
            <div className="container mx-auto text-center relative z-10">
              <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-6 sm:mb-8 px-4">
                {language === "ar" ? "جاهز لبدء " : "Ready to Start Your "}
                <span className="bg-gradient-to-r from-green-600 via-blue-600 to-green-600 dark:from-green-400 dark:via-blue-400 dark:to-green-400 bg-clip-text text-transparent">
                  {language === "ar" ? "التحول؟" : "Transformation?"}
                </span>
              </h3>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
                {language === "ar"
                  ? "انضم لآلاف الأشخاص الذين تغيرت حياتهم مع Darwfit - مجاني، سهل، وفعال"
                  : "Join thousands who transformed their lives with Darwfit - Free, Easy, and Effective"}
              </p>
              <Button
                onClick={() => setLocation("/signup")}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-2xl shadow-green-600/40 dark:shadow-green-600/20 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg md:text-xl py-4 px-8 sm:py-6 sm:px-12 md:py-8 md:px-16 w-full sm:w-auto max-w-md mx-auto hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                data-testid="button-cta"
              >
                {language === "ar" ? "ابدأ الآن مجاناً" : "Start Free Today"}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-gradient-to-b from-gray-900 to-black dark:from-black dark:to-black text-gray-400 py-16 border-t border-gray-800">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 mb-12">
                <div className="text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-4">
                    <Leaf className="w-6 h-6 text-green-600" />
                    <p className="font-bold text-xl text-white">Darwfit</p>
                  </div>
                  <p className="text-sm">{language === "ar" ? "منصة عربية ذكية للياقة والتغذية" : "Smart Arabic platform for fitness and nutrition"}</p>
                </div>
                <div className="text-center">
                  <h4 className="font-bold text-white mb-4">{language === "ar" ? "المميزات" : "Features"}</h4>
                  <ul className="space-y-2 text-sm">
                    <li><button onClick={() => setLocation("/calories")} className="hover:text-green-400 transition-colors">{language === "ar" ? "حاسبة الوجبات" : "Meal Calculator"}</button></li>
                    <li><button onClick={() => setLocation("/nutrition-plan")} className="hover:text-green-400 transition-colors">{language === "ar" ? "خطط التغذية" : "Nutrition Plans"}</button></li>
                    <li><button onClick={() => setLocation("/exercise-plan")} className="hover:text-green-400 transition-colors">{language === "ar" ? "التمارين" : "Exercises"}</button></li>
                  </ul>
                </div>
                <div className="text-center sm:text-right">
                  <h4 className="font-bold text-white mb-4">{language === "ar" ? "حسابك" : "Account"}</h4>
                  <ul className="space-y-2 text-sm">
                    <li><button onClick={() => setLocation("/login")} className="hover:text-green-400 transition-colors">{language === "ar" ? "تسجيل الدخول" : "Login"}</button></li>
                    <li><button onClick={() => setLocation("/signup")} className="hover:text-green-400 transition-colors">{language === "ar" ? "إنشاء حساب" : "Sign Up"}</button></li>
                    <li><button onClick={() => setLocation("/profile")} className="hover:text-green-400 transition-colors">{language === "ar" ? "الملف الشخصي" : "Profile"}</button></li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-gray-800 pt-8 text-center">
                <p className="text-sm">© 2024 {language === "ar" ? "جميع الحقوق محفوظة" : "All Rights Reserved"}</p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
