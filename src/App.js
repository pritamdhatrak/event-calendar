import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Calendar from './components/Calendar';
import EventForm from './components/EventForm';
import SearchBar from './components/SearchBar';
import { generateRecurringEvents } from './utils/eventUtils';
import './App.css';

function App() {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [showEventForm, setShowEventForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  useEffect(() => {
    const savedEvents = localStorage.getItem('calendarEvents');
    if (savedEvents) {
      try {
        setEvents(JSON.parse(savedEvents));
      } catch (error) {
        console.error('Error parsing saved events:', error);
        setEvents([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  }, [events]);

  const handleAddEvent = (eventData) => {
    const baseEvent = {
      ...eventData,
      id: Date.now().toString()
    };

    let newEvents = [baseEvent];
    
    if (eventData.recurrence && eventData.recurrence !== 'none') {
      const recurringEvents = generateRecurringEvents(baseEvent);
      newEvents = [...newEvents, ...recurringEvents];
    }

    const conflictingEvents = newEvents.filter(newEvent => 
      events.some(existingEvent => 
        existingEvent.date === newEvent.date && 
        existingEvent.time === newEvent.time &&
        existingEvent.id !== newEvent.id
      )
    );

    if (conflictingEvents.length > 0) {
      if (!window.confirm('There are conflicts with existing events. Do you want to continue?')) {
        return;
      }
    }

    setEvents([...events, ...newEvents]);
    setShowEventForm(false);
    setSelectedDate(null);
  };

  const handleUpdateEvent = (eventData) => {
    const updatedEvents = events.map(event => 
      event.id === editingEvent.id ? { ...event, ...eventData } : event
    );
    
    if (eventData.recurrence && eventData.recurrence !== 'none') {
      const baseEvent = { ...editingEvent, ...eventData };
      const recurringEvents = generateRecurringEvents(baseEvent);
      const filteredEvents = updatedEvents.filter(e => 
        !e.recurringId || e.recurringId !== editingEvent.id
      );
      setEvents([...filteredEvents, ...recurringEvents]);
    } else {
      setEvents(updatedEvents);
    }
    
    setShowEventForm(false);
    setEditingEvent(null);
  };

  const handleDeleteEvent = (eventId) => {
    const eventToDelete = events.find(e => e.id === eventId);
    if (eventToDelete && eventToDelete.recurringId) {
      setEvents(events.filter(e => e.recurringId !== eventToDelete.recurringId));
    } else {
      setEvents(events.filter(e => e.id !== eventId));
    }
  };

  const handleDragEvent = (eventId, newDate) => {
    const eventToDrag = events.find(e => e.id === eventId);
    if (!eventToDrag) return;

    const conflictExists = events.some(e => 
      e.date === newDate && 
      e.time === eventToDrag.time && 
      e.id !== eventId
    );

    if (conflictExists && !window.confirm('This time slot has a conflict. Continue?')) {
      return;
    }

    setEvents(events.map(event => 
      event.id === eventId ? { ...event, date: newDate } : event
    ));
  };

  const filteredEvents = events.filter(event => {
    if (!event) return false;
    
    const title = event.title || '';
    const description = event.description || '';
    const category = event.category || '';
    
    const searchLower = searchTerm.toLowerCase().trim();
    
    const matchesSearch = searchTerm === '' || 
      title.toLowerCase().includes(searchLower) ||
      description.toLowerCase().includes(searchLower) ||
      category.toLowerCase().includes(searchLower);
    
    const matchesCategory = filterCategory === 'all' || 
      (event.category && event.category === filterCategory);
    
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(events.map(e => e.category).filter(Boolean))];

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <header className="app-header">
          <h1>Event Calendar</h1>
          <div className="header-controls">
            <SearchBar 
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
              onClearSearch={clearSearch}
            />
            <select 
              value={filterCategory} 
              onChange={(e) => setFilterCategory(e.target.value)}
              className="category-filter"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <div className="search-info">
              {searchTerm && (
                <span>Found {filteredEvents.length} events</span>
              )}
            </div>
          </div>
        </header>
        
        <main className="app-main">
          <Calendar 
            events={filteredEvents}
            onDateClick={(date) => {
              setSelectedDate(date);
              setShowEventForm(true);
              setEditingEvent(null);
            }}
            onEventClick={(event) => {
              setEditingEvent(event);
              setShowEventForm(true);
              setSelectedDate(null);
            }}
            onEventDrop={handleDragEvent}
          />
        </main>

        {showEventForm && (
          <EventForm
            selectedDate={selectedDate}
            event={editingEvent}
            onSubmit={editingEvent ? handleUpdateEvent : handleAddEvent}
            onCancel={() => {
              setShowEventForm(false);
              setSelectedDate(null);
              setEditingEvent(null);
            }}
            onDelete={editingEvent ? () => {
              handleDeleteEvent(editingEvent.id);
              setShowEventForm(false);
              setEditingEvent(null);
            } : null}
          />
        )}
      </div>
    </DndProvider>
  );
}

export default App;
