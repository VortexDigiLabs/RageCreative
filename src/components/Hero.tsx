import React, { useState, useRef, useEffect } from "react";
import {
  ArrowUpRight,
  Play,
  Pause,
  ArrowDown,
  Compass,
  Sparkles,
} from "lucide-react";
import MeechCarousel3D, { CarouselItem } from "./MeechCarousel3D";
import BokehEffect from "./BokehEffect";

interface HeroProps {
  onStartProject: () => void;
  onBookCall: () => void;
  onViewWork: () => void;
  onBecomeCollaborator: () => void;
}

export default function Hero({
  onStartProject,
  onBookCall,
  onViewWork,
}: HeroProps) {
  // 3D Carousel active state (default true on load)
  const [is3DActive, setIs3DActive] = useState<boolean>(true);
  const [selectedProject, setSelectedProject] = useState<CarouselItem | null>(null);

  // Smooth scroll helper
  const handleScrollDown = () => {
    setIs3DActive(false);
    const target = document.getElementById("studio-showcase") || document.getElementById("about");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Toggle 3D orbit interaction
  const toggle3DMode = () => {
    setIs3DActive((prev) => !prev);
  };

  return (
    <section
      id="hero"
      className="relative min-h-[95vh] md:min-h-screen flex flex-col justify-between overflow-hidden bg-[#141414] text-[#F8F7F5]"
    >
      {/* ========================================================================= */}
      {/* 1. MEECH213-STYLE 3D CYLINDER CAROUSEL CANVAS                            */}
      {/* Real-time WebGL cylinder with Rage Creative video & photography visual stream */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 z-0">
        <MeechCarousel3D
          isActive={is3DActive}
          onToggleActive={toggle3DMode}
          onSelectProject={(item) => setSelectedProject(item)}
        />

        {/* 30% Optical Bokeh Effect (Lens Flares & Golden Floating Ambient Orbs) */}
        <BokehEffect opacity={0.3} />

        {/* Cinematic Vignette Overlays for Maximum Typographic Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#141414]/80 via-transparent to-[#141414]/90 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-[#141414]/30 to-[#141414]/90 pointer-events-none" />
      </div>

      {/* ========================================================================= */}
      {/* 2. TOP FLOATING CONTROLLER BAR (START / STOP BUTTON & NAVIGATION)        */}
      {/* Prominently placed to stop 3D orbit and enable natural site scrolling     */}
      {/* ========================================================================= */}
      <div className="relative z-30 pt-24 sm:pt-28 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto w-full">
        <div className="flex flex-wrap items-center justify-between gap-3 bg-[#1A1A1A]/85 backdrop-blur-xl border border-white/15 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-2xl">
          {/* Studio Brand Positioning */}
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="w-2 h-2 rounded-full bg-[#C8A46B] animate-pulse" />
            <span className="text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.2em] text-[#E6E1D8] font-medium">
              Rage Creative • 3D Visual Stream
            </span>
          </div>

          {/* THE START / STOP BUTTON & SCROLL DOWN CONTROLS */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              id="hero-start-stop-btn"
              type="button"
              onClick={toggle3DMode}
              className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-300 shadow-md cursor-pointer ${
                is3DActive
                  ? "bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40"
                  : "bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40"
              }`}
              title={
                is3DActive
                  ? "Stop 3D Gallery to scroll further down the website"
                  : "Start 3D Gallery interactive orbit"
              }
              aria-label="Start or Stop 3D Interactive View"
            >
              {is3DActive ? (
                <>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                  </span>
                  <span>Stop 3D View (Scroll Site)</span>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Start 3D View</span>
                  <Play className="w-3.5 h-3.5 fill-current" />
                </>
              )}
            </button>

            {/* Quick Scroll Down Button */}
            <button
              type="button"
              onClick={handleScrollDown}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono uppercase tracking-wider border border-white/15 transition-colors cursor-pointer"
              title="Scroll down to explore the rest of the website"
            >
              <span className="hidden sm:inline">Scroll Down</span>
              <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. HERO FOREGROUND EDITORIAL CONTENT (MEECH213 LUXURY TYPOGRAPHY)         */}
      {/* Overlaid gracefully over the 3D curved gallery with crisp Didone text     */}
      {/* ========================================================================= */}
      <div className="relative z-20 max-w-7xl mx-auto px-5 sm:px-8 md:px-12 w-full py-8 sm:py-12 my-auto">
        <div className="max-w-4xl">
          {/* Subtle Category Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-white/20 backdrop-blur-md text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-mono text-[#C8A46B] mb-4 sm:mb-6 shadow-lg">
            <Sparkles className="w-3 h-3 text-[#C8A46B]" />
            <span>Creative Studio &amp; Collaborative Ecosystem</span>
          </div>

          {/* Big Didone Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.2rem] font-normal leading-[1.04] tracking-[-0.03em] text-white drop-shadow-2xl mb-4 sm:mb-6">
            Build a Brand <br />
            <span className="italic font-light text-[#E8D8C3]">People Remember.</span>
          </h1>

          {/* Editorial Paragraph */}
          <p className="text-base sm:text-lg md:text-xl text-stone-200 font-light leading-relaxed max-w-2xl mb-6 sm:mb-8 font-sans drop-shadow-md">
            Rage Creative combines strategy, creativity and intelligent technology to build brands,
            content and digital experiences that help ambitious businesses grow with confidence.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              id="hero-start-project-btn"
              type="button"
              onClick={onStartProject}
              className="group inline-flex items-center justify-center gap-2.5 bg-[#C8A46B] hover:bg-[#d8b57d] text-[#141414] text-[14px] font-semibold px-6 sm:px-7 py-3.5 rounded-full transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-[1.02] cursor-pointer min-h-[46px]"
            >
              <span>Start Your Project</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            <button
              id="hero-book-call-btn"
              type="button"
              onClick={onBookCall}
              className="inline-flex items-center justify-center gap-2 border border-white/30 hover:border-white bg-black/40 hover:bg-black/70 text-white text-[14px] font-medium px-6 py-3.5 rounded-full backdrop-blur-md transition-all duration-200 cursor-pointer min-h-[46px] shadow-lg"
            >
              <span>Book a Discovery Call</span>
            </button>

            <button
              id="hero-view-work-btn"
              type="button"
              onClick={handleScrollDown}
              className="inline-flex items-center justify-center gap-1.5 text-[14px] font-medium text-stone-300 hover:text-white px-4 py-3.5 transition-colors cursor-pointer min-h-[46px]"
            >
              <span>Explore Full Site</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. BOTTOM BAR: STATS & SCROLL INDICATOR                                   */}
      {/* ========================================================================= */}
      <div className="relative z-20 border-t border-white/10 bg-[#141414]/80 backdrop-blur-md px-5 sm:px-8 md:px-12 py-3.5 sm:py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-stone-300">
          <div className="flex items-center gap-6 sm:gap-8">
            <div>
              <span className="text-white font-bold text-sm block">100%</span>
              <span className="text-[10px] uppercase text-stone-400">Bespoke Craft</span>
            </div>
            <div className="h-6 w-px bg-white/15" />
            <div>
              <span className="text-white font-bold text-sm block">R4,000</span>
              <span className="text-[10px] uppercase text-stone-400">Accelerator</span>
            </div>
            <div className="h-6 w-px bg-white/15" />
            <div>
              <span className="text-white font-bold text-sm block">Global</span>
              <span className="text-[10px] uppercase text-stone-400">Standard</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-[11px] text-stone-400">
              {is3DActive
                ? "3D Orbit Active — Press STOP above to scroll page"
                : "3D Paused — Page Scroll Enabled"}
            </span>
            <button
              type="button"
              onClick={handleScrollDown}
              className="inline-flex items-center gap-1.5 text-[#C8A46B] hover:text-[#d8b57d] cursor-pointer"
            >
              <span>About Rage Creative</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
