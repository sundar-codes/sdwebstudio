import React from 'react';
import { Search, PenTool, Rocket } from 'lucide-react';

const steps = [
  {
    num: '01',
    title: 'Discover',
    desc: 'Understand the business, requirements and goals.',
    icon: Search,
    accent: 'lavender',
  },
  {
    num: '02',
    title: 'Build',
    desc: 'Design and develop the website around those requirements.',
    icon: PenTool,
    accent: 'gold',
  },
  {
    num: '03',
    title: 'Launch',
    desc: 'Review, test and deploy the completed website.',
    icon: Rocket,
    accent: 'lavender',
  },
];

export const Process: React.FC = () => {
  return (
    <section id="process" className="py-20 sm:py-28 px-5 sm:px-8 border-t border-white/[0.05] relative">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14 sm:mb-20">
          <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#C2A878] mb-2.5 font-medium">
            The Methodology
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#FDFCFB]">
            Three steps from concept to <span className="text-[#C2A878] italic font-normal">live.</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#9CA3AF] max-w-md mt-3 leading-relaxed">
            No endless meetings or hidden complexity. A transparent path to a working website.
          </p>
        </div>

        {/* 3-Step Process Layout: Horizontal on Desktop, Vertical on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-6 relative">
          {/* Subtle Connecting Line for Desktop */}
          <div
            className="hidden md:block absolute top-1/4 left-1/6 right-1/6 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0"
            aria-hidden="true"
          />

          {steps.map((step) => {
            const Icon = step.icon;
            const isGold = step.accent === 'gold';
            return (
              <div
                key={step.num}
                className="relative z-10 flex flex-col items-center text-center p-6 sm:p-7 rounded-2xl bg-[#0A0A0C]/70 border border-white/[0.05] hover:border-white/15 transition-all duration-300"
              >
                {/* Step badge */}
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 border transition-colors ${
                    isGold
                      ? 'border-[#C2A878]/30 bg-[#C2A878]/10 text-[#C2A878]'
                      : 'border-[#9986B3]/30 bg-[#9986B3]/10 text-[#9986B3]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#9CA3AF]/60 mb-2">
                  Step {step.num}
                </div>

                <h3 className="font-serif text-xl sm:text-2xl text-[#FDFCFB] font-medium mb-2.5">
                  {step.title}
                </h3>

                <p className="font-sans text-xs text-[#9CA3AF] leading-relaxed max-w-xs">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
