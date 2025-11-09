'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveSection } from '@/store/slices/navigationSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setContent } from '@/store/slices/editSlice';
import { addSkill, updateSkill, removeSkill } from '@/store/slices/editSlice';
import DropdownSection from './DropdownSection';

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
    <section id="about" className="py-20 bg-gray-100 dark:bg-gray-900">
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
                    <span style={{ color: '#0072b1' }}>▹</span>
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

            {/* Dropdown Sections */}
            <div className="space-y-4 mt-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Learn More About Me
              </h3>
              
              <div className="space-y-2">
                <DropdownSection
                  title="How I Started"
                  contentKey="howIStarted"
                  defaultContent="I began my journey in business intelligence and data analysis during my undergraduate studies, where I discovered my passion for turning raw data into actionable insights. My first real project was building automated reports for a local startup, which opened my eyes to the power of process automation and data-driven decision making."
                  isEditing={isEditing}
                />
                
                <DropdownSection
                  title="My Goals"
                  contentKey="myGoals"
                  defaultContent="My primary goal is to become a leading expert in business intelligence and process automation, helping organizations make better decisions through data. I want to build innovative solutions that bridge the gap between complex data and business strategy, ultimately creating more efficient and profitable operations."
                  isEditing={isEditing}
                />
                
                <DropdownSection
                  title="My Motivations"
                  contentKey="myMotivations"
                  defaultContent="I'm driven by the challenge of solving complex business problems and the satisfaction of seeing data transform into actionable insights. The idea that my work can help companies make better decisions and improve their bottom line is incredibly motivating. I love the process of turning 'why' questions into 'how' solutions."
                  isEditing={isEditing}
                />
                
                <DropdownSection
                  title="Where I See Myself"
                  contentKey="futureVision"
                  defaultContent="In 3,466 days (about 9.5 years), I envision myself as a senior business intelligence leader, having built and scaled data-driven solutions for multiple organizations. I hope to have founded or co-founded a company that specializes in business process automation, and to be mentoring the next generation of data professionals."
                  isEditing={isEditing}
                />
              </div>
            </div>
          </div>
          
          {/* Image */}
          <div className="relative">
            <div className="relative w-full max-w-md mx-auto group">
              <div className="absolute inset-0 rounded-lg transform rotate-3 group-hover:rotate-6 transition-transform duration-300" style={{ backgroundColor: '#0072b1' }}></div>
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
