'use client';

import React from 'react';
import { useFadeInOnScroll } from '@/hooks/useFadeInOnScroll';

interface FadeInSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

const FadeInSection: React.FC<FadeInSectionProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 1000,
  direction = 'up',
}) => {
  const { elementRef, isVisible } = useFadeInOnScroll({
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px',
    triggerOnce: true,
  });

  const getTransform = () => {
    if (!isVisible) {
      switch (direction) {
        case 'up':
          return 'translateY(50px)';
        case 'down':
          return 'translateY(-50px)';
        case 'left':
          return 'translateX(50px)';
        case 'right':
          return 'translateX(-50px)';
        default:
          return 'translateY(50px)';
      }
    }
    return 'translateY(0) translateX(0)';
  };

  return (
    <div
      ref={elementRef}
      className={`transition-all ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {children}
    </div>
  );
};

export default FadeInSection;
