import React from "react";
import { COLLABORATIVE_ECOSYSTEM } from "@/lib/rageData";
import { ArrowUpRight, Users2, DollarSign, Globe2, Briefcase, Share2, Sparkles } from "lucide-react";

interface CollaborateSectionProps {
  onOpenCollaborator: () => void;
}

export default function CollaborateSection({ onOpenCollaborator }: CollaborateSectionProps) {
  const benefitIcons = [
    <Briefcase key="1" className="w-5 h-5 text-[#C8A46B]" />,
    <Globe2 key="2" className="w-5 h-5 text-[#C8A46B]" />,
    <Users2 key="3" className="w-5 h-5 text-[#C8A46B]" />,
    <DollarSign key="4" className="w-5 h-5 text-[#C8A46B]" />,
  ];

  return (
    <section id="collaborate" className="py-24 md:py-36 bg-[#181818] text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-[#C8A46B]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Editorial Header */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] font-semibold text-[#C8A46B] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Creative Collective</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.05] tracking-[-0.02em] mb-6">
            Great Brands <br />
            <span className="italic font-light text-[#C8A46B]">Aren't Built Alone.</span>
          </h2>

          <p className="text-lg sm:text-xl text-[#EDEAE4]/80 font-light leading-relaxed">
            {COLLABORATIVE_ECOSYSTEM.subheading}
          </p>
        </div>

        {/* Why Collaborate Benefits 4-grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {COLLABORATIVE_ECOSYSTEM.whyCollaborate.map((item, i) => (
            <div
              key={i}
              className="bg-[#222222] border border-white/10 p-6 sm:p-8 rounded-2xl flex flex-col justify-between hover:border-[#C8A46B]/50 transition-colors"
            >
              <div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-5">
                  {benefitIcons[i]}
                </div>
                <h3 className="font-serif text-2xl font-normal text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#A8A296] leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
              <span className="text-[10px] font-mono text-[#C8A46B] mt-6 block uppercase tracking-widest">
                Advantage 0{i + 1}
              </span>
            </div>
          ))}
        </div>

        {/* Transparent Revenue & Participation Model */}
        <div className="bg-[#242424] border border-[#C8A46B]/40 rounded-2xl p-8 sm:p-12 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-[#C8A46B] block mb-2 font-semibold">
                Transparent Economics
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-white font-normal leading-tight mb-4">
                {COLLABORATIVE_ECOSYSTEM.revenueModel.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#D4CEBF] font-light leading-relaxed">
                We believe exceptional creators deserve exceptional transparency.
              </p>
            </div>

            <div className="lg:col-span-7 space-y-4 text-sm sm:text-base text-[#EDEAE4]/90 font-light leading-relaxed">
              <p>
                {COLLABORATIVE_ECOSYSTEM.revenueModel.description}
              </p>
              <div className="pt-2 flex flex-wrap gap-2">
                {COLLABORATIVE_ECOSYSTEM.rolesWanted.map((role) => (
                  <span
                    key={role}
                    className="text-xs px-3 py-1 rounded-full bg-white/10 text-white border border-white/15"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA to Apply */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-8 rounded-2xl bg-gradient-to-r from-[#C8A46B]/20 via-[#262626] to-[#262626] border border-[#C8A46B]/30">
          <div>
            <h4 className="font-serif text-2xl sm:text-3xl font-normal text-white mb-2">
              Ready to create work that commands attention?
            </h4>
            <p className="text-xs sm:text-sm text-[#D4CEBF] font-light">
              Join our network of photographers, developers, stylists, and AI specialists.
            </p>
          </div>

          <button
            id="collaborate-apply-btn"
            onClick={onOpenCollaborator}
            className="inline-flex items-center gap-2 bg-[#C8A46B] hover:bg-[#B89358] text-[#181818] font-semibold text-sm px-7 py-3.5 rounded-full transition-all shadow-md cursor-pointer whitespace-nowrap"
          >
            <span>Become a Collaborator</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
