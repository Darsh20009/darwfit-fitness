
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
      items: ["شوفان بالحليب والعسل", "موز مقطع", "لوز محمص", "شاي أخضر", "ملعقة زبدة لوز"],
      calories: 480,
      protein: 18,
      carbs: 68,
      fats: 15
    },
    snack1: {
      title: "وجبة خفيفة صباحية",
      items: ["تفاحة متوسطة", "ملعقة كبيرة زبدة لوز", "كوب ماء بالليمون"],
      calories: 220,
      protein: 6,
      carbs: 28,
      fats: 10
    },
    lunch: {
      title: "غداء متكامل",
      items: ["صدر دجاج مشوي 180 جرام", "أرز بني كوب", "سلطة خضار مشكلة", "زيت زيتون ملعقة", "طحينة ملعقة صغيرة"],
      calories: 620,
      protein: 42,
      carbs: 52,
      fats: 18
    },
    snack2: {
      title: "وجبة بعد الظهر",
      items: ["زبادي يوناني", "حفنة من التوت", "عسل ملعقة صغيرة", "جوز مقطع"],
      calories: 210,
      protein: 15,
      carbs: 22,
      fats: 8
    },
    dinner: {
      title: "عشاء خفيف",
      items: ["سمك السلمون المشوي 140 جرام", "خضار مشوية متنوعة", "كينوا نصف كوب", "أفوكادو ربع حبة"],
      calories: 530,
      protein: 35,
      carbs: 32,
      fats: 25
    }
  },
  workoutPlan: [
    {
      day: 1,
      title: "تمارين الجزء العلوي - القوة",
      type: "قوة",
      duration: "50 دقيقة",
      exercises: {
        warmup: [
          { name: "المشي في المكان", duration: "5 دقائق" },
          { name: "تحريك الذراعين دائرياً", duration: "3 دقائق" },
          { name: "شد عضلات الصدر والكتفين", duration: "2 دقيقة" }
        ],
        main: [
          { name: "تمرين الضغط التقليدي", sets: 4, reps: "12-18", rest: "60 ثانية", description: "اهتم بالوضعية الصحيحة" },
          { name: "تمرين الضغط المرتفع (على كرسي)", sets: 3, reps: "10-15", rest: "60 ثانية" },
          { name: "تمرين العقلة أو المساعدة", sets: 4, reps: "6-12", rest: "90 ثانية" },
          { name: "تمرين الديبس على الكرسي", sets: 3, reps: "10-15", rest: "60 ثانية" },
          { name: "تمرين البلانك", sets: 3, reps: "45-90 ثانية", rest: "60 ثانية" },
          { name: "تمرين رفع الذراعين جانبياً", sets: 3, reps: "15-20", rest: "45 ثانية" },
          { name: "تمرين لف الجذع", sets: 3, reps: "20 لكل جانب", rest: "45 ثانية" }
        ],
        cooldown: [
          { name: "شد عضلات الصدر", duration: "3 دقائق" },
          { name: "شد عضلات الذراعين", duration: "3 دقائق" },
          { name: "تنفس عميق واسترخاء", duration: "2 دقيقة" }
        ]
      }
    },
    {
      day: 2,
      title: "تمارين كارديو متوسطة",
      type: "كارديو",
      duration: "35 دقيقة",
      exercises: {
        warmup: [
          { name: "المشي البطيء", duration: "5 دقائق" },
          { name: "تحريك المفاصل", duration: "3 دقائق" }
        ],
        main: [
          { name: "المشي السريع", sets: 1, reps: "15 دقيقة", rest: "حسب الحاجة" },
          { name: "صعود ونزول الدرج", sets: 4, reps: "3 دقائق", rest: "90 ثانية" },
          { name: "جمبنج جاكس", sets: 3, reps: "30 ثانية", rest: "60 ثانية" },
          { name: "الجري في المكان", sets: 3, reps: "45 ثانية", rest: "60 ثانية" }
        ],
        cooldown: [
          { name: "المشي البطيء", duration: "5 دقائق" },
          { name: "شد عضلات الساقين", duration: "3 دقائق" }
        ]
      }
    },
    {
      day: 3,
      title: "تمارين الجزء السفلي",
      type: "قوة",
      duration: "45 دقيقة",
      exercises: {
        warmup: [
          { name: "المشي في المكان", duration: "5 دقائق" },
          { name: "تحريك الوركين والركب", duration: "3 دقائق" }
        ],
        main: [
          { name: "السكوات الكلاسيكي", sets: 4, reps: "15-20", rest: "75 ثانية" },
          { name: "اللانج الأمامي", sets: 3, reps: "12-15 لكل ساق", rest: "60 ثانية" },
          { name: "رفع الساق من الخلف", sets: 3, reps: "15-20 لكل ساق", rest: "45 ثانية" },
          { name: "جسر الورك", sets: 4, reps: "15-25", rest: "60 ثانية" },
          { name: "رفع الساق جانبياً", sets: 3, reps: "12-18 لكل ساق", rest: "45 ثانية" },
          { name: "رفع أصابع القدم", sets: 3, reps: "20-30", rest: "45 ثانية" }
        ],
        cooldown: [
          { name: "شد عضلات الساقين", duration: "5 دقائق" },
          { name: "شد عضلات الوركين", duration: "3 دقائق" }
        ]
      }
    }
  ]
};

