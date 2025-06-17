import { z } from "zod";
import { COLORS, DAYS, CATEGORY_VALUES } from "@/lib/habits";


export const habitSchema = z.object({
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

export type HabitFormData = z.infer<typeof habitSchema>;
