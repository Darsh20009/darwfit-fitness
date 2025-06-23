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
  Award
} from "lucide-react";
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
      setFreePlan(JSON.parse(savedPlan));
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
                جدول الـ 30 يوم
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
                    📅 جدول الخمسة عشر يوماً
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