// قالب مكثف - للمتقدمين
export const intensiveTemplate = {
  name: "الخطة المكثفة للمتقدمين",
  description: "خطة مكثفة للحصول على نتائج سريعة وبناء القوة",
  mealPlan: {
    breakfast: {
      title: "فطار عالي البروتين",
      items: ["5 بيضات (3 كاملة + 2 بياض)", "خبز حبوب كاملة شريحتين", "أفوكادو نصف حبة", "قهوة سوداء", "طماطم شرائح"],
      calories: 580,
      protein: 32,
      carbs: 35,
      fats: 28
    },
    snack1: {
      title: "بروتين شيك مكثف",
      items: ["بروتين باودر سكوب ونصف", "حليب لوز كوب", "موز كامل", "زبدة فول سوداني ملعقة", "شوفان ملعقتين"],
      calories: 380,
      protein: 35,
      carbs: 35,
      fats: 12
    },
    lunch: {
      title: "غداء عالي البروتين",
      items: ["ستيك لحم 220 جرام", "بطاطا حلوة مشوية متوسطة", "بروكلي مطبوخ كوب", "زيت زيتون ملعقة", "سلطة خضراء"],
      calories: 720,
      protein: 50,
      carbs: 42,
      fats: 28
    },
    snack2: {
      title: "وجبة ما بعد التمرين",
      items: ["تونة علبتين", "كراكرز حبوب كاملة", "خيار مقطع", "جبن قريش 50 جرام", "زيتون 5 حبات"],
      calories: 320,
      protein: 35,
      carbs: 20,
      fats: 12
    },
    dinner: {
      title: "عشاء عالي البروتين",
      items: ["صدر ديك رومي 180 جرام", "سلطة خضراء كبيرة", "جبن قريش 100 جرام", "زيت زيتون ملعقة", "خضار مشوية"],
      calories: 450,
      protein: 45,
      carbs: 15,
      fats: 20
    }
  },
  workoutPlan: [
    {
      day: 1,
      title: "تدريب الساقين المكثف",
      type: "قوة مكثفة",
      duration: "65 دقيقة",
      exercises: {
        warmup: [
          { name: "الجري في المكان", duration: "7 دقائق" },
          { name: "إحماء المفاصل الديناميكي", duration: "5 دقائق" },
          { name: "سكوات بوزن الجسم", duration: "3 دقائق" }
        ],
        main: [
          { name: "السكوات العميق", sets: 5, reps: "18-25", rest: "90 ثانية" },
          { name: "اللانج المتقدم", sets: 4, reps: "15-20 لكل ساق", rest: "90 ثانية" },
          { name: "الديدليفت بساق واحدة", sets: 4, reps: "12-15 لكل ساق", rest: "90 ثانية" },
          { name: "جمب سكوات", sets: 4, reps: "20-25", rest: "75 ثانية" },
          { name: "وول سيت", sets: 4, reps: "60-90 ثانية", rest: "60 ثانية" },
          { name: "رفع الساق الجانبي المقاوم", sets: 3, reps: "20-25 لكل ساق", rest: "45 ثانية" },
          { name: "تمرين العجل المكثف", sets: 4, reps: "25-35", rest: "60 ثانية" }
        ],
        cooldown: [
          { name: "شد عضلات الساقين المتقدم", duration: "8 دقائق" },
          { name: "شد عضلات الوركين", duration: "5 دقائق" }
        ]
      }
    },
    {
      day: 2,
      title: "هيت كارديو مكثف",
      type: "هيت",
      duration: "30 دقيقة",
      exercises: {
        warmup: [
          { name: "المشي السريع", duration: "5 دقائق" },
          { name: "تحريك المفاصل", duration: "3 دقائق" }
        ],
        main: [
          { name: "بيربي", sets: 5, reps: "45 ثانية", rest: "30 ثانية" },
          { name: "جمبنج جاكس", sets: 5, reps: "45 ثانية", rest: "30 ثانية" },
          { name: "ماونتن كلايمرز", sets: 5, reps: "45 ثانية", rest: "30 ثانية" },
          { name: "هاي نيز", sets: 5, reps: "45 ثانية", rest: "30 ثانية" },
          { name: "سبرنت في المكان", sets: 4, reps: "30 ثانية", rest: "45 ثانية" }
        ],
        cooldown: [
          { name: "مشي بطيء وتنفس عميق", duration: "7 دقائق" }
        ]
      }
    },
    {
      day: 3,
      title: "تدريب الجزء العلوي المكثف",
      type: "قوة مكثفة", 
      duration: "60 دقيقة",
      exercises: {
        warmup: [
          { name: "تحريك الذراعين", duration: "5 دقائق" },
          { name: "تمارين إحماء الكتفين", duration: "3 دقائق" }
        ],
        main: [
          { name: "تمرين الضغط المتقدم", sets: 5, reps: "15-25", rest: "75 ثانية" },
          { name: "تمرين الضغط الماسي", sets: 4, reps: "10-15", rest: "90 ثانية" },
          { name: "العقلة أو المساعدة المكثفة", sets: 5, reps: "8-15", rest: "2 دقيقة" },
          { name: "الديبس المتقدم", sets: 4, reps: "12-20", rest: "75 ثانية" },
          { name: "البلانك المتقدم", sets: 4, reps: "60-120 ثانية", rest: "60 ثانية" },
          { name: "تمرين الكتف الجانبي", sets: 4, reps: "20-25", rest: "60 ثانية" }
        ],
        cooldown: [
          { name: "شد شامل للجزء العلوي", duration: "10 دقائق" }
        ]
      }
    }
  ]
};

