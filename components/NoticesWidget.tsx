import React from 'react';
import { Mail, ChevronRight, Info } from 'lucide-react';
import { Message } from '../types';

const MOCK_NOTICES: Message[] = [
  { 
    id: '1', 
    title: 'Semester 2 Timetable Preference Entry', 
    preview: 'Preference entry is now open. Log in to MyTimetable to select your class times.',
    content: '', 
    sender: 'Timetabling', 
    date: new Date(), 
    isRead: false, 
    isArchived: false, 
    type: 'notice',
    priority: 'high'
  },
  { 
    id: '2', 
    title: 'Exam Schedule Released', 
    preview: 'Your final exam timetable is now available.',
    content: '', 
    sender: 'Student Admin', 
    date: new Date(), 
    isRead: false, 
    isArchived: false, 
    type: 'notice',
    priority: 'normal'
  }
];

const NoticesWidget: React.FC = () => {
  return (
    <div className="bg-white rounded-lg border border-border-base shadow-portal-card overflow-hidden" data-story-code="2.09.e">
      <div className="p-4 border-b border-border-base flex items-center justify-between">
        <h3 className="font-fraunces text-lg text-brand-main flex items-center gap-2">
          <Mail size={18} className="text-primary-cta" />
          Notices
        </h3>
        <span className="bg-error-msg text-white text-xs font-bold px-2 py-0.5 rounded-full">2 New</span>
      </div>
      
      <div className="divide-y divide-border-base">
        {MOCK_NOTICES.map(notice => (
          <a 
            key={notice.id} 
            href="/messages?tab=notices" 
            className="block p-4 hover:bg-input-hover transition-colors group"
          >
            <div className="flex items-start gap-3">
              <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${notice.isRead ? 'bg-border-base' : 'bg-primary-cta'}`}></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-primary-text truncate group-hover:text-primary-cta transition-colors">
                  {notice.title}
                </p>
                <p className="text-xs text-secondary-text mt-0.5 line-clamp-1">{notice.preview}</p>
                <p className="text-[10px] text-tertiary-text mt-1">{notice.sender}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
      
      <a 
        href="/messages" 
        className="block p-3 bg-secondary-surface text-center text-sm font-bold text-link hover:underline border-t border-border-base"
      >
        View All Messages
      </a>
    </div>
  );
};

export default NoticesWidget;
