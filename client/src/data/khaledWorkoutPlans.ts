// خطة خالد محمد للتمارين - خطة سنوية متطورة (5 أيام أسبوعياً)

interface KhaledExercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  weight?: number;
  notes?: string;
  description?: string;
}

interface KhaledWorkoutDay {
  title: string;
  description: string;
  targetMuscles: string;
  duration: string;
  phase: string;
  dayOfWeek: string;
  exercises: {
    warmup: KhaledExercise[];
    main: KhaledExercise[];
    cooldown: KhaledExercise[];
  };
}

interface KhaledWorkoutPlan {
  [key: string]: KhaledWorkoutDay;
}

// المرحلة 1: التأسيس (أشهر 1-3)
const foundationPhaseWorkouts: KhaledWorkoutPlan = {
  monday: {
    title: "صدر + ترايسبس - التأسيس",
    description: "تعلم الحركات الأساسية وبناء القوة التحملية",
    targetMuscles: "عضلات الصدر والترايسبس",
    duration: "60-75 دقيقة",
    phase: "المرحلة الأولى - التأسيس",
    dayOfWeek: "الاثنين",
    exercises: {
      warmup: [
        {
          name: "المشي السريع أو الجري الخفيف",
          sets: 1,
          reps: "10 دقائق",
          rest: "0",
          description: "لتسخين الجسم وتحضير العضلات"
        },
        {
          name: "تمارين الإطالة للصدر والكتفين",
          sets: 2,
          reps: "30 ثانية",
          rest: "30 ثانية",
          description: "إطالة عضلات الصدر والكتفين"
        }
      ],
      main: [
        {
          name: "بنش بريس (باربل)",
          sets: 4,
          reps: "12-15",
          rest: "60 ثانية",
          description: "التمرين الأساسي لعضلات الصدر"
        },
        {
          name: "انكلين دمبل بريس",
          sets: 3,
          reps: "12-15",
          rest: "60 ثانية",
          description: "لتطوير الجزء العلوي من الصدر"
        },
        {
          name: "ديبنز (غطسات)",
          sets: 3,
          reps: "10-12",
          rest: "60 ثانية",
          description: "تمرين وزن الجسم للصدر والترايسبس"
        },
        {
          name: "كابل باكدون (ترايسبس)",
          sets: 4,
          reps: "12-15",
          rest: "45 ثانية",
          description: "لتقوية عضلة الترايسبس الخلفية"
        }
      ],
      cooldown: [
        {
          name: "إطالة عضلات الصدر",
          sets: 2,
          reps: "30 ثانية",
          rest: "30 ثانية",
          description: "إطالة للتعافي"
        },
        {
          name: "إطالة الترايسبس",
          sets: 2,
          reps: "30 ثانية",
          rest: "30 ثانية",
          description: "تهدئة العضلات"
        }
      ]
    }
  },
  tuesday: {
    title: "ظهر + بايسبس - التأسيس",
    description: "تقوية عضلات الظهر والبايسبس",
    targetMuscles: "عضلات الظهر والبايسبس",
    duration: "60-75 دقيقة",
    phase: "المرحلة الأولى - التأسيس",
    dayOfWeek: "الثلاثاء",
    exercises: {
      warmup: [
        {
          name: "المشي السريع",
          sets: 1,
          reps: "8 دقائق",
          rest: "0"
        },
        {
          name: "تمارين دوران الكتفين",
          sets: 2,
          reps: "15 دورة",
          rest: "30 ثانية"
        }
      ],
      main: [
        {
          name: "لات بولداون",
          sets: 4,
          reps: "12-15",
          rest: "60 ثانية",
          description: "التمرين الأساسي لعضلات الظهر العلوية"
        },
        {
          name: "باربل رو",
          sets: 4,
          reps: "12-15",
          rest: "60 ثانية",
          description: "لتقوية منتصف الظهر"
        },
        {
          name: "فيس بول (كابل)",
          sets: 3,
          reps: "12-15",
          rest: "45 ثانية",
          description: "لتقوية الجزء الخلفي من الكتفين"
        },
        {
          name: "هامر كيرل (بايسبس)",
          sets: 4,
          reps: "12-15",
          rest: "45 ثانية",
          description: "لتطوير عضلة البايسبس"
        }
      ],
      cooldown: [
        {
          name: "إطالة عضلات الظهر",
          sets: 2,
          reps: "30 ثانية",
          rest: "30 ثانية"
        },
        {
          name: "إطالة البايسبس",
          sets: 2,
          reps: "30 ثانية",
          rest: "30 ثانية"
        }
      ]
    }
  },
  wednesday: {
    title: "أرجل + أكتاف - التأسيس",
    description: "تقوية عضلات الأرجل والأكتاف",
    targetMuscles: "عضلات الأرجل والأكتاف",
    duration: "70-85 دقيقة",
    phase: "المرحلة الأولى - التأسيس",
    dayOfWeek: "الأربعاء",
    exercises: {
      warmup: [
        {
          name: "المشي والجري الخفيف",
          sets: 1,
          reps: "10 دقائق",
          rest: "0"
        },
        {
          name: "تمارين الإحماء للأرجل",
          sets: 2,
          reps: "20 تكرار",
          rest: "30 ثانية"
        }
      ],
      main: [
        {
          name: "سكوات (باربل)",
          sets: 4,
          reps: "12-15",
          rest: "90 ثانية",
          description: "التمرين الأساسي لعضلات الأرجل"
        },
        {
          name: "ليغ بريس",
          sets: 4,
          reps: "15-20",
          rest: "60 ثانية",
          description: "لتقوية عضلات الفخذ الأمامية"
        },
        {
          name: "كالف رايز",
          sets: 4,
          reps: "20-25",
          rest: "45 ثانية",
          description: "لتقوية عضلات السمانة"
        },
        {
          name: "ميلتري بريس (أكتاف)",
          sets: 4,
          reps: "12-15",
          rest: "60 ثانية",
          description: "التمرين الأساسي للأكتاف"
        }
      ],
      cooldown: [
        {
          name: "إطالة عضلات الأرجل",
          sets: 3,
          reps: "30 ثانية",
          rest: "30 ثانية"
        },
        {
          name: "إطالة الأكتاف",
          sets: 2,
          reps: "30 ثانية",
          rest: "30 ثانية"
        }
      ]
    }
  },
  friday: {
    title: "صدر + ترايسبس - التأسيس (2)",
    description: "التكرار الثاني لعضلات الصدر والترايسبس",
    targetMuscles: "عضلات الصدر والترايسبس",
    duration: "60-75 دقيقة",
    phase: "المرحلة الأولى - التأسيس",
    dayOfWeek: "الجمعة",
    exercises: {
      warmup: [
        {
          name: "المشي السريع",
          sets: 1,
          reps: "8 دقائق",
          rest: "0"
        },
        {
          name: "تحريك الكتفين",
          sets: 2,
          reps: "15 دورة",
          rest: "30 ثانية"
        }
      ],
      main: [
        {
          name: "دمبل بريس (مسطح)",
          sets: 4,
          reps: "12-15",
          rest: "60 ثانية",
          description: "تمرين دمبل للصدر"
        },
        {
          name: "كابل فلاي",
          sets: 3,
          reps: "12-15",
          rest: "45 ثانية",
          description: "لتحديد عضلات الصدر"
        },
        {
          name: "سكول كراشر (ترايسبس)",
          sets: 4,
          reps: "12-15",
          rest: "45 ثانية",
          description: "تمرين الترايسبس بالباربل"
        },
        {
          name: "ترايسبس ديبنز",
          sets: 3,
          reps: "10-12",
          rest: "45 ثانية",
          description: "تمرين الترايسبس على الكرسي"
        }
      ],
      cooldown: [
        {
          name: "إطالة الصدر",
          sets: 2,
          reps: "30 ثانية",
          rest: "30 ثانية"
        },
        {
          name: "إطالة الترايسبس",
          sets: 2,
          reps: "30 ثانية",
          rest: "30 ثانية"
        }
      ]
    }
  },
  saturday: {
    title: "ظهر + بايسبس - التأسيس (2)",
    description: "التكرار الثاني لعضلات الظهر والبايسبس",
    targetMuscles: "عضلات الظهر والبايسبس",
    duration: "60-75 دقيقة",
    phase: "المرحلة الأولى - التأسيس",
    dayOfWeek: "السبت",
    exercises: {
      warmup: [
        {
          name: "الجري الخفيف",
          sets: 1,
          reps: "8 دقائق",
          rest: "0"
        },
        {
          name: "تمارين الكتفين",
          sets: 2,
          reps: "15 تكرار",
          rest: "30 ثانية"
        }
      ],
      main: [
        {
          name: "تشين أب (العقلة)",
          sets: 4,
          reps: "8-12",
          rest: "90 ثانية",
          description: "تمرين وزن الجسم للظهر"
        },
        {
          name: "تي-بار رو",
          sets: 4,
          reps: "12-15",
          rest: "60 ثانية",
          description: "لتقوية منتصف الظهر"
        },
        {
          name: "بريشر كيرل (بايسبس)",
          sets: 4,
          reps: "12-15",
          rest: "45 ثانية",
          description: "تمرين البايسبس بالدمبل"
        },
        {
          name: "سبايدر كيرل",
          sets: 3,
          reps: "12-15",
          rest: "45 ثانية",
          description: "تمرين البايسبس المتقدم"
        }
      ],
      cooldown: [
        {
          name: "إطالة الظهر",
          sets: 2,
          reps: "30 ثانية",
          rest: "30 ثانية"
        },
        {
          name: "إطالة البايسبس",
          sets: 2,
          reps: "30 ثانية",
          rest: "30 ثانية"
        }
      ]
    }
  }
};

