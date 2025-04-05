import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface TypewriterTextProps {
  text: string;
  className?: string;
  delay?: number;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ 
  text, 
  className = '', 
  delay = 0 
}) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const chars = text.split('');
    textRef.current.innerHTML = '';
    
    chars.forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.opacity = '0';
      textRef.current?.appendChild(span);
      
      gsap.to(span, {
        opacity: 1,
        duration: 0.05,
        delay: delay + index * 0.05,
        ease: 'none',
      });
    });
  }, [text, delay]);

  return (
    <div 
      ref={textRef} 
      className={`inline-block overflow-hidden whitespace-nowrap ${className}`}
    />
  );
};

export default TypewriterText; 