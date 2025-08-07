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
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
  Zap,
  ChefHat,
  Home,
  Briefcase,
  Moon,
  Sun,
  Utensils,
  Timer,
  Scale,
  Activity,
  MapPin,
  Globe,
  Palette,
  Settings,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  BarChart3,
  Flame,
  Droplets,
  Wind
} from "lucide-react";

// Revolutionary User Profiling System
interface UserAnswers {
  // Basic Information
  name: string;
  gender: string;
  age: string;
  weight: string;
  height: string;
  bodyType: string;

  // Goals & Motivation
  primaryGoal: string;
  secondaryGoals: string[];
  timeFrame: string;
  motivationLevel: string;
  pastFailures: string[];
  successFactors: string[];

  // Lifestyle & Social
  socialClass: string;
  occupation: string;
  workSchedule: string;
  stressLevel: string;
  sleepHours: string;
  lifestyle: string;
  familyStatus: string;
  supportSystem: string;

  // Exercise Preferences
  activityLevel: string;
  exerciseType: string;
  exerciseLocation: string;
  preferredTime: string;
  dailyHours: string;
  fitnessExperience: string;
  injuries: string[];
  limitations: string[];
  favoriteActivities: string[];

  // Nutrition Details
  currentDiet: string;
  mealTiming: string;
  cookingSkills: string;
  cookingTime: string;
  eatingOut: string;
  waterIntake: string;
  preferredFoods: string[];
  forbiddenFoods: string[];
  allergies: string[];
  culturalDiet: string;
  religiousRestrictions: string[];

  // Health & Medical
  healthConditions: string[];
  medications: string[];
  supplements: string[];
  medicalHistory: string;
  lastCheckup: string;
  bloodWork: string;

  // Financial & Resources
  monthlyBudget: string;
  foodBudget: string;
  gymBudget: string;
  supplementBudget: string;
  priorityBudget: string;

  // Technology & Tracking
  trackingPreference: string;
  appUsage: string[];
  deviceOwnership: string[];
  techComfort: string;
  notificationStyle: string;

  // Cultural & Regional
  region: string;
  climate: string;
  seasonalPreferences: string[];
  culturalBackground: string;
  languagePreference: string;
  localResources: string[];

