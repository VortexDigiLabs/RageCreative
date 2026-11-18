import React from "react";

interface BokehEffectProps {
  opacity?: number; // default 0.3 (30%)
}

export default function BokehEffect({ opacity = 0.3 }: BokehEffectProps) {
  return (
    <div
      className="absolute inset-0 pointer-events-none select-none overflow-hidden z-10 mix-blend-screen"
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* ========================================================================= */}
      {/* 30% OPTICAL BOKEH EFFECT LAYER (Prime Lens Aperture & Golden Light Orbs)  */}
      {/* ========================================================================= */}

      {/* Group 1: Large Out-of-Focus Golden Orbs */}
      <div className="absolute inset-0 animate-bokeh-1">
        {/* Top Right Warm Champagne Bokeh Disc */}
        <div
          className="absolute -top-12 right-1/4 w-72 h-72 sm:w-96 sm:h-96 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(200, 164, 107, 0.75) 0%, rgba(200, 164, 107, 0.4) 40%, rgba(200, 164, 107, 0.15) 70%, transparent 80%)",
            filter: "blur(28px)",
          }}
        />

        {/* Center-Left Soft Halo Orb */}
        <div
          className="absolute top-1/3 -left-16 w-80 h-80 sm:w-[420px] sm:h-[420px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(232, 216, 195, 0.7) 0%, rgba(200, 164, 107, 0.35) 45%, transparent 75%)",
            filter: "blur(36px)",
          }}
        />

        {/* Bottom Center Golden Sunbeam Bokeh */}
        <div
          className="absolute -bottom-20 left-1/3 w-80 h-80 sm:w-96 sm:h-96 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(212, 175, 55, 0.65) 0%, rgba(200, 164, 107, 0.3) 50%, transparent 80%)",
            filter: "blur(32px)",
          }}
        />
      </div>

      {/* Group 2: Medium Aperture Ring Discs (Classic Photographic Lens Bokeh) */}
      <div className="absolute inset-0 animate-bokeh-2">
        {/* Top Center-Right Crisp Ring Bokeh */}
        <div
          className="absolute top-20 right-1/3 w-40 h-40 sm:w-56 sm:h-56 rounded-full border border-[#E8D8C3]/60"
          style={{
            background:
              "radial-gradient(circle, rgba(255, 253, 248, 0.5) 0%, rgba(200, 164, 107, 0.3) 60%, rgba(200, 164, 107, 0.6) 95%, transparent 100%)",
            filter: "blur(14px)",
          }}
        />

        {/* Mid-Lower Left Bokeh Disc */}
        <div
          className="absolute top-1/2 left-1/4 w-36 h-36 sm:w-48 sm:h-48 rounded-full border border-[#C8A46B]/50"
          style={{
            background:
              "radial-gradient(circle, rgba(232, 216, 195, 0.6) 0%, rgba(200, 164, 107, 0.25) 70%, rgba(200, 164, 107, 0.5) 95%, transparent 100%)",
            filter: "blur(12px)",
          }}
        />

        {/* Upper Left Delicate Shimmer Orb */}
        <div
          className="absolute top-16 left-1/5 w-28 h-28 sm:w-36 sm:h-36 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(200, 164, 107, 0.4) 55%, transparent 75%)",
            filter: "blur(10px)",
          }}
        />

        {/* Far Right Lower Lens Flare Disc */}
        <div
          className="absolute bottom-1/4 -right-12 w-64 h-64 rounded-full border border-[#E8D8C3]/40"
          style={{
            background:
              "radial-gradient(circle, rgba(200, 164, 107, 0.5) 0%, rgba(232, 216, 195, 0.2) 65%, transparent 85%)",
            filter: "blur(20px)",
          }}
        />
      </div>

      {/* Group 3: Small Sparkling Bokeh Points & Lens Flare Artifacts */}
      <div className="absolute inset-0 animate-bokeh-3">
        {/* Floating Sparkle 1 */}
        <div
          className="absolute top-1/4 right-1/6 w-16 h-16 sm:w-24 sm:h-24 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(200, 164, 107, 0.5) 50%, transparent 75%)",
            filter: "blur(6px)",
          }}
        />

        {/* Floating Sparkle 2 */}
        <div
          className="absolute bottom-1/3 left-1/3 w-20 h-20 sm:w-28 sm:h-28 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(232, 216, 195, 0.8) 0%, rgba(200, 164, 107, 0.4) 60%, transparent 80%)",
            filter: "blur(8px)",
          }}
        />

        {/* Floating Sparkle 3 */}
        <div
          className="absolute top-2/3 right-1/4 w-14 h-14 sm:w-20 sm:h-20 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255, 253, 248, 0.85) 0%, rgba(212, 175, 55, 0.45) 55%, transparent 80%)",
            filter: "blur(5px)",
          }}
        />

        {/* Top Left Golden Glimmer */}
        <div
          className="absolute top-36 left-12 w-24 h-24 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(200, 164, 107, 0.7) 0%, rgba(232, 216, 195, 0.3) 60%, transparent 80%)",
            filter: "blur(9px)",
          }}
        />
      </div>

      {/* Subtle Soft Atmospheric Ambient Lens Tint */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#C8A46B]/15 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
