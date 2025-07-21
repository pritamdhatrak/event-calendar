import React from 'react';
import { format } from 'date-fns';
import { useDrop } from 'react-dnd';
import EventItem from './EventItem';

function CalendarDay({ date, events, isCurrentMonth, isToday, onDateClick, onEventClick, onEventDrop }) {
  const [{ isOver }, drop] = useDrop({
    accept: 'event',
    drop: (item) => {
      onEventDrop(item.id, format(date, 'yyyy-MM-dd'));
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const handleDayClick = (e) => {
    if (e.target.classList.contains('calendar-day')) {
      onDateClick(format(date, 'yyyy-MM-dd'));
    }
  };

  const dayClasses = [
    'calendar-day',
    !isCurrentMonth && 'other-month',
    isToday && 'today',
    isOver && 'drag-over'
  ].filter(Boolean).join(' ');

  return (
    <div
      ref={drop}
      className={dayClasses}
      onClick={handleDayClick}
    >
      <div className="day-number">{format(date, 'd')}</div>
      <div className="events-container">
        {events.map(event => (
          <EventItem
            key={event.id}
            event={event}
            onClick={() => onEventClick(event)}
          />
        ))}
      </div>
    </div>
  );
}

export default CalendarDay;
