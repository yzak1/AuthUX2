import React from 'react';
import { User } from '../types';
import { authService } from '../services/authService';
import PersonalDetails from '../components/PersonalDetails';
import PasswordManagement from '../components/PasswordManagement';

const ProfilePage: React.FC = () => {
  const user = authService.getSession();

  if (!user) return null;

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      <div>
         <h1 className="text-3xl font-fraunces text-brand-main">Profile & Settings</h1>
         <p className="text-secondary-text">Manage your personal information and account security.</p>
      </div>

      <PersonalDetails user={user} />
      <PasswordManagement />
      
      <div className="bg-white rounded-lg border border-border-base shadow-sm p-6">
        <h3 className="font-fraunces text-xl text-brand-main mb-2">Privacy Settings</h3>
        <p className="text-secondary-text text-sm mb-4">Control what information is visible to other students in the directory.</p>
        <div className="flex items-center justify-between p-3 bg-secondary-surface rounded">
          <span className="font-semibold text-primary-text">Show my email in student directory</span>
          <div className="w-10 h-6 bg-brand-main rounded-full relative cursor-pointer">
             <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;