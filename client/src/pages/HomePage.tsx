import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, LogIn } from "lucide-react";

export default function HomePage() {
  const [, navigate] = useLocation();

  return (
    <div className="container mx-auto px-4 py-12 min-h-[calc(100vh-70px)] flex flex-col items-center justify-center">
      <div className="text-center mb-12 animate-fadeIn">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-neutral-900 dark:text-white">
          مرحباً بك في <span className="text-primary">Darw</span>
          <span className="text-secondary">fit</span>
        </h1>
        <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
          برنامجك الشخصي للياقة والتغذية الصحية المصمم خصيصاً لمساعدتك على تحقيق أهدافك
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <div className="animate-fadeIn" style={{ animationDelay: "0.2s" }}>
          <Card className="h-full hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8 flex flex-col h-full justify-between text-center">
              <div>
                <div className="text-primary text-5xl mb-4 flex justify-center">
                  <UserPlus size={56} />
                </div>
                <h2 className="text-2xl font-bold mb-4">اشتراك جديد</h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                  قم بملء استبيان بسيط للبدء في رحلتك نحو لياقة أفضل وصحة أمثل
                </p>
              </div>
              <Button 
                onClick={() => navigate("/subscription")} 
                className="w-full bg-primary hover:bg-primary-dark text-white py-6"
                size="lg"
              >
                اشتراك جديد
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="animate-fadeIn" style={{ animationDelay: "0.3s" }}>
          <Card className="h-full hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8 flex flex-col h-full justify-between text-center">
              <div>
                <div className="text-secondary text-5xl mb-4 flex justify-center">
                  <LogIn size={56} />
                </div>
                <h2 className="text-2xl font-bold mb-4">تسجيل الدخول</h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                  إذا كنت عضواً بالفعل، قم بتسجيل الدخول للوصول إلى برنامجك الشخصي
                </p>
              </div>
              <Button
                onClick={() => navigate("/login")}
                className="w-full bg-secondary hover:bg-secondary-dark text-white py-6"
                size="lg"
              >
                تسجيل الدخول
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
