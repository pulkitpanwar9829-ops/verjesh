import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Header({ activeSection, setActiveSection }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Services', id: 'services' },
    { name: 'Portfolio', id: 'portfolio' },
    { name: 'Contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      id="header-nav"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/[0.03] backdrop-blur-lg border-b border-white/10 py-4 shadow-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => scrollToSection('home')}
          className="flex items-center gap-2 group cursor-pointer focus:outline-none"
        >
          <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/15 flex items-center justify-center group-hover:border-[#a582f3]/50 group-hover:bg-[#a582f3]/10 transition-colors duration-300">
            <Terminal className="w-4 h-4 text-[#a582f3] group-hover:scale-110 transition-transform duration-300 text-glow-blue" />
          </div>
          <span className="font-display font-bold text-2xl tracking-normal text-white group-hover:text-[#a582f3] transition-colors duration-300">
            Navod<span className="text-[#a582f3]">.</span>
          </span>
        </button>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`font-sans font-medium text-sm tracking-wide transition-all duration-300 cursor-pointer focus:outline-none relative py-1 ${
                activeSection === item.id
                  ? 'text-[#a582f3] scale-105 text-glow-blue'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {item.name}
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#a582f3] rounded-full shadow-[0_0_10px_#a582f3]" />
              )}
            </button>
          ))}
          <button
            onClick={() => scrollToSection('contact')}
            className="px-5 py-2 text-xs font-semibold font-sans tracking-wider uppercase text-white bg-white/10 hover:bg-white/20 rounded-full border border-white/20 shadow-[0_4px_15px_rgba(255,255,255,0.05)] hover:shadow-[0_4px_25px_rgba(255,255,255,0.15)] transition-all duration-300 cursor-pointer focus:outline-none backdrop-blur-md"
          >
            Hire Me
          </button>
        </nav>

        {/* Mobile Navigation Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-gray-300 hover:text-[#a582f3] hover:bg-white/10 rounded-lg transition-colors cursor-pointer focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#080710]/95 backdrop-blur-xl border-b border-white/10 py-6 px-6 shadow-2xl flex flex-col gap-4 animate-fadeIn">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`text-left py-2 px-4 rounded-lg font-sans font-medium transition-all duration-300 text-base cursor-pointer focus:outline-none ${
                activeSection === item.id
                  ? 'bg-[#a582f3]/10 text-[#a582f3] border-l-4 border-[#a582f3] text-glow-blue'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              {item.name}
            </button>
          ))}
          <button
            onClick={() => scrollToSection('contact')}
            className="w-full text-center py-3 text-sm font-semibold font-sans tracking-wider uppercase text-white bg-white/10 hover:bg-white/25 rounded-lg border border-white/20 shadow-[0_4px_12px_rgba(255,255,255,0.05)] transition-all duration-300 cursor-pointer mt-2 backdrop-blur-md"
          >
            Hire Me
          </button>
        </div>
      )}
    </header>
  );
}
