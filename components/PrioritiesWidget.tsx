import React, { useState } from 'react';
import { CalendarEvent } from '../types';
import { Calendar, Clock, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

const MOCK_EVENTS: CalendarEvent[] = [
  { id: '1', title: 'CHEM1001 Lecture', startTime: new Date(new Date().setHours(10, 0)), endTime: new Date(new Date().setHours(11, 0)), type: 'class', location: 'Chemistry Building, Theatre 1' },
  { id: '2', title: 'Intro to Programming Workshop', startTime: new Date(new Date().setHours(13, 0)), endTime: new Date(new Date().setHours(15, 0)), type: 'class', location: 'Kwong Lee Dow, Lab 4' },
  { id: '3', title: 'Essay Submission: Ethics', startTime: new Date(new Date().setHours(23, 59)), endTime: new Date(new Date().setHours(23, 59)), type: 'deadline', isUrgent: true },
];

const PrioritiesWidget: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const isToday = currentDate.toDateString() === new Date().toDateString();
  
  const handleNextDay = () => {
    const next = new Date(currentDate);
    next.setDate(currentDate.getDate() + 1);
    setCurrentDate(next);
  };

  const handlePrevDay = () => {
    const prev = new Date(currentDate);
    prev.setDate(currentDate.getDate() - 1);
    setCurrentDate(prev);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-white rounded-lg border border-border-base shadow-portal-card overflow-hidden h-[450px] flex flex-col" data-story-code="2.06.1.e">
      <div className="p-6 border-b border-border-base flex items-center justify-between bg-white flex-shrink-0">
         <div>
            <h3 className="font-fraunces text-xl text-brand-main flex items-center gap-2">
              <Calendar size={20} className="text-primary-cta" />
              My Priorities
            </h3>
         </div>
         <div className="flex items-center gap-2 bg-secondary-surface rounded-full p-1">
            <button onClick={handlePrevDay} className="p-1 hover:bg-white rounded-full transition-colors"><ChevronLeft size={16} /></button>
            <span className="text-sm font-semibold px-2 min-w-[100px] text-center">
              {isToday ? 'Today' : currentDate.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric' })}
            </span>
            <button onClick={handleNextDay} className="p-1 hover:bg-white rounded-full transition-colors"><ChevronRight size={16} /></button>
         </div>
      </div>

      <div className="p-0 flex-1 overflow-y-auto">
        {MOCK_EVENTS.length > 0 ? (
          <div className="divide-y divide-border-base">
            {MOCK_EVENTS.map((event, index) => {
               // Highlight logic: if it's the first event of today
               const isNextUp = isToday && index === 0; 
               
               return (
                <div key={event.id} className={`p-4 hover:bg-input-hover transition-colors ${isNextUp ? 'bg-blue-50/50' : ''}`}>
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center min-w-[60px]">
                      <span className="text-sm font-bold text-brand-main">{formatTime(event.startTime)}</span>
                      <div className="h-full w-0.5 bg-border-base my-1"></div>
                    </div>
                    
                    <div className="flex-1">
                      {isNextUp && (
                        <span className="inline-block px-2 py-0.5 rounded-full bg-primary-cta text-brand-main text-xs font-bold uppercase tracking-wide mb-1">
                          Up Next
                        </span>
                      )}
                      
                      <h4 className="font-source font-bold text-primary-text">{event.title}</h4>
                      
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-secondary-text">
                        <span className="flex items-center gap-1">
                          <Clock size={14} className="text-tertiary-text" />
                          {Math.round((event.endTime.getTime() - event.startTime.getTime()) / (1000 * 60 * 60))}h
                        </span>
                        {event.location && (
                          <span className="flex items-center gap-1">
                            <MapPin size={14} className="text-tertiary-text" />
                            {event.location}
                          </span>
                        )}
                      </div>
                      
                      {event.isUrgent && (
                        <div className="mt-2 text-xs font-bold text-error-msg flex items-center gap-1">
                           Deadline approaching
                        </div>
                      )}
                    </div>
                  </div>
                </div>
               );
            })}
          </div>
        ) : (
          <div className="p-8 text-center text-secondary-text">
            <p>No events scheduled for this day.</p>
          </div>
        )}
      </div>
      
      <div className="p-3 bg-secondary-surface text-center border-t border-border-base flex-shrink-0">
        <a href="#/calendar" className="text-sm font-bold text-link hover:underline block w-full h-full">View Full Calendar</a>
      </div>
    </div>
  );
};

export default PrioritiesWidget;