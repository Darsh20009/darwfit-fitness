import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calculator, 
  PlusCircle, 
  Apple, 
  Utensils, 
  ChevronDown, 
  ChevronUp, 
  Search,
  Check,
  Trash2,
  Info
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Food database with calories, protein and carbs
const foodCategories = {
  "المطبخ المصري": {
    "كشري": {calories: 350, protein: 8, carbs: 60},
    "فول مدمس": {calories: 132, protein: 7, carbs: 19},
    "طعمية": {calories: 290, protein: 13, carbs: 25},
    "ملوخية": {calories: 95, protein: 6, carbs: 10},
    "بامية": {calories: 85, protein: 5, carbs: 9},
    "مسقعة": {calories: 140, protein: 9, carbs: 12},
    "محشي كرنب": {calories: 165, protein: 7, carbs: 15},
    "رز بالخلطة": {calories: 180, protein: 5, carbs: 35},
    "كبدة اسكندراني": {calories: 180, protein: 25, carbs: 5},
    "حمام محشي": {calories: 300, protein: 28, carbs: 20},
    "رقاق باللحمة": {calories: 385, protein: 22, carbs: 30},
    "سلطة بلدي": {calories: 50, protein: 2, carbs: 8},
    "بابا غنوج": {calories: 70, protein: 3, carbs: 6},
    "طحينة": {calories: 90, protein: 3, carbs: 5},
    "مخلل": {calories: 15, protein: 0, carbs: 3},
    "كوارع": {calories: 400, protein: 35, carbs: 10},
    "ممبار": {calories: 350, protein: 30, carbs: 8},
    "حواوشي": {calories: 280, protein: 18, carbs: 25},
    "فتة": {calories: 450, protein: 15, carbs: 40},
    "كبدة": {calories: 220, protein: 30, carbs: 5}
  },
  "المطبخ السعودي والخليجي": {
    "كبسة لحم": {calories: 320, protein: 25, carbs: 30},
    "مندي دجاج": {calories: 280, protein: 30, carbs: 25},
    "مطبق": {calories: 310, protein: 12, carbs: 35},
    "جريش": {calories: 220, protein: 8, carbs: 30},
    "مرقوق": {calories: 245, protein: 15, carbs: 25},
    "مضغوط": {calories: 290, protein: 22, carbs: 20},
    "معصوب": {calories: 270, protein: 6, carbs: 45},
    "شاكرية": {calories: 190, protein: 5, carbs: 35},
    "مجبوس": {calories: 315, protein: 20, carbs: 30},
    "صالونة": {calories: 225, protein: 18, carbs: 15},
    "تبولة": {calories: 100, protein: 3, carbs: 15},
    "حمص بالطحينة": {calories: 150, protein: 5, carbs: 12},
    "لبنة بالنعناع": {calories: 120, protein: 5, carbs: 8},
    "سليق": {calories: 300, protein: 10, carbs: 40},
    "مفطح": {calories: 500, protein: 40, carbs: 30},
    "قرصان": {calories: 350, protein: 25, carbs: 25},
    "مراصيع": {calories: 280, protein: 18, carbs: 20},
    "فتة تمر": {calories: 200, protein: 3, carbs: 45}
  },
  "المطبخ الشامي": {
    "فتوش": {calories: 120, protein: 3, carbs: 15},
    "تبولة": {calories: 100, protein: 3, carbs: 18},
    "كبة مقلية": {calories: 260, protein: 12, carbs: 20},
    "كبة بالصينية": {calories: 300, protein: 14, carbs: 25},
    "شيش طاووق": {calories: 220, protein: 30, carbs: 5}, 
    "كباب حلبي": {calories: 290, protein: 28, carbs: 6},
    "محشي كوسا": {calories: 190, protein: 7, carbs: 18},
    "مقلوبة": {calories: 280, protein: 10, carbs: 35},
    "يالنجي": {calories: 160, protein: 4, carbs: 22},
    "شاورما دجاج": {calories: 320, protein: 27, carbs: 15},
    "شاورما لحم": {calories: 350, protein: 30, carbs: 12},
    "ورق عنب": {calories: 140, protein: 3, carbs: 20},
    "بابا غنوج": {calories: 80, protein: 3, carbs: 10},
    "حمص باللحمة": {calories: 250, protein: 15, carbs: 18},
    "منسف": {calories: 420, protein: 30, carbs: 35}
  },
  "أطعمة أساسية": {
    "أرز أبيض": {calories: 130, protein: 2.7, carbs: 28},
    "دجاج (صدر)": {calories: 165, protein: 31, carbs: 0},
    "تفاح": {calories: 52, protein: 0.3, carbs: 14},
    "بيض مسلوق": {calories: 78, protein: 6.3, carbs: 0.6},
    "موز": {calories: 89, protein: 1.1, carbs: 23},
    "خبز أسمر": {calories: 67, protein: 3.5, carbs: 12.5},
    "لبن زبادي": {calories: 59, protein: 3.5, carbs: 4.7},
    "سلمون": {calories: 208, protein: 20, carbs: 0},
    "حليب": {calories: 42, protein: 3.4, carbs: 5},
    "فول": {calories: 110, protein: 7.6, carbs: 16},
    "مكرونة": {calories: 131, protein: 5, carbs: 25},
    "لوز": {calories: 165, protein: 6, carbs: 6}
  }
};

