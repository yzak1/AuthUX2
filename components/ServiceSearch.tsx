import React, { useState } from 'react';
import { Search, Sparkles, ArrowRight, ChevronRight } from 'lucide-react';
import Button from './Button';

const ServiceSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [showAiResult, setShowAiResult] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.toLowerCase().includes('extend') || query.toLowerCase().includes('extension')) {
      setShowAiResult(true);
    } else {
      setShowAiResult(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-border-base shadow-sm overflow-hidden" data-story-code="6.03.b">
      <div className="p-6 bg-brand-main text-white">
        <h2 className="text-xl font-fraunces mb-4">How can we help you today?</h2>
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Describe your issue (e.g., 'I need a specialized study plan' or 'apply for extension')"
            className="w-full pl-12 pr-4 py-4 rounded-lg text-primary-text focus:ring-4 focus:ring-blue-500/30 outline-none"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-tertiary-text" size={20} />
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <Button type="submit" size="sm">Search</Button>
          </div>
        </form>
      </div>

      {showAiResult && (
        <div className="p-6 bg-secondary-surface border-b border-border-base animate-fade-in">
           <div className="flex items-start gap-4">
             <div className="p-2 bg-gradient-to-br from-purple-500 to-blue-500 text-white rounded-lg shadow-sm">
               <Sparkles size={24} />
             </div>
             <div className="flex-1">
               <div className="flex items-center gap-2 mb-2">
                 <h3 className="font-bold text-primary-text">AI Assistant Suggestion</h3>
                 <span className="text-[10px] font-bold uppercase bg-white border border-border-base px-2 py-0.5 rounded text-tertiary-text">Beta</span>
               </div>
               <p className="text-primary-text mb-4 leading-relaxed">
                 It sounds like you need to apply for an <strong>Assessment Extension</strong>. You can do this up to 3 days after the due date for medical or personal reasons.
               </p>
               <div className="flex flex-wrap gap-3">
                 <Button size="sm" className="flex items-center gap-2">
                   Apply for Extension <ArrowRight size={16} />
                 </Button>
                 <Button size="sm" variant="secondary">View Eligibility Policy</Button>
               </div>
             </div>
           </div>
        </div>
      )}

      <div className="p-4 bg-white">
        <h4 className="text-xs font-bold text-tertiary-text uppercase tracking-wider mb-3">Common Topics</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {['Enrolment & Timetables', 'Fees & Payments', 'Exams & Results', 'Graduation'].map(topic => (
            <button key={topic} className="flex items-center justify-between p-3 text-sm font-medium text-secondary-text hover:bg-secondary-surface rounded transition-colors text-left">
              {topic}
              <ChevronRight size={16} className="text-tertiary-text" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceSearch;