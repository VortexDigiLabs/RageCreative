import React, { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X, Instagram, Facebook } from "lucide-react";
import { RAGE_BRAND } from "@/lib/rageData";

interface NavigationProps {
  activeSection?: string;
  onNavigate?: (sectionId: string) => void;
  onOpenBooking?: () => void;
  onStartProject?: () => void;
  onOpenCollaborator: () => void;
}

export default function Navigation({
  activeSection = "hero",
  onNavigate,
  onOpenBooking,
  onStartProject,
  onOpenCollaborator,
}: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Strictly ordered according to client specification:
  // 1. Home, 2. About, 3. Services, 4. Portfolio, 5. Accelerate Your Brand, 6. Collaborate, 7. Contact
  const navLinks = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "portfolio", label: "Portfolio" },
    { id: "brand-accelerator", label: "Accelerate Your Brand", badge: "R4,000" },
    { id: "collaborate", label: "Collaborate" },
    { id: "contact", label: "Contact" },
  ];

  const handleLinkClick = (id: string) => {
    if (onNavigate) {
      onNavigate(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
    setMobileMenuOpen(false);
  };

  const handleBookingTrigger = () => {
    if (onStartProject) onStartProject();
    else if (onOpenBooking) onOpenBooking();
  };

  return (
    <header
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#F8F7F5]/95 backdrop-blur-md border-b border-[#E6E1D8] shadow-[0_4px_24px_-10px_rgba(0,0,0,0.06)] py-3"
          : "bg-[#F8F7F5]/75 backdrop-blur-sm py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo - Official Image Asset */}
        <button
          id="nav-logo-btn"
          onClick={() => handleLinkClick("hero")}
          className="group flex items-center cursor-pointer text-left focus:outline-none"
          aria-label="Rage Creative Home"
        >
          <img
            src="/Rage Creative Logo landscape.png"
            alt="Rage Creative"
            className="h-8 md:h-10 w-auto object-contain max-h-[42px]"
            style={{ maxHeight: "42px", width: "auto", objectFit: "contain" }}
          />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => handleLinkClick(link.id)}
                className={`text-[13px] tracking-wide transition-all cursor-pointer relative py-1 flex items-center gap-1.5 ${
                  isActive
                    ? "text-[#181818] font-semibold"
                    : "text-[#66635F] hover:text-[#181818] font-medium"
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#C8A46B]/15 text-[#8C6B37] font-semibold tracking-normal">
                    {link.badge}
                  </span>
                )}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#C8A46B] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Desktop Right: Socials & CTAs */}
        <div className="hidden xl:flex items-center gap-4">
          {/* Active Social Media Links */}
          <div className="flex items-center gap-1 pr-2 border-r border-[#E6E1D8]">
            <a
              href={RAGE_BRAND.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[#736E67] hover:text-[#181818] hover:bg-[#EDEAE4] rounded-full transition-colors"
              aria-label="Rage Creative on Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href={RAGE_BRAND.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[#736E67] hover:text-[#181818] hover:bg-[#EDEAE4] rounded-full transition-colors"
              aria-label="Rage Creative on Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>

          <button
            id="nav-start-project-btn"
            onClick={handleBookingTrigger}
            className="group relative inline-flex items-center gap-2 bg-[#181818] hover:bg-[#282828] text-white text-[13px] font-medium px-5 py-2.5 rounded-full transition-all duration-200 shadow-sm cursor-pointer hover:shadow-md"
          >
            <span>Start Your Project</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#C8A46B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile & Tablet Controls */}
        <div className="xl:hidden flex items-center gap-1 sm:gap-2">
          {/* Quick Social Links on Mobile */}
          <a
            href={RAGE_BRAND.socials.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-[#736E67] hover:text-[#181818] hover:bg-[#EDEAE4] rounded-full transition-colors"
            aria-label="Rage Creative on Facebook"
          >
            <Facebook className="w-4 h-4" />
          </a>
          <a
            href={RAGE_BRAND.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-[#736E67] hover:text-[#181818] hover:bg-[#EDEAE4] rounded-full transition-colors"
            aria-label="Rage Creative on Instagram"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <button
            id="nav-mobile-book-btn"
            onClick={handleBookingTrigger}
            className="text-[12px] font-semibold tracking-wide bg-[#181818] text-white px-3.5 py-1.5 rounded-full shadow-xs cursor-pointer hover:bg-[#282828] transition-colors"
          >
            Start
          </button>
          <button
            id="nav-mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#181818] hover:bg-[#EDEAE4] rounded-lg transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Menu Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer"
          className="xl:hidden fixed inset-x-0 top-full bg-[#F8F7F5] border-b border-[#E6E1D8] px-5 sm:px-8 py-6 shadow-2xl max-h-[85vh] overflow-y-auto animate-in slide-in-from-top-2 duration-200 z-50"
        >
          <div className="pb-4 mb-3 border-b border-[#E6E1D8] flex items-center justify-between">
            <img
              src="/Rage Creative Logo landscape.png"
              alt="Rage Creative"
              className="h-8 w-auto object-contain max-h-[36px]"
              style={{ maxHeight: "36px", width: "auto", objectFit: "contain" }}
            />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8C6B37]">
              Studio Menu
            </span>
          </div>

          <div className="flex flex-col gap-2.5">
            {navLinks.map((link) => (
              <button
                key={link.id}
                id={`mobile-nav-${link.id}`}
                onClick={() => handleLinkClick(link.id)}
                className={`flex items-center justify-between text-left text-[15px] py-2.5 px-3 rounded-lg transition-colors ${
                  activeSection === link.id
                    ? "bg-[#EDEAE4] text-[#181818] font-semibold"
                    : "text-[#4A4743] hover:bg-[#F2EFE9]"
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#C8A46B]/15 text-[#8C6B37] font-semibold">
                    {link.badge}
                  </span>
                )}
              </button>
            ))}

            <div className="pt-4 mt-2 border-t border-[#E6E1D8] flex flex-col gap-2.5">
              <button
                id="mobile-start-project-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleBookingTrigger();
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#181818] text-white text-[14px] font-medium py-3 rounded-xl cursor-pointer"
              >
                <span>Start Your Project</span>
                <ArrowUpRight className="w-4 h-4 text-[#C8A46B]" />
              </button>
              <button
                id="mobile-collab-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCollaborator();
                }}
                className="w-full flex items-center justify-center gap-2 border border-[#E6E1D8] bg-white text-[#181818] text-[14px] font-medium py-2.5 rounded-xl cursor-pointer"
              >
                Become a Collaborator
              </button>
            </div>

            {/* Mobile Socials & Direct Contact */}
            <div className="pt-4 mt-2 border-t border-[#E6E1D8]/60 text-[12px] text-[#736E67] flex flex-col gap-2">
              <div className="flex items-center gap-4 text-[#181818]">
                <a
                  href={RAGE_BRAND.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs hover:text-[#C8A46B]"
                >
                  <Facebook className="w-3.5 h-3.5 text-[#C8A46B]" />
                  <span>Facebook</span>
                </a>
                <a
                  href={RAGE_BRAND.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs hover:text-[#C8A46B]"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#C8A46B]" />
                  <span>Instagram</span>
                </a>
              </div>
              <div className="text-[11px] text-[#8C877E] pt-1">
                Direct: <span className="text-[#181818] font-mono">{RAGE_BRAND.businessEmail}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
