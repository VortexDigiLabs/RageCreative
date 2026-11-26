import React from "react";
import { RAGE_BRAND } from "@/lib/rageData";
import { ArrowUp, Mail, Phone, MapPin, Facebook, Instagram } from "lucide-react";

// ─── FEATURE FLAGS (keep in sync with App.tsx) ───────────────────────────────
const SHOW_PORTFOLIO = false;
// ─────────────────────────────────────────────────────────────────────────────

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
  onOpenCollaborator: () => void;
}

export default function Footer({
  onNavigate,
  onOpenBooking,
  onOpenCollaborator,
}: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#141414] text-[#F8F7F5] pt-20 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-6">
            <img
              src="/Rage Creative Logo landscape white.png"
              alt="Rage Creative"
              className="h-9 sm:h-10 w-auto object-contain max-h-[44px]"
              style={{ maxHeight: "44px", width: "auto", objectFit: "contain" }}
            />
            <p className="text-xs sm:text-sm text-[#A8A296] font-light leading-relaxed max-w-sm">
              Creative Studio &amp; Collaborative Ecosystem. We combine human insight, world-class
              production and intelligent technology to build brands people remember.
            </p>

            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={RAGE_BRAND.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#C8A46B] text-white hover:text-[#181818] flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={RAGE_BRAND.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#C8A46B] text-white hover:text-[#181818] flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>

            <div className="text-xs font-mono text-[#C8A46B]">
              South Africa &amp; Global with Collaborative Reach
            </div>
          </div>

          {/* Disciplines Column - The 5 Pillars */}
          <div className="md:col-span-3 space-y-4">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#C8A46B] block font-semibold">
              The Five Pillars
            </span>
            <ul className="space-y-2.5 text-xs text-[#D4CEBF]">
              <li>
                <button
                  onClick={() => onNavigate("services")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Brand &amp; Identity
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("services")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Creative Content Production
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("services")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Digital Experiences: Websites &amp; Apps
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("services")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Strategic Marketing &amp; Paid Advertising
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("services")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  AI Creative Studio
                </button>
              </li>
            </ul>
          </div>

          {/* Ecosystem Column */}
          <div className="md:col-span-2 space-y-4">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#C8A46B] block font-semibold">
              Navigation
            </span>
            <ul className="space-y-2.5 text-xs text-[#D4CEBF]">
              <li>
                <button
                  onClick={() => onNavigate("hero")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("about")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  About
                </button>
              </li>
              {SHOW_PORTFOLIO && (
              <li>
                <button
                  onClick={() => onNavigate("portfolio")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Portfolio
                </button>
              </li>
              )}
              <li>
                <button
                  onClick={() => onNavigate("brand-accelerator")}
                  className="hover:text-white transition-colors cursor-pointer text-left font-medium text-[#C8A46B]"
                >
                  Accelerate Your Brand (R4,000)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("collaborate")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Collaborate
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("contact")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="md:col-span-3 space-y-4">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#C8A46B] block font-semibold">
              Studio &amp; Leadership
            </span>
            <div className="space-y-2 text-xs text-[#D4CEBF]">
              <div className="text-white font-medium">
                {RAGE_BRAND.ceo} <span className="text-[#A8A296] font-normal">({RAGE_BRAND.ceoTitle})</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C8A46B] shrink-0" />
                <a href={`tel:${RAGE_BRAND.phone.replace(/\s+/g, '')}`} className="hover:text-white">
                  {RAGE_BRAND.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C8A46B] shrink-0" />
                <a href={`mailto:${RAGE_BRAND.businessEmail}`} className="hover:text-white font-mono">
                  {RAGE_BRAND.businessEmail}
                </a>
              </div>
              <div className="flex items-start gap-2 pt-1 text-[#A8A296]">
                <MapPin className="w-3.5 h-3.5 text-[#C8A46B] shrink-0 mt-0.5" />
                <span>{RAGE_BRAND.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#736E67]">
          <div>
            © {new Date().getFullYear()} Rage Creative (Pty) Ltd. Build a Brand People Remember.
          </div>

          <div className="flex items-center gap-6">
            <a
              href={`mailto:${RAGE_BRAND.businessEmail}`}
              className="hover:text-[#C8A46B] font-mono transition-colors"
            >
              {RAGE_BRAND.businessEmail}
            </a>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
