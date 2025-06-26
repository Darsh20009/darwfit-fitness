import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  Target, 
  Calendar, 
  Award, 
  Clock, 
  Zap, 
  Heart,
  Brain,
  Shield,
  Flame,
  CheckCircle2,
  TrendingUp,
  Smile,
  Coffee,
  Cigarette,
  Gamepad2,
  Smartphone,
  Pizza,
  Candy
} from "lucide-react";

interface HabitData {
  id: string;
  name: string;
  icon: any;
  color: string;
  description: string;
  quitDate: string;
  dailyGoal: string;
  weeklyGoal: string;
  benefits: string[];
  tips: string[];
}

interface DailyTask {
  id: string;
  title: string;
  completed: boolean;
  points: number;
}

export default function QuitPage() {
  const [, setLocation] = useLocation();
  const [selectedHabit, setSelectedHabit] = useState<string | null>(null);
  const [quitDays, setQuitDays] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [dailyTasks, setDailyTasks] = useState<DailyTask[]>([
    { id: '1', title: 'شرب 8 أكواب ماء', completed: false, points: 10 },
    { id: '2', title: 'تمرين 30 دقيقة', completed: false, points: 20 },
    { id: '3', title: 'تأمل 10 دقائق', completed: false, points: 15 },
    { id: '4', title: 'قراءة كتاب لمدة 20 دقيقة', completed: false, points: 15 },
    { id: '5', title: 'نوم 8 ساعات', completed: false, points: 25 }
  ]);

  const habitsData: HabitData[] = [
    {
      id: 'smoking',
      name: 'الإقلاع عن التدخين',
      icon: Cigarette,
      color: 'emerald',
      description: 'رحلة للتخلص من التدخين وتحسين صحة الرئتين والقلب',
      quitDate: '',
      dailyGoal: 'يوم واحد بدون تدخين',
      weeklyGoal: '7 أيام متتالية بدون تدخين',
      benefits: ['تحسن التنفس', 'صحة القلب', 'توفير المال', 'رائحة أفضل'],
      tips: ['اشرب الماء كثيراً', 'مارس الرياضة', 'تجنب المحفزات', 'ابحث عن دعم الأصدقاء']
    },
    {
      id: 'gaming',
      name: 'تنظيم وقت الألعاب',
      icon: Gamepad2,
      color: 'green',
      description: 'إدارة وقت الألعاب لحياة أكثر توازناً وإنتاجية',
      quitDate: '',
      dailyGoal: 'أقل من ساعتين ألعاب يومياً',
      weeklyGoal: 'عدم تجاوز 10 ساعات أسبوعياً',
      benefits: ['وقت أكثر للعائلة', 'تحسن النوم', 'نشاط بدني أكبر', 'تركيز أفضل'],
      tips: ['ضع منبه للوقت', 'ابحث عن هوايات أخرى', 'اقضي وقت مع الأصدقاء', 'مارس الرياضة']
    },
    {
      id: 'social_media',
      name: 'تقليل وسائل التواصل',
      icon: Smartphone,
      color: 'teal',
      description: 'تقليل استخدام وسائل التواصل الاجتماعي لحياة أكثر هدوءاً',
      quitDate: '',
      dailyGoal: 'أقل من ساعة يومياً',
      weeklyGoal: 'يوم واحد بدون وسائل التواصل',
      benefits: ['تركيز أكبر', 'قلق أقل', 'علاقات حقيقية', 'إنتاجية أعلى'],
      tips: ['أزل التطبيقات', 'اقرأ كتاباً', 'تواصل شخصياً', 'مارس هواية جديدة']
    },
    {
      id: 'junk_food',
      name: 'تجنب الطعام المضر',
      icon: Pizza,
      color: 'emerald',
      description: 'التوقف عن تناول الطعام المصنع والوجبات السريعة',
      quitDate: '',
      dailyGoal: 'وجبات صحية فقط',
      weeklyGoal: 'عدم تناول وجبات سريعة',
      benefits: ['فقدان الوزن', 'طاقة أكثر', 'صحة أفضل', 'مزاج مستقر'],
      tips: ['حضر وجبات صحية', 'اشرب ماء قبل الأكل', 'تسوق بقائمة', 'تناول فواكه كوجبة خفيفة']
    },
    {
      id: 'sugar',
      name: 'تقليل السكر',
      icon: Candy,
      color: 'green',
      description: 'تقليل استهلاك السكر المضاف والحلويات',
      quitDate: '',
      dailyGoal: 'عدم تناول حلويات',
      weeklyGoal: 'تقليل السكر بنسبة 50%',
      benefits: ['استقرار الطاقة', 'صحة الأسنان', 'وزن صحي', 'تحسن المزاج'],
      tips: ['اقرأ الملصقات', 'استبدل بالفواكه', 'اشرب شاي أخضر', 'تناول بروتين أكثر']
    },
    {
      id: 'caffeine',
      name: 'تنظيم الكافيين',
      icon: Coffee,
      color: 'teal',
      description: 'تقليل استهلاك الكافيين لنوم أفضل وقلق أقل',
      quitDate: '',
      dailyGoal: 'كوب واحد فقط صباحاً',
      weeklyGoal: 'عدم شرب كافيين بعد 2 ظهراً',
      benefits: ['نوم أفضل', 'قلق أقل', 'اعتماد أقل', 'طاقة طبيعية'],
      tips: ['قلل تدريجياً', 'اشرب ماء أكثر', 'نم مبكراً', 'مارس الرياضة']
    }
  ];

  useEffect(() => {
    // محاكاة البيانات المحفوظة
    const savedData = localStorage.getItem('quitPageData');
    if (savedData) {
      const data = JSON.parse(savedData);
      setQuitDays(data.quitDays || 0);
      setCurrentStreak(data.currentStreak || 0);
      setTotalPoints(data.totalPoints || 0);
      setSelectedHabit(data.selectedHabit || null);
      setDailyTasks(data.dailyTasks || dailyTasks);
    }
  }, []);

  const saveData = () => {
    const data = {
      quitDays,
      currentStreak,
      totalPoints,
      selectedHabit,
      dailyTasks
    };
    localStorage.setItem('quitPageData', JSON.stringify(data));
  };

  const selectHabit = (habitId: string) => {
    setSelectedHabit(habitId);
    setQuitDays(1);
    setCurrentStreak(1);
    saveData();
  };

  const completeTask = (taskId: string) => {
    setDailyTasks(prev => prev.map(task => {
      if (task.id === taskId && !task.completed) {
        setTotalPoints(points => points + task.points);
        return { ...task, completed: true };
      }
      return task;
    }));
    saveData();
  };

  const addDay = () => {
    setQuitDays(prev => prev + 1);
    setCurrentStreak(prev => prev + 1);
    // إعادة تعيين المهام اليومية
    setDailyTasks(prev => prev.map(task => ({ ...task, completed: false })));
    saveData();
  };

  const resetStreak = () => {
    setCurrentStreak(0);
    saveData();
  };

  const selectedHabitData = selectedHabit ? habitsData.find(h => h.id === selectedHabit) : null;
  const completedTasks = dailyTasks.filter(task => task.completed).length;
  const progressPercentage = (completedTasks / dailyTasks.length) * 100;

  if (!selectedHabit) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-gray-900 dark:via-emerald-900 dark:to-green-900">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent mb-4">
                🌟 صفحة الإقلاع
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                ابدأ رحلتك نحو حياة أفضل وأكثر صحة
              </p>
              <div className="flex justify-center space-x-4 mb-6">
                <Badge className="px-4 py-2 bg-emerald-100 text-emerald-700 border-emerald-300">🎯 أهداف واضحة</Badge>
                <Badge className="px-4 py-2 bg-green-100 text-green-700 border-green-300">📊 تتبع التقدم</Badge>
                <Badge className="px-4 py-2 bg-teal-100 text-teal-700 border-teal-300">🏆 مكافآت يومية</Badge>
              </div>
            </div>

            {/* Habits Selection */}
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-emerald-200 dark:border-emerald-700 shadow-2xl">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30">
                <CardTitle className="text-2xl text-center text-emerald-700 dark:text-emerald-300">
                  🎯 اختر العادة التي تريد تغييرها
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {habitsData.map((habit) => {
                    const IconComponent = habit.icon;
                    return (
                      <Card 
                        key={habit.id}
                        className={`cursor-pointer transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl border-2 border-transparent hover:border-emerald-300 bg-gradient-to-br from-white to-${habit.color}-50 dark:from-gray-800 dark:to-${habit.color}-900/20`}
                        onClick={() => selectHabit(habit.id)}
                      >
                        <CardHeader className="text-center pb-4">
                          <div className="relative mb-4">
                            <div className={`w-16 h-16 mx-auto bg-gradient-to-br from-${habit.color}-500 to-${habit.color}-600 rounded-full flex items-center justify-center shadow-lg`}>
                              <IconComponent className="h-8 w-8 text-white" />
                            </div>
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">❌</span>
                            </div>
                          </div>
                          <CardTitle className={`text-lg text-${habit.color}-700 dark:text-${habit.color}-300`}>
                            {habit.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 dark:text-gray-400 text-sm text-center mb-4">
                            {habit.description}
                          </p>
                          <div className="space-y-2">
                            <div className={`bg-${habit.color}-50 dark:bg-${habit.color}-900/20 p-2 rounded text-center`}>
                              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">الهدف اليومي:</span>
                              <p className={`text-sm font-bold text-${habit.color}-700 dark:text-${habit.color}-300`}>
                                {habit.dailyGoal}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Back Button */}
            <div className="mt-8 text-center">
              <Button 
                onClick={() => setLocation("/")}
                variant="outline"
                className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-300 dark:hover:bg-emerald-900/20"
              >
                <ArrowLeft className="ml-2 h-5 w-5" />
                العودة للصفحة الرئيسية
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-gray-900 dark:via-emerald-900 dark:to-green-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent mb-4">
              🌟 رحلة الإقلاع
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {selectedHabitData?.name} - معاً نحو حياة أفضل
            </p>
          </div>

          {/* Progress Overview */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-emerald-200 dark:border-emerald-700">
              <CardHeader className="text-center pb-2">
                <Calendar className="h-8 w-8 mx-auto text-emerald-600 mb-2" />
                <CardTitle className="text-emerald-600 text-sm">أيام الإقلاع</CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-0">
                <div className="text-3xl font-bold text-emerald-700 dark:text-emerald-400">
                  {quitDays}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">يوماً</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-green-200 dark:border-green-700">
              <CardHeader className="text-center pb-2">
                <Flame className="h-8 w-8 mx-auto text-green-600 mb-2" />
                <CardTitle className="text-green-600 text-sm">الشريط الحالي</CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-0">
                <div className="text-3xl font-bold text-green-700 dark:text-green-400">
                  {currentStreak}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">يوماً متتالياً</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-teal-200 dark:border-teal-700">
              <CardHeader className="text-center pb-2">
                <Target className="h-8 w-8 mx-auto text-teal-600 mb-2" />
                <CardTitle className="text-teal-600 text-sm">النقاط المكتسبة</CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-0">
                <div className="text-3xl font-bold text-teal-700 dark:text-teal-400">
                  {totalPoints}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">نقطة</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-emerald-200 dark:border-emerald-700">
              <CardHeader className="text-center pb-2">
                <Award className="h-8 w-8 mx-auto text-emerald-600 mb-2" />
                <CardTitle className="text-emerald-600 text-sm">المهام اليوم</CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-0">
                <div className="text-3xl font-bold text-emerald-700 dark:text-emerald-400">
                  {completedTasks}/{dailyTasks.length}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">مهمة</p>
              </CardContent>
            </Card>
          </div>

          {/* Current Day Progress */}
          <Card className="mb-8 bg-gradient-to-r from-emerald-500 to-green-600 text-white">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-2xl">🌟 اليوم {quitDays}</CardTitle>
                  <p className="text-emerald-100">تقدمك اليومي</p>
                </div>
                <Badge className="bg-white text-emerald-600 px-4 py-2 text-lg">
                  {Math.round(progressPercentage)}% مكتمل
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Progress value={progressPercentage} className="mb-4" />
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-lg font-semibold mb-2">🎯 الهدف اليومي</h4>
                  <p className="text-emerald-100">{selectedHabitData?.dailyGoal}</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">📅 الهدف الأسبوعي</h4>
                  <p className="text-emerald-100">{selectedHabitData?.weeklyGoal}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Daily Tasks */}
          <Card className="mb-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-emerald-200 dark:border-emerald-700">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-emerald-600">📋 المهام اليومية</CardTitle>
                <Badge className="bg-emerald-100 text-emerald-700 border-emerald-300">
                  اليوم {quitDays}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dailyTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`flex justify-between items-center p-4 rounded-lg transition-all duration-300 ${
                      task.completed
                        ? 'bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-500'
                        : 'bg-gray-50 dark:bg-gray-700/50 hover:bg-emerald-50 dark:hover:bg-emerald-900/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        task.completed ? 'bg-emerald-500' : 'bg-gray-300'
                      }`}>
                        {task.completed ? (
                          <CheckCircle2 className="h-6 w-6 text-white" />
                        ) : (
                          <Clock className="h-6 w-6 text-gray-600" />
                        )}
                      </div>
                      <div>
                        <h4 className={`font-medium ${task.completed ? 'text-emerald-700' : 'text-gray-700 dark:text-gray-300'}`}>
                          {task.title}
                        </h4>
                        <p className="text-sm text-gray-500">+{task.points} نقطة</p>
                      </div>
                    </div>
                    
                    {!task.completed && (
                      <Button
                        onClick={() => completeTask(task.id)}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white"
                        size="sm"
                      >
                        <CheckCircle2 className="h-4 w-4 ml-1" />
                        إكمال
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex justify-center gap-4">
                <Button
                  onClick={addDay}
                  className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white"
                >
                  <TrendingUp className="h-4 w-4 ml-2" />
                  إضافة يوم جديد
                </Button>
                
                <Button
                  onClick={resetStreak}
                  variant="outline"
                  className="border-red-300 text-red-600 hover:bg-red-50"
                >
                  إعادة تعيين الشريط
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Benefits & Tips */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-emerald-200 dark:border-emerald-700">
              <CardHeader>
                <CardTitle className="text-emerald-600 flex items-center">
                  <Heart className="h-6 w-6 ml-2" />
                  الفوائد المتوقعة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedHabitData?.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                      <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">✓</span>
                      </div>
                      <span className="text-emerald-700 dark:text-emerald-300 font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-green-200 dark:border-green-700">
              <CardHeader>
                <CardTitle className="text-green-600 flex items-center">
                  <Brain className="h-6 w-6 ml-2" />
                  نصائح للنجاح
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedHabitData?.tips.map((tip, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <Zap className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-green-700 dark:text-green-300 font-medium">{tip}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Motivational Quote */}
          <Card className="mb-8 bg-gradient-to-r from-teal-400 via-emerald-400 to-green-400 text-white text-center">
            <CardContent className="p-8">
              <div className="flex justify-center items-center mb-4">
                <Smile className="h-12 w-12 animate-bounce" />
              </div>
              <h3 className="text-2xl font-bold mb-4">💪 أنت أقوى مما تعتقد!</h3>
              <p className="text-lg mb-4">
                "النجاح ليس نهائياً، والفشل ليس قاتلاً، ما يهم هو الشجاعة للاستمرار"
              </p>
              <div className="flex justify-center gap-2">
                <Shield className="h-6 w-6" />
                <span className="font-semibold">معاً نحو حياة أفضل</span>
                <Shield className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>

          {/* Back Button */}
          <div className="text-center">
            <Button 
              onClick={() => setSelectedHabit(null)}
              variant="outline"
              className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-300 dark:hover:bg-emerald-900/20 ml-4"
            >
              تغيير العادة
            </Button>
            
            <Button 
              onClick={() => setLocation("/")}
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900/20"
            >
              <ArrowLeft className="ml-2 h-5 w-5" />
              العودة للصفحة الرئيسية
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}