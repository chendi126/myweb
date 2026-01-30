import React from 'react';
import { ArrowUpRight, Cpu, Terminal } from 'lucide-react';
import { PROJECTS } from '../constants';
import { SectionId } from '../types';

const Portfolio: React.FC = () => {
  return (
    <section id={SectionId.WORK} className="py-32 relative">
      {/* Background Tech Elements */}
      <div className="absolute right-0 top-20 opacity-10 pointer-events-none">
        <svg width="400" height="400" viewBox="0 0 100 100">
           <circle cx="50" cy="50" r="40" stroke="black" strokeWidth="0.5" fill="none" />
           <circle cx="50" cy="50" r="30" stroke="black" strokeWidth="0.5" fill="none" strokeDasharray="4 4" />
           <path d="M50 10 L50 90 M10 50 L90 50" stroke="black" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24">
          <div>
            <span className="font-mono text-accent text-sm tracking-widest uppercase mb-2 block">Selected Works</span>
             <h2 className="text-4xl md:text-6xl font-sans font-black text-text-primary tracking-tight">
              工程实验室
            </h2>
          </div>
          <div className="hidden md:block">
            <div className="font-mono text-xs text-text-secondary text-right">
              <p>RENDERING: HIGH_FIDELITY</p>
              <p>REFRACTION: ENABLED</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-32">
          {PROJECTS.map((project, index) => {
            const isEven = index % 2 === 0;
            // Even (0, 2): Image Left (Order 1), Text Right (Order 2)
            // Odd (1, 3): Text Left (Order 1), Image Right (Order 2)
            
            return (
              <div 
                key={project.id}
                className="group relative flex flex-col lg:flex-row items-center"
              >
                {/* --- IMAGE BLOCK --- */}
                {/* Even: Order 1 (Left). Odd: Order 2 (Right). */}
                <div className={`relative w-full lg:w-7/12 h-[400px] md:h-[500px] rounded-[2rem] overflow-hidden shadow-2xl transition-transform duration-700 group-hover:scale-[1.02] z-10 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply transition-opacity group-hover:opacity-0"></div>
                  
                  {/* Overlay Tech Specs */}
                  <div className="absolute bottom-6 left-6 font-mono text-xs text-white/90 bg-black/40 backdrop-blur-md px-3 py-1 rounded border border-white/20">
                    ID: {project.id.padStart(3, '0')} // RES: 4K
                  </div>
                </div>

                {/* --- GLASS CARD INFO --- */}
                {/* Even: Order 2 (Right). Odd: Order 1 (Left). */}
                {/* Use negative margins to pull the card over the image for that "stacked" look */}
                <div className={`relative w-full lg:w-6/12 -mt-10 lg:mt-0 z-20 ${isEven ? 'lg:order-2 lg:-ml-24' : 'lg:order-1 lg:-mr-24'}`}>
                  <div className="super-glass p-8 md:p-12 rounded-[2rem] transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,122,255,0.3)] group-hover:-translate-y-2 border border-white/60 bg-white/10 backdrop-blur-xl">
                     {/* Sheen Effect */}
                     <div className="glass-sheen"></div>

                     <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-accent">
                           {project.category.includes('Hardware') ? <Cpu size={16}/> : <Terminal size={16}/>}
                        </div>
                        <span className="font-mono text-xs font-bold text-accent tracking-widest uppercase">
                          {project.category}
                        </span>
                     </div>

                     <h3 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 leading-tight">
                       {project.title}
                     </h3>
                     
                     <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-8 opacity-90 font-light">
                       {project.description}
                     </p>

                     <div className="flex flex-wrap gap-2 mb-8">
                       {project.tags.map(tag => (
                         <span key={tag} className="px-3 py-1 bg-white/50 border border-white rounded-lg text-xs font-mono text-slate-600 font-semibold shadow-sm">
                           {tag}
                         </span>
                       ))}
                     </div>

                     <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-text-primary border-b-2 border-text-primary pb-1 hover:text-accent hover:border-accent transition-all">
                          View Case Study <ArrowUpRight size={16} />
                        </button>
                     </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;