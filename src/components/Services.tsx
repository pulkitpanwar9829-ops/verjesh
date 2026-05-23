import React, { useState } from 'react';
import { SERVICES } from '../data';
import { LayoutTemplate, Smartphone, Flame, Zap, Sliders, CheckCircle, Calculator, UserPlus } from 'lucide-react';

export default function Services() {
  const [selectedServices, setSelectedServices] = useState<string[]>(['frontend']);
  const [timelineWeeks, setTimelineWeeks] = useState(2);
  const [urgent, setUrgent] = useState(false);

  // Icon mapping helper
  const renderIcon = (name: string) => {
    switch (name) {
      case 'LayoutTemplate':
        return <LayoutTemplate className="w-6 h-6 text-[#a582f3]" />;
      case 'Smartphone':
        return <Smartphone className="w-6 h-6 text-[#a582f3]" />;
      case 'Flame':
        return <Flame className="w-6 h-6 text-[#a582f3]" />;
      case 'Zap':
        return <Zap className="w-6 h-6 text-[#a582f3]" />;
      default:
        return <LayoutTemplate className="w-6 h-6 text-[#a582f3]" />;
    }
  };

  const serviceSpecs = [
    { id: 'frontend', name: 'Frontend React Development', rate: 1200 },
    { id: 'responsive', name: 'Adaptive Mobile Optimization', rate: 800 },
    { id: 'interactive', name: 'Micro-Interaction UX Injectors', rate: 600 },
    { id: 'prototyping', name: 'Rapid Figma-to-Code Blueprint', rate: 700 }
  ];

  const handleToggleService = (id: string) => {
    setSelectedServices(prev => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev; // Keep at least one selected
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Compute overall quote estimation
  const computeQuote = () => {
    let baseSum = 0;
    selectedServices.forEach(srvId => {
      const match = serviceSpecs.find(spec => spec.id === srvId);
      if (match) baseSum += match.rate;
    });

    // Speed premium modifier
    let speedModifier = 1.0;
    if (timelineWeeks <= 1) speedModifier = 1.35; // express delivery
    else if (timelineWeeks > 4) speedModifier = 0.92; // extended timeframe markdown

    // Urgency surcharge
    let urgentAdd = urgent ? 300 : 0;

    const computed = Math.round(baseSum * speedModifier + urgentAdd);
    return computed;
  };

  return (
    <section id="services" className="py-24 relative overflow-hidden bg-transparent text-white">
      {/* Absolute grid decoration */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Title */}
        <div className="mb-16 text-center sm:text-left">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#a582f3] mb-2 block font-semibold">
            Capabilities
          </span>
          <h2 className="font-display font-medium text-4xl sm:text-5xl text-white tracking-tight">
            Consulting <span className="text-[#a582f3] text-glow-blue">& Services</span>
          </h2>
          <div className="h-[2px] w-20 bg-[#a582f3] mt-4 mx-auto sm:mx-0 shadow-[0_0_8px_#a582f3]" />
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="glass-card rounded-2xl p-6 hover:border-[#a582f3]/40 hover:bg-[#a582f3]/5 hover:shadow-[0_8px_32px_rgba(165,130,243,0.1)] transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Icon block */}
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center group-hover:scale-105 group-hover:border-[#a582f3]/40 transition-all duration-300">
                  {renderIcon(srv.iconName)}
                </div>

                <div className="space-y-2">
                  <h3 className="font-display font-semibold text-lg text-white group-hover:text-[#a582f3] transition-colors duration-300">
                    {srv.title}
                  </h3>
                  <p className="text-gray-400 text-xs font-sans leading-relaxed">
                    {srv.description}
                  </p>
                </div>
              </div>

              {/* Sub features list */}
              <div className="border-t border-white/10 pt-4 mt-6 space-y-2">
                {srv.features.map((feat, index) => (
                  <div key={index} className="flex items-center gap-2 text-[11px] text-gray-500 font-sans">
                    <CheckCircle className="w-3.5 h-3.5 text-[#7b61ff] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Interactive Estimate Calculator Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch glass-card rounded-2xl p-6 sm:p-8 relative shadow-[0_12px_40px_rgba(0,0,0,0.3)]">
          <div className="lg:col-span-12 flex items-center gap-2 mb-2">
            <Calculator className="w-5 h-5 text-[#7b61ff]" />
            <span className="font-display font-semibold text-white text-lg">Interactive Project Scope Planner</span>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <p className="text-xs text-gray-400 leading-relaxed font-sans">
              Select your required capabilities below, align your target completion timeframe, and view a dynamic pricing draft. Ideal for budgeting custom sprints.
            </p>

            {/* Service selectors */}
            <div className="space-y-2.5">
              <span className="text-[10px] text-gray-400 font-mono uppercase tracking-wider block">1. Select Included Services</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {serviceSpecs.map(srv => {
                  const active = selectedServices.includes(srv.id);
                  return (
                    <div
                      key={srv.id}
                      onClick={() => handleToggleService(srv.id)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer select-none flex items-center justify-between ${
                        active
                          ? 'bg-gradient-to-r from-[#a582f3]/10 to-[#7b61ff]/10 border-[#a582f3] text-white shadow-[0_4px_12px_rgba(165,130,243,0.15)]'
                          : 'bg-white/[0.02] border-white/10 text-gray-450 text-gray-350 hover:border-white/20 hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="flex items-center gap-2 max-w-[80%]">
                        <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-colors ${active ? 'border-[#a582f3] bg-[#a582f3]' : 'border-gray-500'}`}>
                          {active && <span className="text-black font-sans text-[8px] font-bold">✓</span>}
                        </div>
                        <span className="text-xs font-semibold">{srv.name}</span>
                      </div>
                      <span className="text-[10px] font-mono text-gray-400">${srv.rate}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Timeline slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px] text-gray-400 font-mono uppercase tracking-wider">
                <span>2. Completion Timeframe</span>
                <span className="text-[#a582f3] font-sans font-bold">{timelineWeeks} {timelineWeeks === 1 ? 'Week' : 'Weeks'}</span>
              </div>
              <input
                type="range"
                min="1"
                max="8"
                value={timelineWeeks}
                onChange={(e) => setTimelineWeeks(Number(e.target.value))}
                className="w-full h-1.5 bg-white/5 border border-white/10 rounded-lg appearance-none cursor-pointer accent-[#7b61ff]"
              />
              <div className="flex justify-between text-[9px] text-gray-500 font-sans">
                <span>Express Surcharge (1 wk)</span>
                <span>Standard Pace (2-3 wks)</span>
                <span>Relaxed Target (4+ wks)</span>
              </div>
            </div>

            {/* Surcharge Option */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="urgentCheck"
                checked={urgent}
                onChange={(e) => setUrgent(e.target.checked)}
                className="w-4 h-4 rounded border-white/10 bg-white/5 text-[#a582f3] focus:ring-[#a582f3] cursor-pointer"
              />
              <label htmlFor="urgentCheck" className="text-xs text-gray-400 cursor-pointer select-none font-sans">
                Express Queue Priority Surcharge (Adds $300, shifts task start to next-day)
              </label>
            </div>
          </div>

          {/* Pricing Draft card pane */}
          <div className="lg:col-span-5 bg-[#080710]/40 border border-dashed border-[#a582f3]/40 rounded-xl p-6 flex flex-col justify-between backdrop-blur-sm">
            <div className="space-y-4">
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block text-center">Draft SOW Pricing</span>
              
              <div className="text-center py-2 bg-black/40 rounded-xl border border-white/10">
                <div className="text-gray-400 text-[10px] font-mono">ESTIMATED TOTAL BUDGET</div>
                <div className="text-[#a582f3] font-mono font-bold text-3xl sm:text-4xl mt-1 text-glow-blue">${computeQuote()}</div>
                <div className="text-gray-500 text-[9px] mt-1">SOW contract-ready estimation</div>
              </div>

              <div className="space-y-2 font-sans">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500 font-medium">Selected Tasks:</span>
                  <span className="text-white font-semibold font-mono">{selectedServices.length} Sprints</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500 font-medium">Target Duration:</span>
                  <span className="text-white font-semibold">{timelineWeeks} {timelineWeeks === 1 ? 'Week' : 'Weeks'}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500 font-medium whitespace-nowrap">Priority Status:</span>
                  <span className={urgent ? 'text-[#7b61ff] font-semibold' : 'text-green-450 text-green-400 font-semibold'}>{urgent ? 'EXTREME PRIORITY' : 'Standard Queue'}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                  // Inject details if desired
                  const msgInput = document.getElementById('contact-subject') as HTMLInputElement;
                  if (msgInput) {
                    msgInput.value = `SOW Project: ${selectedServices.length} Sprints - estimated $${computeQuote()}`;
                  }
                }
              }}
              className="w-full mt-6 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/25 rounded-lg shadow-[0_4px_12px_rgba(255,255,255,0.05)] hover:shadow-[0_4px_20px_rgba(255,255,255,0.15)] flex items-center justify-center gap-1.5 transition-all duration-300 backdrop-blur-sm cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>Lock SOW & Submit Request</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
