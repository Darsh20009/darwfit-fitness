// خالد عمر سعيد - نظام غذائي سنوي لبناء العضلات (15 سنة - 69.9 كجم - 182 سم)
// نظام مخصص لزيادة الكتلة العضلية بتكلفة منخفضة

interface MuscleGainMealItem {
  title: string;
  items: string[];
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  cost: string; // تقدير التكلفة
  nutritionInfo?: {
    protein?: string;
    carbs?: string;
    fats?: string;
  };
}

interface MuscleGainDailyPlan {
  breakfast: MuscleGainMealItem;
  morningSnack: MuscleGainMealItem;
  lunch: MuscleGainMealItem;
  afternoonSnack: MuscleGainMealItem;
  dinner: MuscleGainMealItem;
  beforeSleep: MuscleGainMealItem;
  nutritionGuide: MuscleGainMealItem;
  phase: string;
  phaseGoal: string;
  totalCalories: number;
  totalProtein: number;
}

// المرحلة 1: بناء الأساس - الشهرين الأولين
const foundationPhaseMuscleGain: MuscleGainDailyPlan = {
  breakfast: {
    title: "إفطار بناء العضلات (متأخر)",
    items: [
      "3 بيضات مسلوقة أو مقلية بملعقة زيت زيتون",
      "رغيف خبز أسمر",
      "كوب شاي بالحليب مع ملعقة عسل",
      "حبة موز متوسطة"
    ],
    calories: 520,
    protein: 28,
    carbs: 45,
    fats: 22,
    cost: "15-20 ريال يومياً",
    nutritionInfo: {
      protein: "البيض مصدر ممتاز للبروتين الكامل",
      carbs: "الخبز الأسمر يوفر الطاقة المستدامة",
      fats: "زيت الزيتون للدهون الصحية"
    }
  },
  morningSnack: {
    title: "وجبة خفيفة صباحية",
    items: [
      "حفنة فول سوداني (30 جرام)",
      "موزة صغيرة",
      "كوب ماء"
    ],
    calories: 280,
    protein: 12,
    carbs: 25,
    fats: 14,
    cost: "5-8 ريال يومياً",
    nutritionInfo: {
      protein: "الفول السوداني غني بالبروتين والدهون الصحية"
    }
  },
  lunch: {
    title: "غداء بناء العضلات الرئيسي",
    items: [
      "180 جرام صدر دجاج مشوي أو مسلوق",
      "كوب أرز بني مطبوخ",
      "سلطة خضراء مع زيت زيتون وليمون",
      "كوب عصير طبيعي أو ماء"
    ],
    calories: 650,
    protein: 45,
    carbs: 58,
    fats: 18,
    cost: "25-30 ريال يومياً",
    nutritionInfo: {
      protein: "الدجاج مصدر بروتين قليل الدهون",
      carbs: "الأرز البني للطاقة والألياف"
    }
  },
  afternoonSnack: {
    title: "وجبة بعد الظهر",
    items: [
      "كوب حليب بالشوكولاتة الداكنة",
      "شريحتان خبز توست أسمر مع ملعقة زبدة فول سوداني"
    ],
    calories: 420,
    protein: 18,
    carbs: 35,
    fats: 22,
    cost: "10-12 ريال يومياً",
    nutritionInfo: {
      protein: "الحليب وزبدة الفول السوداني للبروتين"
    }
  },
  dinner: {
    title: "عشاء خفيف ومغذي",
    items: [
      "150 جرام سمك مشوي (سردين أو ماكريل)",
      "حبتان بطاطس مسلوقتان متوسطتان",
      "سلطة خضراء صغيرة",
      "كوب شاي أخضر"
    ],
    calories: 480,
    protein: 32,
    carbs: 40,
    fats: 18,
    cost: "20-25 ريال يومياً",
    nutritionInfo: {
      protein: "السمك غني بالبروتين والأوميجا 3",
      carbs: "البطاطس للكاربوهيدرات الصحية"
    }
  },
  beforeSleep: {
    title: "وجبة ما قبل النوم",
    items: [
      "كوب زبادي يوناني",
      "ملعقة عسل طبيعي",
      "حفنة صغيرة لوز أو جوز"
    ],
    calories: 240,
    protein: 15,
    carbs: 20,
    fats: 12,
    cost: "8-10 ريال يومياً",
    nutritionInfo: {
      protein: "الزبادي اليوناني لبروتين بطيء الامتصاص"
    }
  },
  nutritionGuide: {
    title: "دليل التغذية لبناء العضلات",
    items: [
      "تناول 2.0 جرام بروتين لكل كيلو من وزن الجسم (140 جرام يومياً)",
      "اشرب 4-5 أكواب ماء يومياً على الأقل",
      "تناول وجبة خفيفة خلال ساعة من التمرين",
      "ركز على الأطعمة الكاملة وتجنب الأطعمة المصنعة",
      "نم 8-9 ساعات يومياً للنمو الأمثل"
    ],
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
    cost: "نصائح مجانية"
  },
  phase: "مرحلة بناء الأساس",
  phaseGoal: "إنشاء عادات غذائية صحية وزيادة تدريجية في السعرات للنمو",
  totalCalories: 2590,
  totalProtein: 150
};

