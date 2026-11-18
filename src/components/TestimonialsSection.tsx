import React from "react";
import { TESTIMONIALS } from "@/lib/rageData";
import { Quote } from "lucide-react";

export default function TestimonialsSection() {
  return (
    <section className="py-24 md:py-32 bg-[#EDEAE4]/40 border-t border-[#E6E1D8]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] font-semibold text-[#8C6B37] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8A46B]" />
            <span>Reputation &amp; Trust</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#181818] leading-[1.1] tracking-tight">
            Endorsements from founders, directors, and collaborative partners.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="bg-white p-8 sm:p-10 rounded-2xl border border-[#E6E1D8] flex flex-col justify-between shadow-sm"
            >
              <div>
                <Quote className="w-6 h-6 text-[#C8A46B] mb-6 opacity-60" />
                <p className="font-serif text-lg sm:text-xl text-[#2B2927] leading-relaxed italic mb-8 font-light">
                  “{t.quote}”
                </p>
              </div>

              <div className="border-t border-[#F0ECE4] pt-4">
                <span className="block font-medium text-sm text-[#181818]">{t.author}</span>
                <span className="block text-xs text-[#736E67] font-light">{t.role}, {t.company}</span>
                <span className="block text-[11px] text-[#A8A296] font-mono mt-0.5">{t.project}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
