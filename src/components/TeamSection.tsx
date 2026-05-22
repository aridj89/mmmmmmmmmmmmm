import React from 'react';
import { useTranslation } from 'react-i18next';
import { Share2, Megaphone, Plus } from 'lucide-react';
import { TEAM_MEMBERS } from '../data';

export default function TeamSection() {
  const { t } = useTranslation();

  return (
    <section className="bg-black text-[#e5e2e1] py-24 px-6 md:px-16" id="philosophy-and-team">
      <div className="max-w-7xl mx-auto space-y-28">
        
        {/* Philosophy: Mission vs Enterprise */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-white/10 pt-16" id="philosophy-grid">
          <div className="space-y-4">
            <span className="font-mono text-xs text-[#0071ec] tracking-widest block font-semibold uppercase">{t('philosophy.label')}</span>
            <h2 className="font-hanken text-4xl sm:text-5xl font-extrabold text-white leading-tight uppercase">
              {t('philosophy.title_1')} <br />{t('philosophy.title_2')}
            </h2>
            <div className="h-1 w-12 bg-zinc-800"></div>
          </div>
          
          <div className="space-y-0">
            <div className="p-8 bg-[#1A1A1A] border border-white/10 rounded-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                <div className="group p-5 border border-white/5 hover:border-[#0071ec] rounded-sm transition-all duration-300 hover:bg-white/[0.02]">
                  <span className="font-mono text-[10px] text-[#0071ec] tracking-widest font-bold">01</span>
                  <h3 className="font-hanken text-base font-bold text-white mt-2 mb-2 uppercase">{t('philosophy.service_1_title')}</h3>
                  <p className="font-sans text-xs text-zinc-500 leading-relaxed font-light">{t('philosophy.service_1_desc')}</p>
                </div>

                <div className="group p-5 border border-white/5 hover:border-[#0071ec] rounded-sm transition-all duration-300 hover:bg-white/[0.02]">
                  <span className="font-mono text-[10px] text-[#0071ec] tracking-widest font-bold">02</span>
                  <h3 className="font-hanken text-base font-bold text-white mt-2 mb-2 uppercase">{t('philosophy.service_2_title')}</h3>
                  <p className="font-sans text-xs text-zinc-500 leading-relaxed font-light">{t('philosophy.service_2_desc')}</p>
                </div>

                <div className="group p-5 border border-white/5 hover:border-[#0071ec] rounded-sm transition-all duration-300 hover:bg-white/[0.02]">
                  <span className="font-mono text-[10px] text-[#0071ec] tracking-widest font-bold">03</span>
                  <h3 className="font-hanken text-base font-bold text-white mt-2 mb-2 uppercase">{t('philosophy.service_3_title')}</h3>
                  <p className="font-sans text-xs text-zinc-500 leading-relaxed font-light">{t('philosophy.service_3_desc')}</p>
                </div>

                <div className="group p-5 border border-white/5 hover:border-[#0071ec] rounded-sm transition-all duration-300 hover:bg-white/[0.02]">
                  <span className="font-mono text-[10px] text-[#0071ec] tracking-widest font-bold">04</span>
                  <h3 className="font-hanken text-base font-bold text-white mt-2 mb-2 uppercase">{t('philosophy.service_4_title')}</h3>
                  <p className="font-sans text-xs text-zinc-500 leading-relaxed font-light">{t('philosophy.service_4_desc')}</p>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Team Grid */}
        <div className="space-y-12pt pt-12" id="team-area">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div className="max-w-xl space-y-3">
              <span className="font-mono text-xs text-[#0071ec] tracking-widest uppercase block font-semibold">{t('team.label')}</span>
              <h2 className="font-hanken text-3xl sm:text-5xl font-extrabold text-white uppercase tracking-tight">{t('team.title')}</h2>
              <p className="font-sans text-sm sm:text-base text-zinc-400 font-light">
                {t('team.description')}
              </p>
            </div>
            
            <div className="font-mono text-xs text-zinc-500 uppercase tracking-wider bg-zinc-900/40 p-3 border border-white/5 rounded-sm">
              {t('team.stats')}
            </div>
          </div>

          {/* Team Members Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8" id="team-members-grid">
            
            {TEAM_MEMBERS.map((member) => (
              <div 
                key={member.id}
                className="group relative bg-[#1A1A1A] border border-white/10 hover:border-[#0071ec] transition-all duration-500 rounded-md overflow-hidden aspect-[4/5] flex flex-col justify-end"
                id={`team-card-${member.id}`}
              >
                {member.imageUrl ? (
                  <>
                    <img 
                      src={member.imageUrl} 
                      alt={member.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-85"></div>
                    <div className="absolute bottom-0 left-0 p-4 md:p-5 w-full z-10 space-y-0.5">
                      <p className="font-mono text-[8px] sm:text-[9px] text-[#0071ec] uppercase tracking-widest font-semibold">{t(`team_roles.${member.id}`)}</p>
                      <h4 className="font-hanken text-sm sm:text-base font-bold text-white tracking-tight">{member.name}</h4>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center w-full h-full p-4 md:p-5 text-center bg-[#1F1E1E]">
                    <div className="space-y-3">
                      <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-zinc-900 border border-white/5 text-[#0071ec]">
                        {member.icon === 'share' ? <Share2 size={18} /> : <Megaphone size={18} />}
                      </div>
                      <div className="space-y-0.5">
                        <p className="font-mono text-[8px] sm:text-[9px] text-[#0071ec] uppercase tracking-widest font-semibold">{t(`team_roles.${member.id}`)}</p>
                        <h4 className="font-hanken text-sm sm:text-base font-bold text-white tracking-tight">{member.name}</h4>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}


          </div>
        </div>

      </div>
    </section>
  );
}
