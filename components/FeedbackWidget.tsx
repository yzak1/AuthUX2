import React, { useState } from 'react';
import { MessageSquarePlus, X, Send } from 'lucide-react';
import Button from './Button';

const FeedbackWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
      setSubmitted(false);
    }, 2000);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-brand-main text-white p-3 rounded-full shadow-lg hover:bg-brand-main/90 transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/30 z-40"
        aria-label="Give Feedback"
      >
        <MessageSquarePlus size={24} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 bg-white rounded-lg shadow-2xl border border-border-base z-50 animate-fade-in overflow-hidden flex flex-col" data-story-code="6.04.b">
      <div className="p-4 bg-brand-main text-white flex justify-between items-center">
        <h3 className="font-bold">Your Feedback</h3>
        <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
          <X size={20} />
        </button>
      </div>
      
      {submitted ? (
        <div className="p-8 text-center">
          <div className="w-12 h-12 bg-success-bg text-success-msg rounded-full flex items-center justify-center mx-auto mb-3">
            <Send size={24} />
          </div>
          <p className="font-bold text-primary-text">Thank you!</p>
          <p className="text-sm text-secondary-text">Your feedback helps improve the portal.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-xs font-bold text-secondary-text uppercase mb-1">How would you rate your experience?</label>
            <div className="flex justify-between gap-2">
              {[1, 2, 3, 4, 5].map(num => (
                <button key={num} type="button" className="w-full py-2 rounded bg-secondary-surface hover:bg-input-hover text-sm font-bold text-secondary-text focus:bg-primary-cta focus:text-brand-main">
                  {num}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label htmlFor="feedback-text" className="block text-xs font-bold text-secondary-text uppercase mb-1">Comments</label>
            <textarea 
              id="feedback-text"
              rows={3} 
              className="w-full p-2 text-sm border border-border-base rounded focus:ring-2 focus:ring-focus-ring outline-none resize-none"
              placeholder="Tell us what you think..."
            ></textarea>
          </div>
          
          <Button type="submit" size="sm" fullWidth>Submit Feedback</Button>
        </form>
      )}
    </div>
  );
};

export default FeedbackWidget;