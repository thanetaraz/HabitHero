export const getThaiDate = () => {
  return new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Bangkok" })
  );
};

export const getWeekStart = (date: Date) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day;
  return new Date(d.setDate(diff + 1));
};

export const formatDateKey = (date: Date) => {
  return date.toISOString().split("T")[0];
};
