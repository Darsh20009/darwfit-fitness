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
  "تمارين الدفع 1 (صدر وترايسبس)", // الأحد - index 0
  "تمارين السحب 1 (ظهر وبايسبس)", // الاثنين - index 1
  "تمارين الأرجل والبطن 1", // الثلاثاء - index 2
  "تمارين الدفع 2 (أكتاف وصدر)", // الأربعاء - index 3
  "تمارين السحب 2 (ظهر وترابيس)", // الخميس - index 4
  "تمارين الأرجل والبطن 2", // الجمعة - index 5
  "راحة" // السبت - index 6
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

export function calculateRemainingDays(endDateString: string): number {
  if (!endDateString) return 0;
  
  try {
    // Parse Arabic date format "30 يوليو 2025"
    const monthsMap: { [key: string]: number } = {
      "يناير": 0, "فبراير": 1, "مارس": 2, "أبريل": 3,
      "مايو": 4, "يونيو": 5, "يوليو": 6, "أغسطس": 7,
      "سبتمبر": 8, "أكتوبر": 9, "نوفمبر": 10, "ديسمبر": 11
    };
    
    const parts = endDateString.trim().split(' ');
    if (parts.length !== 3) return 0;
    
    const day = parseInt(parts[0]);
    const monthName = parts[1];
    const year = parseInt(parts[2]);
    
    const monthIndex = monthsMap[monthName];
    if (monthIndex === undefined || isNaN(day) || isNaN(year)) return 0;
    
    const endDate = new Date(year, monthIndex, day);
    const today = new Date();
    
    // Set both dates to start of day for accurate calculation
    endDate.setHours(23, 59, 59, 999);
    today.setHours(0, 0, 0, 0);
    
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return Math.max(0, diffDays);rs(0, 0, 0, 0);
    
    const timeDiff = endDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    return Math.max(0, daysDiff);
  } catch (error) {
    console.error('Error calculating remaining days:', error);
    return 0;
  }
}
