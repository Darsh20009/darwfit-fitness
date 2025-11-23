import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Search, Plus, Trash2, Activity, Flame } from "lucide-react";

interface FoodEntry {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  servingSize: string;
  quantity: number;
}

// قاعدة بيانات الأطعمة الشاملة بالعربية
const foodDatabase: Record<string, { calories: number; protein: number; carbs: number; fat: number; serving: string }> = {
  // الخبز والحبوب
  "خبز أسمر": { calories: 265, protein: 9, carbs: 48, fat: 3, serving: "100g" },
  "خبز أبيض": { calories: 265, protein: 8, carbs: 49, fat: 3, serving: "100g" },
  "أرز": { calories: 206, protein: 4.3, carbs: 45, fat: 0.3, serving: "100g" },
  "معكرونة": { calories: 131, protein: 5, carbs: 25, fat: 1.1, serving: "100g" },
  
  // الدواجن
  "دجاج مشوي": { calories: 165, protein: 31, carbs: 0, fat: 3.6, serving: "100g" },
  "دجاج مقلي": { calories: 320, protein: 28, carbs: 0, fat: 24, serving: "100g" },
  "لحم دجاج": { calories: 165, protein: 31, carbs: 0, fat: 3.6, serving: "100g" },
  
  // اللحوم
  "لحم بقر": { calories: 250, protein: 26, carbs: 0, fat: 17, serving: "100g" },
  "لحم ضأن": { calories: 294, protein: 25, carbs: 0, fat: 21, serving: "100g" },
  "سمك": { calories: 82, protein: 18, carbs: 0, fat: 0.8, serving: "100g" },
  "سلمون": { calories: 208, protein: 20, carbs: 0, fat: 13, serving: "100g" },
  
  // البيض ومشتقاته
  "بيضة": { calories: 155, protein: 13, carbs: 1.1, fat: 11, serving: "وحدة" },
  "زبادي": { calories: 59, protein: 10, carbs: 3.3, fat: 0.4, serving: "100g" },
  "حليب": { calories: 61, protein: 3.2, carbs: 4.8, fat: 3.3, serving: "100ml" },
  "جبن": { calories: 402, protein: 25, carbs: 1.3, fat: 33, serving: "100g" },
  
  // الخضار
  "جزر": { calories: 41, protein: 0.9, carbs: 10, fat: 0.2, serving: "100g" },
  "بروكلي": { calories: 34, protein: 2.8, carbs: 7, fat: 0.4, serving: "100g" },
  "سبانخ": { calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, serving: "100g" },
  "طماطم": { calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, serving: "100g" },
  "خيار": { calories: 16, protein: 0.7, carbs: 3.6, fat: 0.1, serving: "100g" },
  "بصل": { calories: 40, protein: 1.1, carbs: 9, fat: 0.1, serving: "100g" },
  
  // الفواكه
  "تفاح": { calories: 52, protein: 0.3, carbs: 14, fat: 0.2, serving: "100g" },
  "موز": { calories: 89, protein: 1.1, carbs: 23, fat: 0.3, serving: "100g" },
  "برتقال": { calories: 47, protein: 0.9, carbs: 12, fat: 0.3, serving: "100g" },
  "عنب": { calories: 67, protein: 0.7, carbs: 17, fat: 0.6, serving: "100g" },
  "مانجو": { calories: 60, protein: 0.8, carbs: 15, fat: 0.3, serving: "100g" },
  "تمر": { calories: 282, protein: 2.5, carbs: 75, fat: 0.3, serving: "100g" },
  
  // المكسرات
  "اللوز": { calories: 579, protein: 21, carbs: 22, fat: 50, serving: "100g" },
  "تمر هندي": { calories: 239, protein: 2.8, carbs: 62, fat: 0.6, serving: "100g" },
  
  // الزيوت والدهون
  "زيت": { calories: 884, protein: 0, carbs: 0, fat: 100, serving: "100ml" },
  "زبدة": { calories: 717, protein: 0.9, carbs: 0.1, fat: 81, serving: "100g" },
};

