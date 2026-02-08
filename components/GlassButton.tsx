import React from 'react';

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  fullWidth?: boolean;
}

const GlassButton: React.FC<GlassButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  // Reduced roundedness from 2xl to xl. Removed active:scale-95 for more "solid" feel.
  // Added outline-none and tap-highlight-transparent to remove browser artifacts.
  const baseStyles = "relative px-6 py-3 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 backdrop-blur-md border outline-none ring-0 tap-highlight-transparent focus:outline-none";
  
  const variants = {
    // Subtler primary
    primary: "bg-white/10 hover:bg-white/15 border-white/20 text-white shadow-lg",
    secondary: "bg-black/20 hover:bg-black/30 border-white/10 text-white/90",
    danger: "bg-red-500/10 hover:bg-red-500/20 border-red-500/20 text-red-100",
    ghost: "bg-transparent hover:bg-white/5 border-transparent text-white/60 hover:text-white"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default GlassButton;