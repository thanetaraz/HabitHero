import { z } from "zod";
import { COLORS, DAYS, CATEGORY_VALUES } from "@/lib/habits";


const nameSchema = z
  .string()
  .min(1, "Habit name is required")
  .max(50, "Habit name must be 50 characters or less");

const descriptionSchema = z
  .string()
  .min(1, "Description is required")
  .max(200, "Description must be 200 characters or less");

const zodIsoDate = z
  .string()
  .refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid ISO date format",
  })
  .transform((val) => new Date(val));

export const habitInputSchema = z.object({
  name: nameSchema,
  description: descriptionSchema,
  category: z.enum(CATEGORY_VALUES, {
    errorMap: () => ({ message: "Please select a valid category" }),
  }),
  selectedDays: z
    .array(z.enum(DAYS))
    .nonempty("Please select at least one day"),
  color: z.enum(COLORS),
});


export const habitCompletionSchema = z.object({
  date: zodIsoDate, 
  habitId: z.string().uuid(),
});

export const habitSchema = habitInputSchema.extend({
  id:z.string().uuid(),
  createdAt: z.date(),
  completions: z.array(habitCompletionSchema),
});


export type HabitFormData = z.infer<typeof habitInputSchema>; 
export type HabitFromDB = z.infer<typeof habitSchema>;        
export type HabitCompletionFromDB = z.infer<typeof habitCompletionSchema>;
