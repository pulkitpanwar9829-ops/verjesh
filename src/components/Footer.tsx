import React, { useEffect, useState } from 'react';
import { ArrowUp, Terminal, Heart } from 'lucide-react';

export default function Footer() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const navScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elRect = el.getBoundingClientRect().top;
      const elPos = elRect - bodyRect;
      const offsetPos = elPos - offset;

      window.scrollTo({
        top: offsetPos,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-transparent border-t border-white/10 py-12 relative overflow-hidden text-white select-none">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left relative z-10">
        
        {/* Brand block */}
        <div className="space-y-2">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <div className="w-6 h-6 rounded bg-white/5 border border-white/10 flex items-center justify-center">
              <Terminal className="w-3.5 h-3.5 text-[#a582f3]" />
            </div>
            <span className="font-display font-bold text-xl tracking-wide text-white">
              Navod<span className="text-[#a582f3]">.</span>
            </span>
          </div>
          <p className="text-[11px] text-gray-500 font-sans max-w-xs">
            A premium portfolio showcase designed for modern web environments. Built on reactivity and clean styles.
          </p>
        </div>

        {/* Quick scroll links */}
        <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-400 font-sans">
          {['home', 'about', 'services', 'portfolio', 'contact'].map((section) => (
            <button
              key={section}
              onClick={() => navScroll(section)}
              className="hover:text-[#a582f3] transition-colors capitalize cursor-pointer focus:outline-none"
            >
              {section}
            </button>
          ))}
        </div>

        {/* Copyrights */}
        <div className="text-center md:text-right space-y-1 font-sans">
          <div className="text-[11px] text-gray-400">
            &copy; {new Date().getFullYear()} Navod Caldera. All rights reserved.
          </div>
          <div className="text-[9px] text-gray-600 font-mono flex items-center justify-center md:justify-end gap-1">
            <span>Built with React</span>
            <Heart className="w-3 h-3 text-red-500 fill-current animate-pulse" />
            <span>& Tailwind Engine</span>
          </div>
        </div>
      </div>

      {/* Floating scroll-to-top circle trigger button */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-[#080710]/40 backdrop-blur-md border border-white/20 hover:border-[#a582f3]/40 text-[#a582f3] hover:text-white rounded-full z-40 shadow-[0_4px_12px_rgba(255,255,255,0.05)] hover:shadow-[0_4px_24px_rgba(165,130,243,0.15)] transition-all cursor-pointer focus:outline-none"
          title="Back to Top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </footer>
  );
}
