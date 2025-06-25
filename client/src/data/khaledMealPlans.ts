// خطة خالد محمد الغذائية - خطة سنوية متقدمة بناء على الأطعمة المحلية والطبيعية

interface KhaledMealItem {
  title: string;
  items: string[];
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  nutritionInfo?: {
    protein?: string;
    carbs?: string;
    fats?: string;
  };
}

interface KhaledDailyMealPlan {
  breakfast: KhaledMealItem;
  morningSnack: KhaledMealItem;
  lunch: KhaledMealItem;
  afternoonSnack: KhaledMealItem;
  dinner: KhaledMealItem;
  beforeSleep: KhaledMealItem;
  nutritionGuide: KhaledMealItem;
  phase: string;
  phaseGoal: string;
}

// المرحلة الأولى: التأسيس (أشهر 1-3)
const foundationPhaseMeals: KhaledDailyMealPlan = {
  breakfast: {
    title: "إفطار التأسيس",
    items: [
      "3 بيضات مسلوقة أو مقلية بزيت زيتون",
      "رغيف خبز بلدي أو توست أسمر",
      "ملعقة كبيرة زيت زيتون",
      "طماطم وخيار",
      "كوب شاي أو قهوة"
    ],
    calories: 520,
    protein: 24,
    carbs: 35,
    fats: 28,
    nutritionInfo: {
      protein: "24غ بروتين عالي الجودة",
      carbs: "35غ كربوهيدرات معقدة",
      fats: "28غ دهون صحية"
    }
  },
  morningSnack: {
    title: "سناك الصباح",
    items: [
      "كوب زبادي طبيعي",
      "2 ملعقة كبيرة شوفان",
      "ملعقة صغيرة عسل طبيعي",
      "حفنة من المكسرات (اختيارية)"
    ],
    calories: 280,
    protein: 12,
    carbs: 32,
    fats: 8,
    nutritionInfo: {
      protein: "12غ بروتين من الزبادي",
      carbs: "32غ كربوهيدرات بطيئة",
      fats: "8غ دهون صحية"
    }
  },
  lunch: {
    title: "الغداء الأساسي",
    items: [
      "نصف فرخة مشوية أو مسلوقة",
      "كوب أرز أبيض أو بني",
      "خضار سوتيه (كوسة، بامية، أو جزر)",
      "سلطة خضراء مع زيت زيتون",
      "كوب ماء"
    ],
    calories: 680,
    protein: 45,
    carbs: 52,
    fats: 18,
    nutritionInfo: {
      protein: "45غ بروتين كامل",
      carbs: "52غ كربوهيدرات للطاقة",
      fats: "18غ دهون متوازنة"
    }
  },
  afternoonSnack: {
    title: "سناك ما بعد التمرين",
    items: [
      "موزة متوسطة الحجم",
      "حفنة فول سوداني أو لوز",
      "كوب لبن أو عصير طبيعي",
      "تمرتان (اختياري)"
    ],
    calories: 320,
    protein: 8,
    carbs: 42,
    fats: 12,
    nutritionInfo: {
      protein: "8غ بروتين للتعافي",
      carbs: "42غ كربوهيدرات سريعة",
      fats: "12غ دهون طبيعية"
    }
  },
  dinner: {
    title: "العشاء الخفيف",
    items: [
      "طبق عدس بطحينة",
      "سلطة خضراء كبيرة",
      "خبز بلدي أو توست",
      "كوب لبن رائب",
      "خضروات ورقية"
    ],
    calories: 450,
    protein: 22,
    carbs: 48,
    fats: 15,
    nutritionInfo: {
      protein: "22غ بروتين نباتي",
      carbs: "48غ كربوهيدرات مفيدة",
      fats: "15غ دهون صحية"
    }
  },
  beforeSleep: {
    title: "قبل النوم",
    items: [
      "كوب حليب دافئ",
      "ملعقة عسل",
      "حبة جزر أو خيار (اختياري)"
    ],
    calories: 150,
    protein: 8,
    carbs: 18,
    fats: 4,
    nutritionInfo: {
      protein: "8غ بروتين بطيء",
      carbs: "18غ كربوهيدرات بسيطة",
      fats: "4غ دهون طبيعية"
    }
  },
  nutritionGuide: {
    title: "دليل التغذية - مرحلة التأسيس",
    items: [
      "إجمالي السعرات: 2400 سعرة حرارية",
      "البروتين: 119 غرام (20%)",
      "الكربوهيدرات: 227 غرام (38%)",
      "الدهون: 85 غرام (32%)",
      "شرب 8-10 أكواب ماء يومياً",
      "تجنب الأطعمة المصنعة والسكريات المضافة",
      "تناول الوجبات كل 3-4 ساعات"
    ],
    calories: 2400,
    protein: 119,
    carbs: 227,
    fats: 85
  },
  phase: "المرحلة الأولى",
  phaseGoal: "تعويد الجسم على النظام وبناء العادات الغذائية الصحية"
};

