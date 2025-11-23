import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Target, Calendar, Award, LineChart as ChartIcon } from "lucide-react";

export default function ProgressPage() {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("month");
  
  const stats = {
    weightLoss: 8.5,
    caloriesBurned: 45200,
    workoutsCompleted: 24,
    daysStreak: 12,
    personalBest: "100kg deadlift"
  };

  const progressData = [
    { week: "الأسبوع 1", weight: 82, calories: 2500 },
    { week: "الأسبوع 2", weight: 81.5, calories: 2650 },
    { week: "الأسبوع 3", weight: 81, calories: 2700 },
    { week: "الأسبوع 4", weight: 80, calories: 2400 },
    { week: "الأسبوع 5", weight: 79, calories: 2800 }
  ];

  const achievements = [
    { icon: "🔥", title: "نشيط جداً", desc: "أكملت 10 تمارين", date: "قبل 3 أيام" },
    { icon: "💪", title: "قوي", desc: "حققت أعلى وزن شخصي", date: "قبل أسبوع" },
    { icon: "🎯", title: "ملتزم", desc: "12 يوم متتالي", date: "حالياً" },
    { icon: "⭐", title: "نجم صاعد", desc: "وصلت إلى 50 وجبة", date: "قبل يومين" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-12 flex items-center gap-3">
          <TrendingUp className="w-10 h-10 text-purple-600" />
          مسار تقدمك
        </h1>

        {/* Key Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 text-center dark:bg-gray-800 dark:border-gray-700 bg-gradient-to-br from-green-100 to-green-50">
            <div className="text-4xl font-black text-green-600 dark:text-green-400">{stats.weightLoss}</div>
            <div className="text-xs font-bold text-gray-700 dark:text-gray-300 mt-2">كيلو فقدتها</div>
          </Card>
          <Card className="p-6 text-center dark:bg-gray-800 dark:border-gray-700 bg-gradient-to-br from-orange-100 to-orange-50">
            <div className="text-4xl font-black text-orange-600 dark:text-orange-400">{stats.caloriesBurned}</div>
            <div className="text-xs font-bold text-gray-700 dark:text-gray-300 mt-2">سعرة محروقة</div>
          </Card>
          <Card className="p-6 text-center dark:bg-gray-800 dark:border-gray-700 bg-gradient-to-br from-blue-100 to-blue-50">
            <div className="text-4xl font-black text-blue-600 dark:text-blue-400">{stats.workoutsCompleted}</div>
            <div className="text-xs font-bold text-gray-700 dark:text-gray-300 mt-2">تمرين اكتمل</div>
          </Card>
          <Card className="p-6 text-center dark:bg-gray-800 dark:border-gray-700 bg-gradient-to-br from-red-100 to-red-50">
            <div className="text-4xl font-black text-red-600 dark:text-red-400">{stats.daysStreak}</div>
            <div className="text-xs font-bold text-gray-700 dark:text-gray-300 mt-2">يوم متتالي</div>
          </Card>
        </div>

        {/* Chart Section */}
        <Card className="p-8 mb-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <ChartIcon className="w-6 h-6 text-purple-600" />
              رسم بياني للتقدم
            </h2>
            <div className="flex gap-2">
              {["week", "month", "year"].map(range => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range as any)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    timeRange === range
                      ? "bg-purple-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {range === "week" ? "أسبوع" : range === "month" ? "شهر" : "سنة"}
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            {progressData.map((data, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-semibold text-gray-900 dark:text-white">{data.week}</span>
                  <span className="text-purple-600 dark:text-purple-400 font-bold">{data.weight} كجم</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full transition-all"
                    style={{ width: `${(82 - data.weight) / 2 * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Achievements */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-500" />
            الإنجازات والنجاحات
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement, i) => (
              <Card key={i} className="p-6 dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="text-5xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 dark:text-white">{achievement.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{achievement.desc}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">{achievement.date}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 gap-4">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-6 text-lg" data-testid="button-export-report">
            <Calendar className="w-5 h-5 mr-2" />
            تحميل التقرير
          </Button>
          <Button variant="outline" className="dark:border-gray-700 dark:text-white font-bold py-6 text-lg" data-testid="button-share-progress">
            مشاركة التقدم
          </Button>
        </div>
      </div>
    </div>
  );
}
