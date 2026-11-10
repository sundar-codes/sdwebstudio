import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { projects } from '../data/projects';
import { ProjectCard } from './ProjectCard';

export const SelectedWork: React.FC = () => {
  const [showAll, setShowAll] = useState(false);

  const featuredProjects = projects.filter((p) => p.featured);
  const additionalProjects = projects.filter((p) => !p.featured);

  return (
    <section id="work" className="py-20 sm:py-28 px-5 sm:px-8 border-t border-white/[0.05] relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#C2A878] mb-2.5 font-medium">
              Portfolio
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#FDFCFB]">
              Selected <span className="text-[#9986B3] italic font-normal">work.</span>
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-[#9CA3AF] max-w-sm leading-relaxed">
            Real websites built for real businesses. Click any project to open the live application.
          </p>
        </div>

        {/* Featured Projects Grid (3 columns on desktop, 1 on mobile, 2 on tablet) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Expandable Additional Projects Grid */}
        {additionalProjects.length > 0 && (
          <>
            {showAll && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 mt-6 sm:mt-7 animate-in fade-in duration-500">
                {additionalProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}

            {/* Toggle Expansion CTA */}
            <div className="mt-12 sm:mt-14 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAll(!showAll)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 bg-[#0A0A0C] hover:border-[#9986B3] text-[#FDFCFB] font-sans text-xs tracking-[0.18em] uppercase hover:text-[#9986B3] transition-all duration-300 shadow-md group"
                aria-expanded={showAll}
              >
                <span>{showAll ? 'Show Less' : 'View All Projects'}</span>
                {showAll ? (
                  <ChevronUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
                ) : (
                  <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
