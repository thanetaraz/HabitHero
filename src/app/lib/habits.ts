// lib/habits.ts

export type Day = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

export type Category =
  | "health"
  | "education"
  | "productivity"
  | "personal-development"
  | "creative"
  | "social"
  | "finance"
  | "other";

export interface HabitFormData {
  name: string;
  description: string;
  category: Category | null;
  selectedDays: Day[]; // ✅ ต้องบอกว่าเป็น Day[]
  color: string;
}


export const DAYS: Day[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const CATEGORY_OPTIONS: { label: string; value: Category }[] = [    
    { label: "Health & Fitness", value: "health" },
    { label: "Learning & Education", value: "education" },
    { label: "Productivity", value: "productivity" },
    { label: "Personal Development", value: "personal-development" },
    { label: "Creative", value: "creative" },
    { label: "Social", value: "social" },
    { label: "Finance", value: "finance" },
    { label: "Other", value: "other" },
];

export const COLORS = [
    "#3B82F6", "#EF4444", "#10B981", "#F59E0B",
    "#8B5CF6", "#EC4899", "#06B6D4", "#84CC16",
];
