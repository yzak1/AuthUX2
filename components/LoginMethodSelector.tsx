import React, { useState, useEffect } from 'react';
import { User } from '../types';
import Button from './Button';
import Input from './Input';
import { Fingerprint, KeyRound, ShieldCheck, ArrowRight, User as UserIcon, AlertCircle } from 'lucide-react';

interface LoginMethodSelectorProps {
  onLogin: (user: User) => void;
}

const LoginMethodSelector: React.FC<LoginMethodSelectorProps> = ({ onLogin }) => {
  // data-story-code=1.10.1.a (FastPass), 1.10.1.b (Passkey)
  const [activeMethod, setActiveMethod] = useState<'AUTO' | 'PASSWORD'>('AUTO');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // Simulate checking for existing session / remember me cookie
  useEffect(() => {
    const savedUser = localStorage.getItem('uniportal_remember_user');
    if (savedUser) {
      setUsername(savedUser);
      setRememberMe(true);
    }
  }, []);

  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Simulate network request
    setTimeout(() => {
      setIsLoading(false);
      if (username && password) {
        if (rememberMe) {
          localStorage.setItem('uniportal_remember_user', username);
        } else {
          localStorage.removeItem('uniportal_remember_user');
        }
        
        onLogin({
          id: 's1234567',
          name: 'Alex Student',
          email: username || 'alex.student@uni.edu',
          studentType: 'research', // Demo segmentation
          campus: 'parkville'
        });
      } else {
        setError('Invalid credentials. Please enter both username and password.');
      }
    }, 1500);
  };

  const handleFastPassLogin = () => {
    // data-story-code=1.10.1.a
    setIsLoading(true);
    setError(null);
    setTimeout(() => {
      setIsLoading(false);
      // Simulate 50/50 success for demo purposes to show fallback
      const success = Math.random() > 0.3;
      if (success) {
        onLogin({
          id: 's1234567',
          name: 'Alex Student',
          email: 'alex.student@uni.edu',
          studentType: 'research', // Demo segmentation
          campus: 'parkville'
        });
      } else {
        setError('FastPass unavailable. Please use password.');
        setActiveMethod('PASSWORD');
      }
    }, 2000);
  };

  if (activeMethod === 'AUTO') {
    return (
      <div className="space-y-6" data-story-code="1.10.1.a,1.10.1.b">
        <div className="text-center space-y-2">
           <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-brand-main mb-4">
             <ShieldCheck size={32} aria-hidden="true" />
           </div>
           <h2 className="text-2xl font-fraunces text-brand-main">Welcome Back</h2>
           <p className="text-secondary-text">Choose a secure method to sign in</p>
        </div>

        <div className="space-y-3">
          <button
            type="button"
            onClick={handleFastPassLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-between p-4 bg-white border border-border-base rounded hover:bg-input-hover hover:border-primary-cta transition-all group shadow-sm focus:outline-none focus:ring-2 focus:ring-focus-ring"
            aria-label="Sign in with Okta FastPass using device biometrics"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-secondary-surface rounded text-brand-main group-hover:bg-white">
                <Fingerprint size={20} aria-hidden="true" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-primary-text">Okta FastPass</div>
                <div className="text-sm text-tertiary-text">Use your device biometrics</div>
              </div>
            </div>
            {isLoading ? (
               <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-brand-main" aria-label="Loading"></div>
            ) : (
               <ArrowRight size={20} className="text-tertiary-text group-hover:text-primary-cta" aria-hidden="true" />
            )}
          </button>

          <button
            type="button"
            onClick={handleFastPassLogin} // Simulating same flow for Passkey
            disabled={isLoading}
            className="w-full flex items-center justify-between p-4 bg-white border border-border-base rounded hover:bg-input-hover hover:border-primary-cta transition-all group shadow-sm focus:outline-none focus:ring-2 focus:ring-focus-ring"
            aria-label="Sign in with a Passkey"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-secondary-surface rounded text-brand-main group-hover:bg-white">
                <KeyRound size={20} aria-hidden="true" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-primary-text">Passkey</div>
                <div className="text-sm text-tertiary-text">Sign in with a security key</div>
              </div>
            </div>
             <ArrowRight size={20} className="text-tertiary-text group-hover:text-primary-cta" aria-hidden="true" />
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-border-base"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-tertiary-text">Or continue with</span>
          </div>
        </div>

        <Button 
          variant="secondary" 
          fullWidth 
          onClick={() => setActiveMethod('PASSWORD')}
        >
          Username & Password
        </Button>
        
        {error && (
           <div role="alert" className="p-3 bg-error-bg text-error-msg text-sm rounded border border-red-200 flex items-start gap-2">
             <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
             {error}
           </div>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handlePasswordLogin} className="space-y-6" data-story-code="1.10.1.a,1.10.1.e" noValidate>
       <div className="text-center space-y-2">
           <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary-surface text-brand-main mb-4">
             <UserIcon size={32} aria-hidden="true" />
           </div>
           <h2 className="text-2xl font-fraunces text-brand-main">Sign In</h2>
           <p className="text-secondary-text">Enter your university credentials</p>
        </div>

      <div className="space-y-4">
        <Input 
          label="Username / Student ID" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="e.g. s1234567"
          required
          autoComplete="username"
        />
        <Input 
          label="Password" 
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          autoComplete="current-password"
        />
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer">
          <input 
            type="checkbox" 
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 rounded text-brand-main focus:ring-focus-ring border-gray-300"
          />
          <span className="text-sm text-secondary-text">Remember me</span>
        </label>
        <Button type="button" variant="link" size="sm">Forgot password?</Button>
      </div>

      {/* Live region for errors */}
      {error && (
         <div role="alert" className="p-3 bg-error-bg text-error-msg text-sm rounded border border-red-200 flex items-start gap-2">
           <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
           {error}
         </div>
      )}

      <div className="space-y-3">
        <Button type="submit" fullWidth isLoading={isLoading}>
          Sign In
        </Button>
        <Button type="button" variant="ghost" fullWidth onClick={() => setActiveMethod('AUTO')}>
          Back to FastPass options
        </Button>
      </div>
    </form>
  );
};

export default LoginMethodSelector;