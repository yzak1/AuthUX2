import React from 'react';
import { User, NavItem } from '../types';
import { ExternalLink, BookOpen, Map, Mail, Coffee, GraduationCap, Calendar } from 'lucide-react';
import { personalizationService } from '../services/personalizationService';

interface QuickLinksWidgetProps {
  user: User;
}

const QuickLinksWidget: React.FC<QuickLinksWidgetProps> = ({ user }) => {
  const links = personalizationService.getQuickLinksForUser(user);

  const getIcon = (iconName?: string) => {
    switch(iconName) {
      case 'BookOpen': return <BookOpen size={20} />;
      case 'Mail': return <Mail size={20} />;
      case 'Map': return <Map size={20} />;
      case 'Coffee': return <Coffee size={20} />;
      case 'GraduationCap': return <GraduationCap size={20} />;
      case 'Calendar': return <Calendar size={20} />;
      default: return <ExternalLink size={20} />;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-border-base shadow-portal-card h-full" data-story-code="5.05.f,5.02.g">
      <div className="p-6 border-b border-border-base">
        <h3 className="font-fraunces text-xl text-brand-main">Quick Links</h3>
      </div>
      <div className="p-2">
        {links.map(link => (
          <a 
            key={link.id} 
            href={link.path}
            target={link.isExternal ? "_blank" : "_self"}
            rel={link.isExternal ? "noopener noreferrer" : ""}
            className="flex items-center gap-4 p-3 rounded hover:bg-input-hover transition-colors group"
          >
            <div className="w-10 h-10 rounded-full bg-secondary-surface flex items-center justify-center text-brand-main group-hover:bg-white group-hover:text-primary-cta transition-colors">
              {getIcon(link.icon)}
            </div>
            <span className="font-semibold text-primary-text">{link.label}</span>
            {link.isExternal && <ExternalLink size={14} className="ml-auto text-tertiary-text opacity-50" />}
          </a>
        ))}
      </div>
    </div>
  );
};

export default QuickLinksWidget;