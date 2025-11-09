'use client';

import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { ThemeWrapper } from './ThemeWrapper';
import GTM from './GTM';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { hydrateContent } from '@/store/slices/editSlice';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeWrapper>
        <GTM gtmId={process.env.NEXT_PUBLIC_GTM_ID || ''} />
        <ContentHydrator />
        {children}
      </ThemeWrapper>
    </Provider>
  );
}

function ContentHydrator() {
  const dispatch = useDispatch();
  useEffect(() => {
    async function load() {
      try {
        // Try API route first (for development), fallback to public JSON (for static export)
        let res = await fetch('/api/content', { cache: 'no-store' }).catch(() => null);
        if (!res || !res.ok) {
          // Fallback to public JSON file for static export
          // Use basePath-aware path
          const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
          res = await fetch(`${basePath}/content.json`, { cache: 'no-store' });
        }
        if (res && res.ok) {
          const data = await res.json();
          dispatch(hydrateContent(data));
        }
      } catch {}
    }
    load();
  }, [dispatch]);
  return null;
}
