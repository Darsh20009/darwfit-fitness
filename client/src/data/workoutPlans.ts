interface Exercise {
  name: string;
  sets: number;
  reps: string;
}

interface WorkoutDay {
  title: string;
  description: string;
  exercises: {
    [key: string]: Exercise[];
  };
}

interface WorkoutPlan {
  [key: string]: WorkoutDay;
}

const workoutPlan: WorkoutPlan = {
  // Saturday
  "6": {
    title: "تمارين الصدر والتراي",
    description: "تمارين تركز على عضلات الصدر والترايسبس",
    exercises: {
      "تمارين الصدر": [
        { name: "Bench Press", sets: 4, reps: "8-10 تكرارات" },
        { name: "Incline Dumbbell Press", sets: 4, reps: "8-12 تكرار" },
        { name: "Cable Fly", sets: 3, reps: "12 تكرار" }
      ],
      "تمارين التراي": [
        { name: "Tricep Pushdown", sets: 3, reps: "12 تكرار" },
        { name: "Skull Crushers", sets: 3, reps: "10 تكرار" }
      ]
    }
  },
  // Sunday
  "0": {
    title: "تمارين الظهر والباي",
    description: "تمارين تركز على عضلات الظهر والبايسبس",
    exercises: {
      "تمارين الظهر": [
        { name: "Deadlift", sets: 4, reps: "6-8 تكرارات" },
        { name: "Pull-ups", sets: 4, reps: "أقصى عدد تكرارات" },
        { name: "Barbell Row", sets: 4, reps: "8 تكرارات" },
        { name: "Lat Pulldown", sets: 3, reps: "12 تكرار" }
      ],
      "تمارين الباي": [
        { name: "Dumbbell Curl", sets: 3, reps: "10 تكرارات" },
        { name: "Hammer Curl", sets: 3, reps: "10 تكرارات" }
      ]
    }
  },
  // Monday
  "1": {
    title: "تمارين الأرجل",
    description: "تمارين تركز على عضلات الأرجل",
    exercises: {
      "تمارين الرجلين": [
        { name: "Squats", sets: 4, reps: "8-12 تكرار" },
        { name: "Lunges", sets: 3, reps: "10 خطوات لكل رجل" },
        { name: "Leg Press", sets: 4, reps: "10 تكرارات" },
        { name: "Calf Raise", sets: 4, reps: "20 تكرار" }
      ]
    }
  },
  // Tuesday
  "2": {
    title: "تمارين الأكتاف والتراي",
    description: "تمارين تركز على عضلات الأكتاف والترايسبس",
    exercises: {
      "تمارين الأكتاف": [
        { name: "Overhead Press", sets: 4, reps: "8-12 تكرار" },
        { name: "Lateral Raise", sets: 3, reps: "15 تكرار" },
        { name: "Rear Delt Fly", sets: 3, reps: "15 تكرار" }
      ],
      "تمارين التراي": [
        { name: "Close-Grip Bench Press", sets: 3, reps: "8-10 تكرارات" }
      ]
    }
  },
  // Wednesday
  "3": {
    title: "تمارين الجسم كامل (Full Body)",
    description: "تمارين تشمل جميع عضلات الجسم",
    exercises: {
      "تمارين الجسم كامل": [
        { name: "Deadlift", sets: 4, reps: "5-6 تكرار" },
        { name: "Bench Press", sets: 4, reps: "8 تكرار" },
        { name: "Squats", sets: 4, reps: "8 تكرار" },
        { name: "Pull-ups", sets: 4, reps: "أقصى عدد تكرارات" }
      ]
    }
  },
  // Thursday
  "4": {
    title: "كارديو فقط",
    description: "تمارين الكارديو لحرق الدهون",
    exercises: {
      "تمارين الكارديو": [
        { name: "مشي سريع", sets: 1, reps: "30-40 دقيقة" },
        { name: "مشي بميل مرتفع", sets: 1, reps: "اختياري" }
      ]
    }
  },
  // Friday
  "5": {
    title: "راحة",
    description: "يوم راحة للجسم واستشفاء العضلات",
    exercises: {
      "استشفاء": [
        { name: "تمارين إطالة (اختياري)", sets: 1, reps: "15-20 دقيقة" },
        { name: "مشي خفيف (اختياري)", sets: 1, reps: "15 دقيقة" }
      ]
    }
  }
};

export function getWorkoutByDayIndex(dayIndex: number): WorkoutDay {
  return workoutPlan[dayIndex.toString()];
}

export function getWorkoutInstructions() {
  return [
    "كل تمرين مع 4 مجموعات وراحة 45 إلى 60 ثانية بين المجموعات",
    "إذا شعرت بتعب شديد، خذ راحة إضافية بسيطة ولكن بدون خمول زائد",
    "يجب التأكد أن كل تمرين يتم بأداء صحيح بدون استعجال أو اختصار",
    "عند شعورك بأي ألم غريب أو إرهاق شديد يجب التوقف فوراً واستشارة المدرب أو الطبيب",
    "الاهتمام بالنوم 7 إلى 9 ساعات يومياً لتعزيز الاستشفاء العضلي"
  ];
}

export function getWorkoutSummary(dayIndex: number): { name: string; description: string }[] {
  const workout = getWorkoutByDayIndex(dayIndex);
  const summary: { name: string; description: string }[] = [];
  
  Object.values(workout.exercises).forEach(exerciseGroup => {
    exerciseGroup.forEach(exercise => {
      summary.push({
        name: exercise.name,
        description: `${exercise.sets} مجموعات × ${exercise.reps}`
      });
    });
  });
  
  return summary;
}
