"use client";

import { startOfWeek, endOfWeek, getWeek, format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { th } from "date-fns/locale";

const timeZone = "Asia/Bangkok";

export default function WeekHeader() {
  const now = new Date();
  const zonedDate = toZonedTime(now, timeZone);

  const weekStart = startOfWeek(zonedDate, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(zonedDate, { weekStartsOn: 1 });
  const weekNumber = getWeek(zonedDate, { weekStartsOn: 1 });

  const formattedStart = format(weekStart, "d MMM", { locale: th });
  const formattedEnd = format(weekEnd, "d MMM", { locale: th });

  return (
    <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg text-right">
      <div className="text-sm font-medium">สัปดาห์ที่ {weekNumber}</div>
      <div className="text-xs">
        {formattedStart} - {formattedEnd}
      </div>
    </div>
  );
}
