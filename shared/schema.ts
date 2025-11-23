import { z } from "zod";
import { ObjectId } from "mongodb";

// ==================== User & Authentication Schemas ====================

export const userSchema = z.object({
  _id: z.instanceof(ObjectId).optional(),
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export const userProfileSchema = z.object({
  _id: z.instanceof(ObjectId).optional(),
  userId: z.instanceof(ObjectId),
  
  // Basic Info
  age: z.number().min(15).max(80),
  gender: z.enum(["male", "female"]),
  height: z.number().min(100).max(250), // cm
  weight: z.number().min(30).max(300), // kg
  bodyFat: z.number().min(0).max(100).optional(), // percentage
  
  // Goals and Preferences
  primaryGoal: z.enum([
    "lose_weight",
    "gain_weight",
    "build_muscle",
    "maintain",
    "improve_fitness",
    "increase_strength"
  ]),
  targetWeight: z.number().optional(),
  timeFrame: z.number().default(90), // days
  
  // Lifestyle
  occupation: z.string().optional(),
  activityLevel: z.enum(["sedentary", "light", "moderate", "active", "very_active"]),
  sleepHours: z.number().min(4).max(12).default(8),
  stressLevel: z.enum(["low", "moderate", "high"]).optional(),
  
  // Financial
  budget: z.number().min(0), // daily food budget in SAR
  region: z.string().default("saudi"),
  
  // Exercise Preferences
  experienceLevel: z.enum(["beginner", "intermediate", "advanced"]),
  workoutPreference: z.enum(["home", "gym", "outdoor", "mixed"]),
  dailyExerciseTime: z.number().min(15).max(180), // minutes
  exerciseFrequency: z.number().min(1).max(7).default(5), // days per week
  preferredTime: z.enum(["morning", "afternoon", "evening"]).optional(),
  injuries: z.array(z.string()).default([]),
  
  // Nutrition Preferences
  dietType: z.enum(["normal", "keto", "low_carb", "high_protein", "vegetarian"]).optional(),
  mealFrequency: z.number().min(2).max(6).default(3),
  cookingSkill: z.enum(["beginner", "intermediate", "advanced"]).default("beginner"),
  cookingTime: z.number().min(10).max(120).default(30), // minutes per meal
  preferredFoods: z.array(z.string()).default([]),
  dislikedFoods: z.array(z.string()).default([]),
  allergies: z.array(z.string()).default([]),
  
  // Calculated Metrics
  bmr: z.number().optional(), // Basal Metabolic Rate
  tdee: z.number().optional(), // Total Daily Energy Expenditure
  targetCalories: z.number().optional(),
  targetProtein: z.number().optional(),
  targetCarbs: z.number().optional(),
  targetFat: z.number().optional(),
  
  // Cultural and Religious
  culture: z.string().default("arabic"),
  religion: z.string().default("islam"),
  ramadanMode: z.boolean().default(false),
  
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export type User = z.infer<typeof userSchema>;
export type UserProfile = z.infer<typeof userProfileSchema>;

// ==================== Food Database Schemas ====================

export const foodSchema = z.object({
  _id: z.instanceof(ObjectId).optional(),
  name: z.string(),
  nameEn: z.string().optional(),
  category: z.string(),
  region: z.string(), // egyptian, saudi, lebanese, turkish, etc.
  
  // Nutritional Info (per 100g)
  calories: z.number(),
  protein: z.number(),
  carbs: z.number(),
  fat: z.number(),
  fiber: z.number().default(0),
  sugar: z.number().default(0),
  
  // Additional Info
  cost: z.number(), // SAR per 100g
  availability: z.enum(["common", "rare", "seasonal"]).default("common"),
  preparationTime: z.number().default(0), // minutes
  servingSize: z.number().default(100), // grams
  tags: z.array(z.string()).default([]), // halal, vegan, keto, etc.
  
  // User-added foods
  isCustom: z.boolean().default(false),
  userId: z.instanceof(ObjectId).optional(), // if custom food
  
  createdAt: z.date().default(() => new Date()),
});

export type Food = z.infer<typeof foodSchema>;

// ==================== Exercise Database Schemas ====================

export const exerciseSchema = z.object({
  _id: z.instanceof(ObjectId).optional(),
  name: z.string(),
  nameEn: z.string().optional(),
  category: z.enum(["strength", "cardio", "flexibility", "sports"]),
  targetMuscles: z.array(z.string()).default([]),
  equipment: z.array(z.string()).default([]),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  
  // Exercise Details
  caloriesBurnPerMin: z.number(), // calories burned per minute
  description: z.string().optional(),
  instructions: z.array(z.string()).default([]),
  videoUrl: z.string().optional(),
  imageUrl: z.string().optional(),
  
  // Default Parameters
  defaultSets: z.number().default(3),
  defaultReps: z.string().default("8-12"),
  defaultRestTime: z.number().default(60), // seconds
  
  // Location
  location: z.enum(["home", "gym", "outdoor", "anywhere"]),
  tags: z.array(z.string()).default([]),
  
  // User-added exercises
  isCustom: z.boolean().default(false),
  userId: z.instanceof(ObjectId).optional(),
  
  createdAt: z.date().default(() => new Date()),
});

export type Exercise = z.infer<typeof exerciseSchema>;

// ==================== Meal Plan Schemas ====================

export const mealItemSchema = z.object({
  foodId: z.instanceof(ObjectId),
  foodName: z.string(),
  quantity: z.number(), // grams
  calories: z.number(),
  protein: z.number(),
  carbs: z.number(),
  fat: z.number(),
});

export const dailyMealPlanSchema = z.object({
  breakfast: z.array(mealItemSchema).default([]),
  lunch: z.array(mealItemSchema).default([]),
  dinner: z.array(mealItemSchema).default([]),
  snacks: z.array(mealItemSchema).default([]),
  
  totals: z.object({
    calories: z.number().default(0),
    protein: z.number().default(0),
    carbs: z.number().default(0),
    fat: z.number().default(0),
    cost: z.number().default(0),
  }),
});

export const userMealPlanSchema = z.object({
  _id: z.instanceof(ObjectId).optional(),
  userId: z.instanceof(ObjectId),
  name: z.string(),
  startDate: z.date(),
  duration: z.number().default(30), // days
  
  // Daily plans (indexed by day number)
  dailyPlans: z.record(z.number(), dailyMealPlanSchema),
  
  // Plan metadata
  isTemplate: z.boolean().default(false),
  isActive: z.boolean().default(true),
  
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export type MealItem = z.infer<typeof mealItemSchema>;
export type DailyMealPlan = z.infer<typeof dailyMealPlanSchema>;
export type UserMealPlan = z.infer<typeof userMealPlanSchema>;

// ==================== Workout Plan Schemas ====================

export const workoutExerciseSchema = z.object({
  exerciseId: z.instanceof(ObjectId),
  exerciseName: z.string(),
  sets: z.number(),
  reps: z.string(), // "8-12" or "45 seconds"
  weight: z.number().optional(), // kg
  restTime: z.number().default(60), // seconds
  notes: z.string().optional(),
});

export const dailyWorkoutPlanSchema = z.object({
  dayName: z.string(), // "Day 1: Chest & Triceps"
  exercises: z.array(workoutExerciseSchema).default([]),
  totalDuration: z.number().default(0), // minutes
  estimatedCalories: z.number().default(0),
  isRestDay: z.boolean().default(false),
});

export const userWorkoutPlanSchema = z.object({
  _id: z.instanceof(ObjectId).optional(),
  userId: z.instanceof(ObjectId),
  name: z.string(),
  startDate: z.date(),
  duration: z.number().default(30), // days
  
  // Weekly structure (can repeat)
  weeklySchedule: z.array(dailyWorkoutPlanSchema),
  
  // Plan metadata
  isTemplate: z.boolean().default(false),
  isActive: z.boolean().default(true),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export type WorkoutExercise = z.infer<typeof workoutExerciseSchema>;
export type DailyWorkoutPlan = z.infer<typeof dailyWorkoutPlanSchema>;
export type UserWorkoutPlan = z.infer<typeof userWorkoutPlanSchema>;

// ==================== Progress Tracking Schemas ====================

export const dailyProgressSchema = z.object({
  _id: z.instanceof(ObjectId).optional(),
  userId: z.instanceof(ObjectId),
  date: z.date(),
  
  // Weight & Body Metrics
  weight: z.number().optional(),
  bodyFat: z.number().optional(),
  
  // Nutrition Tracking
  mealsCompleted: z.array(z.string()).default([]), // ["breakfast", "lunch", "dinner"]
  totalCalories: z.number().default(0),
  totalProtein: z.number().default(0),
  totalCarbs: z.number().default(0),
  totalFat: z.number().default(0),
  waterIntake: z.number().default(0), // liters
  
  // Exercise Tracking
  workoutCompleted: z.boolean().default(false),
  workoutDuration: z.number().default(0), // minutes
  caloriesBurned: z.number().default(0),
  exercisesCompleted: z.array(z.string()).default([]),
  
  // Notes & Mood
  notes: z.string().optional(),
  mood: z.enum(["great", "good", "okay", "bad", "terrible"]).optional(),
  energy: z.number().min(1).max(10).optional(),
  
  createdAt: z.date().default(() => new Date()),
});

export type DailyProgress = z.infer<typeof dailyProgressSchema>;

// ==================== Azkar Schemas ====================

export const azkarSchema = z.object({
  _id: z.instanceof(ObjectId).optional(),
  category: z.enum([
    "morning",
    "evening",
    "sleep",
    "waking",
    "eating",
    "daily",
    "special"
  ]),
  title: z.string(),
  arabicText: z.string(),
  transliteration: z.string().optional(),
  translation: z.string().optional(),
  repetitions: z.number().default(1),
  reference: z.string().optional(), // Quran/Hadith reference
  
  // Audio Support
  audioUrl: z.string().optional(),
  audioDuration: z.number().optional(), // seconds
  
  // Display Order
  order: z.number().default(0),
  
  createdAt: z.date().default(() => new Date()),
});

export const userAzkarProgressSchema = z.object({
  _id: z.instanceof(ObjectId).optional(),
  userId: z.instanceof(ObjectId),
  date: z.date(),
  
  // Track completed azkar by category
  completed: z.record(z.string(), z.object({
    azkarId: z.instanceof(ObjectId),
    completedReps: z.number().default(0),
    completedAt: z.date().optional(),
  })),
  
  // Streak tracking
  streak: z.number().default(0),
  
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export type Azkar = z.infer<typeof azkarSchema>;
export type UserAzkarProgress = z.infer<typeof userAzkarProgressSchema>;

// ==================== Authentication & API Schemas ====================

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
  age: z.number().min(15).max(80),
  gender: z.enum(["male", "female"]),
  height: z.number().min(100).max(250),
  weight: z.number().min(30).max(300),
  primaryGoal: z.enum([
    "lose_weight",
    "gain_weight",
    "build_muscle",
    "maintain",
    "improve_fitness"
  ]),
  activityLevel: z.enum(["sedentary", "light", "moderate", "active", "very_active"]),
  budget: z.number().min(0),
});

export type LoginData = z.infer<typeof loginSchema>;
export type RegisterData = z.infer<typeof registerSchema>;

// ==================== Utility Functions ====================

export function calculateBMR(weight: number, height: number, age: number, gender: string): number {
  // Mifflin-St Jeor Equation
  if (gender === "male") {
    return (10 * weight) + (6.25 * height) - (5 * age) + 5;
  } else {
    return (10 * weight) + (6.25 * height) - (5 * age) - 161;
  }
}

export function calculateTDEE(bmr: number, activityLevel: string): number {
  const multipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9
  };
  return bmr * (multipliers[activityLevel as keyof typeof multipliers] || 1.2);
}

export function calculateTargetCalories(tdee: number, goal: string): number {
  switch (goal) {
    case "lose_weight":
      return tdee - 500; // 500 calorie deficit
    case "gain_weight":
    case "build_muscle":
      return tdee + 300; // 300 calorie surplus
    case "maintain":
    default:
      return tdee;
  }
}

export function calculateMacros(targetCalories: number, goal: string) {
  let proteinPercent = 0.30;
  let carbsPercent = 0.40;
  let fatPercent = 0.30;
  
  if (goal === "build_muscle") {
    proteinPercent = 0.35;
    carbsPercent = 0.40;
    fatPercent = 0.25;
  } else if (goal === "lose_weight") {
    proteinPercent = 0.35;
    carbsPercent = 0.30;
    fatPercent = 0.35;
  }
  
  return {
    protein: (targetCalories * proteinPercent) / 4, // 4 calories per gram
    carbs: (targetCalories * carbsPercent) / 4,
    fat: (targetCalories * fatPercent) / 9, // 9 calories per gram
  };
}
