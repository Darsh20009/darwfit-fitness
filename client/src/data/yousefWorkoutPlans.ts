// برنامج التمارين الخاص بيوسف درويش - DARWFIT
import React from 'react';

export interface YousefExercise {
  name: string;
  reps: string;
  sets?: number;
  duration?: string;
  icon: string; // CSS class for animated icon
  description: string;
  difficulty: 'مبتدئ' | 'متوسط' | 'متقدم';
  targetMuscles: string[];
  benefits: string[];
}

export interface YousefWorkoutDay {
  title: string;
  description: string;
  totalDuration: string;
  exercises: YousefExercise[];
  warmUp: YousefExercise[];
  coolDown: YousefExercise[];
}

// تمارين الإحماء
const warmUpExercises: YousefExercise[] = [
  {
    name: "مشي في المكان",
    reps: "5 دقائق",
    icon: "animate-bounce",
    description: "مشي سريع في المكان لتحضير الجسم",
    difficulty: "مبتدئ",
    targetMuscles: ["الجسم كامل"],
    benefits: ["زيادة معدل ضربات القلب", "تحضير العضلات"]
  },
  {
    name: "تحريك الذراعين دائرياً",
    reps: "10 مرات للأمام و 10 للخلف",
    icon: "animate-spin",
    description: "تحريك الذراعين في دوائر كبيرة",
    difficulty: "مبتدئ",
    targetMuscles: ["الأكتاف", "الذراعين"],
    benefits: ["مرونة المفاصل", "تجهيز الأكتاف"]
  }
];

// تمارين التهدئة
const coolDownExercises: YousefExercise[] = [
  {
    name: "تمدد الذراعين",
    reps: "30 ثانية لكل ذراع",
    icon: "animate-pulse",
    description: "تمدد هادئ للذراعين والأكتاف",
    difficulty: "مبتدئ",
    targetMuscles: ["الذراعين", "الأكتاف"],
    benefits: ["منع التشنج", "استرخاء العضلات"]
  },
  {
    name: "تنفس عميق",
    reps: "5 دقائق",
    icon: "animate-ping",
    description: "تنفس عميق وهادئ لتهدئة الجسم",
    difficulty: "مبتدئ",
    targetMuscles: ["الجهاز التنفسي"],
    benefits: ["تهدئة معدل القلب", "استرخاء"]
  }
];

// البرنامج الأساسي ليوسف درويش
export const yousefDailyWorkout: YousefWorkoutDay = {
  title: "برنامج يوسف درويش اليومي المكثف 🔥",
  description: "برنامج تمارين مخصص لبناء القوة والعضلات مع تحسين القدرة على التحمل",
  totalDuration: "45-60 دقيقة",
  warmUp: warmUpExercises,
  coolDown: coolDownExercises,
  exercises: [
    {
      name: "🚴‍♂️ ركوب الدراجة الثابتة",
      reps: "30 دقيقة",
      icon: "animate-bounce",
      description: "كارديو مكثف لحرق الدهون وتحسين التحمل",
      difficulty: "متوسط",
      targetMuscles: ["عضلات الرجلين", "القلب", "الرئتين"],
      benefits: ["حرق السعرات", "تحسين صحة القلب", "زيادة التحمل"]
    },
    {
      name: "💪 تمرين الضغط (Push-ups)",
      reps: "100 تكرار",
      sets: 5,
      icon: "animate-pulse",
      description: "5 مجموعات × 20 تكرار - مع راحة دقيقة بين كل مجموعة",
      difficulty: "متقدم",
      targetMuscles: ["الصدر", "الترايسبس", "الأكتاف", "البطن"],
      benefits: ["بناء عضلات الجزء العلوي", "تقوية الكور", "زيادة القوة الوظيفية"]
    },
    {
      name: "🏋️‍♂️ تمرين العقلة (Pull-ups)",
      reps: "40 تكرار",
      sets: 4,
      icon: "animate-bounce",
      description: "4 مجموعات × 10 تكرار - مع راحة 90 ثانية بين المجموعات",
      difficulty: "متقدم",
      targetMuscles: ["عضلات الظهر", "البايسبس", "الساعدين"],
      benefits: ["تقوية الظهر", "بناء عضلات البايسبس", "تحسين القبضة"]
    },
    {
      name: "🔥 تمرين البطن (Crunches)",
      reps: "40 تكرار",
      sets: 4,
      icon: "animate-ping",
      description: "4 مجموعات × 10 تكرار - مع راحة 30 ثانية بين المجموعات",
      difficulty: "متوسط",
      targetMuscles: ["عضلات البطن العلوية", "الكور"],
      benefits: ["نحت عضلات البطن", "تقوية الكور", "تحسين وضعية الجسم"]
    },
    {
      name: "🦵 تمرين السكوات (Squats)",
      reps: "40 تكرار",
      sets: 4,
      icon: "animate-bounce",
      description: "4 مجموعات × 10 تكرار - مع راحة 45 ثانية بين المجموعات",
      difficulty: "متوسط",
      targetMuscles: ["عضلات الأرداف", "عضلات الفخذ الأمامية", "عضلات الفخذ الخلفية"],
      benefits: ["تقوية الأرجل", "بناء عضلات الأرداف", "حرق سعرات عالية"]
    }
  ]
};

