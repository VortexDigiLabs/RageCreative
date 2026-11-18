import React from "react";
import { BRAND_ACCELERATOR } from "@/lib/rageData";
import {
  Check,
  ArrowUpRight,
  Sparkles,
  Target,
  CheckCircle2,
  Clock,
  Layers,
  FileCheck2,
  HelpCircle,
} from "lucide-react";

interface BrandAcceleratorSectionProps {
  onBookPackage: () => void;
}

export default function BrandAcceleratorSection({ onBookPackage }: BrandAcceleratorSectionProps) {
  return (
    <section
      id="brand-accelerator"
      className="py-24 md:py-36 bg-[#EDEAE4]/50 border-t border-[#E6E1D8] relative"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C8A46B]/40 bg-white text-[11px] uppercase tracking-[0.25em] font-semibold text-[#8C6B37] mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#C8A46B]" />
            <span>{BRAND_ACCELERATOR.header}</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-[#181818] leading-[1.05] tracking-[-0.02em] mb-6">
            {BRAND_ACCELERATOR.tagline}
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-[#3A3836] font-light leading-relaxed max-w-3xl mx-auto mb-8 font-sans">
            {BRAND_ACCELERATOR.intro}
          </p>

          {/* Pricing Banner Pill */}
          <div className="inline-block p-1 rounded-2xl bg-gradient-to-r from-[#181818] via-[#2A2826] to-[#181818] shadow-lg">
            <div className="px-6 py-3 rounded-xl bg-[#181818] border border-[#C8A46B]/30 flex flex-wrap items-center justify-center gap-3 text-center">
              <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.18em] text-[#C8A46B] font-semibold">
                ONE WEEK. ONE CLEAR DIRECTION. ONE STRONGER BRAND.
              </span>
              <span className="hidden sm:inline text-white/30">|</span>
              <span className="text-xs sm:text-sm font-mono text-white font-medium">
                Once-off investment of <span className="text-[#C8A46B] font-bold">R4,000</span>
              </span>
            </div>
          </div>
        </div>

        {/* 11 Step Deliverables Grid */}
        <div className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-[#D9D3C8]">
            <div>
              <span className="text-[11px] uppercase tracking-[0.2em] font-mono text-[#8C6B37] font-semibold block mb-1">
                The 11 Core Deliverables
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl text-[#181818] font-normal">
                Everything Delivered in 1 Focused Week
              </h3>
            </div>
            <span className="text-xs font-mono text-[#736E67] bg-white px-3 py-1.5 rounded-full border border-[#D9D3C8]">
              Turnaround: 7 Days Flat
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {BRAND_ACCELERATOR.deliverables.map((item) => (
              <div
                key={item.step}
                className="bg-white hover:bg-[#181818] p-6 sm:p-7 rounded-2xl border border-[#E6E1D8] hover:border-[#C8A46B]/60 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-10 h-10 rounded-xl bg-[#EDEAE4] text-[#181818] group-hover:bg-[#C8A46B] group-hover:text-[#181818] transition-colors flex items-center justify-center font-mono text-xs font-semibold">
                      {item.step}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C6B37] group-hover:text-[#C8A46B] transition-colors">
                      Week 1
                    </span>
                  </div>
                  <h4 className="font-serif text-xl sm:text-2xl font-normal text-[#181818] group-hover:text-white mb-2.5 leading-snug transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#66635F] group-hover:text-[#EAE6DF]/90 leading-relaxed font-light transition-colors">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#F0ECE4] group-hover:border-white/10 flex items-center gap-1.5 text-[11px] font-medium text-[#8C6B37] group-hover:text-[#C8A46B] transition-colors">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C8A46B]" />
                  <span>Guaranteed Deliverable</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Qualifier & Outcomes 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20">
          {/* Who Is It For? (Qualifier Box) */}
          <div className="lg:col-span-6 bg-white border border-[#E6E1D8] p-8 sm:p-10 rounded-3xl shadow-sm flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-mono text-[#8C6B37] font-semibold mb-3">
                <Target className="w-3.5 h-3.5 text-[#C8A46B]" />
                <span>Who Is It For?</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#181818] font-normal leading-tight mb-4">
                Designed for Businesses Ready for Growth
              </h3>
              <p className="text-sm text-[#66635F] font-light leading-relaxed mb-6">
                The Brand Accelerator is precisely calibrated for business owners who want immediate,
                high-leverage clarity without paying for a months-long traditional agency rebrand.
              </p>

              <div className="space-y-3.5">
                {BRAND_ACCELERATOR.qualifiers.map((qual, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#C8A46B]/15 text-[#8C6B37] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[2.5]" />
                    </div>
                    <span className="text-xs sm:text-sm text-[#3A3836] leading-snug">
                      {qual}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#F0ECE4] text-xs text-[#736E67]">
              Fits founders, service practitioners, boutique studios, and ambitious scale-ups.
            </div>
          </div>

          {/* Outcomes Section (What You Walk Away With) */}
          <div className="lg:col-span-6 bg-[#181818] text-white border border-white/10 p-8 sm:p-10 rounded-3xl shadow-xl flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-mono text-[#C8A46B] font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Concrete Impact</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl text-white font-normal leading-tight mb-4">
                What You Walk Away With
              </h3>
              <p className="text-sm text-[#D4CEBF] font-light leading-relaxed mb-6">
                In 7 days, eliminate the friction holding your business back and launch a cohesive,
                commanding market presence.
              </p>

              <div className="space-y-4">
                {BRAND_ACCELERATOR.outcomes.map((out, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3.5"
                  >
                    <div className="font-mono text-xs font-semibold text-[#C8A46B] mt-0.5">
                      0{idx + 1}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-0.5">
                        {out.title}
                      </h4>
                      <p className="text-xs text-[#EAE6DF]/80 font-light leading-snug">
                        {out.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs text-[#A8A296] font-mono">
              <span>Ready for Immediate Deployment</span>
              <span className="text-[#C8A46B]">100% Asset Ownership</span>
            </div>
          </div>
        </div>

        {/* Who Is It Designed For Subsection */}
        <div className="bg-white border border-[#E6E1D8] rounded-3xl p-8 sm:p-10 md:p-12 shadow-sm mb-20">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-mono text-[#8C6B37] font-semibold mb-3">
              <Target className="w-3.5 h-3.5 text-[#C8A46B]" />
              <span>Ideal Fit</span>
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#181818] font-normal leading-tight">
              Who is it designed for
            </h3>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BRAND_ACCELERATOR.designedFor.map((bullet, idx) => (
              <li
                key={idx}
                className="p-6 rounded-2xl bg-[#F8F7F5] border border-[#E6E1D8] flex items-start gap-3.5"
              >
                <div className="w-6 h-6 rounded-full bg-[#C8A46B]/15 text-[#8C6B37] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <span className="text-sm text-[#3A3836] leading-relaxed font-light">
                  {bullet}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Final CTA Box */}
        <div className="bg-[#181818] text-white border border-[#C8A46B]/40 rounded-3xl p-8 sm:p-14 text-center shadow-2xl relative overflow-hidden">
          {/* Subtle gold backlight */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#C8A46B]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-[#C8A46B] font-semibold block">
              {BRAND_ACCELERATOR.ctaBox.headline}
            </span>

            <p className="font-serif text-2xl sm:text-4xl md:text-5xl font-normal text-white leading-tight italic">
              “{BRAND_ACCELERATOR.ctaBox.subtext}”
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                id="book-brand-accelerator-final-btn"
                onClick={onBookPackage}
                className="group inline-flex items-center gap-2.5 bg-[#C8A46B] hover:bg-[#D4B37D] text-[#181818] text-sm sm:text-base font-semibold px-8 py-4 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
              >
                <span>{BRAND_ACCELERATOR.ctaBox.buttonText}</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>

            <div className="pt-2 text-[11px] text-[#A8A296] font-mono">
              Direct booking with Gareth Ellis &amp; the Rage Creative team • Limited weekly slots
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
