import React, { createContext, useContext, ReactNode } from 'react';

interface ThemeContextType {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  successColor: string;
  warningColor: string;
  errorColor: string;
}

const defaultTheme: ThemeContextType = {
  primaryColor: '#0070F3',
  secondaryColor: '#0070F3',
  backgroundColor: '#F9FAFB',
  textColor: '#1F2937',
  successColor: '#10B981',
  warningColor: '#F59E0B',
  errorColor: '#EF4444',
};

const ThemeContext = createContext<ThemeContextType>(defaultTheme);

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return (
    <ThemeContext.Provider value={defaultTheme}>
      {children}
    </ThemeContext.Provider>
  );
};