// تمارين بيتية إضافية ليوسف
export const yousefHomeExercises: YousefExercise[] = [
  {
    name: "🏃‍♂️ الجري في المكان",
    reps: "10 دقائق",
    icon: "animate-bounce",
    description: "جري سريع في المكان مع رفع الركبتين عالياً",
    difficulty: "متوسط",
    targetMuscles: ["عضلات الرجلين", "القلب"],
    benefits: ["تحسين التحمل", "حرق الدهون"]
  },
  {
    name: "🔄 تمرين البلانك (Plank)",
    reps: "3 × 60 ثانية",
    sets: 3,
    icon: "animate-pulse",
    description: "ثبات في وضعية البلانك لتقوية عضلات الكور",
    difficulty: "متوسط",
    targetMuscles: ["البطن", "الظهر", "الأكتاف"],
    benefits: ["تقوية الكور", "تحسين الثبات"]
  },
  {
    name: "🦘 تمرين البربي (Burpees)",
    reps: "15 تكرار",
    sets: 3,
    icon: "animate-bounce",
    description: "تمرين شامل للجسم كامل - 3 مجموعات",
    difficulty: "متقدم",
    targetMuscles: ["الجسم كامل"],
    benefits: ["حرق سعرات عالية", "تحسين القدرة على التحمل", "بناء القوة"]
  },
  {
    name: "🏋️ تمرين الديب (Dips)",
    reps: "20 تكرار",
    sets: 3,
    icon: "animate-ping",
    description: "باستخدام كرسي أو حافة السرير - 3 مجموعات",
    difficulty: "متوسط",
    targetMuscles: ["الترايسبس", "الصدر السفلي", "الأكتاف"],
    benefits: ["تقوية الترايسبس", "بناء القوة الوظيفية"]
  },
  {
    name: "🤸‍♂️ تمرين المقص (Lunges)",
    reps: "20 تكرار (10 لكل رجل)",
    sets: 3,
    icon: "animate-bounce",
    description: "خطوات واسعة للأمام مع النزول بالركبة - 3 مجموعات",
    difficulty: "متوسط",
    targetMuscles: ["عضلات الأرداف", "عضلات الفخذ", "عضلات السمانة"],
    benefits: ["تقوية الأرجل", "تحسين التوازن", "بناء عضلات الأرداف"]
  },
  {
    name: "🏔️ تمرين متسلق الجبال (Mountain Climbers)",
    reps: "30 ثانية",
    sets: 4,
    icon: "animate-ping",
    description: "تحريك سريع للأرجل في وضعية البلانك - 4 مجموعات",
    difficulty: "متقدم",
    targetMuscles: ["البطن", "الأكتاف", "عضلات الرجلين"],
    benefits: ["كارديو عالي الشدة", "تقوية الكور", "حرق دهون"]
  },
  {
    name: "💎 تمرين الضغط الماسي (Diamond Push-ups)",
    reps: "15 تكرار",
    sets: 3,
    icon: "animate-pulse",
    description: "ضغط مع تكوين شكل الماس باليدين - 3 مجموعات",
    difficulty: "متقدم",
    targetMuscles: ["الترايسبس", "الصدر الداخلي", "الكور"],
    benefits: ["تركيز على الترايسبس", "بناء القوة", "تحدي أعلى"]
  },
  {
    name: "🔄 تمرين الجانبي (Side Plank)",
    reps: "45 ثانية لكل جانب",
    sets: 2,
    icon: "animate-pulse",
    description: "بلانك جانبي لتقوية عضلات الجانب - مجموعتان",
    difficulty: "متوسط",
    targetMuscles: ["عضلات البطن الجانبية", "الكور"],
    benefits: ["تقوية الجانبين", "تحسين التوازن"]
  }
];

// دالة للحصول على التمرين اليومي
export function getYousefDailyWorkout(): YousefWorkoutDay {
  return yousefDailyWorkout;
}

// دالة للحصول على التمارين البيتية الإضافية
export function getYousefHomeExercises(): YousefExercise[] {
  return yousefHomeExercises;
}

// إحصائيات البرنامج
export function getYousefWorkoutStats() {
  return {
    totalExercises: yousefDailyWorkout.exercises.length + yousefHomeExercises.length,
    estimatedCaloriesBurn: 450, // سعرة حرارية تقريبية
    averageDuration: "45-60 دقيقة",
    difficultyLevel: "متوسط إلى متقدم",
    weeklyFrequency: "6 أيام أسبوعياً",
    restDay: "يوم الجمعة"
  };
}

// نصائح خاصة ليوسف
export function getYousefWorkoutTips(): string[] {
  return [
    "🔥 ابدأ بالإحماء دائماً لمدة 5 دقائق لتجنب الإصابات",
    "💧 اشرب الماء بانتظام خلال التمرين، خاصة مع الكارديو",
    "⏱️ خذ راحة كافية بين المجموعات للحصول على أفضل أداء",
    "🎯 ركز على الجودة أكثر من السرعة في جميع التمارين",
    "📈 زد الشدة تدريجياً كل أسبوع بإضافة تكرارات أو تقليل الراحة",
    "🍎 تناول وجبة خفيفة قبل التمرين بساعة مع التركيز على الكربوهيدرات",
    "💪 استخدم تقنية التنفس الصحيحة - زفير مع الجهد، شهيق مع الراحة",
    "🛌 احصل على راحة كاملة يوم الجمعة للسماح للعضلات بالتعافي والنمو"
  ];
}