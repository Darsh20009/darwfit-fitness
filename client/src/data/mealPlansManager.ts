import { MealPlan } from './mealPlans';

// خطة غذائية لانقاص الوزن
const weightLossPlan: MealPlan = {
  breakfast: [
    { name: "شوفان بالفواكه", calories: 250, protein: 8, carbs: 45 },
    { name: "بيضتين مسلوقتين", calories: 140, protein: 12, carbs: 1 },
    { name: "شاي أخضر", calories: 0, protein: 0, carbs: 0 }
  ],
  lunch: [
    { name: "سلطة خضراء كبيرة", calories: 150, protein: 3, carbs: 15 },
    { name: "صدر دجاج مشوي (150جم)", calories: 250, protein: 45, carbs: 0 },
    { name: "أرز بني (نصف كوب)", calories: 110, protein: 3, carbs: 22 }
  ],
  dinner: [
    { name: "سلطة خيار وطماطم", calories: 50, protein: 2, carbs: 8 },
    { name: "سمك مشوي (120جم)", calories: 200, protein: 35, carbs: 0 },
    { name: "خضار مطبوخة", calories: 80, protein: 3, carbs: 15 }
  ],
  snacks: [
    { name: "تفاحة متوسطة", calories: 80, protein: 0, carbs: 21 },
    { name: "حفنة لوز (10 حبات)", calories: 70, protein: 3, carbs: 2 }
  ]
};

// خطة غذائية لبناء العضلات
const muscleGainPlan: MealPlan = {
  breakfast: [
    { name: "3 بيضات كاملة + 2 بياض بيض", calories: 280, protein: 24, carbs: 2 },
    { name: "شوفان بالحليب والموز", calories: 320, protein: 12, carbs: 55 },
    { name: "عصير برتقال طبيعي", calories: 110, protein: 2, carbs: 25 }
  ],
  lunch: [
    { name: "أرز أبيض (كوب)", calories: 220, protein: 4, carbs: 45 },
    { name: "لحم أحمر مشوي (200جم)", calories: 400, protein: 50, carbs: 0 },
    { name: "سلطة خضار متنوعة", calories: 100, protein: 3, carbs: 12 },
    { name: "خبز أسمر (شريحتين)", calories: 160, protein: 6, carbs: 30 }
  ],
  dinner: [
    { name: "سلمون مشوي (180جم)", calories: 350, protein: 45, carbs: 0 },
    { name: "بطاطا حلوة مشوية", calories: 180, protein: 4, carbs: 40 },
    { name: "خضار مشكلة", calories: 120, protein: 4, carbs: 20 }
  ],
  snacks: [
    { name: "بروتين شيك", calories: 250, protein: 30, carbs: 15 },
    { name: "موز + زبدة فول سوداني", calories: 280, protein: 8, carbs: 35 },
    { name: "جبن قريش (كوب)", calories: 220, protein: 25, carbs: 8 }
  ]
};

// خطة غذائية صحية متوازنة
const healthyLifestylePlan: MealPlan = {
  breakfast: [
    { name: "توست أسمر بالأفوكادو", calories: 200, protein: 6, carbs: 25 },
    { name: "بيضة مسلوقة", calories: 70, protein: 6, carbs: 1 },
    { name: "قهوة بدون سكر", calories: 5, protein: 0, carbs: 1 }
  ],
  lunch: [
    { name: "سلطة كينوا بالخضار", calories: 180, protein: 8, carbs: 30 },
    { name: "دجاج مشوي (120جم)", calories: 200, protein: 35, carbs: 0 },
    { name: "حمص مسلوق", calories: 130, protein: 7, carbs: 20 }
  ],
  dinner: [
    { name: "شوربة خضار", calories: 80, protein: 3, carbs: 15 },
    { name: "سمك مشوي (100جم)", calories: 150, protein: 25, carbs: 0 },
    { name: "سلطة خضراء", calories: 60, protein: 2, carbs: 10 }
  ],
  snacks: [
    { name: "زبادي يوناني قليل الدسم", calories: 100, protein: 15, carbs: 8 },
    { name: "حفنة جوز", calories: 90, protein: 2, carbs: 3 }
  ]
};

// خطة غذائية نباتية
const vegetarianPlan: MealPlan = {
  breakfast: [
    { name: "عصيدة الشوفان بالفواكه المجففة", calories: 280, protein: 8, carbs: 50 },
    { name: "حليب اللوز", calories: 60, protein: 1, carbs: 8 },
    { name: "ملعقة بذور الشيا", calories: 60, protein: 2, carbs: 5 }
  ],
  lunch: [
    { name: "سلطة عدس أحمر", calories: 200, protein: 12, carbs: 30 },
    { name: "خبز الحبوب الكاملة", calories: 140, protein: 5, carbs: 28 },
    { name: "حمص بالطحينة", calories: 180, protein: 8, carbs: 15 }
  ],
  dinner: [
    { name: "كاري الخضار", calories: 220, protein: 8, carbs: 35 },
    { name: "أرز بني", calories: 110, protein: 3, carbs: 22 },
    { name: "سلطة خضراء", calories: 50, protein: 2, carbs: 8 }
  ],
  snacks: [
    { name: "فواكه مشكلة", calories: 120, protein: 1, carbs: 30 },
    { name: "مكسرات مشكلة", calories: 150, protein: 5, carbs: 6 }
  ]
};

// مدير خطط الوجبات
export const MEAL_PLANS = {
  "weight_loss_plan": weightLossPlan,
  "muscle_gain_plan": muscleGainPlan,
  "healthy_lifestyle_plan": healthyLifestylePlan,
  "vegetarian_plan": vegetarianPlan
};

export function getMealPlan(planId: string): MealPlan {
  return MEAL_PLANS[planId as keyof typeof MEAL_PLANS] || weightLossPlan;
}

export function getMealSummaryForPlan(planId: string): { name: string; description: string }[] {
  const plan = getMealPlan(planId);
  const summary: { name: string; description: string }[] = [];

  // إضافة الوجبات الرئيسية
  plan.breakfast.forEach(meal => {
    summary.push({
      name: meal.name,
      description: `${meal.calories} سعرة حرارية - البروتين: ${meal.protein}جم`
    });
  });

  plan.lunch.forEach(meal => {
    summary.push({
      name: meal.name,
      description: `${meal.calories} سعرة حرارية - البروتين: ${meal.protein}جم`
    });
  });

  plan.dinner.forEach(meal => {
    summary.push({
      name: meal.name,
      description: `${meal.calories} سعرة حرارية - البروتين: ${meal.protein}جم`
    });
  });

  return summary;
}