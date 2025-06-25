import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getMealSummary } from "../../data/mealPlans";
import { getWorkoutSummary } from "../../data/workoutPlans";
import { getKhaledOmarMealPlanByMonth } from "../../data/khaledNewMealPlan";
import { getUserProfile } from "../../data/userProfiles";
import { useAuthContext } from "../../context/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Dumbbell, Utensils, CheckCircle2, ArrowRight, Lock, Download, Target, Weight } from "lucide-react";
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { LocalStorageManager } from "../../lib/localStorage";
import { downloadWorkoutPlan, downloadMealPlan, DayPlan } from "@/lib/downloadUtils";
import { Input } from "@/components/ui/input";

interface DailyPlanProps {
  date: Date;
  formattedDate: string;
  workoutType: string;
  dayIndex: number;
}

export default function DailyPlan({ date, formattedDate, workoutType, dayIndex }: DailyPlanProps) {
  const [completedMeals, setCompletedMeals] = useState<Set<string>>(new Set());
  const [completedWorkouts, setCompletedWorkouts] = useState<Set<string>>(new Set());
  const [exerciseWeights, setExerciseWeights] = useState<Map<string, number>>(new Map());
  
  const { username } = useAuthContext();
  const isKhaled = username === "خالد عمر";
  const isRestDay = dayIndex === 6; // Sunday is rest day

  // Get the appropriate meal and workout plans based on user
  let mealSummary, workoutSummary;
  
  if (isKhaled) {
    // For Khaled Omar, get current month and use his muscle-building meal plans
    const currentMonth = new Date().getMonth() + 1; // 1-12
    const khaledMealPlan = getKhaledOmarMealPlanByMonth(currentMonth);
    
    // Convert Khaled's meal plan to match the expected format
    mealSummary = [
      { meal: khaledMealPlan.breakfast.title, description: khaledMealPlan.breakfast.items.join(", ") },
      { meal: khaledMealPlan.morningSnack.title, description: khaledMealPlan.morningSnack.items.join(", ") },
      { meal: khaledMealPlan.lunch.title, description: khaledMealPlan.lunch.items.join(", ") },
      { meal: khaledMealPlan.afternoonSnack.title, description: khaledMealPlan.afternoonSnack.items.join(", ") },
      { meal: khaledMealPlan.dinner.title, description: khaledMealPlan.dinner.items.join(", ") },
      { meal: khaledMealPlan.beforeSleep.title, description: khaledMealPlan.beforeSleep.items.join(", ") }
    ];
    
    // Use the same workouts as other users
    workoutSummary = isRestDay ? [] : getWorkoutSummary(dayIndex);
  } else {
    // For other users, use the original plans
    mealSummary = getMealSummary();
    workoutSummary = isRestDay ? [] : getWorkoutSummary(dayIndex);  
  }

  const dateKey = date.toISOString().split('T')[0];

  // تحميل البيانات المحفوظة عند تغيير التاريخ
  useEffect(() => {
    const savedMealProgress = LocalStorageManager.getMealProgress(dateKey);
    const savedWorkoutProgress = LocalStorageManager.getWorkoutProgress(dateKey);
    const savedExerciseWeights = LocalStorageManager.getExerciseWeights(dateKey);

    const completedMealNames = new Set(
      Object.keys(savedMealProgress).filter(key => savedMealProgress[key].completed)
    );
    const completedWorkoutNames = new Set(
      Object.keys(savedWorkoutProgress).filter(key => savedWorkoutProgress[key].completed)
    );

    setCompletedMeals(completedMealNames);
    setCompletedWorkouts(completedWorkoutNames);
    setExerciseWeights(savedExerciseWeights);
  }, [dateKey]);

  const toggleMealCompletion = (mealName: string) => {
    const newCompleted = new Set(completedMeals);
    if (newCompleted.has(mealName)) {
      newCompleted.delete(mealName);
    } else {
      newCompleted.add(mealName);
    }
    setCompletedMeals(newCompleted);

    // حفظ في localStorage
    const currentProgress = LocalStorageManager.getMealProgress(dateKey);
    currentProgress[mealName] = {
      completed: newCompleted.has(mealName),
      completedAt: new Date().toISOString()
    };
    LocalStorageManager.setItem(`meal_progress_${dateKey}`, currentProgress);
  };

  const toggleWorkoutCompletion = (workoutName: string) => {
    const newCompleted = new Set(completedWorkouts);
    if (newCompleted.has(workoutName)) {
      newCompleted.delete(workoutName);
    } else {
      newCompleted.add(workoutName);
    }
    setCompletedWorkouts(newCompleted);

    // حفظ في localStorage
    const currentProgress = LocalStorageManager.getWorkoutProgress(dateKey);
    currentProgress[workoutName] = {
      completed: newCompleted.has(workoutName),
      completedAt: new Date().toISOString()
    };
    LocalStorageManager.setItem(`workout_progress_${dateKey}`, currentProgress);
  };

  const updateExerciseWeight = (exerciseName: string, weight: number) => {
    const newExerciseWeights = new Map(exerciseWeights);
    newExerciseWeights.set(exerciseName, weight);
    setExerciseWeights(newExerciseWeights);

    LocalStorageManager.setExerciseWeight(dateKey, exerciseName, weight);
  };

  const mealProgress = (completedMeals.size / mealSummary.length) * 100;
  const workoutProgress = isRestDay ? 100 : (completedWorkouts.size / workoutSummary.length) * 100;

  const handleViewDetails = (type: 'meal' | 'workout') => {
    // يمكن إضافة منطق التنقل هنا لاحقاً
    console.log(`View ${type} details for day ${dayIndex}`);
  };

  const handleDownloadWorkout = (isMobile = false) => {
    import("../../data/mealPlans").then(({ getDailyMealPlan }) => {
      const fullMealPlan = getDailyMealPlan();

      const dayPlan: DayPlan = {
        date: date.toLocaleDateString('ar-SA'),
        dayNumber: dayIndex + 1,
        workout: {
          title: isRestDay ? "يوم راحة" : `تمرين اليوم ${dayIndex + 1}`,
          duration: isRestDay ? "راحة" : "45 دقيقة",
          exercises: isRestDay ? [] : workoutSummary.map(exercise => ({
            name: exercise.name,
            sets: exercise.sets || 3,
            reps: exercise.reps || "10-12",
            rest: exercise.rest || "60 ثانية",
            notes: exercise.notes,
            weight: exerciseWeights.get(exercise.name) || 0
          }))
        },
        meals: {
          breakfast: [{
            name: fullMealPlan.breakfast.title,
            description: fullMealPlan.breakfast.items.join(", "),
            calories: 350,
            protein: 30,
            carbs: 40,
            fats: 8
          }],
          lunch: [{
            name: fullMealPlan.lunch.title,
            description: fullMealPlan.lunch.items.join(", "),
            calories: 500,
            protein: 45,
            carbs: 55,
            fats: 12
          }],
          dinner: [{
            name: fullMealPlan.dinner.title,
            description: fullMealPlan.dinner.items.join(", "),
            calories: 400,
            protein: 35,
            carbs: 15,
            fats: 18
          }],
          snacks: [
            {
              name: fullMealPlan.morningSnack.title,
              description: fullMealPlan.morningSnack.items.join(", "),
              calories: 150,
              protein: 6,
              carbs: 18,
              fats: 8
            },
            {
              name: fullMealPlan.afternoonSnack.title,
              description: fullMealPlan.afternoonSnack.items.join(", "),
              calories: 120,
              protein: 12,
              carbs: 12,
              fats: 2
            }
          ]
        },
        totalCalories: 1520,
        totalProtein: 128,
        totalCarbs: 140,
        totalFats: 48
      };
      
      // استيراد الدوال المناسبة بناءً على النوع
      import("../../lib/downloadUtils").then(({ downloadWorkoutPlan, downloadWorkoutPlanMobile }) => {
        if (isMobile) {
          downloadWorkoutPlanMobile(dayPlan);
        } else {
          downloadWorkoutPlan(dayPlan);
        }
      });
    });
  };

  const handleDownloadMeal = (isMobile = false) => {
    import("../../data/mealPlans").then(({ getDailyMealPlan }) => {
      const fullMealPlan = getDailyMealPlan();

      const dayPlan: DayPlan = {
        date: date.toLocaleDateString('ar-SA'),
        dayNumber: dayIndex + 1,
        workout: {
          title: isRestDay ? "يوم راحة" : `تمرين اليوم ${dayIndex + 1}`,
          duration: isRestDay ? "راحة" : "45 دقيقة",
          exercises: isRestDay ? [] : workoutSummary.map(exercise => ({
            name: exercise.name,
            sets: exercise.sets || 3,
            reps: exercise.reps || "10-12",
            rest: exercise.rest || "60 ثانية",
            notes: exercise.notes
          }))
        },
        meals: {
          breakfast: [{
            name: fullMealPlan.breakfast.title,
            description: fullMealPlan.breakfast.items.join(", "),
            calories: 350,
            protein: 30,
            carbs: 40,
            fats: 8
          }],
          lunch: [{
            name: fullMealPlan.lunch.title,
            description: fullMealPlan.lunch.items.join(", "),
            calories: 500,
            protein: 45,
            carbs: 55,
            fats: 12
          }],
          dinner: [{
            name: fullMealPlan.dinner.title,
            description: fullMealPlan.dinner.items.join(", "),
            calories: 400,
            protein: 35,
            carbs: 15,
            fats: 18
          }],
          snacks: [
            {
              name: fullMealPlan.morningSnack.title,
              description: fullMealPlan.morningSnack.items.join(", "),
              calories: 150,
              protein: 6,
              carbs: 18,
              fats: 8
            },
            {
              name: fullMealPlan.afternoonSnack.title,
              description: fullMealPlan.afternoonSnack.items.join(", "),
              calories: 120,
              protein: 12,
              carbs: 12,
              fats: 2
            }
          ]
        },
        totalCalories: 1520,
        totalProtein: 128,
        totalCarbs: 140,
        totalFats: 48
      };
      
      // استيراد الدوال المناسبة بناءً على النوع
      import("../../lib/downloadUtils").then(({ downloadMealPlan, downloadMealPlanMobile }) => {
        if (isMobile) {
          downloadMealPlanMobile(dayPlan);
        } else {
          downloadMealPlan(dayPlan);
        }
      });
    });
  };

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="card-mobile">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Utensils className="h-5 w-5 text-orange-600" />
              الوجبات
            </CardTitle>
            <CardDescription>
              {completedMeals.size} من {mealSummary.length} وجبات مكتملة
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${mealProgress}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-mobile">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Dumbbell className="h-5 w-5 text-blue-600" />
              التمارين
            </CardTitle>
            <CardDescription>
              {isRestDay ? "يوم راحة" : `${completedWorkouts.size} من ${workoutSummary.length} تمارين مكتملة`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${workoutProgress}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="meals" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="meals" className="flex items-center gap-2">
            <Utensils className="h-4 w-4" />
            الوجبات
          </TabsTrigger>
          <TabsTrigger value="workouts" className="flex items-center gap-2">
            <Dumbbell className="h-4 w-4" />
            التمارين
          </TabsTrigger>
        </TabsList>

        <TabsContent value="meals" className="mt-4">
          <Card className="card-mobile">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>الوجبات اليومية</span>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <div className="flex gap-1">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDownloadMeal(false)}
                      className="btn-touch group relative overflow-hidden bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200 text-emerald-700 hover:from-emerald-100 hover:to-green-100 hover:border-emerald-300 hover:text-emerald-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex-1"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                      <div className="relative flex items-center justify-center">
                        <div className="bg-emerald-100 rounded-full p-1 ml-1 group-hover:bg-emerald-200 transition-colors duration-300">
                          <Download className="h-3 w-3 text-emerald-600 group-hover:animate-bounce" />
                        </div>
                        <span className="font-medium text-xs">💻 كمبيوتر</span>
                      </div>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDownloadMeal(true)}
                      className="btn-touch group relative overflow-hidden bg-gradient-to-r from-green-50 to-teal-50 border-2 border-green-200 text-green-700 hover:from-green-100 hover:to-teal-100 hover:border-green-300 hover:text-green-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex-1"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-teal-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                      <div className="relative flex items-center justify-center">
                        <div className="bg-green-100 rounded-full p-1 ml-1 group-hover:bg-green-200 transition-colors duration-300">
                          <Download className="h-3 w-3 text-green-600 group-hover:animate-bounce" />
                        </div>
                        <span className="font-medium text-xs">📱 جوال</span>
                      </div>
                    </Button>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewDetails('meal')}
                    className="btn-touch group relative overflow-hidden bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-200 text-orange-700 hover:from-orange-100 hover:to-amber-100 hover:border-orange-300 hover:text-orange-800 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-300 to-amber-300 opacity-0 group-hover:opacity-15 transition-opacity duration-300"></div>
                    <div className="relative flex items-center justify-center">
                      <span className="font-medium text-xs">📋 التفاصيل</span>
                      <ArrowRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0 bg-[#020817] space-y-3">
              {mealSummary.map((meal, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium mobile-text">{meal.meal}</div>
                    <div className="text-sm text-muted-foreground mobile-text">
                      {meal.description}
                    </div>
                  </div>
                  <Button
                    variant={completedMeals.has(meal.meal) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleMealCompletion(meal.meal)}
                    className={`btn-touch group relative overflow-hidden transition-all duration-300 transform hover:scale-110 ${
                      completedMeals.has(meal.meal) 
                        ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg hover:shadow-xl border-0" 
                        : "bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-300 text-gray-600 hover:from-green-50 hover:to-emerald-50 hover:border-green-300 hover:text-green-700"
                    }`}
                  >
                    <div className={`absolute inset-0 transition-opacity duration-300 ${
                      completedMeals.has(meal.meal) 
                        ? "bg-gradient-to-r from-green-600 to-emerald-600 opacity-0 group-hover:opacity-20" 
                        : "bg-gradient-to-r from-green-200 to-emerald-200 opacity-0 group-hover:opacity-30"
                    }`}></div>
                    <div className="relative">
                      {completedMeals.has(meal.meal) ? (
                        <div className="flex items-center">
                          <CheckCircle2 className="h-4 w-4 group-hover:animate-pulse" />
                          <span className="text-xs mr-1">✅</span>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <span className="h-4 w-4 border-2 border-current rounded-full group-hover:border-green-500 transition-colors duration-300"></span>
                          <span className="text-xs mr-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">🍽️</span>
                        </div>
                      )}
                    </div>
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workouts" className="mt-4">
          <Card className="card-mobile">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>تمارين اليوم</span>
                {!isRestDay && (
                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <div className="flex gap-1">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDownloadWorkout(false)}
                        className="btn-touch group relative overflow-hidden bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 text-blue-700 hover:from-blue-100 hover:to-cyan-100 hover:border-blue-300 hover:text-blue-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl min-h-[48px] flex-1 px-3 py-2"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                        <div className="relative flex items-center justify-center">
                          <div className="bg-blue-100 rounded-full p-1 ml-1 group-hover:bg-blue-200 transition-colors duration-300">
                            <Download className="h-3 w-3 text-blue-600 group-hover:animate-bounce" />
                          </div>
                          <span className="font-medium text-xs">💻 كمبيوتر</span>
                        </div>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDownloadWorkout(true)}
                        className="btn-touch group relative overflow-hidden bg-gradient-to-r from-cyan-50 to-teal-50 border-2 border-cyan-200 text-cyan-700 hover:from-cyan-100 hover:to-teal-100 hover:border-cyan-300 hover:text-cyan-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl min-h-[48px] flex-1 px-3 py-2"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-teal-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                        <div className="relative flex items-center justify-center">
                          <div className="bg-cyan-100 rounded-full p-1 ml-1 group-hover:bg-cyan-200 transition-colors duration-300">
                            <Download className="h-3 w-3 text-cyan-600 group-hover:animate-bounce" />
                          </div>
                          <span className="font-medium text-xs">📱 جوال</span>
                        </div>
                      </Button>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewDetails('workout')}
                      className="btn-touch group relative overflow-hidden bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-200 text-purple-700 hover:from-purple-100 hover:to-indigo-100 hover:border-purple-300 hover:text-purple-800 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg min-h-[48px] w-full sm:w-auto px-4 py-3"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-300 to-indigo-300 opacity-0 group-hover:opacity-15 transition-opacity duration-300"></div>
                      <div className="relative flex items-center justify-center">
                        <span className="font-medium text-sm">📊 التفاصيل</span>
                        <ArrowRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </Button>
                  </div>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isRestDay ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">🛌</div>
                  <div className="text-lg font-medium">يوم راحة</div>
                  <div className="text-sm text-muted-foreground mt-2">
                    يمكنك ممارسة إطالات خفيفة أو مشي بسيط
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {workoutSummary.map((exercise, index) => (
                    <div key={index} className="from-gray-50 to-blue-50 rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-300 bg-[#020817]">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="font-bold mobile-text flex items-center gap-2 text-[#5491e8]">
                            <Dumbbell className="h-4 w-4 text-blue-600" />
                            {exercise.name}
                          </div>
                          <div className="text-sm text-muted-foreground mobile-text mt-1">
                            {exercise.description}
                          </div>
                        </div>
                        <Button
                          variant={completedWorkouts.has(exercise.name) ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleWorkoutCompletion(exercise.name)}
                          className={`btn-touch group relative overflow-hidden transition-all duration-300 transform hover:scale-110 ${
                            completedWorkouts.has(exercise.name) 
                              ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg hover:shadow-xl border-0" 
                              : "bg-gradient-to-r from-gray-50 to-gray-100 text-gray-600 hover:from-emerald-50 hover:to-teal-50 hover:border-emerald-300 hover:text-emerald-700"
                          }`}
                        >
                          <div className="relative">
                            {completedWorkouts.has(exercise.name) ? (
                              <div className="flex items-center">
                                <CheckCircle2 className="h-4 w-4 group-hover:animate-pulse" />
                                <span className="text-xs mr-1">✅</span>
                              </div>
                            ) : (
                              <div className="flex items-center">
                                <span className="h-4 w-4 border-2 border-current rounded-full group-hover:border-emerald-500 transition-colors duration-300"></span>
                                <span className="text-xs mr-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">💪</span>
                              </div>
                            )}
                          </div>
                        </Button>
                      </div>

                      {/* Weight Input Section */}
                      <div className="rounded-lg p-3 border border-blue-200 bg-[#020817]">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2 text-blue-700">
                            <Weight className="h-4 w-4" />
                            <span className="text-sm font-medium">الوزن:</span>
                          </div>
                          <div className="flex-1 max-w-24">
                            <Input
                              type="number"
                              placeholder="0"
                              value={exerciseWeights.get(exercise.name) || ''}
                              onChange={(e) => {
                                const weight = parseFloat(e.target.value) || 0;
                                updateExerciseWeight(exercise.name, weight);
                              }}
                              className="text-center font-bold text-blue-800 border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                            />
                          </div>
                          <span className="text-sm font-medium text-blue-700">كجم</span>
                          <div className="flex-1 text-left">
                            {exerciseWeights.get(exercise.name) && exerciseWeights.get(exercise.name)! > 0 && (
                              <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                                🏋️ {exerciseWeights.get(exercise.name)} كجم
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}