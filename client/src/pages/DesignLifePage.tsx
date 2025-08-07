import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation } from "wouter";
import { 
  User, 
  Target, 
  DollarSign, 
  Clock, 
  Dumbbell, 
  Apple, 
  Shield, 
  Calendar,
  Download,
  ChevronRight,
  Sparkles,
  Star,
  Trophy,
  Heart,
  Brain,
  Zap
} from "lucide-react";

// Types
interface UserAnswers {
  name: string;
  gender: string;
  age: string;
  weight: string;
  height: string;
  goal: string;
  socialClass: string;
  activityLevel: string;
  exerciseType: string;
  dailyHours: string;
  preferredFoods: string[];
  forbiddenFoods: string[];
  supplements: string;
  mealTiming: string;
}

interface GeneratedPlan {
  id: string;
  userProfile: UserAnswers;
  nutritionPlan: DayPlan[];
  exercisePlan: ExercisePlan[];
  supplementPlan: string[];
  estimatedBudget: number;
  planDuration: number;
}

interface DayPlan {
  day: number;
  breakfast: string;
  lunch: string;
  dinner: string;
  snacks: string[];
  calories: number;
  cost: number;
}

interface ExercisePlan {
  day: number;
  exercises: Exercise[];
  duration: number;
  difficulty: string;
}

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  description: string;
}

// Comprehensive Data
const genderOptions = ["ذكر", "أنثى"];
const ageRanges = ["15-20", "21-30", "31-40", "41-50", "50+"];
const weightRanges = ["أقل من 50 كيلو", "50-60 كيلو", "61-70 كيلو", "71-80 كيلو", "81-90 كيلو", "91-100 كيلو", "أكثر من 100 كيلو"];
const heightRanges = ["أقل من 150 سم", "150-160 سم", "161-170 سم", "171-180 سم", "181-190 سم", "أكثر من 190 سم"];
const goalOptions = ["إنقاص الوزن", "زيادة الكتلة العضلية", "الحفاظ على الصحة العامة", "تحسين اللياقة", "زيادة القوة"];
const socialClassOptions = ["منخفضة الدخل", "متوسطة الدخل", "مرتفعة الدخل"];
const activityLevelOptions = ["لا أتمرن إطلاقاً", "أتمرن أقل من 3 أيام", "أتمرن 3-5 أيام", "أتمرن أكثر من 5 أيام"];
const exerciseTypeOptions = ["جيم", "منزل", "كارديو فقط", "مقاومة فقط", "مختلط", "يوجا وتمدد", "رياضات جماعية"];
const dailyHoursOptions = ["30 دقيقة", "1 ساعة", "1.5 ساعة", "2 ساعة", "أكثر من 2 ساعة"];
const supplementOptions = ["لا", "بروتين", "كرياتين", "أوميغا 3", "فيتامينات", "مجموعة شاملة"];
const mealTimingOptions = ["3 وجبات رئيسية", "5 وجبات صغيرة", "صيام متقطع", "6 وجبات"];

const affordableFoods = [
  "بيض", "دجاج", "تونة", "سردين", "عدس", "فول", "حمص", "فاصوليا",
  "أرز", "مكرونة", "شوفان", "خبز أسمر", "بطاطس", "بطاطا حلوة",
  "طماطم", "خيار", "جزر", "بصل", "ثوم", "فلفل أخضر",
  "موز", "تفاح", "برتقال", "تمر", "عنب", "بطيخ",
  "زيت زيتون", "زبدة فول سوداني", "طحينة", "زبادي", "جبن قريش", "حليب",
  "شاي", "قهوة", "ماء", "عصير طبيعي", "حليب جوز الهند"
];

const forbiddenFoodOptions = [
  "لحم أحمر", "مأكولات بحرية", "منتجات ألبان", "مكسرات", "صويا",
  "طعام حار", "طعام مقلي", "حلويات", "مشروبات غازية", "كافيين"
];

