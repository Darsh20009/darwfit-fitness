
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
          { name: "تحريك الذراعين دائرياً", duration: "2 دقيقة" },
          { name: "تحريك الكتفين", duration: "1 دقيقة" }
        ],
        main: [
          { name: "تمرين الضغط", sets: 3, reps: "10-15", rest: "60 ثانية", description: "ادفع من الأرض بقوة واثبت ثانية في الأعلى" },
          { name: "تمرين العقلة (أو المساعدة)", sets: 3, reps: "5-10", rest: "90 ثانية", description: "استخدم مقعد للمساعدة إذا لزم الأمر" },
          { name: "تمرين الديبس على الكرسي", sets: 3, reps: "8-12", rest: "60 ثانية", description: "استخدم مقعدين متقابلين" },
          { name: "تمرين البلانك", sets: 3, reps: "30-60 ثانية", rest: "60 ثانية", description: "حافظ على استقامة الجسم" },
          { name: "تمرين الضغط الماسي", sets: 2, reps: "5-8", rest: "90 ثانية", description: "اجعل اليدين في شكل ماسة" }
        ],
        cooldown: [
          { name: "شد عضلات الصدر", duration: "2 دقيقة" },
          { name: "شد عضلات الذراعين", duration: "3 دقائق" },
          { name: "تنفس عميق", duration: "2 دقيقة" }
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
          { name: "المشي السريع", sets: 1, reps: "15 دقيقة", rest: "حسب الحاجة", description: "وتيرة سريعة لكن مريحة" },
          { name: "صعود ونزول الدرج", sets: 4, reps: "2 دقيقة", rest: "1 دقيقة", description: "ابدأ ببطء وازد السرعة تدريجياً" },
          { name: "رقص حر", sets: 1, reps: "5 دقائق", rest: "", description: "اختر موسيقى تحبها وارقص" }
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
      duration: "40 دقيقة",
      exercises: {
        warmup: [
          { name: "المشي في المكان", duration: "5 دقائق" },
          { name: "تحريك الركبتين دائرياً", duration: "2 دقيقة" },
          { name: "شد عضلات الساقين", duration: "3 دقائق" }
        ],
        main: [
          { name: "السكوات", sets: 4, reps: "15-20", rest: "90 ثانية", description: "انزل كأنك تجلس على كرسي" },
          { name: "اللانج الأمامي", sets: 3, reps: "12-15 لكل ساق", rest: "90 ثانية", description: "خطوة واسعة للأمام ثم عودة" },
          { name: "اللانج الجانبي", sets: 3, reps: "10-12 لكل جانب", rest: "90 ثانية", description: "خطوة جانبية واسعة" },
          { name: "رفع الساقين من الخلف", sets: 3, reps: "12-15 لكل ساق", rest: "60 ثانية", description: "ارفع الساق للخلف وأنت واقف" },
          { name: "جمب سكوات", sets: 3, reps: "10-15", rest: "90 ثانية", description: "اقفز في نهاية كل سكوات" },
          { name: "وول سيت", sets: 2, reps: "30-45 ثانية", rest: "60 ثانية", description: "اجلس على الحائط" }
        ],
        cooldown: [
          { name: "شد عضلات الساقين", duration: "5 دقائق" },
          { name: "شد عضلات المؤخرة", duration: "3 دقائق" }
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
      items: ["بروتين باودر سكوب", "حليب لوز كوب", "موز نصف حبة", "زبدة فول سوداني ملعقة"],
      calories: 280,
      protein: 28,
      carbs: 22,
      fats: 8
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
      items: ["تونة علبة", "كراكرز حبوب كاملة", "خيار مقطع", "طماطم كرزية"],
      calories: 240,
      protein: 27,
      carbs: 18,
      fats: 6
    },
    dinner: {
      title: "عشاء خفيف عالي البروتين",
      items: ["صدر ديك رومي 150 جرام", "سلطة خضراء كبيرة", "جبن قريش 100 جرام", "مكسرات قليلة"],
      calories: 420,
      protein: 42,
      carbs: 12,
      fats: 18
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
          { name: "إحماء المفاصل", duration: "5 دقائق" },
          { name: "تمارين ديناميكية", duration: "5 دقائق" }
        ],
        main: [
          { name: "السكوات", sets: 4, reps: "15-20", rest: "90 ثانية", description: "تركيز على الشكل الصحيح" },
          { name: "اللانج المتقدم", sets: 4, reps: "12-15 لكل ساق", rest: "90 ثانية", description: "لانج أمامي وخلفي متتالي" },
          { name: "الديدليفت بساق واحدة", sets: 3, reps: "10-12 لكل ساق", rest: "90 ثانية", description: "توازن وقوة" },
          { name: "جمب سكوات", sets: 4, reps: "15-20", rest: "60 ثانية", description: "انفجار قوي في القفز" },
          { name: "وول سيت", sets: 3, reps: "45-60 ثانية", rest: "60 ثانية", description: "تحمل قوة" },
          { name: "سكوات بساق واحدة", sets: 3, reps: "5-8 لكل ساق", rest: "120 ثانية", description: "تمرين متقدم" }
        ],
        cooldown: [
          { name: "شد عضلات الساقين", duration: "10 دقائق" },
          { name: "تدليك خفيف", duration: "5 دقائق" }
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
          { name: "تحريك كامل الجسم", duration: "3 دقائق" }
        ],
        main: [
          { name: "بيربي", sets: 5, reps: "45 ثانية", rest: "15 ثانية", description: "بأقصى سرعة ممكنة" },
          { name: "جمبنج جاكس", sets: 4, reps: "45 ثانية", rest: "15 ثانية", description: "حافظ على الإيقاع" },
          { name: "ماونتن كلايمرز", sets: 4, reps: "45 ثانية", rest: "15 ثانية", description: "كأنك تتسلق جبل" },
          { name: "هاي نيز", sets: 4, reps: "45 ثانية", rest: "15 ثانية", description: "ارفع الركبتين عالياً" },
          { name: "سكوات جمب", sets: 3, reps: "30 ثانية", rest: "30 ثانية", description: "اقفز بكل قوة" }
        ],
        cooldown: [
          { name: "مشي بطيء وتنفس عميق", duration: "5 دقائق" },
          { name: "شد عام للجسم", duration: "3 دقائق" }
        ]
      }
    },
    {
      day: 3,
      title: "تدريب الجزء العلوي المكثف",
      type: "قوة مكثفة",
      duration: "55 دقيقة",
      exercises: {
        warmup: [
          { name: "تحريك الذراعين", duration: "5 دقائق" },
          { name: "إحماء الكتفين", duration: "3 دقائق" },
          { name: "ضغط خفيف", duration: "2 دقيقة" }
        ],
        main: [
          { name: "ضغط متنوع", sets: 4, reps: "12-15", rest: "90 ثانية", description: "ضغط عادي، واسع، ضيق" },
          { name: "ديبس على الكرسي", sets: 4, reps: "10-15", rest: "90 ثانية", description: "نزول عميق" },
          { name: "بلانك ديناميكي", sets: 3, reps: "45 ثانية", rest: "60 ثانية", description: "صعود وهبوط من البلانك" },
          { name: "ضغط الماسة", sets: 3, reps: "8-12", rest: "90 ثانية", description: "تركيز على الترايسبس" },
          { name: "تمرين سوبرمان", sets: 3, reps: "15-20", rest: "60 ثانية", description: "تقوية الظهر" },
          { name: "بيربي", sets: 3, reps: "10-15", rest: "120 ثانية", description: "تمرين شامل" }
        ],
        cooldown: [
          { name: "شد الصدر والكتفين", duration: "8 دقائق" },
          { name: "شد الذراعين", duration: "5 دقائق" }
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
      items: ["شوفان بالحليب", "عسل ملعقة", "موز مقطع", "مكسرات مشكلة قليلة"],
      calories: 380,
      protein: 12,
      carbs: 55,
      fats: 11
    },
    snack1: {
      title: "سناك خفيف",
      items: ["تفاحة", "زبدة فول سوداني ملعقة صغيرة"],
      calories: 160,
      protein: 4,
      carbs: 20,
      fats: 6
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
      duration: "25 دقيقة",
      exercises: {
        warmup: [
          { name: "المشي في المكان", duration: "3 دقائق" },
          { name: "تحريك المفاصل", duration: "2 دقيقة" },
          { name: "تمدد خفيف", duration: "2 دقيقة" }
        ],
        main: [
          { name: "مارش في المكان", sets: 2, reps: "1 دقيقة", rest: "30 ثانية", description: "ارفع الركبتين برفق" },
          { name: "ضغط على الحائط", sets: 2, reps: "8-10", rest: "60 ثانية", description: "ابدأ بمسافة قريبة من الحائط" },
          { name: "سكوات بمساعدة الكرسي", sets: 2, reps: "8-10", rest: "60 ثانية", description: "استخدم الكرسي للمساعدة" },
          { name: "رفع الذراعين جانباً", sets: 2, reps: "10-12", rest: "30 ثانية", description: "حركة بطيئة ومنتظمة" },
          { name: "المشي بالمكان برفع الركبة", sets: 2, reps: "30 ثانية", rest: "45 ثانية", description: "ببطء وتحكم" }
        ],
        cooldown: [
          { name: "مشي بطيء", duration: "3 دقائق" },
          { name: "شد بسيط", duration: "3 دقائق" },
          { name: "تنفس عميق", duration: "2 دقيقة" }
        ]
      }
    },
    {
      day: 2,
      title: "نشاط خفيف ومرونة",
      type: "مرونة",
      duration: "20 دقيقة",
      exercises: {
        warmup: [
          { name: "مشي بطيء", duration: "5 دقائق" },
          { name: "تحريك الذراعين", duration: "2 دقيقة" }
        ],
        main: [
          { name: "شد عضلات الجسم", sets: 1, reps: "10 دقائق", rest: "حسب الحاجة", description: "حركات بطيئة ولطيفة" },
          { name: "تحريك المفاصل", sets: 1, reps: "3 دقائق", rest: "", description: "دوائر صغيرة للكتفين والوركين" }
        ],
        cooldown: [
          { name: "تنفس عميق وراحة", duration: "5 دقائق" }
        ]
      }
    },
    {
      day: 3,
      title: "تقوية لطيفة",
      type: "تقوية",
      duration: "30 دقيقة",
      exercises: {
        warmup: [
          { name: "المشي الخفيف", duration: "5 دقائق" },
          { name: "تحريك الذراعين والساقين", duration: "3 دقائق" }
        ],
        main: [
          { name: "رفع الذراعين للأعلى", sets: 2, reps: "10-12", rest: "45 ثانية", description: "كأنك تلمس السقف" },
          { name: "الوقوف من الكرسي", sets: 2, reps: "5-8", rest: "60 ثانية", description: "بدون استخدام اليدين إذا أمكن" },
          { name: "رفع الكعبين", sets: 2, reps: "10-15", rest: "30 ثانية", description: "قف على أطراف أصابعك" },
          { name: "بلانك على الركبتين", sets: 2, reps: "15-30 ثانية", rest: "60 ثانية", description: "ابدأ قصير وازد تدريجياً" },
          { name: "المشي في خط مستقيم", sets: 2, reps: "1 دقيقة", rest: "30 ثانية", description: "للتوازن والتحكم" }
        ],
        cooldown: [
          { name: "شد شامل للجسم", duration: "7 دقائق" },
          { name: "تنفس واسترخاء", duration: "5 دقائق" }
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
      items: ["توت مشكل", "موز نصف حبة", "زبادي يوناني", "بذور شيا", "عسل قليل"],
      calories: 240,
      protein: 14,
      carbs: 30,
      fats: 7
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
      items: ["حمص محضر منزلياً", "خضار مقطعة للتغميس", "ماء بالليمون", "جزر صغير"],
      calories: 180,
      protein: 7,
      carbs: 22,
      fats: 8
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
      duration: "40 دقيقة",
      exercises: {
        warmup: [
          { name: "مشي سريع", duration: "5 دقائق" },
          { name: "حركات ديناميكية", duration: "3 دقائق" },
          { name: "تحريك الوركين", duration: "2 دقيقة" }
        ],
        main: [
          { name: "سكوات مع رفع الذراعين", sets: 3, reps: "12-15", rest: "45 ثانية", description: "ارفع الذراعين عند النهوض" },
          { name: "لانج جانبي", sets: 3, reps: "10-12 لكل جانب", rest: "45 ثانية", description: "تركيز على الوركين" },
          { name: "ضغط معدل (على الركبتين)", sets: 3, reps: "8-12", rest: "60 ثانية", description: "حافظ على استقامة الجسم" },
          { name: "بلانك", sets: 3, reps: "20-40 ثانية", rest: "45 ثانية", description: "تقوية المركز" },
          { name: "جسر الورك", sets: 3, reps: "12-15", rest: "45 ثانية", description: "اضغط المؤخرة في الأعلى" },
          { name: "تمرين القطة والجمل", sets: 2, reps: "10-12", rest: "30 ثانية", description: "للمرونة والقوة" }
        ],
        cooldown: [
          { name: "شد الجسم بالكامل", duration: "8 دقائق" },
          { name: "تنفس عميق", duration: "2 دقيقة" }
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
          { name: "تنفس عميق", duration: "3 دقائق" },
          { name: "حركات لطيفة", duration: "2 دقيقة" }
        ],
        main: [
          { name: "وضعيات يوجا أساسية", sets: 1, reps: "25 دقائق", rest: "حسب الحاجة", description: "تدفق لطيف بين الوضعيات" }
        ],
        cooldown: [
          { name: "استرخاء وتأمل", duration: "5 دقائق" }
        ]
      }
    },
    {
      day: 3,
      title: "كارديو رقص",
      type: "كارديو ممتع",
      duration: "30 دقيقة",
      exercises: {
        warmup: [
          { name: "حركات إيقاعية خفيفة", duration: "5 دقائق" },
          { name: "شد العضلات", duration: "3 دقائق" }
        ],
        main: [
          { name: "رقص حر", sets: 3, reps: "5 دقائق", rest: "2 دقيقة", description: "اختاري موسيقى تحبيها" },
          { name: "تمارين إيقاعية", sets: 2, reps: "3 دقائق", rest: "1 دقيقة", description: "حركات بسيطة مع الموسيقى" }
        ],
        cooldown: [
          { name: "رقص بطيء", duration: "5 دقائق" },
          { name: "شد واسترخاء", duration: "2 دقيقة" }
        ]
      }
    }
  ]
};

// قالب رياضي متقدم
export const athleticTemplate = {
  name: "الخطة الرياضية المتقدمة",
  description: "خطة للرياضيين وذوي اللياقة العالية",
  mealPlan: {
    breakfast: {
      title: "فطار الرياضيين",
      items: ["5 بياض بيض + 1 كامل", "شوفان بالفواكه", "موز كامل", "قهوة سوداء", "مكملات فيتامين"],
      calories: 580,
      protein: 32,
      carbs: 68,
      fats: 14
    },
    snack1: {
      title: "سناك ما قبل التمرين",
      items: ["تمر 3 حبات", "مكسرات مختلطة", "ماء جوز الهند"],
      calories: 220,
      protein: 6,
      carbs: 35,
      fats: 8
    },
    lunch: {
      title: "غداء الطاقة",
      items: ["لحم أحمر خالي 200 جرام", "أرز بني كوب ونصف", "خضار مشوية", "سلطة خضراء كبيرة"],
      calories: 720,
      protein: 48,
      carbs: 65,
      fats: 18
    },
    snack2: {
      title: "سناك بعد التمرين",
      items: ["بروتين شيك", "موز كبير", "زبدة فول سوداني ملعقتين", "حليب قليل الدسم"],
      calories: 420,
      protein: 35,
      carbs: 38,
      fats: 12
    },
    dinner: {
      title: "عشاء الاستشفاء",
      items: ["سمك التونا 180 جرام", "بطاطا حلوة", "خضار ورقية", "زيت زيتون"],
      calories: 520,
      protein: 38,
      carbs: 45,
      fats: 16
    }
  },
  workoutPlan: [
    {
      day: 1,
      title: "تدريب عالي الكثافة - الجزء العلوي",
      type: "قوة متقدمة",
      duration: "70 دقيقة",
      exercises: {
        warmup: [
          { name: "جري خفيف", duration: "8 دقائق" },
          { name: "إحماء ديناميكي شامل", duration: "7 دقائق" }
        ],
        main: [
          { name: "ضغط متنوع (عادي/واسع/ضيق)", sets: 5, reps: "15-20", rest: "90 ثانية", description: "تبديل النوع كل مجموعة" },
          { name: "عقلة قبضة مختلفة", sets: 4, reps: "8-12", rest: "120 ثانية", description: "واسعة وضيقة" },
          { name: "ديبس متقدم", sets: 4, reps: "12-18", rest: "90 ثانية", description: "إضافة وزن إذا أمكن" },
          { name: "بلانك ديناميكي متقدم", sets: 4, reps: "60-90 ثانية", rest: "60 ثانية", description: "مع رفع الأطراف" },
          { name: "بيربي مع ضغط", sets: 4, reps: "15-20", rest: "90 ثانية", description: "بيربي كامل مع ضغط" },
          { name: "ضغط هندوسي", sets: 3, reps: "10-15", rest: "120 ثانية", description: "حركة متدفقة" }
        ],
        cooldown: [
          { name: "شد عميق للعضلات", duration: "12 دقائق" },
          { name: "تدليك ذاتي", duration: "5 دقائق" }
        ]
      }
    },
    {
      day: 2,
      title: "كارديو متقطع عالي الكثافة",
      type: "هيت متقدم",
      duration: "45 دقيقة",
      exercises: {
        warmup: [
          { name: "جري متدرج", duration: "10 دقائق" },
          { name: "تمارين ديناميكية", duration: "5 دقائق" }
        ],
        main: [
          { name: "تبديل سريع - بيربي/جمب سكوات", sets: 6, reps: "60 ثانية", rest: "30 ثانية", description: "تبديل كل 15 ثانية" },
          { name: "ماونتن كلايمرز عالي السرعة", sets: 5, reps: "45 ثانية", rest: "15 ثانية", description: "أقصى سرعة ممكنة" },
          { name: "جري في المكان مع رفع الركب", sets: 4, reps: "60 ثانية", rest: "30 ثانية", description: "ركب عالية جداً" },
          { name: "قفز النجمة المتقدم", sets: 4, reps: "45 ثانية", rest: "20 ثانية", description: "بسرعة وانفجار" }
        ],
        cooldown: [
          { name: "مشي تدريجي للهدوء", duration: "8 دقائق" },
          { name: "شد شامل", duration: "7 دقائق" }
        ]
      }
    },
    {
      day: 3,
      title: "تدريب الجزء السفلي المتفجر",
      type: "قوة متفجرة",
      duration: "65 دقيقة",
      exercises: {
        warmup: [
          { name: "جري وإحماء", duration: "10 دقائق" },
          { name: "تحضير المفاصل", duration: "5 دقائق" }
        ],
        main: [
          { name: "سكوات جمب متقدم", sets: 5, reps: "20-25", rest: "90 ثانية", description: "قفز عالي مع هبوط محكم" },
          { name: "لانج متفجر (تبديل)", sets: 4, reps: "16-20", rest: "120 ثانية", description: "قفز وتبديل الساقين" },
          { name: "سكوات بساق واحدة", sets: 4, reps: "8-12 لكل ساق", rest: "120 ثانية", description: "توازن وقوة" },
          { name: "قفز الصندوق (أو درج)", sets: 4, reps: "12-15", rest: "90 ثانية", description: "هبوط آمن" },
          { name: "ديدليفت بوزن الجسم", sets: 4, reps: "15-20", rest: "90 ثانية", description: "تركيز على الشكل" },
          { name: "وول سيت متحدي", sets: 3, reps: "90-120 ثانية", rest: "90 ثانية", description: "تحمل قصوى" }
        ],
        cooldown: [
          { name: "شد مكثف للساقين", duration: "15 دقائق" },
          { name: "تبريد واسترخاء", duration: "5 دقائق" }
        ]
      }
    }
  ]
};

// قالب صحي متوازن
export const healthyBalancedTemplate = {
  name: "الخطة الصحية المتوازنة",
  description: "خطة شاملة للصحة والعافية",
  mealPlan: {
    breakfast: {
      title: "فطار متوازن ومغذي",
      items: ["بيضتين مخفوقتين بالخضار", "خبز أسمر حبة كاملة شريحة", "أفوكادو ربع حبة", "عصير برتقال طازج"],
      calories: 440,
      protein: 18,
      carbs: 42,
      fats: 18
    },
    snack1: {
      title: "سناك صحي متنوع",
      items: ["مزيج من الفواكه المقطعة", "زبادي طبيعي ملعقتين", "جوز 5 حبات"],
      calories: 190,
      protein: 6,
      carbs: 24,
      fats: 8
    },
    lunch: {
      title: "غداء صحي شامل",
      items: ["سمك أبيض مشوي 150 جرام", "أرز بني مع خضار", "سلطة متنوعة كبيرة", "زيت زيتون وليمون"],
      calories: 580,
      protein: 32,
      carbs: 48,
      fats: 22
    },
    snack2: {
      title: "وجبة خفيفة مفيدة",
      items: ["حمص بالطحينة", "خضار عودان للتغميس", "ماء بالخيار والنعناع"],
      calories: 170,
      protein: 8,
      carbs: 18,
      fats: 7
    },
    dinner: {
      title: "عشاء خفيف ومشبع",
      items: ["شوربة عدس", "دجاج مشوي 100 جرام", "خضار مطبوخة على البخار", "خبز أسمر نصف رغيف"],
      calories: 460,
      protein: 28,
      carbs: 38,
      fats: 15
    }
  },
  workoutPlan: [
    {
      day: 1,
      title: "تمارين صحية شاملة",
      type: "متوازن",
      duration: "45 دقيقة",
      exercises: {
        warmup: [
          { name: "مشي سريع أو جري خفيف", duration: "6 دقائق" },
          { name: "إحماء جميع المفاصل", duration: "4 دقائق" }
        ],
        main: [
          { name: "مزيج من السكوات والضغط", sets: 3, reps: "12-15 كل تمرين", rest: "90 ثانية", description: "دورة تدريبية" },
          { name: "لانج مع حركة الذراعين", sets: 3, reps: "10-12 لكل ساق", rest: "90 ثانية", description: "حركة وظيفية" },
          { name: "بلانك مع رفع الذراع", sets: 3, reps: "30-45 ثانية", rest: "60 ثانية", description: "توازن وقوة" },
          { name: "جسر الورك مع رفع الساق", sets: 3, reps: "10-12 لكل ساق", rest: "60 ثانية", description: "تقوية المؤخرة" },
          { name: "مشي متقدم في المكان", sets: 2, reps: "2 دقيقة", rest: "60 ثانية", description: "كارديو خفيف" }
        ],
        cooldown: [
          { name: "شد شامل لجميع العضلات", duration: "10 دقائق" },
          { name: "تنفس عميق واسترخاء", duration: "5 دقائق" }
        ]
      }
    },
    {
      day: 2,
      title: "يوم نشط للتعافي",
      type: "نشاط خفيف",
      duration: "30 دقيقة",
      exercises: {
        warmup: [
          { name: "مشي بطيء", duration: "5 دقائق" },
          { name: "حركات لطيفة", duration: "3 دقائق" }
        ],
        main: [
          { name: "يوجا أو تاي تشي", sets: 1, reps: "15 دقائق", rest: "", description: "حركات هادئة ومتدفقة" },
          { name: "مشي نشط", sets: 1, reps: "7 دقائق", rest: "", description: "وتيرة مريحة" }
        ],
        cooldown: [
          { name: "شد لطيف", duration: "5 دقائق" }
        ]
      }
    },
    {
      day: 3,
      title: "تدريب القوة الوظيفية",
      type: "قوة وظيفية",
      duration: "50 دقيقة",
      exercises: {
        warmup: [
          { name: "إحماء ديناميكي", duration: "7 دقائق" },
          { name: "تحضير العضلات", duration: "3 دقائق" }
        ],
        main: [
          { name: "سكوات مع ضغط علوي", sets: 4, reps: "12-15", rest: "90 ثانية", description: "حركة مركبة" },
          { name: "ديدليفت بوزن الجسم", sets: 4, reps: "12-15", rest: "90 ثانية", description: "تقنية صحيحة" },
          { name: "ضغط مع لف الجذع", sets: 3, reps: "10-12", rest: "90 ثانية", description: "قوة وظيفية" },
          { name: "لانج متعدد الاتجاهات", sets: 3, reps: "8-10 لكل اتجاه", rest: "90 ثانية", description: "حركة في جميع المستويات" },
          { name: "بلانك مع حركة", sets: 3, reps: "45-60 ثانية", rest: "60 ثانية", description: "ثبات وحركة" },
          { name: "تمارين توازن", sets: 2, reps: "1 دقيقة", rest: "45 ثانية", description: "وقوف على ساق واحدة مع حركات" }
        ],
        cooldown: [
          { name: "شد مكثف", duration: "12 دقائق" },
          { name: "تدليك ذاتي", duration: "3 دقائق" }
        ]
      }
    }
  ]
};

// قوالب إضافية للخيارات المتنوعة
export const quickFitnessTemplate = {
  name: "خطة اللياقة السريعة",
  description: "للأشخاص المشغولين - تمارين سريعة وفعالة",
  mealPlan: {
    breakfast: {
      title: "فطار سريع ومغذي",
      items: ["سموذي بروتين بالفواكه", "توست بزبدة اللوز", "شاي أخضر"],
      calories: 380,
      protein: 20,
      carbs: 35,
      fats: 15
    },
    snack1: {
      title: "سناك سريع",
      items: ["مكسرات مختلطة", "تمر 2 حبة"],
      calories: 180,
      protein: 5,
      carbs: 22,
      fats: 9
    },
    lunch: {
      title: "غداء سريع التحضير",
      items: ["تونة بالسلطة", "خبز بيتا حبوب كاملة", "فواكه موسمية"],
      calories: 450,
      protein: 25,
      carbs: 40,
      fats: 18
    },
    snack2: {
      title: "وجبة خفيفة عملية",
      items: ["زبادي بالعسل", "حفنة من التوت"],
      calories: 160,
      protein: 10,
      carbs: 22,
      fats: 4
    },
    dinner: {
      title: "عشاء سهل التحضير",
      items: ["دجاج مشوي جاهز", "خضار مجمدة مطبوخة", "أرز سريع التحضير"],
      calories: 420,
      protein: 28,
      carbs: 35,
      fats: 14
    }
  },
  workoutPlan: [
    {
      day: 1,
      title: "تمرين سريع - 15 دقيقة",
      type: "سريع",
      duration: "15 دقيقة",
      exercises: {
        warmup: [
          { name: "جري في المكان", duration: "2 دقيقة" }
        ],
        main: [
          { name: "دورة سريعة: ضغط - سكوات - بلانك", sets: 3, reps: "45 ثانية كل تمرين", rest: "15 ثانية بين التمارين", description: "بدون راحة بين المجموعات" },
          { name: "جمبنج جاكس", sets: 2, reps: "30 ثانية", rest: "30 ثانية", description: "كارديو سريع" }
        ],
        cooldown: [
          { name: "شد سريع", duration: "3 دقائق" }
        ]
      }
    },
    {
      day: 2,
      title: "كارديو سريع",
      type: "كارديو سريع",
      duration: "12 دقيقة",
      exercises: {
        warmup: [
          { name: "مشي سريع", duration: "2 دقيقة" }
        ],
        main: [
          { name: "هيت سريع: بيربي - ماونتن كلايمرز", sets: 4, reps: "30 ثانية", rest: "30 ثانية", description: "تبديل بين التمرينين" }
        ],
        cooldown: [
          { name: "شد وتبريد", duration: "2 دقيقة" }
        ]
      }
    }
  ]
};

// جميع القوالب المتاحة
export const allTemplates = [
  beginnerTemplate,
  classicTemplate,
  femaleTemplate,
  intensiveTemplate,
  athleticTemplate,
  healthyBalancedTemplate,
  quickFitnessTemplate
];

// دالة لاختيار القالب المناسب بناءً على البيانات
export function selectTemplate(userData: any): any {
  const { gender, experienceLevel, goal, age, workoutPreference } = userData;
  
  // خوارزمية ذكية لاختيار القالب
  if (workoutPreference === "home" && experienceLevel === "beginner") {
    return beginnerTemplate;
  }
  
  if (gender === "female" && (goal === "maintain" || goal === "improve_fitness")) {
    return femaleTemplate;
  }
  
  if (experienceLevel === "advanced" && (goal === "build_muscle" || goal === "lose_weight")) {
    return Math.random() > 0.5 ? intensiveTemplate : athleticTemplate;
  }
  
  if (age < 25 && experienceLevel === "intermediate") {
    return quickFitnessTemplate;
  }
  
  if (goal === "improve_fitness" || goal === "maintain") {
    return healthyBalancedTemplate;
  }
  
  // اختيار عشوائي من القوالب المناسبة للتنويع
  const suitableTemplates = [classicTemplate, healthyBalancedTemplate];
  return suitableTemplates[Math.floor(Math.random() * suitableTemplates.length)];
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
  } else if (userData.experienceLevel === "advanced") {
    customizedPlan.workoutPlan.forEach((workout: any) => {
      workout.exercises.main.forEach((exercise: any) => {
        if (exercise.sets < 4) exercise.sets += 1;
        if (exercise.reps.includes("-")) {
          const [min, max] = exercise.reps.split("-");
          exercise.reps = `${Math.max(parseInt(min), parseInt(min) + 2)}-${parseInt(max) + 5}`;
        }
      });
    });
  }
  
  return customizedPlan;
}
