import React, { useState, useEffect } from 'react';
import UnifiedCalendar from '../components/UnifiedCalendar';
import CalendarSubscription from '../components/CalendarSubscription';
import MyTimetableStatus from '../components/MyTimetableStatus';
import { CalendarEvent, CalendarSubscription as SubscriptionType } from '../types';

// Mock Data
const MOCK_EVENTS: CalendarEvent[] = [
  { id: '1', title: 'CHEM1001 Lecture', startTime: new Date(new Date().setHours(10, 0)), endTime: new Date(new Date().setHours(11, 0)), type: 'class', location: 'Chemistry Building', courseCode: 'CHEM1001' },
  { id: '2', title: 'Intro to Programming Workshop', startTime: new Date(new Date().setHours(13, 0)), endTime: new Date(new Date().setHours(15, 0)), type: 'class', location: 'Kwong Lee Dow', courseCode: 'COMP1001' },
  { id: '3', title: 'Essay Submission: Ethics', startTime: new Date(new Date().setHours(23, 59)), endTime: new Date(new Date().setHours(23, 59)), type: 'deadline', isUrgent: true, courseCode: 'PHIL2001', status: 'Due Today' },
  { id: '4', title: 'Semester 1 Census Date', startTime: new Date(new Date().setHours(9, 0)), endTime: new Date(new Date().setHours(17, 0)), type: 'key-date' },
];

const INITIAL_SUBSCRIPTIONS: SubscriptionType[] = [
  { id: '1', label: 'Class Timetable', type: 'class', color: '#47c8f0', isEnabled: true },
  { id: '2', label: 'Canvas Deadlines', type: 'deadline', color: '#db1927', isEnabled: true },
  { id: '3', label: 'Exam Timetable', type: 'exam', color: '#932b63', isEnabled: true },
  { id: '4', label: 'Key Dates', type: 'key-date', color: '#e9b11e', isEnabled: true },
];

const CalendarPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'week' | 'day'>('week');
  const [subscriptions, setSubscriptions] = useState(INITIAL_SUBSCRIPTIONS);
  const [events, setEvents] = useState(MOCK_EVENTS);
  const [isSyncing, setIsSyncing] = useState(true);

  // Simulate syncing latency (data-story-code=2.06.1.a)
  useEffect(() => {
    const timer = setTimeout(() => setIsSyncing(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Responsive default
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setViewMode('day');
      else setViewMode('week');
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToggleSubscription = (id: string) => {
    setSubscriptions(prev => prev.map(sub => 
      sub.id === id ? { ...sub, isEnabled: !sub.isEnabled } : sub
    ));
  };

  const filteredEvents = events.filter(e => {
    const sub = subscriptions.find(s => s.type === e.type);
    return sub ? sub.isEnabled : true;
  });

  return (
    <div className="space-y-6 animate-fade-in" data-story-code="2.06.1.b">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-3xl font-fraunces text-brand-main">Calendar & Timetable</h1>
           <p className="text-secondary-text">Manage your schedule, deadlines, and key dates.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Calendar Area */}
        <div className="flex-1 min-h-[600px]">
          <UnifiedCalendar 
            events={filteredEvents} 
            currentDate={currentDate} 
            onDateChange={setCurrentDate} 
            viewMode={viewMode}
            setViewMode={setViewMode}
            isLoading={isSyncing}
          />
        </div>

        {/* Sidebar Controls */}
        <div className="w-full lg:w-80 space-y-6">
          <MyTimetableStatus />
          <CalendarSubscription 
            subscriptions={subscriptions} 
            onToggle={handleToggleSubscription} 
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;