// المرحلة الثانية: التكثيف (أشهر 4-6)
const intensificationPhaseMeals: KhaledDailyMealPlan = {
  breakfast: {
    title: "إفطار التكثيف",
    items: [
      "4 بيضات (2 كاملة + 2 بياض)",
      "رغيف خبز بلدي + توست",
      "ملعقة كبيرة زيت زيتون",
      "جبن أبيض قليل الدسم",
      "طماطم وخيار",
      "كوب عصير برتقال طبيعي"
    ],
    calories: 620,
    protein: 32,
    carbs: 45,
    fats: 28,
    nutritionInfo: {
      protein: "32غ بروتين عالي الجودة",
      carbs: "45غ كربوهيدرات معقدة",
      fats: "28غ دهون صحية"
    }
  },
  morningSnack: {
    title: "سناك الصباح المكثف",
    items: [
      "كوب زبادي يوناني",
      "3 ملاعق كبيرة شوفان",
      "ملعقة عسل + ملعقة مربى طبيعية",
      "حفنة من اللوز والجوز",
      "موزة صغيرة"
    ],
    calories: 380,
    protein: 18,
    carbs: 42,
    fats: 14,
    nutritionInfo: {
      protein: "18غ بروتين من الزبادي",
      carbs: "42غ كربوهيدرات بطيئة",
      fats: "14غ دهون صحية"
    }
  },
  lunch: {
    title: "الغداء المكثف",
    items: [
      "صدر دجاج كامل مشوي",
      "كوب ونصف أرز بني",
      "خضار مشكلة (بروكلي، جزر، فاصوليا)",
      "سلطة كبيرة مع أفوكادو",
      "كوب عصير خضروات"
    ],
    calories: 780,
    protein: 52,
    carbs: 68,
    fats: 22,
    nutritionInfo: {
      protein: "52غ بروتين كامل",
      carbs: "68غ كربوهيدرات للطاقة",
      fats: "22غ دهون متوازنة"
    }
  },
  afternoonSnack: {
    title: "سناك ما بعد التمرين المكثف",
    items: [
      "موزة كبيرة + تفاحة",
      "200غ لبن رائب",
      "2 ملعقة كبيرة زبدة الفول السوداني",
      "حبة تمر محشوة لوز"
    ],
    calories: 420,
    protein: 15,
    carbs: 52,
    fats: 16,
    nutritionInfo: {
      protein: "15غ بروتين للتعافي",
      carbs: "52غ كربوهيدرات سريعة",
      fats: "16غ دهون طبيعية"
    }
  },
  dinner: {
    title: "العشاء المتوازن",
    items: [
      "سمك السلمون أو التونة (150غ)",
      "بطاطس مسلوقة أو مشوية",
      "سلطة خضراء مع زيت زيتون",
      "كوب لبن رائب",
      "خضروات ورقية متنوعة"
    ],
    calories: 520,
    protein: 28,
    carbs: 42,
    fats: 22,
    nutritionInfo: {
      protein: "28غ بروتين من السمك",
      carbs: "42غ كربوهيدرات مفيدة",
      fats: "22غ دهون أوميغا 3"
    }
  },
  beforeSleep: {
    title: "وجبة قبل النوم",
    items: [
      "جبن قريش (100غ)",
      "ملعقة عسل طبيعي",
      "حفنة من الجوز",
      "كوب حليب دافئ"
    ],
    calories: 280,
    protein: 18,
    carbs: 22,
    fats: 12,
    nutritionInfo: {
      protein: "18غ بروتين بطيء",
      carbs: "22غ كربوهيدرات بسيطة",
      fats: "12غ دهون طبيعية"
    }
  },
  nutritionGuide: {
    title: "دليل التغذية - مرحلة التكثيف",
    items: [
      "إجمالي السعرات: 3000 سعرة حرارية",
      "البروتين: 163 غرام (22%)",
      "الكربوهيدرات: 271 غرام (36%)",
      "الدهون: 114 غرام (34%)",
      "شرب 10-12 كوب ماء يومياً",
      "إضافة المكملات الطبيعية عند الحاجة",
      "زيادة حجم الوجبات تدريجياً",
      "استبدال الدجاج بالسمك مرتين أسبوعياً"
    ],
    calories: 3000,
    protein: 163,
    carbs: 271,
    fats: 114
  },
  phase: "المرحلة الثانية",
  phaseGoal: "زيادة السعرات تدريجياً وتحسين الأداء"
};

