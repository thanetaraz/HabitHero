"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Check } from "lucide-react";
import AddHabit from "../components/habits/AddHabit";
import WeekHeader from "../components/habits/WeekHeader";
import { HabitFromDB } from "../schema";
import { TAILWIND_COLOR_MAP, Color, DAYS_DETAIL } from "../lib/habits";

const getThaiDate = () => {
  return new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Bangkok" })
  );
};

const getWeekStart = (date: Date) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day;
  return new Date(d.setDate(diff + 1));
};

const formatDateKey = (date: Date) => {
  return date.toISOString().split("T")[0];
};

const getHabitColors = (color: string) => {
  return TAILWIND_COLOR_MAP[(color as Color) || "BLUE"];
};

export default function HabitTracker() {
  const [isToggleHabit, setIsToggleHabit] = useState(false);
  const [habits, setHabits] = useState<HabitFromDB[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentWeekStart, setCurrentWeekStart] = useState(() =>
    getWeekStart(getThaiDate())
  );

  const calculateWeekProgress = (habit: HabitFromDB) => {
    if (!habit.selectedDays || habit.selectedDays.length === 0) return 0;

    const weekStart = currentWeekStart;
    let completedDays = 0;

    for (let i = 0; i < 7; i++) {
      const dayDate = new Date(weekStart);
      dayDate.setDate(weekStart.getDate() + i);
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

  const toggleHabitCompletion = async (habitId: string, dayDate: Date) => {
    const dayDateISO = dayDate.toISOString();
    try {
      const res = await fetch(`api/habit/${habitId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date: dayDateISO }),
      });

      const result = await res.json();
      fetchHabits();
      if (!res.ok) {
        alert(result.error || "Something went wrong, please try again.");
        return;
      }
    } catch (err) {
      console.error("fetch error:", err);
      alert("Network error, please check your connection and try again.");
    } finally {
    }
  };

  // Delete habit
  const deleteHabit = async (habitId: string) => {
    if (!confirm("Are you sure you want to delete this habit?")) return;

    try {
      const response = await fetch(`/api/habit/${habitId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete habit");
      }

      setHabits((prev) => prev.filter((habit) => habit.id !== habitId));
    } catch (error) {
      console.error("Error deleting habit:", error);
      setError("Failed to delete habit");
      setTimeout(() => setError(null), 3000);
    }
  };

  const fetchHabits = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/habit");
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data: HabitFromDB[] = await res.json();
      setHabits(data);
    } catch (err) {
      setError((err as Error).message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const getWeekDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentWeekStart);
      date.setDate(currentWeekStart.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const weekDates = getWeekDates();
  const today = formatDateKey(getThaiDate());

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-medium text-gray-900 mb-1">
                Habits
              </h1>
              <p className="text-gray-500 text-sm">
                Track your weekly progress
              </p>
            </div>
            <WeekHeader />
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              {(() => {
                const fourWeeksAgo = new Date(getWeekStart(getThaiDate()));
                fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 4 * 7);
                const canGoBack = currentWeekStart >= fourWeeksAgo;

                return canGoBack ? (
                  <button
                    onClick={() => {
                      const newWeek = new Date(currentWeekStart);
                      newWeek.setDate(newWeek.getDate() - 7);
                      setCurrentWeekStart(newWeek);
                    }}
                    className="text-gray-400 hover:text-gray-600 text-sm"
                  >
                    ← Previous
                  </button>
                ) : null;
              })()}
              <h2 className="text-sm font-medium text-gray-900">
                {currentWeekStart.toLocaleDateString("th-TH", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  timeZone: "Asia/Bangkok",
                })}{" "}
                -{" "}
                {weekDates[6].toLocaleDateString("th-TH", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  timeZone: "Asia/Bangkok",
                })}
              </h2>
              {(() => {
                const thisWeekStart = getWeekStart(getThaiDate());
                const nextWeek = new Date(currentWeekStart);
                nextWeek.setDate(nextWeek.getDate() + 7);
                const wouldExceedCurrentWeek = nextWeek > thisWeekStart;

                return !wouldExceedCurrentWeek ? (
                  <button
                    onClick={() => {
                      const newWeek = new Date(currentWeekStart);
                      newWeek.setDate(newWeek.getDate() + 7);
                      setCurrentWeekStart(newWeek);
                    }}
                    className="text-gray-400 hover:text-gray-600 text-sm"
                  >
                    Next →
                  </button>
                ) : null;
              })()}
            </div>
            <button
              onClick={() => setCurrentWeekStart(getWeekStart(getThaiDate()))}
              className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-600 transition-colors"
            >
              Today
            </button>
          </div>
        </div>

        <div className="mb-8">
          <button
            onClick={() => setIsToggleHabit(!isToggleHabit)}
            className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors duration-200"
          >
            <Plus size={16} />
            Add Habit
          </button>
        </div>

        {isToggleHabit && <AddHabit onClose={() => setIsToggleHabit(false)} />}

        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-gray-400 text-sm">Loading...</div>
          </div>
        )}

        {!loading && (
          <>
            {habits.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Plus size={20} className="text-gray-400" />
                </div>
                <p className="text-gray-500 text-sm mb-1">No habits yet</p>
                <p className="text-gray-400 text-xs">
                  Create your first habit to get started
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {habits.map((habit) => {
                  const colors = getHabitColors(habit.color);
                  const weekProgress = calculateWeekProgress(habit);

                  return (
                    <div
                      key={habit.id}
                      className={`${colors.bg} border ${colors.border} rounded-xl overflow-hidden hover:shadow-sm transition-shadow duration-200`}
                    >
                      <div className="p-5">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-2 h-2 ${colors.accent} rounded-full`}
                            />
                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                              {habit.category}
                            </span>
                          </div>
                          <button
                            onClick={() => deleteHabit(habit.id)}
                            className="p-1 text-gray-400 hover:text-red-600 transition-colors duration-200"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        <div className="mb-4">
                          <h3
                            className={`font-medium ${colors.text} mb-1 text-sm`}
                          >
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
                              const isSelectedDay =
                                habit.selectedDays?.includes(day.key);
                              const isCompleted = habit.completions?.some(
                                (c) => {
                                  const completionDate = new Date(c.date);
                                  const completionDateKey =
                                    formatDateKey(completionDate);
                                  return completionDateKey === dateKey;
                                }
                              );
                              const isToday = dateKey === today;

                              const fourWeeksAgo = new Date(getThaiDate());
                              fourWeeksAgo.setDate(
                                fourWeeksAgo.getDate() - 4 * 7
                              );
                              const isInAllowedRange = dayDate >= fourWeeksAgo;

                              const canInteract =
                                isSelectedDay && isInAllowedRange;

                              return (
                                <button
                                  key={day.key}
                                  onClick={() =>
                                    canInteract
                                      ? toggleHabitCompletion(habit.id, dayDate)
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
                                  title={`${
                                    day.fullName
                                  } ${dayDate.toLocaleDateString("th-TH", {
                                    timeZone: "Asia/Bangkok",
                                  })}${
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
                            <span className="text-xs font-medium text-gray-600">
                              This Week
                            </span>
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
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
