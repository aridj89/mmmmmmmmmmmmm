import { useTranslation } from 'react-i18next';
import { Sparkles, ArrowDown } from 'lucide-react';

interface HeroProps {
  onViewPortfolio: () => void;
}

export default function Hero({ onViewPortfolio }: HeroProps) {
  const { t } = useTranslation();

  return (
    <section 
      className="relative min-h-[85dvh] flex flex-col justify-center px-6 md:px-16 overflow-hidden border-b border-white/5 bg-black" 
      id="hero-section"
    >
      {/* Dynamic Ambient Blur Core background */}
      <div className="absolute inset-0 z-0 opacity-25">
        <div className="absolute top-1/4 right-[10%] w-[35rem] h-[35rem] bg-[radial-gradient(circle_at_center,_#0071ec_0%,_transparent_65%)] blur-3xl rounded-full"></div>
        <div className="absolute bottom-10 left-[5%] w-[25rem] h-[25rem] bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05)_0%,_transparent_60%)] blur-2xl rounded-full"></div>
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto w-full pt-16 pb-8 space-y-8 flex flex-col items-start text-left">
        
        {/* Big Bold Headline */}
        <h1 className="font-hanken text-3xl sm:text-5xl md:text-7xl font-extrabold text-white leading-[1.05] tracking-tight max-w-5xl inline-flex flex-wrap items-center gap-x-2 sm:gap-x-4 gap-y-1 sm:gap-y-2">
          <span>{t('hero.title_1')}</span>
          <img 
            src="/mv.jpg" 
            alt="Mission Verse Logo" 
            className="h-8 sm:h-16 md:h-20 w-8 sm:w-16 md:w-20 rounded-full object-cover animate-[spin_10s_linear_infinite] border border-white/20 shadow-[0_0_15px_rgba(0,113,236,0.5)]" 
          />
          <span className="text-[#0071ec]">{t('hero.title_highlight')}</span> 
          <span>{t('hero.title_2')}</span>
        </h1>

        {/* High-Fidelity Paragraph block */}
        <p className="font-sans text-base sm:text-lg md:text-xl text-zinc-400 leading-relaxed max-w-3xl font-light">
          {t('hero.description')}
        </p>

        {/* Buttons / CTA trigger blocks */}
        <div className="flex flex-wrap gap-4 pt-4 w-full">
          <button 
            onClick={onViewPortfolio}
            className="px-8 py-4 border border-white/20 text-white font-mono text-xs tracking-widest uppercase hover:border-[#0071ec] hover:text-[#0071ec] transition-all duration-300 rounded-none cursor-pointer text-center"
            id="view-portfolio-hero-btn"
          >
            {t('hero.view_portfolio')}
          </button>
        </div>

        {/* Subtle scroll trigger arrow indicator */}
        <div className="absolute bottom-8 left-0 hidden lg:flex items-center gap-2 text-zinc-600 font-mono text-[9px] uppercase tracking-widest">
          <span>{t('hero.scroll')}</span>
          <ArrowDown size={11} className="animate-bounce" />
        </div>
      </div>
    </section>
  );
}
