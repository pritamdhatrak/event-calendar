import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, addMonths, subMonths, getDay, startOfWeek, endOfWeek } from 'date-fns';
import CalendarDay from './CalendarDay';

function Calendar({ events, onDateClick, onEventClick, onEventDrop }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handlePreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const getEventsForDay = (date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return events.filter(event => event.date === dateStr);
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <h2>{format(currentMonth, 'MMMM yyyy')}</h2>
        <div className="calendar-nav">
          <button className="nav-button" onClick={handlePreviousMonth}>
            ←
          </button>
          <button className="nav-button" onClick={handleNextMonth}>
            →
          </button>
        </div>
      </div>
      
      <div className="calendar-grid">
        {weekdays.map(day => (
          <div key={day} className="weekday-header">
            {day}
          </div>
        ))}
        
        {days.map(day => (
          <CalendarDay
            key={day.toISOString()}
            date={day}
            events={getEventsForDay(day)}
            isCurrentMonth={isSameMonth(day, currentMonth)}
            isToday={isToday(day)}
            onDateClick={onDateClick}
            onEventClick={onEventClick}
            onEventDrop={onEventDrop}
          />
        ))}
      </div>
    </div>
  );
}

export default Calendar;
