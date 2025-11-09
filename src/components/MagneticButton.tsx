'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';

interface MagneticButtonProps {
  children: React.ReactNode;
  href: string;
  className?: string;
  onClick?: () => void;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({ 
  children, 
  href, 
  className = "",
  onClick
}) => {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isAnimating, setIsAnimating] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    
    // Magnetic range - extended 4x for much wider effect
    const maxDistance = 640; // Extended 4x from 160px to 640px
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    if (distance < maxDistance && isHovered) {
      const strength = (maxDistance - distance) / maxDistance;
      const moveX = deltaX * strength * 1.2; // Doubled from 0.6 to 1.2
      const moveY = deltaY * strength * 1.2;
      
      console.log('Moving button:', { moveX, moveY, distance });
      setPosition({ x: moveX, y: moveY });
      setIsAnimating(true);
    } else {
      // Immediately return to original position when outside range or not hovered
      console.log('Resetting button position - outside range or not hovered');
      setPosition({ x: 0, y: 0 });
      setIsAnimating(false);
    }
  }, [isHovered]);

  const handleMouseEnter = useCallback(() => {
    console.log('Mouse entered button');
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    console.log('Mouse left button - resetting position');
    setIsHovered(false);
    // Immediately return to original position
    setPosition({ x: 0, y: 0 });
    setIsAnimating(false);
  }, []);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave]);

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <a
      ref={buttonRef}
      href={href}
      onClick={handleClick}
      className={`relative inline-block overflow-hidden transition-all duration-300 ${className}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: isAnimating ? 'transform 0.1s ease-out' : 'transform 0.3s ease-out',
      }}
    >
      {/* Fill effect background */}
      <div 
        className={`absolute inset-0 transition-all duration-300 ${
          isHovered ? 'h-full' : 'h-0'
        }`}
        style={{
          backgroundColor: '#0072b1',
          transition: 'height 0.3s ease-out',
        }}
      />
      
      {/* Button content */}
      <div 
        className="relative z-10 px-8 py-4 text-lg font-['Poppins'] font-bold border-2 hover:text-white dark:hover:text-gray-900 transition-colors duration-300"
        style={{
          borderColor: '#0072b1',
          color: '#0072b1'
        }}
      >
        {children}
      </div>
    </a>
  );
};

export default MagneticButton;
