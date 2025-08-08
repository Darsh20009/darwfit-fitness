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
  Candy,
  ChevronRight
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

interface QuestionnaireData {
  name: string;
  age: number;
  habit: string;
  severity: string;
  duration: string;
  triggers: string[];
  motivation: string;
  support: string[];
  previousAttempts: string;
  goals: string[];
}

interface GeneratedPlan {
  id: string;
  userData: QuestionnaireData;
  dailyTasks: string[];
  weeklyGoals: string[];
  tips: string[];
  motivationalMessages: string[];
  createdDate: string;
  duration: number; // بالأيام
}

interface TaskProgress {
  [day: number]: { [taskId: string]: boolean };
}

interface DayStatus {
  date: string;
  completed: boolean;
  tasksCompleted: number;
  totalTasks: number;
}

export default function QuitPage() {
  const [, setLocation] = useLocation();
  const [selectedHabit, setSelectedHabit] = useState<string | null>(null);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [questionnaireData, setQuestionnaireData] = useState<QuestionnaireData | null>(null);
  const [generatedPlan, setGeneratedPlan] = useState<GeneratedPlan | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [showTracker, setShowTracker] = useState(false);
  const [currentTrackingDay, setCurrentTrackingDay] = useState(1);
  const [taskProgress, setTaskProgress] = useState<TaskProgress>({});
  const [thirtyDayProgress, setThirtyDayProgress] = useState<DayStatus[]>([]);
  const [quitDays, setQuitDays] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [dailyTasks, setDailyTasks] = useState<DailyTask[]>([
    { id: '1', title: 'شرب 8 أكواب ماء 💧', completed: false, points: 10 },
    { id: '2', title: 'تمرين 30 دقيقة 🏃‍♂️', completed: false, points: 20 },
    { id: '3', title: 'تأمل 10 دقائق 🧘‍♂️', completed: false, points: 15 },
    { id: '4', title: 'قراءة كتاب لمدة 20 دقيقة 📚', completed: false, points: 15 },
    { id: '5', title: 'نوم 8 ساعات 😴', completed: false, points: 25 }
  ]);

  const questionnaire = [
    {
      question: "ما اسمك؟",
      type: "text",
      key: "name" as keyof QuestionnaireData
    },
    {
      question: "كم عمرك؟",
      type: "number",
      key: "age" as keyof QuestionnaireData
    },
    {
      question: "ما شدة تأثير هذه العادة على حياتك؟",
      type: "select",
      key: "severity" as keyof QuestionnaireData,
      options: ["خفيف", "متوسط", "شديد", "مدمر"]
    },
    {
      question: "منذ متى وأنت تمارس هذه العادة؟",
      type: "select",
      key: "duration" as keyof QuestionnaireData,
      options: ["أقل من سنة", "1-3 سنوات", "3-5 سنوات", "أكثر من 5 سنوات"]
    },
    {
      question: "ما هي أهم المحفزات التي تدفعك لهذه العادة؟ (اختر عدة خيارات)",
      type: "multiple",
      key: "triggers" as keyof QuestionnaireData,
      options: ["الملل", "التوتر", "الوحدة", "الإنترنت", "السهر", "الفراغ", "المشاكل"]
    },
    {
      question: "ما هو دافعك الأقوى للإقلاع؟",
      type: "textarea",
      key: "motivation" as keyof QuestionnaireData
    },
    {
      question: "من يمكنه مساعدتك في هذه الرحلة؟",
      type: "multiple",
      key: "support" as keyof QuestionnaireData,
      options: ["الأصدقاء", "الأهل", "المختص النفسي", "المجتمع الديني", "مجموعات الدعم", "أفضل الاعتماد على نفسي"]
    },
    {
      question: "هل حاولت الإقلاع من قبل؟ ما الذي حدث؟",
      type: "textarea",
      key: "previousAttempts" as keyof QuestionnaireData
    },
    {
      question: "ما هي أهدافك بعد الإقلاع؟ (اختر عدة خيارات)",
      type: "multiple",
      key: "goals" as keyof QuestionnaireData,
      options: ["ثقة أكبر بالنفس", "علاقات أفضل", "طاقة أعلى", "صحة جسدية أفضل", "راحة نفسية", "إرضاء الله", "تحقيق الأحلام"]
    }
  ];

  const habitsData: HabitData[] = [
    {
      id: 'smoking',
      name: 'الإقلاع عن التدخين',
      icon: Cigarette,
      color: 'from-rose-400 to-pink-500',
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
      color: 'from-indigo-400 to-purple-500',
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
      color: 'from-cyan-400 to-teal-500',
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
      color: 'from-emerald-400 to-green-500',
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
      color: 'from-amber-400 to-orange-500',
      description: 'تقليل استهلاك السكر المضاف والحلويات',
      quitDate: '',
      dailyGoal: 'عدم تناول حلويات',
      weeklyGoal: 'تقليل السكر بنسبة 50%',
      benefits: ['استقرار الطاقة', 'صحة الأسنان', 'وزن صحي', 'تحسن المزاج'],
      tips: ['اقرأ الملصقات', 'استبدل بالفواكه', 'اشرب شاي أخضر', 'تناول بروتين أكثر']
    },
    {
      id: 'bad_habit',
      name: 'الإقلاع عن العادة السرية',
      icon: Shield,
      color: 'from-blue-400 to-indigo-500',
      description: 'التخلص من العادة السرية وبناء شخصية قوية ونظيفة',
      quitDate: '',
      dailyGoal: 'يوم واحد بدون ممارسة العادة',
      weeklyGoal: '7 أيام متتالية من النظافة',
      benefits: ['طاقة أكبر', 'ثقة بالنفس', 'تحسن المزاج', 'علاقات أفضل', 'نوم هادئ'],
      tips: ['مارس الرياضة', 'اقرأ القرآن', 'احتل وقتك بالمفيد', 'تجنب المحفزات', 'ادع الله باستمرار']
    },
    {
      id: 'caffeine',
      name: 'تنظيم الكافيين',
      icon: Coffee,
      color: 'from-violet-400 to-purple-500',
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
    const selectedHabitData = habitsData.find(h => h.id === habitId);
    if (selectedHabitData) {
      setSelectedHabit(habitId);
      setShowQuestionnaire(true);
      setQuestionnaireData({
        name: '',
        age: 25,
        habit: selectedHabitData.name,
        severity: '',
        duration: '',
        triggers: [],
        motivation: '',
        support: [],
        previousAttempts: '',
        goals: []
      });
      setCurrentStep(0);
    }
  };

  const generatePersonalizedPlan = (data: QuestionnaireData): GeneratedPlan => {
    const baseId = Date.now().toString();
    const dailyTasks = [
      'قراءة 10 دقائق من القرآن الكريم',
      'ممارسة الرياضة لمدة 30 دقيقة',
      'التأمل والاسترخاء لمدة 15 دقيقة',
      'شرب 8 أكواب من الماء',
      'كتابة 3 أشياء إيجابية حدثت اليوم',
      'تجنب المحفزات المحددة',
      'النوم مبكراً (قبل الساعة 11 مساءً)',
      'قضاء وقت مع الأصدقاء أو العائلة'
    ];

    const weeklyGoals = [
      'تحديد أهداف أسبوعية واضحة',
      'مراجعة التقدم المحرز',
      'إضافة نشاط جديد ممتع',
      'تقييم نقاط القوة والضعف'
    ];

    const tips = [
      'تذكر دائماً دافعك للإقلاع',
      'استبدل العادة السيئة بعادة إيجابية',
      'احتفل بالإنجازات الصغيرة',
      'لا تيأس من المحاولات المتكررة',
      'اطلب المساعدة عند الحاجة',
      'ركز على يوم واحد في كل مرة'
    ];

    const motivationalMessages = [
      `${data.name}، أنت أقوى مما تتخيل!`,
      'كل يوم تقاوم فيه هو انتصار جديد',
      'رحلتك نحو التغيير ملهمة للآخرين',
      'الصبر والإصرار سيحققان النجاح',
      'أنت تستحق حياة أفضل وأكثر نظافة'
    ];

    return {
      id: `quit_plan_${baseId}`,
      userData: data,
      dailyTasks,
      weeklyGoals,
      tips,
      motivationalMessages,
      createdDate: new Date().toISOString(),
      duration: 90
    };
  };

  const initializeThirtyDayTracker = (plan: GeneratedPlan) => {
    const days: DayStatus[] = [];
    const startDate = new Date(plan.createdDate);
    
    for (let i = 0; i < 30; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      
      days.push({
        date: currentDate.toISOString().split('T')[0],
        completed: false,
        tasksCompleted: 0,
        totalTasks: plan.dailyTasks.length
      });
    }
    
    setThirtyDayProgress(days);
    setCurrentTrackingDay(1);
    setTaskProgress({});
    setShowTracker(true);
  };

  const toggleTaskCompletion = (day: number, taskIndex: number) => {
    setTaskProgress(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [taskIndex]: !prev[day]?.[taskIndex]
      }
    }));

    // تحديث حالة اليوم
    setThirtyDayProgress(prev => prev.map((dayStatus, index) => {
      if (index + 1 === day) {
        const dayTasks = taskProgress[day] || {};
        const completedCount = Object.values({...dayTasks, [taskIndex]: !dayTasks[taskIndex]}).filter(Boolean).length;
        return {
          ...dayStatus,
          tasksCompleted: completedCount,
          completed: completedCount === generatedPlan?.dailyTasks.length
        };
      }
      return dayStatus;
    }));
  };

  const generateHTMLPlanWithTracker = (plan: GeneratedPlan): string => {
    return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>خطة الإقلاع 30 يوم - ${plan.userData.name}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Arial', sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; padding: 20px; color: #333; }
        .container { max-width: 1200px; margin: 0 auto; background: white; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); overflow: hidden; }
        .header { background: linear-gradient(135deg, #ff6b6b, #feca57); padding: 40px; text-align: center; color: white; }
        .title { font-size: 2.5em; margin-bottom: 10px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); }
        .timer { background: #2c3e50; color: white; padding: 30px; text-align: center; font-size: 1.5em; }
        .days-counter { font-size: 3em; font-weight: bold; margin: 10px 0; color: #f39c12; }
        .content { padding: 40px; }
        .section { margin-bottom: 30px; padding: 25px; border-radius: 15px; border-left: 5px solid #3498db; }
        .section h3 { color: #2c3e50; margin-bottom: 15px; font-size: 1.5em; }
        .section.daily { border-left-color: #e74c3c; background: #fdf2f2; }
        .section.tracker { border-left-color: #27ae60; background: #eafaf1; }
        .day-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin: 20px 0; }
        .day-card { background: white; border-radius: 10px; padding: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); text-align: center; }
        .day-card.completed { background: #27ae60; color: white; }
        .day-card.current { border: 3px solid #f39c12; }
        .tasks-list { margin: 20px 0; }
        .task-item { padding: 10px; margin: 5px 0; background: #f8f9fa; border-radius: 5px; cursor: pointer; user-select: none; }
        .task-item.completed { background: #27ae60; color: white; }
        ul { list-style: none; }
        li { padding: 10px 0; border-bottom: 1px solid #ecf0f1; position: relative; padding-right: 30px; }
        li:before { content: '✓'; position: absolute; right: 0; color: #27ae60; font-weight: bold; font-size: 1.2em; }
        @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } }
        .pulse { animation: pulse 2s infinite; }
        .progress-bar { background: #e0e0e0; height: 20px; border-radius: 10px; overflow: hidden; margin: 10px 0; }
        .progress-fill { background: linear-gradient(90deg, #27ae60, #2ecc71); height: 100%; transition: width 0.5s ease; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 class="title">🔥 خطة الإقلاع 30 يوم</h1>
            <p class="subtitle">مرحباً ${plan.userData.name}، رحلتك نحو التحرر تبدأ الآن!</p>
        </div>
        <div class="timer">
            <div>⏰ عداد الوقت منذ البداية</div>
            <div class="days-counter pulse" id="daysCounter">0</div>
            <div>يوم من النظافة والقوة</div>
            <div class="progress-bar">
                <div class="progress-fill" id="overallProgress" style="width: 0%"></div>
            </div>
        </div>
        <div class="content">
            <div class="section tracker">
                <h3>📅 التتبع لمدة 30 يوم</h3>
                <div class="day-grid" id="dayGrid">
                    <!-- سيتم ملؤها بالجافاسكريبت -->
                </div>
            </div>
            
            <div class="section daily" id="currentDaySection">
                <h3>🎯 مهام اليوم الحالي: <span id="currentDayNumber">1</span></h3>
                <div class="tasks-list" id="tasksList">
                    ${plan.dailyTasks.map((task, index) => `
                        <div class="task-item" data-task="${index}" onclick="toggleTask(${index})">
                            ${task}
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="section daily">
                <h3>🎯 جميع المهام اليومية</h3>
                <ul>${plan.dailyTasks.map(task => `<li>${task}</li>`).join('')}</ul>
            </div>
        </div>
    </div>
    <script>
        const createdDate = new Date('${plan.createdDate}');
        const totalDays = 30;
        const dailyTasks = ${JSON.stringify(plan.dailyTasks)};
        let currentDay = 1;
        let dayProgress = {};
        
        // تحميل التقدم من localStorage
        const savedProgress = localStorage.getItem('quitPlanProgress_${plan.id}');
        if (savedProgress) {
            dayProgress = JSON.parse(savedProgress);
        }
        
        function saveProgress() {
            localStorage.setItem('quitPlanProgress_${plan.id}', JSON.stringify(dayProgress));
        }
        
        function updateCounter() {
            const now = new Date();
            const diffTime = Math.abs(now - createdDate);
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            document.getElementById('daysCounter').textContent = diffDays;
            
            // تحديث اليوم الحالي
            currentDay = Math.min(diffDays + 1, totalDays);
            document.getElementById('currentDayNumber').textContent = currentDay;
            
            // تحديث شريط التقدم العام
            const completedDays = Object.keys(dayProgress).filter(day => {
                const tasks = dayProgress[day];
                return Object.keys(tasks).length === dailyTasks.length && Object.values(tasks).every(Boolean);
            }).length;
            const overallProgress = (completedDays / totalDays) * 100;
            document.getElementById('overallProgress').style.width = overallProgress + '%';
        }
        
        function createDayGrid() {
            const dayGrid = document.getElementById('dayGrid');
            dayGrid.innerHTML = '';
            
            for (let day = 1; day <= totalDays; day++) {
                const dayCard = document.createElement('div');
                dayCard.className = 'day-card';
                if (day === currentDay) dayCard.classList.add('current');
                
                const dayTasks = dayProgress[day] || {};
                const completedTasks = Object.values(dayTasks).filter(Boolean).length;
                const isCompleted = completedTasks === dailyTasks.length;
                
                if (isCompleted) dayCard.classList.add('completed');
                
                dayCard.innerHTML = \`
                    <div style="font-size: 1.5em; font-weight: bold;">اليوم \${day}</div>
                    <div>\${completedTasks}/\${dailyTasks.length}</div>
                    <div style="margin-top: 10px;">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: \${(completedTasks / dailyTasks.length) * 100}%"></div>
                        </div>
                    </div>
                \`;
                
                dayCard.onclick = () => switchToDay(day);
                dayGrid.appendChild(dayCard);
            }
        }
        
        function switchToDay(day) {
            currentDay = day;
            document.getElementById('currentDayNumber').textContent = day;
            updateTasksList();
            createDayGrid();
        }
        
        function updateTasksList() {
            const tasksList = document.getElementById('tasksList');
            const dayTasks = dayProgress[currentDay] || {};
            
            tasksList.innerHTML = dailyTasks.map((task, index) => \`
                <div class="task-item \${dayTasks[index] ? 'completed' : ''}" data-task="\${index}" onclick="toggleTask(\${index})">
                    \${task}
                </div>
            \`).join('');
        }
        
        function toggleTask(taskIndex) {
            if (!dayProgress[currentDay]) {
                dayProgress[currentDay] = {};
            }
            
            dayProgress[currentDay][taskIndex] = !dayProgress[currentDay][taskIndex];
            saveProgress();
            updateTasksList();
            createDayGrid();
            updateCounter();
        }
        
        // تهيئة الصفحة
        updateCounter();
        createDayGrid();
        updateTasksList();
        setInterval(updateCounter, 1000);
    </script>
</body>
</html>`;
  };

  const generateHTMLPlan = (plan: GeneratedPlan): string => {
    return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>خطة الإقلاع - ${plan.userData.name}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Arial', sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; padding: 20px; color: #333; }
        .container { max-width: 800px; margin: 0 auto; background: white; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); overflow: hidden; }
        .header { background: linear-gradient(135deg, #ff6b6b, #feca57); padding: 40px; text-align: center; color: white; }
        .title { font-size: 2.5em; margin-bottom: 10px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); }
        .timer { background: #2c3e50; color: white; padding: 30px; text-align: center; font-size: 1.5em; }
        .days-counter { font-size: 3em; font-weight: bold; margin: 10px 0; color: #f39c12; }
        .content { padding: 40px; }
        .section { margin-bottom: 30px; padding: 25px; border-radius: 15px; border-left: 5px solid #3498db; }
        .section h3 { color: #2c3e50; margin-bottom: 15px; font-size: 1.5em; }
        .section.daily { border-left-color: #e74c3c; background: #fdf2f2; }
        ul { list-style: none; }
        li { padding: 10px 0; border-bottom: 1px solid #ecf0f1; position: relative; padding-right: 30px; }
        li:before { content: '✓'; position: absolute; right: 0; color: #27ae60; font-weight: bold; font-size: 1.2em; }
        @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } }
        .pulse { animation: pulse 2s infinite; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 class="title">🔥 خطة الإقلاع الشخصية</h1>
            <p class="subtitle">مرحباً ${plan.userData.name}، رحلتك نحو التحرر تبدأ الآن!</p>
        </div>
        <div class="timer">
            <div>⏰ عداد الوقت منذ البداية</div>
            <div class="days-counter pulse" id="daysCounter">0</div>
            <div>يوم من النظافة والقوة</div>
        </div>
        <div class="content">
            <div class="section daily">
                <h3>🎯 مهامك اليومية</h3>
                <ul>${plan.dailyTasks.map(task => `<li>${task}</li>`).join('')}</ul>
            </div>
        </div>
    </div>
    <script>
        const createdDate = new Date('${plan.createdDate}');
        function updateCounter() {
            const now = new Date();
            const diffTime = Math.abs(now - createdDate);
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            document.getElementById('daysCounter').textContent = diffDays;
        }
        updateCounter(); setInterval(updateCounter, 1000);
    </script>
</body>
</html>`;
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

  const handleQuestionnaireAnswer = (key: keyof QuestionnaireData, value: any) => {
    if (questionnaireData) {
      setQuestionnaireData({
        ...questionnaireData,
        [key]: value
      });
    }
  };

  const completeQuestionnaire = () => {
    if (questionnaireData) {
      const plan = generatePersonalizedPlan(questionnaireData);
      setGeneratedPlan(plan);
      setShowQuestionnaire(false);
    }
  };

  const selectedHabitData = selectedHabit ? habitsData.find(h => h.id === selectedHabit) : null;
  const completedTasks = dailyTasks.filter(task => task.completed).length;
  const progressPercentage = (completedTasks / dailyTasks.length) * 100;

  // واجهة الأسئلة التفاعلية
  if (showQuestionnaire && questionnaireData) {
    const currentQuestion = questionnaire[currentStep];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* رأس الصفحة الإبداعي */}
            <div className="text-center mb-8 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-500/20 to-red-500/20 rounded-3xl animate-pulse"></div>
              <div className="relative z-10 py-12">
                <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 mb-4 animate-pulse">
                  🔥 رحلة التحرر الشخصية 🔥
                </h1>
                <p className="text-2xl text-white/80 font-semibold">
                  أجب على الأسئلة لإنشاء خطة مخصصة لك
                </p>
              </div>
            </div>

            {/* شريط التقدم */}
            <div className="mb-8">
              <div className="bg-gray-800 rounded-full h-4 overflow-hidden shadow-lg">
                <div 
                  className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-500 ease-out"
                  style={{ width: `${((currentStep + 1) / questionnaire.length) * 100}%` }}
                ></div>
              </div>
              <div className="text-center text-white/80 mt-2">
                السؤال {currentStep + 1} من {questionnaire.length}
              </div>
            </div>

            {/* السؤال الحالي */}
            <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                {currentQuestion.question}
              </h2>

              {/* حقول الإجابة */}
              <div className="space-y-4">
                {currentQuestion.type === 'text' && (
                  <input
                    type="text"
                    value={questionnaireData[currentQuestion.key] as string || ''}
                    onChange={(e) => handleQuestionnaireAnswer(currentQuestion.key, e.target.value)}
                    className="w-full p-4 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 text-lg"
                    placeholder="اكتب إجابتك هنا..."
                  />
                )}

                {currentQuestion.type === 'number' && (
                  <input
                    type="number"
                    value={questionnaireData[currentQuestion.key] as number || ''}
                    onChange={(e) => handleQuestionnaireAnswer(currentQuestion.key, parseInt(e.target.value) || 0)}
                    className="w-full p-4 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 text-lg"
                    placeholder="اكتب عمرك..."
                  />
                )}

                {currentQuestion.type === 'select' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentQuestion.options?.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleQuestionnaireAnswer(currentQuestion.key, option)}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 text-lg font-semibold ${
                          questionnaireData[currentQuestion.key] === option
                            ? 'border-purple-500 bg-purple-500 text-white transform scale-105'
                            : 'border-purple-200 bg-white text-purple-700 hover:border-purple-400 hover:bg-purple-50'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}

                {currentQuestion.type === 'multiple' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentQuestion.options?.map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          const currentValues = (questionnaireData[currentQuestion.key] as string[]) || [];
                          const isSelected = currentValues.includes(option);
                          const newValues = isSelected 
                            ? currentValues.filter(v => v !== option)
                            : [...currentValues, option];
                          handleQuestionnaireAnswer(currentQuestion.key, newValues);
                        }}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 text-lg font-semibold ${
                          ((questionnaireData[currentQuestion.key] as string[]) || []).includes(option)
                            ? 'border-purple-500 bg-purple-500 text-white transform scale-105'
                            : 'border-purple-200 bg-white text-purple-700 hover:border-purple-400 hover:bg-purple-50'
                        }`}
                      >
                        {option} {((questionnaireData[currentQuestion.key] as string[]) || []).includes(option) && '✓'}
                      </button>
                    ))}
                  </div>
                )}

                {currentQuestion.type === 'textarea' && (
                  <textarea
                    value={questionnaireData[currentQuestion.key] as string || ''}
                    onChange={(e) => handleQuestionnaireAnswer(currentQuestion.key, e.target.value)}
                    className="w-full p-4 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 text-lg h-32"
                    placeholder="اكتب إجابتك التفصيلية هنا..."
                  />
                )}
              </div>

              {/* أزرار التنقل */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  className="px-6 py-3 bg-gray-500 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
                >
                  السؤال السابق
                </button>

                {currentStep === questionnaire.length - 1 ? (
                  <button
                    onClick={completeQuestionnaire}
                    className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl font-semibold hover:scale-105 transition-transform shadow-lg"
                  >
                    🎯 إنشاء خطتي الشخصية
                  </button>
                ) : (
                  <button
                    onClick={() => setCurrentStep(Math.min(questionnaire.length - 1, currentStep + 1))}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:scale-105 transition-transform"
                  >
                    السؤال التالي
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // عرض الخطة المولدة
  if (generatedPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-teal-900 to-blue-900">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {/* رأس الصفحة */}
            <div className="text-center mb-8 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-teal-500/20 to-blue-500/20 rounded-3xl animate-pulse"></div>
              <div className="relative z-10 py-12">
                <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-green-400 to-blue-400 mb-4 animate-pulse">
                  🎉 خطتك الشخصية جاهزة! 🎉
                </h1>
                <p className="text-2xl text-white/80 font-semibold">
                  مرحباً {generatedPlan.userData.name}، رحلتك نحو التحرر تبدأ الآن
                </p>
              </div>
            </div>

            {/* أزرار الإجراءات */}
            <div className="text-center mb-8 space-y-4">
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => {
                  const htmlContent = generateHTMLPlan(generatedPlan);
                  const blob = new Blob([htmlContent], { type: 'text/html; charset=utf-8' });
                  const url = URL.createObjectURL(blob);
                  const link = document.createElement('a');
                  link.href = url;
                  link.download = `خطة_الإقلاع_${generatedPlan.userData.name}_${new Date().toISOString().split('T')[0]}.html`;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  URL.revokeObjectURL(url);
                }}
                  className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl font-bold text-xl hover:scale-105 transition-transform shadow-2xl"
                >
                  📥 تحميل الخطة HTML مع العداد
                </button>
                
                <button
                  onClick={() => initializeThirtyDayTracker(generatedPlan)}
                  className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl font-bold text-xl hover:scale-105 transition-transform shadow-2xl"
                >
                  📋 بدء التتبع 30 يوم
                </button>
                
                <button
                  onClick={() => {
                    const htmlContent = generateHTMLPlanWithTracker(generatedPlan);
                    const blob = new Blob([htmlContent], { type: 'text/html; charset=utf-8' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `متتبع_30_يوم_${generatedPlan.userData.name}_${new Date().toISOString().split('T')[0]}.html`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(url);
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold text-xl hover:scale-105 transition-transform shadow-2xl"
                >
                  📅 تحميل متتبع 30 يوم HTML
                </button>
              </div>
              
              <button
                onClick={() => {
                  setGeneratedPlan(null);
                  setSelectedHabit(null);
                  setShowQuestionnaire(false);
                  setShowTracker(false);
                }}
                className="px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-2xl font-bold text-xl hover:scale-105 transition-transform shadow-2xl"
              >
                🔄 إنشاء خطة جديدة
              </button>
            </div>

            {/* عرض تفاصيل الخطة */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* المهام اليومية */}
              <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl">
                <h3 className="text-3xl font-bold text-red-600 mb-6 text-center">🎯 مهامك اليومية</h3>
                <ul className="space-y-3">
                  {generatedPlan.dailyTasks.map((task, index) => (
                    <li key={index} className="flex items-center p-3 bg-red-50 rounded-xl">
                      <span className="text-red-500 font-bold ml-3">✓</span>
                      <span className="text-gray-800 font-medium">{task}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* النصائح */}
              <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl">
                <h3 className="text-3xl font-bold text-green-600 mb-6 text-center">💡 نصائح مهمة</h3>
                <ul className="space-y-3">
                  {generatedPlan.tips.map((tip, index) => (
                    <li key={index} className="flex items-center p-3 bg-green-50 rounded-xl">
                      <span className="text-green-500 font-bold ml-3">💡</span>
                      <span className="text-gray-800 font-medium">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* الرسائل التحفيزية */}
              <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl lg:col-span-2">
                <h3 className="text-3xl font-bold text-purple-600 mb-6 text-center">💪 رسائل تحفيزية لك</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {generatedPlan.motivationalMessages.map((message, index) => (
                    <div key={index} className="p-4 bg-purple-50 rounded-xl text-center">
                      <span className="text-purple-800 font-bold text-lg">{message}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!selectedHabit) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-stone-100 dark:from-slate-900 dark:via-gray-900 dark:to-stone-900">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-7xl mx-auto">
            {/* Header الفخم والهادئ */}
            <div className="text-center mb-16 relative">
              {/* تأثيرات خلفية هادئة وفخمة */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/30 via-teal-100/20 to-cyan-100/30 rounded-[3rem] blur-3xl"></div>
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-50/40 via-teal-50/30 to-cyan-50/40 rounded-[3rem]"></div>
              
              <div className="relative z-10 py-16 px-8">
                {/* العنوان الأنيق */}
                <div className="flex flex-col items-center mb-12 space-y-8">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-700"></div>
                    <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-full p-8 shadow-2xl border border-white/50 dark:border-gray-700/50">
                      <Flame className="h-16 w-16 text-emerald-600 dark:text-emerald-400" />
                    </div>
                  </div>
                  
                  <div className="relative">
                    <h1 className="text-5xl md:text-7xl font-light bg-gradient-to-r from-emerald-800 via-teal-700 to-cyan-800 dark:from-emerald-300 dark:via-teal-300 dark:to-cyan-300 bg-clip-text text-transparent tracking-wide">
                      رحلة التحرر
                    </h1>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"></div>
                  </div>
                  
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-700"></div>
                    <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-full p-8 shadow-2xl border border-white/50 dark:border-gray-700/50">
                      <Shield className="h-16 w-16 text-teal-600 dark:text-teal-400" />
                    </div>
                  </div>
                </div>
                
                {/* النص التحفيزي الهادئ */}
                <div className="space-y-10 max-w-4xl mx-auto">
                  <p className="text-2xl md:text-3xl font-light text-gray-700 dark:text-gray-300 leading-relaxed">
                    ✨ اكتشف القوة الحقيقية بداخلك من خلال رحلة تحويلية هادئة وفعالة ✨
                  </p>
                  
                  <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50 dark:border-gray-700/50">
                    <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-4">
                      🌟 <span className="text-3xl font-semibold text-emerald-700 dark:text-emerald-400">30</span> يوماً من التطوير الذاتي المدروس
                    </p>
                    <p className="text-lg text-gray-500 dark:text-gray-500 italic">
                      "التغيير الحقيقي يبدأ بخطوة واحدة، ويستمر بالصبر والحكمة"
                    </p>
                  </div>
                  
                  {/* إحصائيات أنيقة */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto mt-16">
                    <div className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                      <div className="text-3xl mb-4 opacity-70 group-hover:opacity-100 transition-opacity">🎯</div>
                      <div className="text-2xl font-light text-emerald-700 dark:text-emerald-400 mb-2">نجاح</div>
                      <div className="text-sm font-medium text-gray-600 dark:text-gray-400">مدروس</div>
                    </div>
                    
                    <div className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-2" style={{animationDelay: '0.1s'}}>
                      <div className="text-3xl mb-4 opacity-70 group-hover:opacity-100 transition-opacity">💪</div>
                      <div className="text-2xl font-light text-teal-700 dark:text-teal-400 mb-2">قوة</div>
                      <div className="text-sm font-medium text-gray-600 dark:text-gray-400">داخلية</div>
                    </div>
                    
                    <div className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-2" style={{animationDelay: '0.2s'}}>
                      <div className="text-3xl mb-4 opacity-70 group-hover:opacity-100 transition-opacity">⚡</div>
                      <div className="text-2xl font-light text-cyan-700 dark:text-cyan-400 mb-2">طاقة</div>
                      <div className="text-sm font-medium text-gray-600 dark:text-gray-400">متجددة</div>
                    </div>
                    
                    <div className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-2" style={{animationDelay: '0.3s'}}>
                      <div className="text-3xl mb-4 opacity-70 group-hover:opacity-100 transition-opacity">🧠</div>
                      <div className="text-2xl font-light text-slate-700 dark:text-slate-400 mb-2">وضوح</div>
                      <div className="text-sm font-medium text-gray-600 dark:text-gray-400">ذهني</div>
                    </div>
                  </div>
                  
                  {/* رسائل إلهامية هادئة */}
                  <div className="space-y-6 max-w-4xl mx-auto mt-16">
                    <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 backdrop-blur-xl rounded-3xl p-8 border border-emerald-200/30 dark:border-emerald-800/30 shadow-lg hover:shadow-xl transition-all duration-500">
                      <div className="text-xl font-light text-emerald-800 dark:text-emerald-200 mb-3">🌱 النمو الحقيقي يحدث في الهدوء</div>
                      <div className="text-lg text-gray-600 dark:text-gray-400 font-light leading-relaxed">كل خطوة صغيرة تقوم بها اليوم، هي استثمار في نسخة أفضل منك غداً</div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-teal-500/10 via-cyan-500/10 to-emerald-500/10 backdrop-blur-xl rounded-3xl p-8 border border-teal-200/30 dark:border-teal-800/30 shadow-lg hover:shadow-xl transition-all duration-500">
                      <div className="text-xl font-light text-teal-800 dark:text-teal-200 mb-3">💎 الصبر هو مفتاح التحول</div>
                      <div className="text-lg text-gray-600 dark:text-gray-400 font-light leading-relaxed">التغيير المستدام لا يحدث بين ليلة وضحاها، بل ينمو مع كل قرار حكيم</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Habits Selection */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-2xl rounded-[2.5rem] border border-white/60 dark:border-gray-700/60 shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-50/80 via-teal-50/60 to-cyan-50/80 dark:from-emerald-950/50 dark:via-teal-950/40 dark:to-cyan-950/50 px-12 py-8">
                <h2 className="text-3xl font-light text-center text-emerald-800 dark:text-emerald-200 mb-4">
                  اختر رحلتك التحويلية
                </h2>
                <p className="text-center text-gray-600 dark:text-gray-400 font-light">
                  كل عادة هي فرصة جديدة للنمو والتطور
                </p>
              </div>
              
              <div className="p-12">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {habitsData.map((habit, index) => {
                    const IconComponent = habit.icon;
                    const colorMap: { [key: string]: string } = {
                      'emerald': 'emerald',
                      'green': 'green', 
                      'teal': 'teal',
                      'red': 'rose'
                    };
                    const colorName = colorMap[habit.color] || 'slate';
                    
                    return (
                      <div
                        key={habit.id}
                        className="group cursor-pointer transition-all duration-700 hover:-translate-y-3 hover:scale-[1.02]"
                        onClick={() => selectHabit(habit.id)}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl border border-white/60 dark:border-gray-700/60 shadow-lg hover:shadow-2xl transition-all duration-700 overflow-hidden">
                          
                          {/* تأثير الخلفية */}
                          <div className={`absolute inset-0 bg-gradient-to-br from-${colorName}-50/50 via-transparent to-${colorName}-100/30 dark:from-${colorName}-950/30 dark:via-transparent dark:to-${colorName}-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
                          
                          <div className="relative p-8">
                            <div className="text-center mb-6">
                              <div className="relative inline-block mb-6">
                                <div className={`absolute inset-0 bg-gradient-to-r from-${colorName}-400 to-${colorName}-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-700`}></div>
                                <div className={`relative w-20 h-20 mx-auto bg-gradient-to-br from-${colorName}-100 to-${colorName}-200 dark:from-${colorName}-800 dark:to-${colorName}-900 rounded-2xl flex items-center justify-center shadow-xl border border-${colorName}-200/50 dark:border-${colorName}-700/50 group-hover:shadow-2xl transition-all duration-700`}>
                                  <IconComponent className={`h-10 w-10 text-${colorName}-600 dark:text-${colorName}-400 group-hover:scale-110 transition-transform duration-700`} />
                                </div>
                              </div>
                              
                              <h3 className={`text-xl font-medium text-${colorName}-800 dark:text-${colorName}-200 mb-3 group-hover:text-${colorName}-700 dark:group-hover:text-${colorName}-100 transition-colors duration-700`}>
                                {habit.name}
                              </h3>
                            </div>
                            
                            <div className="space-y-4">
                              <p className="text-gray-600 dark:text-gray-400 text-sm text-center font-light leading-relaxed">
                                {habit.description}
                              </p>
                              
                              <div className={`bg-gradient-to-r from-${colorName}-50/50 to-${colorName}-100/30 dark:from-${colorName}-950/30 dark:to-${colorName}-900/20 backdrop-blur-sm rounded-2xl p-4 border border-${colorName}-200/30 dark:border-${colorName}-800/30`}>
                                <div className="text-center">
                                  <span className="text-xs font-light text-gray-500 dark:text-gray-500 block mb-2">الهدف اليومي</span>
                                  <p className={`text-sm font-medium text-${colorName}-700 dark:text-${colorName}-300`}>
                                    {habit.dailyGoal}
                                  </p>
                                </div>
                              </div>
                            </div>
                            
                            <div className="mt-6 text-center">
                              <div className={`inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-${colorName}-500/10 to-${colorName}-600/10 rounded-full border border-${colorName}-300/20 dark:border-${colorName}-700/20 group-hover:from-${colorName}-500/20 group-hover:to-${colorName}-600/20 transition-all duration-700`}>
                                <span className={`text-sm font-light text-${colorName}-700 dark:text-${colorName}-300`}>
                                  ابدأ الرحلة
                                </span>
                                <ChevronRight className={`h-4 w-4 text-${colorName}-600 dark:text-${colorName}-400 mr-2 group-hover:translate-x-1 transition-transform duration-700`} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Back Button */}
            <div className="mt-16 text-center">
              <button
                onClick={() => setLocation("/")}
                className="group inline-flex items-center justify-center px-8 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-emerald-200/50 dark:border-emerald-800/50 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
              >
                <ArrowLeft className="ml-3 h-5 w-5 text-emerald-600 dark:text-emerald-400 group-hover:-translate-x-1 transition-transform duration-500" />
                <span className="text-emerald-700 dark:text-emerald-300 font-light text-lg">العودة للصفحة الرئيسية</span>
              </button>
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

  // واجهة التتبع لمدة 30 يوم
  if (showTracker && generatedPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            {/* رأس الصفحة */}
            <div className="text-center mb-8 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl animate-pulse"></div>
              <div className="relative z-10 py-12">
                <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-indigo-400 mb-4 animate-pulse">
                  📅 متتبع 30 يوم للإقلاع
                </h1>
                <p className="text-2xl text-white/80 font-semibold">
                  {generatedPlan.userData.name}، تتبع تقدمك يوماً بيوم
                </p>
              </div>
            </div>

            {/* إحصائيات التقدم */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 text-center border border-white/20">
                <div className="text-4xl mb-3">📅</div>
                <div className="text-3xl font-bold text-white mb-2">{currentTrackingDay}</div>
                <div className="text-white/80">اليوم الحالي</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 text-center border border-white/20">
                <div className="text-4xl mb-3">✅</div>
                <div className="text-3xl font-bold text-green-400 mb-2">
                  {thirtyDayProgress.filter(day => day.completed).length}
                </div>
                <div className="text-white/80">أيام مكتملة</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 text-center border border-white/20">
                <div className="text-4xl mb-3">🎯</div>
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  {Math.round((thirtyDayProgress.filter(day => day.completed).length / 30) * 100)}%
                </div>
                <div className="text-white/80">نسبة الإنجاز</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 text-center border border-white/20">
                <div className="text-4xl mb-3">🔥</div>
                <div className="text-3xl font-bold text-orange-400 mb-2">
                  {30 - currentTrackingDay + 1}
                </div>
                <div className="text-white/80">أيام متبقية</div>
              </div>
            </div>

            {/* شبكة الأيام الثلاثين */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-8 border border-white/20">
              <h3 className="text-3xl font-bold text-white mb-6 text-center">📊 خريطة الـ 30 يوم</h3>
              <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
                {Array.from({ length: 30 }, (_, index) => {
                  const dayNumber = index + 1;
                  const dayStatus = thirtyDayProgress[index];
                  const isCompleted = dayStatus?.completed;
                  const isCurrent = dayNumber === currentTrackingDay;
                  
                  return (
                    <button
                      key={dayNumber}
                      onClick={() => setCurrentTrackingDay(dayNumber)}
                      className={`relative aspect-square rounded-xl font-bold text-sm transition-all duration-300 hover:scale-110 ${
                        isCompleted 
                          ? 'bg-green-500 text-white shadow-lg transform scale-105' 
                          : isCurrent
                          ? 'bg-yellow-500 text-black shadow-lg animate-pulse'
                          : 'bg-white/20 text-white/80 hover:bg-white/30'
                      }`}
                    >
                      <div className="flex flex-col items-center justify-center h-full">
                        <span>{dayNumber}</span>
                        {isCompleted && <span className="text-xs mt-1">✅</span>}
                      </div>
                      {dayStatus && (
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                          <div className="text-xs bg-black/50 text-white px-2 py-1 rounded">
                            {dayStatus.tasksCompleted}/{dayStatus.totalTasks}
                          </div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* مهام اليوم الحالي */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <h3 className="text-3xl font-bold text-white mb-6 text-center">
                🎯 مهام اليوم {currentTrackingDay}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {generatedPlan.dailyTasks.map((task, index) => {
                  const isCompleted = taskProgress[currentTrackingDay]?.[index] || false;
                  
                  return (
                    <div
                      key={index}
                      onClick={() => toggleTaskCompletion(currentTrackingDay, index)}
                      className={`p-4 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 ${
                        isCompleted
                          ? 'bg-green-500 text-white shadow-lg'
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{task}</span>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          isCompleted ? 'bg-white text-green-500' : 'border-white'
                        }`}>
                          {isCompleted && '✓'}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* أزرار التحكم */}
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <button
                  onClick={() => setCurrentTrackingDay(Math.max(1, currentTrackingDay - 1))}
                  disabled={currentTrackingDay === 1}
                  className="px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
                >
                  ← اليوم السابق
                </button>
                
                <button
                  onClick={() => setCurrentTrackingDay(Math.min(30, currentTrackingDay + 1))}
                  disabled={currentTrackingDay === 30}
                  className="px-6 py-3 bg-purple-500 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-600 transition-colors"
                >
                  اليوم التالي →
                </button>
                
                <button
                  onClick={() => setShowTracker(false)}
                  className="px-6 py-3 bg-gray-600 text-white rounded-xl font-semibold hover:bg-gray-700 transition-colors"
                >
                  🔙 العودة للخطة
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}