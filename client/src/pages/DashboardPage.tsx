import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import DailyPlan from "../components/dashboard/DailyPlan";
import WeeklyCalendar from "../components/dashboard/WeeklyCalendar";
import DetailedPlan from "../components/dashboard/DetailedPlan";
import { getDay } from "date-fns";
import { formatFullDateToArabic, getWorkoutTypeByDate } from "../lib/dates";

export default function DashboardPage() {
  const { username } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dayIndex, setDayIndex] = useState(getDay(new Date()));
  
  useEffect(() => {
    setDayIndex(getDay(selectedDate));
  }, [selectedDate]);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-8 text-center">
        برنامجك الشخصي <span className="text-primary">{username}</span>
      </h2>
      
      {/* Today's Plan Summary */}
      <DailyPlan 
        date={selectedDate}
        formattedDate={formatFullDateToArabic(selectedDate)}
        workoutType={getWorkoutTypeByDate(selectedDate)}
        dayIndex={dayIndex}
      />
      
      {/* Weekly Calendar */}
      <WeeklyCalendar 
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />
      
      {/* Detailed Plan */}
      <DetailedPlan 
        date={selectedDate}
        formattedDate={formatFullDateToArabic(selectedDate)}
        dayIndex={dayIndex}
      />
    </div>
  );
}
