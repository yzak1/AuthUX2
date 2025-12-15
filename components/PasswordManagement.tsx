import React from 'react';
import { Shield, ExternalLink } from 'lucide-react';
import Button from './Button';

const PasswordManagement: React.FC = () => {
  return (
    <div className="bg-white rounded-lg border border-border-base shadow-sm p-6" data-story-code="7.05.a">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-blue-50 text-brand-main rounded-full">
           <Shield size={24} />
        </div>
        <div className="flex-1">
           <h3 className="font-fraunces text-xl text-brand-main">Security & Password</h3>
           <p className="text-secondary-text mt-1 text-sm">
             Manage your password and multi-factor authentication settings.
           </p>
           
           <div className="mt-4 flex gap-3">
             <a href="#" target="_blank">
               <Button variant="secondary" size="sm" className="flex items-center gap-2">
                 Reset Password <ExternalLink size={14} />
               </Button>
             </a>
             <a href="#" target="_blank">
               <Button variant="ghost" size="sm" className="flex items-center gap-2">
                 Manage MFA <ExternalLink size={14} />
               </Button>
             </a>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordManagement;