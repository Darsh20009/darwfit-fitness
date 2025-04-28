import { addDays, format, addMonths, getDay, isToday } from "date-fns";
import { ar } from "date-fns/locale";

export interface DayData {
  date: Date;
  dayOfWeek: string;
  formattedDate: string;
  isToday: boolean;
  workoutType: string;
}

const DAYS_OF_WEEK_AR = [
  "الأحد",
  "الاثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس",
  "الجمعة",
  "السبت"
];

const WORKOUT_BY_DAY = [
  "تمارين الظهر والباي", // الأحد - index 0
  "تمارين الأرجل", // الاثنين - index 1
  "تمارين الأكتاف والتراي", // الثلاثاء - index 2
  "تمارين الجسم كامل (Full Body)", // الأربعاء - index 3
  "كارديو فقط", // الخميس - index 4
  "راحة", // الجمعة - index 5
  "تمارين الصدر والتراي" // السبت - index 6
];

export function getTomorrow(): Date {
  const today = new Date();
  return addDays(today, 1);
}

export function getNextThreeMonths(startDate: Date = getTomorrow()): Date {
  return addMonths(startDate, 3);
}

export function formatDateToArabic(date: Date): string {
  return format(date, "d MMMM yyyy", { locale: ar });
}

export function formatFullDateToArabic(date: Date): string {
  return format(date, "EEEE، d MMMM yyyy", { locale: ar });
}

export function getWorkoutTypeByDate(date: Date): string {
  // Get day of week (0 = Sunday, 6 = Saturday)
  const dayIndex = getDay(date);
  return WORKOUT_BY_DAY[dayIndex];
}

export function getWeekDays(startDate: Date = new Date()): DayData[] {
  const days: DayData[] = [];
  
  for (let i = 0; i < 7; i++) {
    const date = addDays(startDate, i - getDay(startDate));
    days.push({
      date,
      dayOfWeek: DAYS_OF_WEEK_AR[getDay(date)],
      formattedDate: format(date, "d MMM", { locale: ar }),
      isToday: isToday(date),
      workoutType: getWorkoutTypeByDate(date)
    });
  }
  
  return days;
}
