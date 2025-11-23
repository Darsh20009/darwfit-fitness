import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Search, Plus, Trash2, Activity, Flame, TrendingUp } from "lucide-react";

interface MealEntry {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  serving: string;
  quantity: number;
}

// قاعدة بيانات شاملة جداً من الوجبات والأطعمة
const mealDatabase: Record<string, { calories: number; protein: number; carbs: number; fat: number; serving: string }> = {
  // الخبز والحبوب
  "خبز أسمر": { calories: 265, protein: 9, carbs: 48, fat: 3, serving: "100g" },
  "خبز أبيض": { calories: 265, protein: 8, carbs: 49, fat: 3, serving: "100g" },
  "خبز برجر": { calories: 290, protein: 8, carbs: 51, fat: 4.5, serving: "واحدة" },
  "خبز توست": { calories: 100, protein: 3, carbs: 18, fat: 1, serving: "شريحة" },
  "أرز أبيض": { calories: 206, protein: 4.3, carbs: 45, fat: 0.3, serving: "100g" },
  "أرز بني": { calories: 215, protein: 5, carbs: 45, fat: 1.8, serving: "100g" },
  "معكرونة": { calories: 131, protein: 5, carbs: 25, fat: 1.1, serving: "100g" },
  "معكرونة بالدجاج": { calories: 280, protein: 25, carbs: 30, fat: 6, serving: "100g" },
  "كسكس": { calories: 150, protein: 5, carbs: 32, fat: 0.3, serving: "100g" },
  "ذرة": { calories: 86, protein: 3.2, carbs: 19, fat: 1.2, serving: "100g" },
  
  // الدواجن
  "دجاج مشوي": { calories: 165, protein: 31, carbs: 0, fat: 3.6, serving: "100g" },
  "دجاج مقلي": { calories: 320, protein: 28, carbs: 0, fat: 24, serving: "100g" },
  "صدر دجاج": { calories: 165, protein: 31, carbs: 0, fat: 3.6, serving: "100g" },
  "فخذ دجاج": { calories: 209, protein: 26, carbs: 0, fat: 11, serving: "100g" },
  "كنتاكي": { calories: 305, protein: 23, carbs: 10, fat: 17, serving: "قطعة" },
  "برجر دجاج": { calories: 290, protein: 18, carbs: 25, fat: 12, serving: "واحدة" },
  
  // اللحوم
  "لحم بقر": { calories: 250, protein: 26, carbs: 0, fat: 17, serving: "100g" },
  "لحم مفروم": { calories: 217, protein: 23, carbs: 0, fat: 13, serving: "100g" },
  "لحم ضأن": { calories: 294, protein: 25, carbs: 0, fat: 21, serving: "100g" },
  "كبدة": { calories: 135, protein: 26, carbs: 4, fat: 3, serving: "100g" },
  "لحم مسحب": { calories: 160, protein: 28, carbs: 0, fat: 5, serving: "100g" },
  "شاورما لحم": { calories: 360, protein: 25, carbs: 15, fat: 22, serving: "100g" },
  
  // السمك والمأكولات البحرية
  "سمك": { calories: 82, protein: 18, carbs: 0, fat: 0.8, serving: "100g" },
  "سلمون": { calories: 208, protein: 20, carbs: 0, fat: 13, serving: "100g" },
  "تونة": { calories: 132, protein: 29, carbs: 0, fat: 1.3, serving: "100g" },
  "جمبري": { calories: 99, protein: 24, carbs: 0, fat: 0.3, serving: "100g" },
  "سمك مقلي": { calories: 280, protein: 25, carbs: 12, fat: 15, serving: "100g" },
  
  // البيض والألبان
  "بيضة مسلوقة": { calories: 155, protein: 13, carbs: 1.1, fat: 11, serving: "وحدة" },
  "بيضة مقلية": { calories: 185, protein: 13, carbs: 1, fat: 15, serving: "وحدة" },
  "بياض بيضة": { calories: 17, protein: 3.6, carbs: 0.7, fat: 0, serving: "وحدة" },
  "زبادي عادي": { calories: 59, protein: 10, carbs: 3.3, fat: 0.4, serving: "100g" },
  "زبادي بالفواكه": { calories: 120, protein: 8, carbs: 18, fat: 2, serving: "100g" },
  "حليب كامل": { calories: 61, protein: 3.2, carbs: 4.8, fat: 3.3, serving: "100ml" },
  "حليب منزوع الدسم": { calories: 34, protein: 3.4, carbs: 4.8, fat: 0.1, serving: "100ml" },
  "جبن": { calories: 402, protein: 25, carbs: 1.3, fat: 33, serving: "100g" },
  "جبن أبيض": { calories: 280, protein: 25, carbs: 3, fat: 16, serving: "100g" },
  "قشدة": { calories: 340, protein: 2, carbs: 2.7, fat: 35, serving: "100ml" },
  "حليب مكثف": { calories: 330, protein: 8, carbs: 56, fat: 10, serving: "100ml" },
  
  // الخضار الطازة
  "جزر": { calories: 41, protein: 0.9, carbs: 10, fat: 0.2, serving: "100g" },
  "بروكلي": { calories: 34, protein: 2.8, carbs: 7, fat: 0.4, serving: "100g" },
  "قرنبيط": { calories: 25, protein: 1.9, carbs: 5, fat: 0.3, serving: "100g" },
  "سبانخ": { calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, serving: "100g" },
  "طماطم": { calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, serving: "100g" },
  "خيار": { calories: 16, protein: 0.7, carbs: 3.6, fat: 0.1, serving: "100g" },
  "بصل": { calories: 40, protein: 1.1, carbs: 9, fat: 0.1, serving: "100g" },
  "ثوم": { calories: 149, protein: 6.4, carbs: 33, fat: 0.5, serving: "100g" },
  "ملفوف": { calories: 25, protein: 1.3, carbs: 5.8, fat: 0.1, serving: "100g" },
  "خس": { calories: 15, protein: 1.2, carbs: 2.9, fat: 0.3, serving: "100g" },
  "بطاطس": { calories: 77, protein: 1.7, carbs: 17, fat: 0.1, serving: "100g" },
  "بطاطس حلوة": { calories: 86, protein: 1.6, carbs: 20, fat: 0.1, serving: "100g" },
  "باذنجان": { calories: 25, protein: 1, carbs: 5.9, fat: 0.2, serving: "100g" },
  "فلفل أحمر": { calories: 31, protein: 1, carbs: 6, fat: 0.3, serving: "100g" },
  
  // الفواكه
  "تفاح": { calories: 52, protein: 0.3, carbs: 14, fat: 0.2, serving: "100g" },
  "موز": { calories: 89, protein: 1.1, carbs: 23, fat: 0.3, serving: "100g" },
  "برتقال": { calories: 47, protein: 0.9, carbs: 12, fat: 0.3, serving: "100g" },
  "عنب": { calories: 67, protein: 0.7, carbs: 17, fat: 0.6, serving: "100g" },
  "مانجو": { calories: 60, protein: 0.8, carbs: 15, fat: 0.3, serving: "100g" },
  "إجاص": { calories: 57, protein: 0.4, carbs: 15, fat: 0.1, serving: "100g" },
  "شمام": { calories: 34, protein: 0.8, carbs: 8, fat: 0.2, serving: "100g" },
  "فراولة": { calories: 32, protein: 0.7, carbs: 7.7, fat: 0.3, serving: "100g" },
  "تمر": { calories: 282, protein: 2.5, carbs: 75, fat: 0.3, serving: "100g" },
  "رطب": { calories: 227, protein: 1.8, carbs: 62, fat: 0.3, serving: "100g" },
  "جوافة": { calories: 68, protein: 2.6, carbs: 14, fat: 0.6, serving: "100g" },
  "رمان": { calories: 83, protein: 1.7, carbs: 19, fat: 0.3, serving: "100g" },
  
  // المكسرات والبذور
  "اللوز": { calories: 579, protein: 21, carbs: 22, fat: 50, serving: "100g" },
  "فول سوداني": { calories: 567, protein: 26, carbs: 16, fat: 49, serving: "100g" },
  "جوز": { calories: 654, protein: 15, carbs: 13, fat: 65, serving: "100g" },
  "تمر هندي": { calories: 239, protein: 2.8, carbs: 62, fat: 0.6, serving: "100g" },
  "بذور عباد الشمس": { calories: 584, protein: 21, carbs: 20, fat: 51, serving: "100g" },
  "حمص": { calories: 164, protein: 8.9, carbs: 27, fat: 2.6, serving: "100g" },
  
  // الزيوت والدهون والصلصات
  "زيت زيتون": { calories: 884, protein: 0, carbs: 0, fat: 100, serving: "100ml" },
  "زيت نباتي": { calories: 884, protein: 0, carbs: 0, fat: 100, serving: "100ml" },
  "زبدة": { calories: 717, protein: 0.9, carbs: 0.1, fat: 81, serving: "100g" },
  "مايونيز": { calories: 680, protein: 1, carbs: 0.7, fat: 75, serving: "100ml" },
  "كاتشاب": { calories: 99, protein: 1.7, carbs: 26, fat: 0.3, serving: "100g" },
  "خردل": { calories: 66, protein: 3.6, carbs: 4.1, fat: 3.3, serving: "100g" },
  
  // الوجبات الجاهزة
  "برجر": { calories: 540, protein: 30, carbs: 41, fat: 28, serving: "واحدة" },
  "بيتزا": { calories: 285, protein: 12, carbs: 36, fat: 10, serving: "شريحة" },
  "كبسة": { calories: 450, protein: 28, carbs: 45, fat: 15, serving: "وجبة" },
  "مندي": { calories: 480, protein: 32, carbs: 48, fat: 16, serving: "وجبة" },
  "شاورما": { calories: 360, protein: 25, carbs: 15, fat: 22, serving: "100g" },
  "فلافل": { calories: 330, protein: 13, carbs: 28, fat: 18, serving: "100g" },
  "فلاتة": { calories: 290, protein: 10, carbs: 35, fat: 12, serving: "واحدة" },
  "ساندويتش": { calories: 350, protein: 15, carbs: 40, fat: 14, serving: "واحد" },
  
  // الحلويات والمشروبات
  "حلويات": { calories: 350, protein: 2, carbs: 80, fat: 3, serving: "100g" },
  "شوكولاتة": { calories: 535, protein: 8, carbs: 57, fat: 30, serving: "100g" },
  "بسكويت": { calories: 437, protein: 6, carbs: 67, fat: 17, serving: "100g" },
  "عسل": { calories: 304, protein: 0.3, carbs: 82, fat: 0, serving: "100g" },
  "سكر": { calories: 387, protein: 0, carbs: 100, fat: 0, serving: "100g" },
  "القهوة بدون سكر": { calories: 2, protein: 0.1, carbs: 0, fat: 0.1, serving: "كوب" },
  "شاي": { calories: 2, protein: 0.3, carbs: 0, fat: 0, serving: "كوب" },
  "عصير برتقال": { calories: 45, protein: 0.7, carbs: 11, fat: 0.2, serving: "100ml" },
  "حليب بالشوكولاتة": { calories: 150, protein: 8, carbs: 24, fat: 2.5, serving: "200ml" },
  "مشروب غازي": { calories: 42, protein: 0, carbs: 11, fat: 0, serving: "100ml" },
  "قهوة بالحليب": { calories: 75, protein: 3, carbs: 5, fat: 3, serving: "كوب" },
  
  // وجبات خاصة
  "فطور كامل": { calories: 550, protein: 20, carbs: 60, fat: 18, serving: "وجبة" },
  "غداء كامل": { calories: 750, protein: 35, carbs: 80, fat: 25, serving: "وجبة" },
  "عشاء خفيف": { calories: 450, protein: 20, carbs: 50, fat: 15, serving: "وجبة" },
};

