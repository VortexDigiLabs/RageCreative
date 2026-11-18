/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

export interface RageLogoProps {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "hero";
  color?: string;
  variant?: "landscape" | "stacked";
  showTagline?: boolean;
  align?: "left" | "center" | "right";
  alt?: string;
}

/**
 * Strict image-only brand logo component.
 * Renders the official client image asset directly without any font or HTML text generation.
 */
export default function RageLogo({
  className = "",
  size = "md",
  color = "#181818",
  variant = "landscape",
  align = "left",
  alt = "Rage Creative",
}: RageLogoProps) {
  const isLight =
    color.toLowerCase() === "#ffffff" ||
    color.toLowerCase() === "#fff" ||
    color.toLowerCase() === "white";

  const src =
    variant === "landscape"
      ? isLight
        ? "/Rage Creative Logo landscape white.png"
        : "/Rage Creative Logo landscape.png"
      : isLight
      ? "/assets/Rage Creative Logo stacked white.png"
      : "/assets/Rage Creative Logo stacked.png";

  const heightMap = {
    xs: "max-h-[24px] h-6",
    sm: "max-h-[32px] h-7 sm:h-8",
    md: "max-h-[42px] h-8 sm:h-9 md:h-10",
    lg: "max-h-[50px] h-10 sm:h-11 md:h-12",
    xl: "max-h-[64px] h-12 sm:h-14 md:h-16",
    hero: "max-h-[80px] h-16 md:h-20",
  };

  const alignClass =
    align === "center"
      ? "justify-center"
      : align === "right"
      ? "justify-end"
      : "justify-start";

  return (
    <div className={`inline-flex items-center ${alignClass} select-none ${className}`}>
      <img
        src={src}
        alt={alt}
        style={{ objectFit: "contain" }}
        className={`${heightMap[size] || heightMap.md} w-auto object-contain transition-opacity duration-200`}
      />
    </div>
  );
}
