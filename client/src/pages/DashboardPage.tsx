
import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import DailyPlan from "../components/dashboard/DailyPlan";
import WeeklyCalendar from "../components/dashboard/WeeklyCalendar";
import DetailedPlan from "../components/dashboard/DetailedPlan";
import { getDay } from "date-fns";
import { formatFullDateToArabic, getWorkoutTypeByDate, calculateRemainingDays } from "../lib/dates";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Trophy, 
  TrendingUp, 
  Clock, 
  Activity, 
  Heart,
  Target,
  Flame,
  Award,
  Zap,
  Star,
  Crown,
  ChevronRight,
  Play,
  Pause,
  BarChart3,
  Sparkles,
  Gift,
  CheckCircle2,
  Timer,
  Users,
  MessageSquare,
  Camera,
  Dumbbell,
  Utensils
} from "lucide-react";

export default function DashboardPage() {
  const { username, subscriptionId, subscriptionEndDate } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [dayIndex, setDayIndex] = useState(getDay(new Date()));
  const [progress, setProgress] = useState(65);
  const [currentStreak, setCurrentStreak] = useState(12);
  const [totalWorkouts, setTotalWorkouts] = useState(78);
  const [caloriesBurned, setCaloriesBurned] = useState(15420);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  
  // Calculate remaining subscription days
  const remainingDays = calculateRemainingDays(subscriptionEndDate || "");

  // Motivational quotes
  const motivationalQuotes = [
    "💪 النجاح هو مجموع الجهود الصغيرة المتكررة يومياً",
    "🔥 كل يوم تتمرن فيه هو استثمار في مستقبلك",
    "⭐ الألم اليوم هو القوة غداً",
    "🚀 لا تتوقف عندما تتعب، توقف عندما تنتهي",
    "💎 جسمك يستطيع، عقلك هو من تحتاج لإقناعه"
  ];

  const [currentQuote, setCurrentQuote] = useState(motivationalQuotes[0]);

  useEffect(() => {
    setDayIndex(getDay(selectedDate));
  }, [selectedDate]);

  // Timer functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        if (timerSeconds === 59) {
          setTimerMinutes(prev => prev + 1);
          setTimerSeconds(0);
        } else {
          setTimerSeconds(prev => prev + 1);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  // Change quote every 10 seconds
  useEffect(() => {
    const quoteInterval = setInterval(() => {
      const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
      setCurrentQuote(randomQuote);
    }, 10000);
    return () => clearInterval(quoteInterval);
  }, []);

  const handleWorkoutComplete = () => {
    setShowCelebration(true);
    setTotalWorkouts(prev => prev + 1);
    setTimeout(() => setShowCelebration(false), 3000);
  };

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimerMinutes(0);
    setTimerSeconds(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      <div className="container mx-auto px-4 py-8">
        {/* Celebration Effect */}
        {showCelebration && (
          <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
            <div className="animate-bounce text-6xl">🎉 أحسنت! 🎉</div>
          </div>
        )}

        <div className="max-w-7xl mx-auto space-y-8">
          {/* Hero Header with Animation */}
          <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-8 rounded-3xl shadow-2xl overflow-hidden">
            {/* Floating background elements */}
            <div className="absolute top-4 left-8 w-16 h-16 bg-white/10 rounded-full animate-pulse"></div>
            <div className="absolute bottom-4 right-12 w-12 h-12 bg-white/20 rounded-full animate-bounce"></div>
            <div className="absolute top-1/2 right-4 w-8 h-8 bg-yellow-400/30 rounded-full animate-ping"></div>
            
            <div className="relative z-10 text-center text-white">
              <div className="flex justify-center items-center mb-4">
                <Crown className="h-12 w-12 text-yellow-400 ml-4 animate-bounce" />
                <h1 className="text-4xl md:text-6xl font-bold">
                  مرحباً <span className="text-yellow-400">{username}</span>
                </h1>
                <Crown className="h-12 w-12 text-yellow-400 mr-4 animate-bounce" />
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-6 max-w-3xl mx-auto">
                <p className="text-xl md:text-2xl font-medium animate-pulse">
                  {currentQuote}
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Badge className="bg-yellow-500/20 text-yellow-100 border-yellow-400 px-4 py-2 text-lg">
                  <Calendar className="h-5 w-5 ml-2" />
                  اشتراك فعال حتى: {subscriptionEndDate}
                </Badge>
                <Badge className="bg-green-500/20 text-green-100 border-green-400 px-4 py-2 text-lg">
                  <Trophy className="h-5 w-5 ml-2" />
                  رقم الاشتراك: {subscriptionId}
                </Badge>
              </div>
            </div>
          </div>

          {/* Enhanced Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-3">
                  <div className="bg-white/20 p-3 rounded-full">
                    <TrendingUp className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-2">التقدم الشامل</h3>
                <p className="text-3xl font-bold">{progress}%</p>
                <Progress value={progress} className="mt-2 bg-white/20" />
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-3">
                  <div className="bg-white/20 p-3 rounded-full">
                    <Flame className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-2">النشاط المتواصل</h3>
                <p className="text-3xl font-bold">{currentStreak}</p>
                <p className="text-sm opacity-80">يوماً</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-3">
                  <div className="bg-white/20 p-3 rounded-full">
                    <Activity className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-2">إجمالي التمارين</h3>
                <p className="text-3xl font-bold">{totalWorkouts}</p>
                <p className="text-sm opacity-80">تمرين</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-3">
                  <div className="bg-white/20 p-3 rounded-full">
                    <Zap className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-2">السعرات المحروقة</h3>
                <p className="text-3xl font-bold">{caloriesBurned.toLocaleString()}</p>
                <p className="text-sm opacity-80">سعرة</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-500 to-orange-500 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-3">
                  <div className="bg-white/20 p-3 rounded-full">
                    <Clock className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-2">متبقي من الاشتراك</h3>
                <p className="text-3xl font-bold">
                  {remainingDays > 0 ? remainingDays : "0"}
                </p>
                <p className="text-sm opacity-80">يوماً</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-pink-500 to-rose-500 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-3">
                  <div className="bg-white/20 p-3 rounded-full">
                    <Heart className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-2">معدل التقييم</h3>
                <p className="text-3xl font-bold">ممتاز</p>
                <div className="flex justify-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Workout Timer Widget */}
          <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-center text-2xl flex items-center justify-center">
                <Timer className="h-8 w-8 ml-3" />
                ⏱️ مؤقت التمرين
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-6xl font-bold mb-6 font-mono">
                {String(timerMinutes).padStart(2, '0')}:{String(timerSeconds).padStart(2, '0')}
              </div>
              <div className="flex justify-center gap-4">
                <Button
                  onClick={toggleTimer}
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30 px-8 py-3 text-lg"
                >
                  {isTimerRunning ? <Pause className="h-5 w-5 ml-2" /> : <Play className="h-5 w-5 ml-2" />}
                  {isTimerRunning ? 'إيقاف' : 'بدء'}
                </Button>
                <Button
                  onClick={resetTimer}
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 px-8 py-3 text-lg"
                >
                  إعادة تعيين
                </Button>
                <Button
                  onClick={handleWorkoutComplete}
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 text-lg"
                >
                  <CheckCircle2 className="h-5 w-5 ml-2" />
                  إنهاء التمرين
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Tabs */}
          <Tabs defaultValue="today" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <TabsTrigger value="today" className="text-lg py-3">
                <Target className="h-5 w-5 ml-2" />
                خطة اليوم
              </TabsTrigger>
              <TabsTrigger value="calendar" className="text-lg py-3">
                <Calendar className="h-5 w-5 ml-2" />
                التقويم
              </TabsTrigger>
              <TabsTrigger value="stats" className="text-lg py-3">
                <BarChart3 className="h-5 w-5 ml-2" />
                الإحصائيات
              </TabsTrigger>
              <TabsTrigger value="social" className="text-lg py-3">
                <Users className="h-5 w-5 ml-2" />
                المجتمع
              </TabsTrigger>
            </TabsList>

            <TabsContent value="today" className="space-y-6">
              <DailyPlan 
                date={selectedDate}
                formattedDate={formatFullDateToArabic(selectedDate)}
                workoutType={getWorkoutTypeByDate(selectedDate)}
                dayIndex={dayIndex}
              />
            </TabsContent>

            <TabsContent value="calendar" className="space-y-6">
              <WeeklyCalendar 
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
              />
            </TabsContent>

            <TabsContent value="stats" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-blue-200 dark:border-blue-700">
                  <CardHeader>
                    <CardTitle className="text-2xl text-blue-600 flex items-center">
                      <BarChart3 className="h-6 w-6 ml-3" />
                      📊 إحصائيات الأسبوع
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>التمارين المكتملة</span>
                        <span className="font-bold text-green-600">5/7</span>
                      </div>
                      <Progress value={71} className="h-3" />
                      
                      <div className="flex justify-between items-center">
                        <span>الوجبات الصحية</span>
                        <span className="font-bold text-orange-600">18/21</span>
                      </div>
                      <Progress value={86} className="h-3" />
                      
                      <div className="flex justify-between items-center">
                        <span>شرب الماء</span>
                        <span className="font-bold text-blue-600">42/49</span>
                      </div>
                      <Progress value={86} className="h-3" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-purple-200 dark:border-purple-700">
                  <CardHeader>
                    <CardTitle className="text-2xl text-purple-600 flex items-center">
                      <Award className="h-6 w-6 ml-3" />
                      🏆 الإنجازات
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-lg">
                        <div className="flex items-center">
                          <div className="text-2xl ml-3">🔥</div>
                          <div>
                            <h4 className="font-bold">نشاط متواصل</h4>
                            <p className="text-sm text-gray-600">12 يوماً متتالياً</p>
                          </div>
                        </div>
                        <Badge className="bg-yellow-500">جديد!</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-100 to-green-200 rounded-lg">
                        <div className="flex items-center">
                          <div className="text-2xl ml-3">💪</div>
                          <div>
                            <h4 className="font-bold">محارب اللياقة</h4>
                            <p className="text-sm text-gray-600">50 تمرين مكتمل</p>
                          </div>
                        </div>
                        <CheckCircle2 className="h-6 w-6 text-green-600" />
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg">
                        <div className="flex items-center">
                          <div className="text-2xl ml-3">🥗</div>
                          <div>
                            <h4 className="font-bold">خبير التغذية</h4>
                            <p className="text-sm text-gray-600">100 وجبة صحية</p>
                          </div>
                        </div>
                        <CheckCircle2 className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="social" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-green-200 dark:border-green-700">
                  <CardHeader>
                    <CardTitle className="text-2xl text-green-600 flex items-center">
                      <Users className="h-6 w-6 ml-3" />
                      👥 أصدقاء اللياقة
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold ml-3">
                            أ
                          </div>
                          <div>
                            <h4 className="font-bold">أحمد السعيد</h4>
                            <p className="text-sm text-gray-600">أكمل تمرين الظهر</p>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">منذ 5 دقائق</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold ml-3">
                            س
                          </div>
                          <div>
                            <h4 className="font-bold">سارة محمد</h4>
                            <p className="text-sm text-gray-600">حققت هدف الخطوات اليومي</p>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">منذ 20 دقيقة</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-orange-200 dark:border-orange-700">
                  <CardHeader>
                    <CardTitle className="text-2xl text-orange-600 flex items-center">
                      <MessageSquare className="h-6 w-6 ml-3" />
                      💬 رسائل التحفيز
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-orange-100 to-red-100 p-4 rounded-lg">
                        <p className="font-medium text-orange-800">
                          "استمر في العمل الرائع! أنت على الطريق الصحيح لتحقيق أهدافك 💪"
                        </p>
                        <p className="text-sm text-orange-600 mt-2">- المدرب أحمد</p>
                      </div>
                      
                      <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-4 rounded-lg">
                        <p className="font-medium text-blue-800">
                          "لا تنس شرب الماء بكثرة اليوم، جسمك يحتاجه! 💧"
                        </p>
                        <p className="text-sm text-blue-600 mt-2">- أخصائية التغذية فاطمة</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-6 text-lg rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
              <Camera className="h-6 w-6 ml-2" />
              📷 تصوير التقدم
            </Button>
            
            <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-6 text-lg rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
              <Utensils className="h-6 w-6 ml-2" />
              🍽️ تسجيل وجبة
            </Button>
            
            <Button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white py-6 text-lg rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
              <Dumbbell className="h-6 w-6 ml-2" />
              💪 بدء تمرين
            </Button>
            
            <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-6 text-lg rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
              <MessageSquare className="h-6 w-6 ml-2" />
              💬 الدردشة
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
