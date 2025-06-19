"use client";

import { getWeekStart, getThaiDate } from "../../lib/date";

type WeekNavigationProps = {
  currentWeekStart: Date;
  onWeekChange: (newWeekStart: Date) => void;
};

export default function WeekNavigation({
  currentWeekStart,
  onWeekChange,
}: WeekNavigationProps) {
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

  const handlePreviousWeek = () => {
    const newWeek = new Date(currentWeekStart);
    newWeek.setDate(newWeek.getDate() - 7);
    onWeekChange(newWeek);
  };

  const handleNextWeek = () => {
    const newWeek = new Date(currentWeekStart);
    newWeek.setDate(newWeek.getDate() + 7);
    onWeekChange(newWeek);
  };

  const handleToday = () => {
    onWeekChange(getWeekStart(getThaiDate()));
  };

  const fourWeeksAgo = new Date(getWeekStart(getThaiDate()));
  fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 4 * 7);
  const canGoBack = currentWeekStart >= fourWeeksAgo;

  const thisWeekStart = getWeekStart(getThaiDate());
  const nextWeek = new Date(currentWeekStart);
  nextWeek.setDate(nextWeek.getDate() + 7);
  const wouldExceedCurrentWeek = nextWeek > thisWeekStart;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          {canGoBack && (
            <button
              onClick={handlePreviousWeek}
              className="text-gray-400 hover:text-gray-600 text-sm"
            >
              ← Previous
            </button>
          )}
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
          {!wouldExceedCurrentWeek && (
            <button
              onClick={handleNextWeek}
              className="text-gray-400 hover:text-gray-600 text-sm"
            >
              Next →
            </button>
          )}
        </div>
        <button
          onClick={handleToday}
          className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-600 transition-colors"
        >
          Today
        </button>
      </div>
    </div>
  );
}
