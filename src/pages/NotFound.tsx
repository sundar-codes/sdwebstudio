import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Logo } from '../components/Logo';

export const NotFound: React.FC = () => {
  return (
    <main className="min-h-screen bg-[#050506] text-[#FDFCFB] flex flex-col items-center justify-between p-6 sm:p-10 relative overflow-hidden select-none">
      {/* Inline styles for original animated face SVG */}
      <style>{`
        .face__eyes, .face__eye-lid, .face__mouth-left, .face__mouth-right, .face__nose, .face__pupil {
          animation: eyes 1s 0.3s forwards;
        }
        .face__eye-lid, .face__pupil {
          animation-duration: 4s;
          animation-delay: 1.3s;
          animation-iteration-count: infinite;
        }
        .face__eye-lid { animation-name: eye-lid; }
        .face__mouth-left { animation-name: mouth-left; }
        .face__mouth-right { animation-name: mouth-right; }
        .face__nose { animation-name: nose; }
        .face__pupil { animation-name: pupil; }

        @keyframes eye-lid {
          0%, 40%, 45%, 100% { transform: translateY(0); }
          42.5% { transform: translateY(17.5px); }
        }
        @keyframes eyes {
          from { transform: translateY(112.5px); }
          to { transform: translateY(15px); }
        }
        @keyframes pupil {
          0%, 37.5%, 40%, 45%, 87.5%, 100% { stroke-dashoffset: 0; transform: translate(0, 0); }
          12.5%, 25%, 62.5%, 75% { transform: translate(-35px, 0); }
          42.5% { stroke-dashoffset: 35; transform: translate(0, 17.5px); }
        }
        @keyframes mouth-left {
          from, 50% { stroke-dashoffset: -102; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes mouth-right {
          from, 50% { stroke-dashoffset: 102; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes nose {
          from { transform: translate(0, 0); }
          to { transform: translate(0, 22.5px); }
        }
      `}</style>

      {/* Top Branding */}
      <div className="w-full max-w-4xl flex items-center justify-between pt-2">
        <Link to="/" aria-label="SD Web Studio - Home">
          <Logo size="sm" showText={true} />
        </Link>
        <span className="font-mono text-xs text-[#9CA3AF]/60 tracking-widest uppercase">
          ERROR 404
        </span>
      </div>

      {/* Central 404 Content */}
      <div className="flex flex-col items-center text-center my-auto py-12 max-w-lg">
        {/* Animated Face SVG from original website */}
        <div className="flex justify-center items-center h-[240px] sm:h-[280px] mb-4">
          <svg
            className="w-[180px] sm:w-[220px] text-[#9986B3]"
            viewBox="0 0 320 380"
            aria-hidden="true"
          >
            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="25">
              <g className="face__eyes" transform="translate(0,112.5)">
                <g transform="translate(15,0)">
                  <polyline className="face__eye-lid" points="37,0 0,120 75,120" />
                  <polyline className="face__pupil" points="55,120 55,155" strokeDasharray="35 35" />
                </g>
                <g transform="translate(230,0)">
                  <polyline className="face__eye-lid" points="37,0 0,120 75,120" />
                  <polyline className="face__pupil" points="55,120 55,155" strokeDasharray="35 35" />
                </g>
              </g>
              <rect className="face__nose" x="132.5" y="112.5" width="55" height="155" rx="4" ry="4" stroke="#C2A878" />
              <g transform="translate(65,334)" strokeDasharray="102 102">
                <path className="face__mouth-left" d="M 0 30 C 0 30 40 0 95 0" />
                <path className="face__mouth-right" d="M 95 0 C 150 0 190 30 190 30" />
              </g>
            </g>
          </svg>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl text-[#FDFCFB] tracking-tight mb-3">
          404 — Page Not Found
        </h1>

        <p className="font-sans text-sm sm:text-base text-[#9CA3AF] mb-8 max-w-sm leading-relaxed">
          Looks like you've taken a wrong turn. The page you are looking for doesn't exist or has moved.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-[#C2A878] bg-[#C2A878] text-[#050506] font-sans text-xs tracking-[0.18em] uppercase font-semibold hover:bg-transparent hover:text-[#C2A878] transition-all duration-300 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Footer note */}
      <div className="font-sans text-[11px] text-[#9CA3AF]/50 tracking-wider">
        SD Web Studio • Coimbatore, India
      </div>
    </main>
  );
};
