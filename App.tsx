import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Experience from './components/Experience';
import Contact from './components/Contact';

const App: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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
      
      {/* --- LAYER 5: NOISE OVERLAY (Texture) --- */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.35] z-[100] mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>
    </div>
  );
};

export default App;