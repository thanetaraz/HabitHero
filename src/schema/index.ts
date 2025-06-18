import { z } from "zod";
import { COLORS, DAYS, CATEGORY_VALUES } from "@/lib/habits";


export const habitInputSchema = z.object({
  name: z
    .string()
    .min(1, "Habit name is required")
    .max(50, "Habit name must be 50 characters or less"),

  description: z
    .string()
    .min(1, "Description is required")
    .max(200, "Description must be 200 characters or less"),

  category: z.enum(CATEGORY_VALUES, {
    errorMap: () => ({ message: "Please select a valid category" }),
  }),
  selectedDays: z.array(z.enum(DAYS)).nonempty("Please select at least one day"),
  color: z.enum(COLORS)
  });

  export const habitSchema = habitInputSchema.extend({
    id: z.string().uuid(),
    createdAt: z.string().or(z.date()),
  });


  
export type HabitFormData = z.infer<typeof habitInputSchema>; // 👉 ฟอร์มใช้ตัวนี้
export type HabitFromDB = z.infer<typeof habitSchema>;        // 👉 data จาก backend ใช้ตัวนี้
