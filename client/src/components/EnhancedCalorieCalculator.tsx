import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Calculator, Target, TrendingUp, Activity, Search, Plus, Trash2, Utensils, RotateCcw, Heart } from "lucide-react";
import { useLocation } from "wouter";
import { 
  arabicFoodDatabase, 
  getAllCategories, 
  getFoodsInCategory, 
  getFoodInfo, 
  searchFoods, 
  quantityTypes, 
  calculateNutrition,
  type FoodItem 
} from "@/data/foodDatabase";
import DesignYourLife from "./DesignYourLife";

type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "very_active";
type Goal = "lose" | "maintain" | "gain";
type Gender = "male" | "female";

interface CalorieCalculatorProps {
  initialWeight?: number;
  initialHeight?: number;
  initialAge?: number;
  initialGender?: Gender;
}

interface DailyIntake {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

interface FoodEntry {
  id: string;
  category: string;
  food: string;
  quantity: number;
  quantityType: keyof typeof quantityTypes;
  nutrition: FoodItem;
  timestamp: Date;
}

export default function EnhancedCalorieCalculator({
  initialWeight = 70,
  initialHeight = 170,
  initialAge = 25,
  initialGender = "male"
}: CalorieCalculatorProps) {
  const [, setLocation] = useLocation();
  
  // User data state
  const [weight, setWeight] = useState(initialWeight);
  const [height, setHeight] = useState(initialHeight);
  const [age, setAge] = useState(initialAge);
  const [gender, setGender] = useState<Gender>(initialGender);
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>("moderate");
  const [goal, setGoal] = useState<Goal>("maintain");
  
  // Food tracking state
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFood, setSelectedFood] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [quantityType, setQuantityType] = useState<keyof typeof quantityTypes>("serving");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Array<{category: string, food: string, info: FoodItem}>>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  
  // Daily tracking state
  const [dailyGoal, setDailyGoal] = useState<DailyIntake>({ calories: 2000, protein: 150, carbs: 250, fats: 65 });
  const [dailyIntake, setDailyIntake] = useState<DailyIntake>({ calories: 0, protein: 0, carbs: 0, fats: 0 });
  const [foodEntries, setFoodEntries] = useState<FoodEntry[]>([]);
  const [currentNutrition, setCurrentNutrition] = useState<FoodItem | null>(null);

