import React, { useState } from 'react';
import { Enquiry } from '../types';
import { HelpCircle, AlertOctagon, ChevronRight } from 'lucide-react';

const MOCK_ENQUIRIES: Enquiry[] = [
  { id: '101', subject: 'Course Transfer Request', status: 'In Progress', service: 'Stop 1', lastUpdated: new Date() },
  { id: '102', subject: 'Timetable Clash', status: 'Resolved', service: 'Timetabling', lastUpdated: new Date(Date.now() - 86400000 * 5) }
];

const EnquiriesWidget: React.FC = () => {
  // Simulate potential outage (data-story-code=5.09.b)
  const [hasError, setHasError] = useState(false);

  // Status badge helper
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved': return 'bg-success-bg text-success-msg';
      case 'In Progress': return 'bg-blue-100 text-info-msg';
      case 'Waiting for Customer': return 'bg-warning-bg text-warning-msg';
      default: return 'bg-secondary-surface text-secondary-text';
    }
  };

  if (hasError) {
    return (
      <div className="bg-white rounded-lg border border-border-base shadow-portal-card p-6 flex flex-col items-center justify-center text-center h-full">
         <AlertOctagon size={32} className="text-tertiary-text mb-3" />
         <p className="font-semibold text-secondary-text">Cannot retrieve enquiries</p>
         <p className="text-xs text-tertiary-text mt-1">System temporarily unavailable. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-border-base shadow-portal-card overflow-hidden" data-story-code="6.02.1.d,5.09.b">
      <div className="p-4 border-b border-border-base flex justify-between items-center">
        <h3 className="font-fraunces text-lg text-brand-main flex items-center gap-2">
          <HelpCircle size={18} className="text-primary-cta" />
          My Enquiries
        </h3>
        {/* Toggle to simulate outage for demo */}
        <button onClick={() => setHasError(true)} className="text-[10px] text-tertiary-text hover:text-error-msg" title="Simulate Outage">
           Test Error
        </button>
      </div>

      <div className="divide-y divide-border-base">
        {MOCK_ENQUIRIES.map(enquiry => (
          <div key={enquiry.id} className="p-4 hover:bg-input-hover transition-colors">
             <div className="flex justify-between items-start mb-1">
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${getStatusColor(enquiry.status)}`}>
                  {enquiry.status}
                </span>
                <span className="text-xs text-tertiary-text">{enquiry.lastUpdated.toLocaleDateString()}</span>
             </div>
             <p className="font-semibold text-sm text-primary-text">{enquiry.subject}</p>
             <p className="text-xs text-secondary-text mt-0.5">{enquiry.service}</p>
          </div>
        ))}
      </div>

      <a href="#" className="block p-3 bg-secondary-surface text-center text-sm font-bold text-link hover:underline border-t border-border-base">
        Submit New Request
      </a>
    </div>
  );
};

export default EnquiriesWidget;