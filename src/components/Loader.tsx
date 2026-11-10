import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface LoaderProps {
  onComplete: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const topHalfRef = useRef<HTMLDivElement>(null);
  const bottomHalfRef = useRef<HTMLDivElement>(null);
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

    // Fade-in center content
    tl.fromTo(
      centerContentRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out' }
    );

    // After animation runs for ~1.3s, split-curtain reveal
    tl.to(
      centerContentRef.current,
      {
        opacity: 0,
        scale: 0.85,
        duration: 0.3,
        ease: 'power2.in',
      },
      '+=1.1'
    )
      .to(
        topHalfRef.current,
        {
          yPercent: -100,
          duration: 0.8,
          ease: 'expo.inOut',
        },
        '-=0.05'
      )
      .to(
        bottomHalfRef.current,
        {
          yPercent: 100,
          duration: 0.8,
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
      {/* Dynamic Keyframes for concentric rings with SD Web Studio palette */}
      <style>{`
        .pl {
          width: 5.5em;
          height: 5.5em;
        }

        .pl__ring {
          animation: ringA 2s linear infinite;
        }

        /* SD Brand Colors: Lavender & Gold Harmonies */
        .pl__ring--a {
          stroke: #9986B3;
        }

        .pl__ring--b {
          animation-name: ringB;
          stroke: #C2A878;
        }

        .pl__ring--c {
          animation-name: ringC;
          stroke: #B4A2CC;
        }

        .pl__ring--d {
          animation-name: ringD;
          stroke: #DFCA9E;
        }

        /* Keyframe Animations */
        @keyframes ringA {
          from, 4% {
            stroke-dasharray: 0 660;
            stroke-width: 20;
            stroke-dashoffset: -330;
          }
          12% {
            stroke-dasharray: 60 600;
            stroke-width: 30;
            stroke-dashoffset: -335;
          }
          32% {
            stroke-dasharray: 60 600;
            stroke-width: 30;
            stroke-dashoffset: -595;
          }
          40%, 54% {
            stroke-dasharray: 0 660;
            stroke-width: 20;
            stroke-dashoffset: -660;
          }
          62% {
            stroke-dasharray: 60 600;
            stroke-width: 30;
            stroke-dashoffset: -665;
          }
          82% {
            stroke-dasharray: 60 600;
            stroke-width: 30;
            stroke-dashoffset: -925;
          }
          90%, to {
            stroke-dasharray: 0 660;
            stroke-width: 20;
            stroke-dashoffset: -990;
          }
        }

        @keyframes ringB {
          from, 12% {
            stroke-dasharray: 0 220;
            stroke-width: 20;
            stroke-dashoffset: -110;
          }
          20% {
            stroke-dasharray: 20 200;
            stroke-width: 30;
            stroke-dashoffset: -115;
          }
          40% {
            stroke-dasharray: 20 200;
            stroke-width: 30;
            stroke-dashoffset: -195;
          }
          48%, 62% {
            stroke-dasharray: 0 220;
            stroke-width: 20;
            stroke-dashoffset: -220;
          }
          70% {
            stroke-dasharray: 20 200;
            stroke-width: 30;
            stroke-dashoffset: -225;
          }
          90% {
            stroke-dasharray: 20 200;
            stroke-width: 30;
            stroke-dashoffset: -305;
          }
          98%, to {
            stroke-dasharray: 0 220;
            stroke-width: 20;
            stroke-dashoffset: -330;
          }
        }

        @keyframes ringC {
          from {
            stroke-dasharray: 0 440;
            stroke-width: 20;
            stroke-dashoffset: 0;
          }
          8% {
            stroke-dasharray: 40 400;
            stroke-width: 30;
            stroke-dashoffset: -5;
          }
          28% {
            stroke-dasharray: 40 400;
            stroke-width: 30;
            stroke-dashoffset: -175;
          }
          36%, 58% {
            stroke-dasharray: 0 440;
            stroke-width: 20;
            stroke-dashoffset: -220;
          }
          66% {
            stroke-dasharray: 40 400;
            stroke-width: 30;
            stroke-dashoffset: -225;
          }
          86% {
            stroke-dasharray: 40 400;
            stroke-width: 30;
            stroke-dashoffset: -395;
          }
          94%, to {
            stroke-dasharray: 0 440;
            stroke-width: 20;
            stroke-dashoffset: -440;
          }
        }

        @keyframes ringD {
          from, 8% {
            stroke-dasharray: 0 440;
            stroke-width: 20;
            stroke-dashoffset: 0;
          }
          16% {
            stroke-dasharray: 40 400;
            stroke-width: 30;
            stroke-dashoffset: -5;
          }
          36% {
            stroke-dasharray: 40 400;
            stroke-width: 30;
            stroke-dashoffset: -175;
          }
          44%, 50% {
            stroke-dasharray: 0 440;
            stroke-width: 20;
            stroke-dashoffset: -220;
          }
          58% {
            stroke-dasharray: 40 400;
            stroke-width: 30;
            stroke-dashoffset: -225;
          }
          78% {
            stroke-dasharray: 40 400;
            stroke-width: 30;
            stroke-dashoffset: -395;
          }
          86%, to {
            stroke-dasharray: 0 440;
            stroke-width: 20;
            stroke-dashoffset: -440;
          }
        }
      `}</style>

      {/* Central Visual Indicator */}
      <div
        ref={centerContentRef}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-auto"
      >
        <div className="relative flex items-center justify-center mb-6">
          <svg className="pl" width="240" height="240" viewBox="0 0 240 240" aria-label="Loading animation">
            <circle
              className="pl__ring pl__ring--a"
              cx="120"
              cy="120"
              r="105"
              fill="none"
              strokeWidth="20"
              strokeDasharray="0 660"
              strokeDashoffset="-330"
              strokeLinecap="round"
            />
            <circle
              className="pl__ring pl__ring--b"
              cx="120"
              cy="120"
              r="35"
              fill="none"
              strokeWidth="20"
              strokeDasharray="0 220"
              strokeDashoffset="-110"
              strokeLinecap="round"
            />
            <circle
              className="pl__ring pl__ring--c"
              cx="85"
              cy="120"
              r="70"
              fill="none"
              strokeWidth="20"
              strokeDasharray="0 440"
              strokeLinecap="round"
            />
            <circle
              className="pl__ring pl__ring--d"
              cx="155"
              cy="120"
              r="70"
              fill="none"
              strokeWidth="20"
              strokeDasharray="0 440"
              strokeLinecap="round"
            />
          </svg>
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