  // Load saved data on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('dailyFoodEntries');
    if (savedEntries) {
      const entries = JSON.parse(savedEntries).map((entry: any) => ({
        ...entry,
        timestamp: new Date(entry.timestamp)
      }));
      
      // Filter entries from today only
      const today = new Date().toDateString();
      const todayEntries = entries.filter((entry: FoodEntry) => 
        entry.timestamp.toDateString() === today
      );
      
      setFoodEntries(todayEntries);
      updateDailyIntake(todayEntries);
    }
  }, []);

  // Save entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('dailyFoodEntries', JSON.stringify(foodEntries));
    updateDailyIntake(foodEntries);
  }, [foodEntries]);

  // Calculate calorie needs
  useEffect(() => {
    const bmr = calculateBMR();
    const tdee = bmr * getActivityMultiplier();
    const goalCalories = getGoalCalories(tdee);
    
    setDailyGoal({
      calories: Math.round(goalCalories),
      protein: Math.round(goalCalories * 0.3 / 4), // 30% protein
      carbs: Math.round(goalCalories * 0.4 / 4), // 40% carbs
      fats: Math.round(goalCalories * 0.3 / 9) // 30% fats
    });
  }, [weight, height, age, gender, activityLevel, goal]);

  // Handle search
  useEffect(() => {
    if (searchQuery.length >= 2) {
      const results = searchFoods(searchQuery);
      setSearchResults(results);
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  }, [searchQuery]);

  // Update current nutrition when food/quantity changes
  useEffect(() => {
    if (selectedCategory && selectedFood) {
      const foodInfo = getFoodInfo(selectedCategory, selectedFood);
      if (foodInfo) {
        const nutrition = calculateNutrition(foodInfo, quantity, quantityType);
        setCurrentNutrition(nutrition);
      }
    }
  }, [selectedCategory, selectedFood, quantity, quantityType]);

  const calculateBMR = () => {
    if (gender === "male") {
      return (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
      return (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }
  };

  const getActivityMultiplier = () => {
    const multipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9
    };
    return multipliers[activityLevel];
  };

  const getGoalCalories = (tdee: number) => {
    switch (goal) {
      case "lose": return tdee - 500;
      case "gain": return tdee + 500;
      default: return tdee;
    }
  };

  const updateDailyIntake = (entries: FoodEntry[]) => {
    const totals = entries.reduce((acc, entry) => ({
      calories: acc.calories + entry.nutrition.calories,
      protein: acc.protein + entry.nutrition.protein,
      carbs: acc.carbs + entry.nutrition.carbs,
      fats: acc.fats + (entry.nutrition.fats || 0)
    }), { calories: 0, protein: 0, carbs: 0, fats: 0 });
    
    setDailyIntake(totals);
  };

  const addFoodEntry = () => {
    if (!selectedCategory || !selectedFood || !currentNutrition) return;
    
    const newEntry: FoodEntry = {
      id: Date.now().toString(),
      category: selectedCategory,
      food: selectedFood,
      quantity,
      quantityType,
      nutrition: currentNutrition,
      timestamp: new Date()
    };
    
    setFoodEntries(prev => [...prev, newEntry]);
    
    // Reset form
    setSelectedCategory("");
    setSelectedFood("");
    setQuantity(1);
    setSearchQuery("");
  };

  const removeFoodEntry = (id: string) => {
    setFoodEntries(prev => prev.filter(entry => entry.id !== id));
  };

  const resetDay = () => {
    setFoodEntries([]);
    localStorage.removeItem('dailyFoodEntries');
  };

  const selectFromSearch = (result: {category: string, food: string, info: FoodItem}) => {
    setSelectedCategory(result.category);
    setSelectedFood(result.food);
    setSearchQuery(result.food);
    setShowSearchResults(false);
  };

  const getProgressColor = (current: number, target: number) => {
    const percentage = (current / target) * 100;
    if (percentage < 80) return "bg-red-500";
    if (percentage < 100) return "bg-yellow-500";
    if (percentage <= 120) return "bg-green-500";
    return "bg-orange-500";
  };

  const categories = getAllCategories();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-gray-900 dark:via-emerald-900 dark:to-green-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent mb-4">
              🍽️ حاسبة السعرات الحرارية المطورة
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
              تتبع تغذيتك اليومية مع قاعدة بيانات شاملة للطعام العربي
            </p>
          </div>

          <Tabs defaultValue="calculator" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <TabsTrigger value="calculator" className="flex items-center gap-2">
                <Utensils className="h-4 w-4" />
                الحاسبة
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                السجل اليومي
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                الملف الشخصي
              </TabsTrigger>
              <TabsTrigger value="design" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                صمم حياتك
              </TabsTrigger>
            </TabsList>

            {/* Calculator Tab */}
            <TabsContent value="calculator" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Food Selection */}
                <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-emerald-700 dark:text-emerald-300 flex items-center">
                      <Plus className="h-5 w-5 ml-2" />
                      إضافة طعام جديد
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Search */}
                    <div className="relative">
                      <Label>البحث السريع</Label>
                      <div className="relative">
                        <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="ابحث عن الطعام..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pr-10"
                        />
                      </div>
                      {showSearchResults && searchResults.length > 0 && (
                        <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                          {searchResults.map((result, index) => (
                            <div
                              key={index}
                              onClick={() => selectFromSearch(result)}
                              className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer border-b last:border-b-0"
                            >
                              <div className="font-medium">{result.food}</div>
                              <div className="text-sm text-gray-500">{result.category}</div>
                              <div className="text-xs text-emerald-600">
                                {result.info.calories} سعرة | {result.info.protein}ج بروتين
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Category Selection */}
                    <div>
                      <Label>نوع المطبخ</Label>
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر نوع المطبخ" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(category => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Food Selection */}
                    {selectedCategory && (
                      <div>
                        <Label>الطعام</Label>
                        <Select value={selectedFood} onValueChange={setSelectedFood}>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر الطعام" />
                          </SelectTrigger>
                          <SelectContent>
                            {getFoodsInCategory(selectedCategory).map(food => (
                              <SelectItem key={food} value={food}>
                                {food}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {/* Quantity */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>نوع الكمية</Label>
                        <Select value={quantityType} onValueChange={(value: keyof typeof quantityTypes) => setQuantityType(value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(quantityTypes).map(([key, type]) => (
                              <SelectItem key={key} value={key}>
                                {type.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>الكمية</Label>
                        <Input
                          type="number"
                          min="0.1"
                          step="0.1"
                          value={quantity}
                          onChange={(e) => setQuantity(parseFloat(e.target.value) || 1)}
                        />
                      </div>
                    </div>

                    {/* Current Nutrition Display */}
                    {currentNutrition && (
                      <Card className="bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-700">
                        <CardContent className="p-4">
                          <h4 className="font-semibold mb-2 text-emerald-700 dark:text-emerald-300">
                            القيمة الغذائية
                          </h4>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>السعرات: {currentNutrition.calories}</div>
                            <div>البروتين: {currentNutrition.protein}ج</div>
                            <div>الكربوهيدرات: {currentNutrition.carbs}ج</div>
                            <div>الدهون: {currentNutrition.fats || 0}ج</div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    <Button 
                      onClick={addFoodEntry} 
                      disabled={!selectedFood || !currentNutrition}
                      className="w-full bg-emerald-600 hover:bg-emerald-700"
                    >
                      إضافة للحساب اليومي
                    </Button>
                  </CardContent>
                </Card>

                {/* Daily Summary */}
                <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-emerald-700 dark:text-emerald-300 flex items-center justify-between">
                      <span className="flex items-center">
                        <Target className="h-5 w-5 ml-2" />
                        ملخص اليوم
                      </span>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={resetDay}
                        className="text-red-600 border-red-300 hover:bg-red-50"
                      >
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Calories Progress */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>السعرات الحرارية</span>
                        <span>{dailyIntake.calories} / {dailyGoal.calories}</span>
                      </div>
                      <Progress 
                        value={(dailyIntake.calories / dailyGoal.calories) * 100} 
                        className="h-3"
                      />
                      <div className="text-center mt-1 text-sm text-gray-600">
                        متبقي: {Math.max(0, dailyGoal.calories - dailyIntake.calories)} سعرة
                      </div>
                    </div>

                    {/* Protein Progress */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>البروتين</span>
                        <span>{dailyIntake.protein.toFixed(1)} / {dailyGoal.protein}ج</span>
                      </div>
                      <Progress 
                        value={(dailyIntake.protein / dailyGoal.protein) * 100} 
                        className="h-3"
                      />
                    </div>

                    {/* Carbs Progress */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>الكربوهيدرات</span>
                        <span>{dailyIntake.carbs.toFixed(1)} / {dailyGoal.carbs}ج</span>
                      </div>
                      <Progress 
                        value={(dailyIntake.carbs / dailyGoal.carbs) * 100} 
                        className="h-3"
                      />
                    </div>

                    {/* Fats Progress */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>الدهون</span>
                        <span>{dailyIntake.fats.toFixed(1)} / {dailyGoal.fats}ج</span>
                      </div>
                      <Progress 
                        value={(dailyIntake.fats / dailyGoal.fats) * 100} 
                        className="h-3"
                      />
                    </div>

                    {/* Status Message */}
                    <div className="mt-4 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700">
                      <div className="text-sm text-blue-700 dark:text-blue-300">
                        {dailyIntake.calories < dailyGoal.calories * 0.8 && "تحتاج لتناول المزيد من الطعام"}
                        {dailyIntake.calories >= dailyGoal.calories * 0.8 && dailyIntake.calories <= dailyGoal.calories * 1.2 && "أنت على المسار الصحيح!"}
                        {dailyIntake.calories > dailyGoal.calories * 1.2 && "تحذير: تجاوزت الهدف اليومي"}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* History Tab */}
            <TabsContent value="history">
              <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-emerald-700 dark:text-emerald-300">
                    سجل الأطعمة اليوم
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {foodEntries.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      لم تقم بإضافة أي طعام اليوم
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {foodEntries.map((entry) => (
                        <div key={entry.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div>
                            <div className="font-medium">{entry.food}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {entry.quantity} {quantityTypes[entry.quantityType].name} | {entry.category}
                            </div>
                            <div className="text-sm text-emerald-600">
                              {entry.nutrition.calories} سعرة | {entry.nutrition.protein}ج بروتين
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFoodEntry(entry.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-emerald-700 dark:text-emerald-300">
                    حساب احتياجاتك اليومية
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>الجنس</Label>
                      <Select value={gender} onValueChange={(value: Gender) => setGender(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">ذكر</SelectItem>
                          <SelectItem value="female">أنثى</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>العمر (سنة)</Label>
                      <Input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(parseInt(e.target.value) || 25)}
                      />
                    </div>
                    <div>
                      <Label>الوزن (كجم)</Label>
                      <Input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(parseFloat(e.target.value) || 70)}
                      />
                    </div>
                    <div>
                      <Label>الطول (سم)</Label>
                      <Input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(parseFloat(e.target.value) || 170)}
                      />
                    </div>
                    <div>
                      <Label>مستوى النشاط</Label>
                      <Select value={activityLevel} onValueChange={(value: ActivityLevel) => setActivityLevel(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sedentary">قليل النشاط</SelectItem>
                          <SelectItem value="light">نشاط خفيف</SelectItem>
                          <SelectItem value="moderate">نشاط متوسط</SelectItem>
                          <SelectItem value="active">نشيط</SelectItem>
                          <SelectItem value="very_active">نشيط جداً</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>الهدف</Label>
                      <Select value={goal} onValueChange={(value: Goal) => setGoal(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lose">خسارة وزن</SelectItem>
                          <SelectItem value="maintain">الحفاظ على الوزن</SelectItem>
                          <SelectItem value="gain">زيادة وزن</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Results */}
                  <Card className="bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-700 mt-6">
                    <CardHeader>
                      <CardTitle className="text-emerald-700 dark:text-emerald-300 text-lg">
                        احتياجاتك اليومية
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                          <div className="text-2xl font-bold text-emerald-600">{dailyGoal.calories}</div>
                          <div className="text-sm text-gray-600">سعرة حرارية</div>
                        </div>
                        <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">{dailyGoal.protein}</div>
                          <div className="text-sm text-gray-600">جرام بروتين</div>
                        </div>
                        <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                          <div className="text-2xl font-bold text-orange-600">{dailyGoal.carbs}</div>
                          <div className="text-sm text-gray-600">جرام كربوهيدرات</div>
                        </div>
                        <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                          <div className="text-2xl font-bold text-yellow-600">{dailyGoal.fats}</div>
                          <div className="text-sm text-gray-600">جرام دهون</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Design Your Life Tab */}
            <TabsContent value="design">
              <DesignYourLife />
            </TabsContent>
          </Tabs>

          {/* Navigation */}
          <div className="mt-8 text-center">
            <Button 
              onClick={() => setLocation("/")}
              variant="outline"
              className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-300 dark:hover:bg-emerald-900/20"
            >
              <ArrowLeft className="ml-2 h-5 w-5" />
              العودة للصفحة الرئيسية
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}