// قوالب مختلفة للخطط المجانية
export interface MealTemplate {
  breakfast: {
    title: string;
    items: string[];
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };
  snack1: {
    title: string;
    items: string[];
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };
  lunch: {
    title: string;
    items: string[];
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };
  snack2: {
    title: string;
    items: string[];
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };
  dinner: {
    title: string;
    items: string[];
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };
}

export interface WorkoutTemplate {
  day: number;
  title: string;
  type: string;
  duration: string;
  exercises: {
    warmup: {
      name: string;
      duration: string;
    }[];
    main: {
      name: string;
      sets: number;
      reps: string;
      rest: string;
      description?: string;
    }[];
    cooldown: {
      name: string;
      duration: string;
    }[];
  };
}

// قالب كلاسيكي - متوازن
export const classicTemplate = {
  name: "الخطة الكلاسيكية المتوازنة",
  description: "خطة متوازنة تركز على الصحة العامة واللياقة",
  mealPlan: {
    breakfast: {
      title: "فطار صحي متوازن",
      items: ["شوفان بالحليب والعسل", "موز مقطع", "لوز محمص", "شاي أخضر"],
      calories: 450,
      protein: 15,
      carbs: 65,
      fats: 12
    },
    snack1: {
      title: "وجبة خفيفة صباحية",
      items: ["تفاحة متوسطة", "ملعقة كبيرة زبدة لوز"],
      calories: 200,
      protein: 4,
      carbs: 25,
      fats: 9
    },
    lunch: {
      title: "غداء متكامل",
      items: ["صدر دجاج مشوي 150 جرام", "أرز بني كوب", "سلطة خضار مشكلة", "زيت زيتون ملعقة"],
      calories: 550,
      protein: 35,
      carbs: 45,
      fats: 15
    },
    snack2: {
      title: "وجبة بعد الظهر",
      items: ["زبادي يوناني", "حفنة من التوت", "عسل ملعقة صغيرة"],
      calories: 180,
      protein: 12,
      carbs: 20,
      fats: 5
    },
    dinner: {
      title: "عشاء خفيف",
      items: ["سمك السلمون المشوي 120 جرام", "خضار مشوية", "كينوا نصف كوب"],
      calories: 480,
      protein: 30,
      carbs: 30,
      fats: 20
    }
  },
  workoutPlan: [
    {
      day: 1,
      title: "تمارين الجزء العلوي",
      type: "قوة",
      duration: "45 دقيقة",
      exercises: {
        warmup: [
          { name: "المشي في المكان", duration: "5 دقائق" },
          { name: "تحريك الذراعين دائرياً", duration: "2 دقيقة" }
        ],
        main: [
          { name: "تمرين الضغط", sets: 3, reps: "10-15", rest: "60 ثانية" },
          { name: "تمرين العقلة (أو المساعدة)", sets: 3, reps: "5-10", rest: "90 ثانية" },
          { name: "تمرين الديبس على الكرسي", sets: 3, reps: "8-12", rest: "60 ثانية" },
          { name: "تمرين البلانك", sets: 3, reps: "30-60 ثانية", rest: "60 ثانية" }
        ],
        cooldown: [
          { name: "شد عضلات الصدر", duration: "2 دقيقة" },
          { name: "شد عضلات الذراعين", duration: "3 دقائق" }
        ]
      }
    },
    {
      day: 2,
      title: "تمارين كارديو خفيفة",
      type: "كارديو",
      duration: "30 دقيقة",
      exercises: {
        warmup: [
          { name: "المشي البطيء", duration: "5 دقائق" }
        ],
        main: [
          { name: "المشي السريع", sets: 1, reps: "20 دقيقة", rest: "حسب الحاجة" },
          { name: "صعود ونزول الدرج", sets: 3, reps: "2 دقيقة", rest: "1 دقيقة" }
        ],
        cooldown: [
          { name: "المشي البطيء", duration: "5 دقائق" }
        ]
      }
    }
  ]
};