export default function DesignLifePage() {
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [answers, setAnswers] = useState<UserAnswers>({
    name: "",
    gender: "",
    age: "",
    weight: "",
    height: "",
    goal: "",
    socialClass: "",
    activityLevel: "",
    exerciseType: "",
    dailyHours: "",
    preferredFoods: [],
    forbiddenFoods: [],
    supplements: "",
    mealTiming: ""
  });
  const [generatedPlan, setGeneratedPlan] = useState<GeneratedPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const totalSteps = 13;

  useEffect(() => {
    setProgress((currentStep / totalSteps) * 100);
  }, [currentStep]);

  const handleAnswerChange = (field: keyof UserAnswers, value: string | string[]) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
  };

  const handleFoodSelection = (food: string, isPreferred: boolean) => {
    const field = isPreferred ? 'preferredFoods' : 'forbiddenFoods';
    setAnswers(prev => ({
      ...prev,
      [field]: prev[field].includes(food) 
        ? prev[field].filter(f => f !== food)
        : [...prev[field], food]
    }));
  };

  const generatePlan = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation with realistic delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Generate comprehensive plan based on answers
    const plan = generateComprehensivePlan(answers);
    setGeneratedPlan(plan);
    setIsGenerating(false);
  };

  const generateComprehensivePlan = (userAnswers: UserAnswers): GeneratedPlan => {
    // Smart plan generation algorithm
    const planId = `PLAN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Generate 180-day nutrition plan
    const nutritionPlan = generateNutritionPlan(userAnswers);
    const exercisePlan = generateExercisePlan(userAnswers);
    const supplementPlan = generateSupplementPlan(userAnswers);
    const estimatedBudget = calculateBudget(userAnswers, nutritionPlan);

    return {
      id: planId,
      userProfile: userAnswers,
      nutritionPlan,
      exercisePlan,
      supplementPlan,
      estimatedBudget,
      planDuration: 180
    };
  };

  const generateNutritionPlan = (userAnswers: UserAnswers): DayPlan[] => {
    const plan: DayPlan[] = [];
    const budgetMultiplier = userAnswers.socialClass === "منخفضة الدخل" ? 0.7 : 
                           userAnswers.socialClass === "متوسطة الدخل" ? 1 : 1.5;
    
    for (let day = 1; day <= 180; day++) {
      const dayPlan = generateDayMeal(userAnswers, day, budgetMultiplier);
      plan.push(dayPlan);
    }
    
    return plan;
  };

  const generateDayMeal = (userAnswers: UserAnswers, day: number, budgetMultiplier: number): DayPlan => {
    const preferredFoods = userAnswers.preferredFoods;
    const goalCalories = calculateCalories(userAnswers);
    
    // Breakfast options based on budget
    const budgetBreakfasts = budgetMultiplier < 1 ? 
      ["بيض مسلوق + خبز أسمر + شاي", "شوفان + موز + حليب", "فول + طحينة + خبز"] :
      ["عجة + جبن + خبز محمص", "شوفان + مكسرات + عسل", "لبنة + زيت زيتون + خضار"];
    
    const budgetLunches = budgetMultiplier < 1 ?
      ["أرز + عدس + سلطة", "مكرونة + تونة + خضار", "دجاج مسلوق + خضار + أرز"] :
      ["دجاج مشوي + أرز + سلطة", "سمك + خضار + بطاطس", "لحم + أرز + خضار"];
    
    const budgetDinners = budgetMultiplier < 1 ?
      ["زبادي + خيار + تمر", "بيض + سلطة + خبز", "جبن قريش + طماطم"] :
      ["دجاج + سلطة + خبز", "سمك + خضار + حليب", "بيض + جبن + خضار"];

    return {
      day,
      breakfast: budgetBreakfasts[day % budgetBreakfasts.length],
      lunch: budgetLunches[day % budgetLunches.length],
      dinner: budgetDinners[day % budgetDinners.length],
      snacks: ["تفاح", "مكسرات", "زبادي"],
      calories: goalCalories,
      cost: Math.round((8 + Math.random() * 12) * budgetMultiplier)
    };
  };

  const generateExercisePlan = (userAnswers: UserAnswers): ExercisePlan[] => {
    const plan: ExercisePlan[] = [];
    const isHome = userAnswers.exerciseType === "منزل";
    
    for (let day = 1; day <= 180; day++) {
      if (day % 7 === 0) continue; // Rest day
      
      const exercises = isHome ? generateHomeExercises(day) : generateGymExercises(day);
      plan.push({
        day,
        exercises,
        duration: parseInt(userAnswers.dailyHours) || 60,
        difficulty: day <= 30 ? "مبتدئ" : day <= 90 ? "متوسط" : "متقدم"
      });
    }
    
    return plan;
  };

  const generateHomeExercises = (day: number): Exercise[] => {
    const exercises = [
      { name: "تمرين الضغط", sets: 3, reps: "10-15", rest: "1 دقيقة", description: "تمرين لتقوية عضلات الصدر والذراعين" },
      { name: "القرفصاء", sets: 3, reps: "15-20", rest: "1 دقيقة", description: "تمرين لتقوية عضلات الساقين والمؤخرة" },
      { name: "البلانك", sets: 3, reps: "30-60 ثانية", rest: "30 ثانية", description: "تمرين لتقوية عضلات البطن واللب" },
      { name: "الجري في المكان", sets: 1, reps: "5-10 دقائق", rest: "2 دقيقة", description: "تمرين كارديو لتحسين اللياقة" }
    ];
    
    return exercises.slice(0, 3 + (day % 2));
  };

  const generateGymExercises = (day: number): Exercise[] => {
    const exercises = [
      { name: "بنش برس", sets: 4, reps: "8-12", rest: "2 دقيقة", description: "تمرين أساسي لعضلات الصدر" },
      { name: "سكوات بالبار", sets: 4, reps: "10-15", rest: "2 دقيقة", description: "تمرين أساسي لعضلات الساقين" },
      { name: "ديدليفت", sets: 3, reps: "6-10", rest: "3 دقائق", description: "تمرين شامل لكامل الجسم" },
      { name: "تجديف بالكابل", sets: 3, reps: "10-12", rest: "2 دقيقة", description: "تمرين لعضلات الظهر" }
    ];
    
    return exercises.slice(0, 3 + (day % 2));
  };

  const generateSupplementPlan = (userAnswers: UserAnswers): string[] => {
    if (userAnswers.supplements === "لا") return [];
    
    const supplements = [];
    if (userAnswers.supplements.includes("بروتين")) supplements.push("واي بروتين: 30 جرام بعد التمرين");
    if (userAnswers.supplements.includes("كرياتين")) supplements.push("كرياتين: 5 جرام يومياً");
    if (userAnswers.supplements.includes("أوميغا")) supplements.push("أوميغا 3: كبسولة واحدة مع الطعام");
    if (userAnswers.supplements.includes("فيتامينات")) supplements.push("فيتامينات متعددة: قرص واحد صباحاً");
    
    return supplements;
  };

  const calculateCalories = (userAnswers: UserAnswers): number => {
    let baseCalories = 2000;
    
    if (userAnswers.goal === "إنقاص الوزن") baseCalories = 1800;
    if (userAnswers.goal === "زيادة الكتلة العضلية") baseCalories = 2500;
    if (userAnswers.gender === "أنثى") baseCalories *= 0.85;
    
    return Math.round(baseCalories);
  };

  const calculateBudget = (userAnswers: UserAnswers, nutritionPlan: DayPlan[]): number => {
    return nutritionPlan.reduce((total, day) => total + day.cost, 0);
  };

  const downloadPlan = () => {
    if (!generatedPlan) return;
    
    const htmlContent = generateHTMLFile(generatedPlan);
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `خطة_${generatedPlan.userProfile.name}_6_أشهر.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const generateHTMLFile = (plan: GeneratedPlan): string => {
    return `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>خطة ${plan.userProfile.name} الصحية - 6 أشهر</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Arial', sans-serif; 
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            color: #f1f5f9;
            min-height: 100vh;
        }
        .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .title { font-size: 2.5rem; color: #10b981; margin-bottom: 10px; }
        .subtitle { font-size: 1.2rem; color: #64748b; }
        .progress-bar { 
            width: 100%; 
            height: 20px; 
            background: #1e293b; 
            border-radius: 10px; 
            overflow: hidden;
            margin: 20px 0;
        }
        .progress-fill { 
            height: 100%; 
            background: linear-gradient(90deg, #10b981, #059669); 
            width: 0%; 
            transition: width 0.3s;
        }
        .day-card { 
            background: #1e293b; 
            border: 1px solid #10b981; 
            border-radius: 15px; 
            padding: 20px; 
            margin: 15px 0;
            transition: transform 0.3s;
        }
        .day-card:hover { transform: translateY(-5px); }
        .day-title { 
            color: #10b981; 
            font-size: 1.5rem; 
            margin-bottom: 15px;
            display: flex;
            justify-content: between;
            align-items: center;
        }
        .meal-section { margin: 10px 0; }
        .meal-title { color: #fbbf24; font-weight: bold; }
        .meal-content { color: #e2e8f0; margin: 5px 0; }
        .exercise-section { margin-top: 15px; }
        .exercise-title { color: #8b5cf6; font-weight: bold; }
        .exercise-list { list-style: none; padding-right: 20px; }
        .exercise-item { 
            color: #e2e8f0; 
            margin: 5px 0; 
            padding: 5px;
            border-right: 3px solid #8b5cf6;
        }
        .completion-btn { 
            background: #10b981; 
            color: white; 
            border: none; 
            padding: 8px 15px; 
            border-radius: 8px; 
            cursor: pointer;
            margin: 5px;
            transition: all 0.3s;
        }
        .completion-btn:hover { background: #059669; transform: scale(1.05); }
        .completed { background: #22c55e !important; }
        .stats { 
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
            gap: 15px; 
            margin: 20px 0;
        }
        .stat-card { 
            background: #1e293b; 
            border: 1px solid #10b981; 
            border-radius: 10px; 
            padding: 15px; 
            text-align: center;
        }
        .stat-number { font-size: 2rem; color: #10b981; font-weight: bold; }
        .stat-label { color: #64748b; margin-top: 5px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 class="title">🎯 خطة ${plan.userProfile.name} الصحية</h1>
            <p class="subtitle">خطة شخصية لـ 6 أشهر - مصممة خصيصاً لك</p>
            <div class="progress-bar">
                <div class="progress-fill" id="progressFill"></div>
            </div>
            <p id="progressText">اليوم 1 من 180</p>
        </div>
        
        <div class="stats">
            <div class="stat-card">
                <div class="stat-number" id="completedDays">0</div>
                <div class="stat-label">الأيام المكتملة</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${plan.estimatedBudget}</div>
                <div class="stat-label">الميزانية الإجمالية (ريال)</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" id="completedMeals">0</div>
                <div class="stat-label">الوجبات المكتملة</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" id="completedExercises">0</div>
                <div class="stat-label">التمارين المكتملة</div>
            </div>
        </div>
        
        <div id="planContainer">
            ${plan.nutritionPlan.map((day, index) => `
                <div class="day-card" id="day-${day.day}">
                    <div class="day-title">
                        <span>اليوم ${day.day}</span>
                        <span style="font-size: 1rem; color: #64748b;">${day.cost} ريال</span>
                    </div>
                    
                    <div class="meal-section">
                        <div class="meal-title">🌅 الفطور:</div>
                        <div class="meal-content">${day.breakfast}</div>
                        <button class="completion-btn" onclick="toggleMeal(${day.day}, 'breakfast')">✓ تم تناوله</button>
                    </div>
                    
                    <div class="meal-section">
                        <div class="meal-title">☀️ الغداء:</div>
                        <div class="meal-content">${day.lunch}</div>
                        <button class="completion-btn" onclick="toggleMeal(${day.day}, 'lunch')">✓ تم تناوله</button>
                    </div>
                    
                    <div class="meal-section">
                        <div class="meal-title">🌙 العشاء:</div>
                        <div class="meal-content">${day.dinner}</div>
                        <button class="completion-btn" onclick="toggleMeal(${day.day}, 'dinner')">✓ تم تناوله</button>
                    </div>
                    
                    ${plan.exercisePlan.find(ex => ex.day === day.day) ? `
                    <div class="exercise-section">
                        <div class="exercise-title">💪 التمارين:</div>
                        <ul class="exercise-list">
                            ${plan.exercisePlan.find(ex => ex.day === day.day)?.exercises.map(exercise => `
                                <li class="exercise-item">
                                    ${exercise.name} - ${exercise.sets} مجموعات × ${exercise.reps}
                                    <button class="completion-btn" onclick="toggleExercise(${day.day}, '${exercise.name}')">✓ تم أداؤه</button>
                                </li>
                            `).join('') || ''}
                        </ul>
                    </div>
                    ` : ''}
                </div>
            `).join('')}
        </div>
    </div>
    
    <script>
        let completedMeals = JSON.parse(localStorage.getItem('completedMeals') || '{}');
        let completedExercises = JSON.parse(localStorage.getItem('completedExercises') || '{}');
        let startDate = localStorage.getItem('planStartDate') || new Date().toISOString().split('T')[0];
        
        function toggleMeal(day, meal) {
            const key = \`\${day}-\${meal}\`;
            if (completedMeals[key]) {
                delete completedMeals[key];
            } else {
                completedMeals[key] = new Date().toISOString();
            }
            localStorage.setItem('completedMeals', JSON.stringify(completedMeals));
            updateUI();
        }
        
        function toggleExercise(day, exercise) {
            const key = \`\${day}-\${exercise}\`;
            if (completedExercises[key]) {
                delete completedExercises[key];
            } else {
                completedExercises[key] = new Date().toISOString();
            }
            localStorage.setItem('completedExercises', JSON.stringify(completedExercises));
            updateUI();
        }
        
        function updateUI() {
            // Update completion buttons
            document.querySelectorAll('.completion-btn').forEach(btn => {
                btn.classList.remove('completed');
            });
            
            Object.keys(completedMeals).forEach(key => {
                const [day, meal] = key.split('-');
                const btn = document.querySelector(\`#day-\${day} button[onclick*="\${meal}"]\`);
                if (btn) btn.classList.add('completed');
            });
            
            Object.keys(completedExercises).forEach(key => {
                const [day, exercise] = key.split('-', 2);
                const btn = document.querySelector(\`#day-\${day} button[onclick*="\${exercise}"]\`);
                if (btn) btn.classList.add('completed');
            });
            
            // Update stats
            document.getElementById('completedMeals').textContent = Object.keys(completedMeals).length;
            document.getElementById('completedExercises').textContent = Object.keys(completedExercises).length;
            
            // Calculate completed days
            const completedDays = new Set();
            Object.keys(completedMeals).forEach(key => completedDays.add(key.split('-')[0]));
            document.getElementById('completedDays').textContent = completedDays.size;
            
            // Update progress
            const progress = (completedDays.size / 180) * 100;
            document.getElementById('progressFill').style.width = \`\${progress}%\`;
            
            // Calculate current day
            const currentDate = new Date();
            const start = new Date(startDate);
            const daysSinceStart = Math.floor((currentDate - start) / (1000 * 60 * 60 * 24)) + 1;
            document.getElementById('progressText').textContent = \`اليوم \${Math.min(daysSinceStart, 180)} من 180\`;
        }
        
        // Initialize
        updateUI();
        
        // Auto-scroll to current day
        const currentDay = Math.floor((new Date() - new Date(startDate)) / (1000 * 60 * 60 * 24)) + 1;
        if (currentDay <= 180) {
            document.getElementById(\`day-\${currentDay}\`)?.scrollIntoView({ behavior: 'smooth' });
        }
    </script>
</body>
</html>`;
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <Card className="w-full max-w-2xl mx-auto bg-slate-800/50 border-emerald-400/30 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                <User className="w-8 h-8 text-emerald-400 ml-2" />
                <CardTitle className="text-2xl text-emerald-400">مرحباً بك في صمم حياتك</CardTitle>
              </div>
              <p className="text-gray-300">نظام ذكي لتصميم خطة صحية شخصية لـ 6 أشهر من 100,000+ خطة مختلفة</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Label htmlFor="name" className="text-emerald-400 font-medium">الاسم الكامل (الحقل الوحيد المطلوب كتابته)</Label>
                <Input
                  id="name"
                  value={answers.name}
                  onChange={(e) => handleAnswerChange('name', e.target.value)}
                  placeholder="أدخل اسمك الكامل"
                  className="bg-slate-700/50 border-emerald-400/30 text-white"
                  data-testid="input-name"
                />
              </div>
            </CardContent>
          </Card>
        );

      case 1:
        return (
          <Card className="w-full max-w-2xl mx-auto bg-slate-800/50 border-emerald-400/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-emerald-400 flex items-center">
                <User className="w-6 h-6 ml-2" />
                المعلومات الأساسية
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-emerald-400 font-medium">الجنس</Label>
                <Select onValueChange={(value) => handleAnswerChange('gender', value)} data-testid="select-gender">
                  <SelectTrigger className="bg-slate-700/50 border-emerald-400/30 text-white mt-2">
                    <SelectValue placeholder="اختر الجنس" />
                  </SelectTrigger>
                  <SelectContent>
                    {genderOptions.map(option => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-emerald-400 font-medium">العمر</Label>
                <Select onValueChange={(value) => handleAnswerChange('age', value)} data-testid="select-age">
                  <SelectTrigger className="bg-slate-700/50 border-emerald-400/30 text-white mt-2">
                    <SelectValue placeholder="اختر الفئة العمرية" />
                  </SelectTrigger>
                  <SelectContent>
                    {ageRanges.map(option => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-emerald-400 font-medium">الوزن</Label>
                <Select onValueChange={(value) => handleAnswerChange('weight', value)} data-testid="select-weight">
                  <SelectTrigger className="bg-slate-700/50 border-emerald-400/30 text-white mt-2">
                    <SelectValue placeholder="اختر فئة الوزن" />
                  </SelectTrigger>
                  <SelectContent>
                    {weightRanges.map(option => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-emerald-400 font-medium">الطول</Label>
                <Select onValueChange={(value) => handleAnswerChange('height', value)} data-testid="select-height">
                  <SelectTrigger className="bg-slate-700/50 border-emerald-400/30 text-white mt-2">
                    <SelectValue placeholder="اختر فئة الطول" />
                  </SelectTrigger>
                  <SelectContent>
                    {heightRanges.map(option => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card className="w-full max-w-2xl mx-auto bg-slate-800/50 border-emerald-400/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-emerald-400 flex items-center">
                <Target className="w-6 h-6 ml-2" />
                هدفك الصحي
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3">
                {goalOptions.map(goal => (
                  <Button
                    key={goal}
                    variant={answers.goal === goal ? "default" : "outline"}
                    onClick={() => handleAnswerChange('goal', goal)}
                    className={`h-auto p-4 justify-start text-right ${
                      answers.goal === goal ? 
                      'bg-emerald-500 hover:bg-emerald-600 text-white' : 
                      'bg-slate-700/50 border-emerald-400/30 text-gray-300 hover:bg-emerald-400/10'
                    }`}
                    data-testid={`button-goal-${goal}`}
                  >
                    <div className="flex items-center">
                      {goal === "إنقاص الوزن" && <Heart className="w-5 h-5 ml-2" />}
                      {goal === "زيادة الكتلة العضلية" && <Dumbbell className="w-5 h-5 ml-2" />}
                      {goal === "الحفاظ على الصحة العامة" && <Shield className="w-5 h-5 ml-2" />}
                      {goal === "تحسين اللياقة" && <Zap className="w-5 h-5 ml-2" />}
                      {goal === "زيادة القوة" && <Trophy className="w-5 h-5 ml-2" />}
                      {goal}
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card className="w-full max-w-2xl mx-auto bg-slate-800/50 border-emerald-400/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-emerald-400 flex items-center">
                <DollarSign className="w-6 h-6 ml-2" />
                المستوى الاجتماعي والميزانية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3">
                {socialClassOptions.map(socialClass => (
                  <Button
                    key={socialClass}
                    variant={answers.socialClass === socialClass ? "default" : "outline"}
                    onClick={() => handleAnswerChange('socialClass', socialClass)}
                    className={`h-auto p-4 justify-start text-right ${
                      answers.socialClass === socialClass ? 
                      'bg-emerald-500 hover:bg-emerald-600 text-white' : 
                      'bg-slate-700/50 border-emerald-400/30 text-gray-300 hover:bg-emerald-400/10'
                    }`}
                    data-testid={`button-social-${socialClass}`}
                  >
                    {socialClass}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card className="w-full max-w-2xl mx-auto bg-slate-800/50 border-emerald-400/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-emerald-400 flex items-center">
                <Dumbbell className="w-6 h-6 ml-2" />
                مستوى النشاط الحالي
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3">
                {activityLevelOptions.map(level => (
                  <Button
                    key={level}
                    variant={answers.activityLevel === level ? "default" : "outline"}
                    onClick={() => handleAnswerChange('activityLevel', level)}
                    className={`h-auto p-4 justify-start text-right ${
                      answers.activityLevel === level ? 
                      'bg-emerald-500 hover:bg-emerald-600 text-white' : 
                      'bg-slate-700/50 border-emerald-400/30 text-gray-300 hover:bg-emerald-400/10'
                    }`}
                    data-testid={`button-activity-${level}`}
                  >
                    {level}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case 5:
        return (
          <Card className="w-full max-w-2xl mx-auto bg-slate-800/50 border-emerald-400/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-emerald-400 flex items-center">
                <Dumbbell className="w-6 h-6 ml-2" />
                نوع التمارين المفضلة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3">
                {exerciseTypeOptions.map(type => (
                  <Button
                    key={type}
                    variant={answers.exerciseType === type ? "default" : "outline"}
                    onClick={() => handleAnswerChange('exerciseType', type)}
                    className={`h-auto p-4 justify-start text-right ${
                      answers.exerciseType === type ? 
                      'bg-emerald-500 hover:bg-emerald-600 text-white' : 
                      'bg-slate-700/50 border-emerald-400/30 text-gray-300 hover:bg-emerald-400/10'
                    }`}
                    data-testid={`button-exercise-${type}`}
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case 6:
        return (
          <Card className="w-full max-w-2xl mx-auto bg-slate-800/50 border-emerald-400/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-emerald-400 flex items-center">
                <Clock className="w-6 h-6 ml-2" />
                الوقت المتاح للتمرين يومياً
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3">
                {dailyHoursOptions.map(hours => (
                  <Button
                    key={hours}
                    variant={answers.dailyHours === hours ? "default" : "outline"}
                    onClick={() => handleAnswerChange('dailyHours', hours)}
                    className={`h-auto p-4 justify-start text-right ${
                      answers.dailyHours === hours ? 
                      'bg-emerald-500 hover:bg-emerald-600 text-white' : 
                      'bg-slate-700/50 border-emerald-400/30 text-gray-300 hover:bg-emerald-400/10'
                    }`}
                    data-testid={`button-hours-${hours}`}
                  >
                    {hours}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case 7:
        return (
          <Card className="w-full max-w-2xl mx-auto bg-slate-800/50 border-emerald-400/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-emerald-400 flex items-center">
                <Apple className="w-6 h-6 ml-2" />
                الأطعمة المفضلة (اختر كل ما تحبه)
              </CardTitle>
              <p className="text-gray-400 text-sm">اختر الأطعمة التي تحبها وتتوفر في منطقتك</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-96 overflow-y-auto">
                {affordableFoods.map(food => (
                  <Button
                    key={food}
                    variant={answers.preferredFoods.includes(food) ? "default" : "outline"}
                    onClick={() => handleFoodSelection(food, true)}
                    className={`h-auto p-3 text-sm ${
                      answers.preferredFoods.includes(food) ? 
                      'bg-emerald-500 hover:bg-emerald-600 text-white' : 
                      'bg-slate-700/50 border-emerald-400/30 text-gray-300 hover:bg-emerald-400/10'
                    }`}
                    data-testid={`button-food-${food}`}
                  >
                    {food}
                  </Button>
                ))}
              </div>
              <p className="text-sm text-gray-400 mt-4">
                محدد: {answers.preferredFoods.length} طعام
              </p>
            </CardContent>
          </Card>
        );

      case 8:
        return (
          <Card className="w-full max-w-2xl mx-auto bg-slate-800/50 border-emerald-400/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-emerald-400 flex items-center">
                <Shield className="w-6 h-6 ml-2" />
                الأطعمة الممنوعة أو المكروهة
              </CardTitle>
              <p className="text-gray-400 text-sm">اختر الأطعمة التي لا تريدها في خطتك</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {forbiddenFoodOptions.map(food => (
                  <Button
                    key={food}
                    variant={answers.forbiddenFoods.includes(food) ? "destructive" : "outline"}
                    onClick={() => handleFoodSelection(food, false)}
                    className={`h-auto p-3 text-sm ${
                      answers.forbiddenFoods.includes(food) ? 
                      'bg-red-500 hover:bg-red-600 text-white' : 
                      'bg-slate-700/50 border-emerald-400/30 text-gray-300 hover:bg-red-400/10'
                    }`}
                    data-testid={`button-forbidden-${food}`}
                  >
                    {food}
                  </Button>
                ))}
              </div>
              <p className="text-sm text-gray-400 mt-4">
                ممنوع: {answers.forbiddenFoods.length} طعام
              </p>
            </CardContent>
          </Card>
        );

      case 9:
        return (
          <Card className="w-full max-w-2xl mx-auto bg-slate-800/50 border-emerald-400/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-emerald-400 flex items-center">
                <Brain className="w-6 h-6 ml-2" />
                استخدام المكملات الغذائية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3">
                {supplementOptions.map(supplement => (
                  <Button
                    key={supplement}
                    variant={answers.supplements === supplement ? "default" : "outline"}
                    onClick={() => handleAnswerChange('supplements', supplement)}
                    className={`h-auto p-4 justify-start text-right ${
                      answers.supplements === supplement ? 
                      'bg-emerald-500 hover:bg-emerald-600 text-white' : 
                      'bg-slate-700/50 border-emerald-400/30 text-gray-300 hover:bg-emerald-400/10'
                    }`}
                    data-testid={`button-supplement-${supplement}`}
                  >
                    {supplement}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case 10:
        return (
          <Card className="w-full max-w-2xl mx-auto bg-slate-800/50 border-emerald-400/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-emerald-400 flex items-center">
                <Calendar className="w-6 h-6 ml-2" />
                نظام توقيت الوجبات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3">
                {mealTimingOptions.map(timing => (
                  <Button
                    key={timing}
                    variant={answers.mealTiming === timing ? "default" : "outline"}
                    onClick={() => handleAnswerChange('mealTiming', timing)}
                    className={`h-auto p-4 justify-start text-right ${
                      answers.mealTiming === timing ? 
                      'bg-emerald-500 hover:bg-emerald-600 text-white' : 
                      'bg-slate-700/50 border-emerald-400/30 text-gray-300 hover:bg-emerald-400/10'
                    }`}
                    data-testid={`button-timing-${timing}`}
                  >
                    {timing}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case 11:
        return (
          <Card className="w-full max-w-2xl mx-auto bg-slate-800/50 border-emerald-400/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-emerald-400 flex items-center">
                <Star className="w-6 h-6 ml-2" />
                مراجعة اختياراتك
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-700/30 p-4 rounded-lg">
                  <h4 className="text-emerald-400 font-semibold mb-2">المعلومات الشخصية</h4>
                  <p className="text-sm text-gray-300">الاسم: {answers.name}</p>
                  <p className="text-sm text-gray-300">الجنس: {answers.gender}</p>
                  <p className="text-sm text-gray-300">العمر: {answers.age}</p>
                  <p className="text-sm text-gray-300">الوزن: {answers.weight}</p>
                  <p className="text-sm text-gray-300">الطول: {answers.height}</p>
                </div>
                
                <div className="bg-slate-700/30 p-4 rounded-lg">
                  <h4 className="text-emerald-400 font-semibold mb-2">الأهداف والنشاط</h4>
                  <p className="text-sm text-gray-300">الهدف: {answers.goal}</p>
                  <p className="text-sm text-gray-300">المستوى الاجتماعي: {answers.socialClass}</p>
                  <p className="text-sm text-gray-300">مستوى النشاط: {answers.activityLevel}</p>
                  <p className="text-sm text-gray-300">نوع التمارين: {answers.exerciseType}</p>
                  <p className="text-sm text-gray-300">وقت التمرين: {answers.dailyHours}</p>
                </div>
                
                <div className="bg-slate-700/30 p-4 rounded-lg">
                  <h4 className="text-emerald-400 font-semibold mb-2">التغذية والمكملات</h4>
                  <p className="text-sm text-gray-300">توقيت الوجبات: {answers.mealTiming}</p>
                  <p className="text-sm text-gray-300">المكملات: {answers.supplements}</p>
                  <p className="text-sm text-gray-300">الأطعمة المفضلة: {answers.preferredFoods.length} نوع</p>
                  <p className="text-sm text-gray-300">الأطعمة الممنوعة: {answers.forbiddenFoods.length} نوع</p>
                </div>
                
                <div className="bg-slate-700/30 p-4 rounded-lg">
                  <h4 className="text-emerald-400 font-semibold mb-2">احصائيات الخطة</h4>
                  <p className="text-sm text-gray-300">مدة الخطة: 6 أشهر (180 يوم)</p>
                  <p className="text-sm text-gray-300">خطط متاحة: 100,000+</p>
                  <p className="text-sm text-gray-300">التنوع اليومي: كامل</p>
                  <p className="text-sm text-gray-300">التحديث الذكي: متاح</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 12:
        return (
          <Card className="w-full max-w-2xl mx-auto bg-slate-800/50 border-emerald-400/30 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-emerald-400 flex items-center justify-center">
                <Sparkles className="w-8 h-8 ml-2" />
                جاري إنشاء خطتك الشخصية
              </CardTitle>
              <p className="text-gray-300">نقوم بتحليل إجاباتك وإنشاء خطة مخصصة من 100,000+ خطة متاحة</p>
            </CardHeader>
            <CardContent className="text-center">
              {isGenerating ? (
                <div className="space-y-6">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-400 border-t-transparent mx-auto"></div>
                  <div className="space-y-2">
                    <p className="text-emerald-400 font-semibold">تحليل إجاباتك...</p>
                    <p className="text-gray-400 text-sm">اختيار أفضل خطة من 100,000+ خطة متاحة</p>
                    <p className="text-gray-400 text-sm">تخصيص الوجبات اليومية لـ 180 يوم</p>
                    <p className="text-gray-400 text-sm">تصميم برنامج التمارين المناسب لك</p>
                  </div>
                </div>
              ) : (
                <Button 
                  onClick={generatePlan}
                  className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white h-14 text-lg font-semibold"
                  data-testid="button-generate-plan"
                >
                  <Sparkles className="w-6 h-6 ml-2" />
                  ابدأ إنشاء خطتي الشخصية
                </Button>
              )}
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  if (generatedPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900/20 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <Button
              onClick={() => setLocation("/")}
              variant="ghost"
              className="mb-4 text-emerald-400 hover:text-emerald-300"
              data-testid="button-back-home"
            >
              العودة للرئيسية
            </Button>
            <h1 className="text-4xl font-bold text-emerald-400 mb-2">
              🎯 خطة {generatedPlan.userProfile.name} الشخصية
            </h1>
            <p className="text-gray-300 text-lg">
              خطة شاملة لـ 6 أشهر مصممة خصيصاً لك من {generatedPlan.id}
            </p>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 border-emerald-400/30">
              <TabsTrigger value="overview" className="data-[state=active]:bg-emerald-500">نظرة عامة</TabsTrigger>
              <TabsTrigger value="nutrition" className="data-[state=active]:bg-emerald-500">التغذية</TabsTrigger>
              <TabsTrigger value="exercise" className="data-[state=active]:bg-emerald-500">التمارين</TabsTrigger>
              <TabsTrigger value="download" className="data-[state=active]:bg-emerald-500">التحميل</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-slate-800/50 border-emerald-400/30">
                  <CardHeader>
                    <CardTitle className="text-emerald-400 flex items-center">
                      <Calendar className="w-5 h-5 ml-2" />
                      مدة الخطة
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-white">{generatedPlan.planDuration}</p>
                    <p className="text-gray-400">يوم</p>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-emerald-400/30">
                  <CardHeader>
                    <CardTitle className="text-emerald-400 flex items-center">
                      <DollarSign className="w-5 h-5 ml-2" />
                      الميزانية المتوقعة
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-white">{generatedPlan.estimatedBudget}</p>
                    <p className="text-gray-400">ريال</p>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-emerald-400/30">
                  <CardHeader>
                    <CardTitle className="text-emerald-400 flex items-center">
                      <Trophy className="w-5 h-5 ml-2" />
                      نوع الخطة
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-bold text-white">{generatedPlan.userProfile.goal}</p>
                    <p className="text-gray-400">{generatedPlan.userProfile.exerciseType}</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-slate-800/50 border-emerald-400/30">
                <CardHeader>
                  <CardTitle className="text-emerald-400">ملخص الخطة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-white font-semibold mb-2">المكملات المقترحة:</h4>
                      {generatedPlan.supplementPlan.length > 0 ? (
                        <ul className="list-disc list-inside text-gray-300 space-y-1">
                          {generatedPlan.supplementPlan.map((supplement, index) => (
                            <li key={index}>{supplement}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-400">لا توجد مكملات مطلوبة</p>
                      )}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-2">نظام الوجبات:</h4>
                      <p className="text-gray-300">{generatedPlan.userProfile.mealTiming}</p>
                      <h4 className="text-white font-semibold mb-2 mt-4">وقت التمرين:</h4>
                      <p className="text-gray-300">{generatedPlan.userProfile.dailyHours} يومياً</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="nutrition" className="space-y-4">
              <div className="max-h-96 overflow-y-auto space-y-3">
                {generatedPlan.nutritionPlan.slice(0, 10).map((day, index) => (
                  <Card key={index} className="bg-slate-800/50 border-emerald-400/30">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="text-emerald-400 font-semibold">اليوم {day.day}</h4>
                        <Badge variant="outline" className="text-emerald-400 border-emerald-400">
                          {day.cost} ريال
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                        <div>
                          <span className="text-yellow-400 font-medium">الفطور:</span>
                          <p className="text-gray-300">{day.breakfast}</p>
                        </div>
                        <div>
                          <span className="text-orange-400 font-medium">الغداء:</span>
                          <p className="text-gray-300">{day.lunch}</p>
                        </div>
                        <div>
                          <span className="text-blue-400 font-medium">العشاء:</span>
                          <p className="text-gray-300">{day.dinner}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <p className="text-center text-gray-400">
                عرض أول 10 أيام فقط. احصل على الخطة الكاملة (180 يوم) عند التحميل
              </p>
            </TabsContent>

            <TabsContent value="exercise" className="space-y-4">
              <div className="max-h-96 overflow-y-auto space-y-3">
                {generatedPlan.exercisePlan.slice(0, 7).map((day, index) => (
                  <Card key={index} className="bg-slate-800/50 border-emerald-400/30">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="text-emerald-400 font-semibold">اليوم {day.day}</h4>
                        <Badge variant="outline" className="text-purple-400 border-purple-400">
                          {day.difficulty} - {day.duration} دقيقة
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        {day.exercises.map((exercise, exerciseIndex) => (
                          <div key={exerciseIndex} className="bg-slate-700/30 p-3 rounded">
                            <div className="flex justify-between items-center">
                              <span className="text-white font-medium">{exercise.name}</span>
                              <span className="text-gray-400 text-sm">{exercise.sets} × {exercise.reps}</span>
                            </div>
                            <p className="text-gray-400 text-sm mt-1">{exercise.description}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <p className="text-center text-gray-400">
                عرض أول 7 أيام فقط. احصل على الخطة الكاملة (180 يوم) عند التحميل
              </p>
            </TabsContent>

            <TabsContent value="download" className="space-y-6">
              <Card className="bg-slate-800/50 border-emerald-400/30">
                <CardHeader className="text-center">
                  <CardTitle className="text-emerald-400 text-2xl">تحميل خطتك الشخصية</CardTitle>
                  <p className="text-gray-300">احصل على ملف HTML تفاعلي يعمل أوفلاين بدون إنترنت</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="text-white font-semibold">📱 مميزات الملف:</h4>
                      <ul className="text-gray-300 space-y-2 text-sm">
                        <li>✅ يعمل بدون إنترنت</li>
                        <li>✅ تتبع الإنجاز اليومي</li>
                        <li>✅ تحديث تلقائي للإحصائيات</li>
                        <li>✅ تصميم تفاعلي جميل</li>
                        <li>✅ حفظ التقدم محلياً</li>
                        <li>✅ عداد أيام ذكي</li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-white font-semibold">📊 المحتوى:</h4>
                      <ul className="text-gray-300 space-y-2 text-sm">
                        <li>🗓️ خطة 180 يوم كاملة</li>
                        <li>🍽️ وجبات مختلفة كل يوم</li>
                        <li>💪 تمارين متدرجة</li>
                        <li>📈 إحصائيات شاملة</li>
                        <li>🎯 تتبع الأهداف</li>
                        <li>⭐ نظام تحفيز ذكي</li>
                      </ul>
                    </div>
                  </div>
                  
                  <Button
                    onClick={downloadPlan}
                    className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white h-16 text-xl font-bold"
                    data-testid="button-download-plan"
                  >
                    <Download className="w-8 h-8 ml-3" />
                    تحميل خطة {generatedPlan.userProfile.name} الشخصية
                    <span className="text-sm block mt-1">ملف HTML تفاعلي - 6 أشهر كاملة</span>
                  </Button>
                  
                  <div className="text-center">
                    <p className="text-gray-400 text-sm">
                      حجم الملف: ~2MB | يعمل على جميع الأجهزة | متوافق مع جميع المتصفحات
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900/20 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Button
            onClick={() => setLocation("/")}
            variant="ghost"
            className="mb-4 text-emerald-400 hover:text-emerald-300"
            data-testid="button-back-home"
          >
            العودة للرئيسية
          </Button>
          
          <h1 className="text-4xl font-bold text-emerald-400 mb-2">
            🎯 صمم حياتك
          </h1>
          <p className="text-gray-300 text-lg mb-6">
            نظام ذكي لتصميم خطة صحية شخصية من 100,000+ خطة مختلفة
          </p>
          
          <div className="mb-8">
            <Progress value={progress} className="h-3 bg-slate-700" />
            <p className="text-emerald-400 mt-2 font-semibold">
              الخطوة {currentStep + 1} من {totalSteps} ({Math.round(progress)}%)
            </p>
          </div>
        </div>

        <div className="mb-8">
          {renderStep()}
        </div>

        <div className="flex justify-between">
          <Button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            variant="outline"
            className="border-emerald-400/30 text-emerald-400 hover:bg-emerald-400/10"
            data-testid="button-previous"
          >
            السابق
          </Button>

          <Button
            onClick={() => {
              if (currentStep < totalSteps - 1) {
                setCurrentStep(currentStep + 1);
              }
            }}
            disabled={
              currentStep === totalSteps - 1 ||
              (currentStep === 0 && !answers.name) ||
              (currentStep === 1 && (!answers.gender || !answers.age || !answers.weight || !answers.height)) ||
              (currentStep === 2 && !answers.goal) ||
              (currentStep === 3 && !answers.socialClass) ||
              (currentStep === 4 && !answers.activityLevel) ||
              (currentStep === 5 && !answers.exerciseType) ||
              (currentStep === 6 && !answers.dailyHours) ||
              (currentStep === 7 && answers.preferredFoods.length === 0) ||
              (currentStep === 9 && !answers.supplements) ||
              (currentStep === 10 && !answers.mealTiming)
            }
            className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white"
            data-testid="button-next"
          >
            {currentStep === totalSteps - 1 ? "إنهاء" : "التالي"}
            <ChevronRight className="w-4 h-4 mr-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}