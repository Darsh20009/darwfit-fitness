interface MealItem {
  title: string;
  items: string[];
}

interface DailyMealPlan {
  breakfast: MealItem;
  morningSnack: MealItem;
  lunch: MealItem;
  afternoonSnack: MealItem;
  dinner: MealItem;
  nutritionGuide: MealItem;
}

// The meal plan is the same for all days as specified in the requirements
const dailyMealPlan: DailyMealPlan = {
  breakfast: {
    title: "الإفطار",
    items: [
      "4 بياض بيض مع صفار واحد فقط",
      "رغيف خبز أسمر صغير الحجم",
      "كوب شاي بدون سكر أو قهوة سوداء بدون سكر حسب الرغبة",
      "لو شعر بالجوع الزائد يمكنه إضافة نصف حبة خيار أو خس بجانب الإفطار"
    ]
  },
  morningSnack: {
    title: "السناك الأول",
    items: [
      "10 حبات لوز أو فستق",
      "أو يمكنه تناول تفاحة صغيرة بدلاً من المكسرات لو أراد تنويعاً"
    ]
  },
  lunch: {
    title: "الغداء",
    items: [
      "200 جرام من صدور الدجاج المشوية أو المسلوقة",
      "بجانب الدجاج، نصف كوب من الأرز البني أو حبة بطاطا صغيرة مسلوقة أو مشوية بدون زيوت",
      "طبق سلطة خضراء يتكون من خس، خيار، جزر مبشور، وطماطم بدون صلصات دسمة، فقط رشة صغيرة من زيت الزيتون والليمون"
    ]
  },
  afternoonSnack: {
    title: "السناك الثاني",
    items: [
      "زبادي يوناني خالي الدسم",
      "أو تناول تفاحة صغيرة أو موزة صغيرة حسب المتاح"
    ]
  },
  dinner: {
    title: "العشاء",
    items: [
      "تونة لايت بدون زيت (مصفاة جيداً من الماء)، أو بديل عنها 150 جرام من السمك المشوي",
      "بجانب العشاء طبق من الخضار المسلوقة أو المشوية مثل الكوسة أو البروكلي أو الجزر أو الخس"
    ]
  },
  nutritionGuide: {
    title: "تعليمات هامة",
    items: [
      "ممنوع تماماً: السكر الصناعي، المشروبات الغازية، العصائر الصناعية",
      "شرب 2.5 لتر ماء يومياً على الأقل",
      "استخدام الملح بشكل خفيف جداً",
      "الابتعاد عن الأطعمة المقلية والمعلبات والدهون العالية"
    ]
  }
};

// Function to get daily meal plan - same for all days
export function getDailyMealPlan(): DailyMealPlan {
  return dailyMealPlan;
}

// Function to get meal summary for dashboard
export function getMealSummary() {
  return [
    { meal: "الإفطار", description: "4 بياض بيض مع صفار واحد، رغيف خبز أسمر" },
    { meal: "الغداء", description: "200 جم صدور دجاج مشوية، أرز بني، سلطة خضراء" },
    { meal: "العشاء", description: "تونة لايت، خضروات مسلوقة" }
  ];
}
