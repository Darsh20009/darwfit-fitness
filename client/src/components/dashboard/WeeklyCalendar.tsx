import { Card, CardContent } from "@/components/ui/card";
import { getWeekDays } from "../../lib/dates";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface WeeklyCalendarProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

export default function WeeklyCalendar({ selectedDate, onSelectDate }: WeeklyCalendarProps) {
  const [weekDays, setWeekDays] = useState(getWeekDays());
  
  useEffect(() => {
    setWeekDays(getWeekDays(selectedDate));
  }, [selectedDate]);
  
  const isSelectedDay = (date: Date) => {
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };
  
  return (
    <Card className="mb-8 overflow-x-auto">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-4 text-center">الأسبوع الحالي</h3>
        <div className="grid grid-cols-7 gap-4 min-w-[700px]">
          {weekDays.map((day, index) => (
            <div 
              key={index}
              onClick={() => onSelectDate(day.date)}
              className={cn(
                "day-card text-center p-3 border rounded-lg cursor-pointer transition-colors",
                "hover:bg-neutral-50 dark:hover:bg-neutral-700",
                "border-neutral-200 dark:border-neutral-700",
                isSelectedDay(day.date) && "active-day border-primary dark:border-primary shadow-sm"
              )}
            >
              <div className="font-bold">{day.dayOfWeek}</div>
              <div className="text-sm text-neutral-500 dark:text-neutral-400">{day.formattedDate}</div>
              <div className="mt-2 text-xs text-primary">{day.workoutType}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
