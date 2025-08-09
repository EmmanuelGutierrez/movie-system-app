const isToday = (date: Date) => {
  const now = new Date();
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
};

const isSameDay = (a: Date, b: Date) => {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
};

const toDateString = (date: Date) => {
  return date.toISOString().split("T")[0];
};

const getDayName = (date: Date) => {
  return date.toLocaleDateString("es-AR", { weekday: "short" }).toUpperCase();
};

const getShortDay = (date: Date) => {
  return date
    .toLocaleDateString("es-AR", { day: "numeric", month: "short" })
    .toUpperCase();
};

const formatHour = (date: Date) => {
  return date
    .toLocaleDateString("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .toUpperCase();
};

const createTimestamp = (date: Date, hours: number, minutes: number) => {
  const d = new Date(date);
  d.setHours(hours, minutes, 0, 0);
  return Math.floor(d.getTime() / 1000);
};

export {
  isToday,
  isSameDay,
  toDateString,
  getDayName,
  getShortDay,
  formatHour,
  createTimestamp,
};
