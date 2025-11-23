import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Leaf, Activity, Apple, Heart, TrendingUp, Shield, Star, Check } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

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

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <Leaf className="w-6 h-6 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-green-600">Darwfit</h1>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button
              onClick={() => setLocation("/signup")}
              className="bg-green-600 hover:bg-green-700 text-white"
              data-testid="button-signup-header"
            >
              إنشاء حساب مجاني
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block mb-6 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full">
            <p className="text-green-700 dark:text-green-400 font-semibold text-sm">
              ✨ منصة مجانية 100% لا توجد اشتراكات
            </p>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            منصتك الذكية للياقة والتغذية العربية
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 leading-relaxed">
            خطط مخصصة، حاسبة سعرات ذكية، تمارين موجهة، وأذكار يومية - كل شيء في مكان واحد
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center mb-16">
            <Button
              onClick={() => setLocation("/signup")}
              className="bg-green-600 hover:bg-green-700 text-white text-lg py-6 px-8"
              data-testid="button-start"
            >
              ابدأ مجاناً الآن
            </Button>
            <Button
              onClick={() => setLocation("/calories")}
              variant="outline"
              className="border-green-600 text-green-600 dark:text-green-400 dark:border-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 text-lg py-6 px-8"
              data-testid="button-calculator"
            >
              جرب حاسبة السعرات
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              <span>مجاني تماماً</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              <span>بدون إعلانات</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              <span>آمان البيانات</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              <span>عربي 100%</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 dark:bg-gray-900/50 py-20">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
            المميزات الرئيسية
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg w-fit mb-4">
                <Apple className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                حاسبة سعرات ذكية
              </h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                ابحث عن أي طعم واحصل على السعرات تلقائياً بدقة
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg w-fit mb-4">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                برامج تدريبية
              </h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                تمارين مخصصة حسب مستواك والأوزان التي تشيلها
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg w-fit mb-4">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                متابعة التقدم
              </h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                تابع تطورك مع رسوم بيانية وإحصائيات مفصلة
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="p-3 bg-pink-100 dark:bg-pink-900 rounded-lg w-fit mb-4">
                <Heart className="w-6 h-6 text-pink-600" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                أذكار يومية
              </h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                أذكار الصباح والمساء مع صوتيات واضحة
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
            ماذا يقول مستخدمونا
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <Card
                key={idx}
                className="p-6 dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-shadow"
                data-testid={`testimonial-${idx}`}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-6 italic">
                  "{testimonial.comment}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{testimonial.avatar}</div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/40 py-20">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            هل أنت مستعد لتغيير حياتك؟
          </h3>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            انضم إلى الآلاف من المستخدمين الذين غيروا حياتهم مع Darwfit
          </p>
          <Button
            onClick={() => setLocation("/signup")}
            className="bg-green-600 hover:bg-green-700 text-white text-lg py-6 px-12"
            data-testid="button-cta"
          >
            ابدأ مجاناً اليوم
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-gray-400 py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">Darwfit © 2024</p>
          <p className="text-sm">منصة عربية مجانية للياقة والتغذية</p>
        </div>
      </footer>
    </div>
  );
}
