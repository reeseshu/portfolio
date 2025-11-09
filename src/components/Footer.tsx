'use client';

const Footer = () => {

  const socialLinks = [
    { name: 'Email', url: 'mailto:reeseshu@gmail.com', icon: 'email' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/reeseshu/', icon: 'linkedin' }
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'email':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
        );
      case 'linkedin':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center space-y-6">
          {/* Social Links */}
          <div className="flex space-x-6">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 transition-colors duration-200"
                onMouseEnter={(e) => e.currentTarget.style.color = '#0072b1'}
                onMouseLeave={(e) => e.currentTarget.style.color = ''}
                aria-label={link.name}
              >
                {getIcon(link.icon)}
              </a>
            ))}
          </div>
          
          {/* Copyright */}
          <div className="text-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Built by Reese Shu • Designed by Reese Shu
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              © 2024 Reese Shu. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
