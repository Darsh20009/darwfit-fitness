import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import DailyPlan from "../components/dashboard/DailyPlan";
import WeeklyCalendar from "../components/dashboard/WeeklyCalendar";
import DetailedPlan from "../components/dashboard/DetailedPlan";
import CreativeUserProfile from "../components/CreativeUserProfile";
import { getDay } from "date-fns";
import { formatFullDateToArabic, getWorkoutTypeByDate, calculateRemainingDays } from "../lib/dates";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Calendar, 
  Trophy, 
  TrendingUp, 
  Clock, 
  Activity, 
  Heart,
  Lightbulb,
  User,
  Star,
  Dumbbell,
  Crown,
  Shield,
  Zap,
  ChefHat
} from "lucide-react";
import PersonalizedNutritionSystem from "@/components/PersonalizedNutritionSystem";

export default function DashboardPage() {
  const { username, subscriptionId, subscriptionEndDate } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [dayIndex, setDayIndex] = useState(getDay(new Date()));
  const [progress, setProgress] = useState(65); // Simulated progress percentage
  const [activeTab, setActiveTab] = useState('today');

  // Function to get custom user icon based on username
  const getCustomUserIcon = () => {
    if (username === 'محمد السهلي') {
      return <Crown className="h-8 w-8 text-green-600 mx-auto mb-2" />;
    } else if (username === 'يوسف درويش') {
      return <Star className="h-8 w-8 text-green-600 mx-auto mb-2" />;
    } else if (username === 'خالد عمر') {
      return <Dumbbell className="h-8 w-8 text-green-600 mx-auto mb-2" />;
    } else {
      return <User className="h-8 w-8 text-green-600 mx-auto mb-2" />;
    }
  };

  // Calculate remaining subscription days
  const remainingDays = calculateRemainingDays(subscriptionEndDate || "");

  useEffect(() => {
    setDayIndex(getDay(selectedDate));
  }, [selectedDate]);

  return (
    <div className="luxury-background min-h-screen">
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
                <p className="text-xl font-bold text-amber-500">
                  {remainingDays > 0 ? `${remainingDays} ${remainingDays === 1 ? 'يوم' : 'يوم'}` : "انتهى الاشتراك"}
                </p>
              </div>
              <div className={`p-2 rounded-full ${
                remainingDays > 30 ? "bg-amber-50 dark:bg-amber-900/20" : 
                remainingDays > 7 ? "bg-orange-50 dark:bg-orange-900/20" : 
                "bg-red-50 dark:bg-red-900/20"
              }`}>
                <Clock className={`h-6 w-6 ${
                  remainingDays > 30 ? "text-amber-500" : 
                  remainingDays > 7 ? "text-orange-500" : 
                  "text-red-500"
                }`} />
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

      {/* Main Content with Tabs */}
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20"
            onClick={() => setActiveTab('today')}
          >
            <CardContent className="p-4 text-center">
              <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-lg font-bold text-blue-800 dark:text-blue-300">اليوم</div>
              <p className="text-xs text-blue-600 dark:text-blue-400">خطة اليوم</p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 border-green-200 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20"
            onClick={() => setActiveTab('profile')}
          >
            <CardContent className="p-4 text-center">
              {getCustomUserIcon()}
              <div className="text-lg font-bold text-green-800 dark:text-green-300">الملف الشخصي</div>
              <p className="text-xs text-green-600 dark:text-green-400">ملفك الإبداعي</p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20"
            onClick={() => setActiveTab('nutrition')}
          >
            <CardContent className="p-4 text-center">
              <ChefHat className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
              <div className="text-lg font-bold text-emerald-800 dark:text-emerald-300">التغذية الذكية</div>
              <p className="text-xs text-emerald-600 dark:text-emerald-400">نظامك الغذائي</p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20"
            onClick={() => setActiveTab('tips')}
          >
            <CardContent className="p-4 text-center">
              <Lightbulb className="h-8 w-8 text-amber-600 mx-auto mb-2" />
              <div className="text-lg font-bold text-amber-800 dark:text-amber-300">النصائح</div>
              <p className="text-xs text-amber-600 dark:text-amber-400">نصائح ذكية</p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20"
            onClick={() => setActiveTab('progress')}
          >
            <CardContent className="p-4 text-center">
              <Activity className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-lg font-bold text-purple-800 dark:text-purple-300">التقدم</div>
              <p className="text-xs text-purple-600 dark:text-purple-400">متابعة الإنجازات</p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20"
            onClick={() => setActiveTab('details')}
          >
            <CardContent className="p-4 text-center">
              <Heart className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-lg font-bold text-orange-800 dark:text-orange-300">التفاصيل</div>
              <p className="text-xs text-orange-600 dark:text-orange-400">خطة مفصلة</p>
            </CardContent>
          </Card>
        </div>

        {/* Tab Content */}
        {activeTab === 'today' && (
          <>
            <DailyPlan 
              date={selectedDate}
              formattedDate={formatFullDateToArabic(selectedDate)}
              workoutType={getWorkoutTypeByDate(selectedDate)}
              dayIndex={dayIndex}
            />
            <WeeklyCalendar 
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
            />
          </>
        )}

        {activeTab === 'profile' && (
          <CreativeUserProfile />
        )}

        {activeTab === 'tips' && (
          <Card className="p-6 bg-gradient-to-br from-amber-50 to-yellow-100 dark:from-amber-900/20 dark:to-yellow-800/20 border-2 border-amber-200">
            <CardContent>
              <div className="text-center mb-6">
                <Lightbulb className="h-12 w-12 text-amber-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-amber-800 dark:text-amber-300 mb-2">نصائح ذكية للياقة البدنية</h2>
                <p className="text-amber-600 dark:text-amber-400">نصائح عملية لتحقيق أفضل النتائج بأقل التكاليف</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "اشرب الماء قبل كل وجبة بـ30 دقيقة لتحسين الهضم وزيادة الشبع",
                  "استخدم العبوات الكبيرة للبروتين والكربوهيدرات لتوفير المال",
                  "اجعل وجبة الإفطار أكبر وجبة في اليوم لزيادة معدل الحرق",
                  "استخدم التمارين المنزلية 3 أيام والجيم يومين لتوفير الاشتراك",
                  "اشتري الخضار الموسمية المحلية لتوفير 40% من التكلفة",
                  "استخدم البيض والتونة كمصدر بروتين اقتصادي وعالي الجودة"
                ].map((tip, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-amber-200 shadow-sm">
                    <div className="flex items-start space-x-3 space-x-reverse">
                      <Zap className="h-5 w-5 text-amber-500 mt-1 flex-shrink-0" />
                      <p className="text-gray-700 dark:text-gray-300 text-sm">{tip}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'progress' && (
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-800/20 border-2 border-purple-200">
            <CardContent>
              <div className="text-center mb-6">
                <Activity className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-purple-800 dark:text-purple-300 mb-2">متابعة التقدم</h2>
                <p className="text-purple-600 dark:text-purple-400">تتبع إنجازاتك والتقدم المحقق</p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-purple-200 text-center">
                  <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                  <h3 className="font-bold text-purple-800 dark:text-purple-300">الأهداف المحققة</h3>
                  <p className="text-2xl font-bold text-purple-600">{Math.floor(progress)}%</p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-purple-200 text-center">
                  <Calendar className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <h3 className="font-bold text-purple-800 dark:text-purple-300">أيام التمرين</h3>
                  <p className="text-2xl font-bold text-purple-600">12</p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-purple-200 text-center">
                  <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <h3 className="font-bold text-purple-800 dark:text-purple-300">النشاط الأسبوعي</h3>
                  <p className="text-2xl font-bold text-purple-600">85%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'nutrition' && (
          <PersonalizedNutritionSystem 
            onBack={() => setActiveTab('today')}
          />
        )}

        {activeTab === 'details' && (
          <DetailedPlan 
            type="meal"
            dayIndex={dayIndex}
            onBack={() => setActiveTab('today')}
          />
        )}
      </div>
      </div>
    </div>
  );
}