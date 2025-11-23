import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { TrendingUp, Target, Award, Flame, Weight, Dumbbell, Footprints } from "lucide-react";

export default function ProgressPage() {
  const { t, language } = useLanguage();
  const [timeRange, setTimeRange] = useState<"daily" | "weekly" | "monthly">("weekly");

  // Daily data (past 7 days)
  const dailyData = [
    { date: "الاثنين", calories: 2100, weight: 75.5, workouts: 1, steps: 8900 },
    { date: "الثلاثاء", calories: 2300, weight: 75.2, workouts: 1, steps: 9200 },
    { date: "الأربعاء", calories: 1950, weight: 75.0, workouts: 2, steps: 10500 },
    { date: "الخميس", calories: 2400, weight: 74.8, workouts: 1, steps: 8700 },
    { date: "الجمعة", calories: 2050, weight: 74.5, workouts: 1, steps: 9800 },
    { date: "السبت", calories: 2600, weight: 74.2, workouts: 2, steps: 11200 },
    { date: "الأحد", calories: 2200, weight: 74.0, workouts: 1, steps: 9400 },
  ];

  // Weekly data (past 8 weeks)
  const weeklyData = [
    { week: "الأسبوع 1", calories: 15200, weight: 78.5, workouts: 5, steps: 65000 },
    { week: "الأسبوع 2", calories: 15800, weight: 78.0, workouts: 6, steps: 68000 },
    { week: "الأسبوع 3", calories: 14900, weight: 77.2, workouts: 5, steps: 62000 },
    { week: "الأسبوع 4", calories: 16200, weight: 76.5, workouts: 7, steps: 70000 },
    { week: "الأسبوع 5", calories: 15400, weight: 75.8, workouts: 6, steps: 66000 },
    { week: "الأسبوع 6", calories: 15900, weight: 75.2, workouts: 6, steps: 69000 },
    { week: "الأسبوع 7", calories: 14800, weight: 74.5, workouts: 5, steps: 64000 },
    { week: "الأسبوع 8", calories: 15300, weight: 74.0, workouts: 6, steps: 67000 },
  ];

  // Monthly data (past 6 months)
  const monthlyData = [
    { month: "يناير", calories: 62400, weight: 82.0, workouts: 22, steps: 265000 },
    { month: "فبراير", calories: 64200, weight: 80.5, workouts: 24, steps: 280000 },
    { month: "مارس", calories: 61800, weight: 79.0, workouts: 23, steps: 275000 },
    { month: "أبريل", calories: 65100, weight: 77.2, workouts: 25, steps: 285000 },
    { month: "مايو", calories: 63400, weight: 75.5, workouts: 24, steps: 278000 },
    { month: "يونيو", calories: 61200, weight: 74.0, workouts: 23, steps: 272000 },
  ];

  const getChartData = () => {
    switch (timeRange) {
      case "daily":
        return dailyData;
      case "weekly":
        return weeklyData;
      case "monthly":
        return monthlyData;
    }
  };

  const getXAxisKey = () => {
    switch (timeRange) {
      case "daily":
        return "date";
      case "weekly":
        return "week";
      case "monthly":
        return "month";
    }
  };

  // Key statistics
  const stats = [
    {
      label: t.progress.weightLost,
      value: "8.5",
      unit: "kg",
      icon: Weight,
      color: "from-green-500 to-green-600",
    },
    {
      label: t.progress.caloriesBurned,
      value: "387,400",
      unit: "cal",
      icon: Flame,
      color: "from-orange-500 to-orange-600",
    },
    {
      label: t.progress.workoutsCompleted,
      value: "138",
      unit: "times",
      icon: Dumbbell,
      color: "from-blue-500 to-blue-600",
    },
    {
      label: t.progress.dayStreak,
      value: "42",
      unit: "days",
      icon: Target,
      color: "from-red-500 to-red-600",
    },
  ];

  // Achievements
  const achievements = [
    { title: "🔥 نشيط جداً", desc: "أكملت 100 تمرين", date: "قبل يومين" },
    { title: "💪 قوي", desc: "حققت أعلى وزن شخصي", date: "قبل أسبوع" },
    { title: "🎯 ملتزم", desc: "42 يوم متتالي", date: "حالياً" },
    { title: "⭐ نجم صاعد", desc: "وصلت إلى 50 وجبة", date: "قبل يومين" },
    { title: "🏆 بطل", desc: "فقدت 8.5 كيلو", date: "قبل 3 أيام" },
    { title: "🚀 في القمة", desc: "10 آلاف خطوة يومياً", date: "أمس" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-2 flex items-center gap-3">
            <TrendingUp className="w-8 sm:w-10 h-8 sm:h-10 text-purple-600" />
            {t.progress.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            {t.progress.subtitle}
          </p>
        </div>

        {/* Key Statistics */}
        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t.progress.keyStats}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <Card
                  key={idx}
                  className={`p-3 sm:p-6 text-center dark:bg-gray-800 dark:border-gray-700 bg-gradient-to-br ${stat.color} text-white`}
                >
                  <Icon className="w-6 sm:w-8 h-6 sm:h-8 mx-auto mb-2 opacity-80" />
                  <div className="text-2xl sm:text-4xl font-black">{stat.value}</div>
                  <div className="text-xs sm:text-sm font-semibold opacity-90 mt-1">{stat.label}</div>
                  <div className="text-xs opacity-75">{stat.unit}</div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Charts Section */}
        <Card className="p-4 sm:p-6 md:p-8 mb-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              {t.progress.progressChart}
            </h2>
            <div className="flex gap-2 flex-wrap">
              {["daily", "weekly", "monthly"].map((range) => (
                <Button
                  key={range}
                  onClick={() => setTimeRange(range as any)}
                  variant={timeRange === range ? "default" : "outline"}
                  className="text-xs sm:text-sm"
                  data-testid={`button-${range}-filter`}
                >
                  {range === "daily"
                    ? t.progress.daily
                    : range === "weekly"
                    ? t.progress.weekly
                    : t.progress.monthly}
                </Button>
              ))}
            </div>
          </div>

          {/* Charts Tabs */}
          <Tabs defaultValue="calories" className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-6">
              <TabsTrigger value="calories" className="text-xs sm:text-sm">
                {t.progress.caloriesChart}
              </TabsTrigger>
              <TabsTrigger value="weight" className="text-xs sm:text-sm">
                {t.progress.weightChart}
              </TabsTrigger>
              <TabsTrigger value="workouts" className="text-xs sm:text-sm">
                {t.progress.workoutsChart}
              </TabsTrigger>
              <TabsTrigger value="steps" className="text-xs sm:text-sm">
                {t.progress.stepsChart}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="calories" className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={getChartData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={getXAxisKey()} angle={-45} height={80} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="calories"
                    stroke="#f97316"
                    strokeWidth={2}
                    dot={{ fill: "#f97316", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="weight" className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={getChartData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={getXAxisKey()} angle={-45} height={80} />
                  <YAxis domain={["dataMin - 1", "dataMax + 1"]} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="weight"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ fill: "#10b981", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="workouts" className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={getChartData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={getXAxisKey()} angle={-45} height={80} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="workouts" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="steps" className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={getChartData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={getXAxisKey()} angle={-45} height={80} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="steps" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Achievements Section */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Award className="w-6 sm:w-8 h-6 sm:h-8 text-amber-500" />
            {t.progress.achievements}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement, idx) => (
              <Card
                key={idx}
                className="p-4 sm:p-6 dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-shadow hover-elevate"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="text-3xl sm:text-4xl flex-shrink-0">
                    {achievement.title.split(" ")[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base break-words">
                      {achievement.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {achievement.desc}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                      {achievement.date}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
