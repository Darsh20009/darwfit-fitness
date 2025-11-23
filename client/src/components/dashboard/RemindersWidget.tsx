import { useLanguage } from "@/context/LanguageContext";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, CheckCircle2, AlertCircle, Clock } from "lucide-react";

interface Reminder {
  id: string;
  type: "workout" | "meal" | "water" | "azkar";
  title: string;
  time: string;
  status: "pending" | "completed";
  isToday: boolean;
}

export default function RemindersWidget() {
  const { t, language } = useLanguage();

  const reminders: Reminder[] = [
    {
      id: "1",
      type: "workout",
      title: t.reminders.workoutReminder,
      time: "06:00",
      status: "pending",
      isToday: true,
    },
    {
      id: "2",
      type: "meal",
      title: t.reminders.mealReminder,
      time: "12:30",
      status: "completed",
      isToday: true,
    },
    {
      id: "3",
      type: "water",
      title: t.reminders.waterReminder,
      time: "15:00",
      status: "pending",
      isToday: true,
    },
    {
      id: "4",
      type: "azkar",
      title: t.reminders.azkarReminder,
      time: "18:00",
      status: "pending",
      isToday: true,
    },
    {
      id: "5",
      type: "workout",
      title: t.reminders.workoutReminder,
      time: "06:00",
      status: "pending",
      isToday: false,
    },
  ];

  const getReminderIcon = (type: string) => {
    switch (type) {
      case "workout":
        return "🏋️";
      case "meal":
        return "🍽️";
      case "water":
        return "💧";
      case "azkar":
        return "📿";
      default:
        return "🔔";
    }
  };

  const getReminderColor = (type: string) => {
    switch (type) {
      case "workout":
        return "bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700";
      case "meal":
        return "bg-orange-100 dark:bg-orange-900/30 border-orange-200 dark:border-orange-700";
      case "water":
        return "bg-cyan-100 dark:bg-cyan-900/30 border-cyan-200 dark:border-cyan-700";
      case "azkar":
        return "bg-purple-100 dark:bg-purple-900/30 border-purple-200 dark:border-purple-700";
      default:
        return "bg-gray-100 dark:bg-gray-900/30 border-gray-200 dark:border-gray-700";
    }
  };

  const todayReminders = reminders.filter((r) => r.isToday);
  const upcomingReminders = reminders.filter((r) => !r.isToday);
  const completedCount = todayReminders.filter((r) => r.status === "completed").length;

  return (
    <Card className="p-4 sm:p-6 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Bell className="w-5 sm:w-6 h-5 sm:h-6 text-blue-600" />
          {t.reminders.title}
        </h3>
        <Badge className="bg-blue-600 text-white text-xs sm:text-sm">
          {completedCount}/{todayReminders.length} {language === "ar" ? "مكتمل" : "done"}
        </Badge>
      </div>

      {/* Today's Reminders */}
      <div className="mb-4">
        <p className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">
          {t.reminders.today}
        </p>
        <div className="space-y-2">
          {todayReminders.length > 0 ? (
            todayReminders.map((reminder) => (
              <div
                key={reminder.id}
                className={`p-3 rounded-lg border flex items-center gap-3 ${getReminderColor(
                  reminder.type
                )}`}
              >
                <span className="text-lg sm:text-2xl">{getReminderIcon(reminder.type)}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                    {reminder.title}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                    <Clock className="w-3 h-3" />
                    {reminder.time}
                  </div>
                </div>
                {reminder.status === "completed" ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0" />
                )}
              </div>
            ))
          ) : (
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              {t.reminders.noReminders}
            </p>
          )}
        </div>
      </div>

      {/* Upcoming Reminders */}
      {upcomingReminders.length > 0 && (
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">
            {t.reminders.tomorrow}
          </p>
          <div className="space-y-2">
            {upcomingReminders.map((reminder) => (
              <div
                key={reminder.id}
                className={`p-3 rounded-lg border flex items-center gap-3 opacity-70 ${getReminderColor(
                  reminder.type
                )}`}
              >
                <span className="text-lg sm:text-2xl">{getReminderIcon(reminder.type)}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                    {reminder.title}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{reminder.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