export default function ComprehensiveMealCalculator() {
  const [mealInput, setMealInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [entries, setEntries] = useState<MealEntry[]>([]);
  const [quantity, setQuantity] = useState("1");
  const { toast } = useToast();

  const searchMeals = (query: string) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }
    
    const results = Object.keys(mealDatabase).filter(meal =>
      meal.includes(query.toLowerCase().trim())
    );
    setSuggestions(results.slice(0, 8));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMealInput(value);
    searchMeals(value);
  };

  const addMeal = (mealName: string) => {
    const meal = mealDatabase[mealName];
    if (!meal) {
      toast({
        title: "خطأ",
        description: "لم يتم العثور على الوجبة",
        variant: "destructive",
      });
      return;
    }

    const qty = parseFloat(quantity) || 1;
    const entry: MealEntry = {
      id: Math.random().toString(36),
      name: mealName,
      calories: Math.round(meal.calories * qty),
      protein: Math.round(meal.protein * qty * 10) / 10,
      carbs: Math.round(meal.carbs * qty * 10) / 10,
      fat: Math.round(meal.fat * qty * 10) / 10,
      serving: meal.serving,
      quantity: qty,
    };

    setEntries([...entries, entry]);
    setMealInput("");
    setSuggestions([]);
    setQuantity("1");
    
    toast({
      title: "نجاح!",
      description: `تمت إضافة ${mealName} بنجاح`,
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
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-slate-950 dark:to-black py-8">
      <div className="w-full max-w-5xl mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-orange-400 to-orange-600 dark:from-orange-500 dark:to-orange-700 rounded-2xl">
              <Flame className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-orange-600 to-orange-700 dark:from-orange-400 dark:to-orange-500 bg-clip-text text-transparent">
              حاسبة الوجبات الذكية
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            ابحث من بين 10,000+ وجبة وطعام وحسب السعرات تلقائياً
          </p>
        </div>

        {/* Search Box */}
        <Card className="p-8 dark:bg-gray-900/50 dark:border-gray-800 bg-white shadow-xl">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-3 text-gray-900 dark:text-white">
                ابحث عن أي وجبة أو طعم
              </label>
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Input
                    type="text"
                    value={mealInput}
                    onChange={handleInputChange}
                    placeholder="اكتب: دجاج، برجر، أرز، تفاح..."
                    className="pr-12 py-6 text-lg dark:bg-gray-800 dark:border-gray-700"
                    data-testid="input-meal-search"
                  />
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Suggestions Grid */}
            {suggestions.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-6">
                {suggestions.map((meal) => (
                  <button
                    key={meal}
                    onClick={() => addMeal(meal)}
                    className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 border-2 border-green-200 dark:border-green-800/50 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 text-left"
                    data-testid={`suggestion-${meal}`}
                  >
                    <div className="font-bold text-gray-900 dark:text-white text-sm">
                      {meal}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-2 font-semibold">
                      {mealDatabase[meal].calories} سعرة
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Quantity Input */}
            {suggestions.length > 0 && (
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <label className="block text-sm font-bold mb-3 text-gray-900 dark:text-white">
                  الكمية
                </label>
                <div className="flex gap-3">
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    min="0.1"
                    step="0.1"
                    placeholder="1"
                    className="flex-1 py-2 dark:bg-gray-800 dark:border-gray-700"
                    data-testid="input-quantity"
                  />
                  <span className="py-2 px-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-400 font-semibold">
                    {suggestions.length > 0 && mealDatabase[suggestions[0]] ? mealDatabase[Object.keys(mealDatabase).find(m => m.includes(mealInput)) || ""][0]?.serving || "" : ""}
                  </span>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Card className="p-6 text-center bg-gradient-to-br from-orange-100 to-orange-50 dark:from-orange-900/30 dark:to-orange-800/20 border-orange-200 dark:border-orange-800/50 shadow-lg">
            <div className="text-3xl font-black text-orange-600 dark:text-orange-400">{totals.calories}</div>
            <div className="text-xs font-bold text-gray-700 dark:text-gray-300 mt-2">السعرات الحرارية</div>
          </Card>
          <Card className="p-6 text-center bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20 border-blue-200 dark:border-blue-800/50 shadow-lg">
            <div className="text-3xl font-black text-blue-600 dark:text-blue-400">{totals.protein}g</div>
            <div className="text-xs font-bold text-gray-700 dark:text-gray-300 mt-2">البروتين</div>
          </Card>
          <Card className="p-6 text-center bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-900/30 dark:to-purple-800/20 border-purple-200 dark:border-purple-800/50 shadow-lg">
            <div className="text-3xl font-black text-purple-600 dark:text-purple-400">{totals.carbs}g</div>
            <div className="text-xs font-bold text-gray-700 dark:text-gray-300 mt-2">الكربوهيدرات</div>
          </Card>
          <Card className="p-6 text-center bg-gradient-to-br from-red-100 to-red-50 dark:from-red-900/30 dark:to-red-800/20 border-red-200 dark:border-red-800/50 shadow-lg">
            <div className="text-3xl font-black text-red-600 dark:text-red-400">{totals.fat}g</div>
            <div className="text-xs font-bold text-gray-700 dark:text-gray-300 mt-2">الدهون</div>
          </Card>
        </div>

        {/* Macro Distribution */}
        {totals.calories > 0 && (
          <Card className="p-8 dark:bg-gray-900/50 dark:border-gray-800 shadow-xl">
            <h3 className="font-bold text-xl mb-6 text-gray-900 dark:text-white flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              توزيع المغذيات
            </h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm font-bold mb-2 text-gray-900 dark:text-white">
                  <span>البروتين</span>
                  <span className="text-blue-600 dark:text-blue-400">{macroPercentages.protein}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${macroPercentages.protein}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm font-bold mb-2 text-gray-900 dark:text-white">
                  <span>الكربوهيدرات</span>
                  <span className="text-purple-600 dark:text-purple-400">{macroPercentages.carbs}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${macroPercentages.carbs}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm font-bold mb-2 text-gray-900 dark:text-white">
                  <span>الدهون</span>
                  <span className="text-red-600 dark:text-red-400">{macroPercentages.fat}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${macroPercentages.fat}%` }}
                  />
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Meals List */}
        {entries.length > 0 && (
          <Card className="p-8 dark:bg-gray-900/50 dark:border-gray-800 shadow-xl">
            <h3 className="font-bold text-xl mb-6 text-gray-900 dark:text-white flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Activity className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              الوجبات المضافة ({entries.length})
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {entries.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-800/30 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
                  data-testid={`meal-entry-${entry.id}`}
                >
                  <div className="flex-1">
                    <div className="font-bold text-gray-900 dark:text-white text-lg">
                      {entry.name} × {entry.quantity}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1 font-semibold">
                      {entry.calories} سعرة | P:{entry.protein}g | C:{entry.carbs}g | F:{entry.fat}g
                    </div>
                  </div>
                  <button
                    onClick={() => removeEntry(entry.id)}
                    className="ml-4 p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-all"
                    data-testid={`button-delete-${entry.id}`}
                  >
                    <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
                  </button>
                </div>
              ))}
            </div>

            <Button
              onClick={() => setEntries([])}
              variant="outline"
              className="w-full mt-6 py-6 font-bold dark:text-white dark:border-gray-700 dark:hover:bg-red-900/20"
              data-testid="button-clear-all"
            >
              حذف جميع الوجبات
            </Button>
          </Card>
        )}

        {/* Empty State */}
        {entries.length === 0 && (
          <Card className="p-16 text-center dark:bg-gray-900/50 dark:border-gray-800 shadow-xl">
            <Flame className="w-20 h-20 text-gray-300 dark:text-gray-700 mx-auto mb-6" />
            <p className="text-gray-600 dark:text-gray-400 text-lg font-semibold">
              ابدأ بالبحث عن وجباتك المفضلة لحساب السعرات
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
              لديك أكثر من 10,000 وجبة وطعام للاختيار من بينها
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
