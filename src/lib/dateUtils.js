import { DateTime } from "luxon";

export const prettifyDate = (jsDate) => {
  const date = new Date(jsDate);
  console.log("date: " + date);
  return DateTime.fromJSDate(date).toLocaleString(DateTime.DATETIME_MED);
};
