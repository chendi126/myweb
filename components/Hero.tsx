import React from 'react';
import { Cpu, Zap, Activity } from 'lucide-react';
import { SectionId } from '../types';

const Hero: React.FC = () => {
  const scrollToWork = () => {
    const element = document.getElementById(SectionId.WORK);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id={SectionId.HERO} className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      
      {/* Decorative Technical Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-200 to-transparent opacity-50"></div>
        <div className="absolute top-[80%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-200 to-transparent opacity-50"></div>
        <div className="absolute left-[10%] top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-blue-200 to-transparent opacity-30"></div>
        <div className="absolute right-[10%] top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-blue-200 to-transparent opacity-30"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        
        {/* Status Badge */}
        <div className="inline-flex items-center gap-3 mb-10 super-glass px-5 py-2 rounded-full animate-[fadeIn_1s_ease-out] backdrop-blur-xl border-white/40">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </div>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-text-secondary font-bold">
              System Online v2.5
            </span>
        </div>
        
        {/* Main Title - Huge & Clean */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-sans font-black mb-6 leading-[0.9] text-text-primary tracking-tight animate-[slideUp_0.8s_ease-out_0.2s_both]">
          <span className="block chromatic-text">HARDWARE</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-600 relative z-10 filter drop-shadow-sm">
            & SOFTWARE
          </span>
        </h1>
        
        {/* Subtitle / Engineer Statement */}
        <div className="max-w-3xl mx-auto mb-16 animate-[slideUp_0.8s_ease-out_0.4s_both]">
           <div className="relative">
             {/* Tech decoration */}
             <div className="absolute -left-4 top-0 text-accent/30 hidden md:block"><Cpu size={24} /></div>
             <div className="absolute -right-4 bottom-0 text-accent/30 hidden md:block"><Activity size={24} /></div>
             
             <p className="text-text-secondary text-lg md:text-2xl font-light leading-relaxed px-4 md:px-0">
               融合 <span className="font-mono font-bold text-accent bg-blue-50 px-1 rounded">嵌入式逻辑</span> 与 <span className="font-mono font-bold text-purple-600 bg-purple-50 px-1 rounded">现代交互</span> 的全栈工程师。<br className="hidden md:block"/>
               我将冰冷的硅片转化为有温度的数字体验。
             </p>
           </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center gap-6 animate-[fadeIn_1s_ease-out_0.8s_both]">
            <button 
              onClick={scrollToWork}
              className="group relative px-8 py-4 bg-text-primary text-white rounded-full font-bold tracking-widest uppercase overflow-hidden shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
            >
              <span className="relative z-10 flex items-center gap-2">
                浏览作品 <Zap size={16} className="group-hover:text-yellow-300 transition-colors" />
              </span>
              <div className="absolute inset-0 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
            </button>
            
            <button className="px-8 py-4 super-glass rounded-full font-bold tracking-widest uppercase text-text-primary hover:bg-white transition-all">
              下载简历
            </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;