// المرحلة الثالثة: الذروة (أشهر 7-9)
const peakPhaseMeals: KhaledDailyMealPlan = {
  breakfast: {
    title: "إفطار الذروة",
    items: [
      "5 بيضات (3 كاملة + 2 بياض)",
      "2 رغيف خبز بلدي",
      "جبن شيدر أو جبن أبيض",
      "أفوكادو نصف حبة",
      "طماطم وخيار وفلفل",
      "كوب عصير برتقال + موز"
    ],
    calories: 750,
    protein: 38,
    carbs: 55,
    fats: 35,
    nutritionInfo: {
      protein: "38غ بروتين عالي الجودة",
      carbs: "55غ كربوهيدرات معقدة",
      fats: "35غ دهون صحية"
    }
  },
  morningSnack: {
    title: "سناك الذروة الصباحي",
    items: [
      "كوب زبادي يوناني كامل الدسم",
      "4 ملاعق كبيرة شوفان",
      "ملعقة عسل + ملعقة زبدة لوز",
      "حفنة مكسرات مشكلة",
      "موز + تفاح"
    ],
    calories: 480,
    protein: 22,
    carbs: 52,
    fats: 20,
    nutritionInfo: {
      protein: "22غ بروتين من الزبادي",
      carbs: "52غ كربوهيدرات بطيئة",
      fats: "20غ دهون صحية"
    }
  },
  lunch: {
    title: "غداء الذروة",
    items: [
      "لحم بقري مشوي (200غ)",
      "2 كوب أرز بني",
      "خضار مشكلة مع زيت زيتون",
      "سلطة كبيرة مع أفوكادو وجبن",
      "عصير خضروات طبيعي"
    ],
    calories: 920,
    protein: 58,
    carbs: 78,
    fats: 28,
    nutritionInfo: {
      protein: "58غ بروتين كامل",
      carbs: "78غ كربوهيدرات للطاقة",
      fats: "28غ دهون متوازنة"
    }
  },
  afternoonSnack: {
    title: "سناك الذروة بعد التمرين",
    items: [
      "2 موز + تفاحة",
      "250غ لبن رائب",
      "3 ملاعق كبيرة زبدة فول سوداني",
      "حبتان تمر محشو لوز",
      "كوب عصير طبيعي"
    ],
    calories: 580,
    protein: 20,
    carbs: 68,
    fats: 22,
    nutritionInfo: {
      protein: "20غ بروتين للتعافي",
      carbs: "68غ كربوهيدرات سريعة",
      fats: "22غ دهون طبيعية"
    }
  },
  dinner: {
    title: "عشاء الذروة",
    items: [
      "سمك السلمون المشوي (200غ)",
      "بطاطس حلوة مشوية",
      "خضروات ورقية مع زيت زيتون",
      "كوب لبن رائب كامل الدسم",
      "سلطة الكينوا (إذا متوفرة)"
    ],
    calories: 650,
    protein: 35,
    carbs: 52,
    fats: 28,
    nutritionInfo: {
      protein: "35غ بروتين من السمك",
      carbs: "52غ كربوهيدرات مفيدة",
      fats: "28غ دهون أوميغا 3"
    }
  },
  beforeSleep: {
    title: "وجبة قبل النوم للذروة",
    items: [
      "جبن قريش (150غ)",
      "ملعقة عسل + ملعقة زبدة لوز",
      "حفنة من الجوز واللوز",
      "كوب حليب كامل الدسم"
    ],
    calories: 380,
    protein: 25,
    carbs: 28,
    fats: 18,
    nutritionInfo: {
      protein: "25غ بروتين بطيء",
      carbs: "28غ كربوهيدرات بسيطة",
      fats: "18غ دهون طبيعية"
    }
  },
  nutritionGuide: {
    title: "دليل التغذية - مرحلة الذروة",
    items: [
      "إجمالي السعرات: 3760 سعرة حرارية",
      "البروتين: 198 غرام (21%)",
      "الكربوهيدرات: 333 غرام (35%)",
      "الدهون: 151 غرام (36%)",
      "شرب 12-15 كوب ماء يومياً",
      "التركيز على الأطعمة الكثيفة بالعناصر الغذائية",
      "زيادة البروتين والكربوهيدرات حول التمرين",
      "شراء الدجاج واللحوم بالجملة وتخزينها"
    ],
    calories: 3760,
    protein: 198,
    carbs: 333,
    fats: 151
  },
  phase: "المرحلة الثالثة",
  phaseGoal: "تحقيق أقصى نمو عضلي وأداء رياضي"
};

