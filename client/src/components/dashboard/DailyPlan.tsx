import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getMealSummary } from "../../data/mealPlans";
import { getWorkoutSummary } from "../../data/workoutPlans";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Dumbbell, Utensils, CheckCircle2, ArrowRight, Lock } from "lucide-react";
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { LocalStorageManager } from "../../lib/localStorage";

interface DailyPlanProps {
  selectedDate: Date;
  onViewDetails: (type: 'meal' | 'workout', dayIndex: number) => void;
}

export default function DailyPlan({ selectedDate, onViewDetails }: DailyPlanProps) {
  const [completedMeals, setCompletedMeals] = useState<Set<string>>(new Set());
  const [completedWorkouts, setCompletedWorkouts] = useState<Set<string>>(new Set());

  const dayIndex = selectedDate.getDay();
  const isRestDay = dayIndex === 6; // Sunday is rest day

  const mealSummary = getMealSummary();
  const workoutSummary = isRestDay ? [] : getWorkoutSummary(dayIndex);

  const dateKey = selectedDate.toISOString().split('T')[0];

  // تحميل البيانات المحفوظة عند تغيير التاريخ
  useEffect(() => {
    const savedMealProgress = LocalStorageManager.getMealProgress(dateKey);
    const savedWorkoutProgress = LocalStorageManager.getWorkoutProgress(dateKey);

    const completedMealNames = new Set(
      Object.keys(savedMealProgress).filter(key => savedMealProgress[key].completed)
    );
    const completedWorkoutNames = new Set(
      Object.keys(savedWorkoutProgress).filter(key => savedWorkoutProgress[key].completed)
    );

    setCompletedMeals(completedMealNames);
    setCompletedWorkouts(completedWorkoutNames);
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

  const mealProgress = (completedMeals.size / mealSummary.length) * 100;
  const workoutProgress = isRestDay ? 100 : (completedWorkouts.size / workoutSummary.length) * 100;

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
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onViewDetails('meal', dayIndex)}
                  className="btn-touch"
                >
                  التفاصيل
                  <ArrowRight className="h-4 w-4 mr-2" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
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
                    className="btn-touch"
                  >
                    {completedMeals.has(meal.meal) ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <span className="h-4 w-4 border border-current rounded-full"></span>
                    )}
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
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onViewDetails('workout', dayIndex)}
                    className="btn-touch"
                  >
                    التفاصيل
                    <ArrowRight className="h-4 w-4 mr-2" />
                  </Button>
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
                <div className="space-y-3">
                  {workoutSummary.map((exercise, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium mobile-text">{exercise.name}</div>
                        <div className="text-sm text-muted-foreground mobile-text">
                          {exercise.description}
                        </div>
                      </div>
                      <Button
                        variant={completedWorkouts.has(exercise.name) ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleWorkoutCompletion(exercise.name)}
                        className="btn-touch"
                      >
                        {completedWorkouts.has(exercise.name) ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <span className="h-4 w-4 border border-current rounded-full"></span>
                        )}
                      </Button>
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