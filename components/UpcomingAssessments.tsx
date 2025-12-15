import React from 'react';
import { CalendarEvent } from '../types';
import { AlertCircle, Clock, FileText } from 'lucide-react';
import Button from './Button';

interface UpcomingAssessmentsProps {
  assessments: CalendarEvent[];
}

const UpcomingAssessments: React.FC<UpcomingAssessmentsProps> = ({ assessments }) => {
  return (
    <div className="space-y-4" data-story-code="2.11.d">
      {assessments.length > 0 ? (
        assessments.map(item => (
          <div key={item.id} className="bg-white border border-border-base rounded-lg p-5 shadow-sm hover:shadow-portal-card transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-4">
             <div className="flex items-start gap-4">
               <div className={`p-3 rounded-full ${item.isUrgent ? 'bg-red-50 text-error-msg' : 'bg-blue-50 text-primary-cta'}`}>
                 <FileText size={20} />
               </div>
               <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-tertiary-text uppercase tracking-wider">{item.courseCode}</span>
                    {item.isUrgent && (
                      <span className="flex items-center gap-1 text-xs font-bold text-error-msg bg-red-50 px-2 py-0.5 rounded-full">
                        <AlertCircle size={10} /> Due Soon
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-lg text-primary-text">{item.title}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-secondary-text">
                    <span className="flex items-center gap-1"><Clock size={14} /> Due {item.endTime.toLocaleDateString()} at {item.endTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    <span className="text-tertiary-text px-2 border-l border-border-base">{item.type === 'exam' ? 'Exam' : 'Assignment'}</span>
                  </div>
               </div>
             </div>
             
             <div className="flex-shrink-0">
               <a href="https://canvas.uni.edu" target="_blank" rel="noreferrer">
                 <Button variant="secondary" size="sm">View in Canvas</Button>
               </a>
             </div>
          </div>
        ))
      ) : (
        <div className="text-center py-12 bg-white rounded-lg border border-border-base">
           <p className="text-secondary-text">No upcoming assessments due in the next 7 days.</p>
        </div>
      )}
    </div>
  );
};

export default UpcomingAssessments;