'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveSection } from '@/store/slices/navigationSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setContent } from '@/store/slices/editSlice';
import MagneticButton from './MagneticButton';

const Contact = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            dispatch(setActiveSection('contact'));
          }
        });
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById('contact');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [dispatch]);

  const { isEditing, content } = useSelector((state: RootState) => state.edit);

  const onChangeContact = (value: string) => {
    dispatch(setContent({ key: 'contact', value }));
  };

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Get In Touch
            </h2>
            <div className="w-24 h-1 mx-auto mb-8" style={{ backgroundColor: '#0072b1' }}></div>
          </div>
          
          {isEditing ? (
            <div className="max-w-2xl mx-auto">
              <textarea
                value={content.contact}
                onChange={(e) => onChangeContact(e.target.value)}
                className="w-full h-32 p-3 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
              />
            </div>
          ) : (
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {content.contact || "Although I'm not currently looking for any new opportunities, my inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!"}
            </p>
          )}
          
          <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <MagneticButton
              href="mailto:reeseshu@gmail.com"
              className="rounded-md"
            >
              Say Hello
            </MagneticButton>
            <MagneticButton
              href="/wave"
              className="rounded-md"
            >
              👋
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
