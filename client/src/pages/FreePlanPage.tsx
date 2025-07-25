import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Sparkles, Gift, Clock, Target } from "lucide-react";
import { freePlanSchema, type FreePlanData } from "@shared/schema";
import { selectTemplate, calculateCalories, customizePlan } from "@/data/freePlanTemplates";
import { useLocation } from "wouter";

export default function FreePlanPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<any>(null);
  const [showResults, setShowResults] = useState(false);
  const [, setLocation] = useLocation();

  const form = useForm<FreePlanData>({
    resolver: zodResolver(freePlanSchema),
    defaultValues: {
      fullName: "",
      age: 25,
      gender: undefined,
      height: 170,
      weight: 70,
      goal: undefined,
      activityLevel: undefined,
      experienceLevel: undefined,
      workoutPreference: undefined,
      dietaryRestrictions: [],
      timeAvailable: undefined,
    },
  });

  const onSubmit = async (data: FreePlanData) => {
    setIsGenerating(true);
    
    try {
      // التحقق من تسجيل دخول المستخدم المجاني
      const currentUser = localStorage.getItem('currentFreeUser');
      if (!currentUser) {
        setLocation('/free-login');
        setIsGenerating(false);
        return;
      }

      // محاكاة عملية الذكاء الاصطناعي لإنشاء الخطة
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // اختيار القالب المناسب
      const selectedTemplate = selectTemplate(data);
      
      // حساب السعرات المناسبة
      const calorieData = calculateCalories(data);
      
      // تخصيص الخطة
      const customizedPlan = customizePlan(selectedTemplate, data, calorieData);
      
      // إنشاء معرف فريد للخطة
      const planId = `plan_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      const user = JSON.parse(currentUser);
      const finalPlan = {
        id: planId,
        userId: user.id,
        userData: data,
        planType: selectedTemplate.name,
        planDescription: selectedTemplate.description,
        mealPlan: customizedPlan.mealPlan,
        workoutPlan: customizedPlan.workoutPlan,
        dailyCalories: calorieData.daily,
        macros: calorieData.macros,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 يوم
      };
      
      // حفظ الخطة في localStorage
      localStorage.setItem('freePlan', JSON.stringify(finalPlan));
      localStorage.setItem('freePlanUser', data.fullName);
      
      setGeneratedPlan(finalPlan);
      setShowResults(true);
      
    } catch (error) {
      console.error("Error generating plan:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const dietaryOptions = [
    "نباتي",
    "خالي من الجلوتين", 
    "خالي من اللاكتوز",
    "حلال",
    "كيتو",
    "خالي من المكسرات",
    "خالي من السكر"
  ];

  if (showResults && generatedPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-green-900 dark:to-blue-900">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center items-center mb-4">
                <Sparkles className="h-8 w-8 text-yellow-500 ml-2 animate-pulse" />
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                  🎉 تم إنشاء خطتك المجانية! 🎉
                </h1>
                <Sparkles className="h-8 w-8 text-yellow-500 mr-2 animate-pulse" />
              </div>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                مرحباً {generatedPlan.userData.fullName}، خطتك المخصصة جاهزة لمدة 15 يوماً
              </p>
              <Badge className="mt-4 px-6 py-2 text-lg bg-gradient-to-r from-green-500 to-blue-500 text-white">
                {generatedPlan.planType}
              </Badge>
            </div>

            {/* Plan Overview */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-green-200 dark:border-green-700">
                <CardHeader>
                  <Target className="h-8 w-8 mx-auto text-green-600 mb-2" />
                  <CardTitle className="text-green-600">السعرات اليومية</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-700 dark:text-green-400">
                    {generatedPlan.dailyCalories}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">سعرة حرارية/يوم</p>
                </CardContent>
              </Card>

              <Card className="text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-blue-200 dark:border-blue-700">
                <CardHeader>
                  <Clock className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                  <CardTitle className="text-blue-600">مدة الخطة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-700 dark:text-blue-400">
                    15
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">يوماً مجاناً</p>
                </CardContent>
              </Card>

              <Card className="text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-purple-200 dark:border-purple-700">
                <CardHeader>
                  <Gift className="h-8 w-8 mx-auto text-purple-600 mb-2" />
                  <CardTitle className="text-purple-600">الماكروز اليومية</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm space-y-1">
                    <div>بروتين: <span className="font-bold text-purple-700">{generatedPlan.macros.protein}جم</span></div>
                    <div>كربوهيدرات: <span className="font-bold text-purple-700">{generatedPlan.macros.carbs}جم</span></div>
                    <div>دهون: <span className="font-bold text-purple-700">{generatedPlan.macros.fats}جم</span></div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Meal Plan Preview */}
            <Card className="mb-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-orange-200 dark:border-orange-700">
              <CardHeader>
                <CardTitle className="text-2xl text-orange-600 flex items-center">
                  🍽️ نموذج من خطتك الغذائية
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200">
                      <h4 className="font-bold text-orange-700 mb-2">🌅 {generatedPlan.mealPlan.breakfast.title}</h4>
                      <ul className="text-sm space-y-1">
                        {generatedPlan.mealPlan.breakfast.items.slice(0, 2).map((item: string, index: number) => (
                          <li key={index} className="text-gray-700 dark:text-gray-300">• {item}</li>
                        ))}
                      </ul>
                      <p className="text-xs text-orange-600 mt-2">{generatedPlan.mealPlan.breakfast.calories} سعرة</p>
                    </div>
                    
                    <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200">
                      <h4 className="font-bold text-yellow-700 mb-2">🌞 {generatedPlan.mealPlan.lunch.title}</h4>
                      <ul className="text-sm space-y-1">
                        {generatedPlan.mealPlan.lunch.items.slice(0, 2).map((item: string, index: number) => (
                          <li key={index} className="text-gray-700 dark:text-gray-300">• {item}</li>
                        ))}
                      </ul>
                      <p className="text-xs text-yellow-600 mt-2">{generatedPlan.mealPlan.lunch.calories} سعرة</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200">
                      <h4 className="font-bold text-blue-700 mb-2">🍎 {generatedPlan.mealPlan.snack1.title}</h4>
                      <ul className="text-sm space-y-1">
                        {generatedPlan.mealPlan.snack1.items.map((item: string, index: number) => (
                          <li key={index} className="text-gray-700 dark:text-gray-300">• {item}</li>
                        ))}
                      </ul>
                      <p className="text-xs text-blue-600 mt-2">{generatedPlan.mealPlan.snack1.calories} سعرة</p>
                    </div>
                    
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200">
                      <h4 className="font-bold text-purple-700 mb-2">🌙 {generatedPlan.mealPlan.dinner.title}</h4>
                      <ul className="text-sm space-y-1">
                        {generatedPlan.mealPlan.dinner.items.slice(0, 2).map((item: string, index: number) => (
                          <li key={index} className="text-gray-700 dark:text-gray-300">• {item}</li>
                        ))}
                      </ul>
                      <p className="text-xs text-purple-600 mt-2">{generatedPlan.mealPlan.dinner.calories} سعرة</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Workout Plan Preview */}
            <Card className="mb-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-red-200 dark:border-red-700">
              <CardHeader>
                <CardTitle className="text-2xl text-red-600 flex items-center">
                  💪 نموذج من برنامجك التدريبي
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {generatedPlan.workoutPlan.slice(0, 2).map((workout: any, index: number) => (
                    <div key={index} className="p-6 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-bold text-red-700 text-lg">اليوم {workout.day}</h4>
                        <Badge className="bg-red-100 text-red-700 border-red-300">
                          {workout.duration}
                        </Badge>
                      </div>
                      <h5 className="font-semibold text-red-600 mb-2">{workout.title}</h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">النوع: {workout.type}</p>
                      
                      <div className="space-y-2">
                        <h6 className="font-medium text-red-600">التمارين الأساسية:</h6>
                        {workout.exercises.main.slice(0, 2).map((exercise: any, exerciseIndex: number) => (
                          <div key={exerciseIndex} className="text-sm bg-white/50 dark:bg-gray-700/50 p-2 rounded">
                            <span className="font-medium">{exercise.name}</span>
                            <span className="text-gray-600 dark:text-gray-400 mr-2">
                              {exercise.sets} مجموعات × {exercise.reps}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={() => setLocation("/free-plan-view")}
                className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 hover:from-green-700 hover:via-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl text-lg"
              >
                📋 عرض الخطة الكاملة
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => setLocation("/subscription")}
                className="border-2 border-purple-500 text-purple-600 hover:bg-purple-500 hover:text-white py-4 px-8 rounded-2xl transition-all duration-300 text-lg"
              >
                ⭐ ترقية للخطة المدفوعة
              </Button>
              
              <Button 
                variant="ghost"
                onClick={() => {
                  setShowResults(false);
                  setGeneratedPlan(null);
                  form.reset();
                }}
                className="text-gray-600 hover:text-gray-800 py-4 px-8 rounded-2xl transition-all duration-300"
              >
                🔄 إنشاء خطة جديدة
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-gray-900 dark:via-emerald-900 dark:to-green-900 flex items-center justify-center overflow-hidden">
        <div className="text-center space-y-8 relative">
          {/* خلفية متحركة */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-20 left-10 w-20 h-20 bg-emerald-400/20 rounded-full animate-bounce"></div>
            <div className="absolute top-40 right-16 w-16 h-16 bg-green-400/20 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
            <div className="absolute bottom-20 left-20 w-24 h-24 bg-teal-400/20 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-40 right-10 w-18 h-18 bg-emerald-500/20 rounded-full animate-bounce" style={{animationDelay: '1.5s'}}></div>
          </div>
          
          {/* اللودر الرئيسي */}
          <div className="relative">
            <div className="w-40 h-40 mx-auto relative">
              {/* الحلقات الدوارة */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 rounded-full animate-spin opacity-75"></div>
              <div className="absolute inset-2 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 rounded-full animate-spin opacity-60" style={{animationDirection: 'reverse', animationDuration: '3s'}}></div>
              <div className="absolute inset-4 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center shadow-2xl">
                <div className="text-center">
                  <Sparkles className="h-12 w-12 text-emerald-600 animate-pulse mx-auto mb-2" />
                  <div className="text-xs font-bold text-emerald-600">AI</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
              🧠 الذكاء الاصطناعي يحضر خطتك المثالية
            </h2>
            
            {/* مراحل الإنشاء المتحركة */}
            <div className="space-y-4 max-w-2xl mx-auto">
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-4 transform transition-all duration-500 hover:scale-105 animate-pulse">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center animate-spin">
                    <span className="text-white font-bold text-lg">🔍</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-emerald-600">تحليل بياناتك الشخصية</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">حساب السعرات والماكروز المناسبة لهدفك</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-4 transform transition-all duration-500 hover:scale-105 animate-pulse" style={{animationDelay: '0.5s'}}>
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center animate-bounce">
                    <span className="text-white font-bold text-lg">🍽️</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-green-600">تصميم خطة غذائية مخصصة</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">وجبات متوازنة تناسب نمط حياتك</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-4 transform transition-all duration-500 hover:scale-105 animate-pulse" style={{animationDelay: '1s'}}>
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center animate-pulse">
                    <span className="text-white font-bold text-lg">💪</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-teal-600">إنشاء برنامج تمريني مناسب</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">تمارين تناسب مستواك ومكان التدريب</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-4 transform transition-all duration-500 hover:scale-105 animate-pulse" style={{animationDelay: '1.5s'}}>
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center animate-spin">
                    <span className="text-white font-bold text-lg">✨</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-emerald-600">إضافة اللمسات الأخيرة</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">تحسين وتخصيص خطتك للحصول على أفضل النتائج</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* شريط التقدم المحسن */}
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 max-w-lg mx-auto border-2 border-emerald-200 dark:border-emerald-700 shadow-2xl">
            <div className="flex items-center justify-center mb-4">
              <div className="animate-pulse">
                <span className="text-2xl">🚀</span>
              </div>
              <p className="text-emerald-600 dark:text-emerald-400 font-bold text-lg mr-3">
                جاري إنشاء خطتك الشخصية...
              </p>
            </div>
            
            <div className="relative w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 rounded-full animate-pulse transform origin-left">
                <div className="h-full bg-gradient-to-r from-emerald-400 to-green-400 rounded-full animate-pulse" style={{width: '85%'}}></div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-ping"></div>
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                🎯 تخصيص الخطة حسب هدفك: <span className="font-bold text-emerald-600">جاري المعالجة...</span>
              </p>
            </div>
          </div>
          
          {/* رسائل تحفيزية */}
          <div className="space-y-2 text-base text-gray-600 dark:text-gray-300 max-w-md mx-auto">
            <p className="animate-bounce">🔥 خطة مخصصة 100% لك</p>
            <p className="animate-bounce" style={{animationDelay: '0.3s'}}>⚡ نتائج مضمونة في 15 يوم</p>
            <p className="animate-bounce" style={{animationDelay: '0.6s'}}>🎯 مناسبة لمستواك ووقتك</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-green-900 dark:to-blue-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center items-center mb-4">
              <Gift className="h-10 w-10 text-yellow-500 ml-3 animate-bounce" />
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                🆓 خطتك المجانية 🆓
              </h1>
              <Gift className="h-10 w-10 text-yellow-500 mr-3 animate-bounce" style={{animationDelay: '0.5s'}} />
            </div>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-4">
              احصل على خطة غذائية وتدريبية مخصصة لك مجاناً لمدة 15 يوماً
            </p>
            <div className="flex justify-center space-x-4 mb-6">
              <Badge className="px-4 py-2 bg-green-100 text-green-700 border-green-300">✅ مجاني 100%</Badge>
              <Badge className="px-4 py-2 bg-blue-100 text-blue-700 border-blue-300">🤖 بالذكاء الاصطناعي</Badge>
              <Badge className="px-4 py-2 bg-purple-100 text-purple-700 border-purple-300">⏰ 15 يوم</Badge>
            </div>
          </div>

          {/* Form */}
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-blue-200 dark:border-blue-700 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30">
              <CardTitle className="text-2xl text-center text-blue-700 dark:text-blue-300">
                📝 بياناتك الشخصية
              </CardTitle>
            </CardHeader>
            
            <CardContent className="p-4 md:p-8">
              <Form {...form}>
                <form id="freePlanForm" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 md:space-y-8">
                  {/* Personal Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base md:text-lg font-medium flex items-center mb-2">
                            👤 الاسم الكامل
                          </FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              placeholder="أدخل اسمك الكامل"
                              className="text-base md:text-lg py-4 md:py-3 border-2 border-blue-200 dark:border-blue-700 focus:border-blue-500 rounded-xl btn-touch"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="age"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base md:text-lg font-medium flex items-center mb-2">
                            🎂 العمر
                          </FormLabel>
                          <FormControl>
                            <Input 
                              type="number"
                              inputMode="numeric"
                              {...field} 
                              onChange={(e) => field.onChange(Number(e.target.value))}
                              placeholder="عمرك بالسنوات"
                              className="text-base md:text-lg py-4 md:py-3 border-2 border-blue-200 dark:border-blue-700 focus:border-blue-500 rounded-xl btn-touch"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base md:text-lg font-medium flex items-center mb-2">
                            ⚧️ الجنس
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="text-base md:text-lg py-4 md:py-3 border-2 border-blue-200 dark:border-blue-700 rounded-xl btn-touch h-14 md:h-12">
                                <SelectValue placeholder="اختر الجنس" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="male">ذكر</SelectItem>
                              <SelectItem value="female">أنثى</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="height"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base md:text-lg font-medium flex items-center mb-2">
                            📏 الطول (سم)
                          </FormLabel>
                          <FormControl>
                            <Input 
                              type="number"
                              inputMode="numeric"
                              {...field} 
                              onChange={(e) => field.onChange(Number(e.target.value))}
                              placeholder="الطول بالسنتيمتر"
                              className="text-base md:text-lg py-4 md:py-3 border-2 border-blue-200 dark:border-blue-700 focus:border-blue-500 rounded-xl btn-touch"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="weight"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base md:text-lg font-medium flex items-center mb-2">
                            ⚖️ الوزن (كجم)
                          </FormLabel>
                          <FormControl>
                            <Input 
                              type="number"
                              inputMode="numeric"
                              {...field} 
                              onChange={(e) => field.onChange(Number(e.target.value))}
                              placeholder="الوزن بالكيلوجرام"
                              className="text-base md:text-lg py-4 md:py-3 border-2 border-blue-200 dark:border-blue-700 focus:border-blue-500 rounded-xl btn-touch"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Goals and Preferences */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <FormField
                      control={form.control}
                      name="goal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base md:text-lg font-medium flex items-center mb-2">
                            🎯 هدفك الرئيسي
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="text-base md:text-lg py-4 md:py-3 border-2 border-blue-200 dark:border-blue-700 rounded-xl btn-touch h-14 md:h-12">
                                <SelectValue placeholder="ما هو هدفك؟" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="lose_weight">فقدان الوزن</SelectItem>
                              <SelectItem value="gain_weight">زيادة الوزن</SelectItem>
                              <SelectItem value="build_muscle">بناء العضلات</SelectItem>
                              <SelectItem value="maintain">المحافظة على الوزن</SelectItem>
                              <SelectItem value="improve_fitness">تحسين اللياقة</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="activityLevel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base md:text-lg font-medium flex items-center mb-2">
                            🏃 مستوى النشاط اليومي
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="text-base md:text-lg py-4 md:py-3 border-2 border-blue-200 dark:border-blue-700 rounded-xl btn-touch h-14 md:h-12">
                                <SelectValue placeholder="كم تتحرك يومياً؟" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="sedentary">قليل الحركة (مكتبي)</SelectItem>
                              <SelectItem value="light">نشاط خفيف</SelectItem>
                              <SelectItem value="moderate">نشاط متوسط</SelectItem>
                              <SelectItem value="active">نشيط</SelectItem>
                              <SelectItem value="very_active">نشيط جداً</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <FormField
                      control={form.control}
                      name="experienceLevel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base md:text-lg font-medium flex items-center mb-2">
                            💪 مستوى خبرتك في التمارين
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="text-base md:text-lg py-4 md:py-3 border-2 border-blue-200 dark:border-blue-700 rounded-xl btn-touch h-14 md:h-12">
                                <SelectValue placeholder="ما مستوى خبرتك؟" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="beginner">مبتدئ</SelectItem>
                              <SelectItem value="intermediate">متوسط</SelectItem>
                              <SelectItem value="advanced">متقدم</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="workoutPreference"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base md:text-lg font-medium flex items-center mb-2">
                            🏠 مكان التمرين المفضل
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="text-base md:text-lg py-4 md:py-3 border-2 border-blue-200 dark:border-blue-700 rounded-xl btn-touch h-14 md:h-12">
                                <SelectValue placeholder="أين تفضل التمرين؟" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="home">المنزل</SelectItem>
                              <SelectItem value="gym">الجيم</SelectItem>
                              <SelectItem value="outdoor">في الخارج</SelectItem>
                              <SelectItem value="mixed">مختلط</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="timeAvailable"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base md:text-lg font-medium flex items-center mb-2">
                          ⏰ الوقت المتاح يومياً للتمرين
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="text-base md:text-lg py-4 md:py-3 border-2 border-blue-200 dark:border-blue-700 rounded-xl btn-touch h-14 md:h-12">
                              <SelectValue placeholder="كم من الوقت متاح لديك؟" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="30min">30 دقيقة</SelectItem>
                            <SelectItem value="45min">45 دقيقة</SelectItem>
                            <SelectItem value="60min">60 دقيقة</SelectItem>
                            <SelectItem value="90min">90 دقيقة</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Dietary Restrictions */}
                  <FormField
                    control={form.control}
                    name="dietaryRestrictions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base md:text-lg font-medium flex items-center mb-3">
                          🥗 القيود الغذائية (اختياري)
                        </FormLabel>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-3">
                          {dietaryOptions.map((option) => (
                            <div key={option} className="flex items-center space-x-3 space-x-reverse p-3 bg-gray-50 dark:bg-gray-800 rounded-xl border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-700 transition-colors btn-touch">
                              <Checkbox
                                id={option}
                                checked={field.value?.includes(option)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    field.onChange([...field.value, option]);
                                  } else {
                                    field.onChange(field.value.filter((item: string) => item !== option));
                                  }
                                }}
                                className="border-2 border-blue-300 w-5 h-5"
                              />
                              <Label htmlFor={option} className="text-sm md:text-base cursor-pointer flex-1 text-right">{option}</Label>
                            </div>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </CardContent>
            
            <CardFooter className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 p-4 md:p-8 space-y-4">
              <Button 
                type="submit" 
                form="freePlanForm"
                className="w-full bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 hover:from-green-700 hover:via-blue-700 hover:to-purple-700 text-white font-bold py-5 md:py-4 px-6 md:px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl text-lg md:text-xl btn-touch"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white ml-3"></div>
                    🤖 جاري إنشاء خطتك المثالية...
                  </>
                ) : (
                  <>
                    ✨ إنشاء خطتي المجانية الآن
                    <ArrowLeft className="mr-3 h-6 w-6" />
                  </>
                )}
              </Button>
              
              <Button 
                type="button"
                variant="ghost"
                onClick={() => setLocation("/")}
                className="w-full text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 py-4 px-6 rounded-xl transition-all duration-300 btn-touch text-base md:text-lg"
              >
                <ArrowLeft className="ml-2 h-5 w-5" />
                العودة للصفحة الرئيسية
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}