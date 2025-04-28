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
});

export type SubscriptionData = z.infer<typeof subscriptionSchema>;
