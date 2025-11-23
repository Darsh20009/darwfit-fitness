import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Leaf, ArrowLeft } from "lucide-react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "خطأ",
        description: "كلمات المرور غير متطابقة",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "خطأ",
        description: "كلمة المرور يجب أن تكون 6 أحرف على الأقل",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.toLowerCase(),
          password,
          name,
          age: 25,
          gender: "male",
          height: 170,
          weight: 75,
          primaryGoal: "maintain",
          activityLevel: "moderate",
          budget: 1000,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("auth", JSON.stringify(data));
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        
        toast({
          title: "نجاح",
          description: "تم إنشاء الحساب بنجاح",
        });
        setLocation("/dashboard");
      } else {
        const error = await response.json();
        toast({
          title: "خطأ",
          description: error.error || "فشل إنشاء الحساب",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء إنشاء الحساب",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-slate-900 dark:from-black dark:to-slate-950">
      <Card className="w-full max-w-md mx-4 p-8 bg-white dark:bg-slate-900">
        <div className="flex items-center justify-center mb-8">
          <Leaf className="w-8 h-8 text-green-600 mr-2" />
          <h1 className="text-3xl font-bold text-green-600">Darwfit</h1>
        </div>

        <h2 className="text-2xl font-bold text-center mb-6 text-foreground">
          إنشاء حساب جديد
        </h2>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">
              الاسم الكامل
            </label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="أدخل اسمك الكامل"
              data-testid="input-name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">
              البريد الإلكتروني
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              data-testid="input-email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">
              كلمة المرور
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              data-testid="input-password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">
              تأكيد كلمة المرور
            </label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              data-testid="input-confirm-password"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
            data-testid="button-signup"
          >
            {loading ? "جاري الإنشاء..." : "إنشاء الحساب"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-muted-foreground">
            لديك حساب بالفعل؟{" "}
            <button
              onClick={() => setLocation("/login")}
              className="text-green-600 hover:text-green-700 font-semibold"
              data-testid="link-login"
            >
              تسجيل الدخول
            </button>
          </p>
        </div>

        <button
          onClick={() => setLocation("/")}
          className="mt-4 flex items-center justify-center w-full text-muted-foreground hover:text-foreground gap-2"
          data-testid="button-back"
        >
          <ArrowLeft className="w-4 h-4" />
          العودة للرئيسية
        </button>
      </Card>
    </div>
  );
}
