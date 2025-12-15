import React from 'react';
import { Phone, MapPin, Clock, ExternalLink } from 'lucide-react';
import Button from './Button';

const Stop1ContactCard: React.FC = () => {
  return (
    <div className="bg-white rounded-lg border border-border-base shadow-portal-card overflow-hidden" data-story-code="6.04.c">
      <div className="bg-brand-main p-6 text-white text-center">
        <h3 className="font-fraunces text-2xl mb-1">Stop 1</h3>
        <p className="text-blue-100 opacity-90">Your Student Services Hub</p>
      </div>
      
      <div className="p-6 space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-secondary-surface flex items-center justify-center text-brand-main shrink-0">
            <Phone size={20} />
          </div>
          <div>
            <h4 className="font-bold text-primary-text mb-1">Call Us</h4>
            <a href="tel:136352" className="text-xl font-fraunces text-primary-cta hover:underline block">13 MELB (13 6352)</a>
            <p className="text-xs text-secondary-text mt-1">Outside Australia: +61 3 9035 5511</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-secondary-surface flex items-center justify-center text-brand-main shrink-0">
            <Clock size={20} />
          </div>
          <div>
            <h4 className="font-bold text-primary-text mb-1">Opening Hours</h4>
            <p className="text-sm text-secondary-text">Mon - Fri: 9am – 5pm</p>
            <p className="text-sm text-secondary-text">Weekends: Closed</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-secondary-surface flex items-center justify-center text-brand-main shrink-0">
            <MapPin size={20} />
          </div>
          <div>
            <h4 className="font-bold text-primary-text mb-1">Locations</h4>
            <p className="text-sm text-secondary-text mb-2">757 Swanston St (Parkville)</p>
            <a href="#" className="text-xs font-bold text-link hover:underline flex items-center gap-1">
              View on Map <ExternalLink size={10} />
            </a>
          </div>
        </div>

        <Button fullWidth variant="secondary" className="flex items-center gap-2 justify-center">
          Book an Appointment <ExternalLink size={16} />
        </Button>
      </div>
    </div>
  );
};

export default Stop1ContactCard;