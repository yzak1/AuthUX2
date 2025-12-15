import React, { useState } from 'react';
import { CalendarEvent, CalendarEventType } from '../types';
import { ChevronLeft, ChevronRight, Clock, MapPin, AlertCircle, Loader2 } from 'lucide-react';

interface UnifiedCalendarProps {
  events: CalendarEvent[];
  currentDate: Date;
  onDateChange: (date: Date) => void;
  viewMode: 'week' | 'day';
  setViewMode: (mode: 'week' | 'day') => void;
  isLoading?: boolean;
}

const UnifiedCalendar: React.FC<UnifiedCalendarProps> = ({ 
  events, currentDate, onDateChange, viewMode, setViewMode, isLoading 
}) => {
  // data-story-code=2.06.1.b, 2.06.1.a

  const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const HOURS = Array.from({ length: 13 }, (_, i) => i + 8); // 8am to 8pm

  // Helper to change date
  const changeDate = (days: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    onDateChange(newDate);
  };

  const isToday = (date: Date) => date.toDateString() === new Date().toDateString();

  // Get start of week (Sunday)
  const getStartOfWeek = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day;
    return new Date(d.setDate(diff));
  };

  const startOfWeek = getStartOfWeek(currentDate);
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(d.getDate() + i);
    return d;
  });

  // Event coloring helper
  const getEventStyle = (type: CalendarEventType) => {
    switch (type) {
      case 'class': return 'bg-blue-100 border-l-4 border-primary-cta text-brand-main';
      case 'deadline': return 'bg-red-50 border-l-4 border-error-msg text-error-msg';
      case 'exam': return 'bg-purple-100 border-l-4 border-purple-600 text-purple-900';
      case 'key-date': return 'bg-yellow-50 border-l-4 border-warning-msg text-warning-msg';
      default: return 'bg-secondary-surface text-primary-text';
    }
  };

  const formatTime = (date: Date) => date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

  // Filter events for specific day
  const getEventsForDay = (date: Date) => {
    return events.filter(e => e.startTime.toDateString() === date.toDateString());
  };

  return (
    <div className="bg-white border border-border-base rounded-lg shadow-portal-card overflow-hidden flex flex-col h-full">
      {/* Calendar Header */}
      <div className="p-4 border-b border-border-base flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
           <div className="flex items-center bg-secondary-surface rounded-lg p-1">
             <button onClick={() => changeDate(viewMode === 'week' ? -7 : -1)} className="p-1 hover:bg-white rounded transition-colors"><ChevronLeft size={20} /></button>
             <button onClick={() => onDateChange(new Date())} className="px-3 text-sm font-semibold hover:text-primary-cta transition-colors">Today</button>
             <button onClick={() => changeDate(viewMode === 'week' ? 7 : 1)} className="p-1 hover:bg-white rounded transition-colors"><ChevronRight size={20} /></button>
           </div>
           <h2 className="text-xl font-fraunces text-brand-main ml-2">
             {currentDate.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
             {viewMode === 'day' && ` - ${currentDate.getDate()}`}
           </h2>
        </div>

        <div className="flex items-center gap-4">
          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-tertiary-text animate-pulse">
               <Loader2 size={12} className="animate-spin" />
               Syncing Canvas...
            </div>
          )}
          <div className="bg-secondary-surface rounded-lg p-1 flex">
            <button 
              onClick={() => setViewMode('day')}
              className={`px-3 py-1 text-sm font-medium rounded transition-colors ${viewMode === 'day' ? 'bg-white shadow-sm text-brand-main' : 'text-tertiary-text hover:text-primary-text'}`}
            >
              Day
            </button>
            <button 
              onClick={() => setViewMode('week')}
              className={`px-3 py-1 text-sm font-medium rounded transition-colors ${viewMode === 'week' ? 'bg-white shadow-sm text-brand-main' : 'text-tertiary-text hover:text-primary-text'}`}
            >
              Week
            </button>
          </div>
        </div>
      </div>

      {/* Week View Grid */}
      {viewMode === 'week' && (
        <div className="flex-1 overflow-x-auto overflow-y-auto">
          <div className="min-w-[800px]">
            {/* Header Row */}
            <div className="grid grid-cols-8 border-b border-border-base sticky top-0 bg-white z-10">
              <div className="p-3 text-xs font-bold text-tertiary-text uppercase text-center border-r border-border-base bg-secondary-surface">Time</div>
              {weekDays.map(day => (
                <div key={day.toString()} className={`p-3 text-center border-r border-border-base ${isToday(day) ? 'bg-blue-50/50' : ''}`}>
                  <p className="text-xs font-bold text-tertiary-text uppercase">{DAYS[day.getDay()]}</p>
                  <p className={`text-lg font-bold mt-1 ${isToday(day) ? 'text-primary-cta' : 'text-primary-text'}`}>{day.getDate()}</p>
                </div>
              ))}
            </div>

            {/* Time Grid */}
            <div className="relative">
              {HOURS.map(hour => (
                <div key={hour} className="grid grid-cols-8 border-b border-border-base min-h-[80px]">
                  <div className="p-2 text-xs text-tertiary-text text-right border-r border-border-base pr-4 -mt-2.5">
                    {hour === 12 ? '12pm' : hour > 12 ? `${hour-12}pm` : `${hour}am`}
                  </div>
                  {weekDays.map(day => {
                    const dayEvents = getEventsForDay(day).filter(e => e.startTime.getHours() === hour);
                    return (
                      <div key={day.toString()} className={`border-r border-border-base p-1 relative ${isToday(day) ? 'bg-blue-50/20' : ''}`}>
                         {dayEvents.map(event => (
                           <div 
                             key={event.id}
                             className={`absolute top-1 left-1 right-1 p-1.5 rounded text-xs shadow-sm overflow-hidden cursor-pointer hover:brightness-95 transition-all z-10 ${getEventStyle(event.type)}`}
                             style={{ minHeight: '60px' }} // Simplified layout height
                           >
                             <div className="font-bold truncate">{event.courseCode}</div>
                             <div className="truncate">{event.title}</div>
                             <div className="mt-1 flex items-center gap-1 opacity-80">
                               <MapPin size={10} /> {event.location || 'Online'}
                             </div>
                           </div>
                         ))}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Day List View */}
      {viewMode === 'day' && (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
           {getEventsForDay(currentDate).length > 0 ? (
             getEventsForDay(currentDate)
               .sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
               .map(event => (
                 <div key={event.id} className={`p-4 rounded-lg border-l-4 shadow-sm bg-white border border-t border-r border-b border-gray-100 ${getEventStyle(event.type).replace('bg-', 'bg-opacity-10 ')}`}>
                    <div className="flex items-start justify-between">
                       <div>
                         <span className="text-xs font-bold uppercase tracking-wider opacity-70 mb-1 block">
                           {event.courseCode} • {event.type}
                         </span>
                         <h3 className="font-bold text-lg text-primary-text">{event.title}</h3>
                         {event.status && <p className="text-sm font-medium mt-1 text-tertiary-text">{event.status}</p>}
                         <div className="flex items-center gap-4 mt-3 text-sm text-secondary-text">
                           <span className="flex items-center gap-1"><Clock size={16} /> {formatTime(event.startTime)} - {formatTime(event.endTime)}</span>
                           {event.location && <span className="flex items-center gap-1"><MapPin size={16} /> {event.location}</span>}
                         </div>
                       </div>
                       {event.isUrgent && <AlertCircle className="text-error-msg" size={20} />}
                    </div>
                 </div>
               ))
           ) : (
             <div className="h-full flex flex-col items-center justify-center text-secondary-text">
               <Clock size={48} className="mb-4 text-border-base" />
               <p className="text-lg">No events scheduled for this day.</p>
             </div>
           )}
        </div>
      )}
    </div>
  );
};

export default UnifiedCalendar;
