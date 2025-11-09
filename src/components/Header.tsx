'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { RootState } from '@/store/store';
import { toggleTheme } from '@/store/slices/themeSlice';
import { toggleMenu, closeMenu } from '@/store/slices/navigationSlice';
import { authenticate, toggleEditing } from '@/store/slices/editSlice';
import type { RootState as RS } from '@/store/store';

const Header = () => {
  const dispatch = useDispatch();
  const { isDark } = useSelector((state: RootState) => state.theme);
  const { isMenuOpen } = useSelector((state: RootState) => state.navigation);
  const edit = useSelector((state: RS) => state.edit);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#work' },
    { name: 'Contact', href: '#contact' },
    { name: '👋', href: '/wave' },
  ];

  if (!mounted) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-100/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
              Reese Shu
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8 nav-fancy">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 dark:text-gray-300 px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
              <button
                onClick={() => {
                  if (edit.isAuthenticated && edit.isEditing) return;
                  const pwd = prompt('Enter edit password');
                  if (pwd && pwd === (process.env.NEXT_PUBLIC_EDIT_PASSWORD || 'changeme')) {
                    dispatch(authenticate(true));
                    dispatch(toggleEditing());
                  } else {
                    alert('Incorrect password');
                  }
                }}
                disabled={edit.isAuthenticated && edit.isEditing}
                className={`text-gray-700 dark:text-gray-300 px-3 py-2 text-sm font-semibold border border-gray-400/40 rounded-md transition-colors duration-200 ${
                  edit.isAuthenticated && edit.isEditing
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                Edit
              </button>
              {edit.isAuthenticated && (
                <button
                  onClick={async () => {
                    try {
                      const payload = edit.content;
                      const res = await fetch('/api/content', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload),
                      });
                      if (!res.ok) throw new Error('Failed to save');
                      alert('All content saved');
                      if (typeof window !== 'undefined') {
                        window.location.reload();
                      }
                    } catch {
                      alert('Save failed');
                    }
                  }}
                  className="text-white px-3 py-2 text-sm font-semibold rounded-md"
                  style={{ backgroundColor: '#2c94d0' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#005a8b'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2c94d0'}
                >
                  Save All
                </button>
              )}
              {edit.isAuthenticated && edit.isEditing && (
                <button
                  onClick={() => {
                    try {
                      dispatch(toggleEditing());
                      dispatch(authenticate(false));
                    } finally {
                      if (typeof window !== 'undefined') {
                        window.location.reload();
                      }
                    }
                  }}
                  className="text-red-700 dark:text-red-300 px-3 py-2 text-sm font-semibold border border-gray-400/40 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>

          {/* Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => dispatch(toggleTheme())}
              role="switch"
              aria-checked={isDark}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className="relative inline-flex h-6 w-12 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900 bg-gray-300 dark:bg-gray-700"
              style={{ '--tw-ring-color': '#0072b1' } as React.CSSProperties}
            >
              {/* Sun icon (left) */}
              <span className="absolute left-1 text-yellow-500">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              </span>
              {/* Moon icon (right) */}
              <span className="absolute right-1 text-blue-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              </span>
              {/* Knob */}
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-300 ${isDark ? 'translate-x-6' : 'translate-x-1'}`}
              />
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => dispatch(toggleMenu())}
              className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 transition-colors duration-200"
              onMouseEnter={(e) => e.currentTarget.style.color = '#2c94d0'}
              onMouseLeave={(e) => e.currentTarget.style.color = ''}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => dispatch(closeMenu())}
                  className="text-gray-700 dark:text-gray-300 block px-3 py-2 text-base font-medium transition-colors duration-200"
                  onMouseEnter={(e) => e.currentTarget.style.color = '#2c94d0'}
                  onMouseLeave={(e) => e.currentTarget.style.color = ''}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
