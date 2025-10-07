import moment from "moment-jalaali";
import { format } from "date-fns-jalali";
import { toEnglishDigits, toPersianDigits } from "./numberConversions";

export const convertToGregorian = (shamsiDate: string): string => {
  const [jYear, jMonth, jDay] = toEnglishDigits(shamsiDate)
    .split("/")
    .map(Number);
  const m = moment(`${jYear}-${jMonth}-${jDay}`, "jYYYY-jMM-jDD");
  return toEnglishDigits(m.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"));
};

export const convertToShamsi = (gregorianDate: string): string => {
  if (!gregorianDate) return "";

  try {
    // Parse the input string to a Date object
    const date = new Date(gregorianDate);

    // Format the date to Shamsi (Persian) calendar
    // yyyy-MM-dd format
    const shamsiDate = format(date, "yyyy/MM/dd");

    return toPersianDigits(shamsiDate);
  } catch (error) {
    console.error("Error converting date:", error);
    return "";
  }
};

export const getDatesBetween = (startDate: string, endDate: string) => {
  // Parse the dates to ensure they are Date objects
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Create an array to hold the dates
  const dates = [];

  // Loop through each day
  for (
    let date = new Date(start);
    date <= end;
    date.setDate(date.getDate() + 1)
  ) {
    dates.push(new Date(date).toISOString().split("T")[0]); // Add a copy of the current date
  }

  return dates;
};
