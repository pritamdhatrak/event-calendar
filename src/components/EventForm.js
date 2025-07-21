import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

function EventForm({ selectedDate, event, onSubmit, onCancel, onDelete }) {
  const [formData, setFormData] = useState({
    title: '',
    date: selectedDate || format(new Date(), 'yyyy-MM-dd'),
    time: '09:00',
    description: '',
    recurrence: 'none',
    recurrenceEnd: '',
    recurrenceWeekdays: [],
    recurrenceInterval: 1,
    category: '',
    color: '#3498db'
  });

  useEffect(() => {
    if (event) {
      setFormData({
        ...event,
        recurrenceWeekdays: event.recurrenceWeekdays || [],
        recurrenceInterval: event.recurrenceInterval || 1
      });
    } else if (selectedDate) {
      setFormData(prev => ({ ...prev, date: selectedDate }));
    }
  }, [event, selectedDate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleWeekdayToggle = (day) => {
    setFormData(prev => ({
      ...prev,
      recurrenceWeekdays: prev.recurrenceWeekdays.includes(day)
        ? prev.recurrenceWeekdays.filter(d => d !== day)
        : [...prev.recurrenceWeekdays, day]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c'];
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="event-form" onClick={e => e.stopPropagation()}>
        <h2>{event ? 'Edit Event' : 'New Event'}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Event Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="time">Time</label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Work, Personal, etc."
            />
          </div>

          <div className="form-group">
            <label htmlFor="recurrence">Recurrence</label>
            <select
              id="recurrence"
              name="recurrence"
              value={formData.recurrence}
              onChange={handleChange}
            >
              <option value="none">None</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="custom">Custom</option>
            </select>
          </div>

          {formData.recurrence === 'weekly' && (
            <div className="form-group">
              <label>Repeat on</label>
              <div className="weekday-selector">
                {weekdays.map(day => (
                  <div key={day} className="weekday-checkbox">
                    <input
                      type="checkbox"
                      id={day}
                      checked={formData.recurrenceWeekdays.includes(day)}
                      onChange={() => handleWeekdayToggle(day)}
                    />
                    <label htmlFor={day}>{day}</label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {formData.recurrence === 'custom' && (
            <div className="form-group">
              <label htmlFor="recurrenceInterval">Repeat every</label>
              <input
                type="number"
                id="recurrenceInterval"
                name="recurrenceInterval"
                value={formData.recurrenceInterval}
                onChange={handleChange}
                min="1"
              /> days
            </div>
          )}

          {formData.recurrence !== 'none' && (
            <div className="form-group">
              <label htmlFor="recurrenceEnd">End Date</label>
              <input
                type="date"
                id="recurrenceEnd"
                name="recurrenceEnd"
                value={formData.recurrenceEnd}
                onChange={handleChange}
                min={formData.date}
              />
            </div>
          )}

          <div className="form-group">
            <label>Color</label>
            <div className="color-options">
              {colors.map(color => (
                <div
                  key={color}
                  className={`color-option ${formData.color === color ? 'selected' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setFormData(prev => ({ ...prev, color }))}
                />
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {event ? 'Update' : 'Create'} Event
            </button>
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            {event && onDelete && (
              <button type="button" className="btn btn-danger" onClick={onDelete}>
                Delete
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default EventForm;
