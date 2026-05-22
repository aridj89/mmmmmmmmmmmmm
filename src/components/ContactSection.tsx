import React from 'react';
import { useTranslation } from 'react-i18next';
import { Send, MapPin, ExternalLink, MessageSquare, Compass, Check } from 'lucide-react';
import { OFFICE_LOCATION } from '../data';

export default function ContactSection() {
  const { t } = useTranslation();
  const [copiedText, setCopiedText] = React.useState<string | null>(null);

  const handleCopyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const socialLinks = [
    {
      id: 'whatsapp',
      label: t('contact.whatsapp'),
      handle: t('contact.whatsapp_handle'),
      desc: t('contact.whatsapp_desc'),
      icon: <MessageSquare size={24} className="text-emerald-500" />,
      color: 'hover:border-emerald-500/50 hover:bg-emerald-950/5',
      action: '0540 89 39 11',
      href: 'https://wa.me/213540893911'
    },
    {
      id: 'telegram',
      label: t('contact.telegram'),
      handle: t('contact.telegram_handle'),
      desc: t('contact.telegram_desc'),
      icon: <Send size={24} className="text-sky-400" />,
      color: 'hover:border-sky-500/50 hover:bg-sky-950/5',
      action: '@mission_verse',
      href: 'https://t.me/mission_verse'
    },
    {
      id: 'instagram',
      label: t('contact.instagram'),
      handle: t('contact.instagram_handle'),
      desc: t('contact.instagram_desc'),
      icon: <Compass size={24} className="text-pink-500" />,
      color: 'hover:border-pink-500/50 hover:bg-pink-950/5',
      action: '@mission_verse',
      href: 'https://www.instagram.com/mission_verse?igsh=c290a3Izd3Q2Mm13'
    }
  ];

  return (
    <section className="bg-black text-[#e5e2e1] py-20 px-6 md:px-16" id="contact-integration-section">
      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* Section 1: FIND US */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-white/10 pt-16" id="find-us-grid">
          <div className="space-y-6">
            <span className="font-mono text-xs text-[#0071ec] tracking-widest uppercase block font-semibold">{t('contact.presence_label')}</span>
            <h2 className="font-hanken text-4xl sm:text-5xl font-extrabold text-white leading-tight uppercase">
              {t('contact.find_title')}
            </h2>
            <p className="font-sans text-sm sm:text-base text-zinc-400 leading-relaxed font-light max-w-md">
              {t('contact.find_desc')}
            </p>

            {/* Studio Address Card */}
            <div className="p-8 bg-[#1A1A1A] border border-white/10 rounded-md space-y-4 hover:border-[#0071ec] transition-colors relative group">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-hanken text-lg font-bold text-white uppercase">{OFFICE_LOCATION.name}</h3>
                  <p className="font-sans text-sm text-zinc-400 leading-relaxed font-light mt-1 max-w-xs">
                    {OFFICE_LOCATION.address}
                  </p>
                </div>
                <div className="text-zinc-650 inline-flex p-2 bg-black border border-white/5 rounded-full group-hover:text-blue-500 transition-colors">
                  <MapPin size={18} />
                </div>
              </div>

              <div className="pt-2">
                <a 
                  href="https://www.google.com/maps/place/H53H%2BP83,+Rte+de+Biskra,+Batna,+Algeria"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-zinc-400 hover:text-[#0071ec] transition-colors inline-flex items-center gap-1 leading-none font-bold tracking-wider"
                  id="google-maps-link"
                >
                  {t('contact.directions')} <ExternalLink size={12} className="text-[#0071ec]" />
                </a>
              </div>
            </div>
          </div>

          {/* Google Maps Embed */}
          <div className="relative border border-white/10 bg-[#0c0c0c] min-h-[300px] rounded-lg overflow-hidden group">
            
            {/* HUD overlay top bar */}
            <div className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center font-mono text-[9px] text-zinc-500 p-4 bg-gradient-to-b from-black/70 to-transparent">
              <span className="flex items-center gap-1 text-slate-400 uppercase"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping"></span> {t('contact.radar_online')}</span>
              <span className="uppercase">GRID_SEC_42A</span>
            </div>

            {/* Google Maps iframe */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3224.234!2d6.1739!3d35.5610!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDMzJzE0LjciTiA2wrAxMCczNC4yIkU!5e0!3m2!1sfr!2sdz!4v1&q=H53H%2BP83,+Rte+de+Biskra,+Batna,+Algeria"
              className="w-full h-full min-h-[400px] border-0 transition-all duration-700"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mission Verse Location - Batna"
              id="google-maps-embed"
            ></iframe>

            {/* HUD overlay bottom bar */}
            <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between border-t border-white/5 font-mono text-[9px] text-zinc-400 bg-gradient-to-t from-black/80 to-transparent p-4">
              <span className="uppercase">{t('contact.precision')}</span>
              <span className="text-[#0071ec] font-bold">{t('contact.stabilized')}</span>
            </div>
          </div>
        </div>

        {/* Section 2: CONNECT channel links */}
        <div className="space-y-12 pt-12 border-t border-white/5" id="social-connect-area">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="font-mono text-xs text-[#0071ec] tracking-widest block font-semibold uppercase">{t('contact.connect_label')}</span>
            <h2 className="font-hanken text-3xl sm:text-5xl font-extrabold text-white uppercase tracking-tight">{t('contact.connect_title')}</h2>
            <p className="font-sans text-sm text-zinc-400 font-light leading-relaxed">
              {t('contact.connect_desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {socialLinks.map((social) => (
              <div
                key={social.id}
                onClick={() => window.open(social.href, '_blank')}
                className={`p-8 bg-[#1A1A1A] border border-white/10 rounded-lg transition-all duration-300 flex flex-col justify-between items-center text-center cursor-pointer relative overflow-hidden group ${social.color}`}
                id={`social-card-${social.id}`}
              >
                <div className="space-y-4">
                  <div className="inline-flex p-4 bg-black border border-white/5 rounded-full mb-1 group-hover:scale-105 transition-transform duration-300">
                    {social.icon}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-hanken text-lg font-bold text-white tracking-tight leading-6">{social.label}</h3>
                    <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">{social.handle}</p>
                  </div>
                  <p className="font-sans text-xs text-zinc-400 leading-relaxed font-light mt-2 px-2">
                    {social.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 w-full flex items-center justify-center gap-1 font-mono text-xs text-[#0071ec] font-semibold">
                  {copiedText === social.label ? (
                    <span className="text-green-500 flex items-center gap-1 font-bold">
                      <Check size={13} /> {t('contact.copied')}
                    </span>
                  ) : (
                    <span>{social.action}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
