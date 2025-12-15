import React, { useState, useEffect } from 'react';
import { User } from '../types';
import PrioritiesWidget from '../components/PrioritiesWidget';
import OnboardingChecklist from '../components/OnboardingChecklist';
import QuickLinksWidget from '../components/QuickLinksWidget';
import NoticesWidget from '../components/NoticesWidget';
import EnquiriesWidget from '../components/EnquiriesWidget';
import UrgentAlert from '../components/UrgentAlert';
import UrgentAnnouncementWidget from '../components/UrgentAnnouncementWidget';
import IntroCarousel from '../components/IntroCarousel';
import StudentNoticesWidget from '../components/StudentNoticesWidget';

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  // data-story-code=2.09.g
  // Modal State
  const [showUrgentModal, setShowUrgentModal] = useState(true);
  // Widget State (Starts false, becomes true when modal is acknowledged)
  const [showUrgentWidget, setShowUrgentWidget] = useState(false);
  
  // data-story-code=0.04.d
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    // Simulate checking if it's the first time login
    const hasSeenIntro = localStorage.getItem('uniportal_intro_seen');
    if (!hasSeenIntro) {
      setShowIntro(true);
    }
  }, []);

  const handleDismissIntro = () => {
    setShowIntro(false);
    localStorage.setItem('uniportal_intro_seen', 'true');
  };

  const handleAcknowledgeModal = () => {
    setShowUrgentModal(false);
    setShowUrgentWidget(true);
  };

  const handleDismissWidget = () => {
    setShowUrgentWidget(false);
  };

  const alertTitle = "Campus Access Alert";
  const alertMessage = "The South Gate entrance is currently closed for maintenance. Please use the East Gate for access to the Engineering precinct until further notice.";

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in" data-story-code="0.01.a,0.01.c">
      {/* Overlays */}
      <UrgentAlert 
        isOpen={showUrgentModal} 
        onAcknowledge={handleAcknowledgeModal}
        title={alertTitle}
        message={alertMessage}
      />
      <IntroCarousel 
        isOpen={showIntro} 
        onClose={handleDismissIntro} 
      />

      {/* Welcome Hero */}
      <div className="bg-brand-main rounded-xl p-8 md:p-10 text-white relative overflow-hidden shadow-portal-card">
         <div className="relative z-10 max-w-2xl">
           <h1 className="text-3xl md:text-4xl font-fraunces mb-3">Good morning, {user.name.split(' ')[0]}</h1>
           <p className="text-lg text-blue-100 mb-0 opacity-90 font-source">
             You have <span className="font-bold text-white">2 classes</span> today.
           </p>
         </div>
         {/* Abstract Decoration */}
         <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
            <svg width="300" height="300" viewBox="0 0 200 200">
               <path fill="currentColor" d="M45,-76C58,-69,68,-58,76,-46C84,-34,90,-21,88,-8C86,5,76,18,67,30C58,42,49,53,38,62C27,71,13,78,-1,79C-15,81,-30,77,-43,69C-56,61,-67,49,-75,36C-83,23,-88,9,-86,-4C-84,-17,-75,-29,-65,-40C-55,-51,-44,-61,-32,-68C-20,-75,-7,-79,6,-89L6,-76Z" transform="translate(100 100)" />
            </svg>
         </div>
      </div>

      {/* Persistent Urgent Widget */}
      {showUrgentWidget && (
        <UrgentAnnouncementWidget 
          title={alertTitle} 
          message={alertMessage} 
          onDismiss={handleDismissWidget} 
        />
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (Main Content) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Onboarding Widget */}
          <OnboardingChecklist />
          
          {/* Priorities / Calendar Widget */}
          {/* Removed min-h constraint to allow widget to size itself */}
          <div>
            <PrioritiesWidget />
          </div>

          {/* Enquiries Widget */}
          <EnquiriesWidget />
        </div>

        {/* Right Column (Sidebar Widgets) */}
        <div className="lg:col-span-4 space-y-6 flex flex-col">
          <QuickLinksWidget user={user} />
          
          {/* Notices Overview Widget */}
          <NoticesWidget />
          
          {/* Staff Curated - Notices */}
          <div className="flex-1">
             <StudentNoticesWidget />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;