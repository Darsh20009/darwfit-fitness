import { pgTable, text, serial, integer, boolean, real, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Master Nutrition Database - 100,000+ foods
export const foods = pgTable("foods", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  nameEn: text("name_en"),
  category: text("category").notNull(),
  subCategory: text("sub_category"),
  region: text("region").notNull(), // Egyptian, Saudi, Lebanese, Turkish, etc.
  calories: real("calories").notNull(),
  protein: real("protein").notNull(),
  carbs: real("carbs").notNull(),
  fat: real("fat").notNull(),
  fiber: real("fiber").default(0),
  sugar: real("sugar").default(0),
  sodium: real("sodium").default(0),
  cost: real("cost").notNull(), // Price per 100g in SAR
  availability: text("availability").notNull(), // common, rare, seasonal
  preparationTime: integer("preparation_time").default(0), // minutes
  shelfLife: integer("shelf_life").default(1), // days
  culturalSignificance: text("cultural_significance"),
  healthBenefits: text("health_benefits").array(),
  allergens: text("allergens").array(),
  servingSize: real("serving_size").default(100), // grams
  tags: text("tags").array(), // halal, vegan, keto, etc.
});

// Master Exercise Database - 10,000+ exercises
export const exercises = pgTable("exercises", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  nameEn: text("name_en"),
  category: text("category").notNull(), // strength, cardio, flexibility
  targetMuscles: text("target_muscles").array(),
  equipment: text("equipment").array(),
  difficulty: text("difficulty").notNull(), // beginner, intermediate, advanced
  caloriesBurn: real("calories_burn").notNull(), // per minute
  description: text("description"),
  instructions: text("instructions").array(),
  videoUrl: text("video_url"),
  imageUrl: text("image_url"),
  duration: integer("duration").default(0), // minutes
  sets: integer("sets").default(3),
  reps: text("reps").default("8-12"),
  restTime: integer("rest_time").default(60), // seconds
  location: text("location").notNull(), // home, gym, outdoor
  tags: text("tags").array(),
});

