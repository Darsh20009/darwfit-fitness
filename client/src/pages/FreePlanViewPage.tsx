import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Clock, 
  Target, 
  Utensils, 
  Dumbbell, 
  CheckCircle2, 
  Star,
  Gift,
  TrendingUp,
  Award,
  Download
} from "lucide-react";
import { downloadWorkoutPlan, downloadMealPlan, DayPlan } from "@/lib/downloadUtils";
import { useLocation } from "wouter";

export default function FreePlanViewPage() {
  const [freePlan, setFreePlan] = useState<any>(null);
  const [currentDay, setCurrentDay] = useState(1);
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [, setLocation] = useLocation();

  useEffect(() => {
    // التحقق من تسجيل الدخول أولاً
    const currentUser = localStorage.getItem('currentFreeUser');
    if (!currentUser) {
      setLocation('/free-login');
      return;
    }

    const savedPlan = localStorage.getItem('freePlan');
    if (savedPlan) {
      const plan = JSON.parse(savedPlan);
      
      // التحقق من انتهاء صلاحية الخطة المجانية
      const expiresAt = new Date(plan.expiresAt);
      const now = new Date();
      
      if (now > expiresAt) {
        // انتهت صلاحية الخطة - توجيه للاشتراك
        localStorage.removeItem('freePlan');
        localStorage.removeItem('freePlanProgress');
        
        // عرض رسالة وتوجيه للاشتراك
        setTimeout(() => {
          setLocation('/subscription?expired=true');
        }, 2000);
        
        setFreePlan({ ...plan, expired: true });
        return;
      }
      
      setFreePlan(plan);
    } else {
      setLocation('/free-plan');
    }

    const savedProgress = localStorage.getItem('freePlanProgress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setCompletedDays(progress.completedDays || []);
      setCurrentDay(progress.currentDay || 1);
    }
  }, [setLocation]);

  const markDayCompleted = (day: number) => {
    const newCompletedDays = [...completedDays, day];
    setCompletedDays(newCompletedDays);
    
    const progress = {
      completedDays: newCompletedDays,
      currentDay: Math.min(day + 1, 15)
    };
    localStorage.setItem('freePlanProgress', JSON.stringify(progress));
    setCurrentDay(progress.currentDay);
  };

  const calculateProgress = () => {
    return (completedDays.length / 15) * 100;
  };

  const getDaysRemaining = () => {
    if (!freePlan) return 15;
    const createdAt = new Date(freePlan.createdAt);
    const expiresAt = new Date(freePlan.expiresAt);
    const now = new Date();
    const timeLeft = expiresAt.getTime() - now.getTime();
    const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));
    return Math.max(0, daysLeft);
  };

  const handleDownloadWorkout = (day: number) => {
    try {
      // العثور على التمرين الصحيح لليوم المحدد
      const workoutForDay = freePlan.workoutPlan.find((w: any) => w.day === day) || freePlan.workoutPlan[0];
      
      const dayPlan: DayPlan = {
        date: new Date().toLocaleDateString('ar-SA'),
        dayNumber: day,
        workout: {
          title: workoutForDay?.title || `تمرين اليوم ${day}`,
          duration: workoutForDay?.duration || "45 دقيقة",
          exercises: workoutForDay?.exercises?.main?.map((exercise: any) => ({
            name: exercise.name || "",
            sets: exercise.sets || 3,
            reps: exercise.reps || "10-12",
            rest: exercise.rest || "60 ثانية",
            notes: exercise.description || ""
          })) || []
        },
        meals: {
          breakfast: [{
            name: freePlan.mealPlan.breakfast?.title || "الإفطار",
            description: freePlan.mealPlan.breakfast?.items?.join(", ") || "",
            calories: freePlan.mealPlan.breakfast?.calories || 0,
            protein: freePlan.mealPlan.breakfast?.protein || 0,
            carbs: freePlan.mealPlan.breakfast?.carbs || 0,
            fats: freePlan.mealPlan.breakfast?.fats || 0
          }],
          lunch: [{
            name: freePlan.mealPlan.lunch?.title || "الغداء",
            description: freePlan.mealPlan.lunch?.items?.join(", ") || "",
            calories: freePlan.mealPlan.lunch?.calories || 0,
            protein: freePlan.mealPlan.lunch?.protein || 0,
            carbs: freePlan.mealPlan.lunch?.carbs || 0,
            fats: freePlan.mealPlan.lunch?.fats || 0
          }],
          dinner: [{
            name: freePlan.mealPlan.dinner?.title || "العشاء",
            description: freePlan.mealPlan.dinner?.items?.join(", ") || "",
            calories: freePlan.mealPlan.dinner?.calories || 0,
            protein: freePlan.mealPlan.dinner?.protein || 0,
            carbs: freePlan.mealPlan.dinner?.carbs || 0,
            fats: freePlan.mealPlan.dinner?.fats || 0
          }],
          snacks: [{
            name: freePlan.mealPlan.snack1?.title || "وجبة خفيفة",
            description: freePlan.mealPlan.snack1?.items?.join(", ") || "",
            calories: freePlan.mealPlan.snack1?.calories || 0,
            protein: freePlan.mealPlan.snack1?.protein || 0,
            carbs: freePlan.mealPlan.snack1?.carbs || 0,
            fats: freePlan.mealPlan.snack1?.fats || 0
          }]
        },
        totalCalories: calculateTotalCalories(),
        totalProtein: calculateTotalMacros().protein,
        totalCarbs: calculateTotalMacros().carbs,
        totalFats: calculateTotalMacros().fats
      };
      
      downloadWorkoutPlan(dayPlan);
    } catch (error) {
      console.error("خطأ في تحميل التمرين:", error);
      alert("حدث خطأ أثناء تحميل التمرين. يرجى المحاولة مرة أخرى.");
    }
  };

  const handleDownloadMeal = (day: number) => {
    try {
      const dayPlan: DayPlan = {
        date: new Date().toLocaleDateString('ar-SA'),
        dayNumber: day,
        workout: {
          title: `تمرين اليوم ${day}`,
          duration: "45 دقيقة",
          exercises: []
        },
        meals: {
          breakfast: [{
            name: freePlan.mealPlan.breakfast?.title || "الإفطار",
            description: freePlan.mealPlan.breakfast?.items?.join(", ") || "",
            calories: freePlan.mealPlan.breakfast?.calories || 0,
            protein: freePlan.mealPlan.breakfast?.protein || 0,
            carbs: freePlan.mealPlan.breakfast?.carbs || 0,
            fats: freePlan.mealPlan.breakfast?.fats || 0
          }],
          lunch: [{
            name: freePlan.mealPlan.lunch?.title || "الغداء",
            description: freePlan.mealPlan.lunch?.items?.join(", ") || "",
            calories: freePlan.mealPlan.lunch?.calories || 0,
            protein: freePlan.mealPlan.lunch?.protein || 0,
            carbs: freePlan.mealPlan.lunch?.carbs || 0,
            fats: freePlan.mealPlan.lunch?.fats || 0
          }],
          dinner: [{
            name: freePlan.mealPlan.dinner?.title || "العشاء",
            description: freePlan.mealPlan.dinner?.items?.join(", ") || "",
            calories: freePlan.mealPlan.dinner?.calories || 0,
            protein: freePlan.mealPlan.dinner?.protein || 0,
            carbs: freePlan.mealPlan.dinner?.carbs || 0,
            fats: freePlan.mealPlan.dinner?.fats || 0
          }],
          snacks: [
            {
              name: freePlan.mealPlan.snack1?.title || "الوجبة الخفيفة الأولى",
              description: freePlan.mealPlan.snack1?.items?.join(", ") || "",
              calories: freePlan.mealPlan.snack1?.calories || 0,
              protein: freePlan.mealPlan.snack1?.protein || 0,
              carbs: freePlan.mealPlan.snack1?.carbs || 0,
              fats: freePlan.mealPlan.snack1?.fats || 0
            },
            {
              name: freePlan.mealPlan.snack2?.title || "الوجبة الخفيفة الثانية",
              description: freePlan.mealPlan.snack2?.items?.join(", ") || "",
              calories: freePlan.mealPlan.snack2?.calories || 0,
              protein: freePlan.mealPlan.snack2?.protein || 0,
              carbs: freePlan.mealPlan.snack2?.carbs || 0,
              fats: freePlan.mealPlan.snack2?.fats || 0
            }
          ]
        },
        totalCalories: calculateTotalCalories(),
        totalProtein: calculateTotalMacros().protein,
        totalCarbs: calculateTotalMacros().carbs,
        totalFats: calculateTotalMacros().fats
      };
      
      downloadMealPlan(dayPlan);
    } catch (error) {
      console.error("خطأ في تحميل النظام الغذائي:", error);
      alert("حدث خطأ أثناء تحميل النظام الغذائي. يرجى المحاولة مرة أخرى.");
    }
  };

  const calculateTotalCalories = () => {
    if (!freePlan?.mealPlan) return 0;
    let total = 0;
    
    // حساب سعرات كل وجبة بشكل منفصل
    if (freePlan.mealPlan.breakfast?.calories) total += freePlan.mealPlan.breakfast.calories;
    if (freePlan.mealPlan.lunch?.calories) total += freePlan.mealPlan.lunch.calories;
    if (freePlan.mealPlan.dinner?.calories) total += freePlan.mealPlan.dinner.calories;
    if (freePlan.mealPlan.snack1?.calories) total += freePlan.mealPlan.snack1.calories;
    if (freePlan.mealPlan.snack2?.calories) total += freePlan.mealPlan.snack2.calories;
    
    return total;
  };

  const calculateTotalMacros = () => {
    if (!freePlan?.mealPlan) return { protein: 0, carbs: 0, fats: 0 };
    
    let protein = 0, carbs = 0, fats = 0;
    
    // حساب الماكروز لكل وجبة بشكل منفصل
    if (freePlan.mealPlan.breakfast?.protein) protein += freePlan.mealPlan.breakfast.protein;
    if (freePlan.mealPlan.breakfast?.carbs) carbs += freePlan.mealPlan.breakfast.carbs;
    if (freePlan.mealPlan.breakfast?.fats) fats += freePlan.mealPlan.breakfast.fats;
    
    if (freePlan.mealPlan.lunch?.protein) protein += freePlan.mealPlan.lunch.protein;
    if (freePlan.mealPlan.lunch?.carbs) carbs += freePlan.mealPlan.lunch.carbs;
    if (freePlan.mealPlan.lunch?.fats) fats += freePlan.mealPlan.lunch.fats;
    
    if (freePlan.mealPlan.dinner?.protein) protein += freePlan.mealPlan.dinner.protein;
    if (freePlan.mealPlan.dinner?.carbs) carbs += freePlan.mealPlan.dinner.carbs;
    if (freePlan.mealPlan.dinner?.fats) fats += freePlan.mealPlan.dinner.fats;
    
    if (freePlan.mealPlan.snack1?.protein) protein += freePlan.mealPlan.snack1.protein;
    if (freePlan.mealPlan.snack1?.carbs) carbs += freePlan.mealPlan.snack1.carbs;
    if (freePlan.mealPlan.snack1?.fats) fats += freePlan.mealPlan.snack1.fats;
    
    if (freePlan.mealPlan.snack2?.protein) protein += freePlan.mealPlan.snack2.protein;
    if (freePlan.mealPlan.snack2?.carbs) carbs += freePlan.mealPlan.snack2.carbs;
    if (freePlan.mealPlan.snack2?.fats) fats += freePlan.mealPlan.snack2.fats;
    
    return { protein, carbs, fats };
  };

  if (!freePlan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4">لم يتم العثور على خطة</h2>
          <Button onClick={() => setLocation('/free-plan')} className="bg-blue-600 hover:bg-blue-700">
            إنشاء خطة جديدة
          </Button>
        </div>
      </div>
    );
  }

  // إذا انتهت صلاحية الخطة
  if (freePlan.expired) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-red-900 dark:via-orange-900 dark:to-yellow-900 flex items-center justify-center">
        <div className="max-w-2xl mx-auto p-8">
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-2xl border-4 border-orange-400">
            <CardHeader className="text-center bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-lg">
              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                  <Clock className="h-12 w-12 text-orange-500" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold mb-2">
                ⏰ انتهت مدة الاشتراك المجاني
              </CardTitle>
              <p className="text-orange-100 text-lg">
                لقد انتهت مدة الـ 15 يوماً المجانية
              </p>
            </CardHeader>
            <CardContent className="p-8 text-center">
              <div className="space-y-6">
                <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-orange-600 mb-3">🎉 تهانينا على إكمال الفترة التجريبية!</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    لقد أكملت {completedDays.length} يوماً من أصل 15 يوماً في خطتك المجانية
                  </p>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <Progress value={(completedDays.length / 15) * 100} className="mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      معدل الإنجاز: {Math.round((completedDays.length / 15) * 100)}%
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                    🚀 للمتابعة، اختر إحدى الباقات المتاحة:
                  </h4>
                  
                  <div className="grid gap-4">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-lg text-white">
                      <h5 className="font-bold text-lg mb-2">⭐ باقة 3 شهور - الأكثر شعبية</h5>
                      <p className="text-sm mb-3">خطة شاملة مع متابعة أسبوعية</p>
                      <div className="text-2xl font-bold">100 ريال</div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-green-500 to-teal-600 p-4 rounded-lg text-white">
                      <h5 className="font-bold text-lg mb-2">💎 باقات مختلفة متاحة</h5>
                      <p className="text-sm">شهر واحد، 6 شهور، أو سنة كاملة</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={() => setLocation("/subscription")}
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-8 rounded-xl text-lg transform hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    🔥 اختيار باقة الآن
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setLocation("/")}
                    className="border-orange-400 text-orange-600 hover:bg-orange-50 py-4 px-8 rounded-xl text-lg"
                  >
                    🏠 العودة للرئيسية
                  </Button>
                </div>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  💡 الباقات المدفوعة تشمل خطط مخصصة أكثر ومتابعة مع مدربين محترفين
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              🎯 خطتك المجانية النشطة
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              مرحباً {freePlan.userData.fullName}، استمر في رحلتك نحو هدفك
            </p>
          </div>

          {/* Progress Overview */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-blue-200 dark:border-blue-700">
              <CardHeader className="text-center">
                <Calendar className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                <CardTitle className="text-blue-600">الأيام المكتملة</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-blue-700 dark:text-blue-400">
                  {completedDays.length}/15
                </div>
                <Progress value={calculateProgress()} className="mt-2" />
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-green-200 dark:border-green-700">
              <CardHeader className="text-center">
                <Clock className="h-8 w-8 mx-auto text-green-600 mb-2" />
                <CardTitle className="text-green-600">الأيام المتبقية</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-green-700 dark:text-green-400">
                  {getDaysRemaining()}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">يوماً</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-purple-200 dark:border-purple-700">
              <CardHeader className="text-center">
                <Target className="h-8 w-8 mx-auto text-purple-600 mb-2" />
                <CardTitle className="text-purple-600">السعرات اليومية</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-purple-700 dark:text-purple-400">
                  {freePlan.dailyCalories}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">سعرة</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-orange-200 dark:border-orange-700">
              <CardHeader className="text-center">
                <Award className="h-8 w-8 mx-auto text-orange-600 mb-2" />
                <CardTitle className="text-orange-600">معدل النجاح</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-orange-700 dark:text-orange-400">
                  {Math.round(calculateProgress())}%
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">إنجاز</p>
              </CardContent>
            </Card>
          </div>

          {/* Current Day Highlight */}
          <Card className="mb-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-2xl">🌟 اليوم {currentDay}</CardTitle>
                  <p className="text-blue-100">خطة اليوم الحالي</p>
                </div>
                <Badge className="bg-white text-blue-600 px-4 py-2 text-lg">
                  {freePlan.planType}
                </Badge>
              </div>
            </CardHeader>
          </Card>

          {/* Plan Content */}
          <Tabs defaultValue="meals" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="meals" className="text-lg">
                <Utensils className="h-5 w-5 ml-2" />
                الوجبات اليومية
              </TabsTrigger>
              <TabsTrigger value="workout" className="text-lg">
                <Dumbbell className="h-5 w-5 ml-2" />
                التمارين
              </TabsTrigger>
              <TabsTrigger value="calendar" className="text-lg">
                <Calendar className="h-5 w-5 ml-2" />
                جدول الـ 15 يوماً
              </TabsTrigger>
            </TabsList>

            {/* Meals Tab */}
            <TabsContent value="meals">
              <div className="grid lg:grid-cols-2 gap-6">
                {Object.entries(freePlan.mealPlan).map(([mealKey, meal]: [string, any]) => {
                  const mealIcons: { [key: string]: string } = {
                    breakfast: "🌅",
                    snack1: "🍎",
                    lunch: "🌞",
                    snack2: "🥤",
                    dinner: "🌙"
                  };
                  
                  const mealTimes: { [key: string]: string } = {
                    breakfast: "الإفطار (7:00 ص)",
                    snack1: "وجبة خفيفة (10:00 ص)",
                    lunch: "الغداء (1:00 م)",
                    snack2: "وجبة بعد الظهر (4:00 م)",
                    dinner: "العشاء (7:00 م)"
                  };

                  return (
                    <Card key={mealKey} className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-orange-200 dark:border-orange-700">
                      <CardHeader>
                        <CardTitle className="flex items-center text-orange-600">
                          <span className="text-2xl ml-3">{mealIcons[mealKey]}</span>
                          {meal.title}
                        </CardTitle>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {mealTimes[mealKey]}
                        </p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="bg-orange-50 dark:bg-orange-900/20 p-2 rounded">
                              <span className="font-medium">السعرات:</span> {meal.calories}
                            </div>
                            <div className="bg-orange-50 dark:bg-orange-900/20 p-2 rounded">
                              <span className="font-medium">بروتين:</span> {meal.protein}جم
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <h5 className="font-medium text-orange-600">المكونات:</h5>
                            <ul className="space-y-1">
                              {meal.items.map((item: string, index: number) => (
                                <li key={index} className="flex items-start">
                                  <span className="text-green-500 ml-2">•</span>
                                  <span className="text-gray-700 dark:text-gray-300">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        <div className="mt-4 text-center">
                          <Button 
                            onClick={() => handleDownloadMeal(currentDay)}
                            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-2 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                          >
                            <Download className="h-4 w-4 ml-2 animate-bounce" />
                            📥 تحميل النظام الغذائي
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
              
              <div className="mt-8 text-center">
                <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-2 border-green-200 dark:border-green-700">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-green-600 mb-4">💡 نصائح مهمة</h3>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div className="text-center">
                        <div className="text-2xl mb-2">💧</div>
                        <p>اشرب 8-10 أكواب ماء يومياً</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl mb-2">⏰</div>
                        <p>التزم بأوقات الوجبات</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl mb-2">🥗</div>
                        <p>أضف المزيد من الخضار</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Workout Tab */}
            <TabsContent value="workout">
              <div className="space-y-6">
                {freePlan.workoutPlan.map((workout: any, index: number) => (
                  <Card key={index} className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-red-200 dark:border-red-700">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="text-red-600 text-xl">
                            💪 {workout.title}
                          </CardTitle>
                          <p className="text-gray-600 dark:text-gray-400">
                            النوع: {workout.type} | المدة: {workout.duration}
                          </p>
                        </div>
                        <Badge className="bg-red-100 text-red-700 border-red-300">
                          اليوم {workout.day}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid lg:grid-cols-3 gap-6">
                        {/* Warmup */}
                        <div className="space-y-3">
                          <h4 className="font-bold text-yellow-600">🔥 الإحماء</h4>
                          {workout.exercises.warmup.map((exercise: any, exerciseIndex: number) => (
                            <div key={exerciseIndex} className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded border border-yellow-200">
                              <div className="font-medium">{exercise.name}</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">{exercise.duration}</div>
                            </div>
                          ))}
                        </div>

                        {/* Main Exercises */}
                        <div className="space-y-3">
                          <h4 className="font-bold text-red-600">💪 التمارين الأساسية</h4>
                          {workout.exercises.main.map((exercise: any, exerciseIndex: number) => (
                            <div key={exerciseIndex} className="bg-red-50 dark:bg-red-900/20 p-3 rounded border border-red-200">
                              <div className="font-medium">{exercise.name}</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                {exercise.sets} مجموعات × {exercise.reps}
                              </div>
                              <div className="text-xs text-gray-500">راحة: {exercise.rest}</div>
                            </div>
                          ))}
                        </div>

                        {/* Cooldown */}
                        <div className="space-y-3">
                          <h4 className="font-bold text-blue-600">🧘 التهدئة</h4>
                          {workout.exercises.cooldown.map((exercise: any, exerciseIndex: number) => (
                            <div key={exerciseIndex} className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded border border-blue-200">
                              <div className="font-medium">{exercise.name}</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">{exercise.duration}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-6 text-center">
                        <Button 
                          onClick={() => handleDownloadWorkout(workout.day)}
                          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                          <Download className="h-4 w-4 ml-2 animate-bounce" />
                          💪 تحميل تمرين اليوم {workout.day}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Calendar Tab */}
            <TabsContent value="calendar">
              <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-center text-blue-600">
                    📅 جدول الـ 15 يوماً
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-5 gap-2 mb-6">
                    {Array.from({ length: 15 }, (_, i) => {
                      const day = i + 1;
                      const isCompleted = completedDays.includes(day);
                      const isCurrent = day === currentDay;
                      const isPast = day < currentDay;

                      return (
                        <div
                          key={day}
                          className={`
                            aspect-square flex items-center justify-center rounded-lg border-2 text-sm font-medium cursor-pointer transition-all duration-200
                            ${isCompleted 
                              ? 'bg-green-500 text-white border-green-600 shadow-lg transform scale-105' 
                              : isCurrent 
                                ? 'bg-blue-500 text-white border-blue-600 animate-pulse' 
                                : isPast 
                                  ? 'bg-gray-200 text-gray-500 border-gray-300' 
                                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-blue-300'
                            }
                          `}
                          onClick={() => {
                            if (day === currentDay && !isCompleted) {
                              markDayCompleted(day);
                            }
                          }}
                        >
                          {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : day}
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex justify-center gap-4 text-sm">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-green-500 rounded ml-2"></div>
                      <span>مكتمل</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-blue-500 rounded ml-2"></div>
                      <span>اليوم الحالي</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-gray-200 rounded ml-2"></div>
                      <span>قادم</span>
                    </div>
                  </div>

                  {currentDay <= 15 && !completedDays.includes(currentDay) && (
                    <div className="mt-6 text-center">
                      <Button 
                        onClick={() => markDayCompleted(currentDay)}
                        className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-xl text-lg"
                      >
                        ✅ إكمال اليوم {currentDay}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Upgrade CTA */}
          <Card className="mt-8 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 text-white">
            <CardContent className="p-8 text-center">
              <div className="flex justify-center items-center mb-4">
                <Star className="h-8 w-8 ml-3 animate-spin" />
                <h3 className="text-2xl font-bold">⭐ ترقية للخطة المدفوعة</h3>
                <Star className="h-8 w-8 mr-3 animate-spin" />
              </div>
              <p className="text-lg mb-6">
                احصل على خطط مخصصة أكثر، متابعة مع مدربين، وتحديثات دورية
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => setLocation("/subscription")}
                  className="bg-white text-orange-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-xl text-lg"
                >
                  🚀 ترقية الآن
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setLocation("/")}
                  className="border-white text-white hover:bg-white/20 py-3 px-8 rounded-xl text-lg"
                >
                  🏠 العودة للرئيسية
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}