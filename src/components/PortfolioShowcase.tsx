import React, { useState } from 'react';
import { PROJECTS } from '../data';
import { Project } from '../types';
import DashboardSimulator from './DashboardSimulator';
import MiniArcade from './MiniArcade';
import { Github, ExternalLink, Code2, Gamepad2, Play, Star, Sparkles } from 'lucide-react';

export default function PortfolioShowcase() {
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Web Applications' | 'Creative Design' | 'Dashboards' | 'Mini Games'>('All');
  const [activeInteractiveDemo, setActiveInteractiveDemo] = useState<'none' | 'dashboard' | 'snake'>('none');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const filterCategories = ['All', 'Web Applications', 'Dashboards', 'Mini Games', 'Creative Design'] as const;

  const filteredProjects = selectedFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === selectedFilter);

  const launchInteractiveProject = (projectId: string) => {
    if (projectId === 'apex-dashboard') {
      setActiveInteractiveDemo('dashboard');
      // Scroll to interactive preview frame
      setTimeout(() => {
        const frame = document.getElementById('interactive-playground-anchor');
        if (frame) frame.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (projectId === 'cyber-arcade') {
      setActiveInteractiveDemo('snake');
      setTimeout(() => {
        const frame = document.getElementById('interactive-playground-anchor');
        if (frame) frame.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <section id="portfolio" className="py-24 relative overflow-hidden bg-transparent text-white">
      {/* Absolute top separator gradient string */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Title */}
        <div className="mb-16 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center sm:items-end gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#a582f3] mb-2 block font-semibold">
              Showcase
            </span>
            <h2 className="font-display font-medium text-4xl sm:text-5xl text-white tracking-tight">
              Selected <span className="text-[#a582f3] text-glow-blue">Portfolios & Apps</span>
            </h2>
            <div className="h-[2px] w-20 bg-[#a582f3] mt-4 mx-auto sm:mx-0 shadow-[0_0_8px_#a582f3]" />
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap gap-2 justify-center">
            {filterCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedFilter(cat);
                  // clear playground if filter shifts
                }}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all cursor-pointer focus:outline-none ${
                  selectedFilter === cat
                    ? 'bg-white/10 text-white border border-white/25 shadow-md shadow-black/10'
                    : 'bg-white/[0.02] border border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                }`}
              >
                {cat === 'Web Applications' ? 'Web Apps' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Informational tip banner */}
        <div className="mb-10 p-4 bg-white/[0.03] backdrop-blur-md border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)] rounded-xl flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#7b61ff] animate-ping shrink-0" />
            <span className="text-gray-300 font-sans">
              ⚡ **Interactive Sandbox Enabled**: Projects with the **"Live Sandbox Demo"** badge can be compiled and played directly inside this page!
            </span>
          </div>
        </div>

        {/* Project grid container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#a582f3]/40 hover:shadow-[0_8px_32px_rgba(165,130,243,0.1)] transition-all duration-300 relative"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Photo frame */}
              <div className="relative h-48 overflow-hidden bg-black/50">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                {/* Neon shadow overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

                {/* Star indicator count if any */}
                {project.stars && (
                  <span className="absolute top-3 right-3 px-2 py-1 bg-[#080710]/80 border border-white/10 rounded-md text-[10px] font-mono text-yellow-500 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{project.stars}</span>
                  </span>
                )}

                {/* High tech trigger banner */}
                {(project.id === 'apex-dashboard' || project.id === 'cyber-arcade') && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#7b61ff]/85 text-white border border-white/10 rounded-md text-[9px] font-mono font-semibold tracking-wider uppercase flex items-center gap-1 shadow-[0_0_8px_#7b61ff] backdrop-blur-sm">
                    <Gamepad2 className="w-3.5 h-3.5" />
                    <span>Live Sandbox Demo</span>
                  </span>
                )}

                {/* Category small floating label */}
                <span className="absolute bottom-3 left-3 text-[10px] uppercase font-mono bg-white/5 border border-white/15 text-[#a582f3] px-2 py-0.5 rounded-full">
                  {project.category}
                </span>
              </div>

              {/* General details text */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="font-display font-medium text-lg text-white group-hover:text-[#a582f3] transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-xs font-sans leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Dynamic tag badges */}
                <div className="flex flex-wrap gap-1.5 mt-4 font-sans">
                  {project.tags.map((tg, key) => (
                    <span
                      key={key}
                      className="text-[9px] font-semibold uppercase tracking-wider bg-white/[0.01] border border-white/10 text-gray-400 px-2.5 py-1 rounded-sm"
                    >
                      {tg}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions footer row */}
              <div className="p-6 border-t border-white/10 bg-white/[0.02] flex items-center justify-between gap-4">
                <div className="flex gap-4 font-mono text-xs">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white flex items-center gap-1 text-[11px]"
                    >
                      <Github className="w-4 h-4" />
                      <span>Code</span>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      className="text-gray-400 hover:text-[#a582f3] flex items-center gap-1 text-[11px]"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live</span>
                    </a>
                  )}
                </div>

                {/* Primary Demo Execution Button */}
                {(project.id === 'apex-dashboard' || project.id === 'cyber-arcade') ? (
                  <button
                    onClick={() => launchInteractiveProject(project.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-full uppercase tracking-wider transition-all duration-300 backdrop-blur-sm cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current text-[#a582f3]" />
                    <span>Run In-Site</span>
                  </button>
                ) : (
                  <span className="text-[10px] uppercase font-mono text-gray-500 font-medium">
                    Static Spec
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>        {/* Dynamic Sandbox Playground Anchor Module (Shows and binds live simulator) */}
        {activeInteractiveDemo !== 'none' && (
          <div
            id="interactive-playground-anchor"
            className="mt-6 glass-card rounded-2xl p-6 sm:p-8 relative transition-all duration-500 shadow-[0_12px_44px_rgba(0,0,0,0.4)]"
          >
            {/* Corner status highlights */}
            <div className="absolute top-2 right-4 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#a582f3] animate-pulse border border-[#a582f3]/45" />
              <span className="text-[9px] text-[#a582f3] font-mono uppercase tracking-widest font-semibold text-glow-blue">Active sandbox build</span>
            </div>

            <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Gamepad2 className="w-5 h-5 text-[#7b61ff]" />
                <h3 className="font-display font-semibold text-white text-base">
                  {activeInteractiveDemo === 'dashboard' ? 'APX System Diagnostics Simulator' : 'Retro Neon Arcade Game Terminal'}
                </h3>
              </div>

              {/* Close/Dismount buttons */}
              <button
                onClick={() => setActiveInteractiveDemo('none')}
                className="text-xs text-glow-magenta px-3 py-1 bg-red-950/20 hover:bg-red-900/40 text-red-400 rounded-lg border border-red-900/30 transition-colors cursor-pointer"
              >
                Close Sandbox
              </button>
            </div>

            {/* Simulated Module Frames */}
            <div className="w-full">
              {activeInteractiveDemo === 'dashboard' ? (
                <DashboardSimulator />
              ) : (
                <MiniArcade />
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
