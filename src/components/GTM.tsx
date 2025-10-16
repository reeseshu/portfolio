'use client';

import { useEffect } from 'react';
import TagManager from 'react-gtm-module';

interface GTMProps {
  gtmId: string;
}

export const GTM = ({ gtmId }: GTMProps) => {
  useEffect(() => {
    if (gtmId) {
      TagManager.initialize({ gtmId });
    }
  }, [gtmId]);

  return null;
};

export default GTM;
