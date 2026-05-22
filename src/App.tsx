import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import TeamSection from './components/TeamSection';
import ReelShowcase from './components/ReelShowcase';
import BentoGrid from './components/BentoGrid';
import LogoMarquee from './components/LogoMarquee';
import ContactSection from './components/ContactSection';
import { ActiveTab } from './types';
import { Home, Grid, Mail, ArrowUpRight } from 'lucide-react';

export default function App() {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = React.useState<ActiveTab>('HOME');
  const isRTL = i18n.language === 'ar';

  // Smooth scroll to top on tab change
  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-[#e5e2e1] antialiased flex flex-col font-sans" id="root-app-layout" dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* Universal Top Bar */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={handleTabChange} 
      />

      {/* Primary Context Container */}
      <main className="flex-grow pt-16 pb-24 md:pb-16" id="primary-main-viewport">
        
        {/* View Switcher with animations/transitions */}
        {activeTab === 'HOME' && (
          <div className="animate-fade-in shrink-0" id="home-view">
            <Hero 
              onViewPortfolio={() => handleTabChange('WORK')}
            />
            
            <TeamSection />

            {/* In-view Core CTA Banner */}
            <section className="py-24 px-6 md:px-16 text-center border-t border-white/5 bg-black">
              <div className="max-w-4xl mx-auto space-y-8">
                <h2 className="font-hanken text-4xl sm:text-6xl font-extrabold text-white tracking-tight uppercase leading-none">
                  {t('cta.title')}
                </h2>
                <div className="flex justify-center pt-2">
                  <button 
                    onClick={() => handleTabChange('CONTACT')}
                    className="flex items-center gap-3 px-10 py-5 bg-white text-black font-hanken text-lg md:text-xl font-extrabold hover:bg-[#0071ec] hover:text-white transition-all duration-300 rounded-none shadow-lg shadow-white/3"
                    id="connect-cta-btn"
                  >
                    {t('cta.button')} <ArrowUpRight size={22} className="stroke-[2.5px]" />
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'WORK' && (
          <div className="animate-fade-in shrink-0" id="work-view">
            {/* Header / Intro section for Work view */}
            <section className="px-6 md:px-16 py-16 md:py-24 border-b border-white/5 bg-black">
              <div className="max-w-7xl mx-auto space-y-4">
                <span className="font-mono text-xs text-[#0071ec] tracking-widest block font-semibold uppercase">{t('work.label')}</span>
                <h1 className="font-hanken text-4xl sm:text-7xl font-extrabold text-white uppercase leading-none tracking-tight">
                  {t('work.title_1')} <span className="text-zinc-500">{t('work.title_2')}</span>
                </h1>
              </div>
            </section>

            <LogoMarquee />

            <ReelShowcase />
          </div>
        )}

        {activeTab === 'CONTACT' && (
          <div className="animate-fade-in shrink-0" id="contact-view">
            <ContactSection />
          </div>
        )}

      </main>

      {/* Universal Footer */}
      <Footer setActiveTab={handleTabChange} />

      {/* Bottom Nav Bar (Mobile Only Viewport) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-black/90 backdrop-blur-xl border-t border-white/10 flex justify-around items-center h-20 pb-safe z-40" id="mobile-bottom-navbar">
        <button 
          onClick={() => handleTabChange('HOME')}
          className={`flex flex-col items-center justify-center gap-1 w-20 py-1 transition-all ${
            activeTab === 'HOME' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
          }`}
          id="mobile-nav-home"
        >
          <Home size={18} />
          <span className="font-mono text-[8px] tracking-widest font-semibold">{t('nav.home')}</span>
        </button>

        <button 
          onClick={() => handleTabChange('WORK')}
          className={`flex flex-col items-center justify-center gap-1 w-20 py-1 transition-all ${
            activeTab === 'WORK' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
          }`}
          id="mobile-nav-work"
        >
          <Grid size={18} />
          <span className="font-mono text-[8px] tracking-widest font-semibold">{t('nav.work')}</span>
        </button>

        <button 
          onClick={() => handleTabChange('CONTACT')}
          className={`flex flex-col items-center justify-center gap-1 w-20 py-1 transition-all ${
            activeTab === 'CONTACT' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
          }`}
          id="mobile-nav-contact"
        >
          <Mail size={18} />
          <span className="font-mono text-[8px] tracking-widest font-semibold">{t('nav.contact')}</span>
        </button>
      </nav>

    </div>
  );
}
