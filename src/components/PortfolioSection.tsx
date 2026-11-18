import React, { useState } from "react";
import { PROJECTS, ProjectItem } from "@/lib/rageData";
import { ArrowUpRight, Sparkles } from "lucide-react";

interface PortfolioSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

// Strict categories as requested by client:
// All, Brand Identity, Film & Photography, Digital & Web, Generative AI
const PORTFOLIO_CATEGORIES = [
  "All",
  "Brand Identity",
  "Film & Photography",
  "Digital & Web",
  "Generative AI",
] as const;

export default function PortfolioSection({ onSelectProject }: PortfolioSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredProjects =
    activeCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 md:py-36 bg-[#F8F7F5] border-t border-[#E6E1D8]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Magazine Editorial Header */}
        <div className="max-w-4xl mb-12">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] font-semibold text-[#8C6B37] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8A46B]" />
            <span>Selected Works &amp; Case Studies</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-[#181818] leading-[1.05] tracking-[-0.02em] mb-6">
            Not Just Projects. <br />
            <span className="italic font-light">Stories That Build Brands.</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#66635F] leading-relaxed font-light">
            Every project begins with a challenge. Every challenge deserves a creative solution.
            Explore a selection of work that reflects our passion for thoughtful design,
            strategic storytelling and beautifully crafted content.
          </p>

          {/* Sleek Category Filter Submenu with horizontal swipe on mobile */}
          <div className="mt-8 pt-6 border-t border-[#E6E1D8] flex items-center gap-2 -mx-5 sm:mx-0 px-5 sm:px-0 overflow-x-auto sm:overflow-visible flex-nowrap sm:flex-wrap pb-2 sm:pb-0 scrollbar-none">
            <span className="text-[11px] uppercase tracking-[0.2em] font-mono text-[#8C877E] mr-1 hidden sm:inline-block shrink-0">
              Filter By:
            </span>
            {PORTFOLIO_CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat;
              const count =
                cat === "All"
                  ? PROJECTS.length
                  : PROJECTS.filter((p) => p.category === cat).length;

              return (
                <button
                  key={cat}
                  id={`filter-btn-${cat.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative text-xs sm:text-[13px] px-3.5 sm:px-4 py-2 rounded-full transition-all duration-200 cursor-pointer flex items-center gap-2 shrink-0 whitespace-nowrap ${
                    isSelected
                      ? "bg-[#181818] text-white font-medium shadow-sm"
                      : "bg-[#EDEAE4]/80 text-[#66635F] hover:text-[#181818] hover:bg-[#EDEAE4] border border-[#E0DBD2]"
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                      isSelected
                        ? "bg-white/20 text-[#C8A46B]"
                        : "bg-white/60 text-[#8C877E]"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Editorial Magazine Layout */}
        <div className="space-y-20 md:space-y-32 mt-12">
          {filteredProjects.map((project, index) => {
            const isEven = index % 2 === 0;
            return (
              <article
                key={project.id}
                id={`project-${project.id}`}
                className="group cursor-pointer"
                onClick={() => onSelectProject(project)}
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
                    isEven ? "" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Large Editorial Imagery */}
                  <div
                    className={`lg:col-span-7 relative h-[360px] sm:h-[480px] md:h-[560px] rounded-2xl overflow-hidden border border-[#E6E1D8] shadow-sm ${
                      isEven ? "order-1" : "order-1 lg:order-2"
                    }`}
                  >
                    <img
                      src={project.heroImage}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                    {/* Image overlay badges */}
                    <div className="absolute top-6 left-6 flex items-center gap-2">
                      <span className="text-[11px] uppercase tracking-wider font-semibold px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#181818]">
                        {project.category}
                      </span>
                      <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white">
                        {project.year}
                      </span>
                    </div>

                    <div className="absolute bottom-6 right-6">
                      <div className="w-12 h-12 rounded-full bg-white text-[#181818] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <ArrowUpRight className="w-5 h-5 text-[#181818]" />
                      </div>
                    </div>
                  </div>

                  {/* Story & Quantitative Results */}
                  <div
                    className={`lg:col-span-5 flex flex-col justify-center ${
                      isEven ? "order-2" : "order-2 lg:order-1"
                    }`}
                  >
                    <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8C6B37] mb-3">
                      {project.client}
                    </div>

                    <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#181818] leading-[1.1] mb-4 group-hover:text-[#8C6B37] transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-base sm:text-lg text-[#4A4743] font-light leading-relaxed mb-6">
                      {project.tagline}
                    </p>

                    {/* Key Strategic Results */}
                    <div className="grid grid-cols-3 gap-4 py-6 my-2 border-y border-[#E6E1D8]">
                      {project.results.map((res, idx) => (
                        <div key={idx}>
                          <span className="block font-serif text-2xl sm:text-3xl text-[#181818] font-normal">
                            {res.metric}
                          </span>
                          <span className="text-[11px] text-[#736E67] uppercase tracking-wider">
                            {res.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Services Tags */}
                    <div className="flex flex-wrap gap-2 pt-4">
                      {project.servicesProvided.map((serv) => (
                        <span
                          key={serv}
                          className="text-[11px] font-mono px-2.5 py-1 rounded bg-[#EDEAE4] text-[#66635F]"
                        >
                          {serv}
                        </span>
                      ))}
                    </div>

                    <div className="pt-6">
                      <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#181818] group-hover:text-[#8C6B37] transition-colors">
                        <span>View Full Case Study</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
