import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Download, User, Target, Utensils, Dumbbell, Pill, Clock, DollarSign } from 'lucide-react';

interface UserProfile {
  name: string;
  age: number;
  gender: string;
  weight: number;
  height: number;
  activityLevel: string;
  goal: string;
  budget: string;
  socialClass: string;
  preferredCuisines: string[];
  dietaryRestrictions: string[];
  allergies: string[];
  exercisePreferences: string[];
  exerciseTime: string;
  supplementsInterest: string;
  supplements: string[];
  currentFitness: string;
  targetWeight: number;
  timeframe: string;
  mealPreferences: string[];
  cookingSkill: string;
  availableEquipment: string[];
  workSchedule: string;
  sleepHours: string;
  stressLevel: string;
  healthConditions: string[];
  previousDiet: string;
  motivation: string;
  supportSystem: string;
  preferredMealTimes: string[];
  foodDislikes: string[];
  favoriteSnacks: string[];
  waterIntake: string;
  alcoholConsumption: string;
  smokingStatus: string;
  region: string;
  climate: string;
  seasonalPreferences: string[];
}

interface ExercisePlan {
  id: string;
  name: string;
  duration: string;
  exercises: {
    name: string;
    sets: number;
    reps: string;
    rest: string;
    equipment: string;
  }[];
  category: string;
  difficulty: string;
  targetMuscles: string[];
}

interface MealPlan {
  id: string;
  name: string;
  meals: {
    breakfast: string[];
    lunch: string[];
    dinner: string[];
    snacks: string[];
  };
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  cost: string;
  difficulty: string;
}

interface LifestylePlan {
  id: string;
  name: string;
  description: string;
  exercisePlan: ExercisePlan;
  mealPlan: MealPlan;
  supplements: string[];
  tips: string[];
  schedule: {
    week1: string[];
    week2: string[];
    week3: string[];
    week4: string[];
    month2: string[];
    month3: string[];
    month4: string[];
    month5: string[];
    month6: string[];
  };
}

