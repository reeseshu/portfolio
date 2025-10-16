'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveSection } from '@/store/slices/navigationSlice';
import { RootState } from '@/store/store';
import { setContent, addExperienceJob, updateExperienceJob, removeExperienceJob } from '@/store/slices/editSlice';

const Experience = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            dispatch(setActiveSection('experience'));
          }
        });
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById('experience');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [dispatch]);

  const { isEditing, content } = useSelector((state: RootState) => state.edit);

  const experiences = (content as any).experienceJobs && (content as any).experienceJobs.length > 0
    ? (content as any).experienceJobs
    : [
        {
          title: 'Lead Engineer',
          company: 'Upstatement',
          period: '2021 - Present',
          description: content.experience || 'Lead a team of engineers in building scalable web applications...',
          technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL']
        }
      ];

  const onChangeExp = (value: string) => {
    dispatch(setContent({ key: 'experience', value }));
  };

  const onAddJob = () => {
    dispatch(addExperienceJob({
      title: 'New Role',
      company: 'Company',
      period: 'Year - Year',
      description: 'Describe your responsibilities and impact.',
      technologies: ['TypeScript'],
    }));
  };

  const onUpdateJobField = (index: number, field: 'title' | 'company' | 'period' | 'description', value: string) => {
    dispatch(updateExperienceJob({ index, job: { [field]: value } } as any));
  };

  const onUpdateJobTech = (index: number, value: string) => {
    const techs = value.split(',').map((t) => t.trim()).filter(Boolean);
    dispatch(updateExperienceJob({ index, job: { technologies: techs } }));
  };

  const onRemoveJob = (index: number) => {
    dispatch(removeExperienceJob(index));
  };

  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Where I&apos;ve Worked
          </h2>
          <div className="w-24 h-1 bg-green-500 dark:bg-green-400 mx-auto"></div>
        </div>

        <div className="space-y-12">
          {experiences.map((exp: any, index: number) => (
            <div key={index} className="bg-white dark:bg-gray-900 rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  {isEditing ? (
                    <>
                      <input
                        value={exp.title}
                        onChange={(e) => onUpdateJobField(index, 'title', e.target.value)}
                        className="w-full p-2 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-xl font-semibold text-gray-900 dark:text-white"
                      />
                      <input
                        value={exp.company}
                        onChange={(e) => onUpdateJobField(index, 'company', e.target.value)}
                        className="mt-2 w-full p-2 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-green-600 dark:text-green-400 font-medium"
                      />
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{exp.title}</h3>
                      <p className="text-green-500 dark:text-green-400 font-medium">{exp.company}</p>
                    </>
                  )}
                </div>
                {isEditing ? (
                  <input
                    value={exp.period}
                    onChange={(e) => onUpdateJobField(index, 'period', e.target.value)}
                    className="text-gray-700 dark:text-gray-300 text-sm font-mono mt-2 md:mt-0 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-2 rounded-md"
                  />
                ) : (
                  <span className="text-gray-500 dark:text-gray-400 text-sm font-mono mt-2 md:mt-0">{exp.period}</span>
                )}
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                {isEditing ? (
                  <textarea
                    value={exp.description}
                    onChange={(e) => onUpdateJobField(index, 'description', e.target.value)}
                    className="w-full h-32 p-3 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
                  />
                ) : (
                  <p className="text-gray-600 dark:text-gray-400 mb-0 leading-relaxed">{exp.description}</p>
                )}
              </div>
              {isEditing ? (
                <input
                  value={exp.technologies.join(', ')}
                  onChange={(e) => onUpdateJobTech(index, e.target.value)}
                  className="mt-4 w-full p-2 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
                />
              ) : (
                <div className="flex flex-wrap gap-2 mt-6">
                  {exp.technologies.map((tech: string) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
              {isEditing && (
                <button onClick={() => onRemoveJob(index)} className="mt-4 text-red-600 hover:underline">Remove</button>
              )}
            </div>
          ))}
          {isEditing && (
            <div>
              <button onClick={onAddJob} className="px-4 py-2 rounded-md bg-green-500 text-white">Add Job</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Experience;