// قالب مكثف - للمتقدمين
export const intensiveTemplate = {
  name: "الخطة المكثفة للمتقدمين",
  description: "خطة مكثفة للحصول على نتائج سريعة",
  mealPlan: {
    breakfast: {
      title: "فطار عالي البروتين",
      items: ["4 بيضات مسلوقة", "خبز حبوب كاملة شريحتين", "أفوكادو نصف حبة", "قهوة سوداء"],
      calories: 520,
      protein: 28,
      carbs: 30,
      fats: 25
    },
    snack1: {
      title: "بروتين شيك",
      items: ["بروتين باودر سكوب", "حليب لوز كوب", "موز نصف حبة"],
      calories: 250,
      protein: 25,
      carbs: 20,
      fats: 3
    },
    lunch: {
      title: "غداء عالي البروتين",
      items: ["ستيك لحم 200 جرام", "بطاطا حلوة مشوية", "بروكلي مطبوخ", "زيت زيتون"],
      calories: 650,
      protein: 45,
      carbs: 35,
      fats: 25
    },
    snack2: {
      title: "وجبة ما بعد التمرين",
      items: ["تونة علبة", "كراكرز حبوب كاملة", "خيار مقطع"],
      calories: 220,
      protein: 25,
      carbs: 15,
      fats: 6
    },
    dinner: {
      title: "عشاء خفيف عالي البروتين",
      items: ["صدر ديك رومي 150 جرام", "سلطة خضراء كبيرة", "جبن قريش 100 جرام"],
      calories: 380,
      protein: 40,
      carbs: 10,
      fats: 15
    }
  },
  workoutPlan: [
    {
      day: 1,
      title: "تدريب الساقين المكثف",
      type: "قوة مكثفة",
      duration: "60 دقيقة",
      exercises: {
        warmup: [
          { name: "الجري في المكان", duration: "5 دقائق" },
          { name: "إحماء المفاصل", duration: "5 دقائق" }
        ],
        main: [
          { name: "السكوات", sets: 4, reps: "15-20", rest: "90 ثانية" },
          { name: "اللانج", sets: 4, reps: "12-15 لكل ساق", rest: "90 ثانية" },
          { name: "الديدليفت بساق واحدة", sets: 3, reps: "10-12 لكل ساق", rest: "90 ثانية" },
          { name: "جمب سكوات", sets: 3, reps: "15-20", rest: "60 ثانية" },
          { name: "وول سيت", sets: 3, reps: "45-60 ثانية", rest: "60 ثانية" }
        ],
        cooldown: [
          { name: "شد عضلات الساقين", duration: "10 دقائق" }
        ]
      }
    },
    {
      day: 2,
      title: "هيت كارديو",
      type: "هيت",
      duration: "25 دقيقة",
      exercises: {
        warmup: [
          { name: "المشي السريع", duration: "5 دقائق" }
        ],
        main: [
          { name: "بيربي", sets: 4, reps: "30 ثانية", rest: "30 ثانية" },
          { name: "جمبنج جاكس", sets: 4, reps: "30 ثانية", rest: "30 ثانية" },
          { name: "ماونتن كلايمرز", sets: 4, reps: "30 ثانية", rest: "30 ثانية" },
          { name: "هاي نيز", sets: 4, reps: "30 ثانية", rest: "30 ثانية" }
        ],
        cooldown: [
          { name: "مشي بطيء وتنفس عميق", duration: "5 دقائق" }
        ]
      }
    }
  ]
};

