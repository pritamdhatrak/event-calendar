import { format, addDays, addWeeks, addMonths, isBefore, parseISO } from 'date-fns';

export const formatDateString = (date) => {
  return format(date, 'yyyy-MM-dd');
};

export const parseDate = (dateString) => {
  return parseISO(dateString);
};

export const getDayOfWeek = (date) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[date.getDay()];
};

export const addDaysToDate = (date, days) => {
  return addDays(date, days);
};

export const addWeeksToDate = (date, weeks) => {
  return addWeeks(date, weeks);
};

export const addMonthsToDate = (date, months) => {
  return addMonths(date, months);
};

export const isBeforeDate = (date1, date2) => {
  return isBefore(date1, date2);
};