// قالب للمبتدئين
export const beginnerTemplate = {
  name: "خطة المبتدئين الودودة",
  description: "خطة مناسبة للمبتدئين مع تمارين سهلة وتدرج تدريجي",
  mealPlan: {
    breakfast: {
      title: "فطار بسيط ومغذي",
      items: ["شوفان بالحليب كوب", "عسل ملعقة", "موز مقطع", "مكسرات مشكلة حفنة صغيرة", "كوب شاي"],
      calories: 420,
      protein: 15,
      carbs: 60,
      fats: 14
    },
    snack1: {
      title: "سناك خفيف ولذيذ",
      items: ["تفاحة متوسطة", "زبدة فول سوداني ملعقة", "كوب ماء"],
      calories: 200,
      protein: 6,
      carbs: 25,
      fats: 9
    },
    lunch: {
      title: "غداء متوازن وسهل",
      items: ["دجاج مشوي 140 جرام", "أرز أبيض ثلاثة أرباع كوب", "خضار مطبوخة", "سلطة صغيرة", "زيت زيتون نصف ملعقة"],
      calories: 520,
      protein: 35,
      carbs: 45,
      fats: 15
    },
    snack2: {
      title: "وجبة بعد الظهر المريحة",
      items: ["زبادي طبيعي كوب", "عسل ملعقة صغيرة", "قرفة رشة", "بسكويت شوفان قطعة"],
      calories: 180,
      protein: 10,
      carbs: 22,
      fats: 6
    },
    dinner: {
      title: "عشاء خفيف ومشبع",
      items: ["سمك أبيض مشوي 120 جرام", "خضار على البخار", "خبز أسمر شريحة", "جبن قريش ملعقتين"],
      calories: 380,
      protein: 30,
      carbs: 28,
      fats: 14
    }
  },
  workoutPlan: [
    {
      day: 1,
      title: "تمارين بسيطة للجسم كامل",
      type: "مبتدئين",
      duration: "25 دقيقة",
      exercises: {
        warmup: [
          { name: "المشي في المكان", duration: "4 دقائق" },
          { name: "تحريك المفاصل برفق", duration: "3 دقائق" }
        ],
        main: [
          { name: "مارش في المكان", sets: 3, reps: "1 دقيقة", rest: "45 ثانية" },
          { name: "ضغط على الحائط", sets: 3, reps: "10-12", rest: "75 ثانية" },
          { name: "سكوات بمساعدة الكرسي", sets: 3, reps: "10-12", rest: "75 ثانية" },
          { name: "رفع الذراعين جانباً", sets: 2, reps: "12-15", rest: "45 ثانية" },
          { name: "شد البطن بسيط", sets: 2, reps: "10-15", rest: "60 ثانية" }
        ],
        cooldown: [
          { name: "مشي بطيء", duration: "4 دقائق" },
          { name: "شد بسيط ومريح", duration: "3 دقائق" }
        ]
      }
    },
    {
      day: 2,
      title: "راحة نشطة ومرونة",
      type: "مرونة",
      duration: "20 دقيقة",
      exercises: {
        warmup: [
          { name: "مشي بطيء", duration: "5 دقائق" }
        ],
        main: [
          { name: "شد عضلات الجسم", sets: 1, reps: "8 دقائق", rest: "حسب الحاجة" },
          { name: "تمارين تنفس", sets: 1, reps: "3 دقائق", rest: "بدون راحة" }
        ],
        cooldown: [
          { name: "تنفس عميق وراحة", duration: "4 دقائق" }
        ]
      }
    },
    {
      day: 3,
      title: "تمارين خفيفة ومتنوعة",
      type: "مبتدئين",
      duration: "30 دقيقة",
      exercises: {
        warmup: [
          { name: "المشي في المكان", duration: "5 دقائق" },
          { name: "تحريك الذراعين", duration: "2 دقيقة" }
        ],
        main: [
          { name: "ضغط معدل على الركبتين", sets: 2, reps: "8-12", rest: "90 ثانية" },
          { name: "اللانج البسيط", sets: 2, reps: "8-10 لكل ساق", rest: "75 ثانية" },
          { name: "رفع الركبتين", sets: 3, reps: "15-20", rest: "60 ثانية" },
          { name: "تمرين الجسر البسيط", sets: 2, reps: "12-15", rest: "60 ثانية" },
          { name: "مد الذراعين للأعلى", sets: 2, reps: "15-20", rest: "45 ثانية" }
        ],
        cooldown: [
          { name: "شد شامل للجسم", duration: "8 دقائق" }
        ]
      }
    }
  ]
};