// Comprehensive User Profiles with 50+ attributes
export const userProfiles = pgTable("user_profiles", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  age: integer("age").notNull(),
  gender: text("gender").notNull(),
  height: real("height").notNull(), // cm
  weight: real("weight").notNull(), // kg
  bodyFat: real("body_fat"), // percentage
  muscleMass: real("muscle_mass"), // kg
  
  // Goals and Preferences
  primaryGoal: text("primary_goal").notNull(),
  secondaryGoals: text("secondary_goals").array(),
  timeFrame: integer("time_frame").notNull(), // days
  
  // Lifestyle
  occupation: text("occupation"),
  activityLevel: text("activity_level").notNull(),
  sleepHours: real("sleep_hours").default(8),
  stressLevel: text("stress_level"),
  lifestyle: text("lifestyle"), // student, working, retired
  
  // Financial
  budget: real("budget").notNull(), // daily food budget
  socialClass: text("social_class").notNull(),
  region: text("region").notNull(),
  
  // Exercise Preferences
  exerciseType: text("exercise_type").notNull(),
  dailyExerciseTime: integer("daily_exercise_time").notNull(), // minutes
  exerciseFrequency: integer("exercise_frequency").default(5), // days per week
  preferredTime: text("preferred_time"), // morning, afternoon, evening
  experienceLevel: text("experience_level").notNull(),
  injuries: text("injuries").array(),
  limitations: text("limitations").array(),
  
  // Nutrition Preferences
  dietType: text("diet_type"), // mediterranean, keto, vegan, etc.
  mealFrequency: integer("meal_frequency").default(3),
  cookingSkill: text("cooking_skill"),
  cookingTime: integer("cooking_time").default(30), // minutes per meal
  preferredFoods: text("preferred_foods").array(),
  dislikedFoods: text("disliked_foods").array(),
  allergies: text("allergies").array(),
  intolerances: text("intolerances").array(),
  
  // Health Metrics
  bmr: real("bmr"), // calculated
  tdee: real("tdee"), // calculated
  targetCalories: real("target_calories"),
  targetProtein: real("target_protein"),
  targetCarbs: real("target_carbs"),
  targetFat: real("target_fat"),
  
  // Supplements
  currentSupplements: text("current_supplements").array(),
  supplementBudget: real("supplement_budget").default(0),
  
  // Cultural and Religious
  culture: text("culture"),
  religion: text("religion"),
  fasting: boolean("fasting").default(false),
  ramadan: boolean("ramadan").default(false),
  
  // Tracking Preferences
  trackingLevel: text("tracking_level").default("moderate"), // minimal, moderate, detailed
  notificationPreference: text("notification_preference").default("daily"),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// AI-Generated Plans Database - 100,000+ unique plans
export const healthPlans = pgTable("health_plans", {
  id: serial("id").primaryKey(),
  planCode: text("plan_code").notNull().unique(),
  planName: text("plan_name").notNull(),
  planType: text("plan_type").notNull(), // nutrition, exercise, combined
  
  // Target Demographics
  targetAge: text("target_age"), // 15-25, 26-35, etc.
  targetGender: text("target_gender"),
  targetGoal: text("target_goal").notNull(),
  targetBudget: text("target_budget"), // low, medium, high
  targetExperience: text("target_experience"),
  targetRegion: text("target_region"),
  
  // Plan Metadata
  duration: integer("duration").notNull(), // days
  difficulty: text("difficulty").notNull(),
  estimatedCost: real("estimated_cost"),
  calorieRange: text("calorie_range"),
  
  // Plan Content
  nutritionPlan: json("nutrition_plan"), // 180 days of meals
  exercisePlan: json("exercise_plan"), // 180 days of workouts
  supplementPlan: json("supplement_plan"),
  
  // Plan Stats
  successRate: real("success_rate").default(0),
  userRating: real("user_rating").default(0),
  timesUsed: integer("times_used").default(0),
  
  // AI Generation Metadata
  aiModel: text("ai_model").default("darwfit-ai-v1"),
  generationDate: timestamp("generation_date").defaultNow(),
  lastUpdated: timestamp("last_updated").defaultNow(),
  
  // Cultural Adaptations
  culturalTags: text("cultural_tags").array(),
  religiousCompatible: boolean("religious_compatible").default(true),
  ramadanAdapted: boolean("ramadan_adapted").default(false),
});

// User Plan Assignments and Progress
export const userPlans = pgTable("user_plans", {
  id: serial("id").primaryKey(),
  userProfileId: integer("user_profile_id").notNull(),
  healthPlanId: integer("health_plan_id").notNull(),
  startDate: timestamp("start_date").defaultNow(),
  currentDay: integer("current_day").default(1),
  completedDays: integer("completed_days").default(0),
  completedMeals: integer("completed_meals").default(0),
  completedExercises: integer("completed_exercises").default(0),
  
  // Progress Tracking
  progressData: json("progress_data"), // daily completion status
  modifications: json("modifications"), // user customizations
  feedback: json("feedback"), // user feedback and ratings
  
  // Success Metrics
  weightChange: real("weight_change").default(0),
  bodyFatChange: real("body_fat_change").default(0),
  strengthGains: json("strength_gains"),
  
  status: text("status").default("active"), // active, paused, completed, discontinued
  completionRate: real("completion_rate").default(0),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Daily Meal Plans
export const mealPlans = pgTable("meal_plans", {
  id: serial("id").primaryKey(),
  healthPlanId: integer("health_plan_id").notNull(),
  dayNumber: integer("day_number").notNull(),
  mealType: text("meal_type").notNull(), // breakfast, lunch, dinner, snack1, snack2
  
  // Meal Composition
  foodIds: integer("food_ids").array(),
  quantities: real("quantities").array(), // grams
  totalCalories: real("total_calories").notNull(),
  totalProtein: real("total_protein").notNull(),
  totalCarbs: real("total_carbs").notNull(),
  totalFat: real("total_fat").notNull(),
  totalCost: real("total_cost").notNull(),
  
  // Meal Metadata
  preparationTime: integer("preparation_time").default(0),
  cookingInstructions: text("cooking_instructions").array(),
  alternatives: json("alternatives"), // alternative food options
  
  // Cultural and Dietary
  mealCulture: text("meal_culture"),
  dietaryTags: text("dietary_tags").array(),
});

// Daily Exercise Plans
export const exercisePlans = pgTable("exercise_plans", {
  id: serial("id").primaryKey(),
  healthPlanId: integer("health_plan_id").notNull(),
  dayNumber: integer("day_number").notNull(),
  workoutType: text("workout_type").notNull(), // strength, cardio, flexibility, rest
  
  // Workout Composition
  exerciseIds: integer("exercise_ids").array(),
  sets: integer("sets").array(),
  reps: text("reps").array(),
  weights: real("weights").array(), // kg
  restTimes: integer("rest_times").array(), // seconds
  
  // Workout Metadata
  totalDuration: integer("total_duration").notNull(), // minutes
  estimatedCalories: real("estimated_calories").notNull(),
  difficulty: text("difficulty").notNull(),
  equipment: text("equipment").array(),
  location: text("location").notNull(),
  
  // Progression
  progressionWeek: integer("progression_week").default(1),
  intensityLevel: real("intensity_level").default(1.0),
});

// Advanced Food Database with Cultural Variations
export const culturalFoods = pgTable("cultural_foods", {
  id: serial("id").primaryKey(),
  baseFoodId: integer("base_food_id").notNull(),
  culture: text("culture").notNull(),
  region: text("region").notNull(),
  localName: text("local_name").notNull(),
  preparationStyle: text("preparation_style"),
  seasonality: text("seasonality").array(),
  occasions: text("occasions").array(),
  popularity: real("popularity").default(0.5), // 0-1 scale
  availability: text("availability"), // street, market, restaurant, home
});

// Relations
export const userProfilesRelations = relations(userProfiles, ({ many }) => ({
  userPlans: many(userPlans),
}));

export const healthPlansRelations = relations(healthPlans, ({ many }) => ({
  userPlans: many(userPlans),
  mealPlans: many(mealPlans),
  exercisePlans: many(exercisePlans),
}));

export const userPlansRelations = relations(userPlans, ({ one }) => ({
  userProfile: one(userProfiles, {
    fields: [userPlans.userProfileId],
    references: [userProfiles.id],
  }),
  healthPlan: one(healthPlans, {
    fields: [userPlans.healthPlanId],
    references: [healthPlans.id],
  }),
}));

// Schema Types
export const insertUserProfileSchema = createInsertSchema(userProfiles);
export const insertHealthPlanSchema = createInsertSchema(healthPlans);
export const insertFoodSchema = createInsertSchema(foods);
export const insertExerciseSchema = createInsertSchema(exercises);

export type InsertUserProfile = z.infer<typeof insertUserProfileSchema>;
export type UserProfile = typeof userProfiles.$inferSelect;
export type HealthPlan = typeof healthPlans.$inferSelect;
export type Food = typeof foods.$inferSelect;
export type Exercise = typeof exercises.$inferSelect;
export type UserPlan = typeof userPlans.$inferSelect;
export type MealPlan = typeof mealPlans.$inferSelect;
export type ExercisePlan = typeof exercisePlans.$inferSelect;

// Subscription data schema
export const subscriptionSchema = z.object({
  name: z.string().min(2, { message: "الاسم يجب أن يكون أكثر من حرفين" }),
  age: z.string().or(z.number()).pipe(z.coerce.number().min(15).max(80)),
  gender: z.enum(["male", "female"]),
  weight: z.string().or(z.number()).pipe(z.coerce.number().min(30).max(200)),
  height: z.string().or(z.number()).pipe(z.coerce.number().min(100).max(220)),
  phone: z.string().min(8, { message: "رقم الجوال يجب أن يكون صحيحاً" }),
  goal: z.enum(["lose_weight", "gain_muscle", "maintain", "improve_fitness"]),
  food_details: z.string().min(5, { message: "يرجى إدخال تفاصيل الأكل" }),
  exercise_details: z.string().min(5, { message: "يرجى إدخال تفاصيل التمرين" }),
  // BMI related fields
  has_done_bmi: z.enum(["yes", "no"]),
  previous_bmi_result: z.string().optional(),
  bmi_feedback: z.string().optional(),
  // Subscription type
  subscription_type: z.enum(["1month", "3months", "6months", "12months"]),
});

export type SubscriptionData = z.infer<typeof subscriptionSchema>;

// Free Plan Schema
export const freePlanSchema = z.object({
  fullName: z.string().min(2, "الاسم مطلوب"),
  age: z.number().min(15, "العمر يجب أن يكون 15 سنة على الأقل").max(80, "العمر يجب أن يكون أقل من 80 سنة"),
  gender: z.enum(["male", "female"], {
    required_error: "الجنس مطلوب"
  }),
  height: z.number().min(120, "الطول يجب أن يكون 120 سم على الأقل").max(250, "الطول يجب أن يكون أقل من 250 سم"),
  weight: z.number().min(30, "الوزن يجب أن يكون 30 كيلو على الأقل").max(300, "الوزن يجب أن يكون أقل من 300 كيلو"),
  goal: z.enum(["lose_weight", "gain_weight", "build_muscle", "maintain", "improve_fitness"], {
    required_error: "الهدف مطلوب"
  }),
  activityLevel: z.enum(["sedentary", "light", "moderate", "active", "very_active"], {
    required_error: "مستوى النشاط مطلوب"
  }),
  experienceLevel: z.enum(["beginner", "intermediate", "advanced"], {
    required_error: "مستوى الخبرة مطلوب"
  }),
  workoutPreference: z.enum(["home", "gym", "outdoor", "mixed"], {
    required_error: "مكان التمرين مطلوب"
  }),
  dietaryRestrictions: z.array(z.string()).default([]),
  timeAvailable: z.enum(["30min", "45min", "60min", "90min"], {
    required_error: "الوقت المتاح مطلوب"
  }),
});

export type FreePlanData = z.infer<typeof freePlanSchema>;