// المرحلة 2: التكثيف - الشهر 3-6
const intensificationPhaseMuscleGain: MuscleGainDailyPlan = {
  breakfast: {
    title: "إفطار قوي لبناء العضلات",
    items: [
      "شوفان بالحليب مع ملعقة عسل وقطع موز",
      "بيضتان مسلوقتان",
      "كوب عصير برتقال طبيعي",
      "حفنة صغيرة مكسرات"
    ],
    calories: 580,
    protein: 25,
    carbs: 65,
    fats: 20,
    cost: "18-22 ريال يومياً"
  },
  morningSnack: {
    title: "وجبة خفيفة مكثفة",
    items: [
      "ساندويتش زبدة فول سوداني مع خبز أسمر",
      "كوب حليب",
      "تفاحة صغيرة"
    ],
    calories: 450,
    protein: 18,
    carbs: 45,
    fats: 22,
    cost: "12-15 ريال يومياً"
  },
  lunch: {
    title: "غداء متقدم لبناء العضلات",
    items: [
      "200 جرام لحم مفروم قليل الدهن",
      "كوب ونصف معكرونة قمح كامل",
      "خضار سوتيه متنوعة",
      "سلطة كبيرة بزيت الزيتون"
    ],
    calories: 750,
    protein: 48,
    carbs: 70,
    fats: 25,
    cost: "35-40 ريال يومياً"
  },
  afternoonSnack: {
    title: "وجبة بعد التمرين",
    items: [
      "كوب حليب بالشوكولاتة",
      "موزتان",
      "حفنة تمر (5 حبات)"
    ],
    calories: 480,
    protein: 16,
    carbs: 75,
    fats: 12,
    cost: "10-15 ريال يومياً"
  },
  dinner: {
    title: "عشاء متوازن",
    items: [
      "قطعة سلمون أو تونة مشوية (180 جرام)",
      "كوب أرز بني",
      "خضار مشكلة",
      "شاي أخضر"
    ],
    calories: 520,
    protein: 35,
    carbs: 45,
    fats: 20,
    cost: "30-35 ريال يومياً"
  },
  beforeSleep: {
    title: "وجبة ليلية متقدمة",
    items: [
      "كوب زبادي يوناني كامل الدسم",
      "ملعقتان عسل",
      "ملعقة زبدة لوز",
      "رشة قرفة"
    ],
    calories: 320,
    protein: 20,
    carbs: 25,
    fats: 16,
    cost: "12-15 ريال يومياً"
  },
  nutritionGuide: {
    title: "دليل التكثيف الغذائي",
    items: [
      "زيادة البروتين إلى 2.2 جرام لكل كيلو (154 جرام يومياً)",
      "تناول 6-8 أكواب ماء يومياً",
      "وجبة خفيفة خلال 30 دقيقة من التمرين",
      "تناول الكاربوهيدرات المعقدة قبل التمرين بساعتين",
      "مراقبة الوزن أسبوعياً - الهدف زيادة 0.5 كجم أسبوعياً"
    ],
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
    cost: "إرشادات مجانية"
  },
  phase: "مرحلة التكثيف",
  phaseGoal: "زيادة الكتلة العضلية بشكل مكثف مع تحسين الأداء",
  totalCalories: 3100,
  totalProtein: 162
};

