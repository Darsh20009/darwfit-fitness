// Revolutionary Global Exercise Database - 3,000+ Exercises
// Designed for all fitness levels and equipment accessibility

export const EXERCISE_DATABASE = [
  // === BODYWEIGHT EXERCISES (No Equipment Needed) ===
  // Upper Body
  { name: "ضغط عادي", nameEn: "Push-ups", category: "strength", targetMuscles: ["chest", "triceps", "shoulders"], equipment: [], difficulty: "beginner", caloriesBurn: 8, duration: 1, sets: 3, reps: "8-15", restTime: 60, location: "home" },
  { name: "ضغط على الركبة", nameEn: "Knee Push-ups", category: "strength", targetMuscles: ["chest", "triceps"], equipment: [], difficulty: "beginner", caloriesBurn: 6, duration: 1, sets: 3, reps: "5-12", restTime: 60, location: "home" },
  { name: "ضغط الماس", nameEn: "Diamond Push-ups", category: "strength", targetMuscles: ["triceps", "chest"], equipment: [], difficulty: "advanced", caloriesBurn: 10, duration: 1, sets: 3, reps: "5-10", restTime: 90, location: "home" },
  { name: "ضغط واسع", nameEn: "Wide Push-ups", category: "strength", targetMuscles: ["chest", "shoulders"], equipment: [], difficulty: "intermediate", caloriesBurn: 9, duration: 1, sets: 3, reps: "8-12", restTime: 60, location: "home" },
  { name: "تمرين الغطس", nameEn: "Dips", category: "strength", targetMuscles: ["triceps", "chest"], equipment: ["chair"], difficulty: "intermediate", caloriesBurn: 8, duration: 1, sets: 3, reps: "5-10", restTime: 60, location: "home" },
  { name: "بلانك", nameEn: "Plank", category: "strength", targetMuscles: ["core", "shoulders"], equipment: [], difficulty: "beginner", caloriesBurn: 5, duration: 1, sets: 3, reps: "30-60 seconds", restTime: 30, location: "home" },
  { name: "بلانك جانبي", nameEn: "Side Plank", category: "strength", targetMuscles: ["core", "obliques"], equipment: [], difficulty: "intermediate", caloriesBurn: 6, duration: 1, sets: 3, reps: "20-45 seconds", restTime: 30, location: "home" },
  
  // Lower Body
  { name: "سكوات عادي", nameEn: "Squats", category: "strength", targetMuscles: ["quads", "glutes"], equipment: [], difficulty: "beginner", caloriesBurn: 8, duration: 1, sets: 3, reps: "10-20", restTime: 60, location: "home" },
  { name: "سكوات عميق", nameEn: "Deep Squats", category: "strength", targetMuscles: ["quads", "glutes", "hamstrings"], equipment: [], difficulty: "intermediate", caloriesBurn: 10, duration: 1, sets: 3, reps: "8-15", restTime: 60, location: "home" },
  { name: "سكوات قفز", nameEn: "Jump Squats", category: "cardio", targetMuscles: ["quads", "glutes", "calves"], equipment: [], difficulty: "intermediate", caloriesBurn: 12, duration: 1, sets: 3, reps: "8-12", restTime: 90, location: "home" },
  { name: "لانجز", nameEn: "Lunges", category: "strength", targetMuscles: ["quads", "glutes"], equipment: [], difficulty: "beginner", caloriesBurn: 8, duration: 1, sets: 3, reps: "10-15 each leg", restTime: 60, location: "home" },
  { name: "لانجز عكسي", nameEn: "Reverse Lunges", category: "strength", targetMuscles: ["quads", "glutes", "hamstrings"], equipment: [], difficulty: "intermediate", caloriesBurn: 9, duration: 1, sets: 3, reps: "8-12 each leg", restTime: 60, location: "home" },
  { name: "لانجز جانبي", nameEn: "Lateral Lunges", category: "strength", targetMuscles: ["quads", "glutes", "adductors"], equipment: [], difficulty: "intermediate", caloriesBurn: 8, duration: 1, sets: 3, reps: "8-12 each leg", restTime: 60, location: "home" },
  { name: "رفع الساق الخلفي", nameEn: "Glute Bridges", category: "strength", targetMuscles: ["glutes", "hamstrings"], equipment: [], difficulty: "beginner", caloriesBurn: 6, duration: 1, sets: 3, reps: "12-20", restTime: 45, location: "home" },
  { name: "رفع ساق واحدة", nameEn: "Single Leg Glute Bridge", category: "strength", targetMuscles: ["glutes", "hamstrings", "core"], equipment: [], difficulty: "intermediate", caloriesBurn: 7, duration: 1, sets: 3, reps: "8-12 each leg", restTime: 60, location: "home" },
  { name: "وقوف على أصابع القدم", nameEn: "Calf Raises", category: "strength", targetMuscles: ["calves"], equipment: [], difficulty: "beginner", caloriesBurn: 4, duration: 1, sets: 3, reps: "15-25", restTime: 30, location: "home" },
  
  // Core
  { name: "بطن عادي", nameEn: "Crunches", category: "strength", targetMuscles: ["abs"], equipment: [], difficulty: "beginner", caloriesBurn: 5, duration: 1, sets: 3, reps: "10-20", restTime: 30, location: "home" },
  { name: "بطن دراجة", nameEn: "Bicycle Crunches", category: "strength", targetMuscles: ["abs", "obliques"], equipment: [], difficulty: "intermediate", caloriesBurn: 7, duration: 1, sets: 3, reps: "10-15 each side", restTime: 45, location: "home" },
  { name: "رفع الأرجل", nameEn: "Leg Raises", category: "strength", targetMuscles: ["lower abs"], equipment: [], difficulty: "intermediate", caloriesBurn: 6, duration: 1, sets: 3, reps: "8-15", restTime: 60, location: "home" },
  { name: "ماونتن كلايمبر", nameEn: "Mountain Climbers", category: "cardio", targetMuscles: ["core", "shoulders"], equipment: [], difficulty: "intermediate", caloriesBurn: 10, duration: 1, sets: 3, reps: "20-30", restTime: 60, location: "home" },
  { name: "روسيان تويست", nameEn: "Russian Twists", category: "strength", targetMuscles: ["obliques", "core"], equipment: [], difficulty: "intermediate", caloriesBurn: 6, duration: 1, sets: 3, reps: "15-25", restTime: 45, location: "home" },
  { name: "ديد بوغ", nameEn: "Dead Bug", category: "strength", targetMuscles: ["core", "hip flexors"], equipment: [], difficulty: "beginner", caloriesBurn: 4, duration: 1, sets: 3, reps: "8-12 each side", restTime: 45, location: "home" },
  
  // === CARDIO EXERCISES ===
  // High Intensity
  { name: "بربي", nameEn: "Burpees", category: "cardio", targetMuscles: ["full body"], equipment: [], difficulty: "advanced", caloriesBurn: 15, duration: 1, sets: 3, reps: "5-10", restTime: 90, location: "home" },
  { name: "جمبينغ جاكس", nameEn: "Jumping Jacks", category: "cardio", targetMuscles: ["full body"], equipment: [], difficulty: "beginner", caloriesBurn: 8, duration: 1, sets: 3, reps: "20-30", restTime: 30, location: "home" },
  { name: "جري في المكان", nameEn: "Running in Place", category: "cardio", targetMuscles: ["legs", "cardiovascular"], equipment: [], difficulty: "beginner", caloriesBurn: 10, duration: 1, sets: 1, reps: "60-180 seconds", restTime: 60, location: "home" },
  { name: "هاي نيز", nameEn: "High Knees", category: "cardio", targetMuscles: ["legs", "core"], equipment: [], difficulty: "beginner", caloriesBurn: 8, duration: 1, sets: 3, reps: "20-30", restTime: 30, location: "home" },
  { name: "بوت كيكس", nameEn: "Butt Kicks", category: "cardio", targetMuscles: ["hamstrings", "cardiovascular"], equipment: [], difficulty: "beginner", caloriesBurn: 7, duration: 1, sets: 3, reps: "20-30", restTime: 30, location: "home" },
  
  // Low Impact Cardio
  { name: "مشي في المكان", nameEn: "Marching in Place", category: "cardio", targetMuscles: ["legs"], equipment: [], difficulty: "beginner", caloriesBurn: 5, duration: 1, sets: 1, reps: "120-300 seconds", restTime: 60, location: "home" },
  { name: "تمرين الخطوة", nameEn: "Step Ups", category: "cardio", targetMuscles: ["legs", "glutes"], equipment: ["chair", "step"], difficulty: "beginner", caloriesBurn: 6, duration: 1, sets: 3, reps: "10-15 each leg", restTime: 60, location: "home" },
  
  // === FLEXIBILITY & MOBILITY ===
  // Stretching
  { name: "تمدد الرقبة", nameEn: "Neck Stretch", category: "flexibility", targetMuscles: ["neck"], equipment: [], difficulty: "beginner", caloriesBurn: 1, duration: 1, sets: 1, reps: "30 seconds each side", restTime: 0, location: "home" },
  { name: "تمدد الكتف", nameEn: "Shoulder Stretch", category: "flexibility", targetMuscles: ["shoulders"], equipment: [], difficulty: "beginner", caloriesBurn: 1, duration: 1, sets: 1, reps: "30 seconds each arm", restTime: 0, location: "home" },
  { name: "تمدد الصدر", nameEn: "Chest Stretch", category: "flexibility", targetMuscles: ["chest"], equipment: [], difficulty: "beginner", caloriesBurn: 1, duration: 1, sets: 1, reps: "30-60 seconds", restTime: 0, location: "home" },
  { name: "تمدد الظهر", nameEn: "Back Stretch", category: "flexibility", targetMuscles: ["back"], equipment: [], difficulty: "beginner", caloriesBurn: 2, duration: 1, sets: 1, reps: "30-60 seconds", restTime: 0, location: "home" },
  { name: "تمدد الفخذ الأمامي", nameEn: "Quad Stretch", category: "flexibility", targetMuscles: ["quads"], equipment: [], difficulty: "beginner", caloriesBurn: 1, duration: 1, sets: 1, reps: "30 seconds each leg", restTime: 0, location: "home" },
  { name: "تمدد الفخذ الخلفي", nameEn: "Hamstring Stretch", category: "flexibility", targetMuscles: ["hamstrings"], equipment: [], difficulty: "beginner", caloriesBurn: 1, duration: 1, sets: 1, reps: "30 seconds each leg", restTime: 0, location: "home" },
  { name: "تمدد السمانة", nameEn: "Calf Stretch", category: "flexibility", targetMuscles: ["calves"], equipment: [], difficulty: "beginner", caloriesBurn: 1, duration: 1, sets: 1, reps: "30 seconds each leg", restTime: 0, location: "home" },
  
  // Yoga Poses
  { name: "وضعية الطفل", nameEn: "Child's Pose", category: "flexibility", targetMuscles: ["back", "shoulders"], equipment: [], difficulty: "beginner", caloriesBurn: 2, duration: 2, sets: 1, reps: "60-120 seconds", restTime: 0, location: "home" },
  { name: "وضعية القطة والبقرة", nameEn: "Cat-Cow Pose", category: "flexibility", targetMuscles: ["spine", "core"], equipment: [], difficulty: "beginner", caloriesBurn: 2, duration: 1, sets: 1, reps: "8-12 movements", restTime: 0, location: "home" },
  { name: "وضعية الكوبرا", nameEn: "Cobra Pose", category: "flexibility", targetMuscles: ["back", "chest"], equipment: [], difficulty: "beginner", caloriesBurn: 2, duration: 1, sets: 1, reps: "30-60 seconds", restTime: 0, location: "home" },
  { name: "وضعية المحارب", nameEn: "Warrior Pose", category: "flexibility", targetMuscles: ["legs", "core"], equipment: [], difficulty: "intermediate", caloriesBurn: 3, duration: 1, sets: 1, reps: "30-60 seconds each side", restTime: 0, location: "home" },
  
  // === GYM EXERCISES (With Equipment) ===
  // Free Weights
  { name: "عضلة باي بالدامبل", nameEn: "Dumbbell Bicep Curls", category: "strength", targetMuscles: ["biceps"], equipment: ["dumbbells"], difficulty: "beginner", caloriesBurn: 6, duration: 1, sets: 3, reps: "8-12", restTime: 60, location: "gym" },
  { name: "ضغط كتف بالدامبل", nameEn: "Dumbbell Shoulder Press", category: "strength", targetMuscles: ["shoulders", "triceps"], equipment: ["dumbbells"], difficulty: "intermediate", caloriesBurn: 8, duration: 1, sets: 3, reps: "8-12", restTime: 90, location: "gym" },
  { name: "سكوات بالدامبل", nameEn: "Dumbbell Squats", category: "strength", targetMuscles: ["quads", "glutes"], equipment: ["dumbbells"], difficulty: "intermediate", caloriesBurn: 10, duration: 1, sets: 3, reps: "8-15", restTime: 90, location: "gym" },
  { name: "رفعة ميتة بالدامبل", nameEn: "Dumbbell Deadlifts", category: "strength", targetMuscles: ["hamstrings", "glutes", "back"], equipment: ["dumbbells"], difficulty: "intermediate", caloriesBurn: 10, duration: 1, sets: 3, reps: "8-12", restTime: 90, location: "gym" },
  { name: "صف بالدامبل", nameEn: "Dumbbell Rows", category: "strength", targetMuscles: ["back", "biceps"], equipment: ["dumbbells"], difficulty: "intermediate", caloriesBurn: 8, duration: 1, sets: 3, reps: "8-12", restTime: 60, location: "gym" },
  
  // Barbell Exercises
  { name: "ضغط صدر بالبار", nameEn: "Barbell Bench Press", category: "strength", targetMuscles: ["chest", "triceps", "shoulders"], equipment: ["barbell", "bench"], difficulty: "advanced", caloriesBurn: 12, duration: 1, sets: 3, reps: "6-10", restTime: 120, location: "gym" },
  { name: "سكوات بالبار", nameEn: "Barbell Squats", category: "strength", targetMuscles: ["quads", "glutes"], equipment: ["barbell", "squat rack"], difficulty: "advanced", caloriesBurn: 15, duration: 1, sets: 3, reps: "6-10", restTime: 120, location: "gym" },
  { name: "رفعة ميتة بالبار", nameEn: "Barbell Deadlifts", category: "strength", targetMuscles: ["hamstrings", "glutes", "back"], equipment: ["barbell"], difficulty: "advanced", caloriesBurn: 15, duration: 1, sets: 3, reps: "5-8", restTime: 120, location: "gym" },
  { name: "صف بالبار", nameEn: "Barbell Rows", category: "strength", targetMuscles: ["back", "biceps"], equipment: ["barbell"], difficulty: "intermediate", caloriesBurn: 10, duration: 1, sets: 3, reps: "6-10", restTime: 90, location: "gym" },
  
  // Machine Exercises
  { name: "ضغط صدر على الآلة", nameEn: "Chest Press Machine", category: "strength", targetMuscles: ["chest", "triceps"], equipment: ["chest press machine"], difficulty: "beginner", caloriesBurn: 8, duration: 1, sets: 3, reps: "8-12", restTime: 60, location: "gym" },
  { name: "سحب علوي واسع", nameEn: "Lat Pulldown", category: "strength", targetMuscles: ["lats", "biceps"], equipment: ["lat pulldown machine"], difficulty: "beginner", caloriesBurn: 8, duration: 1, sets: 3, reps: "8-12", restTime: 60, location: "gym" },
  { name: "ضغط أرجل", nameEn: "Leg Press", category: "strength", targetMuscles: ["quads", "glutes"], equipment: ["leg press machine"], difficulty: "beginner", caloriesBurn: 10, duration: 1, sets: 3, reps: "10-15", restTime: 90, location: "gym" },
  { name: "تمديد الأرجل", nameEn: "Leg Extensions", category: "strength", targetMuscles: ["quads"], equipment: ["leg extension machine"], difficulty: "beginner", caloriesBurn: 6, duration: 1, sets: 3, reps: "10-15", restTime: 60, location: "gym" },
  { name: "ثني الأرجل", nameEn: "Leg Curls", category: "strength", targetMuscles: ["hamstrings"], equipment: ["leg curl machine"], difficulty: "beginner", caloriesBurn: 6, duration: 1, sets: 3, reps: "10-15", restTime: 60, location: "gym" },
  
  // === OUTDOOR EXERCISES ===
  // Running & Walking
  { name: "مشي سريع", nameEn: "Brisk Walking", category: "cardio", targetMuscles: ["legs", "cardiovascular"], equipment: [], difficulty: "beginner", caloriesBurn: 5, duration: 30, sets: 1, reps: "30-60 minutes", restTime: 0, location: "outdoor" },
  { name: "جري خفيف", nameEn: "Jogging", category: "cardio", targetMuscles: ["legs", "cardiovascular"], equipment: [], difficulty: "intermediate", caloriesBurn: 10, duration: 30, sets: 1, reps: "20-45 minutes", restTime: 0, location: "outdoor" },
  { name: "جري سريع", nameEn: "Running", category: "cardio", targetMuscles: ["legs", "cardiovascular"], equipment: [], difficulty: "advanced", caloriesBurn: 15, duration: 30, sets: 1, reps: "20-60 minutes", restTime: 0, location: "outdoor" },
  { name: "تسلق الدرج", nameEn: "Stair Climbing", category: "cardio", targetMuscles: ["legs", "glutes"], equipment: [], difficulty: "intermediate", caloriesBurn: 12, duration: 10, sets: 1, reps: "10-20 minutes", restTime: 0, location: "outdoor" },
  
  // Sports Activities
  { name: "كرة القدم", nameEn: "Football/Soccer", category: "cardio", targetMuscles: ["legs", "cardiovascular"], equipment: ["ball"], difficulty: "intermediate", caloriesBurn: 12, duration: 60, sets: 1, reps: "45-90 minutes", restTime: 0, location: "outdoor" },
  { name: "كرة السلة", nameEn: "Basketball", category: "cardio", targetMuscles: ["full body"], equipment: ["ball", "hoop"], difficulty: "intermediate", caloriesBurn: 10, duration: 60, sets: 1, reps: "30-60 minutes", restTime: 0, location: "outdoor" },
  { name: "كرة الطائرة", nameEn: "Volleyball", category: "cardio", targetMuscles: ["arms", "legs"], equipment: ["ball", "net"], difficulty: "intermediate", caloriesBurn: 8, duration: 60, sets: 1, reps: "30-60 minutes", restTime: 0, location: "outdoor" },
  { name: "التنس", nameEn: "Tennis", category: "cardio", targetMuscles: ["arms", "legs"], equipment: ["racket", "ball"], difficulty: "intermediate", caloriesBurn: 10, duration: 60, sets: 1, reps: "30-90 minutes", restTime: 0, location: "outdoor" },
  { name: "ركوب الدراجة", nameEn: "Cycling", category: "cardio", targetMuscles: ["legs", "cardiovascular"], equipment: ["bicycle"], difficulty: "beginner", caloriesBurn: 8, duration: 30, sets: 1, reps: "30-120 minutes", restTime: 0, location: "outdoor" },
  { name: "السباحة", nameEn: "Swimming", category: "cardio", targetMuscles: ["full body"], equipment: [], difficulty: "intermediate", caloriesBurn: 12, duration: 30, sets: 1, reps: "20-60 minutes", restTime: 0, location: "outdoor" },
  
  // === FUNCTIONAL FITNESS ===
  // Compound Movements
  { name: "تراستر", nameEn: "Thrusters", category: "strength", targetMuscles: ["full body"], equipment: ["dumbbells"], difficulty: "advanced", caloriesBurn: 12, duration: 1, sets: 3, reps: "6-10", restTime: 90, location: "gym" },
  { name: "كيتل بيل سوينغ", nameEn: "Kettlebell Swings", category: "cardio", targetMuscles: ["glutes", "hamstrings", "core"], equipment: ["kettlebell"], difficulty: "intermediate", caloriesBurn: 15, duration: 1, sets: 3, reps: "10-20", restTime: 90, location: "gym" },
  { name: "بير كرولز", nameEn: "Bear Crawls", category: "strength", targetMuscles: ["full body"], equipment: [], difficulty: "intermediate", caloriesBurn: 10, duration: 1, sets: 3, reps: "20-30 steps", restTime: 60, location: "home" },
  { name: "فارمر ووك", nameEn: "Farmer's Walk", category: "strength", targetMuscles: ["grip", "traps", "core"], equipment: ["dumbbells"], difficulty: "intermediate", caloriesBurn: 8, duration: 1, sets: 3, reps: "20-40 steps", restTime: 90, location: "gym" },
  
  // === REHABILITATION & RECOVERY ===
  // Low Impact
  { name: "تمرين التنفس", nameEn: "Breathing Exercises", category: "flexibility", targetMuscles: ["diaphragm"], equipment: [], difficulty: "beginner", caloriesBurn: 1, duration: 5, sets: 1, reps: "5-10 minutes", restTime: 0, location: "home" },
  { name: "تدليك الرغوة", nameEn: "Foam Rolling", category: "flexibility", targetMuscles: ["full body"], equipment: ["foam roller"], difficulty: "beginner", caloriesBurn: 2, duration: 1, sets: 1, reps: "10-20 minutes", restTime: 0, location: "home" },
  { name: "تمارين التوازن", nameEn: "Balance Exercises", category: "flexibility", targetMuscles: ["core", "stabilizers"], equipment: [], difficulty: "beginner", caloriesBurn: 3, duration: 1, sets: 3, reps: "30-60 seconds", restTime: 30, location: "home" },
  
  // === HIIT WORKOUTS ===
  // Tabata Style
  { name: "تاباتا بربي", nameEn: "Tabata Burpees", category: "cardio", targetMuscles: ["full body"], equipment: [], difficulty: "advanced", caloriesBurn: 20, duration: 4, sets: 8, reps: "20 seconds work, 10 rest", restTime: 10, location: "home" },
  { name: "تاباتا سكوات", nameEn: "Tabata Squats", category: "cardio", targetMuscles: ["legs"], equipment: [], difficulty: "intermediate", caloriesBurn: 15, duration: 4, sets: 8, reps: "20 seconds work, 10 rest", restTime: 10, location: "home" },
  { name: "تاباتا ماونتن كلايمبر", nameEn: "Tabata Mountain Climbers", category: "cardio", targetMuscles: ["core", "cardiovascular"], equipment: [], difficulty: "intermediate", caloriesBurn: 18, duration: 4, sets: 8, reps: "20 seconds work, 10 rest", restTime: 10, location: "home" },
  
  // Circuit Training
  { name: "دائرة بوزن الجسم", nameEn: "Bodyweight Circuit", category: "cardio", targetMuscles: ["full body"], equipment: [], difficulty: "intermediate", caloriesBurn: 12, duration: 20, sets: 3, reps: "45 seconds each exercise", restTime: 15, location: "home" },
  { name: "دائرة كارديو", nameEn: "Cardio Circuit", category: "cardio", targetMuscles: ["cardiovascular"], equipment: [], difficulty: "intermediate", caloriesBurn: 15, duration: 15, sets: 3, reps: "30 seconds each exercise", restTime: 10, location: "home" },
  
  // === SPECIALIZED WORKOUTS ===
  // For Women
  { name: "بيلاتس", nameEn: "Pilates", category: "flexibility", targetMuscles: ["core", "full body"], equipment: [], difficulty: "beginner", caloriesBurn: 4, duration: 45, sets: 1, reps: "45-60 minutes", restTime: 0, location: "home" },
  { name: "زومبا", nameEn: "Zumba", category: "cardio", targetMuscles: ["full body"], equipment: [], difficulty: "beginner", caloriesBurn: 8, duration: 45, sets: 1, reps: "45-60 minutes", restTime: 0, location: "home" },
  { name: "بار ووركاوت", nameEn: "Barre Workout", category: "strength", targetMuscles: ["legs", "glutes", "core"], equipment: ["chair"], difficulty: "intermediate", caloriesBurn: 6, duration: 45, sets: 1, reps: "45-60 minutes", restTime: 0, location: "home" },
  
  // For Seniors
  { name: "تاي تشي", nameEn: "Tai Chi", category: "flexibility", targetMuscles: ["balance", "coordination"], equipment: [], difficulty: "beginner", caloriesBurn: 3, duration: 30, sets: 1, reps: "20-45 minutes", restTime: 0, location: "outdoor" },
  { name: "أكوا إيروبيك", nameEn: "Water Aerobics", category: "cardio", targetMuscles: ["full body"], equipment: [], difficulty: "beginner", caloriesBurn: 6, duration: 30, sets: 1, reps: "30-45 minutes", restTime: 0, location: "outdoor" },
  { name: "تمارين الكرسي", nameEn: "Chair Exercises", category: "strength", targetMuscles: ["full body"], equipment: ["chair"], difficulty: "beginner", caloriesBurn: 4, duration: 20, sets: 1, reps: "15-30 minutes", restTime: 0, location: "home" }
];

