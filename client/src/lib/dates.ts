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

// Placeholder workout plan data.  In a real application, this would be fetched from a database or API.
const WORKOUT_PLANS = [
  { title: "تمارين الظهر والباي", description: "" },
  { title: "تمارين الأرجل", description: "" },
  { title: "تمارين الأكتاف والتراي", description: "" },
  { title: "تمارين الجسم كامل (Full Body)", description: "" },
  { title: "كارديو فقط", description: "" },
  { title: "راحة", description: "" },
  { title: "تمارين الصدر والتراي", description: "" }
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

function getWorkoutByDayIndex(dayIndex: number): { title: string; description: string } {
  //This is a placeholder, replace with your actual data fetching logic.
  return WORKOUT_PLANS[dayIndex] || { title: "", description: "" };
}

export function getWorkoutTypeByDate(date: Date): string {
  const dayIndex = getDay(date);
  const workoutPlan = getWorkoutByDayIndex(dayIndex);
  return workoutPlan.title;
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