// قالب للمبتدئين
export const beginnerTemplate = {
  name: "خطة المبتدئين الودودة",
  description: "خطة مناسبة للمبتدئين مع تمارين سهلة",
  mealPlan: {
    breakfast: {
      title: "فطار بسيط ومغذي",
      items: ["شوفان بالحليب", "عسل ملعقة", "موز مقطع", "مكسرات مشكلة"],
      calories: 380,
      protein: 12,
      carbs: 55,
      fats: 11
    },
    snack1: {
      title: "سناك خفيف",
      items: ["تفاحة", "زبدة فول سوداني ملعقة"],
      calories: 180,
      protein: 4,
      carbs: 20,
      fats: 8
    },
    lunch: {
      title: "غداء متوازن",
      items: ["دجاج مشوي 120 جرام", "أرز أبيض نصف كوب", "خضار مطبوخة", "سلطة صغيرة"],
      calories: 480,
      protein: 30,
      carbs: 40,
      fats: 12
    },
    snack2: {
      title: "وجبة بعد الظهر",
      items: ["زبادي طبيعي", "عسل ملعقة صغيرة", "قرفة رشة"],
      calories: 150,
      protein: 8,
      carbs: 18,
      fats: 4
    },
    dinner: {
      title: "عشاء خفيف",
      items: ["سمك أبيض مشوي 100 جرام", "خضار على البخار", "خبز أسمر شريحة"],
      calories: 350,
      protein: 25,
      carbs: 25,
      fats: 12
    }
  },
  workoutPlan: [
    {
      day: 1,
      title: "تمارين بسيطة للجسم كامل",
      type: "مبتدئين",
      duration: "20 دقيقة",
      exercises: {
        warmup: [
          { name: "المشي في المكان", duration: "3 دقائق" },
          { name: "تحريك المفاصل", duration: "2 دقيقة" }
        ],
        main: [
          { name: "مارش في المكان", sets: 2, reps: "1 دقيقة", rest: "30 ثانية" },
          { name: "ضغط على الحائط", sets: 2, reps: "8-10", rest: "60 ثانية" },
          { name: "سكوات بمساعدة الكرسي", sets: 2, reps: "8-10", rest: "60 ثانية" },
          { name: "رفع الذراعين جانباً", sets: 2, reps: "10-12", rest: "30 ثانية" }
        ],
        cooldown: [
          { name: "مشي بطيء", duration: "3 دقائق" },
          { name: "شد بسيط", duration: "2 دقيقة" }
        ]
      }
    },
    {
      day: 2,
      title: "راحة نشطة",
      type: "راحة",
      duration: "15 دقيقة",
      exercises: {
        warmup: [
          { name: "مشي بطيء", duration: "5 دقائق" }
        ],
        main: [
          { name: "شد عضلات الجسم", sets: 1, reps: "5 دقائق", rest: "حسب الحاجة" }
        ],
        cooldown: [
          { name: "تنفس عميق وراحة", duration: "5 دقائق" }
        ]
      }
    }
  ]
};

// قالب للنساء
export const femaleTemplate = {
  name: "خطة مخصصة للنساء",
  description: "خطة مصممة خصيصاً لاحتياجات المرأة",
  mealPlan: {
    breakfast: {
      title: "فطار صحي للمرأة",
      items: ["أفوكادو توست", "بيضة مسلوقة", "طماطم كرزية", "شاي أخضر بالنعناع"],
      calories: 420,
      protein: 16,
      carbs: 32,
      fats: 22
    },
    snack1: {
      title: "سموذي فواكه",
      items: ["توت مشكل", "موز نصف حبة", "زبادي يوناني", "بذور شيا"],
      calories: 220,
      protein: 12,
      carbs: 28,
      fats: 6
    },
    lunch: {
      title: "سلطة البروتين",
      items: ["خضار ورقية مشكلة", "دجاج مشوي 100 جرام", "كينوا ربع كوب", "مكسرات", "زيت زيتون"],
      calories: 500,
      protein: 28,
      carbs: 35,
      fats: 20
    },
    snack2: {
      title: "وجبة خفيفة صحية",
      items: ["حمص محضر منزلياً", "خضار مقطعة للتغميس", "ماء بالليمون"],
      calories: 160,
      protein: 6,
      carbs: 20,
      fats: 6
    },
    dinner: {
      title: "عشاء متوازن",
      items: ["سمك السلمون 120 جرام", "أرز بني ثلث كوب", "بروكلي مطبوخ", "سلطة خيار ولبن"],
      calories: 450,
      protein: 32,
      carbs: 28,
      fats: 18
    }
  },
  workoutPlan: [
    {
      day: 1,
      title: "تونينج الجسم",
      type: "تونينج",
      duration: "35 دقيقة",
      exercises: {
        warmup: [
          { name: "مشي سريع", duration: "5 دقائق" },
          { name: "حركات ديناميكية", duration: "3 دقائق" }
        ],
        main: [
          { name: "سكوات مع رفع الذراعين", sets: 3, reps: "12-15", rest: "45 ثانية" },
          { name: "لانج جانبي", sets: 3, reps: "10-12 لكل جانب", rest: "45 ثانية" },
          { name: "ضغط معدل (على الركبتين)", sets: 3, reps: "8-12", rest: "60 ثانية" },
          { name: "بلانك", sets: 3, reps: "20-40 ثانية", rest: "45 ثانية" },
          { name: "جسر الورك", sets: 3, reps: "12-15", rest: "45 ثانية" }
        ],
        cooldown: [
          { name: "شد الجسم بالكامل", duration: "8 دقائق" }
        ]
      }
    },
    {
      day: 2,
      title: "يوجا ومرونة",
      type: "مرونة",
      duration: "30 دقيقة",
      exercises: {
        warmup: [
          { name: "تنفس عميق", duration: "3 دقائق" }
        ],
        main: [
          { name: "وضعيات يوجا أساسية", sets: 1, reps: "20 دقيقة", rest: "حسب الحاجة" }
        ],
        cooldown: [
          { name: "استرخاء وتأمل", duration: "7 دقائق" }
        ]
      }
    }
  ]
};

