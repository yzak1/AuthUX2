import React from 'react';

const StudentNoticesWidget: React.FC = () => {
  return (
    <div className="bg-white rounded-lg border border-border-base shadow-portal-card p-6 h-full" data-story-code="0.01.c">
      <h3 className="font-fraunces text-xl text-brand-main mb-4">Student Notices</h3>
      <div className="space-y-4">
        <div className="p-3 bg-blue-50 border-l-4 border-info-msg text-sm rounded-r">
           <p className="font-bold text-info-msg">Library Extended Hours</p>
           <p className="text-secondary-text mt-1">Open 24/7 during exam period starting next week.</p>
        </div>
        <div className="text-sm text-secondary-text p-1">
          <p className="font-semibold text-primary-text mb-1">Scholarship Applications</p>
          <p>Applications for Semester 2 close on Friday. <a href="#" className="text-link hover:underline font-semibold">Apply now</a>.</p>
        </div>
        <div className="text-sm text-secondary-text p-1 border-t border-border-base pt-3">
          <p className="font-semibold text-primary-text mb-1">Campus Market Day</p>
          <p>Join us this Wednesday at South Lawn for food and music.</p>
        </div>
      </div>
    </div>
  );
};

export default StudentNoticesWidget;