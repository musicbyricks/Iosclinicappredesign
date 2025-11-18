import React from 'react';
import { Loader2 } from 'lucide-react';

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  isLoading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export function CustomButton({
  variant = 'primary',
  isLoading = false,
  icon,
  children,
  className = '',
  disabled,
  ...props
}: CustomButtonProps) {
  const baseStyles = 'flex items-center justify-center gap-2 rounded-xl px-6 py-3 min-h-[48px] transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantStyles = {
    primary: 'bg-[#4C9AFF] text-white hover:bg-[#3D8AEF] shadow-sm',
    secondary: 'bg-[#E8F3FF] text-[#4C9AFF] hover:bg-[#D8E8FF]',
    outline: 'bg-transparent text-[#4C9AFF] border-2 border-[#4C9AFF] hover:bg-[#E8F3FF]',
    ghost: 'bg-transparent text-[#6B7280] hover:bg-[#F0F2F5]'
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        icon && icon
      )}
      {children}
    </button>
  );
}
