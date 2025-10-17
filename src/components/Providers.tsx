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
        const res = await fetch('/api/content', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          dispatch(hydrateContent(data));
        }
      } catch {}
    }
    load();
  }, [dispatch]);
  return null;
}
