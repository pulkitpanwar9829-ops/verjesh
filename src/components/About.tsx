import React, { useState } from 'react';
import { CORE_METRICS, SKILLS, EXPERIENCES } from '../data';
import { Briefcase, Cpu, Code, BookOpen, Layers, Sparkles } from 'lucide-react';

export default function About() {
  const [activeTab, setActiveTab] = useState<'skills' | 'experience'>('skills');
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<'Frontend' | 'Tools & Platforms' | 'Design & Other'>('Frontend');

  const filteredSkills = SKILLS.filter(s => s.category === selectedSkillCategory);

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-transparent">
      {/* Background visual graphics */}
      <div className="absolute top-1/4 right-[-10%] w-[400px] h-[400px] bg-[#a582f3]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-[-10%] w-[400px] h-[400px] bg-[#7b61ff]/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Title */}
        <div className="mb-16 text-center sm:text-left">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#a582f3] mb-2 block font-semibold">
            Discover
          </span>
          <h2 className="font-display font-medium text-4xl sm:text-5xl text-white tracking-tight">
            About <span className="text-[#a582f3] text-glow-blue">Navod Caldera</span>
          </h2>
          <div className="h-[2px] w-20 bg-[#a582f3] mt-4 mx-auto sm:mx-0 shadow-[0_0_8px_#a582f3]" />
        </div>

        {/* Narrative layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          <div className="lg:col-span-6 space-y-6">
            <h3 className="font-display font-medium text-2xl text-white">
              Coded Craft, Engineered Experience
            </h3>
            <p className="text-gray-300 font-sans leading-relaxed text-sm">
              I am Navod, a forward-thinking front-end coder obsessed with bridging the gap between elaborate designers and reliable micro-infrastructure. Having spent years refining standard layouts, I love giving websites custom identities.
            </p>
            <p className="text-gray-300 font-sans leading-relaxed text-sm">
              Whether building rich canvas dashboards, compiling markdown, or scripting spring logic in React, I strive to keep code legible, responsive, and light on the wire. I aim to create things that are not just usable, but memorable.
            </p>

            {/* Core Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
              {CORE_METRICS.map((metric, idx) => (
                <div
                  key={idx}
                  className="glass-card rounded-xl p-4 text-center group hover:border-[#a582f3]/40 hover:bg-[#a582f3]/5 transition-all duration-300"
                >
                  <div className="font-display font-bold text-2xl sm:text-3xl text-[#a582f3] group-hover:scale-105 transition-transform duration-300 text-glow-blue">
                    {metric.value}
                  </div>
                  <div className="text-[10px] uppercase font-sans text-gray-400 tracking-wider mt-1">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            {/* Tab switch controller */}
            <div className="flex bg-white/[0.02] border border-white/10 rounded-xl p-1.5 mb-8 backdrop-blur-sm">
              <button
                onClick={() => setActiveTab('skills')}
                className={`flex-1 py-3 text-xs uppercase tracking-wider font-semibold font-sans rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none ${
                  activeTab === 'skills'
                    ? 'bg-white/10 border border-white/20 text-[#a582f3] shadow-md shadow-black/10'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Code className="w-4 h-4" />
                <span>Technical Skills</span>
              </button>
              <button
                onClick={() => setActiveTab('experience')}
                className={`flex-1 py-3 text-xs uppercase tracking-wider font-semibold font-sans rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none ${
                  activeTab === 'experience'
                    ? 'bg-white/10 border border-white/20 text-[#a582f3] shadow-md shadow-black/10'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Work Experience</span>
              </button>
            </div>

            {/* Tab 1: Skills Framework */}
            {activeTab === 'skills' && (
              <div className="space-y-6">
                {/* Category tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {(['Frontend', 'Tools & Platforms', 'Design & Other'] as const).map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedSkillCategory(cat)}
                      className={`px-3 py-1.5 text-[10px] font-sans font-semibold uppercase tracking-wider rounded-lg transition-all cursor-pointer focus:outline-none ${
                        selectedSkillCategory === cat
                          ? 'bg-white/10 text-white border border-white/20 shadow-md'
                          : 'bg-white/[0.02] border border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Bars list */}
                <div className="space-y-5 glass-card rounded-xl p-6">
                  {filteredSkills.map((sk, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-white font-sans font-medium">{sk.name}</span>
                        <span className="text-[#a582f3] font-mono font-medium">{sk.percentage}%</span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full border border-white/10 overflow-hidden relative">
                        {/* Progressive Fill Bar */}
                        <div
                          className="h-full bg-gradient-to-r from-[#a582f3] to-[#7b61ff] rounded-full shadow-[0_0_8px_#a582f3]"
                          style={{ width: `${sk.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 2: Experience Timeline */}
            {activeTab === 'experience' && (
              <div className="space-y-6 glass-card p-6 rounded-xl relative">
                {/* Visual side timeline line */}
                <div className="absolute left-[27px] top-[40px] bottom-[40px] w-[1px] bg-gradient-to-b from-[#a582f3] via-[#7b61ff] to-transparent pointer-events-none" />

                <div className="space-y-8">
                  {EXPERIENCES.map((exp, idx) => (
                    <div key={idx} className="flex gap-4 relative">
                      {/* Timeline Dot icon bubble */}
                      <div className="w-6 h-6 rounded-full bg-[#080710] border border-[#a582f3] flex items-center justify-center z-10 shrink-0 shadow-[0_0_8px_rgba(165,130,243,0.3)] mt-1.5">
                        <div className="w-2 h-2 rounded-full bg-[#a582f3]" />
                      </div>

                      {/* Content block */}
                      <div className="space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <div>
                            <h4 className="font-display font-semibold text-white text-base">
                              {exp.role}
                            </h4>
                            <span className="text-[#a582f3] font-sans font-medium text-xs">
                              {exp.company}
                            </span>
                          </div>
                          <span className="text-gray-400 font-mono text-[10px] bg-white/5 px-2 py-1 rounded border border-white/10 whitespace-nowrap self-start">
                            {exp.year}
                          </span>
                        </div>
                        <p className="text-gray-400 text-xs font-sans leading-relaxed">
                          {exp.description}
                        </p>

                        <ul className="text-gray-500 text-[11px] font-sans space-y-1 pl-4 list-disc marker:text-[#7b61ff]">
                          {exp.achievements.map((ach, key) => (
                            <li key={key}>{ach}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Highlight Badge Showcase */}
        <div className="p-8 bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.15)]">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="p-3 bg-[#a582f3]/10 border border-[#a582f3]/20 rounded-xl shrink-0 hidden sm:block">
              <Sparkles className="w-6 h-6 text-[#a582f3] animate-pulse" />
            </div>
            <div>
              <div className="text-white font-display font-medium text-lg">Looking for an enthusiastic frontend partner?</div>
              <p className="text-xs text-gray-400 mt-1">I thrive in fast-paced teams building top-tier user experiences using modern systems.</p>
            </div>
          </div>
          <button
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 border border-white/25 rounded-full shadow-[0_4px_12px_rgba(255,255,255,0.05)] transition-all shrink-0 cursor-pointer backdrop-blur-sm"
          >
            Schedule Briefing
          </button>
        </div>
      </div>
    </section>
  );
}
