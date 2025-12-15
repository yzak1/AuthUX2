import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  isLoading = false,
  className = '',
  disabled,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded transition-colors duration-200 font-semibold focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2";
  
  const variants = {
    primary: "bg-primary-cta hover:bg-primary-hover text-brand-main shadow-sm disabled:opacity-50 disabled:cursor-not-allowed",
    secondary: "bg-white border border-border-base text-secondary-text hover:bg-secondary-surface shadow-sm disabled:opacity-50",
    ghost: "bg-transparent hover:bg-secondary-surface text-primary-text disabled:opacity-50",
    link: "bg-transparent text-link hover:underline p-0 h-auto"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-3 text-base", // Padding-M logic roughly
    lg: "px-6 py-4 text-lg"
  };

  // Override size for link variant
  const sizeClass = variant === 'link' ? '' : sizes[size];
  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizeClass} ${widthClass} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Processing...
        </span>
      ) : children}
    </button>
  );
};

export default Button;
