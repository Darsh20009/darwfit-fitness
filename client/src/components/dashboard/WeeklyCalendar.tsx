import { Card, CardContent } from "@/components/ui/card";
import { getWeekDays } from "../../lib/dates";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Lock, Calendar, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface WeeklyCalendarProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

export default function WeeklyCalendar({ selectedDate, onSelectDate }: WeeklyCalendarProps) {
  const [weekDays, setWeekDays] = useState(getWeekDays());
  const [today] = useState(new Date());
  
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
  
  const isFutureDay = (date: Date) => {
    // 0 = قبل اليوم, 1 = اليوم الحالي, 2 = بعد اليوم
    const compareDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const compareToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return compareDate > compareToday;
  };
  
  const isPastDay = (date: Date) => {
    const compareDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const compareToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return compareDate < compareToday;
  };
  
  const isToday = (date: Date) => {
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };
  
  return (
    <Card className="mb-8 overflow-x-auto">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-4 text-center flex items-center justify-center">
          <Calendar className="ml-2 h-5 w-5 text-primary" />
          الأسبوع الحالي
        </h3>
        <div className="grid grid-cols-7 gap-4 min-w-[700px]">
          {weekDays.map((day, index) => {
            const future = isFutureDay(day.date);
            const past = isPastDay(day.date);
            const dayIsToday = isToday(day.date);
            
            return (
              <div 
                key={index}
                onClick={() => onSelectDate(day.date)}
                className={cn(
                  "day-card text-center p-3 border rounded-lg transition-colors relative",
                  "cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-700",
                  "border-neutral-200 dark:border-neutral-700",
                  isSelectedDay(day.date) && "active-day border-primary dark:border-primary shadow-sm",
                  dayIsToday && "border-secondary dark:border-secondary bg-secondary/5",
                  future && "border-amber-300 dark:border-amber-600"
                )}
              >
                <div className="font-bold">{day.dayOfWeek}</div>
                <div className="text-sm text-neutral-500 dark:text-neutral-400">{day.formattedDate}</div>
                <div className="mt-2 text-xs text-primary">
                  {getWorkoutByDayIndex(day.date.getDay()).title}
                </div>
                
                {dayIsToday && (
                  <Badge className="absolute top-1 left-1 text-xs bg-secondary text-white">
                    اليوم
                  </Badge>
                )}
                
                {past && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="absolute top-1 left-1 bg-green-500 text-white h-5 w-5 flex items-center justify-center rounded-full">
                          <Check className="h-3 w-3" />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>تم إكمال هذا اليوم</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
                
                {future && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="absolute top-1 left-1 bg-amber-500 text-white h-5 w-5 flex items-center justify-center rounded-full">
                          <Calendar className="h-3 w-3" />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>يمكنك الاطلاع على برنامج هذا اليوم</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
