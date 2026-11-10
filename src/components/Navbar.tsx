import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Logo } from './Logo';

const navItems = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (href === '#' || href === '#top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 sm:pt-5 px-4 pointer-events-none">
        <nav
          aria-label="Main navigation"
          className={`pointer-events-auto w-full max-w-5xl rounded-full border px-4 sm:px-6 py-2.5 sm:py-3 transition-all duration-300 flex items-center justify-between shadow-2xl ${
            scrolled
              ? 'bg-[#0A0A0C]/90 backdrop-blur-xl border-white/[0.09] shadow-black/60'
              : 'bg-[#0A0A0C]/65 backdrop-blur-md border-white/[0.06]'
          }`}
        >
          {/* S/D Logo */}
          <a
            href="#top"
            onClick={(e) => handleNavClick(e, '#top')}
            className="group flex items-center gap-2.5 focus-visible:ring-2 focus-visible:ring-[#9986B3] rounded-md"
            aria-label="SD Web Studio - Home"
          >
            <Logo size="sm" showText={true} />
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8 font-sans text-[11px] tracking-[0.2em] uppercase text-[#9CA3AF]">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="hover:text-[#FDFCFB] transition-colors duration-200 py-1 relative group focus-visible:text-[#FDFCFB]"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#9986B3] transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#C2A878]/40 bg-[#C2A878]/10 text-[#C2A878] font-sans text-[11px] tracking-[0.16em] uppercase hover:bg-[#C2A878] hover:text-[#050506] transition-all duration-300 group"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-[#FDFCFB]/80 hover:text-[#FDFCFB] focus-visible:ring-2 focus-visible:ring-[#9986B3]"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-dialog"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Overlay Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-dialog"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 z-40 bg-[#050506]/95 backdrop-blur-2xl flex flex-col justify-between p-6 pt-24 md:hidden animate-in fade-in duration-200"
        >
          <div className="flex flex-col gap-6 items-center text-center mt-6">
            <div className="mb-2">
              <Logo size="lg" showText={false} />
            </div>

            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="font-serif text-2xl text-[#FDFCFB] hover:text-[#9986B3] transition-colors py-2 tracking-wide"
              >
                {item.label}
              </a>
            ))}

            <div className="w-12 h-px bg-white/10 my-2" />

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="w-full max-w-xs flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-[#C2A878] bg-[#C2A878] text-[#050506] font-sans text-xs tracking-[0.2em] uppercase font-semibold hover:bg-transparent hover:text-[#C2A878] transition-all"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <div className="text-center font-sans text-[10px] tracking-[0.2em] text-[#9CA3AF]/60 uppercase pb-4">
            Coimbatore, India • SD Web Studio
          </div>
        </div>
      )}
    </>
  );
};
