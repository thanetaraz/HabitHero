export const COLORS = ["BLUE", "GREEN", "ORANGE"] as const;

export const COLOR_MAP: Record<typeof COLORS[number], string> = {
  BLUE: "#3B82F6",
  GREEN: "#10B981",
  ORANGE: "#F59E0B",
};

export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

export type Days = typeof DAYS[number]

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