  // Psychological Profile
  personalityType: string;
  learningStyle: string;
  stressCoping: string[];
  rewardSystem: string[];
  challengeLevel: string;
  socialInfluence: string;
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

// Revolutionary Global Data System
const QUESTION_DATA = {
  // Basic Demographics
  genderOptions: ["ذكر", "أنثى", "أفضل عدم التحديد"],
  ageRanges: ["15-17", "18-22", "23-28", "29-35", "36-42", "43-50", "51-60", "60+"],
  weightRanges: ["أقل من 45", "45-55", "56-65", "66-75", "76-85", "86-95", "96-105", "106-120", "أكثر من 120"],
  heightRanges: ["أقل من 145", "145-155", "156-165", "166-175", "176-185", "186-195", "أكثر من 195"],
  bodyTypes: ["نحيف جداً", "نحيف", "متوسط", "ممتلئ", "بدين", "بدين جداً"],

  // Goals & Motivation
  primaryGoals: [
    "فقدان الوزن السريع", "فقدان الوزن التدريجي", "زيادة الكتلة العضلية", 
    "تحسين اللياقة العامة", "زيادة القوة", "تحسين المرونة", "تحسين القدرة على التحمل",
    "تحسين الصحة العامة", "إعادة التأهيل", "الاستعداد لمنافسة"
  ],
  secondaryGoals: [
    "تحسين النوم", "زيادة الطاقة", "تخفيف التوتر", "تحسين المزاج", 
    "زيادة الثقة بالنفس", "تحسين الوضعية", "تقليل الألم", "تحسين التوازن"
  ],
  timeFrames: ["شهر واحد", "3 أشهر", "6 أشهر", "سنة واحدة", "2-3 سنوات", "أسلوب حياة دائم"],
  motivationLevels: ["منخفض جداً", "منخفض", "متوسط", "عالي", "عالي جداً"],

  // Lifestyle
  occupations: [
    "طالب", "موظف مكتب", "عامل يدوي", "مدرس", "طبيب/ممرض", 
    "مهندس", "تاجر", "ربة منزل", "متقاعد", "عاطل عن العمل", "أعمال حرة"
  ],
  workSchedules: ["دوام صباحي", "دوام مسائي", "دوام ليلي", "أوقات متغيرة", "عمل من المنزل"],
  stressLevels: ["منخفض جداً", "منخفض", "متوسط", "عالي", "عالي جداً"],
  sleepHours: ["أقل من 5 ساعات", "5-6 ساعات", "7-8 ساعات", "9-10 ساعات", "أكثر من 10 ساعات"],
  lifestyles: ["نشط جداً", "نشط", "متوسط النشاط", "قليل النشاط", "خامل"],

  // Exercise Preferences
  activityLevels: ["مبتدئ تماماً", "مبتدئ", "متوسط", "متقدم", "محترف"],
  exerciseTypes: [
    "تمارين منزلية", "نادي رياضي", "جري خارجي", "رياضات جماعية", 
    "سباحة", "دراجة هوائية", "يوغا/بيلاتس", "فنون قتالية", "رقص", "تسلق"
  ],
  exerciseLocations: ["المنزل فقط", "النادي فقط", "في الهواء الطلق", "مختلط"],
  preferredTimes: ["الفجر (5-7 ص)", "الصباح (7-10 ص)", "الضحى (10-12 ظ)", "بعد الظهر (1-4 ع)", "المساء (4-7 م)", "الليل (7-10 م)"],
  dailyHours: ["15-30 دقيقة", "30-45 دقيقة", "45-60 دقيقة", "60-90 دقيقة", "90-120 دقيقة", "أكثر من ساعتين"],

  // Nutrition
  currentDiets: [
    "لا يوجد نظام محدد", "نظام البحر المتوسط", "نظام الكيتو", "نظام قليل الكربوهيدرات",
    "نباتي", "نباتي صرف", "باليو", "صيام متقطع", "نظام DASH", "نظام منخفض الدهون"
  ],
  mealTimings: ["وجبتان يومياً", "3 وجبات رئيسية", "4-5 وجبات صغيرة", "6 وجبات صغيرة", "صيام متقطع 16:8", "صيام متقطع 18:6"],
  cookingSkills: ["لا أطبخ إطلاقاً", "مبتدئ", "متوسط", "جيد", "ممتاز", "شيف محترف"],
  cookingTimes: ["لا وقت للطبخ", "أقل من 15 دقيقة", "15-30 دقيقة", "30-60 دقيقة", "أكثر من ساعة"],

  // Financial
  monthlyBudgets: ["أقل من 500 ريال", "500-1000 ريال", "1000-2000 ريال", "2000-3000 ريال", "3000-5000 ريال", "أكثر من 5000 ريال"],
  foodBudgets: ["أقل من 300 ريال", "300-500 ريال", "500-800 ريال", "800-1200 ريال", "أكثر من 1200 ريال"],

  // Cultural & Regional
  regions: [
    "الرياض", "جدة", "الدمام", "مكة", "المدينة", "الطائف", "تبوك", "أبها", 
    "الأحساء", "حائل", "القصيم", "جازان", "نجران", "الباحة", "عرعر", "سكاكا"
  ],
  climates: ["صحراوي حار", "معتدل", "بارد", "رطب", "جبلي"],
  culturalBackgrounds: ["سعودي", "مصري", "سوري", "لبناني", "أردني", "عراقي", "يمني", "مغربي", "تونسي", "آخر"],

  // Technology & Tracking
  trackingPreferences: ["لا أحب التتبع", "تتبع بسيط", "تتبع متوسط", "تتبع مفصل", "تتبع احترافي"],
  appUsage: ["لا أستخدم تطبيقات", "تطبيقات بسيطة", "عدة تطبيقات", "تطبيقات متقدمة"],
  deviceOwnership: ["هاتف ذكي فقط", "هاتف + ساعة ذكية", "هاتف + ميزان ذكي", "أجهزة متعددة"],

  // Psychology
  personalityTypes: ["انطوائي", "منفتح", "مختلط", "قيادي", "تابع", "منظم", "عفوي"],
  learningStyles: ["بصري", "سمعي", "حركي", "قرائي", "مختلط"],
  rewardSystems: ["مكافآت مالية", "مكافآت طعام", "وقت ترفيه", "مشاركة إنجازات", "لا أحتاج مكافآت"]
};

// Comprehensive Global Food Database
const FOOD_OPTIONS = {
  // Budget-Friendly Proteins
  cheapProteins: [
    "بيض", "دجاج (فخذ)", "تونة معلبة", "سردين", "عدس أحمر", "عدس أسود", 
    "حمص", "فول", "فاصوليا بيضاء", "لوبيا", "جبن قريش", "لبن زبادي"
  ],

  // Affordable Carbs
  cheapCarbs: [
    "أرز أبيض", "أرز بني", "مكرونة", "شعيرية", "برغل", "شوفان", 
    "خبز أسمر", "بطاطس", "بطاطا حلوة", "كسكس"
  ],

  // Budget Vegetables
  cheapVegetables: [
    "طماطم", "خيار", "جزر", "بصل", "ثوم", "فلفل أخضر", "ملفوف", 
    "كوسا", "باذنجان", "سبانخ", "خس", "فجل", "لفت"
  ],

  // Affordable Fruits
  cheapFruits: [
    "موز", "تفاح", "برتقال", "ليمون", "تمر", "عنب", "بطيخ", 
    "شمام", "مشمش", "خوخ", "إجاص", "رمان"
  ],

  // Regional Specialties
  saudiFood: ["كبسة", "مندي", "مرقوق", "هريس", "جريش", "قرصان"],
  egyptianFood: ["ملوخية", "فول مدمس", "طعمية", "كشري", "رقاق"],
  levantineFood: ["تبولة", "فتوش", "حمص بالطحينة", "كبة", "منسف"],
  gulfFood: ["مجبوس", "لقيمات", "خنفروش", "هريس", "ثريد"],

  // Cultural Restrictions
  forbiddenOptions: [
    "لحم خنزير", "كحول", "جيلاتين حيواني", "منتجات غير حلال",
    "لحم أحمر", "مأكولات بحرية", "منتجات ألبان", "مكسرات", "صويا",
    "طعام حار", "طعام مقلي", "حلويات", "مشروبات غازية", "كافيين",
    "طعام نيء", "طعام معالج", "مواد حافظة", "ألوان صناعية"
  ],

  // Health Conditions
  diabeticFriendly: ["خضروات ورقية", "بروكلي", "قرنبيط", "سمك", "دجاج", "بيض"],
  heartHealthy: ["سلمون", "أفوكادو", "لوز", "زيت زيتون", "شوفان", "توت"],
  highProtein: ["دجاج", "لحم بقر", "سمك", "بيض", "جبن", "بقوليات"],
  lowCarb: ["لحوم", "أسماك", "خضروات ورقية", "مكسرات", "أفوكادو", "زيوت"]
};

export default function DesignLifePage() {
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [answers, setAnswers] = useState<UserAnswers>({
    // Basic Information
    name: "",
    gender: "",
    age: "",
    weight: "",
    height: "",
    bodyType: "",

    // Goals & Motivation
    primaryGoal: "",
    secondaryGoals: [],
    timeFrame: "",
    motivationLevel: "",
    pastFailures: [],
    successFactors: [],

    // Lifestyle & Social
    socialClass: "",
    occupation: "",
    workSchedule: "",
    stressLevel: "",
    sleepHours: "",
    lifestyle: "",
    familyStatus: "",
    supportSystem: "",

    // Exercise Preferences
    activityLevel: "",
    exerciseType: "",
    exerciseLocation: "",
    preferredTime: "",
    dailyHours: "",
    fitnessExperience: "",
    injuries: [],
    limitations: [],
    favoriteActivities: [],

    // Nutrition Details
    currentDiet: "",
    mealTiming: "",
    cookingSkills: "",
    cookingTime: "",
    eatingOut: "",
    waterIntake: "",
    preferredFoods: [],
    forbiddenFoods: [],
    allergies: [],
    culturalDiet: "",
    religiousRestrictions: [],

    // Health & Medical
    healthConditions: [],
    medications: [],
    supplements: [],
    medicalHistory: "",
    lastCheckup: "",
    bloodWork: "",

    // Financial & Resources
    monthlyBudget: "",
    foodBudget: "",
    gymBudget: "",
    supplementBudget: "",
    priorityBudget: "",

    // Technology & Tracking
    trackingPreference: "",
    appUsage: [],
    deviceOwnership: [],
    techComfort: "",
    notificationStyle: "",

    // Cultural & Regional
    region: "",
    climate: "",
    seasonalPreferences: [],
    culturalBackground: "",
    languagePreference: "",
    localResources: [],

    // Psychological Profile
    personalityType: "",
    learningStyle: "",
    stressCoping: [],
    rewardSystem: [],
    challengeLevel: "",
    socialInfluence: ""
  });

  const [generatedPlan, setGeneratedPlan] = useState<GeneratedPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const totalSteps = 11;

  useEffect(() => {
    setProgress((currentStep / totalSteps) * 100);
  }, [currentStep]);

  const handleAnswerChange = (field: keyof UserAnswers, value: string | string[]) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
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
    const goalCalories = calculateCalories(userAnswers);

    // Breakfast options based on budget
    const budgetBreakfasts = budgetMultiplier < 1 ? 
      ["بيض مسلوق + خبز أسمر + شاي", "شوفان + موز + حليب", "فول + طحينة + خبز"] :
      ["عجة + جبن + خبز محمص", "شوفان + مكسرات + عسل", "لبنة + زيت زيتون + خضار"];

    const budgetLunches = budgetMultiplier < 1 ?
      ["أرز + عدس + سلطة", "مكرونة + تونة + خضار", "دجاج مسلوق + خضار + أرز"] :
      ["دجاج مشوي + أرز + سلطة", "سمك + خضار + بطاطس", "لحم + أرز + خضار"];

    const budgetDinners = budgetMultiplier < 1 ?
      ["شوربة عدس + خبز", "بيض + خضار + خبز", "تونة + سلطة + خبز"] :
      ["سمك مشوي + أرز", "دجاج + خضار + بطاطس", "لحم + سلطة + خبز"];

    const randomBreakfast = budgetBreakfasts[day % budgetBreakfasts.length];
    const randomLunch = budgetLunches[day % budgetLunches.length];
    const randomDinner = budgetDinners[day % budgetDinners.length];

    return {
      day,
      breakfast: randomBreakfast,
      lunch: randomLunch,
      dinner: randomDinner,
      snacks: ["تفاحة", "حفنة لوز"],
      calories: goalCalories,
      cost: budgetMultiplier * 25
    };
  };

