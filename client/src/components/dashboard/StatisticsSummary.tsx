import { useLanguage } from "@/context/LanguageContext";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Calendar, Zap, Target } from "lucide-react";

interface StatisticsPeriod {
  period: "weekly" | "monthly";
  stats: {
    consistency: number;
    avgDaily: number;
    bestDay: string;
    totalCompleted: number;
    goal: number;
  };
}

export default function StatisticsSummary() {
  const { t, language } = useLanguage();

  const weeklySummary: StatisticsPeriod = {
    period: "weekly",
    stats: {
      consistency: 86,
      avgDaily: 2250,
      bestDay: "السبت",
      totalCompleted: 6,
      goal: 7,
    },
  };

  const monthlySummary: StatisticsPeriod = {
    period: "monthly",
    stats: {
      consistency: 92,
      avgDaily: 2280,
      bestDay: "April",
      totalCompleted: 23,
      goal: 24,
    },
  };

  const StatCard = ({ period, stats }: StatisticsPeriod) => {
    const isWeekly = period === "weekly";
    const title = isWeekly ? t.progress.weeklySummary : t.progress.monthlySummary;
    const icon = isWeekly ? Calendar : Zap;
    const Icon = icon;

    return (
      <Card className="p-4 sm:p-6 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <Icon className="w-5 sm:w-6 h-5 sm:h-6 text-purple-600" />
            <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
              {title}
            </h3>
          </div>
          <Badge
            className={`text-xs sm:text-sm font-semibold ${
              stats.consistency >= 80
                ? "bg-green-600 text-white"
                : "bg-orange-600 text-white"
            }`}
          >
            {stats.consistency}%
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {/* Consistency Progress */}
          <div className="space-y-2">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              {t.progress.consistency}
            </p>
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all"
                style={{ width: `${stats.consistency}%` }}
              />
            </div>
            <p className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">
              {stats.consistency}%
            </p>
          </div>

          {/* Average Daily */}
          <div className="space-y-2">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              {t.progress.avgDaily}
            </p>
            <p className="text-lg sm:text-2xl font-bold text-blue-600">
              {stats.avgDaily.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">cal/day</p>
          </div>

          {/* Best Day */}
          <div className="space-y-2">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              {t.progress.bestDay}
            </p>
            <p className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
              {stats.bestDay}
            </p>
            <Badge variant="outline" className="w-fit text-xs">
              ⭐
            </Badge>
          </div>

          {/* Goal Progress */}
          <div className="space-y-2">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              {t.progress.totalCompleted}
            </p>
            <p className="text-lg sm:text-2xl font-bold text-green-600">
              {stats.totalCompleted}/{stats.goal}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              {Math.round((stats.totalCompleted / stats.goal) * 100)}%
            </p>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 sm:w-6 h-5 sm:h-6 text-purple-600" />
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
          {language === "ar" ? "ملخص الإحصائيات" : "Statistics Summary"}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <StatCard {...weeklySummary} />
        <StatCard {...monthlySummary} />
      </div>
    </div>
  );
}
