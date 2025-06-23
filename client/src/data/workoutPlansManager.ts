import { WorkoutDay } from './workoutPlans';

// خطة تمارين للمبتدئين
const beginnerPlan: { [key: string]: WorkoutDay } = {
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
        { name: "Vertical Front Raise Side Hand", sets: 3, reps: "10 تكرار" }
      ]
    }
  },
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
  "6": {
    title: "راحة",
    description: "يوم راحة كامل. يمكن ممارسة إطالات خفيفة أو مشي بسيط",
    exercises: {}
  }
};

// خطة تمارين لبناء العضلات
const muscleBuildingPlan: { [key: string]: WorkoutDay } = {
  "0": {
    title: "صدر وترايسبس - قوة",
    description: "تمارين مكثفة لبناء عضلات الصدر والترايسبس",
    exercises: {
      "تمارين الصدر": [
        { name: "Barbell Bench Press", sets: 5, reps: "6-8 تكرار" },
        { name: "Incline Dumbbell Press", sets: 4, reps: "8-10 تكرار" },
        { name: "Dips", sets: 4, reps: "10-12 تكرار" },
        { name: "Cable Flyes", sets: 3, reps: "12-15 تكرار" }
      ],
      "تمارين الترايسبس": [
        { name: "Close Grip Bench Press", sets: 4, reps: "8-10 تكرار" },
        { name: "Tricep Dips", sets: 4, reps: "10-12 تكرار" },
        { name: "Overhead Tricep Extension", sets: 3, reps: "12-15 تكرار" }
      ]
    }
  },
  "1": {
    title: "ظهر وبايسبس - قوة",
    description: "تمارين مكثفة لبناء عضلات الظهر والبايسبس",
    exercises: {
      "تمارين الظهر": [
        { name: "Pull-ups", sets: 5, reps: "أقصى عدد ممكن" },
        { name: "Barbell Rows", sets: 4, reps: "6-8 تكرار" },
        { name: "T-Bar Rows", sets: 4, reps: "8-10 تكرار" },
        { name: "Lat Pulldowns", sets: 3, reps: "10-12 تكرار" }
      ],
      "تمارين البايسبس": [
        { name: "Barbell Curls", sets: 4, reps: "8-10 تكرار" },
        { name: "Hammer Curls", sets: 4, reps: "10-12 تكرار" },
        { name: "Cable Curls", sets: 3, reps: "12-15 تكرار" }
      ]
    }
  },
  "2": {
    title: "أرجل - قوة",
    description: "تمارين مكثفة لبناء عضلات الأرجل",
    exercises: {
      "تمارين الرجلين": [
        { name: "Squats", sets: 5, reps: "6-8 تكرار" },
        { name: "Romanian Deadlifts", sets: 4, reps: "8-10 تكرار" },
        { name: "Bulgarian Split Squats", sets: 4, reps: "10-12 لكل رجل" },
        { name: "Leg Press", sets: 4, reps: "12-15 تكرار" },
        { name: "Calf Raises", sets: 5, reps: "15-20 تكرار" }
      ]
    }
  },
  "3": {
    title: "أكتاف وترابيس - قوة",
    description: "تمارين مكثفة لبناء عضلات الأكتاف والترابيس",
    exercises: {
      "تمارين الأكتاف": [
        { name: "Military Press", sets: 5, reps: "6-8 تكرار" },
        { name: "Lateral Raises", sets: 4, reps: "10-12 تكرار" },
        { name: "Rear Delt Flyes", sets: 4, reps: "12-15 تكرار" },
        { name: "Upright Rows", sets: 3, reps: "10-12 تكرار" }
      ],
      "تمارين الترابيس": [
        { name: "Shrugs", sets: 4, reps: "12-15 تكرار" },
        { name: "Face Pulls", sets: 3, reps: "15-20 تكرار" }
      ]
    }
  },
  "4": {
    title: "صدر وأكتاف - حجم",
    description: "تمارين للحجم والضخامة",
    exercises: {
      "تمارين الصدر": [
        { name: "Incline Barbell Press", sets: 4, reps: "8-10 تكرار" },
        { name: "Dumbbell Flyes", sets: 4, reps: "10-12 تكرار" },
        { name: "Push-ups", sets: 3, reps: "أقصى عدد ممكن" }
      ],
      "تمارين الأكتاف": [
        { name: "Dumbbell Press", sets: 4, reps: "10-12 تكرار" },
        { name: "Arnold Press", sets: 3, reps: "12-15 تكرار" }
      ]
    }
  },
  "5": {
    title: "ظهر وبايسبس - حجم",
    description: "تمارين للحجم والضخامة",
    exercises: {
      "تمارين الظهر": [
        { name: "Cable Rows", sets: 4, reps: "10-12 تكرار" },
        { name: "Wide Grip Pulldowns", sets: 4, reps: "10-12 تكرار" },
        { name: "Single Arm Rows", sets: 3, reps: "12-15 لكل ذراع" }
      ],
      "تمارين البايسبس": [
        { name: "Preacher Curls", sets: 4, reps: "10-12 تكرار" },
        { name: "Cable Hammer Curls", sets: 3, reps: "12-15 تكرار" }
      ]
    }
  },
  "6": {
    title: "راحة",
    description: "يوم راحة كامل أو مشي خفيف",
    exercises: {}
  }
};

