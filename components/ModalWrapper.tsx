import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  title: string; // Required for accessibility (aria-label)
  children: React.ReactNode;
  hideCloseButton?: boolean;
  className?: string; // For specific width/layout overrides
  role?: 'dialog' | 'alertdialog';
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  hideCloseButton = false,
  className = "max-w-lg",
  role = 'dialog'
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // 1. Save currently focused element to return to later
      previousFocus.current = document.activeElement as HTMLElement;

      // 2. Lock body scroll
      document.body.style.overflow = 'hidden';

      // 3. Focus the modal content or the first focusable element
      // Small timeout allows the portal to mount
      setTimeout(() => {
        if (contentRef.current) {
          const focusable = contentRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusable.length > 0) {
            (focusable[0] as HTMLElement).focus();
          } else {
            contentRef.current.focus();
          }
        }
      }, 50);
    } else {
      // Restore body scroll
      document.body.style.overflow = '';
      
      // Return focus
      if (previousFocus.current) {
        previousFocus.current.focus();
      }
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle Escape Key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      }
      // Simple Focus Trap Logic
      if (e.key === 'Tab' && contentRef.current) {
        const focusableElements = contentRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalContent = (
    <div 
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-fade-in"
      role="presentation"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div 
        ref={contentRef}
        role={role}
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className={`relative w-full bg-white rounded-lg shadow-portal-card flex flex-col max-h-[90vh] ${className}`}
      >
        {!hideCloseButton && (
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-tertiary-text hover:text-primary-text hover:bg-secondary-surface rounded-full transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-focus-ring"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        )}
        {children}
      </div>
    </div>
  );

  // Portal to root to avoid z-index and overflow issues
  const root = document.getElementById('root');
  return root ? createPortal(modalContent, root) : null;
};

export default ModalWrapper;