// قالب للنساء
export const femaleTemplate = {
  name: "خطة مخصصة للنساء",
  description: "خطة مصممة خصيصاً لاحتياجات المرأة مع التركيز على التونينج",
  mealPlan: {
    breakfast: {
      title: "فطار صحي للمرأة",
      items: ["أفوكادو توست شريحتين", "بيضة مسلوقة", "طماطم كرزية", "شاي أخضر بالنعناع", "بذور الشيا ملعقة صغيرة"],
      calories: 470,
      protein: 20,
      carbs: 38,
      fats: 25
    },
    snack1: {
      title: "سموذي فواكه منعش",
      items: ["توت مشكل نصف كوب", "موز نصف حبة", "زبادي يوناني نصف كوب", "بذور شيا ملعقة صغيرة", "عسل ملعقة صغيرة"],
      calories: 250,
      protein: 15,
      carbs: 32,
      fats: 8
    },
    lunch: {
      title: "سلطة البروتين المغذية",
      items: ["خضار ورقية مشكلة كوبين", "دجاج مشوي 120 جرام", "كينوا ثلث كوب", "مكسرات مشكلة", "زيت زيتون ملعقة", "جبن فيتا 30 جرام"],
      calories: 550,
      protein: 32,
      carbs: 38,
      fats: 24
    },
    snack2: {
      title: "وجبة خفيفة صحية",
      items: ["حمص محضر منزلياً 3 ملاعق", "خضار مقطعة للتغميس", "ماء بالليمون", "بذور عباد الشمس ملعقة"],
      calories: 190,
      protein: 8,
      carbs: 22,
      fats: 9
    },
    dinner: {
      title: "عشاء متوازن ومشبع",
      items: ["سمك السلمون 140 جرام", "أرز بني ثلث كوب", "بروكلي مطبوخ", "سلطة خيار ولبن", "زيت زيتون نصف ملعقة"],
      calories: 480,
      protein: 35,
      carbs: 30,
      fats: 22
    }
  },
  workoutPlan: [
    {
      day: 1,
      title: "تونينج الجسم الكامل",
      type: "تونينج",
      duration: "40 دقيقة",
      exercises: {
        warmup: [
          { name: "مشي سريع", duration: "6 دقائق" },
          { name: "حركات ديناميكية للمفاصل", duration: "4 دقائق" }
        ],
        main: [
          { name: "سكوات مع رفع الذراعين", sets: 4, reps: "15-18", rest: "50 ثانية" },
          { name: "لانج جانبي متقدم", sets: 3, reps: "12-15 لكل جانب", rest: "60 ثانية" },
          { name: "ضغط معدل (على الركبتين)", sets: 4, reps: "10-15", rest: "75 ثانية" },
          { name: "بلانك ديناميكي", sets: 3, reps: "30-60 ثانية", rest: "60 ثانية" },
          { name: "جسر الورك المتقدم", sets: 4, reps: "15-20", rest: "50 ثانية" },
          { name: "رفع الساق الجانبي", sets: 3, reps: "15-20 لكل ساق", rest: "45 ثانية" },
          { name: "تمرين البطن المائل", sets: 3, reps: "20-25 لكل جانب", rest: "45 ثانية" }
        ],
        cooldown: [
          { name: "شد الجسم بالكامل", duration: "8 دقائق" },
          { name: "تنفس واسترخاء", duration: "2 دقيقة" }
        ]
      }
    },
    {
      day: 2,
      title: "يوجا ومرونة متقدمة",
      type: "مرونة",
      duration: "35 دقيقة",
      exercises: {
        warmup: [
          { name: "تنفس عميق وتأمل", duration: "5 دقائق" }
        ],
        main: [
          { name: "وضعيات يوجا أساسية", sets: 1, reps: "15 دقيقة", rest: "حسب الحاجة" },
          { name: "تمارين مرونة متقدمة", sets: 1, reps: "10 دقائق", rest: "حسب الحاجة" }
        ],
        cooldown: [
          { name: "استرخاء وتأمل", duration: "5 دقائق" }
        ]
      }
    },
    {
      day: 3,
      title: "كارديو رقص ومرح",
      type: "كارديو",
      duration: "30 دقيقة",
      exercises: {
        warmup: [
          { name: "حركات رقص بطيئة", duration: "5 دقائق" }
        ],
        main: [
          { name: "رقص كارديو", sets: 1, reps: "20 دقيقة", rest: "حسب الحاجة" }
        ],
        cooldown: [
          { name: "حركات رقص بطيئة وشد", duration: "5 دقائق" }
        ]
      }
    }
  ]
};

