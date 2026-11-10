import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { Services } from '../components/Services';
import { SelectedWork } from '../components/SelectedWork';
import { Process } from '../components/Process';
import { ContactForm } from '../components/ContactForm';
import { Footer } from '../components/Footer';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#050506] text-[#FDFCFB]">
      {/* Floating Header */}
      <Navbar />

      {/* Main Content Sections */}
      <main id="main-content" className="flex-1">
        <Hero />
        <Services />
        <SelectedWork />
        <Process />
        <ContactForm />
      </main>

      {/* Compact Footer */}
      <Footer />
    </div>
  );
};
