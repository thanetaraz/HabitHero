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
  habitId: z.string(),
});

export const habitSchema = habitInputSchema.extend({  
    userId: z.string(),
      id: z.string().optional(), // ✅ เพิ่มอันนี้

    
});
export const habitCardSchema = habitSchema.extend({  
    
     completions: z.array(habitCompletionSchema).optional(), 
});

export const signUpSchema = z.object({
  email: z.string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z.string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});



export type FormData = z.infer<typeof signUpSchema>;
export type HabitFormData = z.infer<typeof habitInputSchema>; 
export type HabitFromDB = z.infer<typeof habitSchema>; 
export type HabitCardDB = z.infer<typeof habitCardSchema>; 
export type HabitCompletionFromDB = z.infer<typeof habitCompletionSchema>;
