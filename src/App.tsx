/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import PortfolioShowcase from './components/PortfolioShowcase';
import ContactDesk from './components/ContactDesk';
import Footer from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  // Multi-section Intersection Observer for automatic active nav indication
  useEffect(() => {
    const sections = ['home', 'about', 'services', 'portfolio', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px', // focused center threshold
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="mesh-bg min-h-screen text-gray-100 flex flex-col relative selection:bg-[#a582f3]/30 selection:text-white">
      {/* Absolute visual subtle ambient particles glowing on screens corner */}
      <div className="fixed top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#a582f3]/40 via-[#7b61ff]/40 to-[#a582f3]/40 z-50 pointer-events-none" />

      {/* Embedded application parts */}
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main className="flex-1">
        <Hero />
        <About />
        <Services />
        <PortfolioShowcase />
        <ContactDesk />
      </main>

      <Footer />
    </div>
  );
}

