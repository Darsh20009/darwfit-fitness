
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
  // الاثنين - يوم الأرجل
  "1": {
    title: "تمارين الأرجل",
    description: "تمارين تركز على عضلات الأرجل",
    exercises: {
      "تمارين الرجلين": [
        { name: "Leg Extension", sets: 4, reps: "12 تكرار مع تركيز وثبات" },
        { name: "Prone Leg Curl", sets: 4, reps: "12 تكرار مع تحكم" },
        { name: "Leg Down (سكوات على جهاز)", sets: 3, reps: "10 تكرار" },
        { name: "Leg Press", sets: 4, reps: "10 تكرار" }
      ]
    }
  },
  // الثلاثاء - صدر وترايسبس
  "2": {
    title: "تمارين الصدر والترايسبس",
    description: "تمارين تركز على عضلات الصدر والترايسبس",
    exercises: {
      "تمارين الصدر": [
        { name: "Seated Cable Bench Press", sets: 4, reps: "12 تكرار" },
        { name: "Pec Fly", sets: 4, reps: "12 تكرار" },
        { name: "Sleeping Horizontal Hand Weights", sets: 3, reps: "10 تكرار" }
      ],
      "تمارين الترايسبس": [
        { name: "Triceps Inside Weights", sets: 3, reps: "12 تكرار" },
        { name: "Stand Out Tri Zigzag Bar", sets: 3, reps: "12 تكرار" }
      ]
    }
  },
  // الأربعاء - ظهر وبايسبس
  "3": {
    title: "تمارين الظهر والبايسبس",
    description: "تمارين تركز على عضلات الظهر والبايسبس",
    exercises: {
      "تمارين الظهر": [
        { name: "Lat Pull Down", sets: 4, reps: "10 تكرار" },
        { name: "Low Row", sets: 4, reps: "12 تكرار" },
        { name: "D.Y. Row", sets: 4, reps: "12 تكرار" }
      ],
      "تمارين البايسبس": [
        { name: "Biceps Curl", sets: 3, reps: "15 تكرار" },
        { name: "Qatania", sets: 3, reps: "15 تكرار" }
      ]
    }
  },
  // الخميس - أكتاف
  "4": {
    title: "تمارين الأكتاف",
    description: "تمارين تركز على عضلات الأكتاف",
    exercises: {
      "تمارين الأكتاف": [
        { name: "Fly Shoulder Back", sets: 4, reps: "12 تكرار" },
        { name: "Fly Side Shoulder", sets: 4, reps: "12 تكرار" },
        { name: "Vertical Front Raise Side Hand", sets: 3, reps: "10 تكرار" },
        { name: "Shoulder Back High Drag", sets: 3, reps: "15 تكرار" }
      ]
    }
  },
  // الجمعة - كارديو خفيف
  "5": {
    title: "كارديو",
    description: "تمارين كارديو خفيفة",
    exercises: {
      "تمارين الكارديو": [
        { name: "مشي سريع", sets: 1, reps: "20 دقيقة" },
        { name: "دراجة ثابتة", sets: 1, reps: "15 دقيقة" }
      ]
    }
  },
  // السبت والأحد - راحة
  "6": {
    title: "راحة",
    description: "يوم راحة كامل",
    exercises: {}
  },
  "0": {
    title: "راحة",
    description: "يوم راحة كامل",
    exercises: {}
  }
};

export function getWorkoutByDayIndex(dayIndex: number): WorkoutDay {
  return workoutPlan[dayIndex.toString()];
}

export function getWorkoutInstructions() {
  return [
    "التركيز على جودة الأداء والتحكم بالحركة",
    "التدرج في الأداء من خلال زيادة التكرارات أو التحكم في الحركة",
    "الراحة بين المجموعات 45-60 ثانية",
    "عند الشعور بالتعب خذ راحة إضافية دون خمول زائد",
    "التأكد من الأداء الصحيح للتمارين دون استعجال"
  ];
}

export function getWorkoutSummary(dayIndex: number): { name: string; description: string }[] {
  const workout = getWorkoutByDayIndex(dayIndex);
  const summary: { name: string; description: string }[] = [];

  Object.entries(workout.exercises).forEach(([groupName, exerciseGroup]) => {
    exerciseGroup.forEach(exercise => {
      summary.push({
        name: exercise.name,
        description: `${exercise.sets} مجموعات × ${exercise.reps}`
      });
    });
  });

  return summary;
}
