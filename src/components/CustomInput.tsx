import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
  secure?: boolean;
}

export function CustomInput({
  label,
  icon,
  error,
  secure = false,
  className = '',
  ...props
}: CustomInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = secure ? (showPassword ? 'text' : 'password') : props.type;

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className="text-sm text-[#1A1A1A]">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]">
            {icon}
          </div>
        )}
        <input
          type={inputType}
          className={`
            w-full h-[48px] rounded-xl
            bg-white border border-[rgba(0,0,0,0.08)]
            ${icon ? 'pl-12' : 'pl-4'} 
            ${secure ? 'pr-12' : 'pr-4'}
            text-[#1A1A1A] placeholder:text-[#9CA3AF]
            focus:outline-none focus:border-[#4C9AFF] focus:ring-2 focus:ring-[#4C9AFF]/20
            transition-all
            ${error ? 'border-[#EF4444]' : ''}
            ${className}
          `}
          {...props}
        />
        {secure && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#1A1A1A] transition-colors"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        )}
      </div>
      {error && (
        <p className="text-sm text-[#EF4444]">{error}</p>
      )}
    </div>
  );
}
