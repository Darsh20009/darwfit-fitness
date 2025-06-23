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

const twiceAWeekWorkoutPlan: WorkoutPlan = {
  // اليوم الأول - تمارين الدفع 1 (صدر، أكتاف، ترايسبس)
  "0": {
    title: "تمارين الدفع 1 (صدر وترايسبس)",
    description: "تمارين تركز على تقوية عضلات الصدر، الأكتاف الأمامية والجانبية، والترايسبس",
    exercises: {
      "تمارين الصدر": [
        { name: "Seated Cable Bench Press", sets: 4, reps: "12 تكرار" },
        { name: "Pec Fly", sets: 4, reps: "12 تكرار" },
        { name: "Sleeping Horizontal Hand Weights", sets: 3, reps: "10 تكرار" }
      ],
      "تمارين الترايسبس": [
        { name: "Triceps Extension", sets: 4, reps: "12 تكرار" },
        { name: "Stand Tri Out/In", sets: 4, reps: "12 تكرار" }
      ],
       "تمارين الأكتاف": [
        { name: "Vertical Front Raise Side Hand", sets: 3, reps: "10 تكرار" },
      ]
    }
  },
  // اليوم الثاني - تمارين السحب 1 (ظهر، بايسبس)
  "1": {
    title: "تمارين السحب 1 (ظهر وبايسبس)",
    description: "تمارين تركز على تقوية عضلات الظهر العلوية والسفلية، والبايسبس",
    exercises: {
      "تمارين الظهر": [
        { name: "Lat Pull Down", sets: 4, reps: "10 تكرار" },
        { name: "Low Row", sets: 4, reps: "12 تكرار" },
        { name: "D.Y. Row", sets: 4, reps: "12 تكرار" }
      ],
      "تمارين البايسبس": [
        { name: "Biceps Curl", sets: 4, reps: "12 تكرار" },
        { name: "Qatania", sets: 3, reps: "15 تكرار" }
      ]
    }
  },
  // اليوم الثالث - تمارين الأرجل والبطن
  "2": {
    title: "تمارين الأرجل والبطن 1",
    description: "تمارين شاملة للأرجل مع التركيز على عضلات البطن",
    exercises: {
      "تمارين الرجلين": [
        { name: "Leg Press", sets: 4, reps: "10 تكرار" },
        { name: "Leg Extension", sets: 4, reps: "12 تكرار" },
        { name: "Prone Leg Curl", sets: 4, reps: "12 تكرار" },
        { name: "Standing Calf Raise", sets: 4, reps: "20 تكرار" }
      ],
      "تمارين البطن": [
        { name: "Crunches", sets: 3, reps: "20 تكرار" }
      ]
    }
  },
  // اليوم الرابع - تمارين الدفع 2 (أكتاف، صدر، ترايسبس)
  "3": {
    title: "تمارين الدفع 2 (أكتاف وصدر)",
    description: "تمارين تركز على تقوية عضلات الأكتاف بشكل أساسي، مع تمرين الصدر والترايسبس",
    exercises: {
      "تمارين الأكتاف": [
        { name: "Horizontal Hand Weights Shoulder", sets: 4, reps: "12 تكرار" },
        { name: "Fly Side Shoulder", sets: 4, reps: "12 تكرار" },
        { name: "Fly Shoulder Back", sets: 4, reps: "12 تكرار" },
        { name: "Shoulder Back High Drag", sets: 3, reps: "15 تكرار" }
      ],
      "تمارين الصدر": [
        { name: "Cable Cross", sets: 3, reps: "12 تكرار" }
      ],
      "تمارين الترايسبس": [
        { name: "Triceps Inside Weights", sets: 3, reps: "12 تكرار" }
      ]
    }
  },
  // اليوم الخامس - تمارين السحب 2 (ظهر، بايسبس، ترابيس)
  "4": {
    title: "تمارين السحب 2 (ظهر وترابيس)",
    description: "تمارين متنوعة للظهر مع التركيز على الترابيس والبايسبس",
    exercises: {
      "تمارين الظهر": [
        { name: "Pull Front Lats", sets: 4, reps: "10 تكرار" },
        { name: "Dip/Chin Assist", sets: 3, reps: "أقصى عدد ممكن" },
        { name: "Deadlift بدون وزن ثقيل", sets: 3, reps: "10 تكرار" }
      ],
      "تمارين البايسبس": [
        { name: "Stand Bar Short Biceps", sets: 4, reps: "12 تكرار" },
        { name: "Rest Weights Curl", sets: 3, reps: "15 تكرار" }
      ],
      "تمارين الترابيس": [
        { name: "Traps Side Hand Weights", sets: 3, reps: "15 تكرار" }
      ]
    }
  },
  // اليوم السادس - تمارين الأرجل والبطن 2
  "5": {
    title: "تمارين الأرجل والبطن 2",
    description: "تمارين أرجل متنوعة مع التركيز على التحكم وثبات الحركة، وتمارين بطن سفلية",
    exercises: {
      "تمارين الرجلين": [
        { name: "Leg Down (سكوات على جهاز)", sets: 3, reps: "10 تكرار" },
        { name: "Leg Extension", sets: 4, reps: "12 تكرار مع تركيز وثبات" },
        { name: "Prone Leg Curl", sets: 4, reps: "12 تكرار مع تحكم" },
        { name: "Standing Calf Raise", sets: 4, reps: "20 تكرار" }
      ],
      "تمارين البطن": [
        { name: "Leg Raises", sets: 3, reps: "20 تكرار" }
      ]
    }
  },
  // اليوم السابع - راحة
  "6": {
    title: "راحة",
    description: "يوم راحة كامل. يمكن ممارسة إطالات خفيفة أو مشي بسيط",
    exercises: {}
  }
};

export function getWorkoutByDayIndex(dayIndex: number): WorkoutDay {
  return twiceAWeekWorkoutPlan[dayIndex.toString()];
}

export function getWorkoutInstructions() {
  return [
    "الخطة مصممة لمدة ثلاثة أشهر متواصلة",
    "التدريبات تعتمد على التدرج في الأداء (زيادة التكرارات أو التحكم في الحركة)",
    "يجب التركيز على جودة الأداء والتحكم بالحركة",
    "الراحة بين المجموعات 45-60 ثانية",
    "عند الشعور بالتعب خذ راحة إضافية دون خمول زائد"
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