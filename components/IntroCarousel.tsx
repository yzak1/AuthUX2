import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import Button from './Button';
import ModalWrapper from './ModalWrapper';

interface IntroCarouselProps {
  isOpen: boolean;
  onClose: () => void;
}

const SLIDES = [
  {
    title: "Welcome to your new Portal",
    description: "Your centralized hub for everything you need at University. Access your timetable, results, and services in one place.",
    imageColor: "bg-blue-100"
  },
  {
    title: "Stay on top of Priorities",
    description: "The new 'My Priorities' widget keeps you focused on what's happening today and what's due next.",
    imageColor: "bg-green-100"
  },
  {
    title: "Unified Search",
    description: "Search across the Handbook, Library, and Student Systems directly from the top navigation bar.",
    imageColor: "bg-yellow-100"
  }
];

const IntroCarousel: React.FC<IntroCarouselProps> = ({ isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    if (currentIndex < SLIDES.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onClose();
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Portal Introduction"
      className="max-w-2xl overflow-hidden rounded-xl"
    >
      <div className="flex flex-col md:flex-row h-[500px]" data-story-code="0.04.d">
        
        {/* Image Side */}
        <div className={`w-full md:w-1/2 ${SLIDES[currentIndex].imageColor} flex items-center justify-center p-8 transition-colors duration-500`}>
          <div className="w-32 h-32 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-md" aria-hidden="true">
             <span className="font-fraunces text-4xl text-brand-main opacity-50">{currentIndex + 1}</span>
          </div>
        </div>

        {/* Content Side */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-between bg-white">
          <div className="mt-8">
            <h2 className="text-2xl font-fraunces text-brand-main mb-4" id="slide-title">
              {SLIDES[currentIndex].title}
            </h2>
            <p className="text-secondary-text leading-relaxed">
              {SLIDES[currentIndex].description}
            </p>
          </div>

          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2" aria-label={`Slide ${currentIndex + 1} of ${SLIDES.length}`} role="group">
              {SLIDES.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-brand-main w-4' : 'bg-border-base'}`} 
                  aria-hidden="true"
                />
              ))}
            </div>
            
            <div className="flex gap-2">
              {currentIndex > 0 && (
                <Button variant="ghost" onClick={prevSlide} size="sm">Back</Button>
              )}
              <Button onClick={nextSlide} size="sm" className="flex items-center gap-1">
                {currentIndex === SLIDES.length - 1 ? "Get Started" : "Next"}
                {currentIndex !== SLIDES.length - 1 && <ChevronRight size={16} aria-hidden="true" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default IntroCarousel;