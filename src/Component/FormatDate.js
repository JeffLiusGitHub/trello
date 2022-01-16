
import { format, utcToZonedTime } from "date-fns-tz";

const formatDate = (date) => {
  if (!date) {
    return;
  }
  const zonedDate = utcToZonedTime(date, "Australia/Melbourne");
  return `${format(zonedDate, "E d MMM yyyy")}`;
};

export default formatDate;