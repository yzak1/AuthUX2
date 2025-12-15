import React, { useState } from 'react';
import { CalendarSubscription as SubscriptionType } from '../types';
import { Eye, EyeOff, Check, Copy, Rss } from 'lucide-react';
import CalendarFeedsModal from './CalendarFeedsModal';

interface CalendarSubscriptionProps {
  subscriptions: SubscriptionType[];
  onToggle: (id: string) => void;
}

const CalendarSubscription: React.FC<CalendarSubscriptionProps> = ({ subscriptions, onToggle }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showFeedsModal, setShowFeedsModal] = useState(false);

  const handleCopyLink = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    // Simulate copying a webcal link
    const dummyLink = `webcal://portal.uni.edu/calendar/${id}.ics`;
    navigator.clipboard.writeText(dummyLink);
    
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-border-base p-4 shadow-sm" data-story-code="2.06.1.g">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-bold text-tertiary-text uppercase tracking-wider">My Calendars</h4>
          <button 
            onClick={() => setShowFeedsModal(true)}
            className="text-xs text-primary-cta font-semibold hover:underline flex items-center gap-1 px-2 py-1 rounded hover:bg-blue-50 transition-colors"
          >
            <Rss size={12} /> Subscribe / Export
          </button>
        </div>
        
        <div className="space-y-3">
          {subscriptions.map(sub => (
            <div
              key={sub.id}
              className={`w-full flex items-center justify-between p-2 rounded border border-transparent hover:bg-secondary-surface transition-colors group ${!sub.isEnabled ? 'opacity-75' : ''}`}
            >
              {/* Toggle Visibility */}
              <button 
                onClick={() => onToggle(sub.id)}
                className="flex items-center gap-3 flex-1 text-left focus:outline-none"
                aria-label={`Toggle visibility for ${sub.label}`}
                aria-pressed={sub.isEnabled}
              >
                <div className="relative flex items-center justify-center w-5 h-5">
                   {sub.isEnabled ? (
                     <Eye size={18} className="text-tertiary-text" />
                   ) : (
                     <EyeOff size={18} className="text-tertiary-text opacity-50" />
                   )}
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-3 h-3 rounded-full" style={{ backgroundColor: sub.color }}></div>
                   <span className={`text-sm font-medium ${sub.isEnabled ? 'text-primary-text' : 'text-secondary-text'}`}>
                     {sub.label}
                   </span>
                </div>
              </button>

              {/* Actions */}
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity focus-within:opacity-100">
                 <button
                   onClick={(e) => handleCopyLink(sub.id, e)}
                   className="p-1.5 text-tertiary-text hover:text-primary-cta hover:bg-white rounded focus:outline-none focus:ring-2 focus:ring-focus-ring"
                   title="Copy subscription link"
                   aria-label={`Copy subscription link for ${sub.label}`}
                 >
                   {copiedId === sub.id ? <Check size={14} className="text-success-msg" /> : <Copy size={14} />}
                 </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-border-base text-xs text-secondary-text">
          <p>Toggle visibility here, or click <strong>Subscribe</strong> to add these calendars to your phone or computer.</p>
        </div>
      </div>

      <CalendarFeedsModal isOpen={showFeedsModal} onClose={() => setShowFeedsModal(false)} />
    </>
  );
};

export default CalendarSubscription;