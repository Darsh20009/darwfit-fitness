import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Apple, Zap, Activity, Target } from "lucide-react";

export default function NutritionPlanPage() {
  const [goal, setGoal] = useState("");
  const [dailyCalories, setDailyCalories] = useState(2000);
  const [plan, setPlan] = useState<any>(null);

  const generatePlan = () => {
    const plans: Record<string, any> = {
      "weight-loss": {
        title: "خطة فقدان الوزن",
        calories: Math.round(dailyCalories * 0.8),
        protein: Math.round(dailyCalories * 0.3 / 4),
        carbs: Math.round(dailyCalories * 0.4 / 4),
        fat: Math.round(dailyCalories * 0.3 / 9),
        meals: [
          { name: "الإفطار", time: "7:00", calories: 300 },
          { name: "وجبة خفيفة", time: "10:00", calories: 150 },
          { name: "الغداء", time: "13:00", calories: 500 },
          { name: "وجبة خفيفة", time: "16:00", calories: 150 },
          { name: "العشاء", time: "19:00", calories: 400 }
        ]
      },
      "muscle-gain": {
        title: "خطة بناء العضلات",
        calories: Math.round(dailyCalories * 1.1),
        protein: Math.round(dailyCalories * 0.35 / 4),
        carbs: Math.round(dailyCalories * 0.45 / 4),
        fat: Math.round(dailyCalories * 0.2 / 9),
        meals: [
          { name: "الإفطار", time: "7:00", calories: 600 },
          { name: "وجبة خفيفة", time: "10:00", calories: 300 },
          { name: "الغداء", time: "13:00", calories: 800 },
          { name: "وجبة ما قبل التمرين", time: "16:00", calories: 400 },
          { name: "وجبة ما بعد التمرين", time: "18:00", calories: 400 },
          { name: "العشاء", time: "20:00", calories: 500 }
        ]
      },
      "balanced": {
        title: "خطة متوازنة",
        calories: dailyCalories,
        protein: Math.round(dailyCalories * 0.3 / 4),
        carbs: Math.round(dailyCalories * 0.45 / 4),
        fat: Math.round(dailyCalories * 0.25 / 9),
        meals: [
          { name: "الإفطار", time: "7:00", calories: 400 },
          { name: "وجبة خفيفة", time: "10:00", calories: 150 },
          { name: "الغداء", time: "13:00", calories: 600 },
          { name: "وجبة خفيفة", time: "16:00", calories: 150 },
          { name: "العشاء", time: "19:00", calories: 500 }
        ]
      }
    };
    setPlan(plans[goal]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <Apple className="w-10 h-10 text-green-600" />
            خطة التغذية الشخصية
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            حمل خطة تغذية مخصصة تناسب أهدافك الصحية
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {[
            { id: "weight-loss", label: "فقدان الوزن", icon: "📉" },
            { id: "muscle-gain", label: "بناء العضلات", icon: "💪" },
            { id: "balanced", label: "خطة متوازنة", icon: "⚖️" }
          ].map(opt => (
            <button
              key={opt.id}
              onClick={() => setGoal(opt.id)}
              className={`p-6 rounded-xl border-2 transition-all ${
                goal === opt.id
                  ? "bg-green-100 dark:bg-green-900/30 border-green-500 dark:border-green-400"
                  : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              }`}
            >
              <div className="text-4xl mb-2">{opt.icon}</div>
              <div className="font-bold text-gray-900 dark:text-white">{opt.label}</div>
            </button>
          ))}
        </div>

        {goal && (
          <Card className="p-8 mb-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="mb-6">
              <label className="block text-sm font-bold mb-3 text-gray-900 dark:text-white">
                السعرات الحرارية اليومية المستهدفة
              </label>
              <Input
                type="number"
                value={dailyCalories}
                onChange={(e) => setDailyCalories(Number(e.target.value))}
                className="dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <Button
              onClick={generatePlan}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-6 text-lg"
              data-testid="button-generate-plan"
            >
              إنشاء الخطة
            </Button>
          </Card>
        )}

        {plan && (
          <div className="space-y-6">
            <Card className="p-8 dark:bg-gray-800 dark:border-gray-700 bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/20">
              <h2 className="text-3xl font-black text-green-900 dark:text-green-300 mb-6">
                {plan.title}
              </h2>
              <div className="grid grid-cols-4 gap-4">
                {[
                  { label: "السعرات", value: plan.calories, icon: <Zap className="w-5 h-5" /> },
                  { label: "البروتين", value: `${plan.protein}g`, icon: <Target className="w-5 h-5" /> },
                  { label: "الكربوهيدرات", value: `${plan.carbs}g`, icon: <Activity className="w-5 h-5" /> },
                  { label: "الدهون", value: `${plan.fat}g`, icon: <Apple className="w-5 h-5" /> }
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="mb-2 flex justify-center text-green-600 dark:text-green-400">
                      {stat.icon}
                    </div>
                    <div className="text-2xl font-black text-gray-900 dark:text-white">
                      {stat.value}
                    </div>
                    <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                <Apple className="w-6 h-6 text-green-600" />
                جدول الوجبات اليومي
              </h3>
              <div className="space-y-3">
                {plan.meals.map((meal: any, idx: number) => (
                  <Card key={idx} className="p-4 dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white">{meal.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{meal.time}</div>
                      </div>
                      <div className="text-2xl font-black text-green-600 dark:text-green-400">
                        {meal.calories}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