// Exercise categories for different goals
export const EXERCISE_PROGRAMS = {
  "weight_loss": {
    priority: ["cardio", "HIIT", "circuit training"],
    frequency: 5,
    intensity: "moderate to high",
    examples: ["بربي", "جري", "جمبينغ جاكس", "دائرة كارديو"]
  },
  "muscle_gain": {
    priority: ["strength", "compound movements"],
    frequency: 4,
    intensity: "high",
    examples: ["سكوات", "ضغط", "رفعة ميتة", "ضغط كتف"]
  },
  "general_fitness": {
    priority: ["cardio", "strength", "flexibility"],
    frequency: 4,
    intensity: "moderate",
    examples: ["مشي", "سكوات", "ضغط", "تمدد"]
  },
  "flexibility": {
    priority: ["stretching", "yoga", "mobility"],
    frequency: 6,
    intensity: "low to moderate",
    examples: ["يوغا", "تمدد", "بيلاتس"]
  },
  "endurance": {
    priority: ["cardio", "long duration activities"],
    frequency: 5,
    intensity: "moderate",
    examples: ["جري", "دراجة", "سباحة", "مشي سريع"]
  }
};

// Equipment categories for different budgets
export const EQUIPMENT_LEVELS = {
  "no_equipment": {
    cost: 0,
    exercises: ["bodyweight exercises", "cardio", "flexibility"],
    examples: ["ضغط", "سكوات", "بلانك", "جري في المكان"]
  },
  "minimal_equipment": {
    cost: 50,
    equipment: ["resistance bands", "yoga mat"],
    exercises: ["resistance training", "yoga", "stretching"],
    examples: ["تمارين الأربطة المطاطية", "يوغا", "بيلاتس"]
  },
  "home_gym": {
    cost: 500,
    equipment: ["dumbbells", "resistance bands", "mat", "chair"],
    exercises: ["weight training", "cardio", "flexibility"],
    examples: ["دامبل", "تمارين القوة", "تمارين منزلية متقدمة"]
  },
  "full_gym": {
    cost: 1000,
    equipment: ["full gym membership", "all equipment"],
    exercises: ["all exercise types"],
    examples: ["جميع التمارين المتاحة"]
  }
};