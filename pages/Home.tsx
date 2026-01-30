import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Portfolio from '../components/Portfolio';
import About from '../components/About';
import Experience from '../components/Experience';
import Contact from '../components/Contact';
import { SectionId } from '../types';

const Home: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isPaging, setIsPaging] = useState(false);
  const isPagingRef = useRef(false);

  // Parallax effect for the background blobs
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 20 - 10,
        y: (e.clientY / window.innerHeight) * 20 - 10,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
    const sectionOrder = [SectionId.HERO, SectionId.WORK, SectionId.ABOUT, SectionId.EXPERIENCE, SectionId.CONTACT];

    const getActiveSectionIndex = () => {
      const referenceY = window.scrollY + window.innerHeight * 0.25;
      let bestIndex = 0;
      let bestTop = -Infinity;
      for (let i = 0; i < sectionOrder.length; i++) {
        const el = document.getElementById(sectionOrder[i]);
        if (!el) continue;
        const top = el.offsetTop;
        if (top <= referenceY && top >= bestTop) {
          bestTop = top;
          bestIndex = i;
        }
      }
      return bestIndex;
    };

    const scrollToIndex = (index: number) => {
      const id = sectionOrder[index];
      const el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const shouldIgnoreEventTarget = (target: EventTarget | null) => {
      const el = target as HTMLElement | null;
      if (!el) return false;
      return Boolean(el.closest('input, textarea, select, [contenteditable="true"]'));
    };

    const handleWheel = (e: WheelEvent) => {
      if (prefersReducedMotion) return;
      if (window.innerWidth < 768) return;
      if (e.ctrlKey) return;
      if (shouldIgnoreEventTarget(e.target)) return;
      if (isPagingRef.current) return;

      const delta = e.deltaY;
      if (Math.abs(delta) < 8) return;

      const index = getActiveSectionIndex();
      const currentEl = document.getElementById(sectionOrder[index]);
      if (!currentEl) return;

      const top = currentEl.offsetTop;
      const bottom = top + currentEl.offsetHeight;
      const y = window.scrollY;
      const viewportBottom = y + window.innerHeight;

      if (delta > 0) {
        if (viewportBottom < bottom - 8) return;
      } else {
        if (y > top + 8) return;
      }

      const nextIndex = delta > 0 ? Math.min(index + 1, sectionOrder.length - 1) : Math.max(index - 1, 0);
      if (nextIndex === index) return;

      e.preventDefault();
      isPagingRef.current = true;
      setIsPaging(true);
      scrollToIndex(nextIndex);
      window.setTimeout(() => {
        isPagingRef.current = false;
        setIsPaging(false);
      }, 750);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (prefersReducedMotion) return;
      if (window.innerWidth < 768) return;
      if (shouldIgnoreEventTarget(e.target)) return;
      if (isPagingRef.current) return;

      const isDown = e.key === 'PageDown' || e.key === 'ArrowDown' || e.key === ' ';
      const isUp = e.key === 'PageUp' || e.key === 'ArrowUp';
      if (!isDown && !isUp) return;

      const index = getActiveSectionIndex();
      const nextIndex = isDown ? Math.min(index + 1, sectionOrder.length - 1) : Math.max(index - 1, 0);
      if (nextIndex === index) return;

      e.preventDefault();
      isPagingRef.current = true;
      setIsPaging(true);
      scrollToIndex(nextIndex);
      window.setTimeout(() => {
        isPagingRef.current = false;
        setIsPaging(false);
      }, 750);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('wheel', handleWheel as any);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    // Base: Pale Blue with Engineering Grid
    <div className="min-h-screen bg-[#F0F5FF] text-text-primary selection:bg-accent selection:text-white relative overflow-hidden font-sans">
      
      {/* --- LAYER 1: ENGINEERING GRID --- */}
      <div className="fixed inset-0 bg-grid-pattern opacity-[0.6] pointer-events-none z-0"></div>

      {/* --- LAYER 2: THE SUN (Dynamic & Rotating) --- */}
      <div className="fixed -top-[20vw] -right-[20vw] pointer-events-none z-0">
        {/* Core Sun */}
        <div className="absolute top-[20vw] right-[20vw] w-[30vw] h-[30vw] bg-white rounded-full blur-[60px] opacity-100 shadow-[0_0_100px_rgba(255,200,100,0.3)]"></div>
        
        {/* Rotating Rays */}
        <div className="absolute top-[5vw] right-[5vw] w-[60vw] h-[60vw] animate-ray-rotate opacity-40">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent blur-xl"></div>
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-full bg-gradient-to-b from-transparent via-white to-transparent blur-xl"></div>
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent blur-xl rotate-45"></div>
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-full bg-gradient-to-b from-transparent via-white to-transparent blur-xl rotate-45"></div>
        </div>
        
        {/* Warm Halo */}
        <div className="absolute top-0 right-0 w-[80vw] h-[80vw] bg-gradient-to-bl from-orange-100/40 via-blue-100/10 to-transparent blur-[100px] rounded-full mix-blend-screen"></div>
      </div>

      {/* --- LAYER 3: FLUID BLOBS (Parallax) --- */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div 
            className="absolute top-[20%] left-[10%] w-[35rem] h-[35rem] bg-blue-300/20 rounded-full mix-blend-multiply filter blur-[80px]"
            style={{ transform: `translate(${mousePos.x * -1}px, ${mousePos.y * -1}px)` }}
          ></div>
          <div 
            className="absolute bottom-[10%] right-[30%] w-[40rem] h-[40rem] bg-indigo-200/20 rounded-full mix-blend-multiply filter blur-[90px]"
            style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
          ></div>
      </div>

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Portfolio />
          <About />
          <Experience />
          <Contact />
        </main>
      </div>

      <div className={`fixed inset-0 pointer-events-none z-[80] transition-opacity duration-500 ${isPaging ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/50 to-white/0 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.55),rgba(255,255,255,0)_55%)]"></div>
      </div>
      
      {/* --- LAYER 5: NOISE OVERLAY (Texture) --- */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.35] z-[100] mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>
    </div>
  );
};

export default Home;
