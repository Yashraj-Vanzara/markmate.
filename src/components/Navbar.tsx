import React from 'react';

const Navbar = () => {
  return (
    <nav className="mx-auto mt-4 flex max-w-5xl items-center justify-between rounded-full bg-black/20 px-6 py-4 backdrop-blur-md">
      {/* Logo */}
      <div className="text-xl font-semibold tracking-wider text-white">
        Mark<span className="bg-gradient-to-r from-[#00fff7] to-[#ff00c8] bg-clip-text text-transparent">Mate</span>
      </div>

      {/* Navigation Links */}
      <div>
        <button className="rounded-full border border-white/20 px-6 py-2 text-sm text-white transition-all hover:border-[#00fff7]/50 hover:text-[#00fff7] hover:shadow-[0_0_15px_rgba(0,255,247,0.3)]">
          About
        </button>
      </div>
    </nav>
  );
};

export default Navbar; 