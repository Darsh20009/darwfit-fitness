import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import { Eye, EyeOff, UserPlus, LogIn, Gift } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function FreeLoginPage() {
  const [, setLocation] = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // محاولة تسجيل الدخول للعضو المجاني
      const savedUsers = JSON.parse(localStorage.getItem('freeUsers') || '[]');
      const user = savedUsers.find((u: any) => 
        (u.username === formData.username || u.email === formData.username) && 
        u.password === formData.password
      );

      if (user) {
        localStorage.setItem('currentFreeUser', JSON.stringify(user));
        toast({
          title: "تم تسجيل الدخول بنجاح",
          description: `مرحباً ${user.username}، يمكنك الآن الوصول لخطتك المجانية`,
        });
        setLocation('/free-plan-view');
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

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "خطأ",
          description: "كلمة المرور وتأكيدها غير متطابقتين",
          variant: "destructive",
        });
        return;
      }

      if (formData.password.length < 6) {
        toast({
          title: "خطأ",
          description: "كلمة المرور يجب أن تكون 6 أحرف على الأقل",
          variant: "destructive",
        });
        return;
      }

      const savedUsers = JSON.parse(localStorage.getItem('freeUsers') || '[]');
      
      // التحقق من وجود المستخدم
      const existingUser = savedUsers.find((u: any) => 
        u.username === formData.username || u.email === formData.email
      );

      if (existingUser) {
        toast({
          title: "خطأ",
          description: "اسم المستخدم أو البريد الإلكتروني مسجل مسبقاً",
          variant: "destructive",
        });
        return;
      }

      // إنشاء مستخدم جديد
      const newUser = {
        id: Date.now().toString(),
        username: formData.username,
        email: formData.email,
        password: formData.password,
        joinDate: new Date().toISOString(),
        planType: 'free',
        isActive: true
      };

      savedUsers.push(newUser);
      localStorage.setItem('freeUsers', JSON.stringify(savedUsers));
      localStorage.setItem('currentFreeUser', JSON.stringify(newUser));

      toast({
        title: "تم إنشاء الحساب بنجاح",
        description: `مرحباً ${newUser.username}، يمكنك الآن إنشاء خطتك المجانية`,
      });

      setLocation('/free-plan');
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء إنشاء الحساب",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-green-900 dark:to-blue-900 flex items-center justify-center">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center items-center mb-4">
              <Gift className="h-12 w-12 text-green-500 ml-3 animate-bounce" />
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                العضوية المجانية
              </h1>
              <Gift className="h-12 w-12 text-green-500 mr-3 animate-bounce" style={{animationDelay: '0.5s'}} />
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {isLogin ? 'سجل دخولك للوصول لخطتك المجانية' : 'أنشئ حساب مجاني واحصل على خطة لـ 30 يوم'}
            </p>
            <div className="flex justify-center mt-4">
              <Badge className="px-4 py-2 bg-green-100 text-green-700 border-green-300">
                🆓 مجاني بالكامل - 30 يوم
              </Badge>
            </div>
          </div>

          {/* Form Card */}
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-green-200 dark:border-green-700 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30">
              <CardTitle className="text-2xl text-center text-green-700 dark:text-green-300 flex items-center justify-center">
                {isLogin ? (
                  <>
                    <LogIn className="h-6 w-6 ml-2" />
                    تسجيل الدخول
                  </>
                ) : (
                  <>
                    <UserPlus className="h-6 w-6 ml-2" />
                    إنشاء حساب مجاني
                  </>
                )}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="p-8">
              <form onSubmit={isLogin ? handleLogin : handleRegister} className="space-y-6">
                {/* Username/Email */}
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-lg font-medium">
                    {isLogin ? 'اسم المستخدم أو البريد الإلكتروني' : 'اسم المستخدم'}
                  </Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder={isLogin ? 'أدخل اسم المستخدم أو البريد الإلكتروني' : 'اختر اسم مستخدم'}
                    className="text-lg py-3 border-2 border-green-200 dark:border-green-700 focus:border-green-500"
                    required
                  />
                </div>

                {/* Email for registration */}
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-lg font-medium">
                      البريد الإلكتروني
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="أدخل بريدك الإلكتروني"
                      className="text-lg py-3 border-2 border-green-200 dark:border-green-700 focus:border-green-500"
                      required
                    />
                  </div>
                )}

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-lg font-medium">
                    كلمة المرور
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="أدخل كلمة المرور"
                      className="text-lg py-3 border-2 border-green-200 dark:border-green-700 focus:border-green-500 pl-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password for registration */}
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-lg font-medium">
                      تأكيد كلمة المرور
                    </Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="أعد إدخال كلمة المرور"
                      className="text-lg py-3 border-2 border-green-200 dark:border-green-700 focus:border-green-500"
                      required
                    />
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 hover:from-green-700 hover:via-blue-700 hover:to-purple-700 text-white font-bold py-4 rounded-2xl transition-all duration-300 text-lg transform hover:scale-105"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white ml-2"></div>
                      جاري المعالجة...
                    </>
                  ) : (
                    <>
                      {isLogin ? '🔓 تسجيل الدخول' : '🎉 إنشاء الحساب'}
                    </>
                  )}
                </Button>
              </form>

              {/* Switch Mode */}
              <div className="mt-6 text-center">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {isLogin ? 'ليس لديك حساب؟' : 'لديك حساب بالفعل؟'}
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setFormData({ username: "", email: "", password: "", confirmPassword: "" });
                  }}
                  className="border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white transition-all duration-300"
                >
                  {isLogin ? 'إنشاء حساب مجاني' : 'تسجيل الدخول'}
                </Button>
              </div>

              {/* Back to Home */}
              <div className="mt-6 text-center">
                <Button
                  variant="ghost"
                  onClick={() => setLocation('/')}
                  className="text-gray-600 hover:text-gray-800 transition-all duration-300"
                >
                  🏠 العودة للرئيسية
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Benefits */}
          <div className="mt-8 text-center">
            <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-4">
              ماذا ستحصل عليه مجاناً؟
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                <div className="text-2xl mb-2">🤖</div>
                <p>خطة بالذكاء الاصطناعي</p>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                <div className="text-2xl mb-2">📅</div>
                <p>تتبع 30 يوم</p>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                <div className="text-2xl mb-2">🍽️</div>
                <p>خطة غذائية مخصصة</p>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                <div className="text-2xl mb-2">💪</div>
                <p>برنامج تمريني</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}