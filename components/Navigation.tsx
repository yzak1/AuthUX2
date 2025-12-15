import React, { useState } from 'react';
import { NavItem } from '../types';
import { ChevronDown, ChevronRight, ExternalLink, LayoutDashboard } from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface NavigationProps {
  isOpen: boolean;
  onCloseMobile: () => void;
}

const MENU_ITEMS: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/',
    icon: 'LayoutDashboard'
  },
  {
    id: 'my-study',
    label: 'My Study',
    children: [
      { id: 'calendar', label: 'Calendar & Timetable', path: '/calendar' },
      { id: 'units', label: 'My Course & Results', path: '/units' },
      { id: 'assessments', label: 'Assessments', path: '/assessments' },
      { id: 'exams', label: 'Exam Schedule', path: '/exams' },
    ]
  },
  {
    id: 'messages',
    label: 'Messages',
    path: '/messages'
  },
  {
    id: 'services',
    label: 'Services & Support',
    children: [
      { id: 'services-hub', label: 'Student Services Hub', path: '/services' },
      { id: 'library', label: 'Library', path: 'https://library.uni.edu', isExternal: true },
      { id: 'lms', label: 'Canvas / LMS', path: 'https://canvas.uni.edu', isExternal: true },
    ]
  },
  {
    id: 'admin',
    label: 'Admin',
    children: [
      { id: 'fees', label: 'Fees & Finance', path: '/topic/fees' },
      { id: 'profile', label: 'Profile & Settings', path: '/profile' },
    ]
  }
];

const Navigation: React.FC<NavigationProps> = ({ isOpen, onCloseMobile }) => {
  const [expandedItems, setExpandedItems] = useState<string[]>(['my-study', 'services', 'admin']);

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // data-story-code=5.05.c
  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-30 transition-opacity md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onCloseMobile}
        aria-hidden="true"
      />

      {/* Sidebar Drawer */}
      <nav 
        aria-label="Main Navigation"
        className={`
          fixed top-16 bottom-0 left-0 w-64 bg-white border-r border-border-base z-40
          transform transition-transform duration-300 ease-in-out
          md:translate-x-0 md:sticky md:top-16 md:h-[calc(100vh-4rem)]
          overflow-y-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="py-6 px-4">
          <p className="text-xs font-bold text-tertiary-text uppercase tracking-wider mb-4 px-2" id="nav-label">Menu</p>
          <ul className="space-y-2" aria-labelledby="nav-label">
            {MENU_ITEMS.map((item) => (
              <li key={item.id}>
                {item.children ? (
                  <div className="space-y-1">
                    <button
                      onClick={() => toggleExpand(item.id)}
                      aria-expanded={expandedItems.includes(item.id)}
                      aria-controls={`submenu-${item.id}`}
                      className="w-full flex items-center justify-between px-2 py-2 text-primary-text hover:bg-secondary-surface rounded font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-focus-ring"
                    >
                      <div className="flex items-center gap-2">
                        {item.id === 'dashboard' && <LayoutDashboard size={18} />}
                        <span>{item.label}</span>
                      </div>
                      {expandedItems.includes(item.id) ? (
                        <ChevronDown size={16} className="text-tertiary-text" aria-hidden="true" />
                      ) : (
                        <ChevronRight size={16} className="text-tertiary-text" aria-hidden="true" />
                      )}
                    </button>
                    
                    <ul 
                      id={`submenu-${item.id}`}
                      className={`pl-4 space-y-1 border-l border-border-base ml-2 ${expandedItems.includes(item.id) ? 'block' : 'hidden'}`}
                    >
                      {item.children.map((child) => (
                        <li key={child.id}>
                          {child.isExternal ? (
                            <a 
                              href={child.path}
                              className="block px-3 py-2 text-sm text-secondary-text hover:text-primary-cta hover:bg-secondary-surface rounded transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-focus-ring"
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${child.label} (opens in new tab)`}
                            >
                              {child.label}
                              <ExternalLink size={12} className="opacity-50" aria-hidden="true" />
                            </a>
                          ) : (
                            <NavLink 
                              to={child.path || '#'}
                              onClick={onCloseMobile}
                              className={({ isActive }) => `
                                block px-3 py-2 text-sm rounded transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-focus-ring
                                ${isActive ? 'bg-secondary-surface text-primary-cta font-bold' : 'text-secondary-text hover:text-primary-cta hover:bg-secondary-surface'}
                              `}
                            >
                              {child.label}
                            </NavLink>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <NavLink 
                    to={item.path || '#'}
                    onClick={onCloseMobile}
                    className={({ isActive }) => `
                      block px-2 py-2 rounded font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-focus-ring flex items-center gap-2
                      ${isActive ? 'bg-secondary-surface text-primary-cta' : 'text-primary-text hover:bg-secondary-surface'}
                    `}
                  >
                    {item.id === 'dashboard' && <LayoutDashboard size={18} />}
                    {item.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navigation;