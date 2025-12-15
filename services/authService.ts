// Simple mock service to handle persistent session simulation
import { User } from '../types';

const STORAGE_KEY = 'uniportal_session';

export const authService = {
  getSession: (): User | null => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    try {
      const { user, expiry } = JSON.parse(stored);
      if (Date.now() > expiry) {
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }
      return user;
    } catch (e) {
      return null;
    }
  },

  setSession: (user: User) => {
    // Session valid for 24 hours (data-story-code=1.10.1.d)
    const expiry = Date.now() + 24 * 60 * 60 * 1000;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ user, expiry }));
  },

  clearSession: () => {
    localStorage.removeItem(STORAGE_KEY);
  }
};
