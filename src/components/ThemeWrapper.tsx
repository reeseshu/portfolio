'use client';

import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { setTheme } from '@/store/slices/themeSlice';

interface ThemeWrapperProps {
  children: React.ReactNode;
}

export const ThemeWrapper = ({ children }: ThemeWrapperProps) => {
  const dispatch = useDispatch();
  const { isDark } = useSelector((state: RootState) => state.theme);
  const initialized = useRef(false);

  // Initialize theme from localStorage or system preference on mount
  // Sync with what was set by the inline script in layout.tsx
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const isCurrentlyDark = document.documentElement.classList.contains('dark');
    const storedTheme = localStorage.getItem('theme');
    
    // If document already has dark class set by script, sync Redux state
    if (storedTheme) {
      // Use stored preference
      dispatch(setTheme(storedTheme === 'dark'));
    } else {
      // Fall back to what's currently on the document (set by script) or system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      dispatch(setTheme(isCurrentlyDark || prefersDark));
    }
  }, [dispatch]);

  // Apply theme to document and persist to localStorage
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return <>{children}</>;
};

export default ThemeWrapper;
