import { User, NavItem } from '../types';

export const personalizationService = {
  /**
   * Returns a list of Quick Links tailored to the student's segment.
   * data-story-code=5.02.g
   */
  getQuickLinksForUser: (user: User): NavItem[] => {
    // Base links for everyone
    const links: NavItem[] = [
      { id: 'lms', label: 'Canvas LMS', path: 'https://canvas.uni.edu', icon: 'BookOpen', isExternal: true },
      { id: 'email', label: 'Student Email', path: '#', icon: 'Mail', isExternal: true },
      { id: 'map', label: 'Campus Maps', path: 'https://maps.unimelb.edu.au', icon: 'Map', isExternal: true },
    ];

    // Cohort specific links
    if (user.studentType === 'research') {
      links.push({
        id: 'gr-hub',
        label: 'Graduate Research Hub',
        path: '#',
        icon: 'GraduationCap', // Mapped in widget
        isExternal: false
      });
    }

    if (user.campus === 'southbank') {
      links.push({
        id: 'studio-book',
        label: 'Book Studio Space',
        path: '#',
        icon: 'Calendar', // Mapped in widget
        isExternal: false
      });
    }

    // Default 'Stop 1' for everyone
    links.push({ id: 'stop1', label: 'Stop 1 (Student Services)', path: '/services', icon: 'Coffee', isExternal: false });

    return links;
  }
};