import React from 'react';
import { Mail } from 'lucide-react';
import { SOCIAL_LINKS as DEFAULT_SOCIAL_LINKS } from '../constants';
import { SectionId } from '../types';
import { useData } from '../context/DataContext';

const Contact: React.FC = () => {
  const { data } = useData();
  const contact = data?.contact;
  const socialLinks = data?.socialLinks || DEFAULT_SOCIAL_LINKS;
  const titlePrefix = contact?.titlePrefix || '让我们开始';
  const titleHighlight = contact?.titleHighlight || '新的对话';
  const message = contact?.message || '无论是一个新的项目构想，还是仅仅想打个招呼，我随时欢迎你的来信。';
  const emailAddress = contact?.emailAddress || 'hello@example.com';
  const emailText = contact?.emailText || 'hello@portfolio.com';
  const footerLeft = contact?.footerLeft || '© 2025 刘的作品集. 保留所有权利。';
  const footerRight = contact?.footerRight || '使用液态玻璃 UI 设计';

  return (
    <section id={SectionId.CONTACT} className="py-24 relative mt-12 snap-start scroll-mt-28 md:scroll-mt-32">
      {/* Light gradient coming up from bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-100/80 to-transparent -z-10"></div>

      <div className="container mx-auto px-6 text-center">
        <div className="glass-card-strong max-w-4xl mx-auto rounded-[3rem] p-12 md:p-20 shadow-[0_30px_60px_-12px_rgba(50,50,93,0.1)] border border-white/80">
            <h2 className="text-4xl md:text-7xl font-serif font-bold mb-8 text-text-primary">
            {titlePrefix}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">{titleHighlight}</span>
            </h2>
            
            <p className="text-text-secondary mb-12 max-w-xl mx-auto font-light text-lg">
            {message}
            </p>

            <a 
            href={`mailto:${emailAddress}`} 
            className="inline-flex items-center gap-4 text-2xl md:text-4xl font-serif text-text-primary hover:text-accent transition-colors border-b-2 border-transparent hover:border-accent/50 pb-2 mb-16"
            >
            <Mail className="w-8 h-8 md:w-10 md:h-10" />
            <span>{emailText}</span>
            </a>

            <div className="flex justify-center gap-6 mb-16">
            {socialLinks.map((link) => (
                <a 
                key={link.name} 
                href={link.url}
                className="w-14 h-14 rounded-full glass-card bg-white/40 flex items-center justify-center text-text-primary hover:text-white hover:bg-accent hover:scale-110 transform transition-all duration-300 shadow-md border border-white"
                >
                <img src={`/${link.icon}`} alt={link.name} className="w-6 h-6" />
                </a>
            ))}
            </div>

            <div className="pt-10 border-t border-gray-300/50 flex flex-col md:flex-row justify-between items-center text-xs text-text-secondary uppercase tracking-widest font-semibold">
            <p>{footerLeft}</p>
            <p className="mt-4 md:mt-0 opacity-70">{footerRight}</p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