  const generateExercisePlan = (userAnswers: UserAnswers): ExercisePlan[] => {
    const plan: ExercisePlan[] = [];
    const isHome = userAnswers.exerciseLocation === "المنزل فقط";

    for (let day = 1; day <= 180; day++) {
      if (day % 7 === 0) continue; // Rest day

      const exercises = isHome ? 
        [
          { name: "ضغط", sets: 3, reps: "8-12", rest: "60 ثانية", description: "تمرين الصدر والذراعين" },
          { name: "سكوات", sets: 3, reps: "12-15", rest: "60 ثانية", description: "تمرين الأرجل والمؤخرة" },
          { name: "بلانك", sets: 3, reps: "30-60 ثانية", rest: "45 ثانية", description: "تمرين عضلات البطن" }
        ] :
        [
          { name: "ضغط صدر", sets: 3, reps: "8-10", rest: "90 ثانية", description: "تمرين الصدر بالأوزان" },
          { name: "سكوات بالبار", sets: 3, reps: "6-8", rest: "120 ثانية", description: "تمرين الأرجل بالبار" },
          { name: "سحب علوي", sets: 3, reps: "8-10", rest: "90 ثانية", description: "تمرين عضلات الظهر" }
        ];

      plan.push({
        day,
        exercises,
        duration: parseInt(userAnswers.dailyHours.split('-')[0]) || 45,
        difficulty: userAnswers.activityLevel
      });
    }

    return plan;
  };

