export interface User {
  id: string;
  name: string;
  email: string;
  isNewStudent?: boolean; // For onboarding logic
  studentType?: 'undergraduate' | 'postgraduate' | 'research'; // data-story-code=5.02.c
  campus?: 'parkville' | 'southbank' | 'burnley'; // data-story-code=5.02.c
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
}

export enum LoginMethod {
  FASTPASS = 'FASTPASS',
  PASSKEY = 'PASSKEY',
  PASSWORD = 'PASSWORD'
}

export interface NavItem {
  id: string;
  label: string;
  path?: string;
  icon?: string;
  children?: NavItem[];
  isExternal?: boolean;
}

// Search Types
export interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: 'Handbook' | 'Library' | 'Portal' | 'Public';
  url: string;
}

// Onboarding Types
export interface OnboardingTask {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  canDismiss: boolean;
  actionUrl?: string;
  actionLabel?: string;
}

// Calendar Types
export type CalendarEventType = 'class' | 'deadline' | 'exam' | 'key-date' | 'event';

export interface CalendarEvent {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  type: CalendarEventType;
  location?: string;
  isUrgent?: boolean;
  courseCode?: string; // e.g. COMP1001
  status?: string; // e.g. "Submission Open"
}

export interface CalendarSubscription {
  id: string;
  label: string;
  type: CalendarEventType;
  color: string;
  isEnabled: boolean;
}

// Message Types
export interface Message {
  id: string;
  title: string;
  preview: string;
  content: string;
  sender: string;
  date: Date;
  isRead: boolean;
  isArchived: boolean;
  type: 'announcement' | 'notice';
  priority?: 'high' | 'normal' | 'low';
}

// Academic Progress Types
export interface SubjectResult {
  id: string;
  code: string;
  name: string;
  semester: string;
  year: number;
  grade: string;
  mark?: number;
  status: 'Final' | 'Interim';
  updatedAt: Date;
}

export interface CanvasGrade {
  id: string;
  subjectCode: string;
  assessmentName: string;
  mark: string; // e.g. "85/100" or "A"
  weighting: string;
  submittedAt?: Date;
  updatedAt: Date;
}

export interface CourseProgress {
  courseName: string;
  totalCredits: number;
  completedCredits: number;
  enrolledCredits: number;
  expectedCompletion: string; // e.g. "Sem 2, 2025"
}

// Support Types
export interface Enquiry {
  id: string;
  subject: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Waiting for Customer';
  lastUpdated: Date;
  service: string; // e.g. "Stop 1", "IT Support"
}