// المرحلة 2: التضخيم (أشهر 4-6)
const hypertrophyPhaseWorkouts: KhaledWorkoutPlan = {
  monday: {
    title: "صدر + ترايسبس - التضخيم",
    description: "زيادة حجم العضلات عبر زيادة الأوزان",
    targetMuscles: "عضلات الصدر والترايسبس",
    duration: "75-90 دقيقة",
    phase: "المرحلة الثانية - التضخيم",
    dayOfWeek: "الاثنين",
    exercises: {
      warmup: [
        {
          name: "الجري المتوسط",
          sets: 1,
          reps: "10 دقائق",
          rest: "0"
        },
        {
          name: "إحماء بأوزان خفيفة",
          sets: 2,
          reps: "15 تكرار",
          rest: "45 ثانية"
        }
      ],
      main: [
        {
          name: "بنش بريس (أوزان أعلى بـ 10-15%)",
          sets: 5,
          reps: "10-12",
          rest: "90 ثانية",
          description: "زيادة الوزن تدريجياً"
        },
        {
          name: "انكلين دمبل بريس",
          sets: 4,
          reps: "10-12",
          rest: "60 ثانية"
        },
        {
          name: "ديكلين بنش بريس",
          sets: 3,
          reps: "10-12",
          rest: "60 ثانية",
          description: "تمرين جديد للجزء السفلي من الصدر"
        },
        {
          name: "كابل فلاي",
          sets: 4,
          reps: "12-15",
          rest: "45 ثانية"
        },
        {
          name: "كلوز جريب بنش بريس",
          sets: 4,
          reps: "10-12",
          rest: "60 ثانية",
          description: "للترايسبس"
        }
      ],
      cooldown: [
        {
          name: "إطالة شاملة للصدر",
          sets: 3,
          reps: "45 ثانية",
          rest: "30 ثانية"
        }
      ]
    }
  },
  tuesday: {
    title: "ظهر + بايسبس - التضخيم",
    description: "إضافة تمارين جديدة وزيادة الكثافة",
    targetMuscles: "عضلات الظهر والبايسبس",
    duration: "75-90 دقيقة",
    phase: "المرحلة الثانية - التضخيم",
    dayOfWeek: "الثلاثاء",
    exercises: {
      warmup: [
        {
          name: "الجري والإحماء",
          sets: 1,
          reps: "10 دقائق",
          rest: "0"
        }
      ],
      main: [
        {
          name: "لات بولداون (أوزان أعلى)",
          sets: 5,
          reps: "10-12",
          rest: "90 ثانية"
        },
        {
          name: "باربل رو",
          sets: 4,
          reps: "10-12",
          rest: "75 ثانية"
        },
        {
          name: "كابل رو",
          sets: 4,
          reps: "12-15",
          rest: "60 ثانية",
          description: "تمرين إضافي جديد"
        },
        {
          name: "تي-بار رو",
          sets: 3,
          reps: "10-12",
          rest: "60 ثانية"
        },
        {
          name: "سوبر سيت: باربل كيرل + هامر كيرل",
          sets: 4,
          reps: "10 + 10",
          rest: "90 ثانية",
          description: "تمرين مركب للبايسبس"
        }
      ],
      cooldown: [
        {
          name: "إطالة الظهر والبايسبس",
          sets: 3,
          reps: "45 ثانية",
          rest: "30 ثانية"
        }
      ]
    }
  },
  wednesday: {
    title: "أرجل + أكتاف - التضخيم",
    description: "استبدال السكوات بفرونت سكوات",
    targetMuscles: "عضلات الأرجل والأكتاف",
    duration: "85-100 دقيقة",
    phase: "المرحلة الثانية - التضخيم",
    dayOfWeek: "الأربعاء",
    exercises: {
      warmup: [
        {
          name: "الجري وإحماء الأرجل",
          sets: 1,
          reps: "12 دقيقة",
          rest: "0"
        }
      ],
      main: [
        {
          name: "فرونت سكوات",
          sets: 5,
          reps: "8-10",
          rest: "120 ثانية",
          description: "بديل متقدم للسكوات العادي"
        },
        {
          name: "ليغ بريس (أوزان أعلى)",
          sets: 4,
          reps: "12-15",
          rest: "90 ثانية"
        },
        {
          name: "لنجز (خطوات)",
          sets: 4,
          reps: "12 لكل رجل",
          rest: "60 ثانية",
          description: "تمرين إضافي للأرجل"
        },
        {
          name: "ليغ كيرل",
          sets: 4,
          reps: "12-15",
          rest: "45 ثانية"
        },
        {
          name: "ميلتري بريس",
          sets: 5,
          reps: "10-12",
          rest: "75 ثانية"
        },
        {
          name: "لاتيرال رايز",
          sets: 4,
          reps: "12-15",
          rest: "45 ثانية"
        }
      ],
      cooldown: [
        {
          name: "إطالة شاملة للأرجل",
          sets: 4,
          reps: "60 ثانية",
          rest: "30 ثانية"
        }
      ]
    }
  },
  friday: {
    title: "صدر + ترايسبس - التضخيم (2)",
    description: "تقليل الراحة وزيادة الكثافة",
    targetMuscles: "عضلات الصدر والترايسبس",
    duration: "70-85 دقيقة",
    phase: "المرحلة الثانية - التضخيم",
    dayOfWeek: "الجمعة",
    exercises: {
      warmup: [
        {
          name: "إحماء سريع",
          sets: 1,
          reps: "8 دقائق",
          rest: "0"
        }
      ],
      main: [
        {
          name: "دمبل بريس",
          sets: 4,
          reps: "10-12",
          rest: "45 ثانية",
          description: "راحة أقل لزيادة الكثافة"
        },
        {
          name: "انكلين فلاي",
          sets: 4,
          reps: "12-15",
          rest: "45 ثانية"
        },
        {
          name: "كابل كروس أوفر",
          sets: 3,
          reps: "12-15",
          rest: "45 ثانية"
        },
        {
          name: "ديبنز",
          sets: 4,
          reps: "10-12",
          rest: "45 ثانية"
        },
        {
          name: "أوفر هيد ترايسبس إكستنشن",
          sets: 4,
          reps: "12-15",
          rest: "45 ثانية"
        }
      ],
      cooldown: [
        {
          name: "إطالة سريعة",
          sets: 2,
          reps: "30 ثانية",
          rest: "30 ثانية"
        }
      ]
    }
  },
  saturday: {
    title: "ظهر + بايسبس - التضخيم (2)",
    description: "سوبر سيت للبايسبس والترايسبس",
    targetMuscles: "عضلات الظهر والبايسبس",
    duration: "75-90 دقيقة",
    phase: "المرحلة الثانية - التضخيم",
    dayOfWeek: "السبت",
    exercises: {
      warmup: [
        {
          name: "إحماء شامل",
          sets: 1,
          reps: "10 دقائق",
          rest: "0"
        }
      ],
      main: [
        {
          name: "تشين أب (موزون)",
          sets: 4,
          reps: "8-10",
          rest: "90 ثانية",
          description: "إضافة وزن إضافي"
        },
        {
          name: "ديدليفت",
          sets: 4,
          reps: "6-8",
          rest: "120 ثانية",
          description: "تمرين جديد ومتقدم"
        },
        {
          name: "سيتد كابل رو",
          sets: 4,
          reps: "10-12",
          rest: "60 ثانية"
        },
        {
          name: "سوبر سيت: باربل كيرل + ترايسبس ديبنز",
          sets: 4,
          reps: "10 + 10",
          rest: "90 ثانية",
          description: "تمرين مركب للذراعين"
        }
      ],
      cooldown: [
        {
          name: "إطالة شاملة",
          sets: 3,
          reps: "45 ثانية",
          rest: "30 ثانية"
        }
      ]
    }
  }
};

