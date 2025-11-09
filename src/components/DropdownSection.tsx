'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setContent, SectionKey } from '@/store/slices/editSlice';
import { useDispatch } from 'react-redux';

interface DropdownSectionProps {
  title: string;
  contentKey: SectionKey;
  defaultContent: string;
  isEditing: boolean;
}

const DropdownSection = ({ title, contentKey, defaultContent, isEditing }: DropdownSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { content } = useSelector((state: RootState) => state.edit);

  const currentContent = (content[contentKey as keyof typeof content] as string) || defaultContent;

  const handleContentChange = (value: string) => {
    dispatch(setContent({ key: contentKey, value }));
  };

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 text-left bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center justify-between"
      >
        <span className="font-medium italic text-sm text-gray-900 dark:text-white">{title}</span>
        <svg
          className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="px-4 py-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          {isEditing ? (
            <textarea
              value={currentContent}
              onChange={(e) => handleContentChange(e.target.value)}
              className="w-full h-24 p-2 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-300 resize-none"
              placeholder={`Enter your ${title.toLowerCase()}...`}
            />
          ) : (
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-wrap">
              {currentContent}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default DropdownSection;
