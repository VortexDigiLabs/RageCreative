import React from "react";
import { PROCESS_STEPS } from "@/lib/rageData";

export default function ProcessSection() {
  return (
    <section className="py-24 md:py-32 bg-[#F8F7F5] border-t border-[#E6E1D8]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] font-semibold text-[#8C6B37] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8A46B]" />
            <span>Methodology</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl font-normal text-[#181818] leading-[1.08] tracking-tight mb-6">
            Strategy Before Design. <br />
            <span className="italic font-light">Execution Without Compromise.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#66635F] leading-relaxed font-light">
            Every engagement follows a deliberate, battle-tested rhythm designed to eliminate guesswork,
            respect your timeline, and yield commercially potent creative assets.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.step}
              className="border-t-2 border-[#181818] pt-6 flex flex-col justify-between"
            >
              <div>
                <span className="font-serif text-4xl font-light text-[#8C6B37] block mb-4">
                  {step.step}
                </span>
                <h3 className="font-serif text-2xl font-normal text-[#181818] mb-3">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#66635F] leading-relaxed font-light">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