// قالب لفقدان الوزن
export const weightLossTemplate = {
  name: "خطة إنقاص الوزن الفعالة",
  description: "خطة مصممة خصيصاً لفقدان الوزن بطريقة صحية ومستدامة",
  mealPlan: {
    breakfast: {
      title: "فطار حارق للدهون",
      items: ["بيضتين مسلوقتين", "خبز أسمر شريحة", "خيار وطماطم", "شاي أخضر", "جريب فروت ربع حبة"],
      calories: 320,
      protein: 18,
      carbs: 25,
      fats: 12
    },
    snack1: {
      title: "سناك محفز للحرق",
      items: ["تفاح أخضر صغير", "قرفة رشة", "ماء بالليمون كوب"],
      calories: 80,
      protein: 1,
      carbs: 20,
      fats: 0
    },
    lunch: {
      title: "غداء قليل السعرات",
      items: ["صدر دجاج مشوي 150 جرام", "سلطة خضراء كبيرة", "خل التفاح ملعقة", "زيت زيتون نصف ملعقة"],
      calories: 350,
      protein: 35,
      carbs: 8,
      fats: 12
    },
    snack2: {
      title: "وجبة مسائية خفيفة",
      items: ["زبادي يوناني خالي الدسم", "توت أزرق حفنة", "قرفة رشة"],
      calories: 120,
      protein: 12,
      carbs: 15,
      fats: 2
    },
    dinner: {
      title: "عشاء حارق للدهون",
      items: ["سمك أبيض مشوي 130 جرام", "خضار ورقية", "كوسة مشوية", "شوربة خضار كوب صغير"],
      calories: 280,
      protein: 28,
      carbs: 12,
      fats: 8
    }
  },
  workoutPlan: [
    {
      day: 1,
      title: "هيت لحرق الدهون",
      type: "هيت",
      duration: "25 دقيقة",
      exercises: {
        warmup: [
          { name: "مشي سريع", duration: "5 دقائق" }
        ],
        main: [
          { name: "بيربي", sets: 4, reps: "30 ثانية", rest: "30 ثانية" },
          { name: "جمب سكوات", sets: 4, reps: "30 ثانية", rest: "30 ثانية" },
          { name: "ماونتن كلايمرز", sets: 4, reps: "30 ثانية", rest: "30 ثانية" },
          { name: "جمبنج جاكس", sets: 4, reps: "30 ثانية", rest: "30 ثانية" }
        ],
        cooldown: [
          { name: "مشي بطيء", duration: "5 دقائق" }
        ]
      }
    },
    {
      day: 2,
      title: "كارديو ثابت لحرق الدهون",
      type: "كارديو",
      duration: "40 دقيقة",
      exercises: {
        warmup: [
          { name: "مشي بطيء", duration: "5 دقائق" }
        ],
        main: [
          { name: "مشي سريع أو جري خفيف", sets: 1, reps: "30 دقيقة", rest: "حسب الحاجة" }
        ],
        cooldown: [
          { name: "مشي بطيء وشد", duration: "5 دقائق" }
        ]
      }
    },
    {
      day: 3,
      title: "تمارين قوة لحرق الدهون",
      type: "قوة",
      duration: "35 دقيقة",
      exercises: {
        warmup: [
          { name: "حركات ديناميكية", duration: "5 دقائق" }
        ],
        main: [
          { name: "سكوات", sets: 3, reps: "20-25", rest: "45 ثانية" },
          { name: "ضغط", sets: 3, reps: "15-20", rest: "60 ثانية" },
          { name: "لانج", sets: 3, reps: "15-20 لكل ساق", rest: "60 ثانية" },
          { name: "بلانك", sets: 3, reps: "45-60 ثانية", rest: "60 ثانية" },
          { name: "جسر الورك", sets: 3, reps: "20-25", rest: "45 ثانية" }
        ],
        cooldown: [
          { name: "شد عضلات الجسم", duration: "10 دقائق" }
        ]
      }
    }
  ]
};

