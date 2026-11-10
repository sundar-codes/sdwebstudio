import React, { useRef, useState, useEffect } from 'react';
import { Search, PenTool, Rocket, ChevronLeft, ChevronRight } from 'lucide-react';

const steps = [
  {
    num: '01',
    title: 'Discover',
    tagline: 'Strategy & Requirements',
    desc: 'Understand the business, requirements and goals. We map your target audience, identify essential features, and draft clean wireframes.',
    icon: Search,
    accent: 'lavender',
    deliverables: ['Goal alignment', 'Information architecture', 'Visual moodboard'],
  },
  {
    num: '02',
    title: 'Build',
    tagline: 'Engineering & Design',
    desc: 'Design and develop the website around those requirements. Handcrafted from scratch with zero bloatware, optimal typography, and blazing load times.',
    icon: PenTool,
    accent: 'gold',
    deliverables: ['Custom component architecture', 'Responsive mobile optimization', 'Interactive micro-animations'],
  },
  {
    num: '03',
    title: 'Launch',
    tagline: 'Testing & Deployment',
    desc: 'Review, test and deploy the completed website. We run cross-device QA, tune SEO tags, integrate lead capture, and hand over the live production build.',
    icon: Rocket,
    accent: 'lavender',
    deliverables: ['Cross-browser verification', 'Lighthouse score tuning', 'Live DNS & domain deployment'],
  },
];

export const Process: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 20);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 20);

    // Calculate approximate active step
    const cardWidth = el.clientWidth * 0.8;
    const index = Math.round(el.scrollLeft / cardWidth);
    setActiveStepIndex(Math.min(steps.length - 1, Math.max(0, index)));
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const scrollAmount = el.clientWidth * 0.75;
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const scrollToStep = (idx: number) => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const targetChild = el.children[idx] as HTMLElement;
    if (targetChild) {
      targetChild.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  };

  return (
    <section id="process" className="py-20 sm:py-28 px-5 sm:px-8 border-t border-white/[0.05] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[380px] h-[380px] bg-[#9986B3]/[0.03] rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto">
        {/* Header with Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div>
            <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#C2A878] mb-2 font-medium">
              The Methodology
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#FDFCFB]">
              Three steps from concept to <span className="text-[#C2A878] italic font-normal">live.</span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-block font-sans text-xs text-[#9CA3AF]/60 tracking-wider">
              Scroll horizontally ⟵ ⟶
            </span>

            {/* Left & Right arrow buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                aria-label="Previous step"
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200 ${
                  canScrollLeft
                    ? 'border-white/20 bg-[#0A0A0C] text-[#FDFCFB] hover:border-[#9986B3] hover:text-[#9986B3]'
                    : 'border-white/5 bg-transparent text-[#9CA3AF]/30 cursor-not-allowed'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                aria-label="Next step"
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200 ${
                  canScrollRight
                    ? 'border-white/20 bg-[#0A0A0C] text-[#FDFCFB] hover:border-[#C2A878] hover:text-[#C2A878]'
                    : 'border-white/5 bg-transparent text-[#9CA3AF]/30 cursor-not-allowed'
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* ── HORIZONTAL SCROLLABLE STEP TRACK (Right to Left / Left to Right scrollable) ── */}
        <div
          ref={scrollContainerRef}
          className="flex gap-5 sm:gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scrollbar-none no-scrollbar cursor-grab active:cursor-grabbing"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isGold = step.accent === 'gold';
            const isActive = activeStepIndex === idx;

            return (
              <div
                key={step.num}
                className={`snap-center shrink-0 w-[85vw] sm:w-[380px] lg:w-[400px] rounded-2xl bg-[#0A0A0C] border transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between select-none ${
                  isActive
                    ? isGold
                      ? 'border-[#C2A878]/50 shadow-xl shadow-black/60'
                      : 'border-[#9986B3]/50 shadow-xl shadow-black/60'
                    : 'border-white/[0.07] hover:border-white/20'
                }`}
              >
                <div>
                  {/* Top Step Number and Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-colors ${
                        isGold
                          ? 'border-[#C2A878]/30 bg-[#C2A878]/10 text-[#C2A878]'
                          : 'border-[#9986B3]/30 bg-[#9986B3]/10 text-[#9986B3]'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex items-center gap-1.5 font-mono text-xs tracking-widest text-[#9CA3AF]/50 uppercase">
                      <span>STEP</span>
                      <span className="text-sm font-semibold text-[#FDFCFB]">{step.num}</span>
                      <span className="text-[#9CA3AF]/30">/ 03</span>
                    </div>
                  </div>

                  <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#9CA3AF] mb-1.5 block">
                    {step.tagline}
                  </span>

                  <h3 className="font-serif text-2xl sm:text-3xl text-[#FDFCFB] font-medium mb-3">
                    {step.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-[#9CA3AF] leading-relaxed mb-6">
                    {step.desc}
                  </p>
                </div>

                {/* Deliverables pill list */}
                <div className="pt-4 border-t border-white/[0.05]">
                  <p className="font-sans text-[10px] uppercase tracking-wider text-[#9CA3AF]/60 mb-2">
                    Key Deliverables:
                  </p>
                  <ul className="space-y-1.5">
                    {step.deliverables.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs font-sans text-white/80">
                        <span className={`w-1.5 h-1.5 rounded-full ${isGold ? 'bg-[#C2A878]' : 'bg-[#9986B3]'}`} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Step Indicator Progress Dots */}
        <div className="flex items-center justify-center gap-2 mt-4 sm:mt-6">
          {steps.map((step, idx) => (
            <button
              key={step.num}
              type="button"
              onClick={() => scrollToStep(idx)}
              aria-label={`Jump to step ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeStepIndex === idx ? 'w-8 bg-[#C2A878]' : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