// المرحلة 3: الذروة - الشهر 7-9
const peakPhaseMuscleGain: MuscleGainDailyPlan = {
  breakfast: {
    title: "إفطار الذروة الغذائية",
    items: [
      "فول مدمس بزيت الزيتون",
      "رغيف خبز أسمر",
      "3 بيضات مقلية",
      "كوب عصير مانجو طبيعي",
      "ملعقة طحينة"
    ],
    calories: 680,
    protein: 32,
    carbs: 55,
    fats: 32,
    cost: "20-25 ريال يومياً"
  },
  morningSnack: {
    title: "وجبة خفيفة عالية الطاقة",
    items: [
      "كوب عصير فواكه طبيعي",
      "قطعة كعك الشوفان محلي الصنع",
      "حفنة جوز ولوز"
    ],
    calories: 520,
    protein: 15,
    carbs: 60,
    fats: 24,
    cost: "15-18 ريال يومياً"
  },
  lunch: {
    title: "غداء الذروة الغذائية",
    items: [
      "قطعة لحم أحمر مشوية (200 جرام)",
      "كوبين أرز بسمتي",
      "فتوش أو تبولة",
      "كوب عصير عنب طبيعي"
    ],
    calories: 850,
    protein: 52,
    carbs: 85,
    fats: 28,
    cost: "45-50 ريال يومياً"
  },
  afternoonSnack: {
    title: "وجبة ما بعد التمرين المكثفة",
    items: [
      "عصير بروتين طبيعي (حليب + موز + تمر + زبدة فول سوداني)",
      "قطعة خبز بالحبوب الكاملة",
      "جبنة قريش"
    ],
    calories: 580,
    protein: 28,
    carbs: 55,
    fats: 22,
    cost: "18-22 ريال يومياً"
  },
  dinner: {
    title: "عشاء الذروة",
    items: [
      "سمك سلمون مشوي (200 جرام)",
      "بطاطس حلوة مشوية",
      "سلطة كينوا مع خضار",
      "شاي أخضر بالنعناع"
    ],
    calories: 650,
    protein: 42,
    carbs: 58,
    fats: 24,
    cost: "40-45 ريال يومياً"
  },
  beforeSleep: {
    title: "وجبة النوم المتقدمة",
    items: [
      "كوب حليب كامل الدسم دافئ",
      "ملعقتان عسل سدر",
      "حفنة تمر محشي لوز",
      "رشة قرفة وهيل"
    ],
    calories: 380,
    protein: 12,
    carbs: 52,
    fats: 16,
    cost: "15-18 ريال يومياً"
  },
  nutritionGuide: {
    title: "دليل ذروة بناء العضلات",
    items: [
      "المحافظة على 2.2 جرام بروتين لكل كيلو",
      "شرب 8-10 أكواب ماء يومياً",
      "تناول وجبة كاملة خلال ساعة من التمرين",
      "النوم 9 ساعات يومياً للتعافي الأمثل",
      "فحص دوري للتأكد من النمو الصحي"
    ],
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
    cost: "إرشادات صحية"
  },
  phase: "مرحلة الذروة",
  phaseGoal: "الوصول لأقصى نمو عضلي صحي مع الحفاظ على التوازن الغذائي",
  totalCalories: 3660,
  totalProtein: 181
};

