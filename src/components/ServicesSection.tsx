import React, { useState, useEffect } from "react";
import { SERVICES, ServiceItem } from "@/lib/rageData";
import { ArrowUpRight, Plus, Minus, CheckCircle2, Sparkles, BarChart3, Maximize2, X } from "lucide-react";

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
}

interface ActiveLightboxImage {
  url: string;
  title: string;
  video?: string;
  highlight?: string;
  serviceId?: string;
}

export default function ServicesSection({ onSelectService }: ServicesSectionProps) {
  // Default expanded to first pillar: Brand & Identity
  const [expandedId, setExpandedId] = useState<string>("branding");
  // Lightbox state for popping open the image to full view
  const [lightboxImage, setLightboxImage] = useState<ActiveLightboxImage | null>(null);

  const toggleService = (id: string) => {
    setExpandedId((prev) => (prev === id ? "" : id));
  };

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

  return (
    <section id="services" className="py-24 md:py-32 border-t border-[#E6E1D8] bg-[#F8F7F5]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] font-semibold text-[#8C6B37] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8A46B]" />
            <span>The Five Pillars</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-[#181818] leading-[1.05] tracking-[-0.02em] mb-6">
            Everything Your Brand Needs. <br />
            <span className="italic font-light">One Creative Partner.</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#66635F] leading-relaxed font-light">
            From strategic branding and high-calibre content production to custom digital platforms,
            data-driven marketing and AI-powered creative solutions.
          </p>
        </div>

        {/* Interactive Expandable Services Accordion */}
        <div className="space-y-4">
          {SERVICES.map((service, index) => {
            const isExpanded = expandedId === service.id;
            return (
              <div
                key={service.id}
                id={`service-card-${service.id}`}
                className={`transition-all duration-300 rounded-2xl border ${
                  isExpanded
                    ? "bg-white border-[#C8A46B]/60 shadow-lg ring-1 ring-[#C8A46B]/25"
                    : "bg-[#FFFFFF]/70 hover:bg-white border-[#E6E1D8] hover:border-[#D9D3C8]"
                }`}
              >
                {/* Accordion Trigger Header */}
                <button
                  type="button"
                  onClick={() => toggleService(service.id)}
                  className="w-full text-left p-6 sm:p-8 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-center gap-4 sm:gap-8 flex-1 min-w-0">
                    <span className="font-mono text-xs sm:text-sm text-[#8C877E] tracking-wider w-8">
                      0{index + 1}
                    </span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#181818] font-normal tracking-tight">
                          {service.title}
                        </h3>
                        {service.highlightBadge && (
                          <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-full bg-[#EDEAE4] text-[#8C6B37] border border-[#E0DBD2]">
                            {service.id === "marketing" ? (
                              <BarChart3 className="w-3 h-3 text-[#C8A46B]" />
                            ) : service.id === "ai-studio" ? (
                              <Sparkles className="w-3 h-3 text-[#C8A46B]" />
                            ) : null}
                            <span>{service.highlightBadge}</span>
                          </span>
                        )}
                      </div>
                      <p className="hidden sm:block text-xs sm:text-sm text-[#736E67] mt-1 font-light truncate">
                        {service.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <span className="hidden md:inline-block text-xs uppercase tracking-wider font-medium text-[#736E67]">
                      {isExpanded ? "Collapse" : "Explore Pillar"}
                    </span>
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                        isExpanded ? "bg-[#181818] text-white" : "bg-[#EDEAE4] text-[#181818]"
                      }`}
                    >
                      {isExpanded ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </div>
                </button>

                {/* Expanded Detailed Content */}
                {isExpanded && (
                  <div className="p-6 sm:p-8 md:p-10 border-t border-[#F0ECE4] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
                    {/* Visual Preview (Craft Signature Image Slot - Click to Pop Open) */}
                    <div
                      role="button"
                      tabIndex={0}
                      aria-label={`View full size media for ${service.title}`}
                      onClick={() =>
                        setLightboxImage({
                          url: service.image,
                          title: service.title,
                          video: service.video,
                          highlight: service.highlight,
                          serviceId: service.id,
                        })
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setLightboxImage({
                            url: service.image,
                            title: service.title,
                            video: service.video,
                            highlight: service.highlight,
                            serviceId: service.id,
                          });
                        }
                      }}
                      className="lg:col-span-5 h-[290px] sm:h-[340px] md:h-[360px] rounded-2xl overflow-hidden relative border border-[#E6E1D8] bg-[#080808] shadow-sm group cursor-pointer cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-[#C8A46B]"
                    >
                      {service.video ? (
                        <video
                          src={service.video}
                          poster={service.image}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                        />
                      )}

                      {/* Hover Pill Indicating Full-View Zoom */}
                      <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono tracking-wider">
                          <Maximize2 className="w-3 h-3 text-[#C8A46B]" />
                          <span>Click for full view</span>
                        </span>
                      </div>
                    </div>

                    {/* Explanations, subservices, and deliverables */}
                    <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                      <p className="text-sm sm:text-base text-[#3A3836] leading-relaxed font-light">
                        {service.description}
                      </p>

                      {/* Sub-services pills */}
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#181818] block mb-2.5">
                          Specialisations &amp; Formats
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {service.subservices.map((sub) => (
                            <span
                              key={sub}
                              className="text-xs font-medium px-3 py-1.5 rounded-full bg-[#EDEAE4] text-[#181818] border border-[#E0DBD2]"
                            >
                              {sub}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Deliverables List */}
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#181818] block mb-2.5">
                          Key Deliverables
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {service.deliverables.map((item) => (
                            <div key={item} className="flex items-center gap-2 text-xs text-[#66635F]">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#C8A46B] shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CTA to inquire */}
                      <div className="pt-4 border-t border-[#F0ECE4] flex flex-wrap items-center justify-between gap-3">
                        <div className="text-xs text-[#736E67]">
                          Ready to deploy this capability for your brand?
                        </div>
                        <button
                          type="button"
                          id={`inquire-${service.id}`}
                          onClick={() => onSelectService(service)}
                          className="group inline-flex items-center gap-2 bg-[#181818] hover:bg-[#282828] text-white text-xs font-medium px-5 py-2.5 rounded-full transition-all cursor-pointer shadow-sm hover:shadow-md"
                        >
                          <span>{service.ctaText || `Inquire About ${service.title}`}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-[#C8A46B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* FULL-VIEW POP OPEN LIGHTBOX MODAL                                         */}
      {/* Pops open to full view on click, and pops back into place when clicked    */}
      {/* ========================================================================= */}
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
            className="w-full max-w-4xl flex items-center justify-between mb-3 px-2 text-white pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] px-2.5 py-1 rounded-full bg-[#C8A46B]/20 border border-[#C8A46B]/40 text-[#E6CA9E]">
                Craft Signature
              </span>
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

          {/* Full-View Media Container (Clicking pops back into place) */}
          <div
            className="relative max-w-4xl max-h-[80vh] flex items-center justify-center cursor-zoom-out group"
            onClick={() => setLightboxImage(null)}
          >
            {lightboxImage.video ? (
              <video
                src={lightboxImage.video}
                poster={lightboxImage.url}
                controls
                autoPlay
                loop
                playsInline
                className="max-h-[78vh] max-w-[92vw] md:max-w-4xl w-auto h-auto object-contain rounded-xl md:rounded-2xl border border-white/20 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <img
                src={lightboxImage.url}
                alt={lightboxImage.title}
                className="max-h-[78vh] max-w-[92vw] md:max-w-4xl w-auto h-auto object-contain rounded-xl md:rounded-2xl border border-white/20 shadow-2xl transition-transform duration-300 group-hover:scale-[0.99]"
                referrerPolicy="no-referrer"
              />
            )}
          </div>

          {/* Bottom Caption & Dismiss Hint */}
          <div
            className="w-full max-w-4xl text-center mt-3 px-2 pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {lightboxImage.highlight && (
              <p className="text-xs sm:text-sm text-white/85 font-light max-w-xl mx-auto mb-1">
                {lightboxImage.highlight}
              </p>
            )}
            <p className="text-[11px] font-mono text-white/50 tracking-wider">
              Tap anywhere to pop back into place • Press Esc to close
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
