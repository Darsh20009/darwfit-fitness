
import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff, User, Lock, Shield, Crown, Star, ArrowLeft } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const { login } = useAuth();
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [subscriptionId, setSubscriptionId] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Check login with the correct credentials combo
      if (username === "محمد السهلي") {
        if (password !== "123456" || subscriptionId !== "5001") {
          toast({
            title: "خطأ في تسجيل الدخول",
            description: "اسم المستخدم أو كلمة المرور أو رقم الاشتراك غير صحيح",
            variant: "destructive",
          });
          return;
        }
      } else if (username === "يوسف درويش") {
        if (password !== "182009" || subscriptionId !== "2009") {
          toast({
            title: "خطأ في تسجيل الدخول",
            description: "اسم المستخدم أو كلمة المرور أو رقم الاشتراك غير صحيح",
            variant: "destructive",
          });
          return;
        }
      } else {
        // For other users, check credentials
        if (password !== "123456") {
          toast({
            title: "خطأ في تسجيل الدخول",
            description: "اسم المستخدم أو كلمة المرور غير صحيحة",
            variant: "destructive",
          });
          return;
        }
      }
      
      // Login credentials check
      const isSuccess = login(username, password);
      
      if (isSuccess) {
        toast({
          title: "تم تسجيل الدخول بنجاح! 🎉",
          description: `مرحباً ${username}، يمكنك الآن الوصول لخطتك المخصصة`,
        });
        setLocation("/dashboard");
      } else {
        toast({
          title: "خطأ في تسجيل الدخول",
          description: "اسم المستخدم أو كلمة المرور غير صحيحة",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تسجيل الدخول",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 flex items-center justify-center">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-lg mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center items-center mb-6">
              <Crown className="h-16 w-16 text-purple-500 ml-4 animate-pulse" />
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                  👑 عضوية مميزة
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  ادخل إلى عالم الخطط المخصصة والمتابعة الحصرية
                </p>
              </div>
              <Star className="h-16 w-16 text-purple-500 mr-4 animate-spin" style={{animationDuration: '3s'}} />
            </div>
            
            <div className="flex justify-center gap-3 mb-4">
              <Badge className="px-4 py-2 bg-purple-100 text-purple-700 border-purple-300">
                💎 خطط حصرية
              </Badge>
              <Badge className="px-4 py-2 bg-blue-100 text-blue-700 border-blue-300">
                👨‍⚕️ متابعة مع مدربين
              </Badge>
            </div>
          </div>

          {/* Login Card */}
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-purple-200 dark:border-purple-700 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-purple-50 via-blue-50 to-indigo-50 dark:from-purple-900/30 dark:via-blue-900/30 dark:to-indigo-900/30 rounded-t-lg">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-4">
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-3xl text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  تسجيل دخول الأعضاء
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400 text-lg mt-2">
                  استخدم بيانات اشتراكك للوصول إلى خطتك المخصصة
                </CardDescription>
              </div>
            </CardHeader>
            
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Username */}
                <div className="space-y-3">
                  <Label htmlFor="username" className="text-lg font-medium flex items-center">
                    <User className="h-5 w-5 ml-2 text-purple-600" />
                    اسم المستخدم
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="أدخل اسم المستخدم الخاص بك"
                    className="text-lg py-4 border-2 border-purple-200 dark:border-purple-700 focus:border-purple-500 rounded-xl"
                    required
                  />
                </div>

                {/* Password */}
                <div className="space-y-3">
                  <Label htmlFor="password" className="text-lg font-medium flex items-center">
                    <Lock className="h-5 w-5 ml-2 text-purple-600" />
                    كلمة المرور
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="أدخل كلمة المرور"
                      className="text-lg py-4 border-2 border-purple-200 dark:border-purple-700 focus:border-purple-500 rounded-xl pl-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {/* Subscription ID */}
                <div className="space-y-3">
                  <Label htmlFor="subscriptionId" className="text-lg font-medium flex items-center">
                    <Crown className="h-5 w-5 ml-2 text-purple-600" />
                    رقم الاشتراك
                  </Label>
                  <Input
                    id="subscriptionId"
                    placeholder="مثال: 5001"
                    value={subscriptionId}
                    onChange={(e) => setSubscriptionId(e.target.value)}
                    className="text-lg py-4 border-2 border-purple-200 dark:border-purple-700 focus:border-purple-500 rounded-xl"
                  />
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                    <p className="text-sm text-blue-600 dark:text-blue-400 flex items-start">
                      <Star className="h-4 w-4 ml-1 mt-0.5 flex-shrink-0" />
                      يتم استلام رقم الاشتراك بعد إتمام عملية الدفع والتفعيل
                    </p>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 text-white font-bold py-4 rounded-2xl transition-all duration-300 text-lg transform hover:scale-105 shadow-lg"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white ml-2"></div>
                      جاري تسجيل الدخول...
                    </>
                  ) : (
                    <>
                      <Shield className="h-5 w-5 ml-2" />
                      🔐 دخول العضوية المميزة
                    </>
                  )}
                </Button>
              </form>

              {/* Back Button */}
              <div className="mt-8 text-center">
                <Button
                  variant="outline"
                  onClick={() => setLocation('/')}
                  className="border-2 border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 px-6 py-3 rounded-xl"
                >
                  <ArrowLeft className="h-4 w-4 ml-2" />
                  العودة للرئيسية
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Premium Benefits */}
          <div className="mt-8">
            <h3 className="text-2xl font-bold text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
              ✨ مميزات العضوية الحصرية
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-4 text-center border border-purple-200 dark:border-purple-700">
                <div className="text-3xl mb-2">🤖</div>
                <h4 className="font-bold text-purple-600 mb-1">AI متقدم</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">خطط ذكية ومخصصة بالكامل</p>
              </div>
              <div className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-4 text-center border border-purple-200 dark:border-purple-700">
                <div className="text-3xl mb-2">👨‍⚕️</div>
                <h4 className="font-bold text-purple-600 mb-1">مدرب شخصي</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">متابعة مع خبراء التغذية</p>
              </div>
              <div className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-4 text-center border border-purple-200 dark:border-purple-700">
                <div className="text-3xl mb-2">📊</div>
                <h4 className="font-bold text-purple-600 mb-1">تقارير متقدمة</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">تحليل شامل للتقدم</p>
              </div>
              <div className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-4 text-center border border-purple-200 dark:border-purple-700">
                <div className="text-3xl mb-2">🔄</div>
                <h4 className="font-bold text-purple-600 mb-1">تحديث دوري</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">خطط محدثة كل أسبوع</p>
              </div>
            </div>
          </div>

          {/* Support Info */}
          <div className="mt-6 text-center">
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-2 border-green-200 dark:border-green-700">
              <CardContent className="p-4">
                <p className="text-green-700 dark:text-green-300 text-sm">
                  <strong>💬 محتاج مساعدة؟</strong> فريق الدعم متاح 24/7 لمساعدة الأعضاء المميزين
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