// خطة تمارين للنساء
const womenFitnessPlan: { [key: string]: WorkoutDay } = {
  "0": {
    title: "تمارين الجزء العلوي",
    description: "تمارين لتقوية الذراعين والكتفين والصدر",
    exercises: {
      "تمارين الصدر والأكتاف": [
        { name: "Push-ups (معدلة)", sets: 3, reps: "8-12 تكرار" },
        { name: "Dumbbell Press", sets: 3, reps: "10-15 تكرار" },
        { name: "Lateral Raises", sets: 3, reps: "12-15 تكرار" }
      ],
      "تمارين الذراعين": [
        { name: "Bicep Curls", sets: 3, reps: "12-15 تكرار" },
        { name: "Tricep Extensions", sets: 3, reps: "12-15 تكرار" }
      ]
    }
  },
  "1": {
    title: "تمارين الجزء السفلي",
    description: "تمارين لتقوية الأرجل والمؤخرة",
    exercises: {
      "تمارين الأرجل": [
        { name: "Squats", sets: 4, reps: "12-15 تكرار" },
        { name: "Lunges", sets: 3, reps: "10-12 لكل رجل" },
        { name: "Glute Bridges", sets: 4, reps: "15-20 تكرار" },
        { name: "Calf Raises", sets: 3, reps: "15-20 تكرار" }
      ]
    }
  },
  "2": {
    title: "تمارين القلب والبطن",
    description: "تمارين كارديو وتقوية البطن",
    exercises: {
      "تمارين البطن": [
        { name: "Crunches", sets: 3, reps: "15-20 تكرار" },
        { name: "Plank", sets: 3, reps: "30-60 ثانية" },
        { name: "Bicycle Crunches", sets: 3, reps: "20 تكرار" },
        { name: "Leg Raises", sets: 3, reps: "15 تكرار" }
      ],
      "تمارين الكارديو": [
        { name: "Jumping Jacks", sets: 3, reps: "30 ثانية" },
        { name: "Mountain Climbers", sets: 3, reps: "30 ثانية" }
      ]
    }
  },
  "3": {
    title: "تمارين شاملة للجسم",
    description: "تمارين تشمل جميع عضلات الجسم",
    exercises: {
      "تمارين شاملة": [
        { name: "Burpees", sets: 3, reps: "8-12 تكرار" },
        { name: "Squats to Press", sets: 3, reps: "10-15 تكرار" },
        { name: "Deadlifts (خفيف)", sets: 3, reps: "10-12 تكرار" },
        { name: "Russian Twists", sets: 3, reps: "20 تكرار" }
      ]
    }
  },
  "4": {
    title: "تمارين الظهر والوضعية",
    description: "تمارين لتحسين وضعية الجسم وتقوية الظهر",
    exercises: {
      "تمارين الظهر": [
        { name: "Lat Pulldowns (خفيف)", sets: 3, reps: "12-15 تكرار" },
        { name: "Seated Rows", sets: 3, reps: "12-15 تكرار" },
        { name: "Reverse Flyes", sets: 3, reps: "15 تكرار" },
        { name: "Superman", sets: 3, reps: "15 تكرار" }
      ]
    }
  },
  "5": {
    title: "تمارين الأرجل والمؤخرة",
    description: "تمارين مكثفة للجزء السفلي",
    exercises: {
      "تمارين الأرجل": [
        { name: "Wall Sits", sets: 3, reps: "30-45 ثانية" },
        { name: "Side Lunges", sets: 3, reps: "10-12 لكل جانب" },
        { name: "Sumo Squats", sets: 3, reps: "15 تكرار" },
        { name: "Single Leg Deadlifts", sets: 3, reps: "8-10 لكل رجل" }
      ]
    }
  },
  "6": {
    title: "راحة أو يوغا",
    description: "يوم راحة أو ممارسة يوغا خفيفة",
    exercises: {}
  }
};

// مدير خطط التمارين
export const WORKOUT_PLANS = {
  "beginner_plan": beginnerPlan,
  "muscle_building_plan": muscleBuildingPlan,
  "women_fitness_plan": womenFitnessPlan
};

export function getWorkoutPlan(planId: string): { [key: string]: WorkoutDay } {
  return WORKOUT_PLANS[planId as keyof typeof WORKOUT_PLANS] || beginnerPlan;
}

export function getWorkoutByDayIndexForPlan(dayIndex: number, planId: string): WorkoutDay {
  const plan = getWorkoutPlan(planId);
  return plan[dayIndex.toString()];
}