import React from 'react';
import { User } from '../types';
import { User as UserIcon, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

interface PersonalDetailsProps {
  user: User;
}

const PersonalDetails: React.FC<PersonalDetailsProps> = ({ user }) => {
  return (
    <div className="bg-white rounded-lg border border-border-base shadow-sm p-6" data-story-code="7.02.c">
      <div className="flex items-center justify-between mb-6">
         <h3 className="font-fraunces text-xl text-brand-main">Personal Details</h3>
         <a href="#" className="text-sm font-semibold text-link hover:underline flex items-center gap-1">
           Update in eStudent <ExternalLink size={14} />
         </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
             <UserIcon className="text-tertiary-text mt-0.5" size={18} />
             <div>
                <p className="text-xs font-bold text-tertiary-text uppercase">Legal Name</p>
                <p className="font-semibold text-primary-text">{user.name}</p>
             </div>
          </div>
          <div className="flex items-start gap-3">
             <div className="w-[18px]"></div> {/* Spacer for alignment */}
             <div>
                <p className="text-xs font-bold text-tertiary-text uppercase">Preferred Name</p>
                <p className="font-semibold text-primary-text">{user.name.split(' ')[0]}</p>
             </div>
          </div>
          <div className="flex items-start gap-3">
             <div className="w-[18px]"></div>
             <div>
                <p className="text-xs font-bold text-tertiary-text uppercase">Date of Birth</p>
                <p className="font-semibold text-primary-text">12 April 2002</p>
             </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
             <Mail className="text-tertiary-text mt-0.5" size={18} />
             <div>
                <p className="text-xs font-bold text-tertiary-text uppercase">Student Email</p>
                <p className="font-semibold text-primary-text">{user.email}</p>
             </div>
          </div>
          <div className="flex items-start gap-3">
             <Phone className="text-tertiary-text mt-0.5" size={18} />
             <div>
                <p className="text-xs font-bold text-tertiary-text uppercase">Mobile</p>
                <p className="font-semibold text-primary-text">+61 400 123 456</p>
             </div>
          </div>
          <div className="flex items-start gap-3">
             <MapPin className="text-tertiary-text mt-0.5" size={18} />
             <div>
                <p className="text-xs font-bold text-tertiary-text uppercase">Term Address</p>
                <p className="font-semibold text-primary-text">123 Swanston St, Melbourne VIC 3000</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;