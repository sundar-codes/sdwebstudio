import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowUpRight, ChevronDown } from 'lucide-react';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
      )
        .fromTo(
          headlineRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo(
          subtextRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.5'
        )
        .fromTo(
          ctasRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
          '-=0.5'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="top"
      ref={containerRef}
      className="relative min-h-[90vh] md:min-h-screen flex flex-col justify-center items-center text-center px-5 sm:px-8 pt-28 pb-16 overflow-hidden"
    >
      {/* Restrained Ambient Radial Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] h-[340px] sm:h-[450px] bg-[#9986B3]/[0.06] rounded-full blur-[110px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-[#C2A878]/[0.04] rounded-full blur-[90px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Editorial Sub-badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-[#0A0A0C]/70 backdrop-blur-md mb-6 sm:mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#C2A878] animate-pulse" />
          <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.24em] uppercase text-[#9CA3AF]">
            Independent Studio • Coimbatore, India
          </span>
        </div>

        {/* Serif Headline */}
        <h1
          ref={headlineRef}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] text-[#FDFCFB] tracking-tight leading-[1.08] max-w-3xl"
        >
          Your business deserves a{' '}
          <span className="text-[#9986B3] italic font-normal">better website.</span>
        </h1>

        {/* Concise Supporting Copy */}
        <p
          ref={subtextRef}
          className="font-sans text-sm sm:text-base md:text-lg text-[#9CA3AF] max-w-xl mx-auto mt-6 sm:mt-7 leading-relaxed font-light"
        >
          Modern, fast and thoughtfully designed websites for businesses ready to stand out and grow online.
        </p>

        {/* Clear Action CTAs */}
        <div
          ref={ctasRef}
          className="flex flex-col sm:flex-row items-center gap-4 mt-8 sm:mt-10 w-full sm:w-auto"
        >
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, '#contact')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#FDFCFB] text-[#050506] font-sans text-xs tracking-[0.18em] uppercase font-semibold hover:bg-[#9986B3] hover:text-[#050506] transition-all duration-300 group shadow-lg shadow-white/5"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <a
            href="#work"
            onClick={(e) => scrollToSection(e, '#work')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-white/15 bg-white/[0.02] text-[#FDFCFB] font-sans text-xs tracking-[0.18em] uppercase hover:border-[#C2A878] hover:text-[#C2A878] transition-all duration-300"
          >
            <span>Explore Our Work</span>
          </a>
        </div>
      </div>

      {/* Subtle Scroll Hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1.5 opacity-40 hover:opacity-80 transition-opacity">
        <a
          href="#services"
          onClick={(e) => scrollToSection(e, '#services')}
          aria-label="Scroll to services"
          className="text-[#9CA3AF]"
        >
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
};
