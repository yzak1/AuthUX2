import React, { useState } from 'react';
import ModalWrapper from './ModalWrapper';
import Button from './Button';
import { Copy, Check, Calendar as CalendarIcon, ExternalLink, GraduationCap, Clock, AlertCircle } from 'lucide-react';

interface CalendarFeed {
  id: string;
  label: string;
  url: string;
  description: string;
  icon: React.ReactNode;
}

const FEEDS: CalendarFeed[] = [
  { 
    id: '1', 
    label: 'Class Timetable', 
    url: 'https://portal.uni.edu/ical/timetable/s1234567.ics', 
    description: 'Your personal class schedule, updated daily.',
    icon: <Clock size={20} />
  },
  { 
    id: '2', 
    label: 'Canvas Assignments', 
    url: 'https://canvas.uni.edu/feeds/assignments/token123.ics', 
    description: 'Due dates for all enrolled subjects.',
    icon: <GraduationCap size={20} />
  },
  { 
    id: '3', 
    label: 'Exam Timetable', 
    url: 'https://portal.uni.edu/ical/exams/s1234567.ics', 
    description: 'Final exam dates, times, and venue locations.',
    icon: <AlertCircle size={20} />
  },
  { 
    id: '4', 
    label: 'University Key Dates', 
    url: 'https://portal.uni.edu/ical/key-dates.ics', 
    description: 'Census dates, holidays, and semester breaks.',
    icon: <CalendarIcon size={20} />
  },
];

interface CalendarFeedsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CalendarFeedsModal: React.FC<CalendarFeedsModalProps> = ({ isOpen, onClose }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Subscribe to Calendars" className="max-w-2xl">
      <div className="p-6">
        <div className="mb-6 border-b border-border-base pb-4">
            <h2 className="text-2xl font-fraunces text-brand-main mb-2">Calendar Feeds</h2>
            <p className="text-secondary-text text-sm leading-relaxed">
                Connect your university schedule to your personal calendar app (Google Calendar, Outlook, Apple Calendar). 
                Use the <strong>Subscribe</strong> link to open directly, or <strong>Copy</strong> the URL to add it manually.
            </p>
        </div>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            {FEEDS.map(feed => (
                <div key={feed.id} className="bg-white rounded-lg p-4 border border-border-base shadow-sm hover:border-primary-cta transition-colors">
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                             <div className="p-2 bg-secondary-surface rounded-lg text-brand-main border border-border-base">
                                {feed.icon}
                             </div>
                             <div>
                                 <h3 className="font-bold text-primary-text">{feed.label}</h3>
                                 <p className="text-xs text-secondary-text">{feed.description}</p>
                             </div>
                        </div>
                        <a 
                            href={feed.url.replace('https://', 'webcal://')} 
                            className="text-sm font-bold text-link hover:underline flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded hover:bg-blue-100 transition-colors"
                        >
                            Subscribe <ExternalLink size={14} />
                        </a>
                    </div>

                    <div className="flex gap-2 items-center">
                        <div className="flex-1 relative">
                            <input 
                                type="text" 
                                readOnly 
                                value={feed.url}
                                className="w-full bg-secondary-surface border border-border-base rounded px-3 py-2 text-xs font-mono text-tertiary-text focus:outline-none focus:ring-2 focus:ring-focus-ring"
                                onClick={(e) => (e.target as HTMLInputElement).select()}
                            />
                        </div>
                        <Button 
                            variant="secondary" 
                            size="sm" 
                            onClick={() => handleCopy(feed.id, feed.url)}
                            className="flex-shrink-0 min-w-[90px]"
                            title="Copy URL to clipboard"
                        >
                            {copiedId === feed.id ? (
                                <span className="flex items-center gap-1 text-success-msg font-bold"><Check size={14} /> Copied</span>
                            ) : (
                                <span className="flex items-center gap-1"><Copy size={14} /> Copy URL</span>
                            )}
                        </Button>
                    </div>
                </div>
            ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-border-base flex justify-end">
            <Button onClick={onClose}>Done</Button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default CalendarFeedsModal;