// الحصول على خطة التمرين حسب اليوم والمرحلة
export function getKhaledWorkoutByDay(day: string, phase: number = 1): KhaledWorkoutDay {
  const dayKey = day.toLowerCase();
  
  if (phase === 1) {
    return foundationPhaseWorkouts[dayKey] || foundationPhaseWorkouts.monday;
  } else if (phase === 2) {
    return hypertrophyPhaseWorkouts[dayKey] || hypertrophyPhaseWorkouts.monday;
  }
  
  return foundationPhaseWorkouts[dayKey] || foundationPhaseWorkouts.monday;
}

// الحصول على خطة التمرين حسب رقم اليوم (0-6)
export function getKhaledWorkoutByDayIndex(dayIndex: number, phase: number = 1): KhaledWorkoutDay {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const workoutDays = ['monday', 'tuesday', 'wednesday', 'friday', 'saturday'];
  
  // تحديد أيام التمرين فقط
  const dayName = days[dayIndex];
  
  if (workoutDays.includes(dayName)) {
    return getKhaledWorkoutByDay(dayName, phase);
  }
  
  // إذا كان يوم راحة، أرجع تمرين اليوم التالي
  return getKhaledWorkoutByDay('monday', phase);
}

// الحصول على خطة التمرين حسب الشهر (1-12)
export function getKhaledWorkoutByMonth(month: number, dayIndex: number): KhaledWorkoutDay {
  let phase = 1;
  
  if (month >= 1 && month <= 3) {
    phase = 1; // التأسيس
  } else if (month >= 4 && month <= 6) {
    phase = 2; // التضخيم
  } else if (month >= 7 && month <= 9) {
    phase = 3; // القوة (سنضيفها لاحقاً)
  } else {
    phase = 4; // التضخيم النهائي (سنضيفها لاحقاً)
  }
  
  return getKhaledWorkoutByDayIndex(dayIndex, phase);
}

