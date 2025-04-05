import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: 'blue' | 'purple' | 'pink';
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon, 
  title, 
  description, 
  color,
  delay = 0
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!cardRef.current) return;
    
    gsap.fromTo(
      cardRef.current,
      { 
        opacity: 0, 
        y: 50 
      },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        delay: delay,
        ease: 'power3.out' 
      }
    );
  }, [delay]);
  
  const colorClasses = {
    blue: 'hover:border-blue-500/50 bg-blue-500/20 text-blue-400',
    purple: 'hover:border-purple-500/50 bg-purple-500/20 text-purple-400',
    pink: 'hover:border-pink-500/50 bg-pink-500/20 text-pink-400'
  };
  
  return (
    <div 
      ref={cardRef}
      className={`backdrop-blur-md bg-white/5 rounded-xl p-6 border border-gray-700 transition-all duration-300 ${colorClasses[color]}`}
    >
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${colorClasses[color]}`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

export default FeatureCard; 