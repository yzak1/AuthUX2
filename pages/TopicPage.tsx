import React from 'react';
import { useParams } from 'react-router-dom';
import { NavItem } from '../types';
import { ChevronRight } from 'lucide-react';

const TopicPage: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();

  // Mock data fetching based on topicId
  const topicTitle = topicId ? topicId.charAt(0).toUpperCase() + topicId.slice(1).replace('-', ' ') : 'Topic';

  return (
    <div className="space-y-8 animate-fade-in" data-story-code="5.05.h">
      <div className="border-b border-border-base pb-6">
         <div className="flex items-center gap-2 text-sm text-tertiary-text mb-2">
            <span>Home</span> <ChevronRight size={14} /> <span>Topics</span>
         </div>
         <h1 className="text-4xl font-fraunces text-brand-main">{topicTitle}</h1>
         <p className="text-lg text-secondary-text mt-2 max-w-3xl">
           Access resources, forms, and services related to {topicTitle}.
         </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder Content for Generic Topic Page */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-border-base">
          <h3 className="font-fraunces text-xl mb-4 text-primary-text">Key Services</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-link hover:underline">Service Request Form A</a></li>
            <li><a href="#" className="text-link hover:underline">Booking System</a></li>
            <li><a href="#" className="text-link hover:underline">Contact Support</a></li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-border-base">
          <h3 className="font-fraunces text-xl mb-4 text-primary-text">Resources</h3>
          <p className="text-secondary-text mb-4">Download guides and policy documents.</p>
          <button className="bg-secondary-surface text-primary-text px-4 py-2 rounded font-semibold hover:bg-border-base transition-colors">
            View Documents
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopicPage;