import React from 'react';
import { BookOpen, AlertCircle } from 'lucide-react';

const EnrolmentSnapshot: React.FC = () => {
  const currentSemester = "Semester 2, 2024";
  const subjects = [
    { code: 'COMP1001', name: 'Intro to Programming' },
    { code: 'CHEM1001', name: 'Chemistry 1' },
    { code: 'PHIL2001', name: 'Ethics in Science' },
    { code: 'MAST1001', name: 'Calculus 1' }
  ];
  const alerts = [
    { id: '1', msg: 'Missing 12.5 points for next year prerequisites.' }
  ];

  return (
    <div className="bg-white rounded-lg border border-border-base shadow-sm p-6" data-story-code="4.05.a">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-fraunces text-lg text-brand-main">Enrolment Status</h3>
        <span className="bg-success-bg text-success-msg text-xs font-bold px-2 py-1 rounded">Enrolled</span>
      </div>

      <p className="text-sm font-bold text-secondary-text uppercase tracking-wider mb-2">{currentSemester}</p>
      
      <ul className="space-y-2 mb-6">
        {subjects.map(sub => (
          <li key={sub.code} className="flex items-center gap-2 text-primary-text">
            <BookOpen size={16} className="text-tertiary-text" />
            <span className="font-mono text-sm font-semibold text-secondary-text">{sub.code}</span>
            <span className="text-sm truncate">{sub.name}</span>
          </li>
        ))}
      </ul>

      {alerts.length > 0 && (
        <div className="bg-warning-bg p-3 rounded flex items-start gap-2 mb-4">
          <AlertCircle size={16} className="text-warning-msg mt-0.5 flex-shrink-0" />
          <p className="text-xs text-warning-msg font-medium">{alerts[0].msg}</p>
        </div>
      )}

      <button className="w-full py-2 bg-secondary-surface text-primary-text font-semibold rounded text-sm hover:bg-border-base transition-colors">
        Manage Study Plan
      </button>
    </div>
  );
};

export default EnrolmentSnapshot;