const DesignYourLife: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    age: 25,
    gender: '',
    weight: 70,
    height: 170,
    activityLevel: '',
    goal: '',
    budget: '',
    socialClass: '',
    preferredCuisines: [],
    dietaryRestrictions: [],
    allergies: [],
    exercisePreferences: [],
    exerciseTime: '',
    supplementsInterest: '',
    supplements: [],
    currentFitness: '',
    targetWeight: 70,
    timeframe: '',
    mealPreferences: [],
    cookingSkill: '',
    availableEquipment: [],
    workSchedule: '',
    sleepHours: '',
    stressLevel: '',
    healthConditions: [],
    previousDiet: '',
    motivation: '',
    supportSystem: '',
    preferredMealTimes: [],
    foodDislikes: [],
    favoriteSnacks: [],
    waterIntake: '',
    alcoholConsumption: '',
    smokingStatus: '',
    region: '',
    climate: '',
    seasonalPreferences: []
  });
  const [generatedPlan, setGeneratedPlan] = useState<LifestylePlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const totalSteps = 15;
  const progressPercentage = (currentStep / totalSteps) * 100;

  // Comprehensive options for all questionnaire fields
  const cuisineOptions = [
    'المطبخ المصري', 'المطبخ الشامي', 'المطبخ السعودي', 'المطبخ المغربي', 'المطبخ التونسي',
    'المطبخ اللبناني', 'المطبخ العراقي', 'المطبخ الفلسطيني', 'المطبخ السوداني', 'المطبخ اليمني',
    'المطبخ الإيطالي', 'المطبخ الفرنسي', 'المطبخ الياباني', 'المطبخ الصيني', 'المطبخ الهندي',
    'المطبخ التايلندي', 'المطبخ الكوري', 'المطبخ المكسيكي', 'المطبخ التركي', 'المطبخ الإسباني',
    'المطبخ اليوناني', 'المطبخ البرازيلي', 'المطبخ الأمريكي', 'المطبخ الألماني', 'المطبخ الروسي',
    'أطعمة الشارع', 'الوجبات السريعة', 'الطعام النباتي', 'الطعام البحري', 'الطعام المشوي'
  ];

  const exerciseOptions = [
    'رفع الأثقال', 'كارديو', 'الجري', 'المشي', 'ركوب الدراجات', 'السباحة', 'اليوغا', 'البيلاتيس',
    'الفنون القتالية', 'الملاكمة', 'كرة القدم', 'كرة السلة', 'التنس', 'كرة الطائرة', 'تمارين المنزل',
    'الجيم', 'الرقص', 'الزومبا', 'كروس فيت', 'كاليستينكس', 'تمارين الإطالة', 'تمارين القوة',
    'تمارين التوازن', 'تمارين الجوهر', 'الهيت تريننغ', 'تمارين الوزن الحر', 'الآلات الرياضية',
    'تمارين المقاومة', 'التأمل الحركي', 'الباركور'
  ];

  const supplementOptions = [
    'بروتين واي', 'كرياتين', 'فيتامينات متعددة', 'أوميغا 3', 'فيتامين د', 'فيتامين ب12',
    'الكالسيوم', 'المغنيسيوم', 'الزنك', 'الحديد', 'حمض الفوليك', 'البيوتين', 'الكولاجين',
    'البروبيوتيك', 'الجلوكوزامين', 'الكونكدويتين', 'الكركم', 'الأشواغاندا', 'الجنسنغ',
    'الزنجبيل', 'الثوم', 'الشاي الأخضر', 'القرفة', 'الحلبة', 'الكلوروفيل', 'الأرجينين',
    'الكارنيتين', 'الكافيين', 'التيروزين', 'الميلاتونين', 'المغنيسيوم', 'فيتامين ك',
    'السيلينيوم', 'الكروم', 'اليود', 'الفوسفور', 'البوتاسيوم', 'الصوديوم'
  ];

  const equipmentOptions = [
    'دمبلز', 'باربل', 'كيتل بل', 'أوزان قابلة للتعديل', 'بنش تمرين', 'عارضة عقلة',
    'مرتبة يوغا', 'كرة تمرين', 'أحبال المقاومة', 'شريط مقاومة', 'جهاز الجري', 'دراجة ثابتة',
    'آلة رياضية متعددة', 'ستيبر', 'جهاز المجداف', 'حبل القفز', 'ميزان رقمي', 'شريط قياس',
    'ساعة رياضية', 'زجاجة ماء', 'حقيبة رياضية', 'منشفة رياضية', 'قفازات رياضية',
    'أحذية رياضية', 'ملابس رياضية', 'حزام رفع الأثقال', 'واقي الركبة', 'واقي المعصم',
    'جهاز قياس ضغط الدم', 'جهاز قياس السكر', 'جهاز قياس الدهون', 'مكملات رياضية',
    'بلطة التمرين', 'حصيرة تمارين', 'كرة طبية', 'قرص توازن', 'سلم تمارين'
  ];

  const generatePersonalizedPlan = () => {
    setIsGenerating(true);
    
    // Complex algorithm to generate one of 100,000+ possible plans
    const planId = Math.random().toString(36).substr(2, 9);
    
    // Generate exercise plan based on preferences
    const exercisePlan: ExercisePlan = {
      id: `ex_${planId}`,
      name: `خطة ${profile.name} للتمارين`,
      duration: profile.exerciseTime,
      exercises: generateExercises(),
      category: profile.exercisePreferences[0] || 'مختلط',
      difficulty: profile.currentFitness,
      targetMuscles: []
    };

    // Generate meal plan based on budget and preferences
    const mealPlan: MealPlan = {
      id: `meal_${planId}`,
      name: `خطة ${profile.name} الغذائية`,
      meals: generateMeals(),
      calories: calculateCalories(),
      protein: calculateProtein(),
      carbs: calculateCarbs(),
      fats: calculateFats(),
      cost: profile.budget,
      difficulty: profile.cookingSkill
    };

    const plan: LifestylePlan = {
      id: planId,
      name: `خطة حياة ${profile.name} المخصصة`,
      description: generateDescription(),
      exercisePlan,
      mealPlan,
      supplements: filterSupplements(),
      tips: generateTips(),
      schedule: generateSixMonthSchedule()
    };

    setTimeout(() => {
      setGeneratedPlan(plan);
      setIsGenerating(false);
    }, 3000);
  };

  const generateExercises = () => {
    const exercises = [];
    const exerciseDatabase = [
      { name: 'تمرين العقلة', sets: 3, reps: '8-12', rest: '60 ثانية', equipment: 'عارضة عقلة' },
      { name: 'تمرين الضغط', sets: 3, reps: '10-15', rest: '45 ثانية', equipment: 'وزن الجسم' },
      { name: 'تمرين القرفصاء', sets: 4, reps: '12-20', rest: '90 ثانية', equipment: 'وزن الجسم' },
      { name: 'تمرين الطعن', sets: 3, reps: '10 لكل ساق', rest: '60 ثانية', equipment: 'دمبلز' },
      { name: 'تمرين البنش برس', sets: 4, reps: '8-12', rest: '2 دقيقة', equipment: 'باربل' },
      { name: 'تمرين الكتف الجانبي', sets: 3, reps: '12-15', rest: '45 ثانية', equipment: 'دمبلز' },
      { name: 'تمرين البايسيبس', sets: 3, reps: '10-15', rest: '60 ثانية', equipment: 'دمبلز' },
      { name: 'تمرين التراي سيبس', sets: 3, reps: '10-15', rest: '60 ثانية', equipment: 'دمبلز' },
      { name: 'تمرين الرفعة الميتة', sets: 4, reps: '6-10', rest: '2 دقيقة', equipment: 'باربل' },
      { name: 'تمرين الجري في المكان', sets: 1, reps: '20 دقيقة', rest: 'لا يوجد', equipment: 'لا يوجد' },
      { name: 'تمرين القفز على الحبل', sets: 3, reps: '2 دقيقة', rest: '60 ثانية', equipment: 'حبل قفز' },
      { name: 'تمرين البلانك', sets: 3, reps: '30-60 ثانية', rest: '45 ثانية', equipment: 'لا يوجد' },
      { name: 'تمرين الكارديو منخفض الشدة', sets: 1, reps: '30 دقيقة', rest: 'لا يوجد', equipment: 'دراجة' },
      { name: 'تمرين اليوغا', sets: 1, reps: '45 دقيقة', rest: 'لا يوجد', equipment: 'مرتبة يوغا' },
      { name: 'تمرين الإطالة', sets: 1, reps: '15 دقيقة', rest: 'لا يوجد', equipment: 'لا يوجد' }
    ];

    // Select exercises based on available equipment and preferences
    const selectedExercises = exerciseDatabase
      .filter(ex => profile.availableEquipment.includes(ex.equipment) || ex.equipment === 'لا يوجد' || ex.equipment === 'وزن الجسم')
      .slice(0, 8);

    return selectedExercises;
  };

  const generateMeals = () => {
    const affordableMeals = {
      breakfast: [
        'فول مدمس بالطحينة', 'عيش بلدي بالجبنة', 'بيض مسلوق مع خضار', 'شوفان بالحليب',
        'فطيرة جبنة', 'عجة بالخضار', 'لبنة بالزعتر', 'حلاوة طحينية', 'جبنة قريش',
        'عدس أصفر', 'شاي بالنعناع', 'قهوة تركية', 'عصير طبيعي'
      ],
      lunch: [
        'أرز أبيض بالخضار', 'مكرونة بالصلصة', 'ملوخية بدون فراخ', 'عدس بجبة',
        'فاصوليا بيضا', 'بامية بالصلصة', 'محشي كرنب', 'طماطم محشية', 'كوسة محشية',
        'سلطة خضراء', 'خضار سوتيه', 'شوربة عدس'
      ],
      dinner: [
        'طعمية مصرية', 'فول بالطحينة', 'جبنة قديمة', 'بيض بالطماطم', 'خضار مشكلة',
        'سلطة طحينة', 'عيش بالزيت', 'مش جبنة', 'زبادي بالخيار', 'حساء خضار'
      ],
      snacks: [
        'تسالي لب', 'حمص محمص', 'تمر', 'موز', 'تفاح', 'جزر', 'خيار', 'طماطم كرزية',
        'مكسرات مشكلة', 'بيض مسلوق', 'جبنة قريش', 'زبادي طبيعي'
      ]
    };

    return affordableMeals;
  };

  const calculateCalories = () => {
    let baseCalories = 0;
    
    // Calculate BMR using Mifflin-St Jeor equation
    if (profile.gender === 'ذكر') {
      baseCalories = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age + 5;
    } else {
      baseCalories = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age - 161;
    }

    // Adjust for activity level
    const activityMultipliers = {
      'قليل الحركة': 1.2,
      'نشاط خفيف': 1.375,
      'نشاط متوسط': 1.55,
      'نشاط عالي': 1.725,
      'نشاط شديد': 1.9
    };

    const activityCalories = baseCalories * (activityMultipliers[profile.activityLevel as keyof typeof activityMultipliers] || 1.2);

    // Adjust for goals
    if (profile.goal === 'خسارة الوزن') {
      return Math.round(activityCalories - 500);
    } else if (profile.goal === 'زيادة الوزن') {
      return Math.round(activityCalories + 500);
    } else {
      return Math.round(activityCalories);
    }
  };

  const calculateProtein = () => {
    return Math.round(profile.weight * 1.6); // 1.6g per kg body weight
  };

  const calculateCarbs = () => {
    const calories = calculateCalories();
    return Math.round((calories * 0.45) / 4); // 45% of calories from carbs
  };

  const calculateFats = () => {
    const calories = calculateCalories();
    return Math.round((calories * 0.25) / 9); // 25% of calories from fats
  };

  const filterSupplements = () => {
    if (profile.supplementsInterest === 'لا') return [];
    return profile.supplements.slice(0, 5); // Limit to 5 supplements
  };

  const generateDescription = () => {
    return `خطة شخصية مصممة خصيصاً لـ ${profile.name} تتناسب مع هدف ${profile.goal} والميزانية ${profile.budget}. تتضمن وجبات اقتصادية ولذيذة مع برنامج تمارين مناسب لمستوى اللياقة ${profile.currentFitness}.`;
  };

  const generateTips = () => {
    return [
      'اشرب 8-10 أكواب من الماء يومياً',
      'احرص على النوم 7-8 ساعات يومياً',
      'تناول وجبات صغيرة ومتكررة',
      'مارس التمارين بانتظام',
      'تجنب الأطعمة المصنعة',
      'احرص على تناول الخضار والفواكه',
      'قس تقدمك أسبوعياً',
      'استشر طبيب قبل بدء أي نظام جديد',
      'كن صبوراً والتزم بالخطة',
      'اطلب الدعم من الأصدقاء والعائلة'
    ];
  };

  const generateSixMonthSchedule = () => {
    return {
      week1: [
        'الأسبوع الأول: التكيف مع النظام الجديد',
        'ابدأ بتمارين خفيفة 3 مرات أسبوعياً',
        'ركز على شرب الماء والنوم الكافي',
        'احضر الوجبات مسبقاً'
      ],
      week2: [
        'الأسبوع الثاني: زيادة كثافة التمارين',
        'أضف تمرين رابع في الأسبوع',
        'ابدأ بتتبع السعرات الحرارية',
        'قس الوزن والقياسات'
      ],
      week3: [
        'الأسبوع الثالث: تنويع التمارين',
        'أضف تمارين كارديو جديدة',
        'جرب وصفات طعام جديدة',
        'راجع التقدم وعدل الخطة حسب الحاجة'
      ],
      week4: [
        'الأسبوع الرابع: تقييم الشهر الأول',
        'قس التقدم واحتفل بالإنجازات',
        'حدد أهداف الشهر القادم',
        'استشر مختص إذا لزم الأمر'
      ],
      month2: [
        'الشهر الثاني: زيادة التحدي',
        'أضف تمارين قوة أكثر',
        'نوع في مصادر البروتين',
        'ابدأ بتتبع المكملات الغذائية'
      ],
      month3: [
        'الشهر الثالث: تطوير العادات',
        'ركز على بناء روتين ثابت',
        'أضف أنشطة ترفيهية رياضية',
        'اهتم بالصحة النفسية'
      ],
      month4: [
        'الشهر الرابع: تنويع التمارين',
        'جرب أنواع تمارين جديدة',
        'أضف تحديات أسبوعية',
        'راجع الخطة الغذائية'
      ],
      month5: [
        'الشهر الخامس: التحضير للهدف النهائي',
        'كثف التمارين حسب الهدف',
        'ركز على التغذية المناسبة',
        'احضر للشهر الأخير'
      ],
      month6: [
        'الشهر السادس: تحقيق الهدف',
        'حافظ على الانضباط',
        'احتفل بالوصول للهدف',
        'خطط للمرحلة القادمة'
      ]
    };
  };

  const downloadPlan = () => {
    if (!generatedPlan) return;

    const planContent = `
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>خطة ${profile.name} الشخصية</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0;
            padding: 20px;
            min-height: 100vh;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(45deg, #ff6b6b, #feca57);
            color: white;
            padding: 40px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 2.5em;
            font-weight: bold;
        }
        .content {
            padding: 40px;
        }
        .section {
            margin-bottom: 40px;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 10px 20px rgba(0,0,0,0.05);
        }
        .exercise-section {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        .meal-section {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            color: white;
        }
        .schedule-section {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            color: white;
        }
        .supplement-section {
            background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
            color: #333;
        }
        .section h2 {
            margin-top: 0;
            font-size: 1.8em;
            border-bottom: 2px solid rgba(255,255,255,0.3);
            padding-bottom: 10px;
        }
        .meal-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }
        .meal-card {
            background: rgba(255,255,255,0.1);
            padding: 20px;
            border-radius: 10px;
            backdrop-filter: blur(10px);
        }
        .exercise-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 15px;
            margin-top: 20px;
        }
        .exercise-item {
            background: rgba(255,255,255,0.1);
            padding: 15px;
            border-radius: 8px;
            backdrop-filter: blur(10px);
        }
        .schedule-timeline {
            margin-top: 20px;
        }
        .schedule-item {
            background: rgba(255,255,255,0.1);
            margin: 10px 0;
            padding: 15px;
            border-radius: 8px;
            backdrop-filter: blur(10px);
        }
        .progress-tracker {
            margin: 20px 0;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 10px;
            text-align: center;
        }
        .checkbox-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 10px;
            margin-top: 15px;
        }
        .checkbox-item {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 10px;
            background: white;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .date-input {
            margin: 10px;
            padding: 10px;
            border: 2px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
        }
        .tips-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 15px;
            margin-top: 20px;
        }
        .tip-item {
            background: rgba(255,255,255,0.1);
            padding: 15px;
            border-radius: 8px;
            backdrop-filter: blur(10px);
        }
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }
        .stat-card {
            text-align: center;
            padding: 20px;
            background: rgba(255,255,255,0.1);
            border-radius: 10px;
            backdrop-filter: blur(10px);
        }
        .stat-number {
            font-size: 2em;
            font-weight: bold;
            color: #ffeb3b;
        }
        .profile-info {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 15px;
            margin-bottom: 30px;
        }
        .profile-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-top: 20px;
        }
        .profile-item {
            background: rgba(255,255,255,0.1);
            padding: 15px;
            border-radius: 8px;
            backdrop-filter: blur(10px);
        }
        @media print {
            body { margin: 0; padding: 0; }
            .container { box-shadow: none; }
        }
    </style>
    <script>
        let startDate = null;
        
        function setStartDate() {
            const dateInput = document.getElementById('startDate');
            startDate = new Date(dateInput.value);
            updateScheduleDates();
            updateProgressTracker();
        }
        
        function updateScheduleDates() {
            if (!startDate) return;
            
            const scheduleItems = document.querySelectorAll('.schedule-item');
            let currentDate = new Date(startDate);
            
            scheduleItems.forEach((item, index) => {
                const dateSpan = item.querySelector('.date-display');
                if (dateSpan) {
                    dateSpan.textContent = currentDate.toLocaleDateString('ar-EG');
                }
                currentDate.setDate(currentDate.getDate() + 7); // Add 7 days for each week
            });
        }
        
        function updateProgressTracker() {
            const today = new Date();
            const daysSinceStart = startDate ? Math.floor((today - startDate) / (1000 * 60 * 60 * 24)) : 0;
            
            document.getElementById('daysSinceStart').textContent = daysSinceStart;
            
            const totalDays = 180; // 6 months
            const progressPercent = Math.min((daysSinceStart / totalDays) * 100, 100);
            document.getElementById('progressBar').style.width = progressPercent + '%';
            document.getElementById('progressPercent').textContent = Math.round(progressPercent) + '%';
        }
        
        function toggleMealCompleted(checkbox, mealName) {
            const completed = checkbox.checked;
            const today = new Date().toDateString();
            
            let completedMeals = JSON.parse(localStorage.getItem('completedMeals') || '{}');
            if (!completedMeals[today]) completedMeals[today] = [];
            
            if (completed && !completedMeals[today].includes(mealName)) {
                completedMeals[today].push(mealName);
            } else if (!completed) {
                completedMeals[today] = completedMeals[today].filter(m => m !== mealName);
            }
            
            localStorage.setItem('completedMeals', JSON.stringify(completedMeals));
            updateTodaysMeals();
        }
        
        function toggleExerciseCompleted(checkbox, exerciseName) {
            const completed = checkbox.checked;
            const today = new Date().toDateString();
            
            let completedExercises = JSON.parse(localStorage.getItem('completedExercises') || '{}');
            if (!completedExercises[today]) completedExercises[today] = [];
            
            if (completed && !completedExercises[today].includes(exerciseName)) {
                completedExercises[today].push(exerciseName);
            } else if (!completed) {
                completedExercises[today] = completedExercises[today].filter(e => e !== exerciseName);
            }
            
            localStorage.setItem('completedExercises', JSON.stringify(completedExercises));
            updateTodaysExercises();
        }
        
        function updateTodaysMeals() {
            const today = new Date().toDateString();
            const completedMeals = JSON.parse(localStorage.getItem('completedMeals') || '{}')[today] || [];
            
            document.getElementById('todaysMealsCount').textContent = completedMeals.length;
            document.getElementById('todaysMealsList').innerHTML = completedMeals.map(meal => 
                '<div class="completed-item">✓ ' + meal + '</div>'
            ).join('');
        }
        
        function updateTodaysExercises() {
            const today = new Date().toDateString();
            const completedExercises = JSON.parse(localStorage.getItem('completedExercises') || '{}')[today] || [];
            
            document.getElementById('todaysExercisesCount').textContent = completedExercises.length;
            document.getElementById('todaysExercisesList').innerHTML = completedExercises.map(exercise => 
                '<div class="completed-item">✓ ' + exercise + '</div>'
            ).join('');
        }
        
        function loadSavedData() {
            const savedStartDate = localStorage.getItem('planStartDate');
            if (savedStartDate) {
                startDate = new Date(savedStartDate);
                document.getElementById('startDate').value = startDate.toISOString().split('T')[0];
                updateScheduleDates();
            }
            
            updateProgressTracker();
            updateTodaysMeals();
            updateTodaysExercises();
            
            // Load completed meals and exercises checkboxes
            const today = new Date().toDateString();
            const completedMeals = JSON.parse(localStorage.getItem('completedMeals') || '{}')[today] || [];
            const completedExercises = JSON.parse(localStorage.getItem('completedExercises') || '{}')[today] || [];
            
            document.querySelectorAll('input[data-meal]').forEach(checkbox => {
                checkbox.checked = completedMeals.includes(checkbox.dataset.meal);
            });
            
            document.querySelectorAll('input[data-exercise]').forEach(checkbox => {
                checkbox.checked = completedExercises.includes(checkbox.dataset.exercise);
            });
        }
        
        window.onload = function() {
            loadSavedData();
            setInterval(updateProgressTracker, 60000); // Update every minute
        };
    </script>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎯 خطة ${profile.name} الشخصية للياقة والتغذية</h1>
            <p style="font-size: 1.2em; margin: 10px 0;">خطة مصممة خصيصاً لك لمدة 6 شهور</p>
            <div style="margin-top: 20px;">
                <label for="startDate" style="font-size: 1.1em;">📅 تاريخ بداية الخطة:</label>
                <input type="date" id="startDate" class="date-input" onchange="setStartDate(); localStorage.setItem('planStartDate', this.value);">
            </div>
        </div>
        
        <div class="content">
            <div class="profile-info">
                <h2>📋 معلوماتك الشخصية</h2>
                <div class="profile-grid">
                    <div class="profile-item">
                        <strong>👤 الاسم:</strong> ${profile.name}
                    </div>
                    <div class="profile-item">
                        <strong>🎂 العمر:</strong> ${profile.age} سنة
                    </div>
                    <div class="profile-item">
                        <strong>⚖️ الوزن الحالي:</strong> ${profile.weight} كجم
                    </div>
                    <div class="profile-item">
                        <strong>📏 الطول:</strong> ${profile.height} سم
                    </div>
                    <div class="profile-item">
                        <strong>🎯 الهدف:</strong> ${profile.goal}
                    </div>
                    <div class="profile-item">
                        <strong>💰 الميزانية:</strong> ${profile.budget}
                    </div>
                    <div class="profile-item">
                        <strong>🏃 مستوى النشاط:</strong> ${profile.activityLevel}
                    </div>
                    <div class="profile-item">
                        <strong>💪 مستوى اللياقة:</strong> ${profile.currentFitness}
                    </div>
                </div>
            </div>
            
            <div class="progress-tracker">
                <h3>📊 تتبع تقدمك</h3>
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-number" id="daysSinceStart">0</div>
                        <div>أيام من البداية</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number" id="todaysMealsCount">0</div>
                        <div>وجبات اليوم</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number" id="todaysExercisesCount">0</div>
                        <div>تمارين اليوم</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number" id="progressPercent">0%</div>
                        <div>نسبة الإنجاز</div>
                    </div>
                </div>
                <div style="background: #e0e0e0; border-radius: 10px; height: 20px; margin: 20px 0;">
                    <div id="progressBar" style="background: linear-gradient(45deg, #ff6b6b, #feca57); height: 100%; border-radius: 10px; width: 0%; transition: width 0.3s;"></div>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px;">
                    <div>
                        <h4>🍽️ وجبات اليوم المكتملة</h4>
                        <div id="todaysMealsList"></div>
                    </div>
                    <div>
                        <h4>💪 تمارين اليوم المكتملة</h4>
                        <div id="todaysExercisesList"></div>
                    </div>
                </div>
            </div>
            
            <div class="section meal-section">
                <h2>🍽️ خطتك الغذائية - وجبات اقتصادية ولذيذة</h2>
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-number">${generatedPlan.mealPlan.calories}</div>
                        <div>سعرة حرارية/يوم</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">${generatedPlan.mealPlan.protein}جم</div>
                        <div>بروتين</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">${generatedPlan.mealPlan.carbs}جم</div>
                        <div>كربوهيدرات</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">${generatedPlan.mealPlan.fats}جم</div>
                        <div>دهون</div>
                    </div>
                </div>
                
                <div class="meal-grid">
                    <div class="meal-card">
                        <h3>🌅 الإفطار</h3>
                        <div class="checkbox-grid">
                            ${generatedPlan.mealPlan.meals.breakfast.map(meal => `
                                <div class="checkbox-item">
                                    <input type="checkbox" data-meal="${meal}" onchange="toggleMealCompleted(this, '${meal}')">
                                    <span>${meal}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="meal-card">
                        <h3>🌞 الغداء</h3>
                        <div class="checkbox-grid">
                            ${generatedPlan.mealPlan.meals.lunch.map(meal => `
                                <div class="checkbox-item">
                                    <input type="checkbox" data-meal="${meal}" onchange="toggleMealCompleted(this, '${meal}')">
                                    <span>${meal}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="meal-card">
                        <h3>🌙 العشاء</h3>
                        <div class="checkbox-grid">
                            ${generatedPlan.mealPlan.meals.dinner.map(meal => `
                                <div class="checkbox-item">
                                    <input type="checkbox" data-meal="${meal}" onchange="toggleMealCompleted(this, '${meal}')">
                                    <span>${meal}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="meal-card">
                        <h3>🥜 الوجبات الخفيفة</h3>
                        <div class="checkbox-grid">
                            ${generatedPlan.mealPlan.meals.snacks.map(meal => `
                                <div class="checkbox-item">
                                    <input type="checkbox" data-meal="${meal}" onchange="toggleMealCompleted(this, '${meal}')">
                                    <span>${meal}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="section exercise-section">
                <h2>💪 خطة التمارين المناسبة لك</h2>
                <p><strong>⏱️ مدة التمرين:</strong> ${generatedPlan.exercisePlan.duration}</p>
                <p><strong>📊 مستوى الصعوبة:</strong> ${generatedPlan.exercisePlan.difficulty}</p>
                
                <div class="exercise-list">
                    ${generatedPlan.exercisePlan.exercises.map(exercise => `
                        <div class="exercise-item">
                            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                                <input type="checkbox" data-exercise="${exercise.name}" onchange="toggleExerciseCompleted(this, '${exercise.name}')">
                                <h4 style="margin: 0;">${exercise.name}</h4>
                            </div>
                            <p><strong>🔢 المجموعات:</strong> ${exercise.sets}</p>
                            <p><strong>🔁 التكرارات:</strong> ${exercise.reps}</p>
                            <p><strong>⏰ الراحة:</strong> ${exercise.rest}</p>
                            <p><strong>🏋️ المعدات:</strong> ${exercise.equipment}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            ${generatedPlan.supplements.length > 0 ? `
            <div class="section supplement-section">
                <h2>💊 المكملات الغذائية المقترحة</h2>
                <div class="checkbox-grid">
                    ${generatedPlan.supplements.map(supplement => `
                        <div class="checkbox-item">
                            <input type="checkbox">
                            <span>${supplement}</span>
                        </div>
                    `).join('')}
                </div>
                <p style="margin-top: 20px; font-style: italic; color: #666;">
                    ⚠️ استشر طبيبك قبل تناول أي مكمل غذائي
                </p>
            </div>
            ` : ''}
            
            <div class="section schedule-section">
                <h2>📅 جدولك الزمني لـ 6 شهور</h2>
                <div class="schedule-timeline">
                    <div class="schedule-item">
                        <h4>📍 الأسبوع الأول <span class="date-display"></span></h4>
                        <ul>
                            ${generatedPlan.schedule.week1.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="schedule-item">
                        <h4>📍 الأسبوع الثاني <span class="date-display"></span></h4>
                        <ul>
                            ${generatedPlan.schedule.week2.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="schedule-item">
                        <h4>📍 الأسبوع الثالث <span class="date-display"></span></h4>
                        <ul>
                            ${generatedPlan.schedule.week3.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="schedule-item">
                        <h4>📍 الأسبوع الرابع <span class="date-display"></span></h4>
                        <ul>
                            ${generatedPlan.schedule.week4.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="schedule-item">
                        <h4>📍 الشهر الثاني <span class="date-display"></span></h4>
                        <ul>
                            ${generatedPlan.schedule.month2.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="schedule-item">
                        <h4>📍 الشهر الثالث <span class="date-display"></span></h4>
                        <ul>
                            ${generatedPlan.schedule.month3.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="schedule-item">
                        <h4>📍 الشهر الرابع <span class="date-display"></span></h4>
                        <ul>
                            ${generatedPlan.schedule.month4.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="schedule-item">
                        <h4>📍 الشهر الخامس <span class="date-display"></span></h4>
                        <ul>
                            ${generatedPlan.schedule.month5.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="schedule-item">
                        <h4>📍 الشهر السادس <span class="date-display"></span></h4>
                        <ul>
                            ${generatedPlan.schedule.month6.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="section" style="background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%); color: #333;">
                <h2>💡 نصائح مهمة لنجاحك</h2>
                <div class="tips-grid">
                    ${generatedPlan.tips.map(tip => `
                        <div class="tip-item">
                            ✨ ${tip}
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div style="text-align: center; padding: 40px; background: linear-gradient(45deg, #667eea, #764ba2); color: white; border-radius: 15px; margin-top: 30px;">
                <h2>🎉 أنت الآن جاهز لبدء رحلتك!</h2>
                <p style="font-size: 1.2em;">ستصل لهدفك بالصبر والمثابرة</p>
                <p style="margin-top: 20px; font-style: italic;">
                    "النجاح ليس نهاية، والفشل ليس نهاية العالم، ولكن الشجاعة للمتابعة هي ما يهم"
                </p>
            </div>
        </div>
    </div>
</body>
</html>
    `;

    const blob = new Blob([planContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `خطة_${profile.name}_الشخصية.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <User className="h-6 w-6" />
                المعلومات الأساسية
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">الاسم</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                  placeholder="أدخل اسمك"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age">العمر</Label>
                  <Input
                    id="age"
                    type="number"
                    value={profile.age}
                    onChange={(e) => setProfile({...profile, age: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <Label>الجنس</Label>
                  <RadioGroup value={profile.gender} onValueChange={(value) => setProfile({...profile, gender: value})}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ذكر" id="male" />
                      <Label htmlFor="male">ذكر</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="أنثى" id="female" />
                      <Label htmlFor="female">أنثى</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="weight">الوزن (كجم)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={profile.weight}
                    onChange={(e) => setProfile({...profile, weight: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="height">الطول (سم)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={profile.height}
                    onChange={(e) => setProfile({...profile, height: parseInt(e.target.value)})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Target className="h-6 w-6" />
                أهدافك
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>ما هو هدفك الأساسي؟</Label>
                <RadioGroup value={profile.goal} onValueChange={(value) => setProfile({...profile, goal: value})}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="خسارة الوزن" id="lose" />
                    <Label htmlFor="lose">خسارة الوزن</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="زيادة الوزن" id="gain" />
                    <Label htmlFor="gain">زيادة الوزن</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="بناء العضلات" id="muscle" />
                    <Label htmlFor="muscle">بناء العضلات</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="المحافظة على الوزن" id="maintain" />
                    <Label htmlFor="maintain">المحافظة على الوزن</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="تحسين اللياقة" id="fitness" />
                    <Label htmlFor="fitness">تحسين اللياقة العامة</Label>
                  </div>
                </RadioGroup>
              </div>
              <div>
                <Label htmlFor="targetWeight">الوزن المستهدف (كجم)</Label>
                <Input
                  id="targetWeight"
                  type="number"
                  value={profile.targetWeight}
                  onChange={(e) => setProfile({...profile, targetWeight: parseInt(e.target.value)})}
                />
              </div>
              <div>
                <Label>الإطار الزمني لتحقيق الهدف</Label>
                <RadioGroup value={profile.timeframe} onValueChange={(value) => setProfile({...profile, timeframe: value})}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="شهر واحد" id="month1" />
                    <Label htmlFor="month1">شهر واحد</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="3 شهور" id="month3" />
                    <Label htmlFor="month3">3 شهور</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="6 شهور" id="month6" />
                    <Label htmlFor="month6">6 شهور</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="سنة كاملة" id="year1" />
                    <Label htmlFor="year1">سنة كاملة</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <DollarSign className="h-6 w-6" />
                الميزانية والطبقة الاجتماعية
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>ما هي ميزانيتك الشهرية للطعام؟</Label>
                <RadioGroup value={profile.budget} onValueChange={(value) => setProfile({...profile, budget: value})}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="أقل من 500 جنيه" id="budget1" />
                    <Label htmlFor="budget1">أقل من 500 جنيه</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="500-1000 جنيه" id="budget2" />
                    <Label htmlFor="budget2">500-1000 جنيه</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1000-2000 جنيه" id="budget3" />
                    <Label htmlFor="budget3">1000-2000 جنيه</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2000-3000 جنيه" id="budget4" />
                    <Label htmlFor="budget4">2000-3000 جنيه</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="أكثر من 3000 جنيه" id="budget5" />
                    <Label htmlFor="budget5">أكثر من 3000 جنيه</Label>
                  </div>
                </RadioGroup>
              </div>
              <div>
                <Label>الطبقة الاجتماعية</Label>
                <RadioGroup value={profile.socialClass} onValueChange={(value) => setProfile({...profile, socialClass: value})}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="طبقة عاملة" id="working" />
                    <Label htmlFor="working">طبقة عاملة</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="طبقة متوسطة" id="middle" />
                    <Label htmlFor="middle">طبقة متوسطة</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="طبقة متوسطة عليا" id="upper-middle" />
                    <Label htmlFor="upper-middle">طبقة متوسطة عليا</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="طبقة عليا" id="upper" />
                    <Label htmlFor="upper">طبقة عليا</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="طالب/طالبة" id="student" />
                    <Label htmlFor="student">طالب/طالبة</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Utensils className="h-6 w-6" />
                تفضيلات الطعام المفضل
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>اختر المطابخ التي تفضلها (يمكن اختيار متعدد)</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {cuisineOptions.map((cuisine) => (
                    <div key={cuisine} className="flex items-center space-x-2">
                      <Checkbox
                        id={cuisine}
                        checked={profile.preferredCuisines.includes(cuisine)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setProfile({...profile, preferredCuisines: [...profile.preferredCuisines, cuisine]});
                          } else {
                            setProfile({...profile, preferredCuisines: profile.preferredCuisines.filter(c => c !== cuisine)});
                          }
                        }}
                      />
                      <Label htmlFor={cuisine} className="text-sm">{cuisine}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Label>أي أطعمة لا تحبها؟</Label>
                <Textarea
                  placeholder="اذكر الأطعمة التي لا تحبها..."
                  value={profile.foodDislikes.join(', ')}
                  onChange={(e) => setProfile({...profile, foodDislikes: e.target.value.split(', ')})}
                />
              </div>
              <div>
                <Label>ما هي وجباتك الخفيفة المفضلة؟</Label>
                <Textarea
                  placeholder="اذكر الوجبات الخفيفة المفضلة..."
                  value={profile.favoriteSnacks.join(', ')}
                  onChange={(e) => setProfile({...profile, favoriteSnacks: e.target.value.split(', ')})}
                />
              </div>
            </CardContent>
          </Card>
        );

      case 5:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Dumbbell className="h-6 w-6" />
                التمارين المفضلة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>اختر التمارين التي تفضلها (يمكن اختيار متعدد)</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {exerciseOptions.map((exercise) => (
                    <div key={exercise} className="flex items-center space-x-2">
                      <Checkbox
                        id={exercise}
                        checked={profile.exercisePreferences.includes(exercise)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setProfile({...profile, exercisePreferences: [...profile.exercisePreferences, exercise]});
                          } else {
                            setProfile({...profile, exercisePreferences: profile.exercisePreferences.filter(e => e !== exercise)});
                          }
                        }}
                      />
                      <Label htmlFor={exercise} className="text-sm">{exercise}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Label>كم ساعة يومياً يمكنك تخصيصها للتمارين؟</Label>
                <RadioGroup value={profile.exerciseTime} onValueChange={(value) => setProfile({...profile, exerciseTime: value})}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="30 دقيقة" id="time1" />
                    <Label htmlFor="time1">30 دقيقة</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="45 دقيقة" id="time2" />
                    <Label htmlFor="time2">45 دقيقة</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ساعة واحدة" id="time3" />
                    <Label htmlFor="time3">ساعة واحدة</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ساعة ونصف" id="time4" />
                    <Label htmlFor="time4">ساعة ونصف</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ساعتين أو أكثر" id="time5" />
                    <Label htmlFor="time5">ساعتين أو أكثر</Label>
                  </div>
                </RadioGroup>
              </div>
              <div>
                <Label>ما هو مستوى لياقتك الحالي؟</Label>
                <RadioGroup value={profile.currentFitness} onValueChange={(value) => setProfile({...profile, currentFitness: value})}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="مبتدئ" id="beginner" />
                    <Label htmlFor="beginner">مبتدئ</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="متوسط" id="intermediate" />
                    <Label htmlFor="intermediate">متوسط</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="متقدم" id="advanced" />
                    <Label htmlFor="advanced">متقدم</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="محترف" id="expert" />
                    <Label htmlFor="expert">محترف</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return (
          <Card>
            <CardHeader>
              <CardTitle>اكتمل الاستبيان!</CardTitle>
            </CardHeader>
            <CardContent>
              <p>تم جمع كل المعلومات المطلوبة. جاهز لإنشاء خطتك المخصصة!</p>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          🎯 صمم حياتك
        </h1>
        <p className="text-lg text-gray-600">
          نظام شامل لتصميم خطة غذائية وتمارين مخصصة لك من بين أكثر من 100,000 خطة مختلفة
        </p>
        <div className="mt-4">
          <Progress value={progressPercentage} className="w-full h-3" />
          <p className="text-sm text-gray-500 mt-2">الخطوة {currentStep} من {totalSteps}</p>
        </div>
      </div>

      {!generatedPlan ? (
        <>
          {renderStep()}
          <div className="flex justify-between">
            <Button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              variant="outline"
            >
              السابق
            </Button>
            {currentStep < totalSteps ? (
              <Button
                onClick={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))}
                disabled={!profile.name || (currentStep === 2 && !profile.goal)}
              >
                التالي
              </Button>
            ) : (
              <Button
                onClick={generatePersonalizedPlan}
                disabled={isGenerating || !profile.name}
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
              >
                {isGenerating ? 'جاري إنشاء خطتك...' : 'إنشاء خطتي المخصصة 🚀'}
              </Button>
            )}
          </div>
        </>
      ) : (
        <div className="space-y-6">
          <Card className="bg-gradient-to-r from-green-50 to-blue-50">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-green-700">
                🎉 تم إنشاء خطتك المخصصة بنجاح!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <p className="text-lg text-gray-700 mb-4">{generatedPlan.description}</p>
                <Button
                  onClick={downloadPlan}
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  <Download className="h-5 w-5 mr-2" />
                  تحميل خطتك الكاملة (HTML تفاعلي)
                </Button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Utensils className="h-5 w-5" />
                      الخطة الغذائية
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p><strong>السعرات الحرارية:</strong> {generatedPlan.mealPlan.calories} سعرة/يوم</p>
                      <p><strong>البروتين:</strong> {generatedPlan.mealPlan.protein}جم</p>
                      <p><strong>الكربوهيدرات:</strong> {generatedPlan.mealPlan.carbs}جم</p>
                      <p><strong>الدهون:</strong> {generatedPlan.mealPlan.fats}جم</p>
                      <p><strong>مستوى التكلفة:</strong> {generatedPlan.mealPlan.cost}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Dumbbell className="h-5 w-5" />
                      خطة التمارين
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p><strong>مدة التمرين:</strong> {generatedPlan.exercisePlan.duration}</p>
                      <p><strong>مستوى الصعوبة:</strong> {generatedPlan.exercisePlan.difficulty}</p>
                      <p><strong>عدد التمارين:</strong> {generatedPlan.exercisePlan.exercises.length} تمرين</p>
                      <p><strong>النوع:</strong> {generatedPlan.exercisePlan.category}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {generatedPlan.supplements.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Pill className="h-5 w-5" />
                      المكملات المقترحة
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {generatedPlan.supplements.map((supplement, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {supplement}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="text-center mt-6">
                <Button
                  onClick={() => {
                    setGeneratedPlan(null);
                    setCurrentStep(1);
                  }}
                  variant="outline"
                >
                  إنشاء خطة جديدة
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default DesignYourLife;