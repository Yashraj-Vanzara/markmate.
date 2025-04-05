import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface GlitchTextProps {
  text: string;
  className?: string;
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const textElements = container.querySelectorAll('.glitch-text');

    const glitchTimeline = gsap.timeline({
      repeat: -1,
      repeatDelay: 3,
    });

    textElements.forEach((element, index) => {
      if (index === 0) return; // Skip the main text

      glitchTimeline
        .to(element, {
          opacity: 1,
          duration: 0.1,
          skewX: () => gsap.utils.random(-20, 20),
          xPercent: () => gsap.utils.random(-5, 5),
          yPercent: () => gsap.utils.random(-2, 2),
        })
        .to(element, {
          opacity: 0,
          duration: 0.1,
        });
    });

    return () => {
      glitchTimeline.kill();
    };
  }, [text]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Main text */}
      <div className="glitch-text relative z-10">
        {text}
      </div>
      {/* Glitch layers */}
      <div className="glitch-text absolute inset-0 text-cyan-400 opacity-0 mix-blend-screen">
        {text}
      </div>
      <div className="glitch-text absolute inset-0 text-purple-500 opacity-0 mix-blend-screen">
        {text}
      </div>
    </div>
  );
};

export default GlitchText;
