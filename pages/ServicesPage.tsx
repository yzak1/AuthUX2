import React from 'react';
import ServiceSearch from '../components/ServiceSearch';
import Stop1ContactCard from '../components/Stop1ContactCard';
import { ExternalLink, Book, Heart, Briefcase } from 'lucide-react';

const ServicesPage: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="max-w-3xl">
         <h1 className="text-3xl font-fraunces text-brand-main">Services & Support</h1>
         <p className="text-secondary-text text-lg">
           Find help, access student services, and connect with Stop 1.
         </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* AI Enhanced Search */}
          <ServiceSearch />

          {/* Popular Services Grid */}
          <div>
            <h3 className="font-fraunces text-xl text-brand-main mb-4">Popular Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a href="#" className="flex items-start gap-4 p-4 bg-white rounded-lg border border-border-base hover:border-primary-cta hover:shadow-md transition-all group">
                <div className="p-3 bg-blue-50 text-primary-cta rounded-lg group-hover:bg-primary-cta group-hover:text-brand-main transition-colors">
                  <Book size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-primary-text group-hover:text-primary-cta">Course Advice</h4>
                  <p className="text-sm text-secondary-text mt-1">Plan your subjects and course progression.</p>
                </div>
              </a>
              
              <a href="#" className="flex items-start gap-4 p-4 bg-white rounded-lg border border-border-base hover:border-primary-cta hover:shadow-md transition-all group">
                <div className="p-3 bg-green-50 text-success-msg rounded-lg group-hover:bg-success-msg group-hover:text-white transition-colors">
                  <Heart size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-primary-text group-hover:text-primary-cta">Wellbeing & Counselling</h4>
                  <p className="text-sm text-secondary-text mt-1">Support for your mental and physical health.</p>
                </div>
              </a>

              <a href="#" className="flex items-start gap-4 p-4 bg-white rounded-lg border border-border-base hover:border-primary-cta hover:shadow-md transition-all group">
                <div className="p-3 bg-yellow-50 text-warning-msg rounded-lg group-hover:bg-warning-msg group-hover:text-white transition-colors">
                  <Briefcase size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-primary-text group-hover:text-primary-cta">Careers & Employability</h4>
                  <p className="text-sm text-secondary-text mt-1">Resume checks, job boards, and mentoring.</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Stop1ContactCard />
          
          <div className="bg-white p-6 rounded-lg border border-border-base shadow-sm">
            <h3 className="font-fraunces text-lg text-brand-main mb-3">External Resources</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="flex items-center gap-2 text-link hover:underline font-medium text-sm">
                  <ExternalLink size={14} /> Safer Community Program
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 text-link hover:underline font-medium text-sm">
                  <ExternalLink size={14} /> Financial Aid & Scholarships
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 text-link hover:underline font-medium text-sm">
                  <ExternalLink size={14} /> IT Support Portal
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;