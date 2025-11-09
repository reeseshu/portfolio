'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import FadeInSection from '@/components/FadeInSection';
import Confetti from '@/components/Confetti';

export default function Home() {
  const [showConfetti, setShowConfetti] = useState(false);

  // Scroll to top on page load/reload and setup smooth scrolling
  useEffect(() => {
    // Immediate scroll to top
    window.scrollTo(0, 0);
    
    // Custom smooth scrolling with reduced speed and section barriers
    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout;
    let lastScrollY = 0;
    let scrollVelocity = 0;
    
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const deltaY = currentScrollY - lastScrollY;
      scrollVelocity = Math.abs(deltaY);
      lastScrollY = currentScrollY;
      
      if (!isScrolling) {
        isScrolling = true;
        
        // Add tension between sections with variable delay based on velocity
        const baseDelay = 150;
        const velocityMultiplier = Math.min(scrollVelocity / 10, 3);
        const tensionDelay = baseDelay + (velocityMultiplier * 50);
        
        // Add extra tension when transitioning between sections
        const sectionTransitionBonus = scrollVelocity > 20 ? 100 : 0;
        
        scrollTimeout = setTimeout(() => {
          isScrolling = false;
        }, tensionDelay + sectionTransitionBonus);
      }
    };
    
    // Also handle browser back/forward navigation
    const handlePopState = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('popstate', handlePopState);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);

  const handleConfettiTrigger = () => {
    console.log('Triggering confetti from main page!');
    setShowConfetti(true);
  };
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header />
      <main>
        <FadeInSection>
          <Hero onConfettiTrigger={handleConfettiTrigger} />
        </FadeInSection>
        <FadeInSection delay={200} direction="up">
          <About />
        </FadeInSection>
        <FadeInSection delay={300} direction="left">
          <Experience />
        </FadeInSection>
        <FadeInSection delay={400} direction="right">
          <Projects />
        </FadeInSection>
        <FadeInSection delay={500} direction="up">
          <Contact />
        </FadeInSection>
      </main>
      <FadeInSection delay={600} direction="up">
        <Footer />
      </FadeInSection>
      
      {/* Global Confetti Effect - covers entire screen */}
      <Confetti 
        trigger={showConfetti} 
        onComplete={() => setShowConfetti(false)} 
      />
    </div>
  );
}
