import React from 'react';

const ScanLines: React.FC = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {/* Scan lines overlay */}
      <div className="absolute inset-0 bg-scan-lines opacity-[0.03]"></div>
      
      {/* Moving scan line */}
      <div className="absolute w-full h-[2px] bg-white/10 blur-[1px] animate-scan"></div>
      
      {/* CRT flicker effect */}
      <div className="absolute inset-0 bg-white opacity-[0.02] animate-flicker"></div>
    </div>
  );
};

export default ScanLines; 