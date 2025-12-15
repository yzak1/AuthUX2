import React, { useState } from 'react';
import { User } from '../types';
import { Menu, X, Bell, User as UserIcon, Search } from 'lucide-react';
import ProfileMenu from './ProfileMenu';
import SearchModal from './SearchModal';

interface HeaderProps {
  user: User;
  onLogout: () => void;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, onToggleSidebar, isSidebarOpen }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <header className="h-16 bg-brand-main text-white flex items-center justify-between px-4 md:px-6 shadow-md fixed top-0 w-full z-50">
        <div className="flex items-center gap-4">
          {/* Mobile Sidebar Toggle */}
          <button 
            onClick={onToggleSidebar}
            className="md:hidden p-2 hover:bg-white/10 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label={isSidebarOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={isSidebarOpen}
          >
            {isSidebarOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>

          {/* Branding */}
          <div className="flex items-center gap-2">
             {/* Placeholder Logo */}
             <div className="w-8 h-8 bg-primary-cta rounded flex items-center justify-center font-bold text-brand-main" aria-hidden="true">
               U
             </div>
             <span className="text-xl font-fraunces tracking-tight hidden sm:block">UniPortal</span>
          </div>
        </div>

        {/* Global Search Bar (Collapsed on mobile, expanded on Desktop) */}
        {/* REFINED: White background for better visibility */}
        <div className="flex-1 max-w-xl mx-4 lg:mx-8 hidden md:block">
           <button 
             onClick={() => setIsSearchOpen(true)}
             className="w-full flex items-center gap-3 bg-white border border-transparent hover:border-primary-cta transition-all rounded-lg px-4 py-2 text-primary-text group focus:outline-none focus:ring-2 focus:ring-white/50 shadow-sm"
             aria-label="Search Handbook, Library, and Maps"
           >
             <Search size={18} className="text-tertiary-text group-hover:text-primary-cta" aria-hidden="true" />
             <span className="text-sm text-secondary-text group-hover:text-primary-text">Search Handbook, Library, Maps...</span>
             <div className="ml-auto flex gap-1" aria-hidden="true">
                <kbd className="hidden lg:inline-flex items-center px-1.5 h-5 text-[10px] font-medium text-tertiary-text bg-secondary-surface border border-border-base rounded">⌘K</kbd>
             </div>
           </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Mobile Search Trigger */}
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="md:hidden p-2 hover:bg-white/10 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Search"
          >
            <Search size={20} aria-hidden="true" />
          </button>

          <button 
            className="p-2 hover:bg-white/10 rounded-full transition-colors relative focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Notifications (1 new)"
          >
             <Bell size={20} aria-hidden="true" />
             <span className="absolute top-1.5 right-2 w-2 h-2 bg-error-msg rounded-full border border-brand-main"></span>
          </button>

          {/* Profile Trigger */}
          <div className="relative">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 p-1.5 pl-3 pr-2 rounded-full hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 border border-white/20"
              aria-label="User Profile"
              aria-haspopup="true"
              aria-expanded={isProfileOpen}
            >
               <span className="text-sm font-semibold hidden md:block max-w-[150px] truncate">
                 {user.name}
               </span>
               <div className="w-8 h-8 bg-secondary-surface rounded-full flex items-center justify-center text-brand-main" aria-hidden="true">
                 <UserIcon size={18} />
               </div>
            </button>

            {/* Profile Dropdown */}
            <ProfileMenu 
              user={user} 
              isOpen={isProfileOpen} 
              onClose={() => setIsProfileOpen(false)}
              onLogout={onLogout}
            />
          </div>
        </div>
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Header;