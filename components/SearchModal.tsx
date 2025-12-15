import React, { useState, useEffect } from 'react';
import { Search, Filter, ArrowRight, BookOpen, Globe, Sparkles } from 'lucide-react';
import { SearchResult } from '../types';
import ModalWrapper from './ModalWrapper';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

const MOCK_RESULTS: SearchResult[] = [
  { id: '1', title: 'Bachelor of Science Handbook', description: 'Course structure and requirements for 2024.', category: 'Handbook', url: '#' },
  { id: '2', title: 'Exam Timetable Sem 1', description: 'Final exam dates and locations.', category: 'Portal', url: '#' },
  { id: '3', title: 'Library Opening Hours', description: 'Baillieu Library hours for study period.', category: 'Library', url: '#' },
  { id: '4', title: 'Campus Map: Parkville', description: 'Find buildings and lecture theatres.', category: 'Public', url: '#' },
];

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery(initialQuery);
      handleSearch(initialQuery);
    }
  }, [isOpen, initialQuery]);

  const handleSearch = (q: string) => {
    setIsSearching(true);
    setAiAnswer(null);

    // Simulate API latency & AI Processing
    setTimeout(() => {
      const lowerQ = q.toLowerCase();
      
      // AI Logic Simulation (User Story 6.03.a)
      if (lowerQ.includes('parking') || lowerQ.includes('permit')) {
        setAiAnswer("Student parking permits are available for the Eastern Precinct Car Park. You can apply via the Campus Services portal. Rates start at $4.50/hour.");
      } else if (lowerQ.includes('id card') || lowerQ.includes('student card')) {
        setAiAnswer("You can order a new Student ID card through the CaptureME portal. Once approved, collect it from Stop 1 (Parkville).");
      }

      if (!q.trim()) {
        setResults([]);
      } else {
        setResults(MOCK_RESULTS.filter(r => 
          r.title.toLowerCase().includes(lowerQ) || 
          r.category.toLowerCase().includes(lowerQ)
        ));
      }
      setIsSearching(false);
    }, 600);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    handleSearch(e.target.value);
  };

  return (
    <ModalWrapper 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Global Search"
      className="max-w-4xl h-[80vh]"
    >
      <div className="flex flex-col h-full bg-white rounded-lg overflow-hidden" data-story-code="3.02.1.a,6.03.a">
        {/* Header Area */}
        <div className="flex items-center gap-4 p-4 border-b border-border-base bg-white shadow-sm flex-shrink-0">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-tertiary-text" size={20} aria-hidden="true" />
            <input
              autoFocus
              type="text"
              className="w-full pl-10 pr-4 py-3 bg-secondary-surface border-none rounded text-lg text-primary-text focus:ring-2 focus:ring-focus-ring outline-none"
              placeholder="Search handbook, library, staff..."
              value={query}
              onChange={onInputChange}
              aria-label="Search term"
            />
          </div>
          {/* Close is handled by ModalWrapper */}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            
            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2 mb-8" role="group" aria-label="Search Filters">
              <span className="text-sm font-semibold text-secondary-text mr-2 flex items-center gap-1" aria-hidden="true">
                <Filter size={14} /> Filters:
              </span>
              {['All', 'Portal', 'Handbook', 'Library', 'Public'].map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  aria-pressed={activeFilter === filter}
                  className={`
                    px-3 py-1.5 rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-focus-ring
                    ${activeFilter === filter 
                      ? 'bg-primary-cta text-brand-main' 
                      : 'bg-white border border-border-base text-secondary-text hover:bg-secondary-surface'}
                  `}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Loading State */}
            {isSearching && (
               <div className="flex flex-col items-center justify-center py-12 text-tertiary-text" aria-live="polite">
                 <div className="animate-spin mb-2 w-6 h-6 border-2 border-brand-main border-t-transparent rounded-full" aria-hidden="true"></div>
                 <p>Searching University systems...</p>
               </div>
            )}

            {/* Results */}
            {!isSearching && (
              <div className="space-y-6">
                
                {/* AI Quick Answer (6.03.a) */}
                {aiAnswer && (
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-100 flex items-start gap-3 animate-fade-in">
                    <div className="p-2 bg-white rounded-full shadow-sm text-brand-main">
                      <Sparkles size={20} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-brand-main text-sm">AI Quick Answer</h3>
                      </div>
                      <p className="text-primary-text text-sm leading-relaxed">{aiAnswer}</p>
                    </div>
                  </div>
                )}

                {/* Standard Results */}
                {results.length > 0 ? (
                  <div className="space-y-4" role="list">
                    {results.map((result) => (
                      <a 
                        key={result.id} 
                        href={result.url}
                        role="listitem"
                        className="block p-4 bg-white border border-border-base rounded hover:shadow-portal-card hover:border-primary-cta transition-all group focus:outline-none focus:ring-2 focus:ring-focus-ring"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`
                                text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded
                                ${result.category === 'Handbook' ? 'bg-purple-100 text-purple-800' : 
                                  result.category === 'Library' ? 'bg-yellow-100 text-yellow-800' : 
                                  'bg-blue-100 text-brand-main'}
                              `}>
                                {result.category}
                              </span>
                            </div>
                            <h3 className="text-lg font-source font-semibold text-primary-text group-hover:text-primary-cta transition-colors">
                              {result.title}
                            </h3>
                            <p className="text-secondary-text mt-1">{result.description}</p>
                          </div>
                          <ArrowRight size={20} className="text-tertiary-text group-hover:text-primary-cta opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" aria-hidden="true" />
                        </div>
                      </a>
                    ))}
                  </div>
                ) : !aiAnswer && query && (
                  <div className="text-center py-12" role="status">
                     <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary-surface rounded-full mb-4 text-tertiary-text">
                       <Search size={32} aria-hidden="true" />
                     </div>
                     <h3 className="text-xl font-fraunces text-primary-text mb-2">No results found</h3>
                     <p className="text-secondary-text">Try adjusting your filters or search for a different keyword.</p>
                  </div>
                )}

                {/* Empty State / Suggestions (only if no query) */}
                {!query && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="col-span-1">
                      <h4 className="text-sm font-bold text-tertiary-text uppercase tracking-wider mb-3">Popular Searches</h4>
                      <ul className="space-y-2">
                        <li><button onClick={() => setQuery('Timetable')} className="text-link hover:underline text-left w-full focus:outline-none focus:ring-2 focus:ring-focus-ring rounded px-1">My Timetable</button></li>
                        <li><button onClick={() => setQuery('Exams')} className="text-link hover:underline text-left w-full focus:outline-none focus:ring-2 focus:ring-focus-ring rounded px-1">Exam Schedule</button></li>
                        <li><button onClick={() => setQuery('Fees')} className="text-link hover:underline text-left w-full focus:outline-none focus:ring-2 focus:ring-focus-ring rounded px-1">Fee Statement</button></li>
                        <li><button onClick={() => setQuery('Student Card')} className="text-link hover:underline text-left w-full focus:outline-none focus:ring-2 focus:ring-focus-ring rounded px-1">Student Card (AI Demo)</button></li>
                      </ul>
                    </div>
                    <div className="col-span-1 md:col-span-2 bg-secondary-surface p-4 rounded">
                      <h4 className="text-sm font-bold text-tertiary-text uppercase tracking-wider mb-3">Quick Navigation</h4>
                      <div className="grid grid-cols-2 gap-3">
                         <button className="flex items-center gap-2 p-2 bg-white rounded border border-border-base hover:bg-input-hover text-left focus:outline-none focus:ring-2 focus:ring-focus-ring">
                            <BookOpen size={16} className="text-brand-main" aria-hidden="true" />
                            <span className="text-sm font-semibold">Browse Handbook</span>
                         </button>
                         <button className="flex items-center gap-2 p-2 bg-white rounded border border-border-base hover:bg-input-hover text-left focus:outline-none focus:ring-2 focus:ring-focus-ring">
                            <Globe size={16} className="text-brand-main" aria-hidden="true" />
                            <span className="text-sm font-semibold">Library Catalogue</span>
                         </button>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            )}
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default SearchModal;