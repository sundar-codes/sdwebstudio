import React from 'react';
import { Instagram, Github, Mail, MessageCircle } from 'lucide-react';
import { Logo } from './Logo';

const socialLinks = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/sdwebstudio',
    icon: Instagram,
    hoverColor: 'hover:text-[#E1306C] hover:border-[#E1306C]/40 hover:bg-[#E1306C]/10',
    accent: '#E1306C',
  },
  {
    name: 'GitHub',
    href: 'https://github.com/sundar-codes',
    icon: Github,
    hoverColor: 'hover:text-[#FDFCFB] hover:border-white/30 hover:bg-white/10',
    accent: '#FDFCFB',
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/7904140120',
    icon: MessageCircle,
    hoverColor: 'hover:text-[#25D366] hover:border-[#25D366]/40 hover:bg-[#25D366]/10',
    accent: '#25D366',
  },
  {
    name: 'Email',
    href: 'mailto:sundaresan.codes@gmail.com',
    icon: Mail,
    hoverColor: 'hover:text-[#9986B3] hover:border-[#9986B3]/40 hover:bg-[#9986B3]/10',
    accent: '#9986B3',
  },
];

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.05] bg-[#050506] py-10 sm:py-12 px-5 sm:px-8 relative select-none">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8 text-center sm:text-left">
        {/* Brand & Location */}
        <div className="flex items-center gap-3.5">
          <Logo size="sm" />
          <div className="flex flex-col text-left">
            <span className="font-serif text-sm tracking-wider text-[#FDFCFB] font-medium">
              SD Web Studio
            </span>
            <span className="font-sans text-[11px] text-[#9CA3AF] tracking-wider">
              Coimbatore, India • © {currentYear}
            </span>
          </div>
        </div>

        {/* Social & Contact Icon Buttons */}
        <div className="flex items-center gap-3">
          {socialLinks.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.href}
                target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                rel={item.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                aria-label={`Connect on ${item.name}`}
                title={item.name}
                className={`w-10 h-10 rounded-full bg-[#0A0A0C] border border-white/[0.08] flex items-center justify-center text-[#9CA3AF] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg ${item.hoverColor}`}
              >
                <Icon className="w-4 h-4" />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
};
