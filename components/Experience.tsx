import React from 'react';
import { EXPERIENCES as DEFAULT_EXPERIENCES } from '../constants';
import { SectionId } from '../types';
import { Radio } from 'lucide-react';
import { useData } from '../context/DataContext';

const Experience: React.FC = () => {
  const { data } = useData();
  const experiences = data?.experiences || DEFAULT_EXPERIENCES;

  return (
    <section id={SectionId.EXPERIENCE} className="py-32 relative overflow-hidden snap-start scroll-mt-28 md:scroll-mt-32">
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-24 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/50 border border-blue-200 text-blue-700 text-xs font-mono mb-4">
                <Radio size={14} className="animate-pulse" />
                <span>信号追踪</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-sans font-black text-text-primary mb-4">
              职业轨迹
            </h2>
            <p className="text-text-secondary font-mono text-sm max-w-md">
              &gt;&gt; 正在初始化时间序列追踪...<br/>
              &gt;&gt; /var/log/career_history
            </p>
        </div>
        
        {/* Timeline Container */}
        <div className="relative">
          
          {/* Central Circuit Line (Desktop) */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-400 via-purple-400 to-transparent md:-translate-x-1/2 opacity-30"></div>

          <div className="space-y-20">
            {experiences.map((exp, index) => {
               const isEven = index % 2 === 0;
               return (
                <div key={exp.id} className={`flex flex-col md:flex-row gap-8 md:gap-0 items-center relative ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  
                  {/* Timeline Node (Center) */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full border-[3px] border-white bg-accent shadow-[0_0_20px_rgba(0,122,255,0.6)] z-20 md:-translate-x-1/2 flex items-center justify-center">
                      <div className="absolute w-8 h-8 rounded-full border border-blue-400/40 animate-ping"></div>
                  </div>

                  {/* Content Card Side */}
                  <div className={`w-full md:w-1/2 pl-24 md:pl-0 ${isEven ? 'md:pr-20 md:text-right' : 'md:pl-20 md:text-left'}`}>
                      <div className="group relative">
                          {/* Connector Line (Horizontal) */}
                          <div className={`absolute top-8 h-[1px] bg-blue-300/40 w-20 hidden md:block
                              ${isEven ? '-right-20' : '-left-20'}
                          `}></div>

                          {/* Connector Dot at card edge */}
                           <div className={`absolute top-8 w-1.5 h-1.5 rounded-full bg-blue-300 hidden md:block
                              ${isEven ? '-right-[1px]' : '-left-[1px]'}
                          `}></div>

                          {/* Glass Card */}
                          <div className="super-glass p-8 rounded-2xl border border-white/60 hover:border-blue-400/50 transition-all duration-300 hover:bg-white/50 backdrop-blur-xl group-hover:-translate-y-1">
                              <div className={`flex flex-col gap-2 ${isEven ? 'md:items-end' : 'md:items-start'}`}>
                                  <span className="font-mono text-xs font-bold text-accent px-2 py-1 bg-blue-50/80 rounded border border-blue-100 w-fit">
                                    {exp.period}
                                  </span>
                                  <h3 className="text-xl font-bold text-text-primary mt-2 group-hover:text-accent transition-colors">
                                      {exp.role}
                                  </h3>
                                  <h4 className="text-lg text-text-secondary font-medium">
                                      @{exp.company}
                                  </h4>
                                  <p className="text-text-secondary text-sm leading-relaxed mt-2 opacity-80">
                                      {exp.description}
                                  </p>
                              </div>
                          </div>
                      </div>
                  </div>

                  {/* Empty Side for layout balance (Desktop) */}
                  <div className="hidden md:block w-1/2"></div>
                </div>
               );
            })}
          </div>

          {/* End Node */}
          <div className="absolute left-8 md:left-1/2 bottom-0 w-3 h-3 rounded-full bg-slate-300 md:-translate-x-1/2"></div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
