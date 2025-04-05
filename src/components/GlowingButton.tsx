import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface GlowingButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
}

const GlowingButton: React.FC<GlowingButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary',
  className = ''
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!buttonRef.current || !glowRef.current) return;
    
    const button = buttonRef.current;
    const glow = glowRef.current;
    
    const handleMouseEnter = () => {
      gsap.to(button, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out'
      });
      
      gsap.to(glow, {
        opacity: 1,
        scale: 1.2,
        duration: 0.4,
        ease: 'power2.out'
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
      
      gsap.to(glow, {
        opacity: 0,
        scale: 1,
        duration: 0.4,
        ease: 'power2.out'
      });
    };
    
    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  const baseClasses = "relative px-8 py-3 rounded-lg font-medium transition-all duration-300 overflow-hidden";
  
  const variantClasses = variant === 'primary' 
    ? "bg-gradient-to-r from-[#4e7fff] to-[#896dff] text-white border border-[#4e7fff]/50" 
    : "bg-transparent border border-[#4e7fff]/20 text-white hover:border-[#4e7fff]/50";
  
  return (
    <div className="relative">
      {/* Glow effect */}
      <div
        ref={glowRef}
        className={`absolute inset-0 opacity-0 ${
          variant === 'primary' 
            ? 'bg-[#4e7fff]/20' 
            : 'bg-[#896dff]/20'
        } blur-xl rounded-full`}
      />
      
      <button
        ref={buttonRef}
        onClick={onClick}
        className={`${baseClasses} ${variantClasses} ${className}`}
      >
        {/* Hover line effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute inset-0 ${
            variant === 'primary'
              ? 'bg-gradient-to-r from-[#4e7fff] to-[#896dff]'
              : 'bg-gradient-to-r from-[#896dff] to-[#4e7fff]'
          } translate-y-full group-hover:translate-y-0 transition-transform duration-300`} 
          style={{ opacity: 0.1 }}
        />
        </div>
        
        {/* Button content */}
        <span className="relative z-10">{children}</span>
      </button>
    </div>
  );
};

export default GlowingButton; 