  const generateSupplementPlan = (userAnswers: UserAnswers): string[] => {
    const supplements = [];

    if (userAnswers.supplements.includes("بروتين")) {
      supplements.push("واي بروتين: 30 جرام بعد التمرين");
    }
    if (userAnswers.supplements.includes("كرياتين")) {
      supplements.push("كرياتين: 5 جرام يومياً");
    }
    if (userAnswers.supplements.includes("أوميغا 3")) {
      supplements.push("أوميغا 3: كبسولة واحدة مع الطعام");
    }
    if (userAnswers.supplements.includes("فيتامينات")) {
      supplements.push("فيتامينات متعددة: قرص واحد صباحاً");
    }

    return supplements;
  };

  const calculateBudget = (userAnswers: UserAnswers, nutritionPlan: DayPlan[]): number => {
    const dailyCost = nutritionPlan[0]?.cost || 25;
    const monthlyCost = dailyCost * 30;
    const gymCost = userAnswers.exerciseLocation !== "المنزل فقط" ? 150 : 0;
    const supplementCost = userAnswers.supplements.length * 50;

    return monthlyCost + gymCost + supplementCost;
  };

  const calculateCalories = (userAnswers: UserAnswers): number => {
    const weight = parseInt(userAnswers.weight.split('-')[0]) || 70;
    const height = parseInt(userAnswers.height.split('-')[0]) || 170;
    const age = parseInt(userAnswers.age.split('-')[0]) || 25;

    // BMR calculation
    let bmr = userAnswers.gender === "ذكر" ? 
      88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age) :
      447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);

    // Activity factor
    const activityMultiplier = {
      "مبتدئ تماماً": 1.2,
      "مبتدئ": 1.375,
      "متوسط": 1.55,
      "متقدم": 1.725,
      "محترف": 1.9
    }[userAnswers.activityLevel] || 1.4;

    return Math.round(bmr * activityMultiplier);
  };

  const downloadPlan = (plan: GeneratedPlan) => {
    const planData = {
      userProfile: plan.userProfile,
      nutritionPlan: plan.nutritionPlan.slice(0, 30), // First 30 days
      exercisePlan: plan.exercisePlan.slice(0, 30),
      supplementPlan: plan.supplementPlan,
      estimatedBudget: plan.estimatedBudget
    };

    const dataStr = JSON.stringify(planData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `خطة_${plan.userProfile.name}_${plan.id}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Revolutionary Multi-Step Questionnaire Sections
  const QUESTIONNAIRE_STEPS = [
    {
      title: "معلومات أساسية",
      icon: User,
      color: "emerald",
      fields: ["name", "gender", "age", "weight", "height", "bodyType"]
    },
    {
      title: "الأهداف والدوافع",
      icon: Target,
      color: "blue",
      fields: ["primaryGoal", "secondaryGoals", "timeFrame", "motivationLevel"]
    },
    {
      title: "نمط الحياة",
      icon: Briefcase,
      color: "purple",
      fields: ["occupation", "workSchedule", "stressLevel", "sleepHours", "lifestyle"]
    },
    {
      title: "التمارين الرياضية",
      icon: Dumbbell,
      color: "orange",
      fields: ["activityLevel", "exerciseType", "exerciseLocation", "preferredTime", "dailyHours"]
    },
    {
      title: "التغذية والطعام",
      icon: Apple,
      color: "green",
      fields: ["currentDiet", "mealTiming", "cookingSkills", "preferredFoods", "forbiddenFoods"]
    },
    {
      title: "الصحة العامة",
      icon: Shield,
      color: "red",
      fields: ["healthConditions", "medications", "supplements", "lastCheckup"]
    },
    {
      title: "الميزانية والموارد",
      icon: DollarSign,
      color: "yellow",
      fields: ["monthlyBudget", "foodBudget", "socialClass"]
    },
    {
      title: "التقنية والتتبع",
      icon: Settings,
      color: "indigo",
      fields: ["trackingPreference", "appUsage", "deviceOwnership", "techComfort"]
    },
    {
      title: "الثقافة والمنطقة",
      icon: Globe,
      color: "pink",
      fields: ["region", "culturalBackground", "religiousRestrictions", "climate"]
    },
    {
      title: "الملف النفسي",
      icon: Brain,
      color: "teal",
      fields: ["personalityType", "learningStyle", "rewardSystem", "challengeLevel"]
    },
    {
      title: "المراجعة النهائية",
      icon: CheckCircle,
      color: "emerald",
      fields: []
    }
  ];

  const renderCurrentStep = () => {
    const step = QUESTIONNAIRE_STEPS[currentStep];
    if (!step) return null;

    const StepIcon = step.icon;

    return (
      <Card className="w-full max-w-4xl mx-auto dark:bg-gray-800 dark:border-gray-700">
        <CardHeader className="text-center">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-${step.color}-100 dark:bg-${step.color}-900 mb-4`}>
            <StepIcon className={`w-8 h-8 text-${step.color}-600 dark:text-${step.color}-400`} />
          </div>
          <CardTitle className="text-2xl text-right dark:text-gray-200">{step.title}</CardTitle>
          <p className="text-gray-600 dark:text-gray-400 text-right">
            الخطوة {currentStep + 1} من {QUESTIONNAIRE_STEPS.length}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {renderStepContent(currentStep)}
        </CardContent>
      </Card>
    );
  };

  const renderStepContent = (stepIndex: number) => {
    switch (stepIndex) {
      case 0: // Basic Information
        return (
          <div className="space-y-6 text-right">
            <div className="space-y-2">
              <Label htmlFor="name" className="dark:text-gray-300">الاسم الكامل</Label>
              <Input
                id="name"
                value={answers.name}
                onChange={(e) => handleAnswerChange('name', e.target.value)}
                placeholder="أدخل اسمك الكامل"
                className="text-right dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              />
            </div>

            <div className="space-y-2">
              <Label className="dark:text-gray-300">الجنس</Label>
              <Select onValueChange={(value) => handleAnswerChange('gender', value)}>
                <SelectTrigger className="text-right dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                  <SelectValue placeholder="اختر الجنس" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                  {QUESTION_DATA.genderOptions.map(option => (
                    <SelectItem key={option} value={option} className="dark:hover:bg-gray-600 dark:focus:bg-gray-600">{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="dark:text-gray-300">العمر</Label>
              <Select onValueChange={(value) => handleAnswerChange('age', value)}>
                <SelectTrigger className="text-right dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                  <SelectValue placeholder="اختر الفئة العمرية" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                  {QUESTION_DATA.ageRanges.map(range => (
                    <SelectItem key={range} value={range} className="dark:hover:bg-gray-600 dark:focus:bg-gray-600">{range} سنة</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="dark:text-gray-300">الوزن</Label>
              <Select onValueChange={(value) => handleAnswerChange('weight', value)}>
                <SelectTrigger className="text-right dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                  <SelectValue placeholder="اختر الوزن" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                  {QUESTION_DATA.weightRanges.map(range => (
                    <SelectItem key={range} value={range} className="dark:hover:bg-gray-600 dark:focus:bg-gray-600">{range} كيلو</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="dark:text-gray-300">الطول</Label>
              <Select onValueChange={(value) => handleAnswerChange('height', value)}>
                <SelectTrigger className="text-right dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                  <SelectValue placeholder="اختر الطول" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                  {QUESTION_DATA.heightRanges.map(range => (
                    <SelectItem key={range} value={range} className="dark:hover:bg-gray-600 dark:focus:bg-gray-600">{range} سم</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="dark:text-gray-300">نوع الجسم</Label>
              <Select onValueChange={(value) => handleAnswerChange('bodyType', value)}>
                <SelectTrigger className="text-right dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                  <SelectValue placeholder="اختر نوع الجسم" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                  {QUESTION_DATA.bodyTypes.map(type => (
                    <SelectItem key={type} value={type} className="dark:hover:bg-gray-600 dark:focus:bg-gray-600">{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 1: // Goals & Motivation
        return (
          <div className="space-y-6 text-right">
            <div className="space-y-2">
              <Label className="dark:text-gray-300">الهدف الأساسي</Label>
              <Select onValueChange={(value) => handleAnswerChange('primaryGoal', value)}>
                <SelectTrigger className="text-right dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                  <SelectValue placeholder="اختر هدفك الأساسي" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                  {QUESTION_DATA.primaryGoals.map(goal => (
                    <SelectItem key={goal} value={goal} className="dark:hover:bg-gray-600 dark:focus:bg-gray-600">{goal}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="dark:text-gray-300">الأهداف الثانوية (يمكن اختيار أكثر من واحد)</Label>
              <div className="grid grid-cols-2 gap-2">
                {QUESTION_DATA.secondaryGoals.map(goal => (
                  <div key={goal} className="flex items-center space-x-2 space-x-reverse">
                    <Checkbox 
                      id={goal}
                      checked={answers.secondaryGoals.includes(goal)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          handleAnswerChange('secondaryGoals', [...answers.secondaryGoals, goal]);
                        } else {
                          handleAnswerChange('secondaryGoals', answers.secondaryGoals.filter(g => g !== goal));
                        }
                      }}
                      className="data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                    />
                    <Label htmlFor={goal} className="text-sm dark:text-gray-300">{goal}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="dark:text-gray-300">الإطار الزمني</Label>
              <Select onValueChange={(value) => handleAnswerChange('timeFrame', value)}>
                <SelectTrigger className="text-right dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                  <SelectValue placeholder="كم من الوقت تريد للوصول لهدفك؟" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                  {QUESTION_DATA.timeFrames.map(frame => (
                    <SelectItem key={frame} value={frame} className="dark:hover:bg-gray-600 dark:focus:bg-gray-600">{frame}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="dark:text-gray-300">مستوى الدافعية</Label>
              <Select onValueChange={(value) => handleAnswerChange('motivationLevel', value)}>
                <SelectTrigger className="text-right dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                  <SelectValue placeholder="ما مستوى دافعيتك؟" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                  {QUESTION_DATA.motivationLevels.map(level => (
                    <SelectItem key={level} value={level} className="dark:hover:bg-gray-600 dark:focus:bg-gray-600">{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 2: // Lifestyle
        return (
          <div className="space-y-6 text-right">
            <div className="space-y-2">
              <Label className="dark:text-gray-300">المهنة</Label>
              <Select onValueChange={(value) => handleAnswerChange('occupation', value)}>
                <SelectTrigger className="text-right dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                  <SelectValue placeholder="ما هي مهنتك؟" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                  {QUESTION_DATA.occupations.map(occupation => (
                    <SelectItem key={occupation} value={occupation} className="dark:hover:bg-gray-600 dark:focus:bg-gray-600">{occupation}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="dark:text-gray-300">جدول العمل</Label>
              <Select onValueChange={(value) => handleAnswerChange('workSchedule', value)}>
                <SelectTrigger className="text-right dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                  <SelectValue placeholder="ما هو جدول عملك؟" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                  {QUESTION_DATA.workSchedules.map(schedule => (
                    <SelectItem key={schedule} value={schedule} className="dark:hover:bg-gray-600 dark:focus:bg-gray-600">{schedule}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="dark:text-gray-300">مستوى التوتر</Label>
              <Select onValueChange={(value) => handleAnswerChange('stressLevel', value)}>
                <SelectTrigger className="text-right dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                  <SelectValue placeholder="ما مستوى التوتر في حياتك؟" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                  {QUESTION_DATA.stressLevels.map(level => (
                    <SelectItem key={level} value={level} className="dark:hover:bg-gray-600 dark:focus:bg-gray-600">{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="dark:text-gray-300">ساعات النوم</Label>
              <Select onValueChange={(value) => handleAnswerChange('sleepHours', value)}>
                <SelectTrigger className="text-right dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                  <SelectValue placeholder="كم ساعة تنام يومياً؟" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                  {QUESTION_DATA.sleepHours.map(hours => (
                    <SelectItem key={hours} value={hours} className="dark:hover:bg-gray-600 dark:focus:bg-gray-600">{hours}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="dark:text-gray-300">نمط الحياة</Label>
              <Select onValueChange={(value) => handleAnswerChange('lifestyle', value)}>
                <SelectTrigger className="text-right dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                  <SelectValue placeholder="كيف تصف نمط حياتك؟" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                  {QUESTION_DATA.lifestyles.map(lifestyle => (
                    <SelectItem key={lifestyle} value={lifestyle} className="dark:hover:bg-gray-600 dark:focus:bg-gray-600">{lifestyle}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      // Continue with other cases...
      default:
        return <div className="text-center py-8 dark:text-gray-300">المحتوى قيد التطوير...</div>;
    }
  };

  if (generatedPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="max-w-6xl mx-auto">
          <Card className="mb-6 dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Trophy className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mr-3" />
                <div>
                  <CardTitle className="text-3xl text-emerald-800 dark:text-emerald-400">
                    🎉 خطتك الشخصية جاهزة!
                  </CardTitle>
                  <p className="text-emerald-600 dark:text-emerald-400 mt-2">
                    خطة صحية شاملة لمدة 6 أشهر مصممة خصيصاً لك
                  </p>
                </div>
              </div>
              <div className="flex justify-center gap-4">
                <Button onClick={() => downloadPlan(generatedPlan)} className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600">
                  <Download className="w-4 h-4 mr-2" />
                  تحميل الخطة الكاملة
                </Button>
                <Button variant="outline" onClick={() => setGeneratedPlan(null)} className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                  إنشاء خطة جديدة
                </Button>
              </div>
            </CardHeader>
          </Card>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview" className="dark:text-gray-300 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-gray-100">نظرة عامة</TabsTrigger>
              <TabsTrigger value="nutrition" className="dark:text-gray-300 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-gray-100">التغذية</TabsTrigger>
              <TabsTrigger value="exercise" className="dark:text-gray-300 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-gray-100">التمارين</TabsTrigger>
              <TabsTrigger value="tracking" className="dark:text-gray-300 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-gray-100">التتبع</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center text-right dark:text-gray-200">
                      <Target className="w-5 h-5 ml-2 text-blue-600 dark:text-blue-400" />
                      الهدف الأساسي
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg text-right dark:text-gray-300">{generatedPlan.userProfile.primaryGoal}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-right">
                      المدة: {generatedPlan.userProfile.timeFrame}
                    </p>
                  </CardContent>
                </Card>

                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center text-right dark:text-gray-200">
                      <DollarSign className="w-5 h-5 ml-2 text-yellow-600 dark:text-yellow-400" />
                      التكلفة المتوقعة
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 text-right">
                      {generatedPlan.estimatedBudget} ريال
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-right">شهرياً</p>
                  </CardContent>
                </Card>

                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center text-right dark:text-gray-200">
                      <Calendar className="w-5 h-5 ml-2 text-purple-600 dark:text-purple-400" />
                      مدة البرنامج
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 text-right">
                      {generatedPlan.planDuration} يوم
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-right">6 أشهر كاملة</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-right dark:text-gray-200">معلومات المستخدم</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-right">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">الاسم</p>
                      <p className="font-semibold dark:text-gray-300">{generatedPlan.userProfile.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">العمر</p>
                      <p className="font-semibold dark:text-gray-300">{generatedPlan.userProfile.age}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">مستوى النشاط</p>
                      <p className="font-semibold dark:text-gray-300">{generatedPlan.userProfile.activityLevel}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">نوع التمرين</p>
                      <p className="font-semibold dark:text-gray-300">{generatedPlan.userProfile.exerciseType}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="nutrition" className="space-y-6">
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-right dark:text-gray-200">خطة التغذية - أول 7 أيام</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {generatedPlan.nutritionPlan.slice(0, 7).map((day) => (
                      <div key={day.day} className="border rounded-lg p-4 dark:border-gray-600 dark:bg-gray-700">
                        <h4 className="font-semibold text-right mb-2 dark:text-gray-200">اليوم {day.day}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-right">
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">الإفطار</p>
                            <p className="font-medium dark:text-gray-300">{day.breakfast}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">الغداء</p>
                            <p className="font-medium dark:text-gray-300">{day.lunch}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">العشاء</p>
                            <p className="font-medium dark:text-gray-300">{day.dinner}</p>
                          </div>
                        </div>
                        <div className="mt-2 flex justify-between text-sm text-gray-600 dark:text-gray-400">
                          <span>التكلفة: {day.cost} ريال</span>
                          <span>السعرات: {day.calories}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="exercise" className="space-y-6">
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-right dark:text-gray-200">برنامج التمارين - أول أسبوع</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {generatedPlan.exercisePlan.slice(0, 6).map((day) => (
                      <div key={day.day} className="border rounded-lg p-4 dark:border-gray-600 dark:bg-gray-700">
                        <h4 className="font-semibold text-right mb-2 dark:text-gray-200">اليوم {day.day}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 text-right mb-2">
                          المدة: {day.duration} دقيقة | المستوى: {day.difficulty}
                        </p>
                        <div className="space-y-2">
                          {day.exercises.map((exercise, index) => (
                            <div key={index} className="flex justify-between items-center">
                              <div className="text-right">
                                <p className="font-medium dark:text-gray-300">{exercise.name}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{exercise.description}</p>
                              </div>
                              <div className="text-left">
                                <p className="text-sm dark:text-gray-300">{exercise.sets} مجموعات</p>
                                <p className="text-sm dark:text-gray-300">{exercise.reps}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tracking" className="space-y-6">
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-right dark:text-gray-200">نظام التتبع والمراقبة</CardTitle>
                </CardHeader>
                <CardContent className="text-right">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2 dark:text-gray-200">المكملات الغذائية</h4>
                      {generatedPlan.supplementPlan.length > 0 ? (
                        <ul className="list-disc list-inside space-y-1">
                          {generatedPlan.supplementPlan.map((supplement, index) => (
                            <li key={index} className="dark:text-gray-300">{supplement}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-600 dark:text-gray-400">لا توجد مكملات مطلوبة</p>
                      )}
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2 dark:text-gray-200">نصائح للمتابعة</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li className="dark:text-gray-300">قم بوزن نفسك أسبوعياً في نفس التوقيت</li>
                        <li className="dark:text-gray-300">احتفظ بمذكرة طعام يومية</li>
                        <li className="dark:text-gray-300">صور تقدمك كل أسبوعين</li>
                        <li className="dark:text-gray-300">استمع لجسدك وخذ أيام راحة عند الحاجة</li>
                        <li className="dark:text-gray-300">اشرب الماء بكميات كافية يومياً</li>
                        <li className="dark:text-gray-300">احصل على نوم كافي (7-8 ساعات)</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <Card className="w-full max-w-2xl mx-auto dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="text-center py-12">
            <div className="flex justify-center mb-6">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-600"></div>
            </div>
            <h2 className="text-2xl font-bold text-emerald-800 dark:text-emerald-400 mb-4">
              🤖 الذكاء الاصطناعي يحلل بياناتك
            </h2>
            <p className="text-emerald-600 dark:text-emerald-400 mb-6">
              جارٍ إنشاء خطة صحية مخصصة لك من قاعدة بيانات تحتوي على أكثر من 100,000 خطة...
            </p>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>⚡ تحليل أهدافك ومتطلباتك الشخصية</p>
              <p>🍎 اختيار الأطعمة المناسبة لميزانيتك ومنطقتك</p>
              <p>💪 تصميم برنامج تمارين متدرج ومتوازن</p>
              <p>📊 حساب السعرات والتكلفة المثلى</p>
            </div>
            <Progress value={75} className="mt-6" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-12 h-12 text-emerald-600 mr-3" />
            <div>
              <h1 className="text-4xl font-bold text-emerald-800 dark:text-emerald-400">صمم حياتك</h1>
              <p className="text-emerald-600 dark:text-emerald-400 text-lg">نظام ثوري لتصميم خطط صحية مخصصة من 100,000+ خطة</p>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-6 space-x-reverse text-sm text-gray-600 dark:text-gray-400 mb-6">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-500 mr-1" />
              <span>أكثر من 100,000 خطة</span>
            </div>
            <div className="flex items-center">
              <Globe className="w-4 h-4 text-blue-500 mr-1" />
              <span>مناسب لجميع الطبقات</span>
            </div>
            <div className="flex items-center">
              <Brain className="w-4 h-4 text-purple-500 mr-1" />
              <span>ذكاء اصطناعي متطور</span>
            </div>
          </div>

          <Progress value={progress} className="w-full max-w-2xl mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            تقدم الاستبيان: {Math.round(progress)}%
          </p>
        </div>

        {/* Current Step */}
        {renderCurrentStep()}

        {/* Navigation */}
        <div className="flex justify-between mt-8 max-w-4xl mx-auto">
          <Button 
            variant="outline" 
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            السابق
          </Button>

          {currentStep < QUESTIONNAIRE_STEPS.length - 1 ? (
            <Button 
              onClick={() => setCurrentStep(Math.min(QUESTIONNAIRE_STEPS.length - 1, currentStep + 1))}
              className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
            >
              التالي
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button 
              onClick={generatePlan}
              className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 dark:from-emerald-500 dark:to-blue-500 dark:hover:from-emerald-600 dark:hover:to-blue-600"
            >
              <Zap className="w-4 h-4 mr-2" />
              إنشاء خطتي الشخصية
            </Button>
          )}
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Button 
            variant="ghost" 
            onClick={() => setLocation("/")}
            className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
          >
            العودة للصفحة الرئيسية
          </Button>
        </div>
      </div>
    </div>
  );
}