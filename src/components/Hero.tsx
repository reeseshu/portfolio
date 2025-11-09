'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setActiveSection } from '@/store/slices/navigationSlice';
import { setContent } from '@/store/slices/editSlice';
import type { RootState } from '@/store/store';
import MagneticButton from './MagneticButton';
import TypewriterText from './RotatingText';

interface HeroProps {
  onConfettiTrigger?: () => void;
}

const Hero = ({ onConfettiTrigger }: HeroProps) => {
  const dispatch = useDispatch();
  const { isEditing, content } = useSelector((state: RootState) => state.edit);

  useEffect(() => {
    dispatch(setActiveSection('home'));
  }, [dispatch]);

  const handleButtonClick = () => {
    console.log('Button clicked, triggering confetti!');
    onConfettiTrigger?.();
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-6">
          {/* Greeting */}
          {isEditing ? (
            <input
              value={content.heroGreeting || 'Hi, my name is'}
              onChange={(e) => dispatch(setContent({ key: 'heroGreeting', value: e.target.value }))}
              className="w-full max-w-xs mx-auto text-center bg-gray-100 dark:bg-gray-800 text-lg font-['Poppins'] rounded-md p-2 border border-gray-300 dark:border-gray-700"
              style={{ color: '#2c94d0' }}
            />
          ) : (
            <p className="text-lg font-['Poppins']" style={{ color: '#2c94d0' }}>
              {content.heroGreeting || 'Hi, my name is'}
            </p>
          )}
          
          {/* Name */}
          {isEditing ? (
            <input
              value={content.heroName || 'Reese Shu.'}
              onChange={(e) => dispatch(setContent({ key: 'heroName', value: e.target.value }))}
              className="w-full max-w-2xl mx-auto text-center bg-gray-100 dark:bg-gray-800 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white rounded-md p-2 border border-gray-300 dark:border-gray-700"
            />
          ) : (
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white">
              {content.heroName || 'Reese Shu.'}
            </h1>
          )}
          
          {/* Subtitle with Typewriter Effect */}
          {isEditing ? (
            <input
              value={content.heroSubtitle || 'I build things for the web.'}
              onChange={(e) => dispatch(setContent({ key: 'heroSubtitle', value: e.target.value }))}
              className="w-full max-w-3xl mx-auto text-center bg-gray-100 dark:bg-gray-800 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-600 dark:text-gray-300 rounded-md p-2 border border-gray-300 dark:border-gray-700"
            />
          ) : (
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-600 dark:text-gray-300">
              <TypewriterText
                fixedText="I'm a "
                rotatingTexts={[
                  'Maniacal Builder',
                  'Excel Architect',
                  'PowerPoint Strategist',
                  'Financial Modeler',
                  'Process Automator',
                  'Workflow Automator',
                  '"Why" Asker',
                  'CRM Operator'
                ]}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-600 dark:text-gray-300"
                typingSpeed={80}
                deletingSpeed={40}
                pauseTime={1500}
              />
            </h2>
          )}
          
          {/* Description */}
          {isEditing ? (
            <textarea
              value={content.heroDescription || "I\'m a Business Intelligence Analyst specializing in building (and occasionally designing) exceptional digital experiences. Currently, I\'m focused on building accessible, human-centered products at Upstatement."}
              onChange={(e) => dispatch(setContent({ key: 'heroDescription', value: e.target.value }))}
              className="w-full max-w-2xl mx-auto h-40 p-3 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-lg text-gray-600 dark:text-gray-400 leading-relaxed"
            />
          ) : (
            <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              {content.heroDescription ||
                "I\'m a Business Intelligence Analyst specializing in building (and occasionally designing) exceptional digital experiences. Currently, I\'m focused on building accessible, human-centered products at Upstatement."}
            </p>
          )}
          
          {/* CTA Button */}
          <div className="pt-8">
            <MagneticButton
              href="#work"
              className="rounded-md"
              onClick={handleButtonClick}
            >
              Check out my work!
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
