import React, { useState } from 'react';
import { ExternalLink, Lock, CheckCircle2, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { projects } from '../data/projects';
import { ProjectCard } from './ProjectCard';

export const SelectedWork: React.FC = () => {
  // Active expanded item for accordion interaction (default first item)
  const [activeId, setActiveId] = useState<string>(projects[0].id);
  const [showAll, setShowAll] = useState(false);
  const [viewMode, setViewMode] = useState<'accordion' | 'grid'>('accordion');

  const featuredProjects = projects.filter((p) => p.featured);
  const displayProjects = showAll ? projects : featuredProjects;

  return (
    <section id="work" className="py-20 sm:py-28 px-5 sm:px-8 border-t border-white/[0.05] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-[#9986B3]/[0.03] rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-1/4 w-[350px] h-[350px] bg-[#C2A878]/[0.03] rounded-full blur-[130px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div>
            <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#C2A878] mb-2.5 font-medium">
              Portfolio
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#FDFCFB]">
              Selected <span className="text-[#9986B3] italic font-normal">work.</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="font-sans text-xs sm:text-sm text-[#9CA3AF] max-w-xs leading-relaxed">
              Explore our recent client websites and application architectures.
            </p>

            {/* View switcher to test Accordion vs Grid */}
            <div className="inline-flex items-center p-1 rounded-full bg-[#0A0A0C] border border-white/[0.08] self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setViewMode('accordion')}
                className={`px-3 py-1.5 rounded-full text-[10px] font-sans tracking-wider uppercase transition-all duration-200 ${
                  viewMode === 'accordion'
                    ? 'bg-[#9986B3] text-[#050506] font-semibold shadow'
                    : 'text-[#9CA3AF] hover:text-white'
                }`}
              >
                Interactive Strip
              </button>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-full text-[10px] font-sans tracking-wider uppercase transition-all duration-200 ${
                  viewMode === 'grid'
                    ? 'bg-[#C2A878] text-[#050506] font-semibold shadow'
                    : 'text-[#9CA3AF] hover:text-white'
                }`}
              >
                Card Grid
              </button>
            </div>
          </div>
        </div>

        {/* ── MODE 1: EXPANDING ACCORDION STRIP (Uiverse Inspiration Adapted to Brand) ── */}
        {viewMode === 'accordion' ? (
          <div className="w-full">
            {/* Desktop Horizontal Accordion (hidden on small mobile) */}
            <div className="hidden md:flex w-full h-[480px] gap-3.5 select-none">
              {displayProjects.map((project, idx) => {
                const isExpanded = activeId === project.id;
                const isGold = idx % 2 === 1;

                return (
                  <div
                    key={project.id}
                    onMouseEnter={() => setActiveId(project.id)}
                    onClick={() => setActiveId(project.id)}
                    className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] border ${
                      isExpanded
                        ? isGold
                          ? 'flex-[3.5] border-[#C2A878]/60 shadow-2xl shadow-black/80'
                          : 'flex-[3.5] border-[#9986B3]/60 shadow-2xl shadow-black/80'
                        : 'flex-1 border-white/[0.07] hover:border-white/20 bg-[#0A0A0C]'
                    }`}
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <img
                        src={project.image}
                        alt={`${project.name} preview`}
                        className={`w-full h-full object-cover object-top transition-transform duration-700 ease-out ${
                          isExpanded ? 'scale-100' : 'scale-110 filter brightness-[0.35] grayscale-[30%]'
                        }`}
                      />
                      {/* Gradient Vignette Overlay for Readability */}
                      <div
                        className={`absolute inset-0 transition-opacity duration-500 ${
                          isExpanded
                            ? 'bg-gradient-to-t from-[#050506] via-[#050506]/75 to-transparent opacity-95'
                            : 'bg-[#050506]/65'
                        }`}
                      />
                    </div>

                    {/* Collapsed Vertical Title State */}
                    <div
                      className={`absolute inset-0 flex flex-col justify-between items-center py-8 px-2 transition-opacity duration-300 pointer-events-none ${
                        isExpanded ? 'opacity-0 invisible' : 'opacity-100 visible'
                      }`}
                    >
                      <span className="font-mono text-xs text-[#9CA3AF]/60">0{idx + 1}</span>
                      <div className="h-full flex items-center justify-center">
                        <span className="font-serif text-sm tracking-[0.22em] uppercase text-[#FDFCFB]/80 -rotate-90 whitespace-nowrap">
                          {project.name}
                        </span>
                      </div>
                      <div
                        className={`w-2 h-2 rounded-full ${
                          project.isLive
                            ? 'bg-emerald-400'
                            : project.isPrivate
                            ? 'bg-[#9986B3]'
                            : 'bg-[#C2A878]'
                        }`}
                      />
                    </div>

                    {/* Expanded Content View */}
                    <div
                      className={`relative z-10 h-full p-8 flex flex-col justify-between transition-all duration-500 ${
                        isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
                      }`}
                    >
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-sans text-[11px] uppercase tracking-[0.22em] text-[#9986B3] font-medium">
                          {project.category}
                        </span>

                        <div className="flex items-center gap-2">
                          {project.isLive ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-sans tracking-wider uppercase font-medium bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                              Live Client
                            </span>
                          ) : project.isPrivate ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-sans tracking-wider uppercase font-medium bg-indigo-950/80 text-[#B4A2CC] border border-[#9986B3]/40 backdrop-blur-md">
                              <Lock className="w-3 h-3 text-[#9986B3]" />
                              Private System
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-sans tracking-wider uppercase font-medium bg-amber-950/80 text-[#C2A878] border border-[#C2A878]/40 backdrop-blur-md">
                              <Clock className="w-3 h-3 text-[#C2A878]" />
                              Under Review
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Bottom Info & CTAs */}
                      <div className="max-w-xl">
                        <h3 className="font-serif text-3xl sm:text-4xl text-[#FDFCFB] mb-3 leading-tight">
                          {project.name}
                        </h3>

                        <p className="font-sans text-xs sm:text-sm text-[#9CA3AF] leading-relaxed mb-6">
                          {project.description}
                        </p>

                        <div className="flex items-center gap-4">
                          {project.isPrivate ? (
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.03] text-[#9CA3AF] text-xs font-sans tracking-wider uppercase">
                              <Lock className="w-3.5 h-3.5 text-[#9986B3]" />
                              <span>Internal Business Tool (Confidential)</span>
                            </div>
                          ) : (
                            <a
                              href={project.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FDFCFB] text-[#050506] hover:bg-[#9986B3] hover:text-[#050506] font-sans text-xs tracking-[0.16em] uppercase font-semibold transition-all duration-300 group shadow-lg"
                            >
                              <span>{project.isLive ? 'Visit Live Website' : 'Open Preview Link'}</span>
                              <ExternalLink className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </a>
                          )}

                          {project.tag && (
                            <span className="font-sans text-[11px] text-[#9CA3AF]/60 tracking-wider">
                              {project.tag}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile Vertical Accordion (< 768px) */}
            <div className="flex md:hidden flex-col gap-3.5">
              {displayProjects.map((project, idx) => {
                const isExpanded = activeId === project.id;

                return (
                  <div
                    key={project.id}
                    onClick={() => setActiveId(isExpanded ? '' : project.id)}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isExpanded
                        ? 'border-[#9986B3]/60 bg-[#0A0A0C] shadow-xl'
                        : 'border-white/[0.08] bg-[#0A0A0C]/70'
                    }`}
                  >
                    {/* Collapsed Header Bar */}
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-[#9CA3AF]/60">0{idx + 1}</span>
                        <div>
                          <h4 className="font-serif text-base text-[#FDFCFB]">{project.name}</h4>
                          <span className="font-sans text-[10px] uppercase tracking-wider text-[#9986B3]">
                            {project.category}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {project.isLive && (
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        )}
                        {project.isPrivate && (
                          <Lock className="w-3.5 h-3.5 text-[#9986B3]" />
                        )}
                        {!project.isLive && !project.isPrivate && (
                          <Clock className="w-3.5 h-3.5 text-[#C2A878]" />
                        )}
                        <ChevronDown
                          className={`w-4 h-4 text-[#9CA3AF] transition-transform duration-300 ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                    </div>

                    {/* Expanded Mobile Body */}
                    {isExpanded && (
                      <div className="px-4 pb-5 pt-1 border-t border-white/[0.05] animate-in fade-in duration-300">
                        <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-4 border border-white/10">
                          <img
                            src={project.image}
                            alt={`${project.name} preview`}
                            className="w-full h-full object-cover object-top"
                          />
                        </div>

                        <p className="font-sans text-xs text-[#9CA3AF] leading-relaxed mb-4">
                          {project.description}
                        </p>

                        {project.isPrivate ? (
                          <div className="flex items-center gap-2 text-xs font-sans text-[#9986B3]">
                            <Lock className="w-3.5 h-3.5" />
                            <span>Private System (Screenshots for showcase only)</span>
                          </div>
                        ) : (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-[#FDFCFB] text-[#050506] font-sans text-xs tracking-wider uppercase font-semibold"
                          >
                            <span>{project.isLive ? 'Visit Live Website' : 'Open Preview'}</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* ── MODE 2: STANDARD CARD GRID ── */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {displayProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}

        {/* Expand / Show More Toggle */}
        <div className="mt-12 sm:mt-14 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 bg-[#0A0A0C] hover:border-[#9986B3] text-[#FDFCFB] font-sans text-xs tracking-[0.18em] uppercase hover:text-[#9986B3] transition-all duration-300 shadow-md group"
            aria-expanded={showAll}
          >
            <span>{showAll ? 'Show Fewer Projects' : 'View All Projects'}</span>
            {showAll ? (
              <ChevronUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
            ) : (
              <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
