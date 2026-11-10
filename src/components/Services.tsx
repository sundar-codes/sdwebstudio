import React from 'react';
import { Layout, Globe, ShoppingBag, Code2 } from 'lucide-react';

const services = [
  {
    icon: Layout,
    title: 'Landing Pages',
    desc: 'Focused websites for campaigns, products and businesses.',
    accent: 'lavender',
  },
  {
    icon: Globe,
    title: 'Business Websites',
    desc: 'Professional multi-section websites for businesses and local brands.',
    accent: 'gold',
  },
  {
    icon: ShoppingBag,
    title: 'Online Catalogs',
    desc: 'Product browsing, category organisation and customer enquiries.',
    accent: 'lavender',
  },
  {
    icon: Code2,
    title: 'Custom Web Applications',
    desc: 'Custom web experiences and business-specific functionality.',
    accent: 'gold',
  },
];

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 sm:py-28 px-5 sm:px-8 border-t border-white/[0.05] relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#C2A878] mb-2.5 font-medium">
            Core Capabilities
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#FDFCFB]">
            Thoughtfully crafted <span className="text-[#9986B3] italic font-normal">solutions.</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#9CA3AF] max-w-md mt-3 leading-relaxed">
            Every build is tailored from scratch. High speed, zero templates, and designed to convert.
          </p>
        </div>

        {/* 4 Compact Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {services.map((item, idx) => {
            const Icon = item.icon;
            const isGold = item.accent === 'gold';
            return (
              <div
                key={item.title}
                className="group relative bg-[#0A0A0C] border border-white/[0.06] hover:border-white/20 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50"
              >
                {/* Subtle Hover Gradient */}
                <div
                  className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
                    isGold
                      ? 'bg-gradient-to-b from-[#C2A878]/[0.04] to-transparent'
                      : 'bg-gradient-to-b from-[#9986B3]/[0.04] to-transparent'
                  }`}
                  aria-hidden="true"
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-colors duration-300 ${
                        isGold
                          ? 'border-[#C2A878]/25 bg-[#C2A878]/10 text-[#C2A878] group-hover:border-[#C2A878] group-hover:bg-[#C2A878]/20'
                          : 'border-[#9986B3]/25 bg-[#9986B3]/10 text-[#9986B3] group-hover:border-[#9986B3] group-hover:bg-[#9986B3]/20'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-sans text-[11px] text-[#9CA3AF]/40 tracking-wider font-mono">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl text-[#FDFCFB] mb-2.5 font-medium group-hover:text-[#FDFCFB] transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs text-[#9CA3AF] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
