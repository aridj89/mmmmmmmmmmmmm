import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Play, Pause, X, RotateCcw, Volume2, VolumeX, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { Reel } from '../types';
import { REELS, REEL_CATEGORIES } from '../data';

const CATEGORY_COLORS: Record<string, string> = {
  ugc: 'from-purple-600/20 to-pink-600/20 border-purple-500/30',
  dentist: 'from-blue-600/20 to-cyan-600/20 border-blue-500/30',
  esthetique: 'from-rose-600/20 to-orange-600/20 border-rose-500/30',
  pharmacie: 'from-green-600/20 to-teal-600/20 border-green-500/30',
  orthophonia: 'from-yellow-600/20 to-amber-600/20 border-yellow-500/30',
};

const CATEGORY_PILL_COLORS: Record<string, string> = {
  ugc: 'bg-purple-600 hover:bg-purple-500',
  dentist: 'bg-blue-600 hover:bg-blue-500',
  esthetique: 'bg-rose-600 hover:bg-rose-500',
  pharmacie: 'bg-green-600 hover:bg-green-500',
  orthophonia: 'bg-amber-600 hover:bg-amber-500',
};

export default function ReelShowcase() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  // Carousel State
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);
  const carouselTouchStart = useRef<number | null>(null);

  // Player State
  const [activeReelIndex, setActiveReelIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [playProgress, setPlayProgress] = useState(0);
  const [animatingDir, setAnimatingDir] = useState<number>(0);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerTouchStart = useRef<number | null>(null);

  const filteredReels = activeCategory === 'all'
    ? REELS
    : REELS.filter(r => r.category === activeCategory);

  // Auto-advance Carousel
  useEffect(() => {
    if (activeCategory !== 'all' || isCarouselHovered || activeReelIndex !== null) return;
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % filteredReels.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [activeCategory, isCarouselHovered, filteredReels.length, activeReelIndex]);

  // Player handlers
  const activeReel = activeReelIndex !== null ? filteredReels[activeReelIndex] : null;

  const openReel = (index: number) => {
    setActiveReelIndex(index);
    setIsPlaying(true);
    setIsMuted(false);
    setPlayProgress(0);
    setAnimatingDir(0);
  };

  const closePlayer = () => {
    setActiveReelIndex(null);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) videoRef.current.pause();
    else videoRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const restartVideo = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
    setPlayProgress(0);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setPlayProgress(isNaN(progress) ? 0 : progress);
  };

  useEffect(() => {
    if (activeReelIndex !== null && videoRef.current) {
      videoRef.current.muted = isMuted;
      // Small timeout to allow transition before playing
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play().catch(() => {});
          setIsPlaying(true);
        }
      }, 50);
    }
  }, [activeReelIndex]);

  // Vertical Swipe logic for player
  const goNextVideo = () => {
    if (activeReelIndex !== null && activeReelIndex < filteredReels.length - 1) {
      setAnimatingDir(1);
      setTimeout(() => {
        setActiveReelIndex(activeReelIndex + 1);
        setAnimatingDir(0);
      }, 300);
    }
  };

  const goPrevVideo = () => {
    if (activeReelIndex !== null && activeReelIndex > 0) {
      setAnimatingDir(-1);
      setTimeout(() => {
        setActiveReelIndex(activeReelIndex - 1);
        setAnimatingDir(0);
      }, 300);
    }
  };

  const handlePlayerWheel = (e: React.WheelEvent) => {
    if (e.deltaY > 50) goNextVideo();
    else if (e.deltaY < -50) goPrevVideo();
  };

  const handlePlayerTouchStart = (e: React.TouchEvent) => {
    playerTouchStart.current = e.touches[0].clientY;
  };

  const handlePlayerTouchEnd = (e: React.TouchEvent) => {
    if (!playerTouchStart.current) return;
    const diff = playerTouchStart.current - e.changedTouches[0].clientY;
    if (diff > 50) goNextVideo();
    else if (diff < -50) goPrevVideo();
    playerTouchStart.current = null;
  };

  // Carousel touch handlers
  const handleCarouselTouchStart = (e: React.TouchEvent) => {
    carouselTouchStart.current = e.touches[0].clientX;
    setIsCarouselHovered(true);
  };

  const handleCarouselTouchEnd = (e: React.TouchEvent) => {
    if (!carouselTouchStart.current) return;
    const diff = carouselTouchStart.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      setCarouselIndex((prev) => (prev + 1) % filteredReels.length);
    } else if (diff < -50) {
      setCarouselIndex((prev) => (prev - 1 + filteredReels.length) % filteredReels.length);
    }
    carouselTouchStart.current = null;
    setIsCarouselHovered(false);
  };

  return (
    <section className="bg-black text-[#e5e2e1] py-16 px-4 md:px-12 overflow-hidden" id="reel-showcase-section">
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
      
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="font-hanken text-4xl sm:text-6xl font-extrabold text-white tracking-tight uppercase">
            {t('reel.title')}
          </h2>
          <p className="font-sans text-sm text-zinc-500 max-w-lg mx-auto">
            {filteredReels.length} {filteredReels.length > 1 ? t('reel.videos') : t('reel.video')}
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => { setActiveCategory('all'); setCarouselIndex(0); }}
            className={`px-6 py-2.5 rounded-full font-mono text-xs uppercase font-bold transition-all duration-300 border ${
              activeCategory === 'all'
                ? 'bg-[#0071ec]/10 border-[#0071ec] text-[#0071ec] shadow-[0_0_15px_rgba(0,113,236,0.3)]'
                : 'bg-[#1A1A1A] border-white/10 text-zinc-400 hover:border-[#0071ec]/50 hover:text-[#0071ec]'
            }`}
          >
            ALL
          </button>
          {REEL_CATEGORIES.map(cat => {
            const isActive = activeCategory === cat.id;
            let themeClass = '';
            
            if (cat.id === 'ugc') {
              themeClass = isActive 
                ? 'bg-purple-500/10 border-purple-500 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                : 'bg-[#1A1A1A] border-white/10 text-zinc-400 hover:border-purple-500/50 hover:text-purple-400';
            } else if (cat.id === 'dentist') {
              themeClass = isActive 
                ? 'bg-blue-500/10 border-blue-500 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                : 'bg-[#1A1A1A] border-white/10 text-zinc-400 hover:border-blue-500/50 hover:text-blue-400';
            } else if (cat.id === 'esthetique') {
              themeClass = isActive 
                ? 'bg-rose-500/10 border-rose-500 text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.3)]'
                : 'bg-[#1A1A1A] border-white/10 text-zinc-400 hover:border-rose-500/50 hover:text-rose-400';
            } else if (cat.id === 'pharmacie') {
              themeClass = isActive 
                ? 'bg-green-500/10 border-green-500 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.3)]'
                : 'bg-[#1A1A1A] border-white/10 text-zinc-400 hover:border-green-500/50 hover:text-green-400';
            } else if (cat.id === 'orthophonia') {
              themeClass = isActive 
                ? 'bg-amber-500/10 border-amber-500 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                : 'bg-[#1A1A1A] border-white/10 text-zinc-400 hover:border-amber-500/50 hover:text-amber-400';
            }
            
            return (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); setCarouselIndex(0); }}
                className={`px-6 py-2.5 rounded-full font-mono text-xs uppercase font-bold transition-all duration-300 border ${themeClass}`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Dynamic Display: 3D Carousel for ALL categories */}
        <div 
          className="relative h-[500px] sm:h-[600px] w-full max-w-5xl mx-auto [perspective:1000px] flex items-center justify-center"
            onMouseEnter={() => setIsCarouselHovered(true)}
            onMouseLeave={() => setIsCarouselHovered(false)}
            onTouchStart={handleCarouselTouchStart}
            onTouchEnd={handleCarouselTouchEnd}
          >
            {/* Carousel Controls */}
            <button 
              onClick={() => setCarouselIndex((prev) => (prev - 1 + filteredReels.length) % filteredReels.length)}
              className="absolute left-4 z-30 p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors backdrop-blur-md hidden sm:block"
            >
              <ChevronLeft size={24} />
            </button>

            <button 
              onClick={() => setCarouselIndex((prev) => (prev + 1) % filteredReels.length)}
              className="absolute right-4 z-30 p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors backdrop-blur-md hidden sm:block"
            >
              <ChevronRight size={24} />
            </button>

            {filteredReels.map((reel, index) => {
              // Calculate relative position
              let diff = index - carouselIndex;
              if (diff > Math.floor(filteredReels.length / 2)) diff -= filteredReels.length;
              if (diff < -Math.floor(filteredReels.length / 2)) diff += filteredReels.length;

              // Only show items within distance of 2
              if (Math.abs(diff) > 2) return null;

              const isCenter = diff === 0;
              const translateX = diff * 120; // Move side items by 120% of their width
              const scale = isCenter ? 1 : 0.8;
              const zIndex = 10 - Math.abs(diff);
              const opacity = isCenter ? 1 : Math.abs(diff) === 1 ? 0.6 : 0;
              
              const colorClass = CATEGORY_COLORS[reel.category] || 'from-zinc-600/20 to-zinc-600/20 border-zinc-500/30';

              return (
                <div
                  key={reel.id}
                  onClick={() => isCenter ? openReel(index) : setCarouselIndex(index)}
                  className={`absolute top-1/2 left-1/2 w-[260px] sm:w-[320px] aspect-[9/16] rounded-2xl overflow-hidden border bg-gradient-to-b ${colorClass} transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] shadow-2xl ${isCenter ? 'cursor-pointer hover:scale-105 shadow-[#0071ec]/20' : 'cursor-pointer blur-[2px]'}`}
                  style={{
                    transform: `translate(calc(-50% + ${translateX}%), -50%) scale(${scale})`,
                    zIndex,
                    opacity,
                  }}
                >
                  <video
                    src={reel.videoUrl}
                    className="absolute inset-0 w-full h-full object-cover"
                    muted
                    loop
                    playsInline
                    autoPlay={isCenter}
                    preload="metadata"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent pointer-events-none" />
                  
                  {isCenter && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 z-10">
                      <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center hover:scale-110 transition-transform duration-300">
                        <Play size={24} className="text-white fill-current ml-1" />
                      </div>
                    </div>
                  )}

                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-white/15 backdrop-blur-md text-white font-mono text-[8px] tracking-wider px-2 py-0.5 rounded-full uppercase font-bold border border-white/20">
                      {reel.category}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                    <p className="font-hanken text-sm font-bold text-white truncate">{reel.title}</p>
                    <p className="font-mono text-[10px] text-zinc-400 mt-0.5">{t(`reel_subtitles.${reel.category}`)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      {/* Fullscreen Video Player Modal */}
      {activeReel && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 sm:p-0 overflow-hidden"
          onWheel={handlePlayerWheel}
          onTouchStart={handlePlayerTouchStart}
          onTouchEnd={handlePlayerTouchEnd}
        >
          {/* Modal Background click to close */}
          <div className="absolute inset-0" onClick={closePlayer} />

          <div 
            className="relative bg-[#0d0d0d] sm:border border-white/10 w-full max-w-sm sm:max-w-xs h-[85vh] sm:rounded-2xl flex flex-col shadow-2xl shadow-[#0071ec]/10 transition-transform duration-300 ease-in-out"
            style={{ 
              transform: animatingDir === 1 ? 'translateY(-100vh) scale(0.9)' : animatingDir === -1 ? 'translateY(100vh) scale(0.9)' : 'translateY(0) scale(1)',
              opacity: animatingDir !== 0 ? 0 : 1
            }}
          >
            {/* Top bar */}
            <div className="absolute top-0 left-0 right-0 z-20 px-4 py-4 sm:py-3 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${CATEGORY_PILL_COLORS[activeReel.category]?.split(' ')[0] || 'bg-[#0071ec]'}`}></span>
                <span className="font-mono text-[10px] sm:text-[9px] uppercase tracking-wider text-white font-bold drop-shadow-md">{activeReel.title}</span>
              </div>
              <button onClick={closePlayer} className="text-white/80 hover:text-white bg-black/20 backdrop-blur-md rounded-full p-2 transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Video Area */}
            <div className="relative flex-grow bg-black overflow-hidden group rounded-t-2xl sm:rounded-none">
              <video
                ref={videoRef}
                src={activeReel.videoUrl}
                className="w-full h-full object-cover"
                loop
                playsInline
                muted={isMuted}
                onTimeUpdate={handleTimeUpdate}
                onClick={togglePlay}
              />

              {/* LIVE badge */}
              <div className="absolute top-14 left-4 pointer-events-none">
                <span className="bg-red-600 text-white font-mono text-[8px] font-bold px-2 py-0.5 rounded-sm flex items-center gap-1 shadow-lg shadow-red-600/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> {t('reel.live')}
                </span>
              </div>

              {/* Navigation Indicators (Up/Down) */}
              {activeReelIndex !== null && activeReelIndex > 0 && (
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-60 transition-opacity pointer-events-none flex flex-col items-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce mb-1 shadow-md"></div>
                  <span className="font-mono text-[8px] text-white shadow-black/50 drop-shadow-md">SWIPE UP</span>
                </div>
              )}
              {activeReelIndex !== null && activeReelIndex < filteredReels.length - 1 && (
                <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-60 transition-opacity pointer-events-none flex flex-col items-center">
                  <span className="font-mono text-[8px] text-white shadow-black/50 drop-shadow-md">SWIPE DOWN</span>
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce mt-1 shadow-md"></div>
                </div>
              )}

              {/* Pause overlay */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                  <div className="w-20 h-20 rounded-full bg-black/40 border border-white/20 backdrop-blur-md flex items-center justify-center text-white">
                    <Play size={32} className="fill-current ml-2" />
                  </div>
                </div>
              )}
            </div>

            {/* Controls Bar */}
            <div className="absolute bottom-0 left-0 right-0 z-20 p-4 pt-8 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
              <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden mb-4 cursor-pointer">
                <div className="bg-[#0071ec] h-full rounded-full transition-all duration-150" style={{ width: `${playProgress}%` }} />
              </div>
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <p className="font-hanken font-bold text-white text-base leading-tight drop-shadow-md">{activeReel.title}</p>
                  <span className="font-mono text-[9px] text-zinc-300 uppercase drop-shadow-md">{t(`reel_subtitles.${activeReel.category}`)}</span>
                </div>
                
                <div className="flex flex-col gap-4 items-center">
                  <button onClick={toggleMute} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                    {isMuted ? <VolumeX size={18} className="text-red-400" /> : <Volume2 size={18} />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
