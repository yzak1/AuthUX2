import React from 'react';
import { CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';

const MyTimetableStatus: React.FC = () => {
  // Mock status - normally would be passed in or fetched
  const status: 'Allocated' | 'Pending' | 'Conflict' = 'Allocated';

  return (
    <div className="bg-white rounded-lg border border-border-base p-4 shadow-sm" data-story-code="4.09.a">
      <h4 className="text-sm font-bold text-tertiary-text uppercase tracking-wider mb-3">Allocation Status</h4>
      
      <div className="flex items-center gap-3 mb-3">
        {status === 'Allocated' && <CheckCircle2 className="text-success-msg" size={24} />}
        {status !== 'Allocated' && <AlertCircle className="text-warning-msg" size={24} />}
        
        <div>
          <p className="font-semibold text-primary-text">
            {status === 'Allocated' ? 'Preferences Complete' : 'Action Required'}
          </p>
          <p className="text-xs text-secondary-text">Semester 2, 2024</p>
        </div>
      </div>

      <a 
        href="#" 
        className="text-sm font-bold text-primary-cta hover:underline flex items-center gap-1"
      >
        Manage in MyTimetable <ArrowUpRight size={14} />
      </a>
    </div>
  );
};

export default MyTimetableStatus;
