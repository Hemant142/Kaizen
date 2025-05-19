import { format } from 'date-fns';

export const formatDate = (dateString, formatType = 'month') => {
  const date = new Date(dateString);
  
  switch (formatType) {
    case 'day':
      return format(date, 'MMM d, yyyy');
    case 'month':
      return format(date, 'MMM yyyy');
    case 'year':
      return format(date, 'yyyy');
    case 'short':
      return format(date, 'MM/dd/yy');
    case 'time':
      return format(date, 'h:mm a');
    case 'datetime':
      return format(date, 'MMM d, yyyy h:mm a');
    default:
      return format(date, 'MMM d');
  }
};

export const formatDateRange = (startDate, endDate) => {
  return `${formatDate(startDate, 'day')} - ${formatDate(endDate, 'day')}`;
};

export const getRelativeDateRange = (days) => {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - days);
  
  return { start, end };
};

export const getPreviousPeriod = (start, end) => {
  const diff = end.getTime() - start.getTime();
  const prevEnd = new Date(start);
  const prevStart = new Date(new Date(start).getTime() - diff);
  
  return { start: prevStart, end: prevEnd };
};