import React from 'react';
import { Mail } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';
import { SectionId } from '../types';

const Contact: React.FC = () => {
  return (
    <section id={SectionId.CONTACT} className="py-24 relative mt-12">
      {/* Light gradient coming up from bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-100/80 to-transparent -z-10"></div>

      <div className="container mx-auto px-6 text-center">
        <div className="glass-card-strong max-w-4xl mx-auto rounded-[3rem] p-12 md:p-20 shadow-[0_30px_60px_-12px_rgba(50,50,93,0.1)] border border-white/80">
            <h2 className="text-4xl md:text-7xl font-serif font-bold mb-8 text-text-primary">
            让我们开始<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">新的对话</span>
            </h2>
            
            <p className="text-text-secondary mb-12 max-w-xl mx-auto font-light text-lg">
            无论是一个新的项目构想，还是仅仅想打个招呼，我随时欢迎你的来信。
            </p>

            <a 
            href="mailto:hello@example.com" 
            className="inline-flex items-center gap-4 text-2xl md:text-4xl font-serif text-text-primary hover:text-accent transition-colors border-b-2 border-transparent hover:border-accent/50 pb-2 mb-16"
            >
            <Mail className="w-8 h-8 md:w-10 md:h-10" />
            <span>hello@portfolio.com</span>
            </a>

            <div className="flex justify-center gap-6 mb-16">
            {SOCIAL_LINKS.map((link) => (
                <a 
                key={link.name} 
                href={link.url}
                className="w-14 h-14 rounded-full glass-card bg-white/40 flex items-center justify-center text-text-primary hover:text-white hover:bg-accent hover:scale-110 transform transition-all duration-300 shadow-md border border-white"
                >
                <span className="text-xs uppercase font-bold tracking-widest">{link.name[0]}</span>
                </a>
            ))}
            </div>

            <div className="pt-10 border-t border-gray-300/50 flex flex-col md:flex-row justify-between items-center text-xs text-text-secondary uppercase tracking-widest font-semibold">
            <p>© 2025 Liu Portfolio. All rights reserved.</p>
            <p className="mt-4 md:mt-0 opacity-70">Designed with Liquid Glass UI</p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;