export default function SmartCalorieCalculator() {
  const [foodInput, setFoodInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [entries, setEntries] = useState<FoodEntry[]>([]);
  const [quantity, setQuantity] = useState("1");
  const { toast } = useToast();

  const searchFoods = (query: string) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }
    
    const results = Object.keys(foodDatabase).filter(food =>
      food.includes(query.toLowerCase().trim())
    );
    setSuggestions(results.slice(0, 5));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFoodInput(value);
    searchFoods(value);
  };

  const addFood = (foodName: string) => {
    const food = foodDatabase[foodName];
    if (!food) {
      toast({
        title: "خطأ",
        description: "لم يتم العثور على الطعام",
        variant: "destructive",
      });
      return;
    }

    const qty = parseFloat(quantity) || 1;
    const entry: FoodEntry = {
      id: Math.random().toString(36),
      name: foodName,
      calories: Math.round(food.calories * qty),
      protein: Math.round(food.protein * qty * 10) / 10,
      carbs: Math.round(food.carbs * qty * 10) / 10,
      fat: Math.round(food.fat * qty * 10) / 10,
      servingSize: food.serving,
      quantity: qty,
    };

    setEntries([...entries, entry]);
    setFoodInput("");
    setSuggestions([]);
    setQuantity("1");
    
    toast({
      title: "تمت الإضافة",
      description: `تم إضافة ${foodName} بنجاح`,
    });
  };

  const removeEntry = (id: string) => {
    setEntries(entries.filter(e => e.id !== id));
  };

  const totals = {
    calories: Math.round(entries.reduce((sum, e) => sum + e.calories, 0)),
    protein: Math.round(entries.reduce((sum, e) => sum + e.protein, 0) * 10) / 10,
    carbs: Math.round(entries.reduce((sum, e) => sum + e.carbs, 0) * 10) / 10,
    fat: Math.round(entries.reduce((sum, e) => sum + e.fat, 0) * 10) / 10,
  };

  const macroPercentages = totals.calories > 0 ? {
    protein: Math.round((totals.protein * 4 / totals.calories) * 100),
    carbs: Math.round((totals.carbs * 4 / totals.calories) * 100),
    fat: Math.round((totals.fat * 9 / totals.calories) * 100),
  } : { protein: 0, carbs: 0, fat: 0 };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Flame className="w-8 h-8 text-orange-500" />
          <h1 className="text-3xl font-bold text-foreground">حاسبة السعرات الذكية</h1>
        </div>
        <p className="text-muted-foreground">ابحث عن أي طعم وسنحسب السعرات تلقائياً</p>
      </div>

      {/* Search Box */}
      <Card className="p-6 space-y-4">
        <div className="space-y-3">
          <label className="block text-sm font-medium text-foreground">
            البحث عن طعم
          </label>
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Input
                type="text"
                value={foodInput}
                onChange={handleInputChange}
                placeholder="ادخل اسم الطعم... (مثل: دجاج، أرز، تفاح)"
                className="pr-10"
                data-testid="input-food-search"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
          </div>

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {suggestions.map((food) => (
                <button
                  key={food}
                  onClick={() => addFood(food)}
                  className="text-left p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors"
                  data-testid={`suggestion-${food}`}
                >
                  <div className="font-medium text-foreground">{food}</div>
                  <div className="text-sm text-muted-foreground">
                    {foodDatabase[food].calories} سعرة حرارية
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Quantity Input */}
          {suggestions.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <label className="block text-xs font-medium mb-1 text-muted-foreground">
                  الكمية
                </label>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  min="0.1"
                  step="0.1"
                  placeholder="1"
                  data-testid="input-quantity"
                />
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="p-4 text-center bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800">
          <div className="text-2xl font-bold text-orange-600">{totals.calories}</div>
          <div className="text-xs text-muted-foreground mt-1">السعرات</div>
        </Card>
        <Card className="p-4 text-center bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <div className="text-2xl font-bold text-blue-600">{totals.protein}g</div>
          <div className="text-xs text-muted-foreground mt-1">البروتين</div>
        </Card>
        <Card className="p-4 text-center bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
          <div className="text-2xl font-bold text-purple-600">{totals.carbs}g</div>
          <div className="text-xs text-muted-foreground mt-1">الكربوهيدرات</div>
        </Card>
        <Card className="p-4 text-center bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
          <div className="text-2xl font-bold text-red-600">{totals.fat}g</div>
          <div className="text-xs text-muted-foreground mt-1">الدهون</div>
        </Card>
      </div>

      {/* Macro Distribution */}
      {totals.calories > 0 && (
        <Card className="p-6">
          <h3 className="font-semibold mb-4 text-foreground flex items-center gap-2">
            <Activity className="w-5 h-5 text-green-600" />
            توزيع المغذيات
          </h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>البروتين</span>
                <span className="font-medium">{macroPercentages.protein}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${macroPercentages.protein}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>الكربوهيدرات</span>
                <span className="font-medium">{macroPercentages.carbs}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-purple-500 h-2 rounded-full"
                  style={{ width: `${macroPercentages.carbs}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>الدهون</span>
                <span className="font-medium">{macroPercentages.fat}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full"
                  style={{ width: `${macroPercentages.fat}%` }}
                />
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Entries List */}
      {entries.length > 0 && (
        <Card className="p-6">
          <h3 className="font-semibold mb-4 text-foreground">الأطعمة المضافة</h3>
          <div className="space-y-3">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700"
                data-testid={`food-entry-${entry.id}`}
              >
                <div className="flex-1">
                  <div className="font-medium text-foreground">
                    {entry.name} × {entry.quantity}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {entry.calories} سعرة | P:{entry.protein}g C:{entry.carbs}g F:{entry.fat}g
                  </div>
                </div>
                <button
                  onClick={() => removeEntry(entry.id)}
                  className="ml-4 p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                  data-testid={`button-delete-${entry.id}`}
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            ))}
          </div>

          {/* Clear All Button */}
          <Button
            onClick={() => setEntries([])}
            variant="outline"
            className="w-full mt-4"
            data-testid="button-clear-all"
          >
            حذف الجميع
          </Button>
        </Card>
      )}

      {/* Empty State */}
      {entries.length === 0 && (
        <Card className="p-12 text-center">
          <Flame className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
          <p className="text-muted-foreground">ابدأ بالبحث عن أطعمتك لحساب السعرات</p>
        </Card>
      )}
    </div>
  );
}
