import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import MessageList from '../components/MessageList';
import { Message } from '../types';

// Mock Data
const MOCK_ANNOUNCEMENTS: Message[] = [
  { 
    id: '1', title: 'Campus Maintenance Update', preview: 'Several buildings will be affected by power maintenance this weekend.', content: 'Full details about the power outage...', sender: 'University Services', date: new Date(), isRead: false, isArchived: false, type: 'announcement', priority: 'high' 
  },
  { 
    id: '2', title: 'Welcome to Semester 2', preview: 'A message from the Vice-Chancellor.', content: 'Welcome back students...', sender: 'Vice-Chancellor', date: new Date(Date.now() - 86400000), isRead: true, isArchived: false, type: 'announcement' 
  }
];

const MOCK_NOTICES: Message[] = [
  { 
    id: '3', title: 'Subject Withdrawal Deadline', preview: 'Last day to withdraw without academic penalty is approaching.', content: '...', sender: 'Student Admin', date: new Date(), isRead: false, isArchived: false, type: 'notice', priority: 'high' 
  },
  { 
    id: '4', title: 'Library Fine Notice', preview: 'You have an overdue item.', content: '...', sender: 'Library', date: new Date(Date.now() - 172800000), isRead: true, isArchived: false, type: 'notice' 
  }
];

const MessagesPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialTab = queryParams.get('tab') === 'notices' ? 'notices' : 'announcements';
  
  const [activeTab, setActiveTab] = useState<'announcements' | 'notices'>(initialTab);

  return (
    <div className="space-y-6 animate-fade-in" data-story-code="2.09.a,2.09.d">
       <div>
         <h1 className="text-3xl font-fraunces text-brand-main">Messages</h1>
         <p className="text-secondary-text">Stay updated with university announcements and notices.</p>
       </div>

       <div className="flex gap-1 border-b border-border-base">
         <button 
           onClick={() => setActiveTab('announcements')}
           className={`px-6 py-3 font-semibold text-sm transition-all border-b-2 ${activeTab === 'announcements' ? 'border-primary-cta text-brand-main' : 'border-transparent text-tertiary-text hover:text-primary-text'}`}
         >
           Announcements
           {MOCK_ANNOUNCEMENTS.some(m => !m.isRead) && <span className="ml-2 w-2 h-2 inline-block bg-primary-cta rounded-full"></span>}
         </button>
         <button 
           onClick={() => setActiveTab('notices')}
           className={`px-6 py-3 font-semibold text-sm transition-all border-b-2 ${activeTab === 'notices' ? 'border-primary-cta text-brand-main' : 'border-transparent text-tertiary-text hover:text-primary-text'}`}
         >
           Notices
           {MOCK_NOTICES.some(m => !m.isRead) && <span className="ml-2 w-2 h-2 inline-block bg-primary-cta rounded-full"></span>}
         </button>
       </div>

       <div>
         {activeTab === 'announcements' ? (
           <MessageList messages={MOCK_ANNOUNCEMENTS} type="announcement" />
         ) : (
           <MessageList messages={MOCK_NOTICES} type="notice" />
         )}
       </div>
    </div>
  );
};

export default MessagesPage;
