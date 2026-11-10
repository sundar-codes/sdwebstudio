import React, { useState } from 'react';
import { ArrowUpRight, ExternalLink, Lock } from 'lucide-react';
import { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [imgError, setImgError] = useState(false);

  const cardContent = (
    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#060608] border-b border-white/[0.05]">
      {!imgError && project.image ? (
        <img
          src={project.image}
          alt={`${project.name} website preview`}
          loading="lazy"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0A0A0C] via-[#100f14] to-[#0A0A0C] p-6 text-center">
          <span className="font-serif text-3xl font-medium text-[#9986B3]/60 mb-2">
            {project.name.charAt(0)}
          </span>
          <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#9CA3AF]/60">
            {project.category}
          </span>
        </div>
      )}

      {/* Dark Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-transparent to-black/20 opacity-40 group-hover:opacity-20 transition-opacity duration-300" />

      {/* Live / Status Pill */}
      <div className="absolute top-3 left-3 flex items-center gap-1.5">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-sans tracking-wider uppercase font-medium backdrop-blur-md border ${
            project.isLive
              ? 'bg-emerald-950/70 text-emerald-300 border-emerald-500/30'
              : project.isPrivate
              ? 'bg-indigo-950/70 text-[#B4A2CC] border-[#9986B3]/40'
              : 'bg-amber-950/70 text-[#C2A878] border-[#C2A878]/30'
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              project.isLive
                ? 'bg-emerald-400 animate-pulse'
                : project.isPrivate
                ? 'bg-[#9986B3]'
                : 'bg-[#C2A878]'
            }`}
          />
          {project.tag || (project.isLive ? 'Live Site' : 'Preview')}
        </span>
      </div>

      {/* External Link or Lock Icon */}
      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#050506]/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-[#FDFCFB] group-hover:border-[#9986B3] group-hover:text-[#9986B3] transition-colors duration-300">
        {project.isPrivate ? (
          <Lock className="w-3.5 h-3.5 text-[#9986B3]" />
        ) : (
          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        )}
      </div>
    </div>
  );

  const cardBody = (
    <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#9986B3] font-medium">
            {project.category}
          </span>
          {project.statusNote && (
            <span className="font-sans text-[10px] text-[#9CA3AF]/60 tracking-wider">
              {project.statusNote}
            </span>
          )}
        </div>

        <h3 className="font-serif text-xl sm:text-2xl text-[#FDFCFB] font-medium mb-2 group-hover:text-[#FDFCFB] transition-colors">
          {project.name}
        </h3>

        <p className="font-sans text-xs text-[#9CA3AF] leading-relaxed line-clamp-2">
          {project.description}
        </p>
      </div>

      <div className="mt-5 pt-3 border-t border-white/[0.04] flex items-center justify-between text-[#C2A878] group-hover:text-[#FDFCFB] transition-colors">
        <span className="font-sans text-[11px] tracking-[0.16em] uppercase">
          {project.isPrivate
            ? 'Private System (Showcase)'
            : project.isLive
            ? 'Visit Live Website'
            : 'Open Preview'}
        </span>
        {project.isPrivate ? (
          <Lock className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
        ) : (
          <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
        )}
      </div>
    </div>
  );

  if (project.isPrivate) {
    return (
      <div className="group relative flex flex-col bg-[#0A0A0C] border border-white/[0.07] hover:border-white/20 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/60 cursor-default">
        {cardContent}
        {cardBody}
      </div>
    );
  }

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col bg-[#0A0A0C] border border-white/[0.07] hover:border-white/20 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/60 focus-visible:ring-2 focus-visible:ring-[#9986B3]"
    >
      {cardContent}
      {cardBody}
    </a>
  );
};
