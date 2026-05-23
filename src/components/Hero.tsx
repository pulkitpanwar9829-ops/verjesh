import React, { useState, useEffect } from 'react';
import { Facebook, Twitter, Linkedin, ArrowRight, Github } from 'lucide-react';

export default function Hero() {
  const [typedSub, setTypedSub] = useState('Frontend Developer');
  const [activeWordIdx, setActiveWordIdx] = useState(0);
  const words = ['Frontend Developer', 'TypeScript Specialist', 'UI/UX Animator', 'Bespoke React Craft'];

  useEffect(() => {
    const termInterval = setInterval(() => {
      setActiveWordIdx((prev) => {
        const next = (prev + 1) % words.length;
        setTypedSub(words[next]);
        return next;
      }, 3000);
    }, 3000);

    return () => clearInterval(termInterval);
  }, []);

  const handleNavScroll = (targetId: string, prefillSubject?: string) => {
    const el = document.getElementById(targetId);
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

      if (prefillSubject) {
        const subjectField = document.getElementById('contact-subject') as HTMLInputElement;
        if (subjectField) {
          subjectField.value = prefillSubject;
        }
      }
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen relative flex items-center bg-transparent pt-28 pb-16 overflow-hidden select-none"
    >
      {/* Dynamic ambient particles background visual effect */}
      <div className="absolute inset-0 bg-radial-at-t from-[#a582f3]/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] bg-[#a582f3]/5 rounded-full blur-[100px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[10%] right-[-10%] w-[450px] h-[450px] bg-[#7b61ff]/4 rounded-full blur-[120px] pointer-events-none animate-pulse" />

      {/* Grid Pattern Mesh */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left column details (7 cols on large, full on smaller) */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6 text-left sm:max-w-xl lg:max-w-none">
          <div className="space-y-4">
            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white tracking-normal leading-tight">
              Hi, I'm <span className="text-white hover:text-[#a582f3] transition-colors duration-300">Navod Caldera</span>
            </h1>

            {/* Glowing Subtitle Typewriter effect */}
            <div className="h-10 sm:h-12 flex items-center">
              <span className="font-display font-bold text-2xl sm:text-3xl text-[#a582f3] text-glow-blue tracking-tight animate-pulse transition-all duration-500">
                {typedSub}
              </span>
            </div>

            {/* Exact introductory paragraphs from screenshot */}
            <p className="text-gray-300 font-sans text-sm sm:text-base leading-relaxed max-w-xl">
              Welcome to my personal website! I'm Navod, a passionate and dedicated front-end developer with a keen eye for design and a strong drive for creating stunning and intuitive user experiences. With a solid foundation in HTML, CSS, and JavaScript, I specialize in turning ideas into captivating websites that leave a lasting impression.
            </p>
          </div>

          {/* Action CTAs matches screenshot */}
          <div className="flex flex-wrap items-center gap-4 mt-2">
            <button
              onClick={() => handleNavScroll('contact', 'Employment Partnership')}
              className="px-8 py-3 text-sm font-semibold tracking-wider font-sans uppercase rounded-full text-white bg-white/10 hover:bg-white/20 border border-white/20 shadow-[0_4px_15px_rgba(255,255,255,0.05)] hover:shadow-[0_4px_25px_rgba(255,255,255,0.15)] transition-all cursor-pointer focus:outline-none backdrop-blur-md"
            >
              Hire Me
            </button>

            <button
              onClick={() => handleNavScroll('contact', 'General Request Proposal')}
              className="px-8 py-3 text-sm font-semibold tracking-wider font-sans uppercase rounded-full text-[#a582f3] hover:text-white bg-white/[0.02] border border-[#a582f3]/40 hover:border-[#a582f3] transition-all cursor-pointer focus:outline-none hover:shadow-[0_4px_15px_rgba(165,130,243,0.1)] backdrop-blur-sm"
            >
              Let's Talk
            </button>
          </div>

          {/* Connected Social bars in bottom corner */}
          <div className="flex items-center gap-4.5 pt-8">
            <a
              href="#"
              className="w-10 h-10 rounded-full border border-white/10 hover:border-[#a582f3]/60 hover:bg-[#a582f3]/10 flex items-center justify-center text-gray-300 hover:text-white transition-all cursor-pointer shadow-[0_4px_10px_rgba(255,255,255,0.02)] hover:shadow-[0_4px_12px_rgba(165,130,243,0.2)] animate-fadeIn duration-200"
              title="Navod on Facebook"
            >
              <Facebook className="w-4 h-4 text-[#a582f3]" />
            </a>

            <a
              href="#"
              className="w-10 h-10 rounded-full border border-white/10 hover:border-[#a582f3]/60 hover:bg-[#a582f3]/10 flex items-center justify-center text-gray-300 hover:text-white transition-all cursor-pointer shadow-[0_4px_10px_rgba(255,255,255,0.02)] hover:shadow-[0_4px_12px_rgba(165,130,243,0.2)] animate-fadeIn duration-300"
              title="Navod on Twitter/X"
            >
              <Twitter className="w-4 h-4 text-[#a582f3]" />
            </a>

            <a
              href="#"
              className="w-10 h-10 rounded-full border border-white/10 hover:border-[#a582f3]/60 hover:bg-[#a582f3]/10 flex items-center justify-center text-gray-300 hover:text-white transition-all cursor-pointer shadow-[0_4px_10px_rgba(255,255,255,0.02)] hover:shadow-[0_4px_12px_rgba(165,130,243,0.2)] animate-fadeIn duration-400"
              title="Navod on LinkedIn"
            >
              <Linkedin className="w-4 h-4 text-[#a582f3]" />
            </a>

            <a
              href="#"
              className="w-10 h-10 rounded-full border border-white/10 hover:border-[#a582f3]/60 hover:bg-[#a582f3]/10 flex items-center justify-center text-gray-300 hover:text-white transition-all cursor-pointer shadow-[0_4px_10px_rgba(255,255,255,0.02)] hover:shadow-[0_4px_12px_rgba(165,130,243,0.2)] animate-fadeIn duration-500"
              title="Navod on GitHub"
            >
              <Github className="w-4 h-4 text-[#a582f3]" />
            </a>
          </div>
        </div>

        {/* Right column vector frame (5 cols on large, hidden on mob if small or sized beautifully) */}
        <div className="lg:col-span-5 flex items-center justify-center relative select-none">
          {/* Back glows */}
          <div className="absolute inset-0 bg-radial-at-c from-[#a582f3]/10 to-transparent blur-2xl pointer-events-none animate-pulse" />

          {/* Glowing line frame enclosure */}
          <div className="w-[320px] sm:w-[380px] lg:w-full max-w-[460px] aspect-square rounded-2xl border border-dashed border-white/15 p-4 bg-white/[0.03] backdrop-blur-md shadow-2xl shadow-black/45 relative overflow-hidden animate-float">
            {/* Inner dynamic floating target bars */}
            <div className="absolute top-2 left-2 text-[9px] font-mono text-[#a582f3]/60 uppercase tracking-widest">
              SYSTEM_RENDERER::LAUNCHER
            </div>
            <div className="absolute bottom-2 right-2 text-[8px] font-mono text-[#7b61ff]/50 uppercase tracking-wider">
              NAVOD_CORE:VITE v6
            </div>

            {/* Generated high fidelity lion illustration */}
            <img
              src="/src/assets/images/neon_lion_hero_1779510575458.png"
              alt="Navod Neon Glowing Lion"
              className="w-full h-full object-cover rounded-xl border border-white/10 pointer-events-none"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