// المرحلة الرابعة: التثبيت (أشهر 10-12)
const stabilizationPhaseMeals: KhaledDailyMealPlan = {
  breakfast: {
    title: "إفطار التثبيت",
    items: [
      "4 بيض أومليت بالخضار",
      "رغيف خبز بلدي",
      "أفوكادو نصف حبة",
      "جبن أبيض قليل الدسم",
      "طماطم وخيار وفلفل أخضر",
      "كوب شاي أخضر أو قهوة"
    ],
    calories: 580,
    protein: 32,
    carbs: 38,
    fats: 28,
    nutritionInfo: {
      protein: "32غ بروتين عالي الجودة",
      carbs: "38غ كربوهيدرات معقدة",
      fats: "28غ دهون صحية"
    }
  },
  morningSnack: {
    title: "سناك التثبيت الصباحي",
    items: [
      "كوب زبادي يوناني",
      "3 ملاعق كبيرة شوفان",
      "ملعقة عسل",
      "حفنة من اللوز",
      "توت أو فراولة (حسب الموسم)"
    ],
    calories: 320,
    protein: 18,
    carbs: 35,
    fats: 12,
    nutritionInfo: {
      protein: "18غ بروتين من الزبادي",
      carbs: "35غ كربوهيدرات بطيئة",
      fats: "12غ دهون صحية"
    }
  },
  lunch: {
    title: "غداء التثبيت",
    items: [
      "صدر دجاج مشوي (180غ)",
      "كوب ونصف أرز بني",
      "خضار مشوية متنوعة",
      "سلطة خضراء كبيرة مع زيت زيتون",
      "كوب عصير خضروات"
    ],
    calories: 720,
    protein: 48,
    carbs: 62,
    fats: 22,
    nutritionInfo: {
      protein: "48غ بروتين كامل",
      carbs: "62غ كربوهيدرات للطاقة",
      fats: "22غ دهون متوازنة"
    }
  },
  afternoonSnack: {
    title: "سناك ما بعد التمرين",
    items: [
      "موز + تفاحة",
      "200غ لبن رائب",
      "2 ملعقة كبيرة زبدة لوز",
      "حبة تمر"
    ],
    calories: 380,
    protein: 15,
    carbs: 48,
    fats: 14,
    nutritionInfo: {
      protein: "15غ بروتين للتعافي",
      carbs: "48غ كربوهيدرات سريعة",
      fats: "14غ دهون طبيعية"
    }
  },
  dinner: {
    title: "عشاء التثبيت (خفيف)",
    items: [
      "سمك مشوي أو مسلوق (150غ)",
      "خضروات مشوية بدلاً من الأرز",
      "سلطة خضراء كبيرة",
      "كوب لبن رائب",
      "خضروات ورقية متنوعة"
    ],
    calories: 420,
    protein: 32,
    carbs: 25,
    fats: 18,
    nutritionInfo: {
      protein: "32غ بروتين من السمك",
      carbs: "25غ كربوهيدرات من الخضار",
      fats: "18غ دهون صحية"
    }
  },
  beforeSleep: {
    title: "وجبة قبل النوم الخفيفة",
    items: [
      "جبن قريش (100غ)",
      "ملعقة عسل",
      "حفنة صغيرة من الجوز",
      "كوب حليب منزوع الدسم"
    ],
    calories: 220,
    protein: 18,
    carbs: 20,
    fats: 8,
    nutritionInfo: {
      protein: "18غ بروتين بطيء",
      carbs: "20غ كربوهيدرات بسيطة",
      fats: "8غ دهون طبيعية"
    }
  },
  nutritionGuide: {
    title: "دليل التغذية - مرحلة التثبيت",
    items: [
      "إجمالي السعرات: 2640 سعرة حرارية",
      "البروتين: 163 غرام (25%)",
      "الكربوهيدرات: 228 غرام (35%)",
      "الدهون: 102 غرام (35%)",
      "شرب 10-12 كوب ماء يومياً",
      "تقليل الكربوهيدرات في المساء",
      "زيادة الدهون الصحية والأفوكادو",
      "الحفاظ على الكتلة العضلية المكتسبة"
    ],
    calories: 2640,
    protein: 163,
    carbs: 228,
    fats: 102
  },
  phase: "المرحلة الرابعة",
  phaseGoal: "الحفاظ على الكتلة العضلية وتحسين التعريف"
};

