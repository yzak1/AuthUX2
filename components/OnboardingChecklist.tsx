import React, { useState } from 'react';
import { OnboardingTask } from '../types';
import { CheckCircle2, Circle, X, ArrowUpRight } from 'lucide-react';
import Button from './Button';

const INITIAL_TASKS: OnboardingTask[] = [
  { id: '1', title: 'Complete your enrolment', description: 'Select your subjects for Semester 1.', isCompleted: false, canDismiss: false, actionLabel: 'Enrol now', actionUrl: '/#/units' },
  { id: '2', title: 'Order your Student ID Card', description: 'Upload a photo to get your card.', isCompleted: true, canDismiss: true },
  { id: '3', title: 'Sign up for Orientation', description: 'Meet new people and explore campus.', isCompleted: false, canDismiss: true, actionLabel: 'Register', actionUrl: '#' },
];

const OnboardingChecklist: React.FC = () => {
  const [tasks, setTasks] = useState<OnboardingTask[]>(INITIAL_TASKS);
  const [isVisible, setIsVisible] = useState(true);

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => 
      t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
    ));
  };

  const dismissTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const completedCount = tasks.filter(t => t.isCompleted).length;
  const allCompleted = tasks.every(t => t.isCompleted);
  
  // Circle geometry
  const radius = 20;
  const circumference = 2 * Math.PI * radius; // approx 125.66
  const offset = circumference - (completedCount / tasks.length) * circumference;

  // Auto-hide if all tasks are done/dismissed
  if (tasks.length === 0 || !isVisible) return null;

  return (
    <div className="bg-white rounded-lg border border-border-base shadow-portal-card p-6" data-story-code="0.02.a">
      <div className="flex items-center justify-between mb-4">
        <div>
           <h3 className="font-fraunces text-xl text-brand-main">Get Started Checklist</h3>
           <p className="text-sm text-secondary-text mt-1">
             {completedCount} of {tasks.length} tasks completed
           </p>
        </div>
        <div className="w-12 h-12 relative flex items-center justify-center">
           {/* Refined Progress Circle */}
           <svg className="w-full h-full transform -rotate-90">
             {/* Background Track */}
             <circle 
               cx="24" cy="24" r={radius} 
               stroke="#f1f5f1" 
               strokeWidth="4" 
               fill="none" 
             />
             {/* Progress Indicator */}
             <circle 
                cx="24" cy="24" r={radius} 
                stroke="#60751f" 
                strokeWidth="4" 
                fill="none" 
                strokeLinecap="round"
                strokeDasharray={circumference} 
                strokeDashoffset={offset} 
                className="transition-all duration-500 ease-out"
             />
           </svg>
        </div>
      </div>

      <div className="space-y-3">
        {tasks.map(task => (
          <div 
            key={task.id} 
            className={`
              flex items-start gap-3 p-3 rounded border transition-all duration-200
              ${task.isCompleted ? 'bg-secondary-surface border-transparent opacity-75' : 'bg-white border-border-base'}
            `}
          >
            <button 
              onClick={() => toggleTask(task.id)}
              className={`mt-1 flex-shrink-0 ${task.isCompleted ? 'text-success-msg' : 'text-tertiary-text hover:text-brand-main'}`}
              aria-label={task.isCompleted ? "Mark as incomplete" : "Mark as complete"}
            >
              {task.isCompleted ? <CheckCircle2 size={20} /> : <Circle size={20} />}
            </button>
            
            <div className="flex-1">
              <h4 className={`text-sm font-semibold ${task.isCompleted ? 'text-secondary-text line-through' : 'text-primary-text'}`}>
                {task.title}
              </h4>
              <p className="text-xs text-secondary-text mt-0.5">{task.description}</p>
              
              {!task.isCompleted && task.actionUrl && (
                <a href={task.actionUrl} className="inline-flex items-center gap-1 text-xs font-bold text-primary-cta mt-2 hover:underline">
                  {task.actionLabel || 'View'} <ArrowUpRight size={12} />
                </a>
              )}
            </div>

            {task.canDismiss && (
              <button 
                onClick={() => dismissTask(task.id)}
                className="text-tertiary-text hover:text-error-msg transition-colors"
                aria-label="Dismiss task"
              >
                <X size={16} />
              </button>
            )}
          </div>
        ))}
      </div>

      {allCompleted && (
        <div className="mt-4 pt-4 border-t border-border-base text-center">
          <p className="text-success-msg font-semibold text-sm mb-2">All set! You're ready to go.</p>
          <Button size="sm" variant="ghost" onClick={() => setIsVisible(false)}>Dismiss Widget</Button>
        </div>
      )}
    </div>
  );
};

export default OnboardingChecklist;