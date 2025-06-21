"use client";

import { Trash2, Check } from "lucide-react";
import { HabitCardDB } from "@/schema";
import { TAILWIND_COLOR_MAP, Color, DAYS_DETAIL } from "@/lib/habits";
import { formatDateKey, getThaiDate } from "@/lib/date";

type HabitCardProps = {
  habit: HabitCardDB;
  weekDates: Date[];
  currentWeekStart: Date;
  onToggleCompletion: (habitId: string, dayDate: Date) => void;
  onDelete: (habitId: string) => void;
};

const getHabitColors = (color: string) => {
  return TAILWIND_COLOR_MAP[(color as Color) || "BLUE"];
};

export default function HabitCard({
  habit,
  weekDates,
  currentWeekStart,
  onToggleCompletion,
  onDelete,
}: HabitCardProps) {
  const colors = getHabitColors(habit.color);
  const today = formatDateKey(getThaiDate());

  const calculateWeekProgress = () => {
    if (!habit.selectedDays || habit.selectedDays.length === 0) return 0;

    let completedDays = 0;

    for (let i = 0; i < 7; i++) {
      const dayDate = new Date(currentWeekStart);
      dayDate.setDate(currentWeekStart.getDate() + i);
      const dayKey = DAYS_DETAIL[i].key;
      const dateKey = formatDateKey(dayDate);

      if (habit.selectedDays.includes(dayKey)) {
        const isCompleted = habit.completions?.some((completion) => {
          const completionDate = new Date(completion.date);
          const completionDateKey = formatDateKey(completionDate);
          return completionDateKey === dateKey;
        });

        if (isCompleted) {
          completedDays++;
        }
      }
    }

    return Math.round((completedDays / habit.selectedDays.length) * 100);
  };

  const weekProgress = calculateWeekProgress();

  return (
    <div
      className={`${colors.bg} border ${colors.border} rounded-xl overflow-hidden hover:shadow-sm transition-shadow duration-200`}
    >
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 ${colors.accent} rounded-full`} />
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              {habit.category}
            </span>
          </div>
          <button
            onClick={() => habit.id && onDelete(habit.id)}
            className="p-1 text-gray-400 hover:text-red-600 transition-colors duration-200"
          >
            <Trash2 size={14} />
          </button>
        </div>

        <div className="mb-4">
          <h3 className={`font-medium ${colors.text} mb-1 text-sm`}>
            {habit.name}
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            {habit.description}
          </p>
        </div>

        <div className="mb-4">
          <div className="grid grid-cols-7 gap-1">
            {DAYS_DETAIL.map((day, index) => {
              const dayDate = weekDates[index];
              const dateKey = formatDateKey(dayDate);
              const isSelectedDay = habit.selectedDays?.includes(day.key);
              const isCompleted = habit.completions?.some((c) => {
                const completionDate = new Date(c.date);
                const completionDateKey = formatDateKey(completionDate);
                return completionDateKey === dateKey;
              });
              const isToday = dateKey === today;

              const fourWeeksAgo = new Date(getThaiDate());
              fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 4 * 7);
              const isInAllowedRange = dayDate >= fourWeeksAgo;

              const canInteract = isSelectedDay && isInAllowedRange;

              return (
                <button
                  key={day.key}
                  onClick={() =>
                    canInteract && habit.id
                      ? onToggleCompletion(habit.id, dayDate)
                      : null
                  }
                  disabled={!canInteract}
                  className={`
                    h-8 w-8 rounded-lg text-xs font-medium transition-all duration-200 relative
                    ${
                      canInteract
                        ? isCompleted
                          ? colors.buttonActive
                          : `${colors.button} ${colors.text}`
                        : isSelectedDay
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-gray-50 text-gray-300 cursor-not-allowed"
                    }
                    ${
                      isToday && isSelectedDay
                        ? "ring-2 ring-offset-1 ring-gray-300"
                        : ""
                    }
                  `}
                  title={`${day.fullName} ${dayDate.toLocaleDateString(
                    "th-TH",
                    {
                      timeZone: "Asia/Bangkok",
                    }
                  )}${
                    !isInAllowedRange && isSelectedDay
                      ? " (Cannot modify - too far back)"
                      : ""
                  }`}
                >
                  {isCompleted ? (
                    <Check size={12} className="mx-auto" />
                  ) : (
                    day.label
                  )}
                  {isToday && (
                    <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-600">This Week</span>
            <span className="text-xs font-medium text-gray-900">
              {weekProgress}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className={`h-1.5 ${colors.accent} rounded-full transition-all duration-300`}
              style={{ width: `${weekProgress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
