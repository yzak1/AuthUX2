import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input: React.FC<InputProps> = ({ label, error, helperText, className = '', id, ...props }) => {
  // Generate stable IDs for accessibility linking
  const uniqueId = React.useId();
  const inputId = id || `input-${uniqueId}`;
  const errorId = `error-${uniqueId}`;
  const helperId = `helper-${uniqueId}`;

  // Determine aria-describedby value
  const describedBy = [
    error ? errorId : null,
    helperText ? helperId : null
  ].filter(Boolean).join(' ') || undefined;

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label 
          htmlFor={inputId} 
          className="text-sm font-semibold text-secondary-text uppercase tracking-wider"
          style={{ letterSpacing: '0.05em' }}
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        aria-invalid={!!error}
        aria-describedby={describedBy}
        className={`
          w-full px-4 py-3 
          bg-primary-surface border border-border-base rounded 
          text-primary-text placeholder-tertiary-text
          focus:outline-none focus:ring-2 focus:ring-focus-ring focus:border-transparent
          hover:bg-input-hover transition-colors
          disabled:bg-secondary-surface disabled:cursor-not-allowed
          ${error ? 'border-error-msg focus:ring-error-msg' : ''}
          ${className}
        `}
        {...props}
      />
      
      {/* Live Region not strictly necessary here if focus moves or onSubmit validates, 
          but linking via aria-describedby is critical for screen readers while typing/blurring */}
      {error && (
        <span id={errorId} className="text-sm text-error-msg mt-1 flex items-center gap-1 font-medium">
          {error}
        </span>
      )}
      
      {helperText && !error && (
        <span id={helperId} className="text-sm text-tertiary-text mt-1">
          {helperText}
        </span>
      )}
    </div>
  );
};

export default Input;