'use client';

import { useState, useRef } from 'react';
import Script from 'next/script';
import MagneticButton from './MagneticButton';

const Wave = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const tokenRef = useRef<string>('');

  // Cloudflare Turnstile callback
  (globalThis as Record<string, unknown>).onTurnstile = (t: string) => { tokenRef.current = t; };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/wave', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email,
          token: tokenRef.current 
        }),
      });

      if (response.ok) {
        setMessage('Thanks for the wave! Reese will reach out soon. 👋');
        setEmail('');
      } else {
        setMessage('Something went wrong. Please try again.');
      }
    } catch {
      setMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Turnstile script */}
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
      
      <section className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white">
              Send Reese a Wave
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Reese will reach out and say hi
            </p>
          </div>

          {/* Email Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full px-4 py-3 text-lg font-['Poppins'] border-2 border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors duration-200"
                style={{ borderColor: email ? '#0072b1' : undefined }}
              />
            </div>

            {/* Cloudflare Turnstile */}
            <div className="flex justify-center">
              <div
                className="cf-turnstile"
                data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "0x4AAAAAAB7QN7MFQd6tXzVo"}
                data-callback="onTurnstile"
                data-action="wave"
                data-theme="auto"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                type="submit"
                disabled={isSubmitting || !email}
                className="relative inline-block overflow-hidden transition-all duration-300 rounded-md"
                style={{
                  opacity: isSubmitting || !email ? 0.6 : 1,
                  cursor: isSubmitting || !email ? 'not-allowed' : 'pointer'
                }}
              >
                {/* Fill effect background */}
                <div 
                  className="absolute inset-0 transition-all duration-300 h-0"
                  style={{
                    backgroundColor: '#0072b1',
                    transition: 'height 0.3s ease-out',
                  }}
                />
                
                {/* Button content */}
                <div 
                  className="relative z-10 px-8 py-4 text-lg font-['Poppins'] border-2 transition-colors duration-300"
                  style={{
                    borderColor: '#0072b1',
                    color: '#0072b1'
                  }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Wave 👋'}
                </div>
              </button>
            </div>
          </form>

          {/* Message */}
          {message && (
            <div className={`text-lg font-['Poppins'] ${
              message.includes('Thanks') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}>
              {message}
            </div>
          )}

          {/* Back Button */}
          <div className="pt-8">
            <MagneticButton
              href="/"
              className="rounded-md"
            >
              ← Back to Portfolio
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Wave;
