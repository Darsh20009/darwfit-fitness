import { useLanguage } from "@/context/LanguageContext";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Flame } from "lucide-react";

interface Habit {
  id: string;
  name: string;
  icon: string;
  color: string;
  streak: number;
  progress: number;
  completedDays: boolean[];
}

export default function HabitTracker() {
  const { t } = useLanguage();

  const habits: Habit[] = [
    {
      id: "1",
      name: "تمارين رياضية",
      icon: "🏋️",
      color: "from-blue-500 to-blue-600",
      streak: 12,
      progress: 100,
      completedDays: [true, true, true, true, true, true, true],
    },
    {
      id: "2",
      name: "شرب الماء",
      icon: "💧",
      color: "from-cyan-500 to-cyan-600",
      streak: 28,
      progress: 100,
      completedDays: [true, true, true, true, true, true, true],
    },
    {
      id: "3",
      name: "الأذكار",
      icon: "📿",
      color: "from-purple-500 to-purple-600",
      streak: 5,
      progress: 71,
      completedDays: [true, false, true, true, true, true, false],
    },
    {
      id: "4",
      name: "الوجبات الصحية",
      icon: "🥗",
      color: "from-green-500 to-green-600",
      streak: 8,
      progress: 86,
      completedDays: [true, true, true, true, false, true, true],
    },
  ];

  return (
    <Card className="p-4 sm:p-6 dark:bg-gray-800 dark:border-gray-700">
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <Flame className="w-5 sm:w-6 h-5 sm:h-6 text-red-600" />
        {t.progress.habitTracker}
      </h3>

      <div className="space-y-4">
        {habits.map((habit) => (
          <div
            key={habit.id}
            className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{habit.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
                    {habit.name}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Flame className="w-4 h-4 text-orange-600" />
                    <span className="text-xs sm:text-sm font-bold text-orange-600">
                      {habit.streak} {habit.streak === 1 ? "day" : "days"}
                    </span>
                  </div>
                </div>
              </div>
              <Badge className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs sm:text-sm">
                {habit.progress}%
              </Badge>
            </div>

            {/* Progress Bar */}
            <div className="mb-3 w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${habit.color} rounded-full transition-all`}
                style={{ width: `${habit.progress}%` }}
              />
            </div>

            {/* Week Days */}
            <div className="flex gap-1.5 justify-between">
              {habit.completedDays.map((completed, idx) => (
                <div key={idx} className="flex-1 flex items-center justify-center">
                  {completed ? (
                    <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                  ) : (
                    <Circle className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300 dark:text-gray-600" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
