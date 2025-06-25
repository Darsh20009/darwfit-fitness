import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

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
