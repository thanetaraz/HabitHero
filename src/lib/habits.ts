export const COLORS = ["BLUE", "GREEN", "PURPLE", "ORANGE", "RED"] as const;

export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

export const TAILWIND_COLOR_MAP: Record<Color, {
  bg: string;
  border: string;
  accent: string;
  text: string;
  button: string;
  buttonActive: string;
}> = {
  BLUE: {
    bg: "bg-slate-50",
    border: "border-slate-200",
    accent: "bg-slate-900",
    text: "text-slate-900",
    button: "bg-slate-100 hover:bg-slate-200",
    buttonActive: "bg-slate-900 text-white",
  },
  GREEN: {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    accent: "bg-emerald-600",
    text: "text-emerald-900",
    button: "bg-emerald-100 hover:bg-emerald-200",
    buttonActive: "bg-emerald-600 text-white",
  },
  PURPLE: {
    bg: "bg-violet-50",
    border: "border-violet-200",
    accent: "bg-violet-600",
    text: "text-violet-900",
    button: "bg-violet-100 hover:bg-violet-200",
    buttonActive: "bg-violet-600 text-white",
  },
  ORANGE: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    accent: "bg-amber-600",
    text: "text-amber-900",
    button: "bg-amber-100 hover:bg-amber-200",
    buttonActive: "bg-amber-600 text-white",
  },
  RED: {
    bg: "bg-rose-50",
    border: "border-rose-200",
    accent: "bg-rose-600",
    text: "text-rose-900",
    button: "bg-rose-100 hover:bg-rose-200",
    buttonActive: "bg-rose-600 text-white",
  },
};
export const CATEGORY_OPTIONS = [
  { label: "Health", value: "HEALTH" },
  { label: "Education", value: "EDUCATION" },
  { label: "Productivity", value: "PRODUCTIVITY" },
  { label: "Personal Development", value: "PERSONAL_DEVELOPMENT" },
  { label: "Creative", value: "CREATIVE" },
  { label: "Social", value: "SOCIAL" },
  { label: "Finance", value: "FINANCE" },
  { label: "Other", value: "OTHER" },
] as const;

export const CATEGORY_VALUES = ["HEALTH", "EDUCATION", "PRODUCTIVITY", "PERSONAL_DEVELOPMENT", "CREATIVE", "SOCIAL", "FINANCE","OTHER"] as const;

export const DAYS_DETAIL = [
  { key: "Mon", label: "M", fullName: "Monday" },
  { key: "Tue", label: "T", fullName: "Tuesday" },
  { key: "Wed", label: "W", fullName: "Wednesday" },
  { key: "Thu", label: "T", fullName: "Thursday" },
  { key: "Fri", label: "F", fullName: "Friday" },
  { key: "Sat", label: "S", fullName: "Saturday" },
  { key: "Sun", label: "S", fullName: "Sunday" },
] as const;

export type Days = typeof DAYS[number]
export type Color = typeof COLORS[number];