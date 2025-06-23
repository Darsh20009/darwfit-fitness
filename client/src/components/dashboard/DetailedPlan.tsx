import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { getDailyMealPlan } from "../../data/mealPlans";
import { getWorkoutByDayIndex } from "../../data/workoutPlans";
import { 
  CheckCircle2, 
  Circle, 
  ArrowLeft, 
  Utensils, 
  Dumbbell,
  Clock,
  Target,
  Info
} from "lucide-react";
import { LocalStorageManager } from "../../lib/localStorage";

interface DetailedPlanProps {
  type: 'meal' | 'workout';
  dayIndex: number;
  onBack: () => void;
}

export default function DetailedPlan({ type, dayIndex, onBack }: DetailedPlanProps) {
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());

  const dateKey = new Date().toISOString().split('T')[0];

  const mealPlan = getDailyMealPlan();
  const workoutPlan = getWorkoutByDayIndex(dayIndex);
  const isRestDay = dayIndex === 6;

  // تحميل البيانات المحفوظة
  useEffect(() => {
    if (type === 'meal') {
      const savedProgress = LocalStorageManager.getMealProgress(dateKey);
      const completed = new Set(
        Object.keys(savedProgress).filter(key => savedProgress[key].completed)
      );
      setCompletedItems(completed);
    } else {
      const savedProgress = LocalStorageManager.getWorkoutProgress(dateKey);
      const completed = new Set(
        Object.keys(savedProgress).filter(key => savedProgress[key].completed)
      );
      setCompletedItems(completed);
    }
  }, [type, dateKey]);

  const toggleItemCompletion = (itemName: string) => {
    const newCompleted = new Set(completedItems);
    if (newCompleted.has(itemName)) {
      newCompleted.delete(itemName);
    } else {
      newCompleted.add(itemName);
    }
    setCompletedItems(newCompleted);

    // حفظ في localStorage
    if (type === 'meal') {
      const currentProgress = LocalStorageManager.getMealProgress(dateKey);
      currentProgress[itemName] = {
        completed: newCompleted.has(itemName),
        completedAt: new Date().toISOString()
      };
      LocalStorageManager.setItem(`meal_progress_${dateKey}`, currentProgress);
    } else {
      const currentProgress = LocalStorageManager.getWorkoutProgress(dateKey);
      currentProgress[itemName] = {
        completed: newCompleted.has(itemName),
        completedAt: new Date().toISOString()
      };
      LocalStorageManager.setItem(`workout_progress_${dateKey}`, currentProgress);
    }
  };

  const renderMealPlan = () => {
    const meals = [
      { key: 'breakfast', data: mealPlan.breakfast },
      { key: 'morningSnack', data: mealPlan.morningSnack },
      { key: 'lunch', data: mealPlan.lunch },
      { key: 'afternoonSnack', data: mealPlan.afternoonSnack },
      { key: 'dinner', data: mealPlan.dinner },
      { key: 'beforeSleep', data: mealPlan.beforeSleep },
    ];

    const totalMeals = meals.length;
    const completedMeals = meals.filter(meal => completedItems.has(meal.data.title)).length;
    const progress = (completedMeals / totalMeals) * 100;

    return (
      <div className="space-y-6">
        {/* Progress Overview */}
        <Card className="card-mobile">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-green-600" />
              التقدم اليومي
            </CardTitle>
            <CardDescription>
              {completedMeals} من {totalMeals} وجبات مكتملة
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={progress} className="w-full h-3" />
            <p className="text-sm text-muted-foreground mt-2">
              {progress.toFixed(0)}% مكتمل
            </p>
          </CardContent>
        </Card>

        {/* Meals */}
        <div className="space-y-4">
          {meals.map((meal, index) => (
            <Card key={meal.key} className="card-mobile">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Utensils className="h-5 w-5 text-orange-600" />
                    {meal.data.title}
                  </span>
                  <Button
                    variant={completedItems.has(meal.data.title) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleItemCompletion(meal.data.title)}
                    className="btn-touch"
                  >
                    {completedItems.has(meal.data.title) ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <Circle className="h-4 w-4" />
                    )}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  {meal.data.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-sm mobile-text">{item}</span>
                    </div>
                  ))}
                </div>

                {meal.data.nutritionInfo && (
                  <div className="flex flex-wrap gap-2 pt-2 border-t">
                    {meal.data.nutritionInfo.protein && (
                      <Badge variant="secondary" className="text-xs">
                        بروتين: {meal.data.nutritionInfo.protein}
                      </Badge>
                    )}
                    {meal.data.nutritionInfo.carbs && (
                      <Badge variant="secondary" className="text-xs">
                        كارب: {meal.data.nutritionInfo.carbs}
                      </Badge>
                    )}
                    {meal.data.nutritionInfo.fats && (
                      <Badge variant="secondary" className="text-xs">
                        دهون: {meal.data.nutritionInfo.fats}
                      </Badge>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Nutrition Guide */}
        <Card className="card-mobile">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5 text-blue-600" />
              {mealPlan.nutritionGuide.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mealPlan.nutritionGuide.items.map((tip, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span className="text-sm mobile-text">{tip}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderWorkoutPlan = () => {
    if (isRestDay) {
      return (
        <Card className="card-mobile">
          <CardContent className="text-center py-8">
            <div className="text-4xl mb-4">🛌</div>
            <div className="text-lg font-medium">يوم راحة</div>
            <div className="text-sm text-muted-foreground mt-2">
              يمكنك ممارسة إطالات خفيفة أو مشي بسيط
            </div>
          </CardContent>
        </Card>
      );
    }

    const exerciseGroups = Object.entries(workoutPlan.exercises);
    const totalExercises = exerciseGroups.reduce((total, [_, exercises]) => total + exercises.length, 0);
    const completedExercises = exerciseGroups.reduce((total, [_, exercises]) => {
      return total + exercises.filter(ex => completedItems.has(ex.name)).length;
    }, 0);
    const progress = totalExercises > 0 ? (completedExercises / totalExercises) * 100 : 0;

    return (
      <div className="space-y-6">
        {/* Progress Overview */}
        <Card className="card-mobile">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              {workoutPlan.title}
            </CardTitle>
            <CardDescription>
              {completedExercises} من {totalExercises} تمارين مكتملة
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={progress} className="w-full h-3" />
            <p className="text-sm text-muted-foreground mt-2">
              {progress.toFixed(0)}% مكتمل
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {workoutPlan.description}
            </p>
          </CardContent>
        </Card>

        {/* Exercise Groups */}
        <div className="space-y-4">
          {exerciseGroups.map(([groupName, exercises], groupIndex) => (
            <Card key={groupIndex} className="card-mobile">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Dumbbell className="h-5 w-5 text-blue-600" />
                  {groupName}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {exercises.map((exercise, exerciseIndex) => (
                  <div key={exerciseIndex} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium mobile-text">{exercise.name}</div>
                      <div className="text-sm text-muted-foreground mobile-text">
                        {exercise.sets} مجموعات × {exercise.reps}
                      </div>
                    </div>
                    <Button
                      variant={completedItems.has(exercise.name) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleItemCompletion(exercise.name)}
                      className="btn-touch"
                    >
                      {completedItems.has(exercise.name) ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <Circle className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={onBack}
          className="btn-touch"
        >
          <ArrowLeft className="h-4 w-4 ml-2" />
          رجوع
        </Button>
        <h2 className="text-xl font-bold">
          {type === 'meal' ? 'الخطة الغذائية التفصيلية' : 'خطة التمارين التفصيلية'}
        </h2>
      </div>

      {/* Content */}
      {type === 'meal' ? renderMealPlan() : renderWorkoutPlan()}
    </div>
  );
}