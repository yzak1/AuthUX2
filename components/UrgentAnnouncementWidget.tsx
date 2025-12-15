import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface UrgentAnnouncementWidgetProps {
  title: string;
  message: string;
  onDismiss: () => void;
}

const UrgentAnnouncementWidget: React.FC<UrgentAnnouncementWidgetProps> = ({ title, message, onDismiss }) => {
  return (
    <div className="bg-warning-bg border border-warning-msg rounded-lg p-4 shadow-sm mb-6 flex items-start gap-3 relative animate-fade-in" role="alert">
       <div className="text-warning-msg mt-0.5 flex-shrink-0">
          <AlertTriangle size={20} aria-hidden="true" />
       </div>
       <div className="flex-1 pr-6">
          <h3 className="text-warning-msg font-bold text-sm uppercase tracking-wide mb-1">Urgent Announcement</h3>
          <h4 className="font-bold text-primary-text mb-1">{title}</h4>
          <p className="text-sm text-secondary-text">{message}</p>
       </div>
       <button 
         onClick={onDismiss}
         className="absolute top-2 right-2 p-1.5 text-tertiary-text hover:text-primary-text hover:bg-black/5 rounded-full transition-colors"
         aria-label="Dismiss announcement"
       >
         <X size={16} />
       </button>
    </div>
  );
};

export default UrgentAnnouncementWidget;