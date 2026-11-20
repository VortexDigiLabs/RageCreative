import React, { useState, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize2, Film } from "lucide-react";

interface ShowcaseVideoPlaceholderProps {
  customVideoUrl?: string;
  customPosterUrl?: string;
}

export default function ShowcaseVideoPlaceholder({
  customVideoUrl,
  customPosterUrl = "/videos/hero-poster.jpg",
}: ShowcaseVideoPlaceholderProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(10);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Time progress update
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      if (videoRef.current.duration && !isNaN(videoRef.current.duration)) {
        setDuration(videoRef.current.duration);
      }
    }
  };

  // Timeline scrubber
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current && duration > 0) {
      const rect = e.currentTarget.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = pos * duration;
    }
  };

  // Play / Pause toggle
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.error("Playback error:", err);
            setIsPlaying(false);
          });
      }
    }
  };

  // Mute / Unmute
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Fullscreen
  const handleFullScreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <section
      id="studio-showcase"
      className="py-12 sm:py-16 md:py-24 bg-[#F8F7F5] relative overflow-hidden"
    >
      {/* Symmetrical container matching navigation and rest of page */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
        {/* ========================================================================= */}
        {/* 16:9 LANDSCAPE SHOWCASE VIDEO PLAYER WITH GEMINI IMAGE                    */}
        {/* Symmetrical in line, perfectly fitted with evenly spaced padding          */}
        {/* ========================================================================= */}
        <div className="relative group max-w-6xl mx-auto">
          {/* Subtle Ambient Glow behind the video frame */}
          <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-[#C8A46B]/20 via-[#181818]/10 to-[#C8A46B]/20 rounded-3xl blur-xl opacity-60 group-hover:opacity-90 transition-opacity duration-700 pointer-events-none" />

          {/* 16:9 Video Canvas Frame */}
          <div
            id="hero-video-container"
            onClick={togglePlay}
            className="relative w-full aspect-video rounded-2xl md:rounded-3xl overflow-hidden border border-[#D9D3C8] bg-[#080808] shadow-2xl cursor-pointer select-none"
          >
            {/* HTML5 Video element */}
            <video
              ref={videoRef}
              poster={customPosterUrl || "https://res.cloudinary.com/ddfuc0ktg/video/upload/Showcase_video_zrjxdf.jpg"}
              playsInline
              loop
              muted={isMuted}
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => setIsPlaying(false)}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.01]"
            >
              <source
                src={customVideoUrl || "https://res.cloudinary.com/ddfuc0ktg/video/upload/Showcase_video_zrjxdf.mp4"}
                type="video/mp4"
              />
              Your browser does not support high-definition video playback.
            </video>

            {/* Editorial Vignette & Gradient Overlays */}
            <div
              className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
                isPlaying
                  ? "bg-black/20 opacity-0 group-hover:opacity-100"
                  : "bg-gradient-to-t from-black/85 via-black/30 to-black/25 opacity-100"
              }`}
            />

            {/* Top Bar: Reel Metadata (Exact match to Image 1) */}
            <div className="absolute top-3 sm:top-6 left-3 sm:left-6 right-3 sm:right-6 flex items-center justify-between pointer-events-none text-white z-10">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="px-2.5 sm:px-3 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/15 flex items-center gap-1.5 sm:gap-2">
                  <Film className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#C8A46B]" />
                  <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.18em] text-[#F8F7F5]">
                    Studio Reel 2026
                  </span>
                </div>
                <span className="hidden md:inline-block text-[11px] font-mono uppercase tracking-wider text-white/70">
                  Fashion Editorial &amp; Digital Production
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-black/55 backdrop-blur-xs border border-white/15 text-[#C8A46B]">
                  16:9 Ultra HD
                </span>
              </div>
            </div>

            {/* Center Play Button Overlay (Exact match to Image 1) */}
            {!isPlaying && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 p-4 sm:p-6 text-center pointer-events-none">
                <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/40 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-300 mb-3 sm:mb-4">
                  <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white fill-white translate-x-0.5" />
                </div>
                <h3 className="font-serif text-xl sm:text-3xl md:text-4xl text-white font-normal mb-1.5 sm:mb-2 drop-shadow-md">
                  Watch The Studio Showcase
                </h3>
                <p className="text-xs sm:text-sm text-white/80 font-sans tracking-wide max-w-md px-2">
                  Smooth ambient playback without audio • Tap anywhere to start
                </p>
              </div>
            )}

            {/* Interactive Timeline & Bottom Controls Bar (Exact match to Image 1) */}
            <div
              className={`absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent pt-6 pb-3 sm:pb-5 px-3 sm:px-6 text-white z-20 transition-opacity duration-300 ${
                isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Seekable timeline bar */}
              <div
                className="w-full h-1.5 sm:h-2 bg-white/25 hover:h-2.5 rounded-full mb-3 cursor-pointer relative overflow-hidden transition-all"
                onClick={handleSeek}
              >
                <div
                  className="h-full bg-gradient-to-r from-[#C8A46B] to-[#E6CA9E] rounded-full transition-all duration-100"
                  style={{
                    width: `${(currentTime / (duration || 10)) * 100}%`,
                  }}
                />
              </div>

              <div className="flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/15 hover:bg-white/30 border border-white/25 flex items-center justify-center text-white transition-colors cursor-pointer"
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                  >
                    {isPlaying ? (
                      <Pause className="w-3.5 h-3.5" />
                    ) : (
                      <Play className="w-3.5 h-3.5 fill-white translate-x-0.5" />
                    )}
                  </button>

                  <div className="text-[11px] sm:text-[12px] text-white/85">
                    <span>{formatTime(currentTime)}</span>
                    <span className="mx-1.5 text-white/35">/</span>
                    <span>{formatTime(duration)}</span>
                    <span className="hidden sm:inline-block ml-3 text-[#C8A46B]">
                      • Rage Creative Master Reel
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={toggleMute}
                    className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 border border-white/25 flex items-center justify-center text-white transition-colors cursor-pointer"
                    aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                    title={isMuted ? "Unmute audio" : "Mute audio"}
                  >
                    {isMuted ? (
                      <VolumeX className="w-3.5 h-3.5 text-white/70" />
                    ) : (
                      <Volume2 className="w-3.5 h-3.5 text-[#C8A46B]" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleFullScreen}
                    className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 border border-white/25 flex items-center justify-center text-white transition-colors cursor-pointer"
                    aria-label="Full screen"
                    title="Fullscreen"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
