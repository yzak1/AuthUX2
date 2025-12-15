import React from 'react';
import { SubjectResult } from '../types';
import { Download } from 'lucide-react';

interface SubjectResultsListProps {
  results: SubjectResult[];
}

const SubjectResultsList: React.FC<SubjectResultsListProps> = ({ results }) => {
  return (
    <div className="bg-white rounded-lg border border-border-base shadow-sm overflow-hidden" data-story-code="2.11.a">
      <div className="p-6 border-b border-border-base flex justify-between items-center">
        <div>
          <h3 className="font-fraunces text-xl text-brand-main">Subject Results</h3>
          <p className="text-xs text-secondary-text mt-1">Official finalized grades</p>
        </div>
        <button className="text-sm flex items-center gap-1 text-link hover:underline">
          <Download size={14} /> Download Transcript
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-secondary-surface border-b border-border-base">
            <tr>
              <th className="p-4 font-semibold text-secondary-text">Subject</th>
              <th className="p-4 font-semibold text-secondary-text">Period</th>
              <th className="p-4 font-semibold text-secondary-text">Grade</th>
              <th className="p-4 font-semibold text-secondary-text">Mark</th>
              <th className="p-4 font-semibold text-secondary-text text-right">Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-base">
            {results.map(res => (
              <tr key={res.id} className="hover:bg-input-hover transition-colors">
                <td className="p-4">
                  <div className="font-bold text-primary-text">{res.code}</div>
                  <div className="text-secondary-text truncate max-w-[200px]">{res.name}</div>
                </td>
                <td className="p-4 text-secondary-text">{res.semester} {res.year}</td>
                <td className="p-4">
                  <span className={`font-bold px-2 py-1 rounded text-xs ${res.grade === 'H1' ? 'bg-success-bg text-success-msg' : 'bg-secondary-surface text-primary-text'}`}>
                    {res.grade}
                  </span>
                </td>
                <td className="p-4 font-mono text-primary-text">{res.mark ? res.mark : '-'}</td>
                <td className="p-4 text-right text-xs text-tertiary-text">
                  {res.updatedAt.toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubjectResultsList;