import React from "react";
import { Sparkles, BrainCircuit, UserCheck, Zap, ShieldCheck, ArrowDownRight } from "lucide-react";

export default function AiTechnologySection() {
  const comparisons = [
    {
      aspect: "Concept Ideation",
      traditional: "Weeks of static moodboards & limited reference images.",
      rage: "Generative set prototyping within hours; exploring 50+ divergent directions rapidly.",
    },
    {
      aspect: "Production Agility",
      traditional: "Rigid shoot plans unable to pivot without budget overruns.",
      rage: "Hybrid studio workflows combining physical cameras with synth backdrops and generative enhancements.",
    },
    {
      aspect: "Commercial Velocity",
      traditional: "Months to launch a campaign; sluggish feedback loops.",
      rage: "Rapid creative testing across formats, yielding data-backed visual iterations in days.",
    },
    {
      aspect: "Human Taste & Direction",
      traditional: "Overhead-heavy bureaucratic agency layers.",
      rage: "Direct collaboration with senior art directors and master craftspeople directing every AI model.",
    },
  ];

  const handleScrollToPortfolio = () => {
    const targetEl =
      document.getElementById("portfolio") ||
      document.getElementById("brand-accelerator");
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="ai-studio" className="py-24 md:py-32 bg-[#181818] text-[#F8F7F5] relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C8A46B]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Philosophical Editorial */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] font-semibold text-[#C8A46B]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Intelligent Frontier</span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal leading-[1.08] tracking-tight">
              Human Creativity. <br />
              <span className="italic font-light text-[#C8A46B]">Intelligent Technology.</span>
            </h2>

            <p className="text-base sm:text-lg text-[#EDEAE4]/90 font-light leading-relaxed">
              We don't use technology to replace creativity. We use it to empower exceptional lifelike creatives.
            </p>

            <div className="space-y-4 text-sm sm:text-base text-[#D4CEBF] leading-relaxed font-light">
              <p>
                By combining human insight with AI-enhanced workflows, we're able to move faster,
                think bigger and create smarter—creating beautifully crafted work that's commercially effective.
              </p>
              <p className="font-serif text-xl sm:text-2xl text-white italic pt-2">
                “Technology is simply the tool. People are the difference.”
              </p>
            </div>

            <div className="pt-4 flex items-center gap-6 text-xs text-[#A8A296] font-mono">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-4 h-4 text-[#C8A46B]" />
                <span>GenAI Workflows</span>
              </div>
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-[#C8A46B]" />
                <span>Senior Art Direction</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C8A46B]" />
                <span>Commercial Safety</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contrast Matrix */}
          <div className="lg:col-span-7 bg-[#222222] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#A8A296]">
                Methodology Matrix
              </span>
              <span className="text-xs text-[#C8A46B] font-medium">
                Traditional Agency vs Rage Ecosystem
              </span>
            </div>

            <div className="space-y-5">
              {comparisons.map((item, idx) => (
                <div key={idx} className="border-b border-white/5 pb-5 last:border-0 last:pb-0">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#C8A46B] mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8A46B]" />
                    <span>{item.aspect}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
                    <div className="bg-black/25 p-3 rounded-lg border border-white/5 text-[#8E8B85]">
                      <span className="block text-[10px] uppercase font-mono text-[#66635F] mb-1">
                        Traditional Approach
                      </span>
                      {item.traditional}
                    </div>
                    <div className="bg-[#C8A46B]/10 p-3 rounded-lg border border-[#C8A46B]/30 text-white font-medium">
                      <span className="block text-[10px] uppercase font-mono text-[#C8A46B] mb-1 flex items-center gap-1">
                        <Zap className="w-3 h-3" /> The Rage Advantage
                      </span>
                      {item.rage}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-[#C8A46B]/20 to-transparent border border-[#C8A46B]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
              <span className="text-white font-light text-sm">
                Want to see AI-empowered campaign concepts in action for your brand?
              </span>
              <button
                type="button"
                id="explore-studio-concepts-btn"
                onClick={handleScrollToPortfolio}
                className="inline-flex items-center gap-2 text-[#C8A46B] hover:text-white font-mono font-medium underline underline-offset-4 cursor-pointer text-xs transition-colors shrink-0"
              >
                <span>Explore Studio Concepts →</span>
                <ArrowDownRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
