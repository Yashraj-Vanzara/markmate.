import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ParticleBackground from './ParticleBackground';
import GlitchText from './GlitchText';
import GlowingButton from './GlowingButton';
import ScanLines from './ScanLines';

const LandingPage: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!contentRef.current) return;
    
    gsap.fromTo(
      '.hero-content',
      { 
        opacity: 0, 
        y: 30 
      },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1,
        ease: 'power3.out' 
      }
    );
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#1a1f2e]">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <ParticleBackground />
      <ScanLines />
      
      {/* Content */}
      <div ref={contentRef} className="relative z-10 container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center hero-content">
          <div className="mb-6 space-y-2">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-[#4e7fff] via-[#6f94ff] to-[#896dff] text-transparent bg-clip-text">
              AI-Powered
            </h1>
            <h1 className="text-5xl md:text-7xl font-bold text-[#ffd700]">
              Answer Sheet Marking
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl backdrop-blur-sm bg-black/10 p-6 rounded-lg">
            Transform your assessment process with our intelligent digital marking system. 
            Fast, accurate, and completely automated.
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
            <GlowingButton 
              variant="primary"
              className="min-w-[200px] text-lg bg-gradient-to-r from-[#4e7fff] to-[#896dff]"
            >
              Get Started
            </GlowingButton>
            <GlowingButton 
              variant="secondary"
              className="min-w-[200px] text-lg border-[#4e7fff]/30"
            >
              Learn More
            </GlowingButton>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="group backdrop-blur-md bg-black/10 rounded-xl p-8 border border-[#4e7fff]/20 hover:border-[#4e7fff]/50 transition-all duration-300"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="w-16 h-16 mb-6 text-[#4e7fff]">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-white group-hover:text-[#4e7fff] transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const features = [
  {
    title: 'Lightning Fast',
    description: 'Process thousands of answer sheets in seconds with our advanced AI algorithms.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: '99.9% Accurate',
    description: 'Our AI system ensures near-perfect accuracy in grading and assessment.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Customizable',
    description: 'Adapt the system to your specific assessment needs and grading criteria.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
];

export default LandingPage; 