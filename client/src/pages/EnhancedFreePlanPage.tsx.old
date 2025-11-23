import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Dumbbell, Utensils, DollarSign, Clock, Target, Flame, 
  Star, Trophy, Heart, Zap, ShoppingCart, ChefHat,
  Calendar, TrendingUp, Award, Lightbulb, Sparkles
} from "lucide-react";
import { 
  enhancedExerciseDatabase, 
  budgetFoodDatabase, 
  creativeWorkoutPlans,
  budgetMealPlans,
  budgetFitnessTips,
  type EnhancedExercise,
  type BudgetFoodItem
} from "../data/enhancedFreePlan";

export default function EnhancedFreePlanPage() {
  const [selectedWorkoutPlan, setSelectedWorkoutPlan] = useState("beginner");
  const [selectedMealPlan, setSelectedMealPlan] = useState("bulking");
  const [favoriteExercises, setFavoriteExercises] = useState<string[]>([]);
  const [favoriteFoods, setFavoriteFoods] = useState<string[]>([]);
  const [currentWeek, setCurrentWeek] = useState(1);

  const toggleFavoriteExercise = (exerciseName: string) => {
    setFavoriteExercises(prev => 
      prev.includes(exerciseName) 
        ? prev.filter(name => name !== exerciseName)
        : [...prev, exerciseName]
    );
  };

  const toggleFavoriteFood = (foodName: string) => {
    setFavoriteFoods(prev => 
      prev.includes(foodName) 
        ? prev.filter(name => name !== foodName)
        : [...prev, foodName]
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "مبتدئ": return "bg-green-100 text-green-800 border-green-200";
      case "متوسط": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "متقدم": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "بروتين": return "bg-red-50 border-red-200";
      case "كاربوهيدرات": return "bg-blue-50 border-blue-200";
      case "خضار": return "bg-green-50 border-green-200";
      case "فواكه": return "bg-orange-50 border-orange-200";
      case "دهون صحية": return "bg-purple-50 border-purple-200";
      case "وجبات كاملة": return "bg-indigo-50 border-indigo-200";
      default: return "bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <div className="container mx-auto px-4 py-8 space-y-8">
        
        {/* Hero Section */}
        <div className="text-center space-y-6 py-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              DARWFIT FREE
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            خطة مجانية شاملة وإبداعية للياقة البدنية والتغذية الصحية - مصممة خصيصاً للميزانيات المحدودة
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <DollarSign className="h-4 w-4" />
              <span>اقتصادي 100%</span>
            </div>
            <div className="flex items-center space-x-1">
              <Target className="h-4 w-4" />
              <span>نتائج مضمونة</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="h-4 w-4" />
              <span>صحي ومستدام</span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
            <CardContent className="p-6 text-center">
              <Dumbbell className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-800 dark:text-blue-300">
                {enhancedExerciseDatabase.length}+
              </div>
              <p className="text-sm text-blue-600 dark:text-blue-400">تمرين متنوع</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
            <CardContent className="p-6 text-center">
              <Utensils className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-800 dark:text-green-300">
                {budgetFoodDatabase.length}+
              </div>
              <p className="text-sm text-green-600 dark:text-green-400">طعام اقتصادي</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
            <CardContent className="p-6 text-center">
              <Trophy className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-800 dark:text-purple-300">3</div>
              <p className="text-sm text-purple-600 dark:text-purple-400">خطط تمرين</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
            <CardContent className="p-6 text-center">
              <DollarSign className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-800 dark:text-orange-300">20-60</div>
              <p className="text-sm text-orange-600 dark:text-orange-400">ريال يومياً</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="workouts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white dark:bg-gray-800 border-2">
            <TabsTrigger value="workouts" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <Dumbbell className="h-4 w-4 mr-2" />
              التمارين
            </TabsTrigger>
            <TabsTrigger value="nutrition" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
              <Utensils className="h-4 w-4 mr-2" />
              التغذية
            </TabsTrigger>
            <TabsTrigger value="plans" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
              <Calendar className="h-4 w-4 mr-2" />
              الخطط
            </TabsTrigger>
            <TabsTrigger value="tips" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              <Lightbulb className="h-4 w-4 mr-2" />
              النصائح
            </TabsTrigger>
          </TabsList>

          {/* Workouts Tab */}
          <TabsContent value="workouts" className="space-y-6">
            <Card className="border-2 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Dumbbell className="h-6 w-6 text-blue-600" />
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    بنك التمارين الإبداعي
                  </span>
                </CardTitle>
                <p className="text-gray-600 dark:text-gray-300">
                  {enhancedExerciseDatabase.length} تمرين متنوع لجميع مستويات اللياقة - بدون أدوات أو بأدوات بسيطة
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {enhancedExerciseDatabase.map((exercise, index) => (
                    <Card key={index} className={`border-2 transition-all duration-300 hover:shadow-lg ${
                      favoriteExercises.includes(exercise.name) ? 'ring-2 ring-yellow-400 bg-yellow-50 dark:bg-yellow-900/20' : ''
                    }`}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                                {exercise.arabicName}
                              </h3>
                              <Badge className={getDifficultyColor(exercise.difficulty)}>
                                {exercise.difficulty}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {exercise.equipment}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                              {exercise.description}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleFavoriteExercise(exercise.name)}
                            className={favoriteExercises.includes(exercise.name) ? 'text-yellow-500' : 'text-gray-400'}
                          >
                            <Star className={`h-5 w-5 ${favoriteExercises.includes(exercise.name) ? 'fill-current' : ''}`} />
                          </Button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <div className="text-lg font-bold text-blue-600">{exercise.sets}</div>
                            <div className="text-xs text-blue-500">مجموعات</div>
                          </div>
                          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <div className="text-lg font-bold text-green-600">{exercise.reps}</div>
                            <div className="text-xs text-green-500">تكرارات</div>
                          </div>
                          <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                            <div className="text-lg font-bold text-orange-600">{exercise.rest}</div>
                            <div className="text-xs text-orange-500">راحة</div>
                          </div>
                          <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                            <div className="text-lg font-bold text-red-600">{exercise.calories}</div>
                            <div className="text-xs text-red-500">سعرة</div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">العضلات المستهدفة:</h4>
                            <div className="flex flex-wrap gap-2">
                              {exercise.targetMuscles.map((muscle, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {muscle}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">التنويعات:</h4>
                            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                              {exercise.variations.slice(0, 3).map((variation, idx) => (
                                <li key={idx} className="flex items-center space-x-2">
                                  <Zap className="h-3 w-3 text-blue-500" />
                                  <span>{variation}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">نصائح مهمة:</h4>
                            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                              {exercise.tips.slice(0, 2).map((tip, idx) => (
                                <li key={idx} className="flex items-center space-x-2">
                                  <Target className="h-3 w-3 text-green-500" />
                                  <span>{tip}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Nutrition Tab */}
          <TabsContent value="nutrition" className="space-y-6">
            <Card className="border-2 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ShoppingCart className="h-6 w-6 text-green-600" />
                  <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                    دليل الأطعمة الاقتصادية
                  </span>
                </CardTitle>
                <p className="text-gray-600 dark:text-gray-300">
                  {budgetFoodDatabase.length} صنف غذائي اقتصادي وصحي - مع تفاصيل السعر والفوائد وطرق التحضير
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {budgetFoodDatabase.map((food, index) => (
                    <Card key={index} className={`border-2 transition-all duration-300 hover:shadow-lg ${getCategoryColor(food.category)} ${
                      favoriteFoods.includes(food.name) ? 'ring-2 ring-yellow-400' : ''
                    }`}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                                {food.name}
                              </h3>
                              <Badge className={getCategoryColor(food.category).replace('50', '100').replace('border-', 'text-') + ' border-0'}>
                                {food.category}
                              </Badge>
                              <Badge variant="outline" className="text-xs bg-green-100 text-green-800">
                                {food.seasonality}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                              <span className="flex items-center space-x-1">
                                <DollarSign className="h-4 w-4" />
                                <span>{food.cost}</span>
                              </span>
                              <span>• {food.servingSize}</span>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleFavoriteFood(food.name)}
                            className={favoriteFoods.includes(food.name) ? 'text-yellow-500' : 'text-gray-400'}
                          >
                            <Star className={`h-5 w-5 ${favoriteFoods.includes(food.name) ? 'fill-current' : ''}`} />
                          </Button>
                        </div>

                        <div className="grid grid-cols-4 gap-3 mb-4">
                          <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                            <div className="text-lg font-bold text-red-600">{food.calories}</div>
                            <div className="text-xs text-red-500">سعرة</div>
                          </div>
                          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <div className="text-lg font-bold text-blue-600">{food.protein}g</div>
                            <div className="text-xs text-blue-500">بروتين</div>
                          </div>
                          <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                            <div className="text-lg font-bold text-yellow-600">{food.carbs}g</div>
                            <div className="text-xs text-yellow-500">كاربوهيدرات</div>
                          </div>
                          <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                            <div className="text-lg font-bold text-purple-600">{food.fats}g</div>
                            <div className="text-xs text-purple-500">دهون</div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">الفوائد الصحية:</h4>
                            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                              {food.benefits.slice(0, 3).map((benefit, idx) => (
                                <li key={idx} className="flex items-center space-x-2">
                                  <Heart className="h-3 w-3 text-red-500" />
                                  <span>{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">طرق التحضير:</h4>
                            <div className="flex flex-wrap gap-2">
                              {food.cookingMethods.map((method, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  <ChefHat className="h-3 w-3 mr-1" />
                                  {method}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {food.alternatives.length > 0 && (
                            <div>
                              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">البدائل:</h4>
                              <div className="flex flex-wrap gap-2">
                                {food.alternatives.map((alt, idx) => (
                                  <Badge key={idx} variant="secondary" className="text-xs">
                                    {alt}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Plans Tab */}
          <TabsContent value="plans" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Workout Plans */}
              <Card className="border-2 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Trophy className="h-6 w-6 text-purple-600" />
                    <span>خطط التمرين</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(creativeWorkoutPlans).map(([key, plan]) => (
                    <Card 
                      key={key} 
                      className={`cursor-pointer transition-all duration-300 border-2 ${
                        selectedWorkoutPlan === key 
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                      onClick={() => setSelectedWorkoutPlan(key)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold text-lg">{plan.name}</h3>
                          <Badge className={selectedWorkoutPlan === key ? 'bg-purple-500 text-white' : ''}>
                            {plan.frequency}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          {plan.description}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{plan.duration}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>

              {/* Meal Plans */}
              <Card className="border-2 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <ChefHat className="h-6 w-6 text-green-600" />
                    <span>خطط التغذية</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(budgetMealPlans).map(([key, plan]) => (
                    <Card 
                      key={key} 
                      className={`cursor-pointer transition-all duration-300 border-2 ${
                        selectedMealPlan === key 
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                      onClick={() => setSelectedMealPlan(key)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold text-lg">{plan.name}</h3>
                          <Badge className={selectedMealPlan === key ? 'bg-green-500 text-white' : ''}>
                            {plan.dailyCost}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <Flame className="h-4 w-4 text-orange-500" />
                            <span>{plan.targetCalories} سعرة</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Target className="h-4 w-4 text-blue-500" />
                            <span>{plan.targetProtein}g بروتين</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tips Tab */}
          <TabsContent value="tips" className="space-y-6">
            <div className="grid gap-6">
              {budgetFitnessTips.map((tipCategory, index) => (
                <Card key={index} className="border-2 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Lightbulb className="h-6 w-6 text-yellow-600" />
                      <span>{tipCategory.category}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {tipCategory.tips.map((tip, tipIndex) => (
                        <div key={tipIndex} className="flex items-start space-x-3 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg">
                          <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-white text-xs font-bold">{tipIndex + 1}</span>
                          </div>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            {tip}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Progress Tracker */}
        <Card className="border-2 border-indigo-200 shadow-xl bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-6 w-6 text-indigo-600" />
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                متتبع التقدم الأسبوعي
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">الأسبوع الحالي</span>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setCurrentWeek(Math.max(1, currentWeek - 1))}
                  disabled={currentWeek === 1}
                >
                  السابق
                </Button>
                <Badge variant="secondary" className="px-4 py-2 text-lg">
                  {currentWeek}
                </Badge>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setCurrentWeek(Math.min(12, currentWeek + 1))}
                  disabled={currentWeek === 12}
                >
                  التالي
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">تقدم التمارين</span>
                  <span className="text-sm text-gray-500">{Math.min(100, currentWeek * 8)}%</span>
                </div>
                <Progress value={Math.min(100, currentWeek * 8)} className="h-3" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">تقدم التغذية</span>
                  <span className="text-sm text-gray-500">{Math.min(100, currentWeek * 7)}%</span>
                </div>
                <Progress value={Math.min(100, currentWeek * 7)} className="h-3" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">الانضباط العام</span>
                  <span className="text-sm text-gray-500">{Math.min(100, currentWeek * 6)}%</span>
                </div>
                <Progress value={Math.min(100, currentWeek * 6)} className="h-3" />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
              <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg border">
                <Award className="h-6 w-6 text-yellow-500 mx-auto mb-1" />
                <div className="text-lg font-bold">{currentWeek * 3}</div>
                <div className="text-xs text-gray-500">تمارين مكتملة</div>
              </div>
              <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg border">
                <Heart className="h-6 w-6 text-red-500 mx-auto mb-1" />
                <div className="text-lg font-bold">{currentWeek * 5}</div>
                <div className="text-xs text-gray-500">أيام التزام</div>
              </div>
              <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg border">
                <Target className="h-6 w-6 text-blue-500 mx-auto mb-1" />
                <div className="text-lg font-bold">{currentWeek * 2}</div>
                <div className="text-xs text-gray-500">أهداف محققة</div>
              </div>
              <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg border">
                <TrendingUp className="h-6 w-6 text-green-500 mx-auto mb-1" />
                <div className="text-lg font-bold">{Math.min(100, currentWeek * 10)}%</div>
                <div className="text-xs text-gray-500">تحسن عام</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="border-2 border-gradient-to-r from-blue-200 to-purple-200 shadow-xl bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20">
          <CardContent className="p-8 text-center">
            <div className="space-y-4">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto flex items-center justify-center">
                <Sparkles className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ابدأ رحلتك اليوم!
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                كل ما تحتاجه للوصول لأهدافك متوفر هنا مجاناً. ابدأ بتمرين واحد ووجبة واحدة، والنجاح سيتبعك.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3">
                  <Dumbbell className="h-5 w-5 mr-2" />
                  ابدأ التمرين الآن
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-purple-300 hover:bg-purple-50 px-8 py-3">
                  <Utensils className="h-5 w-5 mr-2" />
                  خطط وجباتك
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}