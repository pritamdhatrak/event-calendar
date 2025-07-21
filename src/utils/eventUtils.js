import { parseISO, addDays, addWeeks, addMonths, format, getDay } from 'date-fns';

export const generateRecurringEvents = (baseEvent) => {
  const events = [];
  const startDate = parseISO(baseEvent.date);
  const endDate = baseEvent.recurrenceEnd ? parseISO(baseEvent.recurrenceEnd) : addMonths(startDate, 6);
  
  let currentDate = startDate;
  let eventCount = 0;
  const maxEvents = 100;

  const recurringId = baseEvent.id;

  while (currentDate <= endDate && eventCount < maxEvents) {
    if (baseEvent.recurrence === 'daily') {
      currentDate = addDays(currentDate, 1);
      events.push({
        ...baseEvent,
        id: `${baseEvent.id}-${eventCount}`,
        date: format(currentDate, 'yyyy-MM-dd'),
        recurringId
      });
    } else if (baseEvent.recurrence === 'weekly') {
      currentDate = addDays(currentDate, 1);
      const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][getDay(currentDate)];
      
      if (!baseEvent.recurrenceWeekdays || baseEvent.recurrenceWeekdays.length === 0 || 
          baseEvent.recurrenceWeekdays.includes(dayName)) {
        events.push({
          ...baseEvent,
          id: `${baseEvent.id}-${eventCount}`,
          date: format(currentDate, 'yyyy-MM-dd'),
          recurringId
        });
        eventCount++;
      }
    } else if (baseEvent.recurrence === 'monthly') {
      currentDate = addMonths(currentDate, 1);
      events.push({
        ...baseEvent,
        id: `${baseEvent.id}-${eventCount}`,
        date: format(currentDate, 'yyyy-MM-dd'),
        recurringId
      });
    } else if (baseEvent.recurrence === 'custom' && baseEvent.recurrenceInterval) {
      currentDate = addDays(currentDate, baseEvent.recurrenceInterval);
      events.push({
        ...baseEvent,
        id: `${baseEvent.id}-${eventCount}`,
        date: format(currentDate, 'yyyy-MM-dd'),
        recurringId
      });
    }
    
    eventCount++;
  }

  return events;
};

export const checkEventConflict = (events, newEvent) => {
  return events.some(event => 
    event.date === newEvent.date && 
    event.time === newEvent.time &&
    event.id !== newEvent.id
  );
};

export const filterEventsByDate = (events, date) => {
  const dateString = format(date, 'yyyy-MM-dd');
  return events.filter(event => event.date === dateString);
};

export const sortEventsByTime = (events) => {
  return events.sort((a, b) => {
    const timeA = a.time.split(':').map(Number);
    const timeB = b.time.split(':').map(Number);
    return (timeA[0] * 60 + timeA[1]) - (timeB[0] * 60 + timeB[1]);
  });
};