// قالب لزيادة الوزن
export const weightGainTemplate = {
  name: "خطة زيادة الوزن الصحية",
  description: "خطة مصممة لزيادة الوزن وبناء العضلات بطريقة صحية",
  mealPlan: {
    breakfast: {
      title: "فطار عالي السعرات",
      items: ["شوفان بالحليب كوب", "موز كامل", "لوز 15 حبة", "عسل ملعقتين", "زبدة فول سوداني ملعقة", "حليب كامل الدسم كوب"],
      calories: 750,
      protein: 25,
      carbs: 85,
      fats: 32
    },
    snack1: {
      title: "سناك عالي الطاقة",
      items: ["تمر 5 حبات", "جوز 10 أنصاف", "حليب كامل الدسم كوب", "بسكويت شوفان 3 قطع"],
      calories: 420,
      protein: 12,
      carbs: 48,
      fats: 20
    },
    lunch: {
      title: "غداء مغذي وعالي السعرات",
      items: ["أرز أبيض كوب ونصف", "لحم بقري 200 جرام", "خضار مطبوخة بالزيت", "سلطة بالطحينة", "خبز عربي رغيف"],
      calories: 920,
      protein: 45,
      carbs: 85,
      fats: 38
    },
    snack2: {
      title: "وجبة بعد الظهر المغذية",
      items: ["زبادي كامل الدسم كوب", "عسل ملعقة", "مكسرات مشكلة حفنة", "فواكه مجففة حفنة"],
      calories: 350,
      protein: 15,
      carbs: 42,
      fats: 18
    },
    dinner: {
      title: "عشاء مشبع ومغذي",
      items: ["سمك سلمون 180 جرام", "بطاطس مهروسة كوب", "خضار مشوية بالزيت", "سلطة بالأفوكادو", "خبز أسمر شريحتين"],
      calories: 680,
      protein: 38,
      carbs: 55,
      fats: 30
    }
  },
  workoutPlan: [
    {
      day: 1,
      title: "تمارين قوة لبناء العضلات",
      type: "قوة",
      duration: "50 دقيقة",
      exercises: {
        warmup: [
          { name: "مشي خفيف", duration: "5 دقائق" },
          { name: "تحريك المفاصل", duration: "5 دقائق" }
        ],
        main: [
          { name: "ضغط تقليدي", sets: 4, reps: "12-15", rest: "90 ثانية" },
          { name: "سكوات", sets: 4, reps: "15-20", rest: "90 ثانية" },
          { name: "لانج", sets: 3, reps: "12-15 لكل ساق", rest: "75 ثانية" },
          { name: "ديبس على كرسي", sets: 3, reps: "10-15", rest: "75 ثانية" },
          { name: "بلانك", sets: 3, reps: "45-60 ثانية", rest: "60 ثانية" },
          { name: "رفع الساق", sets: 3, reps: "15-20", rest: "60 ثانية" }
        ],
        cooldown: [
          { name: "شد عضلات الجسم", duration: "10 دقائق" }
        ]
      }
    },
    {
      day: 2,
      title: "راحة نشطة",
      type: "راحة",
      duration: "20 دقيقة",
      exercises: {
        warmup: [
          { name: "مشي بطيء", duration: "10 دقائق" }
        ],
        main: [
          { name: "تمارين شد واسترخاء", sets: 1, reps: "10 دقائق", rest: "حسب الحاجة" }
        ],
        cooldown: []
      }
    },
    {
      day: 3,
      title: "تمارين مقاومة متقدمة",
      type: "قوة",
      duration: "45 دقيقة",
      exercises: {
        warmup: [
          { name: "إحماء ديناميكي", duration: "8 دقائق" }
        ],
        main: [
          { name: "ضغط متقدم", sets: 4, reps: "15-20", rest: "90 ثانية" },
          { name: "سكوات عميق", sets: 4, reps: "18-25", rest: "90 ثانية" },
          { name: "جسر الورك", sets: 4, reps: "20-25", rest: "60 ثانية" },
          { name: "تمرين السوبرمان", sets: 3, reps: "15-20", rest: "60 ثانية" },
          { name: "تمرين البطن", sets: 3, reps: "20-25", rest: "45 ثانية" }
        ],
        cooldown: [
          { name: "استرخاء وشد", duration: "7 دقائق" }
        ]
      }
    }
  ]
};

