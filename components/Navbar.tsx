import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../constants';
import { SectionId } from '../types';
import { useData } from '../context/DataContext';

const Navbar: React.FC = () => {
  const { data } = useData();
  const navbar = data?.navbar;
  const navLinks = navbar?.navLinks || NAV_LINKS;
  const brandPrefix = navbar?.brandPrefix || 'LIU';
  const brandSuffix = navbar?.brandSuffix || 'ENG';
  const contactButtonText = navbar?.contactButtonText || '联系我';
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: SectionId) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-4 md:top-6 left-1/2 -translate-x-1/2 w-[92%] md:w-auto z-50 transition-all duration-500`}
      >
        <div className={`
          flex items-center gap-8 md:gap-12 px-6 py-3 md:px-8 md:py-4 rounded-full
          transition-all duration-300
          ${isScrolled 
            ? 'super-glass shadow-lg scale-95' 
            : 'bg-white/5 backdrop-blur-sm border border-white/20'
          }
        `}>
          
          <div 
            className="text-xl font-black tracking-tighter cursor-pointer text-text-primary hover:text-accent transition-colors select-none"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            {brandPrefix}<span className="text-accent">.</span>{brandSuffix}
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-xs font-bold uppercase tracking-widest text-text-secondary hover:text-accent transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          {/* Contact Button Desktop */}
          <div className="hidden md:block pl-4 border-l border-gray-300/30">
             <button 
               onClick={() => scrollToSection(SectionId.CONTACT)}
               className="bg-text-primary text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-accent transition-colors"
             >
               {contactButtonText}
             </button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden ml-auto">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-text-primary p-1">
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white/90 backdrop-blur-xl flex items-center justify-center animate-fade-in md:hidden">
          <div className="flex flex-col items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-2xl font-bold text-text-primary hover:text-accent"
              >
                {link.label}
              </button>
            ))}
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="mt-8 w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
