import React, { useState } from 'react';
import UpcomingAssessments from '../components/UpcomingAssessments';
import { CalendarEvent } from '../types';
import { Filter } from 'lucide-react';

const MOCK_ASSESSMENTS: CalendarEvent[] = [
  { id: '3', title: 'Essay Submission: Ethics', startTime: new Date(new Date().setHours(23, 59)), endTime: new Date(new Date().setHours(23, 59)), type: 'deadline', isUrgent: true, courseCode: 'PHIL2001', status: 'Due Today' },
  { id: '5', title: 'Lab Report 4', startTime: new Date(Date.now() + 86400000 * 2), endTime: new Date(Date.now() + 86400000 * 2), type: 'deadline', isUrgent: false, courseCode: 'CHEM1001' },
  { id: '6', title: 'Mid-Semester Exam', startTime: new Date(Date.now() + 86400000 * 5), endTime: new Date(Date.now() + 86400000 * 5), type: 'exam', isUrgent: false, courseCode: 'MAST1001' },
  { id: '7', title: 'Final Exam: Calculus 1', startTime: new Date(Date.now() + 86400000 * 10), endTime: new Date(Date.now() + 86400000 * 10), type: 'exam', isUrgent: false, courseCode: 'MAST1001' },
];

interface AssessmentsPageProps {
  mode?: 'assessments' | 'exams';
}

const AssessmentsPage: React.FC<AssessmentsPageProps> = ({ mode = 'assessments' }) => {
  const [filter, setFilter] = useState<'all' | 'exam' | 'deadline'>('all');

  // If mode is specific, force filter logic
  const activeMode = mode === 'exams' ? 'exam' : 'deadline';
  
  // Filter items:
  // If mode is 'exams', show only exams.
  // If mode is 'assessments', show only deadlines (assignments).
  // If no mode passed (or 'all' page), allow toggle (legacy behavior).
  
  const displayItems = MOCK_ASSESSMENTS.filter(a => {
    if (mode === 'exams') return a.type === 'exam';
    if (mode === 'assessments') return a.type === 'deadline';
    return filter === 'all' ? true : a.type === filter;
  });

  const pageTitle = mode === 'exams' ? 'Exam Schedule' : 'Assessments';
  const pageDesc = mode === 'exams' ? 'Your upcoming final examinations and venues.' : 'Upcoming assignments, quizzes, and submission deadlines.';

  return (
    <div className="space-y-6 animate-fade-in">
       <div className="flex items-end justify-between border-b border-border-base pb-6">
         <div>
            <h1 className="text-3xl font-fraunces text-brand-main">{pageTitle}</h1>
            <p className="text-secondary-text">{pageDesc}</p>
         </div>
         
         {/* Only show filter toggle if we are in a combined view, otherwise hidden */}
         {!mode && (
           <div className="flex gap-2">
              <button 
                onClick={() => setFilter('all')} 
                className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-colors ${filter === 'all' ? 'bg-brand-main text-white' : 'bg-white border border-border-base hover:bg-secondary-surface'}`}
              >
                All
              </button>
              <button 
                onClick={() => setFilter('deadline')} 
                className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-colors ${filter === 'deadline' ? 'bg-brand-main text-white' : 'bg-white border border-border-base hover:bg-secondary-surface'}`}
              >
                Assignments
              </button>
              <button 
                onClick={() => setFilter('exam')} 
                className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-colors ${filter === 'exam' ? 'bg-brand-main text-white' : 'bg-white border border-border-base hover:bg-secondary-surface'}`}
              >
                Exams
              </button>
           </div>
         )}
       </div>

       <UpcomingAssessments assessments={displayItems} />
    </div>
  );
};

export default AssessmentsPage;