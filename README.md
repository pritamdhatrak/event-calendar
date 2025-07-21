cat > README.md << 'EOF'
# Event Calendar App

A React-based event calendar I built to learn more about complex state management and drag-and-drop functionality. Started this as a personal project but it turned out pretty decent!



## Live Demo
 **Live App**: https://event-calendar-amber.vercel.app/
 **GitHub**: https://github.com/pritamdhatrak/event-calendar

## What it does

- Monthly calendar view (took me forever to get the date calculations right )
- Add/edit/delete events with a clean modal form
- Drag and drop events between days (this was surprisingly tricky)
- Recurring events - daily, weekly, monthly, or custom intervals
- Search through events (searches title, description, even categories)
- Conflict detection when you try to double-book yourself
- Everything saves to localStorage so your events stick around

## Getting Started

```bash
# Clone it
git clone https://github.com/pritamdhatrak/event-calendar.git
cd event-calendar

# Install stuff
npm install

# Run it
npm start

Opens at http://localhost:3000

Tech Stack
React - Because hooks are awesome
date-fns - Much better than dealing with vanilla JS dates
react-dnd - For the drag and drop magic
CSS Grid - For the calendar layout
localStorage - Simple persistence without a backend
Features I'm proud of


🗓️ Smart Calendar
Shows a proper monthly grid
Highlights today's date
Navigate between months with arrow buttons
Days from previous/next month are greyed out


 Event Management
Click any day to create an event
Click existing events to edit them
Color-code your events (6 colors available)
Add categories and descriptions


 Recurring Events
This was the hardest part! Supports:

Daily repeats
Weekly (pick which days of the week)
Monthly (same date each month)
Custom intervals (every X days)
Set an end date for recurring series

 Drag & Drop
Grab any event and drag it to a different day
Shows visual feedback while dragging
Warns you about conflicts before moving


 Search & Filter
Real-time search as you type
Searches through titles, descriptions, and categories
Filter by event category
Clear search with the X button


 Conflict Detection
Prevents you from booking two things at the same time
Shows a confirmation dialog for conflicts
Works for both new events and drag-drop moves


Challenges I faced
Date calculations - Getting the calendar grid right with proper month boundaries was harder than expected
Recurring events logic - Generating the right dates for different recurrence patterns took several iterations
Drag and drop - react-dnd has a learning curve, especially handling the drop zones
State management - With search, filters, drag-drop, and CRUD operations, keeping everything in sync was complex
Mobile responsiveness - Making drag-drop work on touch devices required some CSS tweaks

