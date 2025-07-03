import React from 'react';
import { useTheme } from '../theme/ThemeProvider';

interface ButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = 'button',
  onClick,
  disabled = false,
  loading = false,
  variant = 'primary',
  fullWidth = false,
  className = '',
}) => {
  const theme = useTheme();

  const baseStyles = 'flex items-center justify-center rounded-lg px-6 py-3 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50';
  
  const variantStyles = {
    primary: `bg-[${theme.primaryColor}] text-white hover:bg-opacity-90 focus:ring-[${theme.primaryColor}]`,
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-300',
  };

  const widthStyles = fullWidth ? 'w-full' : '';
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variantStyles[variant]} ${widthStyles} ${disabledStyles} ${className}`}
    >
      {loading ? (
        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-white"></div>
      ) : null}
      {children}
    </button>
  );
};

export default Button;