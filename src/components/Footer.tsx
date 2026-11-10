import React from 'react';
import { Logo } from './Logo';

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/sdwebstudio' },
  { label: 'GitHub', href: 'https://github.com/sundar-codes' },
  { label: 'WhatsApp', href: 'https://wa.me/7904140120' },
  { label: 'Email', href: 'mailto:sundaresan.codes@gmail.com' },
];

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.05] bg-[#050506] py-10 sm:py-12 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8 text-center sm:text-left">
        {/* Brand & Location */}
        <div className="flex items-center gap-3">
          <Logo size="sm" />
          <div className="flex flex-col">
            <span className="font-serif text-sm tracking-wider text-[#FDFCFB] font-medium">
              SD Web Studio
            </span>
            <span className="font-sans text-[11px] text-[#9CA3AF] tracking-wider">
              Coimbatore, India • © {currentYear}
            </span>
          </div>
        </div>

        {/* Contact Links */}
        <nav aria-label="Social and direct links" className="flex flex-wrap justify-center gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('mailto:') ? undefined : '_blank'}
              rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
              className="font-sans text-[11px] uppercase tracking-[0.18em] text-[#9CA3AF] hover:text-[#9986B3] transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
};
