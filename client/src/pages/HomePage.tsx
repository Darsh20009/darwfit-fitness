import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Leaf, Activity, Apple, Heart, TrendingUp, Users, Shield } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function HomePage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-slate-950 dark:from-black dark:to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800 bg-black/50 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="w-8 h-8 text-green-600" />
            <h1 className="text-2xl font-bold text-green-600">Darwfit</h1>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button
              onClick={() => setLocation("/login")}
              className="bg-green-600 hover:bg-green-700 text-white"
              data-testid="button-login-header"
            >
              تسجيل الدخول
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <Leaf className="w-16 h-16 text-green-600" />
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
            منصة اللياقة والتغذية الذكية
          </h2>
          <p className="text-xl text-slate-300 mb-12 leading-relaxed">
            خطط مخصصة للتمارين والتغذية مع متابعة يومية وتقارير شاملة وأذكار يومية
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button
              onClick={() => setLocation("/login")}
              className="bg-green-600 hover:bg-green-700 text-white text-lg py-6 px-8"
              data-testid="button-start"
            >
              ابدأ الآن
            </Button>
            <Button
              onClick={() => setLocation("/azkar")}
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-600/10 text-lg py-6 px-8"
              data-testid="button-azkar"
            >
              أذكار اليوم
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
          المميزات الرئيسية
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 bg-slate-900 border-slate-800 hover:border-green-600/50 transition-colors">
            <Apple className="w-8 h-8 text-green-600 mb-4" />
            <h4 className="text-lg font-bold text-white mb-2">خطط تغذية</h4>
            <p className="text-slate-400 text-sm">
              خطط غذائية مخصصة بناءً على أهدافك وميزانيتك
            </p>
          </Card>

          <Card className="p-6 bg-slate-900 border-slate-800 hover:border-green-600/50 transition-colors">
            <Activity className="w-8 h-8 text-green-600 mb-4" />
            <h4 className="text-lg font-bold text-white mb-2">تمارين</h4>
            <p className="text-slate-400 text-sm">
              برامج تدريبية متقدمة لجميع المستويات والأماكن
            </p>
          </Card>

          <Card className="p-6 bg-slate-900 border-slate-800 hover:border-green-600/50 transition-colors">
            <TrendingUp className="w-8 h-8 text-green-600 mb-4" />
            <h4 className="text-lg font-bold text-white mb-2">متابعة يومية</h4>
            <p className="text-slate-400 text-sm">
              تابع تقدمك يومياً مع رسوم بيانية وإحصائيات
            </p>
          </Card>

          <Card className="p-6 bg-slate-900 border-slate-800 hover:border-green-600/50 transition-colors">
            <Heart className="w-8 h-8 text-green-600 mb-4" />
            <h4 className="text-lg font-bold text-white mb-2">أذكار</h4>
            <p className="text-slate-400 text-sm">
              أذكار يومية مع ميزات صوتية وشاملة
            </p>
          </Card>

          <Card className="p-6 bg-slate-900 border-slate-800 hover:border-green-600/50 transition-colors">
            <Shield className="w-8 h-8 text-green-600 mb-4" />
            <h4 className="text-lg font-bold text-white mb-2">أمان البيانات</h4>
            <p className="text-slate-400 text-sm">
              بيانات آمنة ومشفرة مع حماية كاملة
            </p>
          </Card>

          <Card className="p-6 bg-slate-900 border-slate-800 hover:border-green-600/50 transition-colors">
            <Users className="w-8 h-8 text-green-600 mb-4" />
            <h4 className="text-lg font-bold text-white mb-2">دعم 24/7</h4>
            <p className="text-slate-400 text-sm">
              فريق دعم متاح على مدار الساعة
            </p>
          </Card>

          <Card className="p-6 bg-slate-900 border-slate-800 hover:border-green-600/50 transition-colors">
            <Leaf className="w-8 h-8 text-green-600 mb-4" />
            <h4 className="text-lg font-bold text-white mb-2">طبيعي وصحي</h4>
            <p className="text-slate-400 text-sm">
              تركيز على الصحة الطبيعية والمستدامة
            </p>
          </Card>

          <Card className="p-6 bg-slate-900 border-slate-800 hover:border-green-600/50 transition-colors">
            <TrendingUp className="w-8 h-8 text-green-600 mb-4" />
            <h4 className="text-lg font-bold text-white mb-2">نتائج مثبتة</h4>
            <p className="text-slate-400 text-sm">
              آلاف الحالات الناجحة والمرضى الراضون
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-green-900/30 to-black border border-green-600/50 rounded-lg p-12 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            جاهز لتغيير حياتك؟
          </h3>
          <p className="text-lg text-slate-300 mb-8">
            انضم إلى الآلاف الذين حققوا أهدافهم مع Darwfit
          </p>
          <Button
            onClick={() => setLocation("/login")}
            className="bg-green-600 hover:bg-green-700 text-white text-lg py-6 px-12"
            data-testid="button-cta"
          >
            ابدأ مجاناً الآن
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-black/50 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-slate-400">
          <p>&copy; 2025 Darwfit - منصة اللياقة والتغذية الذكية. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  );
}
