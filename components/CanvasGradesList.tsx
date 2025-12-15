import React from 'react';
import { CanvasGrade } from '../types';
import { RefreshCw } from 'lucide-react';

interface CanvasGradesListProps {
  grades: CanvasGrade[];
}

const CanvasGradesList: React.FC<CanvasGradesListProps> = ({ grades }) => {
  return (
    <div className="bg-white rounded-lg border border-border-base shadow-sm overflow-hidden" data-story-code="2.11.b">
      <div className="p-6 border-b border-border-base flex justify-between items-center bg-blue-50/30">
        <div>
          <h3 className="font-fraunces text-xl text-brand-main">Recent Assessment Grades</h3>
          <p className="text-xs text-secondary-text mt-1">Synced from Canvas LMS</p>
        </div>
        <div className="flex items-center gap-1 text-xs text-tertiary-text">
          <RefreshCw size={12} /> Last synced: 1 hour ago
        </div>
      </div>
      
      <div className="divide-y divide-border-base">
        {grades.map(grade => (
          <div key={grade.id} className="p-4 hover:bg-secondary-surface transition-colors flex items-center justify-between">
             <div>
               <p className="text-xs font-bold text-tertiary-text uppercase tracking-wider mb-0.5">{grade.subjectCode}</p>
               <h4 className="font-semibold text-primary-text">{grade.assessmentName}</h4>
               <p className="text-xs text-secondary-text mt-1">Weighting: {grade.weighting}</p>
             </div>
             <div className="text-right">
                <span className="block text-xl font-bold text-brand-main">{grade.mark}</span>
                <span className="text-xs text-tertiary-text">{grade.updatedAt.toLocaleDateString()}</span>
             </div>
          </div>
        ))}
      </div>
      
      <div className="p-3 bg-secondary-surface text-center border-t border-border-base">
        <a href="https://canvas.uni.edu" target="_blank" rel="noreferrer" className="text-sm font-bold text-link hover:underline">
          View all in Canvas
        </a>
      </div>
    </div>
  );
};

export default CanvasGradesList;