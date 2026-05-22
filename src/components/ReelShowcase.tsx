import React from 'react';
import { useTranslation } from 'react-i18next';
import { Play, Pause, X, RotateCcw, Volume2, VolumeX, Monitor } from 'lucide-react';
import { Reel } from '../types';
import { REELS, REEL_CATEGORIES } from '../data';

export default function ReelShowcase() {
  const { t } = useTranslation();
  const [activeReel, setActiveReel] = React.useState<Reel | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [isMuted, setIsMuted] = React.useState(false);
  const [playProgress, setPlayProgress] = React.useState(0);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const thumbRefs = React.useRef<Map<string, HTMLVideoElement>>(new Map());

  const openReel = (reel: Reel) => {
    setActiveReel(reel);
    setIsPlaying(true);
    setIsMuted(false);
    setPlayProgress(0);
  };

  const closePlayer = () => {
    setActiveReel(null);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
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

  // Auto-play when modal opens
  React.useEffect(() => {
    if (activeReel && videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play().catch(() => {});
    }
  }, [activeReel]);

  return (
    <section className="bg-black text-[#e5e2e1] py-16 px-6 md:px-16" id="digital-motion-reels">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Main Header */}
        <div className="flex justify-between items-end border-b border-white/5 pb-8">
          <div className="space-y-2">
            <span className="font-mono text-[10px] text-[#0071ec] tracking-widest uppercase font-semibold">{t('reel.label')}</span>
            <h2 className="font-hanken text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">{t('reel.title')}</h2>
          </div>
        </div>

        {/* Categories with their videos */}
        {REEL_CATEGORIES.map((cat) => {
          const catReels = REELS.filter(r => r.category === cat.id);
          if (catReels.length === 0) return null;

          return (
            <div key={cat.id} className="space-y-6" id={`category-${cat.id}`}>
              {/* Category Header */}
              <div className="flex items-end gap-4 border-b border-white/5 pb-4">
                <h3 className="font-hanken text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
                  {cat.label}
                </h3>
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider pb-1">
                  {t(`reel_subtitles.${cat.id}`)} — {catReels.length} {catReels.length > 1 ? t('reel.videos') : t('reel.video')}
                </span>
              </div>

              {/* Videos Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {catReels.map((reel) => (
                  <div 
                    key={reel.id}
                    onClick={() => openReel(reel)}
                    className="group relative aspect-[9/16] bg-[#1a1919] overflow-hidden rounded-md border border-white/10 hover:border-[#0071ec] transition-all duration-300 cursor-pointer shadow-lg hover:shadow-blue-500/5"
                    id={`reel-card-${reel.id}`}
                  >
                    {/* Video thumbnail — auto plays muted on hover */}
                    <video
                      ref={(el) => { if (el) thumbRefs.current.set(reel.id, el); }}
                      src={reel.videoUrl}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                      muted
                      playsInline
                      preload="metadata"
                      onMouseEnter={(e) => { (e.target as HTMLVideoElement).play().catch(() => {}); }}
                      onMouseLeave={(e) => { const v = e.target as HTMLVideoElement; v.pause(); v.currentTime = 0; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"></div>
                    
                    {/* Play icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center transition-all duration-300 border border-white/20 group-hover:border-[#0071ec] group-hover:scale-110">
                        <Play size={18} className="text-white fill-current ml-0.5" />
                      </div>
                    </div>

                    {/* Label */}
                    <div className="absolute bottom-4 left-4 right-4 z-10">
                      <span className="font-mono text-[9px] text-[#0071ec] uppercase tracking-wider font-semibold">
                        {reel.title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

      </div>

      {/* Real Video Player Modal */}
      {activeReel && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
          id="active-reel-overlay"
          onClick={(e) => { if (e.target === e.currentTarget) closePlayer(); }}
        >
          <div className="relative bg-[#131313] border border-white/10 max-w-sm w-full rounded-lg overflow-hidden flex flex-col" id="reel-player-container">
            
            <div className="bg-[#1a1919] border-b border-white/10 px-4 py-3 flex justify-between items-center text-zinc-400">
              <div className="flex items-center gap-2">
                <Monitor size={14} className="text-[#0071ec]" />
                <span className="font-mono text-[9px] uppercase tracking-wider">{activeReel.title}</span>
              </div>
              <button 
                onClick={closePlayer}
                className="text-zinc-500 hover:text-white transition-colors"
                id="close-player-x"
              >
                <X size={16} />
              </button>
            </div>

            <div className="relative aspect-[9/16] bg-black overflow-hidden flex items-center justify-center">
              <video
                ref={videoRef}
                src={activeReel.videoUrl}
                className="w-full h-full object-cover"
                loop
                playsInline
                muted={isMuted}
                onTimeUpdate={handleTimeUpdate}
                onClick={togglePlay}
                id="active-reel-video"
              />
              
              {/* Overlay info */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 flex flex-col justify-between p-5 pointer-events-none">
                <div className="flex justify-between items-center font-mono text-[9px] text-zinc-400">
                  <span className="bg-red-600 text-white px-1.5 py-0.5 rounded-sm flex items-center gap-1 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span> {t('reel.live')}
                  </span>
                </div>
              </div>

              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <button 
                    onClick={togglePlay}
                    className="w-16 h-16 rounded-full bg-white/15 border border-white/30 backdrop-blur-md flex items-center justify-center text-white scale-110 animate-fade-in"
                    id="video-resume-btn"
                  >
                    <Play size={24} className="fill-current ml-1" />
                  </button>
                </div>
              )}
            </div>

            <div className="bg-[#1a1919] p-4 border-t border-white/10 space-y-3">
              
              <div className="relative w-full h-1 bg-zinc-800 rounded-sm overflow-hidden cursor-pointer">
                <div 
                  className="bg-[#0071ec] h-full transition-all duration-150"
                  style={{ width: `${playProgress}%` }}
                ></div>
              </div>

              <div className="flex justify-between items-center text-zinc-400">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={togglePlay}
                    className="text-white hover:text-[#0071ec] transition-colors"
                    id="video-play-pause-btn"
                  >
                    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                  </button>
                  <button 
                    onClick={restartVideo}
                    className="hover:text-white transition-colors"
                    id="video-rewind-btn"
                  >
                    <RotateCcw size={14} />
                  </button>
                  <button 
                    onClick={toggleMute}
                    className="hover:text-white transition-colors"
                    id="video-mute-toggle"
                  >
                    {isMuted ? <VolumeX size={15} className="text-red-500" /> : <Volume2 size={15} />}
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
