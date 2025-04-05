import React, { useState } from "react";
import Navbar from "./components/Navbar";
import TryIt from "./components/TryIt";

const App: React.FC = () => {
  const [showTryIt, setShowTryIt] = useState(false);

  return (
    <div className="relative min-h-screen bg-black">
      <Navbar />
      {!showTryIt ? (
        <main className="container mx-auto px-4 pt-20">
          <div className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center">
            <h1
              className="text-5xl md:text-7xl opacity-0 animate-fade-in-up text-center mb-8"
              data-text="AI Marking System"
            >
              AI Marking System
            </h1>
            <h2
              className="text-lg md:text-2xl opacity-0 animate-fade-in-up-delay text-center max-w-4xl mx-auto text-white/80 mb-12"
              data-text="Revolutionizing Answer Sheet Evaluation with AI-Powered Precision"
            >
              Revolutionizing Answer Sheet Evaluation with AI-Powered Precision
            </h2>
            
            {/* Try Now Button */}
            <button
              onClick={() => setShowTryIt(true)}
              className="group relative overflow-hidden rounded-full bg-black px-8 py-3 opacity-0 animate-fade-in-up-delay"
            >
              {/* Animated Border */}
              <div className="absolute inset-0 animate-spin-slow">
                <div className="absolute inset-0 bg-gradient-to-r from-[#00fff7] via-[#ff00c8] to-[#00fff7] blur opacity-50" />
              </div>
              
              {/* Button Background */}
              <div className="absolute inset-[2px] rounded-full bg-black" />
              
              {/* Button Content */}
              <span className="relative font-semibold text-white group-hover:text-[#00fff7] transition-colors duration-200">
                Try Now
              </span>
            </button>
          </div>
        </main>
      ) : (
        <TryIt />
      )}
    </div>
  );
};

export default App;
