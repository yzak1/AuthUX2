import React from 'react';
import { CourseProgress } from '../types';
import { GraduationCap, ArrowRight } from 'lucide-react';

interface CourseProgressProps {
  progress: CourseProgress;
}

const CourseProgress: React.FC<CourseProgressProps> = ({ progress }) => {
  const completedPercentage = (progress.completedCredits / progress.totalCredits) * 100;
  const enrolledPercentage = (progress.enrolledCredits / progress.totalCredits) * 100;

  return (
    <div className="bg-white rounded-lg border border-border-base shadow-sm p-6" data-story-code="2.11.c">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-brand-main">
          <GraduationCap size={20} />
        </div>
        <div>
           <h3 className="font-fraunces text-xl text-brand-main leading-tight">{progress.courseName}</h3>
           <p className="text-sm text-secondary-text">Est. Completion: {progress.expectedCompletion}</p>
        </div>
      </div>

      <div className="mb-2 flex justify-between text-sm font-semibold">
        <span>Progress</span>
        <span>{Math.round(completedPercentage + enrolledPercentage)}%</span>
      </div>

      {/* Stacked Progress Bar */}
      <div className="w-full h-4 bg-secondary-surface rounded-full overflow-hidden flex mb-4">
        <div 
          className="bg-success-msg h-full" 
          style={{ width: `${completedPercentage}%` }}
          title={`Completed: ${progress.completedCredits} pts`}
        ></div>
        <div 
          className="bg-primary-cta h-full" 
          style={{ width: `${enrolledPercentage}%` }}
          title={`Enrolled: ${progress.enrolledCredits} pts`}
        ></div>
      </div>

      <div className="flex gap-4 text-xs text-secondary-text mb-6">
         <div className="flex items-center gap-1.5">
           <div className="w-2 h-2 rounded-full bg-success-msg"></div>
           <span>Completed ({progress.completedCredits} pts)</span>
         </div>
         <div className="flex items-center gap-1.5">
           <div className="w-2 h-2 rounded-full bg-primary-cta"></div>
           <span>Enrolled ({progress.enrolledCredits} pts)</span>
         </div>
         <div className="flex items-center gap-1.5">
           <div className="w-2 h-2 rounded-full bg-secondary-surface border border-gray-300"></div>
           <span>Remaining ({progress.totalCredits - progress.completedCredits - progress.enrolledCredits} pts)</span>
         </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <a href="#" className="flex items-center justify-center gap-2 p-2 rounded border border-border-base hover:bg-input-hover text-sm font-semibold transition-colors">
          Course Rules
        </a>
        <a href="#" className="flex items-center justify-center gap-2 p-2 rounded border border-border-base hover:bg-input-hover text-sm font-semibold transition-colors">
          Book Course Advisor
        </a>
      </div>
    </div>
  );
};

export default CourseProgress;