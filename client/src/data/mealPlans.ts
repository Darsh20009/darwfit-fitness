interface MealItem {
  title: string;
  items: string[];
  nutritionInfo?: {
    protein?: string;
    carbs?: string;
    fats?: string;
  };
}

interface DailyMealPlan {
  breakfast: MealItem;
  morningSnack: MealItem;
  lunch: MealItem;
  afternoonSnack: MealItem;
  dinner: MealItem;
  beforeSleep: MealItem;
  nutritionGuide: MealItem;
}

const dailyMealPlan: DailyMealPlan = {
  breakfast: {
    title: "الإفطار",
    items: [
      "4 بياض بيض + 1 صفار بيض طبيعي",
      "رغيف خبز بلدي أسمر صغير أو شريحتين توست أسمر",
      "قطعة صغيرة جبنة قريش (50 جرام)",
      "كوب شاي بدون سكر أو قهوة سوداء بدون سكر"
    ],
    nutritionInfo: {
      protein: "30-35 جرام",
      carbs: "40-45 جرام",
      fats: "دهون خفيفة طبيعية"
    }
  },
  morningSnack: {
    title: "السناك الأول",
    items: [
      "10-12 حبة من اللوز أو الجوز أو الكاجو غير المحمص",
      "أو تفاحة صغيرة أو موزة متوسطة الحجم"
    ],
    nutritionInfo: {
      protein: "5-8 جرام",
      carbs: "15-20 جرام",
      fats: "دهون صحية طبيعية"
    }
  },
  lunch: {
    title: "الغداء",
    items: [
      "200 جرام صدور دجاج مشوية أو مسلوقة",
      "نصف كوب أرز بني أو رز أبيض مسلوق بدون دهون",
      "طبق متوسط سلطة خضراء مع رشة زيت زيتون وليمون"
    ],
    nutritionInfo: {
      protein: "45-55 جرام",
      carbs: "50-60 جرام",
      fats: "دهون صحية خفيفة"
    }
  },
  afternoonSnack: {
    title: "السناك الثاني",
    items: [
      "زبادي يوناني خالي الدسم",
      "أو كوب لبن خالي الدسم مع نصف موزة صغيرة"
    ],
    nutritionInfo: {
      protein: "10-15 جرام",
      carbs: "10-15 جرام"
    }
  },
  dinner: {
    title: "العشاء",
    items: [
      "علبة تونة لايت مصفاة من الزيت أو 150 جرام سمك مشوي",
      "طبق خضار مشوية أو مسلوقة (كوسة، بروكلي، فلفل ألوان)"
    ],
    nutritionInfo: {
      protein: "30-35 جرام",
      carbs: "10-15 جرام"
    }
  },
  beforeSleep: {
    title: "وجبة قبل النوم (اختيارية)",
    items: [
      "كوب لبن خالي الدسم",
      "أو قطعة صغيرة جبنة قريش (50-75 جرام)"
    ],
    nutritionInfo: {
      protein: "15-20 جرام"
    }
  },
  nutritionGuide: {
    title: "إرشادات غذائية مهمة",
    items: [
      "شرب 2.5 لتر ماء يومياً موزعة خلال اليوم",
      "الابتعاد تماماً عن السكريات والمشروبات الغازية والعصائر المصنعة",
      "الاعتماد على التوابل الطبيعية والليمون بدلاً من الصلصات",
      "وجبات السناك يمكن الاستغناء عنها عند عدم الشعور بالجوع"
    ]
  }
};

export function getDailyMealPlan(): DailyMealPlan {
  return dailyMealPlan;
}

export function getMealSummary() {
  return [
    { meal: "الإفطار", description: "4 بياض بيض + صفار، خبز أسمر، جبنة قريش" },
    { meal: "الغداء", description: "200 جم دجاج مشوي، أرز بني، سلطة خضراء" },
    { meal: "العشاء", description: "تونة لايت أو سمك مشوي، خضار مشوية" }
  ];
}