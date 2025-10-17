'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveSection } from '@/store/slices/navigationSlice';
import { RootState } from '@/store/store';
import { addWorkProject, updateWorkProject, removeWorkProject } from '@/store/slices/editSlice';

const Work = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            dispatch(setActiveSection('work'));
          }
        });
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById('work');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [dispatch]);

  const { isEditing, content } = useSelector((state: RootState) => state.edit);

  const projects = content.workProjects && content.workProjects.length > 0
    ? content.workProjects
    : [
        {
          title: 'Halcyon Theme',
          description: content.work || 'A minimal, dark blog theme for Ghost. Built with vanilla JavaScript, HTML, and CSS.',
          image: '/api/placeholder/600/400',
          technologies: ['JavaScript', 'HTML', 'CSS'],
          github: 'https://github.com/rshu7/halcyon-theme',
          live: 'https://halcyon-theme.netlify.com/',
          featured: true,
        },
      ];

  const onAddProject = () => {
    dispatch(addWorkProject({
      title: 'New Project',
      description: 'Project description',
      image: '/api/placeholder/600/400',
      technologies: ['TypeScript'],
      featured: false,
    }));
  };

  const onUpdateProjectField = (index: number, field: 'title' | 'description' | 'github' | 'live', value: string) => {
    dispatch(updateWorkProject({ index, project: { [field]: value } }));
  };

  const onUpdateTech = (index: number, value: string) => {
    const techs = value.split(',').map((t) => t.trim()).filter(Boolean);
    dispatch(updateWorkProject({ index, project: { technologies: techs } }));
  };

  const onRemoveProject = (index: number) => {
    dispatch(removeWorkProject(index));
  };

  return (
    <section id="work" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Some Things I&apos;ve Built
          </h2>
          <div className="w-24 h-1 bg-green-500 dark:bg-green-400 mx-auto"></div>
        </div>

        <div className="space-y-24">
          {projects.map((project, index) => (
            <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
              {/* Project Image */}
              <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="relative group">
                  <div className="absolute inset-0 bg-green-500 dark:bg-green-400 rounded-lg transform rotate-3 group-hover:rotate-6 transition-transform duration-300"></div>
                  <div className="relative bg-gray-200 dark:bg-gray-700 rounded-lg p-4 group-hover:shadow-xl transition-shadow duration-300">
                    <div className="aspect-video bg-gray-300 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500 dark:text-gray-400">Project Screenshot</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className={`space-y-4 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                <div className="text-sm font-mono text-green-500 dark:text-green-400">
                  Featured Project
                </div>
                
                {isEditing ? (
                  <input
                    value={project.title}
                    onChange={(e) => onUpdateProjectField(index, 'title', e.target.value)}
                    className="w-full p-2 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-2xl font-bold text-gray-900 dark:text-white"
                  />
                ) : (
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{project.title}</h3>
                )}
                
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                  {isEditing ? (
                    <textarea
                      value={project.description}
                      onChange={(e) => onUpdateProjectField(index, 'description', e.target.value)}
                      className="w-full h-32 p-3 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
                    />
                  ) : (
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {project.description}
                    </p>
                  )}
                </div>
                
                {isEditing ? (
                  <input
                    value={project.technologies.join(', ')}
                    onChange={(e) => onUpdateTech(index, e.target.value)}
                    className="w-full p-2 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
                  />
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                
                {isEditing ? (
                  <div className="flex flex-col gap-2">
                    <input
                      placeholder="GitHub URL"
                      value={project.github || ''}
                      onChange={(e) => onUpdateProjectField(index, 'github', e.target.value)}
                      className="w-full p-2 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
                    />
                    <input
                      placeholder="Live URL"
                      value={project.live || ''}
                      onChange={(e) => onUpdateProjectField(index, 'live', e.target.value)}
                      className="w-full p-2 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
                    />
                    <button onClick={() => onRemoveProject(index)} className="self-start text-red-600 hover:underline">Remove</button>
                  </div>
                ) : (
                  <div className="flex space-x-4">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors duration-200"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors duration-200"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isEditing && (
            <div>
              <button onClick={onAddProject} className="px-4 py-2 rounded-md bg-green-500 text-white">Add Project</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Work;
