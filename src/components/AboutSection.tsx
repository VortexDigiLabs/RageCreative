import React, { useState, useEffect } from "react";
import { ArrowUpRight, Compass, Users, Sparkles, TrendingUp, Maximize2, X } from "lucide-react";
import RageLogo from "./RageLogo";

interface AboutSectionProps {
  onStartProject: () => void;
}

interface WorkspaceAtmosphereItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

export default function AboutSection({ onStartProject }: AboutSectionProps) {
  const [lightboxImage, setLightboxImage] = useState<WorkspaceAtmosphereItem | null>(null);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxImage(null);
      }
    };

    if (lightboxImage) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxImage]);

  const atmosphereItems: WorkspaceAtmosphereItem[] = [
    {
      id: "strategy",
      title: "Strategy Before Design",
      subtitle: "Every visual system is rooted in rigorous commercial objectives and positioning.",
      image: "/images/strategy-before-design.png",
    },
    {
      id: "curated-teams",
      title: "Curated Specialist Teams",
      subtitle: "Hand-picked agile creative collective assembled specifically around every client brief.",
      image: "/images/curated-specialist-teams.png",
    },
    {
      id: "commercial-momentum",
      title: "Commercial Momentum",
      subtitle: "High-impact creative direction that builds brand authority and drives growth.",
      image: "/images/creating-commercial-momentum.png",
    },
  ];

  const pillars = [
    {
      icon: <Compass className="w-5 h-5 text-[#C8A46B]" />,
      title: "We Believe There's A Better Way",
      copy: "The creative industry has evolved, but too many businesses are still piecing together photographers, designers, developers, marketers and content creators to achieve one vision. We built Rage Creative as a collaborative creative studio—bringing exceptional talent, intelligent technology and strategic thinking together under one roof.",
    },
    {
      icon: <Sparkles className="w-5 h-5 text-[#C8A46B]" />,
      title: "Human Creativity. Intelligent Technology",
      copy: "We don't use technology to replace creativity. We use it to empower exceptional creatives. By combining human insight with AI-enhanced workflows, we're able to move faster, think bigger and create smarter—creating beautifully crafted work that's commercially effective. Technology is simply the tool. People are the difference.",
    },
    {
      icon: <Users className="w-5 h-5 text-[#C8A46B]" />,
      title: "More Than An Agency",
      copy: "We've created a growing ecosystem of photographers, filmmakers, designers, developers, strategists, marketers and creative specialists who collaborate on every project. Rather than forcing clients into a traditional agency structure, we build bespoke creative teams around every brief.",
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-[#C8A46B]" />,
      title: "Built For Brands Ready To Grow",
      copy: "Whether we're developing a brand identity, producing a campaign, building an e-commerce experience or creating AI-powered content, our focus is always the same: Create work that connects. Build brands that people remember. Deliver creativity that drives business growth.",
    },
  ];

  return (
    <section id="about" className="py-24 md:py-36 bg-[#F8F7F5] border-t border-[#E6E1D8]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Editorial Header */}
        <div className="max-w-4xl mb-20">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] font-semibold text-[#8C6B37] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8A46B]" />
            <span>Studio Philosophy</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-[#181818] leading-[1.05] tracking-[-0.02em] mb-8">
            Creativity is Changing. <br />
            <span className="italic font-light">So Are We.</span>
          </h2>

          <p className="text-lg sm:text-xl md:text-2xl text-[#3A3836] font-light leading-relaxed">
            Rage Creative is founded on a singular conviction: when world-class creative specialists
            collaborate seamlessly and leverage intelligent technology, client results are multiplied.
          </p>
        </div>

        {/* 4 Editorial Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-20">
          {pillars.map((pillar, i) => (
            <div
              key={i}
              className="bg-white p-8 sm:p-10 rounded-2xl border border-[#E6E1D8] flex flex-col justify-between shadow-sm hover:border-[#D9D3C8] transition-colors"
            >
              <div>
                <div className="w-10 h-10 rounded-full bg-[#EDEAE4] flex items-center justify-center mb-6">
                  {pillar.icon}
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#181818] font-normal mb-4">
                  {pillar.title}
                </h3>
                <p className="text-sm sm:text-base text-[#66635F] leading-relaxed font-light">
                  {pillar.copy}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#F0ECE4] text-[11px] font-mono uppercase tracking-widest text-[#736E67]">
                Pillar 0{i + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Studio Workspace / Collaboration Atmosphere Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 rounded-2xl overflow-hidden mb-16">
          {atmosphereItems.map((item) => (
            <div
              key={item.id}
              role="button"
              tabIndex={0}
              aria-label={`View full size image for ${item.title}`}
              onClick={() => setLightboxImage(item)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setLightboxImage(item);
                }
              }}
              className="aspect-square relative rounded-2xl overflow-hidden border border-[#E6E1D8] bg-[#141414] group cursor-pointer cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-[#C8A46B]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />

              {/* Hover Pill */}
              <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono tracking-wider">
                  <Maximize2 className="w-3 h-3 text-[#C8A46B]" />
                  <span>Click for full view</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Editorial Quote & Mini CTA */}
        <div className="text-center max-w-3xl mx-auto pt-6">
          <div className="flex justify-center mb-6">
            <RageLogo size="md" color="#181818" />
          </div>
          <p className="font-serif text-3xl sm:text-4xl text-[#181818] italic font-light mb-6">
            “Let's Build Something Worth Remembering.”
          </p>
          <button
            onClick={onStartProject}
            className="inline-flex items-center gap-2 bg-[#181818] hover:bg-[#282828] text-white text-sm font-medium px-7 py-3 rounded-full transition-all shadow-sm hover:shadow-md cursor-pointer"
          >
            <span>Start Your Project With Rage</span>
            <ArrowUpRight className="w-4 h-4 text-[#C8A46B]" />
          </button>
        </div>
      </div>

      {/* Lightbox Pop-Open Modal for Atmosphere Images */}
      {lightboxImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Full view of ${lightboxImage.title}`}
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 bg-black/92 backdrop-blur-md cursor-zoom-out animate-in fade-in duration-200 select-none"
        >
          {/* Top Bar with Badges and Close Button */}
          <div
            className="w-full max-w-3xl flex items-center justify-between mb-3 px-2 text-white pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="font-serif text-sm sm:text-base text-white/90">
                {lightboxImage.title}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setLightboxImage(null)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-mono transition-colors cursor-pointer"
              aria-label="Close full view"
            >
              <X className="w-4 h-4 text-white" />
              <span className="hidden sm:inline">Close</span>
            </button>
          </div>

          {/* Full-View Image Container */}
          <div
            className="relative max-w-3xl max-h-[80vh] flex items-center justify-center cursor-zoom-out group"
            onClick={() => setLightboxImage(null)}
          >
            <img
              src={lightboxImage.image}
              alt={lightboxImage.title}
              className="max-h-[78vh] max-w-[92vw] md:max-w-3xl w-auto h-auto object-contain rounded-xl md:rounded-2xl border border-white/20 shadow-2xl transition-transform duration-300 group-hover:scale-[0.99]"
            />
          </div>

          {/* Bottom Caption & Dismiss Hint */}
          <div
            className="w-full max-w-3xl text-center mt-3 px-2 pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-xs sm:text-sm text-white/85 font-light max-w-xl mx-auto mb-1">
              {lightboxImage.subtitle}
            </p>
            <p className="text-[11px] font-mono text-white/50 tracking-wider">
              Tap anywhere to pop back into place • Press Esc to close
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