// قالب للمراهقين
export const teenTemplate = {
  name: "خطة المراهقين النشطة",
  description: "خطة مصممة للمراهقين مع التركيز على النمو الصحي واللياقة",
  mealPlan: {
    breakfast: {
      title: "فطار المراهق النشط",
      items: ["شوفان بالفواكه", "حليب قليل الدسم", "موز", "عسل", "مكسرات", "عصير برتقال طبيعي نصف كوب"],
      calories: 520,
      protein: 20,
      carbs: 70,
      fats: 18
    },
    snack1: {
      title: "سناك المدرسة",
      items: ["ساندويش زبدة لوز صغير", "تفاحة", "ماء كوب"],
      calories: 280,
      protein: 8,
      carbs: 35,
      fats: 12
    },
    lunch: {
      title: "غداء متوازن للمراهق",
      items: ["دجاج مشوي 150 جرام", "أرز أو مكرونة كوب", "خضار مشكلة", "سلطة", "خبز شريحة"],
      calories: 650,
      protein: 38,
      carbs: 65,
      fats: 20
    },
    snack2: {
      title: "وجبة بعد المدرسة",
      items: ["زبادي بالفواكه", "جرانولا ملعقتين", "عصير طبيعي نصف كوب"],
      calories: 220,
      protein: 12,
      carbs: 30,
      fats: 8
    },
    dinner: {
      title: "عشاء عائلي صحي",
      items: ["سمك مشوي أو لحم 140 جرام", "خضار مطبوخة", "بطاطس مسلوقة متوسطة", "سلطة خضراء"],
      calories: 480,
      protein: 32,
      carbs: 40,
      fats: 18
    }
  },
  workoutPlan: [
    {
      day: 1,
      title: "تمارين ممتعة للجسم كامل",
      type: "متنوع",
      duration: "35 دقيقة",
      exercises: {
        warmup: [
          { name: "جري خفيف", duration: "5 دقائق" },
          { name: "تمارين حركية", duration: "3 دقائق" }
        ],
        main: [
          { name: "ضغط", sets: 3, reps: "12-18", rest: "60 ثانية" },
          { name: "سكوات", sets: 3, reps: "15-20", rest: "60 ثانية" },
          { name: "لانج", sets: 3, reps: "12-15 لكل ساق", rest: "60 ثانية" },
          { name: "بلانك", sets: 3, reps: "30-45 ثانية", rest: "45 ثانية" },
          { name: "جمبنج جاكس", sets: 3, reps: "20-30", rest: "45 ثانية" },
          { name: "تمرين البطن", sets: 3, reps: "15-20", rest: "45 ثانية" }
        ],
        cooldown: [
          { name: "شد وتهدئة", duration: "7 دقائق" }
        ]
      }
    },
    {
      day: 2,
      title: "أنشطة رياضية ممتعة",
      type: "نشاط",
      duration: "45 دقيقة",
      exercises: {
        warmup: [
          { name: "مشي نشط", duration: "5 دقائق" }
        ],
        main: [
          { name: "لعب كرة أو رياضة مفضلة", sets: 1, reps: "35 دقيقة", rest: "حسب النشاط" }
        ],
        cooldown: [
          { name: "مشي بطيء واسترخاء", duration: "5 دقائق" }
        ]
      }
    },
    {
      day: 3,
      title: "تحدي اللياقة الممتع",
      type: "تحدي",
      duration: "30 دقيقة",
      exercises: {
        warmup: [
          { name: "تحريك الجسم", duration: "5 دقائق" }
        ],
        main: [
          { name: "تحدي الضغط", sets: 3, reps: "أقصى عدد", rest: "90 ثانية" },
          { name: "تحدي السكوات", sets: 3, reps: "أقصى عدد", rest: "90 ثانية" },
          { name: "تحدي البلانك", sets: 2, reps: "أقصى وقت", rest: "2 دقيقة" },
          { name: "تحدي الجري في المكان", sets: 3, reps: "30 ثانية", rest: "60 ثانية" }
        ],
        cooldown: [
          { name: "استرخاء وتهنئة الذات", duration: "5 دقائق" }
        ]
      }
    }
  ]
};

