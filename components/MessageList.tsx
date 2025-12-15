import React, { useState } from 'react';
import { Message } from '../types';
import { Search, Filter, Archive, CheckCircle, ChevronDown, ChevronUp, Bell } from 'lucide-react';

interface MessageListProps {
  messages: Message[];
  type: 'announcement' | 'notice';
}

const MessageList: React.FC<MessageListProps> = ({ messages, type }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread' | 'archived'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  const filteredMessages = messages.filter(m => {
    const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          m.preview.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' ? !m.isArchived : 
                          filter === 'unread' ? !m.isRead && !m.isArchived : 
                          m.isArchived;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-white rounded-lg border border-border-base shadow-sm overflow-hidden" data-story-code={type === 'announcement' ? '2.09.a' : '2.09.d'}>
      {/* Controls */}
      <div className="p-4 border-b border-border-base flex flex-col md:flex-row gap-4 bg-secondary-surface">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-tertiary-text" size={16} />
          <input 
            type="text"
            placeholder="Search messages..."
            className="w-full pl-9 pr-3 py-2 border border-border-base rounded text-sm focus:outline-none focus:ring-2 focus:ring-focus-ring"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
           <button 
             onClick={() => setFilter('all')}
             className={`px-3 py-1.5 text-sm rounded font-medium transition-colors ${filter === 'all' ? 'bg-white text-primary-cta shadow-sm' : 'text-secondary-text hover:bg-white/50'}`}
           >
             All
           </button>
           <button 
             onClick={() => setFilter('unread')}
             className={`px-3 py-1.5 text-sm rounded font-medium transition-colors ${filter === 'unread' ? 'bg-white text-primary-cta shadow-sm' : 'text-secondary-text hover:bg-white/50'}`}
           >
             Unread
           </button>
           <button 
             onClick={() => setFilter('archived')}
             className={`px-3 py-1.5 text-sm rounded font-medium transition-colors ${filter === 'archived' ? 'bg-white text-primary-cta shadow-sm' : 'text-secondary-text hover:bg-white/50'}`}
           >
             Archived
           </button>
        </div>
      </div>

      {/* List */}
      <div className="divide-y divide-border-base">
        {filteredMessages.length > 0 ? (
          filteredMessages.map(msg => (
            <div key={msg.id} className={`group ${msg.isRead ? 'bg-white' : 'bg-blue-50/30'}`}>
              <div 
                onClick={() => toggleExpand(msg.id)}
                className="p-4 cursor-pointer hover:bg-secondary-surface transition-colors flex items-start gap-3"
              >
                {/* Icon / Status */}
                <div className={`mt-1 flex-shrink-0 ${!msg.isRead ? 'text-primary-cta' : 'text-tertiary-text'}`}>
                   {!msg.isRead ? <div className="w-2.5 h-2.5 rounded-full bg-primary-cta"></div> : <CheckCircle size={16} />}
                </div>

                <div className="flex-1 min-w-0">
                   <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-tertiary-text uppercase tracking-wider">{msg.sender}</span>
                      <span className="text-xs text-secondary-text">{msg.date.toLocaleDateString()}</span>
                   </div>
                   <h3 className={`text-sm font-semibold mb-1 ${!msg.isRead ? 'text-primary-text' : 'text-secondary-text'}`}>
                     {msg.priority === 'high' && <span className="text-error-msg mr-2">!</span>}
                     {msg.title}
                   </h3>
                   <p className="text-sm text-secondary-text line-clamp-2">{msg.preview}</p>
                </div>
                
                <div className="text-tertiary-text">
                  {expandedId === msg.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </div>

              {/* Expanded Content */}
              {expandedId === msg.id && (
                <div className="px-4 pb-4 pl-10">
                  <div className="p-4 bg-secondary-surface rounded text-sm text-primary-text leading-relaxed">
                    {msg.content || msg.preview} {/* Fallback if no content for demo */}
                    <div className="mt-4 flex gap-2">
                       <button className="text-xs font-semibold text-primary-cta hover:underline flex items-center gap-1">
                         <CheckCircle size={12} /> Mark as Read
                       </button>
                       <button className="text-xs font-semibold text-tertiary-text hover:text-primary-text hover:underline flex items-center gap-1">
                         <Archive size={12} /> Archive
                       </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="p-12 text-center text-secondary-text">
            <Bell size={48} className="mx-auto mb-4 text-border-base" />
            <p className="text-lg">No messages found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageList;
