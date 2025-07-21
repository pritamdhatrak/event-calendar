import React from 'react';
import { useDrag } from 'react-dnd';

function EventItem({ event, onClick }) {
  const [{ isDragging }, drag] = useDrag({
    type: 'event',
    item: { id: event.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const eventStyle = {
    backgroundColor: event.color || '#3498db',
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={drag}
      className={`event-item ${isDragging ? 'dragging' : ''}`}
      style={eventStyle}
      onClick={onClick}
    >
      {event.time} - {event.title}
    </div>
  );
}

export default EventItem;