// دالة لاختيار القالب المناسب بناءً على البيانات
export function selectTemplate(userData: any): any {
  const { gender, experienceLevel, goal, age } = userData;
  
  // خوارزمية ذكية لاختيار القالب
  if (gender === "female") {
    return femaleTemplate;
  }
  
  if (experienceLevel === "beginner" || age < 25) {
    return beginnerTemplate;
  }
  
  if (experienceLevel === "advanced" && (goal === "build_muscle" || goal === "lose_weight")) {
    return intensiveTemplate;
  }
  
  // القالب الافتراضي
  return classicTemplate;
}

// دالة لحساب السعرات حسب البيانات
export function calculateCalories(userData: any): { daily: number; macros: { protein: number; carbs: number; fats: number } } {
  const { weight, height, age, gender, activityLevel, goal } = userData;
  
  // حساب BMR باستخدام معادلة Harris-Benedict
  let bmr: number;
  if (gender === "male") {
    bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  } else {
    bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
  }
  
  // مضاعف النشاط
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9
  };
  
  let tdee = bmr * activityMultipliers[activityLevel as keyof typeof activityMultipliers];
  
  // تعديل حسب الهدف
  switch (goal) {
    case "lose_weight":
      tdee -= 500; // نقص 500 سعرة للتنحيف
      break;
    case "gain_weight":
    case "build_muscle":
      tdee += 300; // زيادة 300 سعرة لزيادة الوزن
      break;
    default:
      // محافظة على الوزن
      break;
  }
  
  // حساب الماكروز
  const protein = Math.round((tdee * 0.25) / 4); // 25% بروتين
  const fats = Math.round((tdee * 0.25) / 9); // 25% دهون
  const carbs = Math.round((tdee * 0.5) / 4); // 50% كربوهيدرات
  
  return {
    daily: Math.round(tdee),
    macros: { protein, carbs, fats }
  };
}

// دالة لتخصيص الخطة حسب البيانات
export function customizePlan(template: any, userData: any, calories: any): any {
  const customizedPlan = JSON.parse(JSON.stringify(template)); // نسخ عميق
  
  // تخصيص الوجبات حسب السعرات
  const mealCalorieRatio = calories.daily / 1860; // 1860 هو إجمالي السعرات في القالب الأساسي
  
  Object.keys(customizedPlan.mealPlan).forEach(mealKey => {
    const meal = customizedPlan.mealPlan[mealKey];
    meal.calories = Math.round(meal.calories * mealCalorieRatio);
    meal.protein = Math.round(meal.protein * mealCalorieRatio);
    meal.carbs = Math.round(meal.carbs * mealCalorieRatio);
    meal.fats = Math.round(meal.fats * mealCalorieRatio);
  });
  
  // تخصيص التمارين حسب المستوى
  if (userData.experienceLevel === "beginner") {
    customizedPlan.workoutPlan.forEach((workout: any) => {
      workout.exercises.main.forEach((exercise: any) => {
        if (exercise.sets > 2) exercise.sets = 2;
        if (exercise.reps.includes("-")) {
          const [min, max] = exercise.reps.split("-");
          exercise.reps = `${min}-${Math.min(parseInt(max), parseInt(min) + 5)}`;
        }
      });
    });
  }
  
  return customizedPlan;
}