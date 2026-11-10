import React, { useState } from 'react';
import { Layout, Globe, ShoppingBag, Code2, Check } from 'lucide-react';

const services = [
  {
    id: 'landing-pages',
    icon: Layout,
    title: 'Landing Pages',
    desc: 'Focused websites for campaigns, products and businesses.',
    accent: 'lavender',
    highlights: ['Single Page Conversion', 'High Performance', 'A/B Test Ready'],
    badge: 'High Impact',
  },
  {
    id: 'business-websites',
    icon: Globe,
    title: 'Business Websites',
    desc: 'Professional multi-section websites for businesses and local brands.',
    accent: 'gold',
    highlights: ['Multi-Section Architecture', 'SEO & Local Search', 'Responsive Design'],
    badge: 'Popular',
  },
  {
    id: 'online-catalogs',
    icon: ShoppingBag,
    title: 'Online Catalogs',
    desc: 'Product browsing, category organisation and customer enquiries.',
    accent: 'lavender',
    highlights: ['Category Filtering', 'WhatsApp Order Flow', 'Fast Image Gallery'],
    badge: 'E-Commerce',
  },
  {
    id: 'custom-web-apps',
    icon: Code2,
    title: 'Custom Web Applications',
    desc: 'Custom web experiences and business-specific functionality.',
    accent: 'gold',
    highlights: ['Interactive Workflows', 'Dashboard & POS Utilities', 'API Integrations'],
    badge: 'Tailored',
  },
];

export const Services: React.FC = () => {
  // Mobile active tab index (defaults to first service)
  const [activeTab, setActiveTab] = useState(0);

  const activeService = services[activeTab];
  const ActiveIcon = activeService.icon;
  const isActiveGold = activeService.accent === 'gold';

  return (
    <section id="services" className="py-16 sm:py-24 px-5 sm:px-8 border-t border-white/[0.05] relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-8 sm:mb-14">
          <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#C2A878] mb-2 font-medium">
            Core Capabilities
          </p>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-[#FDFCFB]">
            Thoughtfully crafted <span className="text-[#9986B3] italic font-normal">solutions.</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#9CA3AF] max-w-md mt-2.5 leading-relaxed">
            Every build is tailored from scratch. High speed, zero templates, and designed to convert.
          </p>
        </div>

        {/* ── DESKTOP VIEW: CLEAN 4-COLUMN CARDS GRID (Cool & spacious) ── */}
        <div className="hidden md:grid md:grid-cols-4 gap-4 sm:gap-5">
          {services.map((item, idx) => {
            const Icon = item.icon;
            const isGold = item.accent === 'gold';
            return (
              <div
                key={item.id}
                className="group relative bg-[#0A0A0C] border border-white/[0.06] hover:border-white/20 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50"
              >
                <div
                  className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
                    isGold
                      ? 'bg-gradient-to-b from-[#C2A878]/[0.05] to-transparent'
                      : 'bg-gradient-to-b from-[#9986B3]/[0.05] to-transparent'
                  }`}
                  aria-hidden="true"
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-colors duration-300 ${
                        isGold
                          ? 'border-[#C2A878]/30 bg-[#C2A878]/10 text-[#C2A878] group-hover:border-[#C2A878] group-hover:bg-[#C2A878]/20'
                          : 'border-[#9986B3]/30 bg-[#9986B3]/10 text-[#9986B3] group-hover:border-[#9986B3] group-hover:bg-[#9986B3]/20'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-[11px] text-[#9CA3AF]/40">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl text-[#FDFCFB] mb-2 font-medium">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs text-[#9CA3AF] leading-relaxed mb-4">
                    {item.desc}
                  </p>
                </div>

                <div className="relative z-10 pt-3 border-t border-white/[0.04] flex flex-wrap gap-1.5">
                  {item.highlights.map((h) => (
                    <span
                      key={h}
                      className="inline-block px-2 py-0.5 rounded text-[9px] font-sans text-[#9CA3AF]/70 bg-white/[0.03]"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── MOBILE VIEW: ULTRA-COMPACT TABBED SHOWCASE (Zero excessive scroll!) ── */}
        <div className="flex md:hidden flex-col gap-3">
          {/* Segmented Pills for 4 capabilities */}
          <div className="grid grid-cols-2 gap-2">
            {services.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = activeTab === idx;
              const isGold = item.accent === 'gold';

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  className={`flex items-center gap-2 p-2.5 rounded-xl border text-left transition-all duration-200 ${
                    isSelected
                      ? isGold
                        ? 'bg-[#C2A878]/15 border-[#C2A878] text-[#FDFCFB] shadow-md'
                        : 'bg-[#9986B3]/15 border-[#9986B3] text-[#FDFCFB] shadow-md'
                      : 'bg-[#0A0A0C] border-white/[0.06] text-[#9CA3AF] hover:text-[#FDFCFB]'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                      isSelected
                        ? isGold
                          ? 'bg-[#C2A878] text-[#050506]'
                          : 'bg-[#9986B3] text-[#050506]'
                        : 'bg-white/5 text-[#9CA3AF]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-sans text-[11px] font-medium leading-tight line-clamp-1">
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Compact Service Card Preview */}
          <div className="relative bg-[#0A0A0C] border border-white/[0.09] rounded-2xl p-5 shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center border ${
                    isActiveGold
                      ? 'border-[#C2A878]/30 bg-[#C2A878]/15 text-[#C2A878]'
                      : 'border-[#9986B3]/30 bg-[#9986B3]/15 text-[#9986B3]'
                  }`}
                >
                  <ActiveIcon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-[#FDFCFB] font-medium">
                    {activeService.title}
                  </h3>
                </div>
              </div>

              <span
                className={`text-[10px] font-sans tracking-wider uppercase px-2.5 py-0.5 rounded-full border ${
                  isActiveGold
                    ? 'border-[#C2A878]/30 text-[#C2A878] bg-[#C2A878]/10'
                    : 'border-[#9986B3]/30 text-[#9986B3] bg-[#9986B3]/10'
                }`}
              >
                {activeService.badge}
              </span>
            </div>

            <p className="font-sans text-xs text-[#9CA3AF] leading-relaxed mb-4">
              {activeService.desc}
            </p>

            {/* Micro Highlights */}
            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.05]">
              {activeService.highlights.map((h) => (
                <span
                  key={h}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-sans text-white/80 bg-white/[0.04] border border-white/[0.04]"
                >
                  <Check className="w-2.5 h-2.5 text-[#9986B3]" />
                  {h}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
