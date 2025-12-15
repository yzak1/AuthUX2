import React, { useRef, useEffect } from 'react';
import { User } from '../types';
import { LogOut, Settings, CreditCard, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProfileMenuProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ user, isOpen, onClose, onLogout }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  if (!isOpen) return null;

  // data-story-code=5.05.d
  return (
    <div 
      ref={menuRef}
      className="absolute right-0 top-full mt-2 w-72 bg-white rounded-lg shadow-portal-card border border-border-base z-50 overflow-hidden origin-top-right transition-all"
    >
      <div className="p-4 bg-secondary-surface border-b border-border-base">
        <p className="text-sm font-semibold text-secondary-text uppercase tracking-wider mb-1">Signed in as</p>
        <p className="font-fraunces text-lg text-brand-main leading-tight">{user.name}</p>
        <p className="text-sm text-tertiary-text">{user.id}</p>
        <p className="text-xs text-tertiary-text mt-1 truncate">{user.email}</p>
      </div>

      <div className="py-2">
        <button 
          onClick={() => handleNavigate('/profile')}
          className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-secondary-surface text-secondary-text transition-colors"
        >
          <Settings size={18} />
          <span>Account Settings</span>
        </button>
        <button 
          onClick={() => handleNavigate('/topic/fees')}
          className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-secondary-surface text-secondary-text transition-colors"
        >
          <CreditCard size={18} />
          <span>Fees & Payments</span>
        </button>
        <button 
          onClick={() => handleNavigate('/services')}
          className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-secondary-surface text-secondary-text transition-colors"
        >
          <HelpCircle size={18} />
          <span>Help & Support</span>
        </button>
      </div>

      <div className="border-t border-border-base p-2">
        <button 
          onClick={onLogout}
          className="w-full text-left px-4 py-2 flex items-center gap-3 text-error-msg hover:bg-error-bg rounded transition-colors"
        >
          <LogOut size={18} />
          <span className="font-semibold">Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileMenu;