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

    // Wait a tick to ensure the inline script has run
    const initTheme = () => {
      const storedTheme = localStorage.getItem('theme');
      const isCurrentlyDark = document.documentElement.classList.contains('dark');
      
      if (storedTheme) {
        // Use stored preference and ensure it's applied
        const shouldBeDark = storedTheme === 'dark';
        dispatch(setTheme(shouldBeDark));
        if (shouldBeDark && !isCurrentlyDark) {
          document.documentElement.classList.add('dark');
        } else if (!shouldBeDark && isCurrentlyDark) {
          document.documentElement.classList.remove('dark');
        }
      } else {
        // Fall back to what's currently on the document (set by script) or system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const shouldBeDark = isCurrentlyDark || prefersDark;
        dispatch(setTheme(shouldBeDark));
        // Ensure the class matches the state
        if (shouldBeDark && !isCurrentlyDark) {
          document.documentElement.classList.add('dark');
        } else if (!shouldBeDark && isCurrentlyDark) {
          document.documentElement.classList.remove('dark');
        }
        // Save to localStorage
        localStorage.setItem('theme', shouldBeDark ? 'dark' : 'light');
      }
    };

    // Use requestAnimationFrame to ensure DOM is ready
    if (typeof window !== 'undefined') {
      requestAnimationFrame(initTheme);
    }
  }, [dispatch]);

  // Apply theme to document and persist to localStorage whenever Redux state changes
  useEffect(() => {
    if (!initialized.current) return; // Don't apply until initialized
    
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
