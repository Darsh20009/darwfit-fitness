import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dumbbell, Clock, Heart, Flame, AlertCircle } from "lucide-react";

export default function ExercisePlanPage() {
  const [level, setLevel] = useState("");
  const [plan, setPlan] = useState<any>(null);

  const exercises: Record<string, any> = {
    "beginner": {
      title: "برنامج للمبتدئين (3 أيام)",
      description: "برنامج آمن وفعال لبناء أساس قوي",
      workouts: [
        {
          day: "يوم 1: الجزء العلوي",
          exercises: [
            { name: "تمارين الضغط (Push-ups)", reps: "3 × 10", time: "10 دقائق" },
            { name: "تمارين السحب (Pull-ups)", reps: "3 × 5", time: "10 دقائق" },
            { name: "تمارين الأكتاف", reps: "3 × 12", time: "10 دقائق" }
          ]
        },
        {
          day: "يوم 2: الجزء السفلي",
          exercises: [
            { name: "تمارين القرفصاء (Squats)", reps: "3 × 12", time: "15 دقيقة" },
            { name: "تمارين الرجلين (Lunges)", reps: "3 × 10", time: "10 دقائق" },
            { name: "تمارين الفخذ الخلفي (Hamstring curls)", reps: "3 × 12", time: "10 دقائق" }
          ]
        },
        {
          day: "يوم 3: كامل الجسم",
          exercises: [
            { name: "تمرين بلانك (Plank)", reps: "3 × 30 ثانية", time: "10 دقائق" },
            { name: "تمارين القفز (Jumping jacks)", reps: "3 × 20", time: "10 دقائق" },
            { name: "مشي سريع", time: "30 دقيقة", pace: "معتدل" }
          ]
        }
      ],
      duration: "30-45",
      caloriesBurn: "150-300"
    },
    "intermediate": {
      title: "برنامج متقدم (4 أيام)",
      description: "برنامج متوازن لبناء العضلات والقوة",
      workouts: [
        {
          day: "يوم 1: الصدر والأكتاف",
          exercises: [
            { name: "تمارين الضغط برفع أثقال", reps: "4 × 8", weight: "50kg" },
            { name: "تمارين الأكتاف", reps: "4 × 10", weight: "30kg" },
            { name: "تمارين الذراعين", reps: "4 × 12", weight: "20kg" }
          ]
        },
        {
          day: "يوم 2: الظهر والأرجل",
          exercises: [
            { name: "تمارين السحب", reps: "4 × 8", weight: "60kg" },
            { name: "تمارين القرفصاء بأثقال", reps: "4 × 10", weight: "80kg" },
            { name: "تمارين الظهر السفلي", reps: "4 × 12", weight: "50kg" }
          ]
        },
        {
          day: "يوم 3: البطن والقلب",
          exercises: [
            { name: "تمارين الكارديو", time: "30 دقيقة", pace: "مرتفع" },
            { name: "تمارين البطن", reps: "4 × 15", time: "15 دقيقة" },
            { name: "تمارين الجذع", reps: "3 × 30 ثانية", time: "10 دقائق" }
          ]
        },
        {
          day: "يوم 4: راحة نشطة",
          exercises: [
            { name: "مشي خفيف", time: "30 دقيقة", pace: "خفيف" },
            { name: "تمارين الاسترخاء", time: "20 دقيقة", type: "يوجا" }
          ]
        }
      ],
      duration: "45-60",
      caloriesBurn: "300-500"
    },
    "advanced": {
      title: "برنامج متقدم جداً (6 أيام)",
      description: "برنامج احترافي لزيادة القوة والعضلات",
      workouts: [
        { day: "يوم 1: الصدر", exercises: [{ name: "تمارين عالية الشدة", reps: "5 × 5" }] },
        { day: "يوم 2: الظهر", exercises: [{ name: "تمارين عالية الشدة", reps: "5 × 5" }] },
        { day: "يوم 3: الأرجل", exercises: [{ name: "تمارين عالية الشدة", reps: "5 × 5" }] },
        { day: "يوم 4: الأكتاف", exercises: [{ name: "تمارين عالية الشدة", reps: "5 × 5" }] },
        { day: "يوم 5: الذراعين", exercises: [{ name: "تمارين عالية الشدة", reps: "5 × 5" }] },
        { day: "يوم 6: راحة", exercises: [{ name: "استرخاء وتمدد", time: "30 دقيقة" }] }
      ],
      duration: "60-90",
      caloriesBurn: "500-800"
    }
  };

  const handleSelect = (levelId: string) => {
    setLevel(levelId);
    setPlan(exercises[levelId]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <Dumbbell className="w-10 h-10 text-blue-600" />
            برامج التمارين الرياضية
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            اختر برنامجاً يناسب مستوى لياقتك البدنية
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {[
            { id: "beginner", label: "مبتدئ", emoji: "🌱" },
            { id: "intermediate", label: "متقدم", emoji: "💪" },
            { id: "advanced", label: "احترافي", emoji: "🔥" }
          ].map(opt => (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              className={`p-6 rounded-xl border-2 transition-all ${
                level === opt.id
                  ? "bg-blue-100 dark:bg-blue-900/30 border-blue-500 dark:border-blue-400"
                  : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              }`}
              data-testid={`button-level-${opt.id}`}
            >
              <div className="text-4xl mb-2">{opt.emoji}</div>
              <div className="font-bold text-gray-900 dark:text-white">{opt.label}</div>
            </button>
          ))}
        </div>

        {plan && (
          <div className="space-y-8">
            <Card className="p-8 dark:bg-gray-800 dark:border-gray-700 bg-gradient-to-br from-blue-100 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/20">
              <h2 className="text-3xl font-black text-blue-900 dark:text-blue-300 mb-4">
                {plan.title}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">{plan.description}</p>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-700 rounded-lg p-4 text-center">
                  <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                  <div className="font-bold text-gray-900 dark:text-white">{plan.duration} دقيقة</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">المدة</div>
                </div>
                <div className="bg-white dark:bg-gray-700 rounded-lg p-4 text-center">
                  <Flame className="w-6 h-6 text-orange-600 dark:text-orange-400 mx-auto mb-2" />
                  <div className="font-bold text-gray-900 dark:text-white">{plan.caloriesBurn}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">السعرات المحروقة</div>
                </div>
                <div className="bg-white dark:bg-gray-700 rounded-lg p-4 text-center">
                  <Heart className="w-6 h-6 text-red-600 dark:text-red-400 mx-auto mb-2" />
                  <div className="font-bold text-gray-900 dark:text-white">معتدل</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">مستوى الجهد</div>
                </div>
              </div>
            </Card>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-800 rounded-lg p-6 flex gap-4">
              <AlertCircle className="w-6 h-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
              <div className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>تنبيه أمان:</strong> استشر طبيبك قبل بدء أي برنامج تمارين جديد، وتوقف فوراً إذا شعرت بأي ألم.
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
                <Dumbbell className="w-6 h-6 text-blue-600" />
                جدول التمارين الأسبوعي
              </h3>
              <div className="space-y-4">
                {plan.workouts.map((workout: any, idx: number) => (
                  <Card key={idx} className="p-6 dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-shadow">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      {workout.day}
                    </h4>
                    <div className="space-y-3">
                      {workout.exercises.map((ex: any, i: number) => (
                        <div key={i} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div>
                            <div className="font-semibold text-gray-900 dark:text-white">{ex.name}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              {ex.reps && `التكرارات: ${ex.reps}`}
                              {ex.time && `الوقت: ${ex.time}`}
                              {ex.weight && ` • الوزن: ${ex.weight}`}
                              {ex.pace && ` • السرعة: ${ex.pace}`}
                              {ex.type && ` • النوع: ${ex.type}`}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 text-lg"
              data-testid="button-start-workout"
            >
              ابدأ البرنامج الآن
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
