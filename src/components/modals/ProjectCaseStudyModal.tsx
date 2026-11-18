import React from "react";
import { ProjectItem } from "@/lib/rageData";
import { X, ArrowUpRight, CheckCircle2, Sparkles, Layers } from "lucide-react";
import RageLogo from "@/components/RageLogo";

interface ProjectCaseStudyModalProps {
  project: ProjectItem | null;
  isOpen?: boolean;
  onClose: () => void;
  onStartSimilarProject: (project: ProjectItem) => void;
}

export default function ProjectCaseStudyModal({
  project,
  onClose,
  onStartSimilarProject,
}: ProjectCaseStudyModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[1150] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-[#F8F7F5] rounded-3xl border border-[#E6E1D8] shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top-left Brand Monogram */}
        <div className="absolute top-6 left-6 z-20 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 shadow-lg flex items-center gap-2">
          <RageLogo size="xs" color="#FFFFFF" showTagline={false} />
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#C8A46B]">
            Archive
          </span>
        </div>

        {/* Sticky Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center backdrop-blur-sm transition-colors cursor-pointer shadow-lg"
          aria-label="Close Case Study"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Banner with Editorial Typography */}
        <div className="relative h-[340px] sm:h-[450px] w-full overflow-hidden">
          <img
            src={project.heroImage}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          <div className="absolute bottom-8 left-8 right-8 text-white">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] uppercase tracking-[0.2em] font-mono text-[#C8A46B] font-semibold">
                {project.client}
              </span>
              <span className="text-white/40">•</span>
              <span className="text-xs text-white/80">{project.category}</span>
              <span className="text-white/40">•</span>
              <span className="text-xs font-mono text-white/80">{project.year}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-tight">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base text-white/80 font-light mt-2 max-w-xl">
              {project.tagline}
            </p>
          </div>
        </div>

        {/* Editorial Body Content */}
        <div className="p-8 sm:p-12 max-h-[60vh] overflow-y-auto space-y-10">
          {/* Results Bar */}
          <div className="grid grid-cols-3 gap-4 p-6 rounded-2xl bg-white border border-[#E6E1D8] shadow-sm">
            {project.results.map((res, i) => (
              <div key={i} className="text-center sm:text-left">
                <span className="block font-serif text-3xl sm:text-4xl font-semibold text-[#181818]">
                  {res.metric}
                </span>
                <span className="text-xs text-[#736E67] font-medium block mt-0.5">
                  {res.label}
                </span>
              </div>
            ))}
          </div>

          {/* Challenge & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <span className="text-[11px] uppercase tracking-[0.2em] font-mono text-[#8C6B37] font-semibold block">
                The Creative Challenge
              </span>
              <p className="text-sm sm:text-base text-[#3A3836] leading-relaxed font-light">
                {project.challenge}
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-[11px] uppercase tracking-[0.2em] font-mono text-[#8C6B37] font-semibold block">
                The Rage Creative Solution
              </span>
              <p className="text-sm sm:text-base text-[#3A3836] leading-relaxed font-light">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Secondary Editorial Images */}
          {project.secondaryImages && project.secondaryImages.length > 0 && (
            <div className="space-y-4">
              <span className="text-[11px] uppercase tracking-[0.2em] font-mono text-[#736E67] block">
                Campaign Gallery
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.secondaryImages.map((img, idx) => (
                  <div key={idx} className="h-64 sm:h-72 rounded-2xl overflow-hidden border border-[#E6E1D8]">
                    <img
                      src={img}
                      alt={`${project.title} detail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Deliverables tags */}
          <div className="pt-4 border-t border-[#E6E1D8]">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#181818] block mb-3">
              Disciplines Delivered
            </span>
            <div className="flex flex-wrap gap-2">
              {project.servicesProvided.map((s) => (
                <span
                  key={s}
                  className="text-xs px-3.5 py-1.5 rounded-full bg-[#EDEAE4] text-[#181818] border border-[#E0DBD2] font-medium"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTA Box */}
          <div className="p-8 rounded-2xl bg-[#181818] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
            <div>
              <h4 className="font-serif text-2xl font-normal text-white mb-1">
                Inspired by this project?
              </h4>
              <p className="text-xs text-[#D4CEBF] font-light">
                Let's discuss how we can build a comparable bespoke narrative for your brand.
              </p>
            </div>

            <button
              onClick={() => onStartSimilarProject(project)}
              className="inline-flex items-center gap-2 bg-[#C8A46B] hover:bg-[#B89358] text-[#181818] text-xs font-semibold px-6 py-3.5 rounded-full transition-all shadow-md cursor-pointer whitespace-nowrap"
            >
              <span>Build A Similar Campaign</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