// الحصول على إرشادات التمرين
export function getKhaledWorkoutInstructions() {
  return {
    phases: [
      {
        phase: 1,
        name: "التأسيس",
        months: "1-3",
        goal: "تعلم الحركات الأساسية وبناء القوة التحملية",
        reps: "12-15",
        rest: "60 ثانية",
        frequency: "5 أيام أسبوعياً"
      },
      {
        phase: 2,
        name: "التضخيم",
        months: "4-6",
        goal: "زيادة حجم العضلات عبر زيادة الأوزان",
        reps: "10-12",
        rest: "45-90 ثانية",
        frequency: "5 أيام أسبوعياً"
      }
    ],
    generalTips: [
      "استهداف كل عضلة مرتين أسبوعياً",
      "زيادة الأوزان تدريجياً كل أسبوعين",
      "الراحة الكاملة يومي الخميس والأحد",
      "شرب الماء بكثرة أثناء التمرين",
      "التركيز على الأداء الصحيح قبل زيادة الوزن"
    ],
    alternatives: [
      "إذا لم تتوفر الأوزان: استخدم زجاجات ماء ممتلئة رملاً",
      "بديل الباربل: حقيبة ظهر ثقيلة",
      "بديل الجيم: تمارين وزن الجسم في المنزل",
      "بديل الدمبل: أكياس من الأرز أو السكر"
    ]
  };
}

