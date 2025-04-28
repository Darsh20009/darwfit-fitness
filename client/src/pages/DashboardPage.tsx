import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import DailyPlan from "../components/dashboard/DailyPlan";
import WeeklyCalendar from "../components/dashboard/WeeklyCalendar";
import DetailedPlan from "../components/dashboard/DetailedPlan";
import { getDay } from "date-fns";
import { formatFullDateToArabic, getWorkoutTypeByDate } from "../lib/dates";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Calendar, 
  Trophy, 
  TrendingUp, 
  Clock, 
  Activity, 
  Heart 
} from "lucide-react";

export default function DashboardPage() {
  const { username, subscriptionId, subscriptionEndDate } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dayIndex, setDayIndex] = useState(getDay(new Date()));
  const [progress, setProgress] = useState(65); // Simulated progress percentage
  
  useEffect(() => {
    setDayIndex(getDay(selectedDate));
  }, [selectedDate]);
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Dashboard Header with Stats */}
      <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-4 md:p-6 rounded-lg mb-8 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-center md:text-right">
              مرحباً بك <span className="text-primary">{username}</span>
            </h2>
            <p className="text-neutral-600 dark:text-neutral-300 text-center md:text-right mt-1">
              برنامجك مصمم خصيصاً لتحقيق أهدافك بطريقة صحية ومستدامة
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-col items-center md:items-end">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary px-3 py-1.5 mb-2 text-sm">
              <Calendar className="h-4 w-4 ml-2" />
              اشتراك فعال حتى: {subscriptionEndDate}
            </Badge>
            <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary px-3 py-1.5 text-sm">
              <Trophy className="h-4 w-4 ml-2" />
              رقم الاشتراك: {subscriptionId}
            </Badge>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-6">
          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <h3 className="text-xs text-neutral-500 dark:text-neutral-400">التقدم الشامل</h3>
                <p className="text-xl font-bold text-primary">{progress}%</p>
              </div>
              <div className="bg-primary/10 p-2 rounded-full">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <h3 className="text-xs text-neutral-500 dark:text-neutral-400">إجمالي التمارين</h3>
                <p className="text-xl font-bold text-green-600">78</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded-full">
                <Activity className="h-6 w-6 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <h3 className="text-xs text-neutral-500 dark:text-neutral-400">متبقي من الاشتراك</h3>
                <p className="text-xl font-bold text-amber-500">60 يوم</p>
              </div>
              <div className="bg-amber-50 dark:bg-amber-900/20 p-2 rounded-full">
                <Clock className="h-6 w-6 text-amber-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <h3 className="text-xs text-neutral-500 dark:text-neutral-400">معدل التقييم</h3>
                <p className="text-xl font-bold text-red-500">ممتاز</p>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded-full">
                <Heart className="h-6 w-6 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
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
