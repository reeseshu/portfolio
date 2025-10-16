'use client';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface ThemeWrapperProps {
  children: React.ReactNode;
}

export const ThemeWrapper = ({ children }: ThemeWrapperProps) => {
  const { isDark } = useSelector((state: RootState) => state.theme);

  useEffect(() => {
    // Apply theme to document
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className={isDark ? 'dark' : ''}>
      {children}
    </div>
  );
};

export default ThemeWrapper;
