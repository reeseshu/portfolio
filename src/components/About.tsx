'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveSection } from '@/store/slices/navigationSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setContent } from '@/store/slices/editSlice';
import { addSkill, updateSkill, removeSkill } from '@/store/slices/editSlice';

const About = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            dispatch(setActiveSection('about'));
          }
        });
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById('about');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [dispatch]);

  const { isEditing, content } = useSelector((state: RootState) => state.edit);

  const onChangeAbout = (value: string) => {
    dispatch(setContent({ key: 'about', value }));
  };

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              About Me
            </h2>
            
            <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
              {isEditing ? (
                <textarea
                  value={content.about}
                  onChange={(e) => onChangeAbout(e.target.value)}
                  className="w-full h-40 p-3 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
                />
              ) : (
                <p>{content.about || 'Hello! My name is Reese and I enjoy creating things that live on the internet.'}</p>
              )}
              <p>Here are a few technologies I&apos;ve been working with recently:</p>
            </div>
            
            {/* Skills List */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                {(content.skills && content.skills.length > 0
                  ? content.skills
                  : [
                      'JavaScript (ES6+)',
                      'TypeScript',
                      'React',
                      'Node.js',
                      'WordPress',
                      'Python',
                    ]
                ).map((skill, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="text-green-500 dark:text-green-400">▹</span>
                    {isEditing ? (
                      <input
                        value={skill}
                        onChange={(e) => dispatch(updateSkill({ index, value: e.target.value }))}
                        className="flex-1 min-w-0 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-md p-2 border border-gray-300 dark:border-gray-700"
                      />
                    ) : (
                      <span className="text-gray-600 dark:text-gray-400">{skill}</span>
                    )}
                    {isEditing && (
                      <button
                        onClick={() => dispatch(removeSkill(index))}
                        className="text-red-600 hover:text-red-700 text-sm"
                        aria-label="Remove skill"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {isEditing && (
                <button
                  onClick={() => dispatch(addSkill(''))}
                  className="mt-2 inline-flex items-center px-3 py-2 text-sm font-medium border border-gray-300 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Add Skill
                </button>
              )}
            </div>
          </div>
          
          {/* Image */}
          <div className="relative">
            <div className="relative w-full max-w-md mx-auto group">
              <div className="absolute inset-0 bg-green-500 dark:bg-green-400 rounded-lg transform rotate-3 group-hover:rotate-6 transition-transform duration-300"></div>
              <div className="relative bg-gray-200 dark:bg-gray-700 rounded-lg p-4 group-hover:shadow-xl transition-shadow duration-300">
                <div className="aspect-square bg-gray-300 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500 dark:text-gray-400 text-lg">Profile Image</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
