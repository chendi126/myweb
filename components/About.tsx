import React from 'react';
import { SectionId } from '../types';

const About: React.FC = () => {
  return (
    <section id={SectionId.ABOUT} className="py-32 relative overflow-hidden">
      {/* Skewed Background Pane */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[70%] bg-gradient-to-r from-white/40 to-transparent -z-10 transform -skew-y-3 backdrop-blur-sm"></div>

      <div className="container mx-auto px-6">
        <div className="glass-card rounded-[3rem] p-8 md:p-16 flex flex-col lg:flex-row gap-16 items-center shadow-2xl border border-white/70 relative">
          
          {/* Decorative floating balls */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-100 rounded-full blur-2xl opacity-60 z-0"></div>
          
          <div className="w-full lg:w-1/2 relative z-10">
             <div className="aspect-[3/4] overflow-hidden rounded-2xl relative shadow-2xl rotate-[-3deg] hover:rotate-0 transition-transform duration-500 border-4 border-white/50">
                <img 
                  src="https://picsum.photos/600/800?grayscale" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
                {/* Sun flare on image */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/40 blur-3xl rounded-full pointer-events-none"></div>
             </div>
          </div>
          
          <div className="w-full lg:w-1/2 relative z-10">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 text-text-primary">
              设计不仅仅是<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500">视觉的呈现</span>
            </h2>
            
            <div className="space-y-6 text-text-secondary leading-relaxed font-light text-lg">
              <p>
                我是一名拥有多年经验的多学科设计师与开发者。我的工作哲学建立在对细节的极致追求之上。我认为，优秀的数字产品应当像一件精美的艺术品，既要有视觉上的震撼，也要有功能上的深思熟虑。
              </p>
              <p>
                从品牌策略到即时交互，我热衷于在每一个触点上创造价值。我擅长使用 React, TypeScript, WebGL 等现代技术栈，将复杂的设计概念转化为流畅的 web 体验。
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-6">
              <div className="glass-card-strong p-6 rounded-2xl text-center border border-white/60">
                <h4 className="text-accent text-3xl font-serif mb-2 font-bold">30+</h4>
                <p className="text-text-secondary text-sm font-medium uppercase tracking-wider">成功交付项目</p>
              </div>
              <div className="glass-card-strong p-6 rounded-2xl text-center border border-white/60">
                <h4 className="text-accent text-3xl font-serif mb-2 font-bold">5年+</h4>
                <p className="text-text-secondary text-sm font-medium uppercase tracking-wider">行业从业经验</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;