// Convert the nested structure to a flat list for the existing UI
// Define type for our food items
interface FoodItem {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  category: string;
}

const foodDatabase: FoodItem[] = [];
// Type assertion for foodCategories
const typedFoodCategories = foodCategories as {
  [category: string]: {
    [name: string]: { calories: number; protein: number; carbs: number }
  }
};

// Populate the food database
for (const category in typedFoodCategories) {
  for (const name in typedFoodCategories[category]) {
    const food = typedFoodCategories[category][name];
    foodDatabase.push({
      name: name,
      calories: food.calories,
      protein: food.protein,
      carbs: food.carbs,
      category: category
    });
  }
}

// Food weight equivalents
const unitToGramEquivalents: Record<string, number> = {
  'tablespoon': 15,
  'gram': 1,
  'serving': 100,
  'cup': 240,
  'other': 1
};

interface DailyGoal {
  calories: number;
  protein: number;
  carbs: number;
}

interface HistoryItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  timestamp: Date;
  category: string;
  quantity: number;
  unit: string;
}

export default function CaloriesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedFood, setSelectedFood] = useState<string>("");
  const [selectedFoodData, setSelectedFoodData] = useState<any>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [unit, setUnit] = useState<string>("gram");
  const [calculatedCalories, setCalculatedCalories] = useState<number>(0);
  const [calculatedProtein, setCalculatedProtein] = useState<number>(0);
  const [calculatedCarbs, setCalculatedCarbs] = useState<number>(0);
  const [customFoodMode, setCustomFoodMode] = useState<boolean>(false);
  const [customFoodName, setCustomFoodName] = useState<string>("");
  const [customFoodCalories, setCustomFoodCalories] = useState<number>(0);
  const [customFoodProtein, setCustomFoodProtein] = useState<number>(0);
  const [customFoodCarbs, setCustomFoodCarbs] = useState<number>(0);
  const [dailyHistory, setDailyHistory] = useState<HistoryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = useState<boolean>(false);
  const [dailyGoal, setDailyGoal] = useState<DailyGoal>({ calories: 2000, protein: 150, carbs: 200 });
  const [selectedGoal, setSelectedGoal] = useState<string>("2000");
  
  // Get unique categories
  const categoriesSet = new Set();
  foodDatabase.forEach(food => categoriesSet.add(food.category));
  const categories = Array.from(categoriesSet) as string[];
  
  // Get filtered foods by category
  const getFoodsByCategory = (category: string) => {
    return foodDatabase.filter(food => food.category === category);
  };
  
  // Calculate current daily totals
  const dailyTotals = dailyHistory.reduce((acc, item) => {
    return {
      calories: acc.calories + item.calories,
      protein: acc.protein + item.protein,
      carbs: acc.carbs + item.carbs
    };
  }, { calories: 0, protein: 0, carbs: 0 });
  
  // Calculate progress percentages
  const caloriesPercentage = Math.min(100, (dailyTotals.calories / dailyGoal.calories) * 100);
  const proteinPercentage = Math.min(100, (dailyTotals.protein / dailyGoal.protein) * 100);
  const carbsPercentage = Math.min(100, (dailyTotals.carbs / dailyGoal.carbs) * 100);
  
  // Handle category change
  useEffect(() => {
    setSelectedFood("");
    setSelectedFoodData(null);
    resetCalculations();
  }, [selectedCategory]);
  
  // Handle food selection
  useEffect(() => {
    if (selectedFood && !customFoodMode) {
      const foodData = foodDatabase.find(food => food.name === selectedFood);
      setSelectedFoodData(foodData);
      calculateNutrition(foodData);
    } else {
      setSelectedFoodData(null);
      resetCalculations();
    }
  }, [selectedFood, quantity, unit]);
  
  // Handle search query
  useEffect(() => {
    if (searchQuery.length >= 2) {
      const results = foodDatabase.filter(food => 
        food.name.includes(searchQuery)
      );
      setSearchResults(results);
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  }, [searchQuery]);
  
  // Calculate nutrition based on selected food and quantity
  const calculateNutrition = (foodData: any) => {
    if (!foodData) return;
    
    const weightInGrams = quantity * unitToGramEquivalents[unit];
    const scaleFactor = weightInGrams / 100; // Per 100g
    
    setCalculatedCalories(Math.round(foodData.calories * scaleFactor));
    setCalculatedProtein(Math.round(foodData.protein * scaleFactor * 10) / 10);
    setCalculatedCarbs(Math.round(foodData.carbs * scaleFactor * 10) / 10);
  };
  
  // Reset all calculation fields
  const resetCalculations = () => {
    setCalculatedCalories(0);
    setCalculatedProtein(0);
    setCalculatedCarbs(0);
  };
  
  // Handle custom food calculation
  useEffect(() => {
    if (customFoodMode) {
      const weightInGrams = quantity * unitToGramEquivalents[unit];
      const scaleFactor = weightInGrams / 100; // Per 100g
      
      setCalculatedCalories(Math.round(customFoodCalories * scaleFactor));
      setCalculatedProtein(Math.round(customFoodProtein * scaleFactor * 10) / 10);
      setCalculatedCarbs(Math.round(customFoodCarbs * scaleFactor * 10) / 10);
    }
  }, [customFoodMode, customFoodCalories, customFoodProtein, customFoodCarbs, quantity, unit]);
  
  // Add food to daily history
  const addToHistory = () => {
    let newItem: HistoryItem;
    
    if (customFoodMode) {
      if (!customFoodName) {
        alert("الرجاء إدخال اسم الطعام");
        return;
      }
      
      newItem = {
        id: Date.now().toString(),
        name: customFoodName,
        calories: calculatedCalories,
        protein: calculatedProtein,
        carbs: calculatedCarbs,
        timestamp: new Date(),
        category: "مخصص",
        quantity: quantity,
        unit: unit
      };
    } else {
      if (!selectedFoodData) {
        alert("الرجاء اختيار طعام");
        return;
      }
      
      newItem = {
        id: Date.now().toString(),
        name: selectedFoodData.name,
        calories: calculatedCalories,
        protein: calculatedProtein,
        carbs: calculatedCarbs,
        timestamp: new Date(),
        category: selectedFoodData.category,
        quantity: quantity,
        unit: unit
      };
    }
    
    setDailyHistory([...dailyHistory, newItem]);
    
    // Reset form
    setSelectedCategory("");
    setSelectedFood("");
    setCustomFoodMode(false);
    setCustomFoodName("");
    setCustomFoodCalories(0);
    setCustomFoodProtein(0);
    setCustomFoodCarbs(0);
    setQuantity(1);
    resetCalculations();
  };
  
  // Remove item from history
  const removeFromHistory = (id: string) => {
    setDailyHistory(dailyHistory.filter(item => item.id !== id));
  };
  
  // Format units for display
  const formatUnit = (unit: string, quantity: number) => {
    switch(unit) {
      case 'tablespoon':
        return quantity === 1 ? 'ملعقة' : 'ملاعق';
      case 'gram':
        return 'جرام';
      case 'serving':
        return quantity === 1 ? 'حصة' : 'حصص';
      case 'cup':
        return quantity === 1 ? 'كوب' : 'أكواب';
      default:
        return unit;
    }
  };
  
  // Handle goal selection
  const handleGoalChange = (value: string) => {
    setSelectedGoal(value);
    
    switch(value) {
      case "1500":
        setDailyGoal({ calories: 1500, protein: 120, carbs: 170 });
        break;
      case "2000":
        setDailyGoal({ calories: 2000, protein: 150, carbs: 200 });
        break;
      case "2500":
        setDailyGoal({ calories: 2500, protein: 180, carbs: 280 });
        break;
      case "3000":
        setDailyGoal({ calories: 3000, protein: 220, carbs: 350 });
        break;
      default:
        setDailyGoal({ calories: 2000, protein: 150, carbs: 200 });
    }
  };
  
  // Select food from search results
  const selectFromSearch = (food: any) => {
    setSelectedCategory(food.category);
    setSelectedFood(food.name);
    setSelectedFoodData(food);
    calculateNutrition(food);
    setShowSearchResults(false);
    setSearchQuery("");
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-8 flex items-center justify-center">
        <Calculator className="ml-2 h-6 w-6 text-primary" />
        حاسبة السعرات الحرارية
      </h1>
      
      <Tabs defaultValue="calculator" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="calculator" className="text-sm md:text-base">
            <Calculator className="ml-2 h-4 w-4" />
            الحاسبة
          </TabsTrigger>
          <TabsTrigger value="history" className="text-sm md:text-base">
            <Utensils className="ml-2 h-4 w-4" />
            سجل اليوم
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="calculator">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Apple className="ml-2 h-5 w-5 text-primary" />
                  إضافة طعام جديد
                </CardTitle>
                <CardDescription>
                  ابحث عن الطعام أو أدخل قيمه الغذائية يدوياً
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Search */}
                <div className="relative">
                  <Input
                    placeholder="ابحث عن طعام..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                  <Search className="absolute right-3 top-2.5 h-4 w-4 text-neutral-400" />
                  
                  {showSearchResults && searchResults.length > 0 && (
                    <div className="absolute w-full z-10 mt-1 bg-white dark:bg-neutral-800 rounded-md shadow-lg max-h-60 overflow-auto">
                      {searchResults.map((food, index) => (
                        <div 
                          key={index}
                          className="px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
                          onClick={() => selectFromSearch(food)}
                        >
                          <div className="font-medium">{food.name}</div>
                          <div className="text-xs text-neutral-500 dark:text-neutral-400">
                            {food.calories} سعرة | {food.protein}ج بروتين | {food.carbs}ج كربوهيدرات
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {showSearchResults && searchResults.length === 0 && searchQuery.length >= 2 && (
                    <div className="absolute w-full z-10 mt-1 bg-white dark:bg-neutral-800 rounded-md shadow-lg p-4 text-center">
                      لا توجد نتائج. جرب إضافة طعام مخصص.
                    </div>
                  )}
                </div>
                
                {/* Category and Food Selection */}
                {!customFoodMode && (
                  <>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر تصنيف الطعام" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    {selectedCategory && (
                      <Select value={selectedFood} onValueChange={setSelectedFood}>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الطعام" />
                        </SelectTrigger>
                        <SelectContent>
                          {getFoodsByCategory(selectedCategory).map((food) => (
                            <SelectItem key={food.name} value={food.name}>
                              {food.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </>
                )}
                
                {/* Custom Food Inputs */}
                {customFoodMode && (
                  <div className="space-y-3 p-3 border rounded-md bg-neutral-50 dark:bg-neutral-800">
                    <h3 className="font-medium text-primary">إضافة طعام مخصص</h3>
                    <Input
                      placeholder="اسم الطعام"
                      value={customFoodName}
                      onChange={(e) => setCustomFoodName(e.target.value)}
                    />
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="text-xs block mb-1">السعرات</label>
                        <Input
                          type="number"
                          placeholder="السعرات"
                          value={customFoodCalories || ""}
                          onChange={(e) => setCustomFoodCalories(Number(e.target.value))}
                        />
                      </div>
                      <div>
                        <label className="text-xs block mb-1">البروتين</label>
                        <Input
                          type="number"
                          placeholder="البروتين"
                          value={customFoodProtein || ""}
                          onChange={(e) => setCustomFoodProtein(Number(e.target.value))}
                        />
                      </div>
                      <div>
                        <label className="text-xs block mb-1">الكربوهيدرات</label>
                        <Input
                          type="number"
                          placeholder="الكربوهيدرات"
                          value={customFoodCarbs || ""}
                          onChange={(e) => setCustomFoodCarbs(Number(e.target.value))}
                        />
                      </div>
                    </div>
                    <p className="text-xs text-neutral-500">جميع القيم لكل 100 جرام</p>
                  </div>
                )}
                
                {/* Quantity Input */}
                <div className="grid grid-cols-2 gap-3">
                  <Select value={unit} onValueChange={setUnit}>
                    <SelectTrigger>
                      <SelectValue placeholder="الوحدة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gram">جرام</SelectItem>
                      <SelectItem value="tablespoon">ملعقة</SelectItem>
                      <SelectItem value="cup">كوب</SelectItem>
                      <SelectItem value="serving">حصة</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Input
                    type="number"
                    placeholder="الكمية"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    min={0}
                    step={0.25}
                  />
                </div>
                
                {/* Results */}
                <div className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-md space-y-2">
                  <div className="flex justify-between">
                    <span>السعرات الحرارية:</span>
                    <span className="font-bold text-primary">{calculatedCalories} سعرة</span>
                  </div>
                  <div className="flex justify-between">
                    <span>البروتين:</span>
                    <span className="font-bold text-green-600">{calculatedProtein} جرام</span>
                  </div>
                  <div className="flex justify-between">
                    <span>الكربوهيدرات:</span>
                    <span className="font-bold text-amber-600">{calculatedCarbs} جرام</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    onClick={addToHistory} 
                    className="w-full bg-primary" 
                    disabled={
                      (customFoodMode && (!customFoodName || !customFoodCalories)) ||
                      (!customFoodMode && !selectedFoodData) ||
                      quantity <= 0
                    }
                  >
                    <PlusCircle className="ml-2 h-4 w-4" />
                    إضافة للسجل
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="flex-none"
                    onClick={() => setCustomFoodMode(!customFoodMode)}
                  >
                    {customFoodMode ? "العودة" : "طعام مخصص"}
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Info className="ml-2 h-5 w-5 text-secondary" />
                  ملخص اليوم
                </CardTitle>
                <CardDescription>
                  إحصائيات استهلاكك اليومي والأهداف
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <Select value={selectedGoal} onValueChange={handleGoalChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر هدفك" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1500">خسارة وزن (1500 سعرة)</SelectItem>
                    <SelectItem value="2000">الحفاظ على الوزن (2000 سعرة)</SelectItem>
                    <SelectItem value="2500">زيادة وزن خفيفة (2500 سعرة)</SelectItem>
                    <SelectItem value="3000">زيادة وزن كبيرة (3000 سعرة)</SelectItem>
                  </SelectContent>
                </Select>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">السعرات الحرارية</span>
                    <span className="text-sm">{dailyTotals.calories} / {dailyGoal.calories}</span>
                  </div>
                  <Progress value={caloriesPercentage} className="h-2.5 mb-3" />
                  
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">البروتين</span>
                    <span className="text-sm">{dailyTotals.protein.toFixed(1)} / {dailyGoal.protein} جرام</span>
                  </div>
                  <Progress value={proteinPercentage} className="h-2.5 mb-3 bg-neutral-200 dark:bg-neutral-700">
                    <div 
                      className="h-full bg-green-600 transition-all" 
                      style={{ width: `${proteinPercentage}%` }}
                    />
                  </Progress>
                  
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">الكربوهيدرات</span>
                    <span className="text-sm">{dailyTotals.carbs.toFixed(1)} / {dailyGoal.carbs} جرام</span>
                  </div>
                  <Progress value={carbsPercentage} className="h-2.5 bg-neutral-200 dark:bg-neutral-700">
                    <div 
                      className="h-full bg-amber-500 transition-all" 
                      style={{ width: `${carbsPercentage}%` }}
                    />
                  </Progress>
                </div>
                
                <div className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-md">
                  <h3 className="font-medium mb-2">السعرات المتبقية</h3>
                  <div className="text-3xl font-bold text-primary">
                    {Math.max(0, dailyGoal.calories - dailyTotals.calories)}
                    <span className="text-base font-normal text-neutral-500 dark:text-neutral-400 mr-1">سعرة</span>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-green-600 font-medium">البروتين: </span>
                      <span>{Math.max(0, dailyGoal.protein - dailyTotals.protein).toFixed(1)} جرام</span>
                    </div>
                    <div>
                      <span className="text-amber-600 font-medium">الكربوهيدرات: </span>
                      <span>{Math.max(0, dailyGoal.carbs - dailyTotals.carbs).toFixed(1)} جرام</span>
                    </div>
                  </div>
                </div>
                
                {/* Status Message */}
                {dailyTotals.calories > 0 && (
                  <div className={`p-3 rounded-md ${
                    caloriesPercentage > 100
                      ? 'bg-red-50 text-red-600 dark:bg-red-900/10 dark:text-red-400'
                      : caloriesPercentage > 90
                      ? 'bg-amber-50 text-amber-600 dark:bg-amber-900/10 dark:text-amber-400'
                      : 'bg-green-50 text-green-600 dark:bg-green-900/10 dark:text-green-400'
                  }`}>
                    {caloriesPercentage > 100
                      ? 'تجاوزت هدفك اليومي من السعرات الحرارية'
                      : caloriesPercentage > 90
                      ? 'أنت قريب من تحقيق هدفك اليومي'
                      : caloriesPercentage > 50
                      ? 'أنت في المسار الصحيح لتحقيق هدفك'
                      : 'لديك سعرات حرارية كافية متبقية اليوم'
                    }
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Utensils className="ml-2 h-5 w-5 text-primary" />
                سجل اليوم
              </CardTitle>
              <CardDescription>
                جميع الأطعمة المسجلة اليوم
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {dailyHistory.length === 0 ? (
                <div className="text-center py-6 text-neutral-500 dark:text-neutral-400">
                  <Utensils className="h-12 w-12 mx-auto mb-3 opacity-20" />
                  <p>لم تقم بتسجيل أي أطعمة اليوم</p>
                  <p className="text-sm">استخدم الحاسبة لإضافة طعام</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {dailyHistory.map((item) => (
                    <div key={item.id} className="bg-neutral-50 dark:bg-neutral-800 rounded-md p-3 relative">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-neutral-500 dark:text-neutral-400">
                            {item.quantity} {formatUnit(item.unit, item.quantity)}
                          </div>
                          <Badge variant="outline" className="mt-1 text-xs">
                            {item.category}
                          </Badge>
                        </div>
                        
                        <div className="text-right">
                          <div className="font-medium text-primary">{item.calories} سعرة</div>
                          <div className="flex space-x-4 space-x-reverse text-xs mt-1">
                            <span className="text-green-600">{item.protein}ج بروتين</span>
                            <span className="text-amber-600">{item.carbs}ج كربوهيدرات</span>
                          </div>
                        </div>
                      </div>
                      
                      <button 
                        className="absolute top-2 left-2 text-red-500 hover:text-red-700"
                        onClick={() => removeFromHistory(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
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