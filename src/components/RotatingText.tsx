'use client';

import { useState, useEffect } from 'react';

interface TypewriterTextProps {
  fixedText: string;
  rotatingTexts: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
}

const TypewriterText = ({
  fixedText,
  rotatingTexts,
  className = '',
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseTime = 2000
}: TypewriterTextProps) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const fullText = rotatingTexts[currentTextIndex];
      
      if (isPaused) {
        setIsPaused(false);
        setIsDeleting(true);
        return;
      }

      if (isDeleting) {
        // Delete characters
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          // Finished deleting, move to next text
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length);
        }
      } else {
        // Type characters
        if (currentText.length < fullText.length) {
          setCurrentText(fullText.slice(0, currentText.length + 1));
        } else {
          // Finished typing, pause then start deleting
          setIsPaused(true);
        }
      }
    }, isPaused ? pauseTime : (isDeleting ? deletingSpeed : typingSpeed));

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, isPaused, currentTextIndex, rotatingTexts, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className={className}>
      {fixedText}
      <span className="inline-block" style={{ color: '#2c94d0' }}>
        {currentText}
        <span className="animate-pulse">|</span>
      </span>
    </span>
  );
};

export default TypewriterText;