// المرحلة 4: الاستقرار - الشهر 10-12
const stabilizationPhaseMuscleGain: MuscleGainDailyPlan = {
  breakfast: {
    title: "إفطار الاستقرار الصحي",
    items: [
      "طبق شوفان بالحليب والفواكه",
      "بيضتان مسلوقتان",
      "كوب شاي أخضر",
      "حبة تفاح أو إجاص"
    ],
    calories: 480,
    protein: 24,
    carbs: 52,
    fats: 18,
    cost: "15-18 ريال يومياً"
  },
  morningSnack: {
    title: "وجبة خفيفة متوازنة",
    items: [
      "كوب زبادي طبيعي",
      "ملعقة عسل",
      "حفنة مكسرات متنوعة"
    ],
    calories: 320,
    protein: 15,
    carbs: 25,
    fats: 18,
    cost: "10-12 ريال يومياً"
  },
  lunch: {
    title: "غداء الاستقرار",
    items: [
      "دجاج مشوي (180 جرام)",
      "خضار مشكلة مع أرز",
      "سلطة فتوش",
      "كوب ماء أو عصير طبيعي"
    ],
    calories: 620,
    protein: 45,
    carbs: 58,
    fats: 20,
    cost: "25-30 ريال يومياً"
  },
  afternoonSnack: {
    title: "وجبة العصر الصحية",
    items: [
      "ساندويتش جبنة وخضار",
      "كوب حليب",
      "موزة"
    ],
    calories: 420,
    protein: 20,
    carbs: 45,
    fats: 16,
    cost: "12-15 ريال يومياً"
  },
  dinner: {
    title: "عشاء خفيف ومتوازن",
    items: [
      "سمك مشوي (150 جرام)",
      "خضار على البخار",
      "قطعة خبز أسمر",
      "سلطة صغيرة"
    ],
    calories: 450,
    protein: 32,
    carbs: 35,
    fats: 18,
    cost: "20-25 ريال يومياً"
  },
  beforeSleep: {
    title: "وجبة ليلية مهدئة",
    items: [
      "كوب حليب دافئ",
      "ملعقة عسل",
      "3 حبات تمر"
    ],
    calories: 220,
    protein: 8,
    carbs: 35,
    fats: 8,
    cost: "8-10 ريال يومياً"
  },
  nutritionGuide: {
    title: "دليل الاستقرار الغذائي",
    items: [
      "المحافظة على 1.8-2.0 جرام بروتين لكل كيلو",
      "شرب 6-8 أكواب ماء يومياً",
      "التركيز على التنوع الغذائي",
      "مراقبة الوزن شهرياً",
      "اتباع نمط حياة صحي مستدام"
    ],
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
    cost: "نصائح للحياة"
  },
  phase: "مرحلة الاستقرار",
  phaseGoal: "الحفاظ على المكاسب العضلية مع نمط حياة صحي مستدام",
  totalCalories: 2510,
  totalProtein: 144
};

export function getKhaledOmarMealPlan(phase: number = 1): MuscleGainDailyPlan {
  switch (phase) {
    case 1:
      return foundationPhaseMuscleGain;
    case 2:
      return intensificationPhaseMuscleGain;
    case 3:
      return peakPhaseMuscleGain;
    case 4:
      return stabilizationPhaseMuscleGain;
    default:
      return foundationPhaseMuscleGain;
  }
}

export function getKhaledOmarMealPlanByMonth(month: number): MuscleGainDailyPlan {
  if (month <= 2) return foundationPhaseMuscleGain;
  if (month <= 6) return intensificationPhaseMuscleGain;
  if (month <= 9) return peakPhaseMuscleGain;
  return stabilizationPhaseMuscleGain;
}

export function getKhaledOmarMealSummary() {
  return [
    { phase: "بناء الأساس", months: "الشهر 1-2", calories: "2590 سعرة", protein: "150 جرام" },
    { phase: "التكثيف", months: "الشهر 3-6", calories: "3100 سعرة", protein: "162 جرام" },
    { phase: "الذروة", months: "الشهر 7-9", calories: "3660 سعرة", protein: "181 جرام" },
    { phase: "الاستقرار", months: "الشهر 10-12", calories: "2510 سعرة", protein: "144 جرام" }
  ];
}

export function getKhaledOmarBudgetTips() {
  return [
    "شراء البروتين بالجملة (البيض واللحوم المجمدة)",
    "استخدام البقوليات كمصدر بروتين رخيص (فول، عدس، حمص)",
    "شراء الخضار الموسمية",
    "تحضير الوجبات مسبقاً لتوفير الوقت والمال",
    "استخدام الحليب المجفف كبديل اقتصادي",
    "شراء المكسرات والفواكه المجففة بكميات كبيرة"
  ];
}

export function getKhaledOmarProgressTracker() {
  return {
    weeklyWeightTarget: "زيادة 0.3-0.5 كجم أسبوعياً",
    monthlyMeasurements: "قياس محيط الذراع والصدر شهرياً",
    energyLevels: "مراقبة مستوى الطاقة والنشاط",
    sleepQuality: "تسجيل جودة النوم (8-9 ساعات)",
    workoutPerformance: "تحسن في الأوزان والتكرارات"
  };
}