// بدائل الأكل السريع لخالد محمد
const fastFoodAlternatives = {
  shawarma: {
    original: "شاورما دجاج",
    healthy: "صدر دجاج مشوي + خبز بلدي + ثومية منزلية",
    calories: 650,
    protein: 42,
    carbs: 45,
    fats: 28
  },
  burger: {
    original: "برجر",
    healthy: "برجر منزلي (لحم مفروم قليل الدهن + خبز أسمر)",
    calories: 500,
    protein: 35,
    carbs: 40,
    fats: 22
  },
  pizza: {
    original: "بيتزا",
    healthy: "بيتزا منزلية (عجين رقيق + جبن قليل الدسم + خضار)",
    calories: 450,
    protein: 25,
    carbs: 48,
    fats: 18
  }
};

// نظام تناوب الوجبات للمرونة
const rotationSystem = {
  proteins: ["دجاج", "سمك", "بيض", "عدس", "لحم مفروم قليل الدهن", "تونة معلبة", "جبن قريش"],
  carbs: ["أرز بني", "أرز أبيض", "مكرونة", "بطاطس", "بطاطس حلوة", "خبز بلدي", "شوفان"],
  vegetables: ["سبانخ", "كوسة", "بامية", "جزر", "خيار", "بروكلي", "فاصوليا خضراء", "فلفل ألوان"],
  fats: ["زيت زيتون", "أفوكادو", "مكسرات", "زبدة لوز", "زبدة فول سوداني", "جبن طبيعي"]
};

// نصائح التوفير والتحضير المسبق
const savingTips = {
  seasonal: [
    "شراء الدجاج في مواسم التخفيضات",
    "شراء البيض بكميات كبيرة",
    "اختيار الخضروات الموسمية",
    "شراء الأرز والمكرونة بالجملة"
  ],
  prep: [
    "طبخ كميات كبيرة من الأرز وتجميدها",
    "تقطيع وتتبيل الدجاج مسبقاً",
    "تحضير السلطات لعدة أيام",
    "سلق البيض مسبقاً للأسبوع"
  ],
  waste: [
    "استخدام عظام الدجاج لصنع الشوربة",
    "تحويل الخضروات الذابلة لعصائر",
    "حفظ بقايا الطعام للوجبات التالية",
    "استخدام قشور الفواكه للعصائر الطبيعية"
  ]
};

// الحصول على خطة اليوم حسب المرحلة
export function getKhaledDailyMealPlan(phase: number = 1): KhaledDailyMealPlan {
  switch (phase) {
    case 1:
      return foundationPhaseMeals;
    case 2:
      return intensificationPhaseMeals;
    case 3:
      return peakPhaseMeals;
    case 4:
      return stabilizationPhaseMeals;
    default:
      return foundationPhaseMeals;
  }
}

// الحصول على خطة حسب الشهر (1-12)
export function getKhaledMealPlanByMonth(month: number): KhaledDailyMealPlan {
  if (month >= 1 && month <= 3) {
    return foundationPhaseMeals;
  } else if (month >= 4 && month <= 6) {
    return intensificationPhaseMeals;
  } else if (month >= 7 && month <= 9) {
    return peakPhaseMeals;
  } else {
    return stabilizationPhaseMeals;
  }
}

// الحصول على ملخص الوجبات
export function getKhaledMealSummary() {
  return {
    phases: [
      { phase: 1, name: "التأسيس", months: "1-3", calories: 2400 },
      { phase: 2, name: "التكثيف", months: "4-6", calories: 3000 },
      { phase: 3, name: "الذروة", months: "7-9", calories: 3760 },
      { phase: 4, name: "التثبيت", months: "10-12", calories: 2640 }
    ],
    fastFoodAlternatives,
    rotationSystem,
    savingTips
  };
}

// الحصول على بدائل الأكل السريع
export function getKhaledFastFoodAlternatives() {
  return fastFoodAlternatives;
}

// الحصول على نظام التناوب
export function getKhaledRotationSystem() {
  return rotationSystem;
}

export type { KhaledMealItem, KhaledDailyMealPlan };