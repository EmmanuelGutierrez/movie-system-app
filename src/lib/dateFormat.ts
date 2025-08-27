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

const getFullDay=(date:Date)=>{
  const day= date.toLocaleDateString("es-AR", { weekday: "long" })
  const month=date.toLocaleDateString(
    "es-AR",
    {
      day: "numeric",
      month: "long",
    }
  )
  return `${day.charAt(0).toUpperCase() + day.slice(1)} ${month.charAt(0).toUpperCase() + month.slice(1)} `;
}

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

const getHour = (date: Date) => {
  const hour = date.getHours();
  const minutes = date.getMinutes();
  return `${hour}:${minutes}`;
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
  getHour,
  getFullDay,
};
