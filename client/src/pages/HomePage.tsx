import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Leaf, Activity, Apple, Heart, TrendingUp, Shield, Star, Check, Zap, Sparkles } from "lucide-react";
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
  const { t } = useLanguage();

  return (
    <>
      <SEOHead 
        title="Darwfit - منصة اللياقة الذكية | حاسبة سعرات وتمارين مخصصة"
        description="Darwfit - منصة عربية شاملة للياقة والتغذية. حاسبة وجبات ذكية بـ 10,000+ طعام، تمارين مخصصة، خطط تغذية، وأذكار إسلامية. مجاني 100% بدون اشتراكات."
      />
      <div className="min-h-screen bg-white dark:bg-gradient-to-b dark:from-slate-950 dark:via-slate-900 dark:to-black overflow-hidden">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-400 dark:bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-600 dark:bg-green-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-pulse" style={{ animationDelay: "2s" }}></div>
          <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-blue-400 dark:bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 dark:opacity-5 animate-pulse" style={{ animationDelay: "4s" }}></div>
        </div>

        <div className="relative z-10">
          {/* Header */}
          <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl">
            <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center bg-gradient-to-br from-green-500 to-green-600 dark:from-green-500 dark:to-green-700 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl hover:shadow-2xl transition-shadow" data-testid="logo-icon">
                  <Leaf className="w-6 h-6 sm:w-9 sm:h-9 text-white stroke-[2.5]" strokeWidth={2.5} />
                </div>
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black bg-gradient-to-r from-green-600 to-green-700 dark:from-green-400 dark:to-green-500 bg-clip-text text-transparent" data-testid="logo-text">
                  Darwfit
                </h1>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 md:gap-4">
                <LanguageToggle />
                <ThemeToggle />
                <Button
                  onClick={() => setLocation("/signup")}
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg shadow-green-600/50 dark:shadow-green-600/30"
                  size="sm"
                  data-testid="button-signup-header"
                >
                  <span className="hidden sm:inline text-sm">{t.home.startYourJourney}</span>
                  <span className="sm:hidden text-xs">ابدأ</span>
                </Button>
              </div>
            </div>
          </header>

          {/* Hero Section */}
          <section className="container mx-auto px-4 py-12 sm:py-16 md:py-20 lg:py-28 text-center relative">
            <div className="max-w-5xl mx-auto">
              <div className="inline-block mb-6 sm:mb-8 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/20 rounded-full border border-green-200 dark:border-green-800/50 backdrop-blur">
                <p className="text-green-700 dark:text-green-400 font-bold text-xs sm:text-sm flex items-center justify-center gap-2">
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">✨ منصة مجانية 100% - بدون اشتراكات مخفية</span>
                  <span className="sm:hidden">✨ مجاني 100%</span>
                </p>
              </div>

              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-gray-900 dark:text-white mb-6 sm:mb-8 leading-tight px-2">
                حول جسدك <span className="bg-gradient-to-r from-green-600 to-green-700 dark:from-green-400 dark:to-green-500 bg-clip-text text-transparent">الآن</span>
              </h2>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 mb-8 sm:mb-12 leading-relaxed max-w-3xl mx-auto px-4">
                حاسبة وجبات ذكية بآلاف الأطعمة، تمارين مخصصة، وأذكار يومية - كل ما تحتاجه في تطبيق واحد
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 sm:mb-16 px-4">
                <Button
                  onClick={() => setLocation("/signup")}
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-base sm:text-lg py-5 sm:py-6 md:py-7 px-6 sm:px-8 md:px-10 shadow-2xl shadow-green-600/40 dark:shadow-green-600/20 rounded-xl sm:rounded-2xl font-bold flex items-center justify-center gap-2 w-full sm:w-auto"
                  data-testid="button-start"
                >
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">ابدأ تحويلك اليوم</span>
                  <span className="sm:hidden">ابدأ الآن</span>
                </Button>
                <Button
                  onClick={() => setLocation("/calories")}
                  variant="outline"
                  className="border-2 border-green-600 dark:border-green-400 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 text-base sm:text-lg py-5 sm:py-6 md:py-7 px-6 sm:px-8 md:px-10 rounded-xl sm:rounded-2xl font-bold flex items-center justify-center gap-2 w-full sm:w-auto"
                  data-testid="button-calculator"
                >
                  <Apple className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">جرب حاسبة الوجبات</span>
                  <span className="sm:hidden">الحاسبة</span>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8 mb-6 sm:mb-8 px-2 max-w-3xl mx-auto">
                <div className="p-4 sm:p-4 md:p-6 bg-white/50 dark:bg-gray-800/30 backdrop-blur border border-gray-200/50 dark:border-gray-700/50 rounded-xl sm:rounded-2xl">
                  <div className="text-3xl sm:text-3xl md:text-4xl font-black text-green-600 dark:text-green-400">10K+</div>
                  <div className="text-sm sm:text-sm md:text-base text-gray-600 dark:text-gray-400 mt-2">
                    وجبة وطعام
                  </div>
                </div>
                <div className="p-4 sm:p-4 md:p-6 bg-white/50 dark:bg-gray-800/30 backdrop-blur border border-gray-200/50 dark:border-gray-700/50 rounded-xl sm:rounded-2xl">
                  <div className="text-3xl sm:text-3xl md:text-4xl font-black text-blue-600 dark:text-blue-400">500+</div>
                  <div className="text-sm sm:text-sm md:text-base text-gray-600 dark:text-gray-400 mt-2">
                    تمرين مختلف
                  </div>
                </div>
                <div className="p-4 sm:p-4 md:p-6 bg-white/50 dark:bg-gray-800/30 backdrop-blur border border-gray-200/50 dark:border-gray-700/50 rounded-xl sm:rounded-2xl">
                  <div className="text-3xl sm:text-3xl md:text-4xl font-black text-purple-600 dark:text-purple-400">مجاني</div>
                  <div className="text-sm sm:text-sm md:text-base text-gray-600 dark:text-gray-400 mt-2">
                    بلا شروط
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm text-gray-700 dark:text-gray-300 px-4">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="p-1 sm:p-1.5 bg-green-100 dark:bg-green-900/30 rounded-lg"><Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 dark:text-green-400" /></div>
                  <span className="font-semibold">مجاني تماماً</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="p-1 sm:p-1.5 bg-green-100 dark:bg-green-900/30 rounded-lg"><Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 dark:text-green-400" /></div>
                  <span className="font-semibold">بدون إعلانات</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="p-1 sm:p-1.5 bg-green-100 dark:bg-green-900/30 rounded-lg"><Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 dark:text-green-400" /></div>
                  <span className="font-semibold">حماية البيانات</span>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-12 sm:py-16 md:py-20 px-4">
            <div className="container mx-auto">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-center text-gray-900 dark:text-white mb-8 sm:mb-12 md:mb-16 px-4">
                الميزات <span className="bg-gradient-to-r from-green-600 to-green-700 dark:from-green-400 dark:to-green-500 bg-clip-text text-transparent">المذهلة</span>
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <Card className="p-6 sm:p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300 dark:bg-gray-800/50 dark:border-gray-700/50 border-gray-200 backdrop-blur">
                  <div className="p-3 sm:p-4 bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/20 rounded-xl sm:rounded-2xl w-fit mb-4 sm:mb-6">
                    <Apple className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
                    10,000+ وجبة
                  </h4>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    حاسبة ذكية تتعرف على أي وجبة واحسب السعرات فوراً
                  </p>
                </Card>

                <Card className="p-6 sm:p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300 dark:bg-gray-800/50 dark:border-gray-700/50 border-gray-200 backdrop-blur">
                  <div className="p-3 sm:p-4 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20 rounded-xl sm:rounded-2xl w-fit mb-4 sm:mb-6">
                    <Activity className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
                    تمارين مخصصة
                  </h4>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    برامج تدريبية حسب هدفك والأوزان التي تشيلها
                  </p>
                </Card>

                <Card className="p-6 sm:p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300 dark:bg-gray-800/50 dark:border-gray-700/50 border-gray-200 backdrop-blur">
                  <div className="p-3 sm:p-4 bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-900/30 dark:to-purple-800/20 rounded-xl sm:rounded-2xl w-fit mb-4 sm:mb-6">
                    <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
                    خطط تغذية
                  </h4>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    خطط غذائية مخصصة تناسب أهدافك وتفضيلاتك
                  </p>
                </Card>

                <Card className="p-6 sm:p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300 dark:bg-gray-800/50 dark:border-gray-700/50 border-gray-200 backdrop-blur">
                  <div className="p-3 sm:p-4 bg-gradient-to-br from-orange-100 to-orange-50 dark:from-orange-900/30 dark:to-orange-800/20 rounded-xl sm:rounded-2xl w-fit mb-4 sm:mb-6">
                    <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600 dark:text-orange-400" />
                  </div>
                  <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
                    آمان وأذكار
                  </h4>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    أذكار إسلامية يومية وحماية كاملة لبيانات المستخدمين
                  </p>
                </Card>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="py-12 sm:py-16 md:py-20 px-4 bg-gray-50 dark:bg-gray-800/50">
            <div className="container mx-auto">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-center text-gray-900 dark:text-white mb-8 sm:mb-12 md:mb-16 px-4">
                آراء <span className="bg-gradient-to-r from-green-600 to-green-700 dark:from-green-400 dark:to-green-500 bg-clip-text text-transparent">المستخدمين</span>
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {testimonials.map((testimonial, index) => (
                  <Card key={index} className="p-6 sm:p-8 dark:bg-gray-800/50 dark:border-gray-700/50 border-gray-200 backdrop-blur">
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
            <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-green-700/20 dark:from-green-600/10 dark:to-green-700/10"></div>
            <div className="container mx-auto text-center relative z-10">
              <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-6 sm:mb-8 px-4">
                جاهز لبدء <span className="bg-gradient-to-r from-green-600 to-green-700 dark:from-green-400 dark:to-green-500 bg-clip-text text-transparent">التحول</span>؟
              </h3>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
                انضم لآلاف الأشخاص الذين تغيرت حياتهم مع Darwfit - مجاني، سهل، وفعال
              </p>
              <Button
                onClick={() => setLocation("/signup")}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-2xl shadow-green-600/40 dark:shadow-green-600/20 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg md:text-xl py-4 px-8 sm:py-6 sm:px-12 md:py-8 md:px-16 w-full sm:w-auto max-w-md mx-auto"
                data-testid="button-cta"
              >
                ابدأ الآن مجاناً
              </Button>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-gray-900 dark:bg-black text-gray-400 py-16 border-t border-gray-800">
            <div className="container mx-auto px-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Leaf className="w-6 h-6 text-green-600" />
                <p className="font-bold text-xl">Darwfit</p>
              </div>
              <p className="mb-2">منصة عربية ذكية للياقة والتغذية</p>
              <p className="text-sm">© 2024 جميع الحقوق محفوظة</p>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
