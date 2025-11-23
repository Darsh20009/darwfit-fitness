import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useLanguage } from "../context/LanguageContext";
import DailyPlan from "../components/dashboard/DailyPlan";
import WeeklyCalendar from "../components/dashboard/WeeklyCalendar";
import DetailedPlan from "../components/dashboard/DetailedPlan";
import CreativeUserProfile from "../components/CreativeUserProfile";
import { getDay } from "date-fns";
import { formatFullDateToArabic, getWorkoutTypeByDate, calculateRemainingDays } from "../lib/dates";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  ChefHat,
  Target,
  Flame,
  BarChart3,
  Apple,
  Dumbbell as Weights,
  TrendingDown,
  Smile
} from "lucide-react";
import PersonalizedNutritionSystem from "@/components/PersonalizedNutritionSystem";
import YousefWorkoutComponent from "@/components/YousefWorkoutComponent";

export default function DashboardPage() {
  const { username, subscriptionId, subscriptionEndDate } = useAuth();
  const { t, language } = useLanguage();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [dayIndex, setDayIndex] = useState(getDay(new Date()));
  const [progress, setProgress] = useState(65);
  const [activeTab, setActiveTab] = useState('today');
  const [calorieIntake, setCalorieIntake] = useState(1850);
  const [calorieGoal] = useState(2500);
  const [water, setWater] = useState(6);
  const [steps, setSteps] = useState(8342);

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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 sm:py-8">
      {/* Dashboard Header with Stats */}
      <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 dark:from-green-900/30 dark:to-emerald-900/30 p-4 md:p-6 rounded-lg mb-8 shadow-sm border border-green-200 dark:border-green-700">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
          <div className="text-center md:text-right">
            <h2 className="text-2xl md:text-3xl font-bold">
              {t.dashboard.welcome} <span className="text-green-600 dark:text-green-400">{username}</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base mt-1">
              {t.dashboard.yourPlan}
            </p>
          </div>

          <div className="flex flex-col gap-2 items-center md:items-end">
            <Badge className="bg-green-600 text-white px-3 py-1.5 text-sm flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {t.dashboard.activeSubscription} {subscriptionEndDate}
            </Badge>
            <Badge variant="outline" className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700 px-3 py-1.5 text-sm">
              <Trophy className="h-4 w-4 ml-2" />
              {t.dashboard.subscriptionNumber}: {subscriptionId}
            </Badge>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {/* Overall Progress */}
          <Card className="bg-white dark:bg-gray-800 border-green-200 dark:border-green-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">{t.dashboard.overallProgress}</h3>
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <p className="text-2xl font-bold text-green-600">{progress}%</p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
              </div>
            </CardContent>
          </Card>

          {/* Total Exercises */}
          <Card className="bg-white dark:bg-gray-800 border-blue-200 dark:border-blue-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">{t.dashboard.totalExercises}</h3>
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                  <Weights className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <p className="text-2xl font-bold text-blue-600">78</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">+5 هذا الأسبوع</p>
            </CardContent>
          </Card>

          {/* Remaining Days */}
          <Card className={`bg-white dark:bg-gray-800 border-2 ${remainingDays > 30 ? 'border-amber-200 dark:border-amber-700' : remainingDays > 7 ? 'border-orange-200 dark:border-orange-700' : 'border-red-200 dark:border-red-700'}`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">{t.dashboard.remainingDays}</h3>
                <div className={`p-2 rounded-full ${remainingDays > 30 ? 'bg-amber-100 dark:bg-amber-900/30' : remainingDays > 7 ? 'bg-orange-100 dark:bg-orange-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
                  <Clock className={`h-5 w-5 ${remainingDays > 30 ? 'text-amber-600' : remainingDays > 7 ? 'text-orange-600' : 'text-red-600'}`} />
                </div>
              </div>
              <p className={`text-2xl font-bold ${remainingDays > 30 ? 'text-amber-600' : remainingDays > 7 ? 'text-orange-600' : 'text-red-600'}`}>
                {remainingDays} {language === 'ar' ? 'يوم' : 'days'}
              </p>
            </CardContent>
          </Card>

          {/* Calories Goal */}
          <Card className="bg-white dark:bg-gray-800 border-purple-200 dark:border-purple-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">{t.dashboard.caloriesGoal}</h3>
                <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full">
                  <Flame className="h-5 w-5 text-purple-600" />
                </div>
              </div>
              <p className="text-2xl font-bold text-purple-600">{calorieIntake}/{calorieGoal}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{Math.round((calorieIntake/calorieGoal)*100)}% من الهدف</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Today's Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 mt-8">
        {/* Water Intake */}
        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700 text-center">
          <CardContent className="p-4">
            <div className="text-2xl mb-1">💧</div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">الماء</h3>
            <p className="text-lg font-bold text-blue-600">{water}/8</p>
            <div className="mt-2 h-1 bg-blue-200 dark:bg-blue-800 rounded">
              <div className="h-1 bg-blue-600 rounded" style={{ width: `${(water/8)*100}%` }}></div>
            </div>
          </CardContent>
        </Card>

        {/* Calories */}
        <Card className="bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-700 text-center">
          <CardContent className="p-4">
            <div className="text-2xl mb-1">🔥</div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">السعرات</h3>
            <p className="text-lg font-bold text-orange-600">{calorieIntake}</p>
            <p className="text-xs text-gray-500">من {calorieGoal}</p>
          </CardContent>
        </Card>

        {/* Steps */}
        <Card className="bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-700 text-center">
          <CardContent className="p-4">
            <div className="text-2xl mb-1">👟</div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">خطواتك</h3>
            <p className="text-lg font-bold text-emerald-600">{steps.toLocaleString()}</p>
            <p className="text-xs text-gray-500">10K هدف</p>
          </CardContent>
        </Card>

        {/* Mood/Progress */}
        <Card className="bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-700 text-center">
          <CardContent className="p-4">
            <div className="text-2xl mb-1">😊</div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">حالتك</h3>
            <p className="text-lg font-bold text-pink-600">ممتازة</p>
            <p className="text-xs text-gray-500">+45%</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content with Tabs */}
      <div className="space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 mb-6">
          <Button 
            variant={activeTab === 'today' ? 'default' : 'outline'}
            className={`w-full h-auto py-3 px-2 flex flex-col items-center justify-center gap-1 rounded-lg transition-all ${activeTab === 'today' ? 'bg-blue-600 text-white' : 'border-blue-200 text-blue-600 dark:border-blue-700 dark:text-blue-400'}`}
            onClick={() => setActiveTab('today')}
            data-testid="tab-today"
          >
            <Calendar className="h-5 w-5" />
            <span className="text-xs font-semibold">{language === 'ar' ? 'اليوم' : 'Today'}</span>
          </Button>

          <Button 
            variant={activeTab === 'profile' ? 'default' : 'outline'}
            className={`w-full h-auto py-3 px-2 flex flex-col items-center justify-center gap-1 rounded-lg transition-all ${activeTab === 'profile' ? 'bg-green-600 text-white' : 'border-green-200 text-green-600 dark:border-green-700 dark:text-green-400'}`}
            onClick={() => setActiveTab('profile')}
            data-testid="tab-profile"
          >
            <User className="h-5 w-5" />
            <span className="text-xs font-semibold">{language === 'ar' ? 'الملف' : 'Profile'}</span>
          </Button>

          <Button 
            variant={activeTab === 'nutrition' ? 'default' : 'outline'}
            className={`w-full h-auto py-3 px-2 flex flex-col items-center justify-center gap-1 rounded-lg transition-all ${activeTab === 'nutrition' ? 'bg-emerald-600 text-white' : 'border-emerald-200 text-emerald-600 dark:border-emerald-700 dark:text-emerald-400'}`}
            onClick={() => setActiveTab('nutrition')}
            data-testid="tab-nutrition"
          >
            <ChefHat className="h-5 w-5" />
            <span className="text-xs font-semibold">{language === 'ar' ? 'التغذية' : 'Nutrition'}</span>
          </Button>

          <Button 
            variant={activeTab === 'tips' ? 'default' : 'outline'}
            className={`w-full h-auto py-3 px-2 flex flex-col items-center justify-center gap-1 rounded-lg transition-all ${activeTab === 'tips' ? 'bg-amber-600 text-white' : 'border-amber-200 text-amber-600 dark:border-amber-700 dark:text-amber-400'}`}
            onClick={() => setActiveTab('tips')}
            data-testid="tab-tips"
          >
            <Lightbulb className="h-5 w-5" />
            <span className="text-xs font-semibold">{language === 'ar' ? 'النصائح' : 'Tips'}</span>
          </Button>

          <Button 
            variant={activeTab === 'progress' ? 'default' : 'outline'}
            className={`w-full h-auto py-3 px-2 flex flex-col items-center justify-center gap-1 rounded-lg transition-all ${activeTab === 'progress' ? 'bg-purple-600 text-white' : 'border-purple-200 text-purple-600 dark:border-purple-700 dark:text-purple-400'}`}
            onClick={() => setActiveTab('progress')}
            data-testid="tab-progress"
          >
            <TrendingUp className="h-5 w-5" />
            <span className="text-xs font-semibold">{language === 'ar' ? 'التقدم' : 'Progress'}</span>
          </Button>

          <Button 
            variant={activeTab === 'details' ? 'default' : 'outline'}
            className={`w-full h-auto py-3 px-2 flex flex-col items-center justify-center gap-1 rounded-lg transition-all ${activeTab === 'details' ? 'bg-orange-600 text-white' : 'border-orange-200 text-orange-600 dark:border-orange-700 dark:text-orange-400'}`}
            onClick={() => setActiveTab('details')}
            data-testid="tab-details"
          >
            <Target className="h-5 w-5" />
            <span className="text-xs font-semibold">{language === 'ar' ? 'التفاصيل' : 'Details'}</span>
          </Button>
        </div>

        {/* Tab Content */}
        {activeTab === 'today' && (
          <>
            {username === 'يوسف درويش' ? (
              <YousefWorkoutComponent />
            ) : (
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
          </>
        )}

        {activeTab === 'profile' && (
          <CreativeUserProfile />
        )}

        {activeTab === 'tips' && (
          <Card className="p-4 sm:p-6 bg-gradient-to-br from-amber-50 to-yellow-100 dark:from-amber-900/20 dark:to-yellow-800/20 border-amber-200 dark:border-amber-700">
            <CardContent>
              <div className="text-center mb-6">
                <Lightbulb className="h-10 sm:h-12 w-10 sm:w-12 text-amber-600 mx-auto mb-3 sm:mb-4" />
                <h2 className="text-xl sm:text-2xl font-bold text-amber-800 dark:text-amber-300 mb-2">
                  {language === 'ar' ? 'نصائح ذكية' : 'Smart Tips'}
                </h2>
                <p className="text-sm sm:text-base text-amber-600 dark:text-amber-400">
                  {language === 'ar' ? 'نصائح عملية لتحقيق أفضل النتائج' : 'Practical tips for best results'}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                {[
                  { ar: "اشرب الماء قبل كل وجبة بـ30 دقيقة", en: "Drink water 30 minutes before meals" },
                  { ar: "استخدم العبوات الكبيرة للبروتين", en: "Use bulk protein sources" },
                  { ar: "اجعل الإفطار أكبر وجبة في اليوم", en: "Make breakfast your biggest meal" },
                  { ar: "تمارين منزلية 3 أيام وجيم يومين", en: "3 home + 2 gym days per week" },
                  { ar: "اشتري الخضار الموسمية المحلية", en: "Buy seasonal local vegetables" },
                  { ar: "البيض والتونة مصدر بروتين اقتصادي", en: "Eggs and tuna for cheap protein" }
                ].map((tip, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg border border-amber-200 dark:border-amber-700 shadow-sm">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <Zap className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700 dark:text-gray-300 text-sm">{language === 'ar' ? tip.ar : tip.en}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'progress' && (
          <Card className="p-4 sm:p-6 bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-800/20 border-purple-200 dark:border-purple-700">
            <CardContent>
              <div className="text-center mb-6">
                <Activity className="h-10 sm:h-12 w-10 sm:w-12 text-purple-600 mx-auto mb-3 sm:mb-4" />
                <h2 className="text-xl sm:text-2xl font-bold text-purple-800 dark:text-purple-300 mb-2">
                  {t.dashboard.progress}
                </h2>
                <p className="text-sm sm:text-base text-purple-600 dark:text-purple-400">
                  {language === 'ar' ? 'تتبع إنجازاتك والتقدم المحقق' : 'Track your achievements'}
                </p>
              </div>

              <div className="grid sm:grid-cols-3 gap-3 sm:gap-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-purple-200 dark:border-purple-700 text-center">
                  <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                  <h3 className="font-bold text-purple-800 dark:text-purple-300 text-sm sm:text-base">
                    {language === 'ar' ? 'الأهداف المحققة' : 'Goals Achieved'}
                  </h3>
                  <p className="text-2xl font-bold text-purple-600 mt-2">{Math.floor(progress)}%</p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-purple-200 dark:border-purple-700 text-center">
                  <Calendar className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <h3 className="font-bold text-purple-800 dark:text-purple-300 text-sm sm:text-base">
                    {language === 'ar' ? 'أيام التمرين' : 'Training Days'}
                  </h3>
                  <p className="text-2xl font-bold text-purple-600 mt-2">12</p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-purple-200 dark:border-purple-700 text-center">
                  <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <h3 className="font-bold text-purple-800 dark:text-purple-300 text-sm sm:text-base">
                    {language === 'ar' ? 'النشاط الأسبوعي' : 'Weekly Activity'}
                  </h3>
                  <p className="text-2xl font-bold text-purple-600 mt-2">85%</p>
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