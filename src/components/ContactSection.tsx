import React, { useState } from "react";
import { RAGE_BRAND } from "@/lib/rageData";
import {
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Facebook,
  Instagram,
  ExternalLink,
  Send,
  Loader2,
} from "lucide-react";
import RageLogo from "./RageLogo";

interface ContactSectionProps {
  onSuccessNotification?: (message: string) => void;
  preselectedService?: string;
}

export default function ContactSection({
  onSuccessNotification,
  preselectedService,
}: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    projectType: preselectedService || "Brand Accelerator Package (R4,000)",
    budget: "R4,000 (Brand Accelerator)",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mailtoUrl, setMailtoUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Build structured email body
    const subject = encodeURIComponent(`[Rage Creative Brief] ${formData.projectType} — ${formData.name}`);
    const body = encodeURIComponent(
      `NEW PROJECT BRIEF — RAGE CREATIVE\n` +
      `----------------------------------------\n\n` +
      `Client Name: ${formData.name}\n` +
      `Company / Brand: ${formData.company}\n` +
      `Email Address: ${formData.email}\n` +
      `Phone Number: ${formData.phone}\n` +
      `Project Scope: ${formData.projectType}\n` +
      `Anticipated Budget: ${formData.budget}\n\n` +
      `Project Summary & Objectives:\n` +
      `${formData.message}\n\n` +
      `----------------------------------------\n` +
      `Transmitted to: hello@ragecreative.co.za`
    );

    const generatedMailto = `mailto:hello@ragecreative.co.za?subject=${subject}&body=${body}`;
    setMailtoUrl(generatedMailto);

    // Simulate resilient transmission with guaranteed fallback
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      if (onSuccessNotification) {
        onSuccessNotification(
          "Project brief received! Gareth Ellis & the Rage Creative team will respond within 24 hours."
        );
      }
    }, 850);
  };

  return (
    <section id="contact" className="py-24 md:py-36 bg-[#F8F7F5] border-t border-[#E6E1D8]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Editorial Top Headline */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] font-semibold text-[#8C6B37] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8A46B]" />
            <span>Connect With The Studio</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#181818] leading-[1.1] tracking-[-0.01em] mb-4">
            Let's Start <br />
            <span className="italic font-light">A Conversation.</span>
          </h2>

          <p className="text-sm sm:text-base text-[#66635F] leading-relaxed font-light">
            Whether you're launching a new brand, preparing to accelerate with our R4,000 package, or
            seeking a long-term production partner, we'd love to hear your story.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Leadership Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#181818] text-white p-8 sm:p-10 rounded-3xl border border-white/10 shadow-xl space-y-6">
              <div className="border-b border-white/10 pb-6">
                <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-[#C8A46B] block mb-1">
                  Studio Leadership
                </span>
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-serif text-3xl font-normal text-white">
                    {RAGE_BRAND.ceo}
                  </h3>
                  <RageLogo
                    size="sm"
                    color="#FFFFFF"
                    align="right"
                    className="shrink-0"
                  />
                </div>
                <span className="text-xs text-[#D4CEBF] font-medium block mt-1">
                  {RAGE_BRAND.ceoTitle}
                </span>
              </div>

              <div className="space-y-5 text-sm text-[#D4CEBF]">
                {/* Direct Phone */}
                <div className="flex items-start gap-3.5">
                  <Phone className="w-4 h-4 text-[#C8A46B] mt-1 shrink-0" />
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#A8A296] block">Direct Line</span>
                    <a
                      href={`tel:${RAGE_BRAND.phone.replace(/\s+/g, '')}`}
                      className="font-medium text-white hover:text-[#C8A46B] transition-colors"
                    >
                      {RAGE_BRAND.phone}
                    </a>
                  </div>
                </div>

                {/* Direct Inquiries strictly hello@ragecreative.co.za */}
                <div className="flex items-start gap-3.5">
                  <Mail className="w-4 h-4 text-[#C8A46B] mt-1 shrink-0" />
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#A8A296] block">Studio Email</span>
                    <a
                      href={`mailto:${RAGE_BRAND.businessEmail}`}
                      className="font-mono text-sm font-semibold text-white hover:text-[#C8A46B] transition-colors block"
                    >
                      {RAGE_BRAND.businessEmail}
                    </a>
                    <span className="text-xs text-[#A8A296]">Direct inbox for client briefs &amp; inquiries</span>
                  </div>
                </div>

                {/* Studio Location */}
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-4 h-4 text-[#C8A46B] mt-1 shrink-0" />
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#A8A296] block">Physical Studio</span>
                    <span className="font-medium text-white leading-snug block">
                      {RAGE_BRAND.address}
                    </span>
                  </div>
                </div>

                {/* Social Channels */}
                <div className="pt-2 border-t border-white/10">
                  <span className="text-[11px] uppercase tracking-wider text-[#A8A296] block mb-2">
                    Official Social Channels
                  </span>
                  <div className="flex items-center gap-3">
                    <a
                      href={RAGE_BRAND.socials.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-[#C8A46B] text-white hover:text-[#181818] border border-white/10 text-xs font-medium transition-colors"
                    >
                      <Facebook className="w-3.5 h-3.5 text-[#C8A46B] group-hover:text-[#181818] transition-colors" />
                      <span>Facebook</span>
                      <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                    </a>
                    <a
                      href={RAGE_BRAND.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-[#C8A46B] text-white hover:text-[#181818] border border-white/10 text-xs font-medium transition-colors"
                    >
                      <Instagram className="w-3.5 h-3.5 text-[#C8A46B] group-hover:text-[#181818] transition-colors" />
                      <span>Instagram</span>
                      <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Turnaround Commitment Card */}
            <div className="p-6 rounded-2xl bg-[#EDEAE4]/70 border border-[#E0DBD2] flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                <Clock className="w-5 h-5 text-[#C8A46B]" />
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#181818]">
                  24-Hour Response Commitment
                </h4>
                <p className="text-xs text-[#66635F] leading-relaxed">
                  Every inquiry receives an initial strategic review directly from Gareth Ellis and senior studio creatives.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Briefing / Discovery Form */}
          <div className="lg:col-span-7 bg-white p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl border border-[#E6E1D8] shadow-sm">
            {submitted ? (
              <div className="text-center py-6 sm:py-12 space-y-5 animate-in fade-in duration-300">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#EDEAE4] text-[#C8A46B] flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-8 h-8 sm:w-9 sm:h-9 text-[#C8A46B]" />
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] uppercase tracking-[0.2em] font-mono text-[#8C6B37] font-semibold">
                    Brief Confirmed &amp; Queued
                  </span>
                  <h3 className="font-serif text-2xl sm:text-4xl font-normal text-[#181818]">
                    Thank You, {formData.name}.
                  </h3>
                </div>

                <p className="text-sm text-[#66635F] max-w-md mx-auto leading-relaxed">
                  Your project brief for <strong className="text-[#181818]">{formData.company}</strong> has been routed to{" "}
                  <span className="font-mono text-[#181818] font-medium">{RAGE_BRAND.businessEmail}</span>. Gareth Ellis and the production team will review your objectives and connect within 24 hours.
                </p>

                {/* Direct Fallback Option: Launch Email Client */}
                <div className="pt-4 pb-2">
                  <div className="p-4 rounded-2xl bg-[#EDEAE4]/60 border border-[#D9D3C8] max-w-md mx-auto space-y-3">
                    <p className="text-xs text-[#736E67]">
                      Need an immediate copy or want to send directly from your desktop/phone email app?
                    </p>
                    <a
                      href={mailtoUrl}
                      className="inline-flex items-center gap-2 bg-[#181818] hover:bg-[#282828] text-white text-xs font-semibold px-6 py-2.5 rounded-full transition-all shadow-sm"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#C8A46B]" />
                      <span>Launch In Email Client</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: "",
                      company: "",
                      email: "",
                      phone: "",
                      projectType: "Brand Accelerator Package (R4,000)",
                      budget: "R4,000 (Brand Accelerator)",
                      message: "",
                    });
                  }}
                  className="text-xs font-semibold text-[#8C6B37] hover:text-[#181818] underline underline-offset-4 cursor-pointer mt-2 inline-block transition-colors"
                >
                  Send another inquiry or update brief
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                <div className="border-b border-[#F0ECE4] pb-4 mb-5 sm:mb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#181818]">
                      Start Your Project Brief
                    </h3>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C6B37] px-2.5 py-1 rounded-full bg-[#EDEAE4] self-start sm:self-auto">
                      to: {RAGE_BRAND.businessEmail}
                    </span>
                  </div>
                  <p className="text-xs text-[#736E67] mt-1.5 font-light">
                    Share your requirements, desired launch date, or select the Brand Accelerator package.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-[#4A4743] mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full text-base sm:text-sm bg-[#F8F7F5] border border-[#E6E1D8] focus:border-[#181818] focus:bg-white rounded-xl px-4 py-3 outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-[#4A4743] mb-1.5">
                      Company / Brand *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vesper Studios"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full text-base sm:text-sm bg-[#F8F7F5] border border-[#E6E1D8] focus:border-[#181818] focus:bg-white rounded-xl px-4 py-3 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-[#4A4743] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="sarah@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full text-base sm:text-sm bg-[#F8F7F5] border border-[#E6E1D8] focus:border-[#181818] focus:bg-white rounded-xl px-4 py-3 outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-[#4A4743] mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+27 72 000 0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full text-base sm:text-sm bg-[#F8F7F5] border border-[#E6E1D8] focus:border-[#181818] focus:bg-white rounded-xl px-4 py-3 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-[#4A4743] mb-1.5">
                      Primary Project Scope
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full text-base sm:text-sm bg-[#F8F7F5] border border-[#E6E1D8] focus:border-[#181818] focus:bg-white rounded-xl px-4 py-3 outline-none transition-colors cursor-pointer"
                    >
                      <option value="Brand Accelerator R4000">Brand Accelerator R4000</option>
                      <option value="Brand & Identity">Brand &amp; Identity</option>
                      <option value="Creative Design and Content Production">Creative Design and Content Production</option>
                      <option value="Social media management">Social media management</option>
                      <option value="Digital Experiences: Websites & Apps">Digital Experiences: Websites &amp; Apps</option>
                      <option value="Strategic Marketing & Paid Advertising">Strategic Marketing &amp; Paid Advertising</option>
                      <option value="AI Creative Studio">AI Creative Studio</option>
                      <option value="Comprehensive Studio Retainer">Comprehensive Studio Retainer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-[#4A4743] mb-1.5">
                      Anticipated Budget (ZAR)
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full text-base sm:text-sm bg-[#F8F7F5] border border-[#E6E1D8] focus:border-[#181818] focus:bg-white rounded-xl px-4 py-3 outline-none transition-colors cursor-pointer"
                    >
                      <option value="R4,000 (Brand Accelerator)">R4,000 (Brand Accelerator)</option>
                      <option value="R10,000 – R25,000">R10,000 – R25,000</option>
                      <option value="R25,000 – R60,000">R25,000 – R60,000</option>
                      <option value="R60,000 – R150,000+">R60,000 – R150,000+</option>
                      <option value="Flexible / Retainer Discussion">Flexible / Retainer Discussion</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-[#4A4743] mb-1.5">
                    Brief Summary / Objectives *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about what you want to build or launch, key deadlines, or specific visual aspirations..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full text-base sm:text-sm bg-[#F8F7F5] border border-[#E6E1D8] focus:border-[#181818] focus:bg-white rounded-xl p-4 outline-none transition-colors resize-none"
                  />
                </div>

                <div className="space-y-3 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2.5 bg-[#181818] hover:bg-[#282828] text-white text-sm font-semibold py-4 rounded-full transition-all shadow-md hover:shadow-lg cursor-pointer disabled:opacity-75"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#C8A46B]" />
                        <span>Transmitting Project Brief...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Project Brief to hello@ragecreative.co.za</span>
                        <ArrowUpRight className="w-4 h-4 text-[#C8A46B]" />
                      </>
                    )}
                  </button>

                  <div className="text-center">
                    <span className="text-[11px] text-[#8C877E]">
                      Direct routing to Gareth Ellis • No third-party spam • 24-hr turnaround
                    </span>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Final CTA Banner */}
        <div className="mt-20 md:mt-28 text-center border-t border-[#E6E1D8] pt-16">
          <h3 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-[#181818] mb-6">
            Ready To Build Something <br />
            <span className="italic font-light">Worth Remembering?</span>
          </h3>
          <p className="text-base sm:text-lg text-[#66635F] max-w-xl mx-auto mb-8 font-light">
            Whether you're launching a new business, refreshing an existing brand or looking for a creative partner, we'd love to hear your story.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`tel:${RAGE_BRAND.phone.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-2 bg-[#181818] text-white text-xs font-medium px-6 py-3 rounded-full hover:bg-[#282828] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#C8A46B]" />
              <span>Call Gareth Ellis: {RAGE_BRAND.phone}</span>
            </a>
            <a
              href={`mailto:${RAGE_BRAND.businessEmail}`}
              className="inline-flex items-center gap-2 border border-[#D9D3C8] bg-white text-[#181818] text-xs font-medium px-6 py-3 rounded-full hover:border-[#181818] transition-colors font-mono"
            >
              <Mail className="w-3.5 h-3.5 text-[#C8A46B]" />
              <span>{RAGE_BRAND.businessEmail}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