// دالة لاختيار القالب المناسب بناءً على البيانات
export function selectTemplate(userData: any): any {
  const { gender, experienceLevel, goal, age } = userData;
  
  // خوارزمية ذكية لاختيار القالب
  if (age < 18) {
    return teenTemplate;
  }
  
  if (goal === "lose_weight") {
    return weightLossTemplate;
  }
  
  if (goal === "gain_weight" || goal === "build_muscle") {
    return weightGainTemplate;
  }
  
  if (gender === "female") {
    return femaleTemplate;
  }
  
  if (experienceLevel === "beginner") {
    return beginnerTemplate;
  }
  
  if (experienceLevel === "advanced") {
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
      tdee += 400; // زيادة 400 سعرة لزيادة الوزن
      break;
    default:
      // محافظة على الوزن
      break;
  }
  
  // حساب الماكروز حسب الهدف
  let protein, fats, carbs;
  
  if (goal === "lose_weight") {
    protein = Math.round((tdee * 0.35) / 4); // 35% بروتين
    fats = Math.round((tdee * 0.25) / 9); // 25% دهون
    carbs = Math.round((tdee * 0.4) / 4); // 40% كربوهيدرات
  } else if (goal === "gain_weight" || goal === "build_muscle") {
    protein = Math.round((tdee * 0.3) / 4); // 30% بروتين
    fats = Math.round((tdee * 0.3) / 9); // 30% دهون
    carbs = Math.round((tdee * 0.4) / 4); // 40% كربوهيدرات
  } else {
    protein = Math.round((tdee * 0.25) / 4); // 25% بروتين
    fats = Math.round((tdee * 0.25) / 9); // 25% دهون
    carbs = Math.round((tdee * 0.5) / 4); // 50% كربوهيدرات
  }
  
  return {
    daily: Math.round(tdee),
    macros: { protein, carbs, fats }
  };
}

// دالة لتخصيص الخطة حسب البيانات
export function customizePlan(template: any, userData: any, calories: any): any {
  const customizedPlan = JSON.parse(JSON.stringify(template)); // نسخ عميق
  
  // تخصيص الوجبات حسب السعرات
  const templateCalories = Object.values(template.mealPlan).reduce((total: number, meal: any) => total + meal.calories, 0);
  const mealCalorieRatio = calories.daily / templateCalories;
  
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
        if (exercise.sets > 3) exercise.sets = 3;
        if (exercise.reps.includes("-")) {
          const [min, max] = exercise.reps.split("-");
          exercise.reps = `${min}-${Math.min(parseInt(max), parseInt(min) + 5)}`;
        }
      });
    });
  } else if (userData.experienceLevel === "advanced") {
    customizedPlan.workoutPlan.forEach((workout: any) => {
      workout.exercises.main.forEach((exercise: any) => {
        if (exercise.sets < 4) exercise.sets = exercise.sets + 1;
        if (exercise.reps.includes("-")) {
          const [min, max] = exercise.reps.split("-");
          exercise.reps = `${Math.max(parseInt(min), parseInt(min) + 2)}-${parseInt(max) + 5}`;
        }
      });
    });
  }
  
  // تخصيص حسب الوقت المتاح
  if (userData.timeAvailable === "30min") {
    customizedPlan.workoutPlan.forEach((workout: any) => {
      workout.duration = "30 دقيقة";
      if (workout.exercises.main.length > 5) {
        workout.exercises.main = workout.exercises.main.slice(0, 5);
      }
    });
  } else if (userData.timeAvailable === "90min") {
    customizedPlan.workoutPlan.forEach((workout: any) => {
      workout.duration = "75-90 دقيقة";
      workout.exercises.main.forEach((exercise: any) => {
        exercise.sets = exercise.sets + 1;
      });
    });
  }
  
  return customizedPlan;
}

// دالة للحصول على جميع القوالب المتاحة
export function getAllTemplates() {
  return [
    classicTemplate,
    intensiveTemplate,
    beginnerTemplate,
    femaleTemplate,
    weightLossTemplate,
    weightGainTemplate,
    teenTemplate
  ];
}
