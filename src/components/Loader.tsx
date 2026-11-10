import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Logo } from './Logo';

interface LoaderProps {
  onComplete: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const topHalfRef = useRef<HTMLDivElement>(null);
  const bottomHalfRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const centerContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    // Failsafe timer so user is never stuck
    const failsafeTimer = setTimeout(() => {
      onComplete();
    }, 2800);

    const tl = gsap.timeline({
      onComplete: () => {
        clearTimeout(failsafeTimer);
        if (containerRef.current) {
          containerRef.current.style.display = 'none';
        }
        onComplete();
      },
    });

    // 1. Ring continuous rotation
    gsap.to(ringRef.current, {
      rotation: 360,
      duration: 1.1,
      ease: 'linear',
      repeat: -1,
    });

    // 2. Center content fade-in and pulse
    tl.fromTo(
      centerContentRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' }
    );

    // 3. Reveal phase after brief hold (total ~1.1s initial load)
    tl.to(
      centerContentRef.current,
      {
        opacity: 0,
        scale: 0.85,
        duration: 0.35,
        ease: 'power2.in',
      },
      '+=0.6'
    )
      .to(
        topHalfRef.current,
        {
          yPercent: -100,
          duration: 0.85,
          ease: 'expo.inOut',
        },
        '-=0.1'
      )
      .to(
        bottomHalfRef.current,
        {
          yPercent: 100,
          duration: 0.85,
          ease: 'expo.inOut',
        },
        '<'
      );

    return () => {
      clearTimeout(failsafeTimer);
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* Central Visual Indicator */}
      <div
        ref={centerContentRef}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-auto"
      >
        <div className="relative flex items-center justify-center mb-5">
          {/* Lavender and Gold dual-accent rotating ring */}
          <div
            ref={ringRef}
            className="w-16 h-16 rounded-full border-[2.5px] border-l-transparent border-r-transparent border-t-[#9986B3] border-b-[#C2A878]"
          />
          {/* Centered S/D mark */}
          <div className="absolute inset-0 flex items-center justify-center scale-75">
            <Logo size="sm" />
          </div>
        </div>

        <p className="font-sans text-[10px] tracking-[0.35em] uppercase text-[#FDFCFB]/80 font-medium">
          SD WEB STUDIO
        </p>
      </div>

      {/* Split-screen Top and Bottom Curtain Halves */}
      <div
        ref={topHalfRef}
        className="h-1/2 w-full bg-[#050506] border-b border-white/[0.04] relative z-0"
      />
      <div
        ref={bottomHalfRef}
        className="h-1/2 w-full bg-[#050506] border-t border-white/[0.04] relative z-0"
      />
    </div>
  );
};
