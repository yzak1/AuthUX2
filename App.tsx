import React, { useState, useEffect } from 'react';
import { User, AuthState } from './types';
import LoginMethodSelector from './components/LoginMethodSelector';
import Header from './components/Header';
import Navigation from './components/Navigation';
import { authService } from './services/authService';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import TopicPage from './pages/TopicPage';
import CalendarPage from './pages/CalendarPage';
import MessagesPage from './pages/MessagesPage';
import MyCoursePage from './pages/MyCoursePage';
import AssessmentsPage from './pages/AssessmentsPage';
import FeesPage from './pages/FeesPage';
import ServicesPage from './pages/ServicesPage';
import ProfilePage from './pages/ProfilePage';
import FeedbackWidget from './components/FeedbackWidget';

const App: React.FC = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    isLoading: true
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    const user = authService.getSession();
    if (user) {
      setAuthState({
        isAuthenticated: true,
        user,
        isLoading: false
      });
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const handleLogin = (user: User) => {
    authService.setSession(user);
    setAuthState({
      isAuthenticated: true,
      user,
      isLoading: false
    });
  };

  const handleLogout = () => {
    authService.clearSession();
    setAuthState({
      isAuthenticated: false,
      user: null,
      isLoading: false
    });
    setIsSidebarOpen(false);
  };

  // Protected Layout Component
  const ProtectedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    if (authState.isLoading) return <div className="h-screen flex items-center justify-center bg-secondary-surface">Loading...</div>;
    if (!authState.isAuthenticated || !authState.user) return <Navigate to="/login" replace />;

    return (
      <div className="min-h-screen bg-secondary-surface flex flex-col">
        <Header 
          user={authState.user} 
          onLogout={handleLogout} 
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
        />
        <div className="flex flex-1 pt-16">
          <Navigation 
            isOpen={isSidebarOpen} 
            onCloseMobile={() => setIsSidebarOpen(false)} 
          />
          <main className="flex-1 p-4 md:p-8 lg:p-10 overflow-x-hidden relative">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
            <FeedbackWidget />
          </main>
        </div>
      </div>
    );
  };

  // Login Page Component
  const LoginPage = () => (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Brand Section */}
      <div className="w-full md:w-1/2 bg-brand-main text-white p-8 md:p-16 flex flex-col justify-between relative overflow-hidden">
         {/* Decorative Circle */}
         <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary-cta opacity-10 rounded-full blur-3xl"></div>
         <div className="absolute bottom-12 right-12 w-96 h-96 bg-primary-cta opacity-5 rounded-full blur-3xl"></div>
         
         <div className="relative z-10">
           <div className="w-12 h-12 bg-white text-brand-main rounded flex items-center justify-center text-xl font-bold mb-6">U</div>
           <h1 className="text-4xl md:text-5xl font-fraunces mb-4">UniPortal</h1>
           <p className="text-xl md:text-2xl text-blue-100 max-w-md font-source">Your gateway to academic success, campus life, and student services.</p>
         </div>

         <div className="relative z-10 text-sm text-blue-200 mt-12">
           <p>© 2024 University of Excellence</p>
         </div>
      </div>

      {/* Login Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 bg-secondary-surface">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-portal-card border border-border-base">
          <LoginMethodSelector onLogin={handleLogin} />
        </div>
      </div>
    </div>
  );

  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          authState.isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />
        } />
        <Route path="/*" element={
          <ProtectedLayout>
             <Routes>
               <Route path="/" element={<Dashboard user={authState.user!} />} />
               
               <Route path="/calendar" element={<CalendarPage />} />
               <Route path="/messages" element={<MessagesPage />} />
               <Route path="/units" element={<MyCoursePage />} />
               
               {/* Separate routes for Assessments vs Exams */}
               <Route path="/assessments" element={<AssessmentsPage mode="assessments" />} />
               <Route path="/exams" element={<AssessmentsPage mode="exams" />} />
               
               <Route path="/profile" element={<ProfilePage />} />
               <Route path="/services" element={<ServicesPage />} />
               
               {/* Admin Routes */}
               <Route path="/topic/fees" element={<FeesPage />} />

               {/* Legacy/Redirects */}
               <Route path="/timetable" element={<Navigate to="/calendar" />} />

               {/* Placeholders */}
               <Route path="/topic/:topicId" element={<TopicPage />} />
               
               {/* Catch-all */}
               <Route path="*" element={<div className="text-center py-20 text-secondary-text">Page not found</div>} />
             </Routes>
          </ProtectedLayout>
        } />
      </Routes>
    </Router>
  );
};

export default App;