// الحصول على ملخص التمرين لليوم
export function getKhaledWorkoutSummary(dayIndex: number, phase: number = 1): { name: string; description: string }[] {
  const workout = getKhaledWorkoutByDayIndex(dayIndex, phase);
  
  return [
    { name: workout.title, description: workout.description },
    { name: "العضلات المستهدفة", description: workout.targetMuscles },
    { name: "مدة التمرين", description: workout.duration },
    { name: "المرحلة", description: workout.phase }
  ];
}

// نظام التتبع والتطور
export function getKhaledProgressTracking() {
  return {
    tracking: [
      "سجل الأوزان في دفتر أو تطبيق",
      "زيادة 2.5-5 كجم شهرياً",
      "التقاط صور شهرية للتقييم",
      "قياس محيط العضلات كل شهرين"
    ],
    rotation: [
      "الأسبوع 1: أوزان ثقيلة (6-8 تكرارات)",
      "الأسبوع 2: أوزان متوسطة (10-12 تكرار)",
      "الأسبوع 3: أوزان خفيفة (15-20 تكرار) + سوبر سيت",
      "الأسبوع 4: تمارين مختلفة (كيتلبل - وزن الجسم)"
    ],
    continuity: [
      "في الشهر 6: غير ترتيب التمارين",
      "في الشهر 9: أضف تمارين الكاليستينكس",
      "استخدم الأدوات البديلة عند الحاجة",
      "حافظ على استهداف كل عضلة مرتين أسبوعياً"
    ]
  };
}

export type { KhaledExercise, KhaledWorkoutDay, KhaledWorkoutPlan };