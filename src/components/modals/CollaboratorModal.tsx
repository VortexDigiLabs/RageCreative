import React, { useState } from "react";
import { X, CheckCircle2, Sparkles, ArrowUpRight, Loader2 } from "lucide-react";
import { COLLABORATIVE_ECOSYSTEM } from "@/lib/rageData";
import RageLogo from "@/components/RageLogo";

interface CollaboratorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CollaboratorModal({ isOpen, onClose }: CollaboratorModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    discipline: "Fashion & Editorial Photography",
    portfolioUrl: "",
    experience: "3–5 Years",
    bio: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const messageBody = [
        `NEW COLLABORATOR APPLICATION — RAGE CREATIVE`,
        ``,
        `Full Name: ${formData.name}`,
        `Email: ${formData.email}`,
        `Phone / WhatsApp: ${formData.phone}`,
        `Primary Discipline: ${formData.discipline}`,
        `Years of Experience: ${formData.experience}`,
        `Portfolio / Showreel URL: ${formData.portfolioUrl}`,
        ``,
        `Bio & Notable Work:`,
        formData.bio || "—",
        ``,
        `— Submitted via RageCreative.co.za Collaborator Form`,
      ].join("\n");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "49bb7a3a-1646-4545-9eeb-73de5ea706cd",
          subject: `[Rage Creative] New Collaborator Application — ${formData.name} (${formData.discipline})`,
          from_name: `${formData.name} via Rage Creative Website`,
          replyto: formData.email,
          message: messageBody,
        }),
      });

      const result = await response.json() as { success: boolean; message?: string };
      if (result.success) {
        setIsSubmitting(false);
        setSubmitted(true);
      } else {
        throw new Error(result.message || "Submission failed");
      }
    } catch (err: unknown) {
      setIsSubmitting(false);
      const message = err instanceof Error ? err.message : "Something went wrong";
      setSubmitError(message);
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/65 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-[#F8F7F5] rounded-3xl border border-[#E6E1D8] shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 sm:p-8 bg-white border-b border-[#E6E1D8] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <RageLogo size="xs" color="#181818" />
            </div>
            <div className="h-9 w-[1px] bg-[#E6E1D8] hidden sm:block" />
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-[0.2em] text-[#8C6B37] font-semibold mb-0.5">
                <Sparkles className="w-3 h-3 text-[#C8A46B]" />
                <span>Collective Ecosystem</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#181818] font-normal">
                Become a Collaborator
              </h3>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 text-[#736E67] hover:text-[#181818] hover:bg-[#EDEAE4] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {submitted ? (
            <div className="text-center py-8 space-y-5">
              <div className="w-16 h-16 rounded-full bg-[#EDEAE4] text-[#C8A46B] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-[#C8A46B]" />
              </div>

              <div>
                <h4 className="font-serif text-3xl font-normal text-[#181818] mb-2">
                  Application Received.
                </h4>
                <p className="text-xs sm:text-sm text-[#66635F] max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#181818]">{formData.name}</strong>. Our creative director Gareth Ellis will review your portfolio and reach out regarding upcoming client projects and collective meetups.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#E6E1D8] text-xs text-[#736E67] max-w-sm mx-auto">
                Every contributor is fairly compensated for active work, with eligibility for future growth initiatives.
              </div>

              <button
                onClick={handleClose}
                className="inline-flex items-center gap-2 bg-[#181818] text-white text-xs font-semibold px-7 py-3 rounded-full hover:bg-[#282828] transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-[#66635F] font-light leading-relaxed">
                We are curating a trusted network of independent craftspeople. If you believe collaboration creates superior work, let us know who you are.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-medium text-[#4A4743] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Liam Dlamini"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full text-base sm:text-xs bg-white border border-[#E6E1D8] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#181818]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-medium text-[#4A4743] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="liam@creative.co.za"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full text-base sm:text-xs bg-white border border-[#E6E1D8] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#181818]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-medium text-[#4A4743] mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+27 72 000 0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full text-base sm:text-xs bg-white border border-[#E6E1D8] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#181818]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-medium text-[#4A4743] mb-1">
                    Primary Discipline *
                  </label>
                  <select
                    value={formData.discipline}
                    onChange={(e) => setFormData({ ...formData, discipline: e.target.value })}
                    className="w-full text-base sm:text-xs bg-white border border-[#E6E1D8] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#181818] cursor-pointer"
                  >
                    {COLLABORATIVE_ECOSYSTEM.rolesWanted.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-medium text-[#4A4743] mb-1">
                  Portfolio / Website / Showreel URL *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://behance.net/yourprofile or website"
                  value={formData.portfolioUrl}
                  onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                  className="w-full text-base sm:text-xs bg-white border border-[#E6E1D8] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#181818]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-medium text-[#4A4743] mb-1">
                  Brief Bio &amp; Notable Work
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about the kinds of projects you love, tools you master, or brands you've collaborated with..."
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full text-base sm:text-xs bg-white border border-[#E6E1D8] rounded-xl p-3 outline-none focus:border-[#181818] resize-none"
                />
              </div>

              <div className="pt-3 border-t border-[#E6E1D8]/60 flex items-center justify-between">
                <span className="text-[11px] text-[#736E67] font-mono">
                  100% Paid Work • Zero Unpaid Spec
                </span>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 bg-[#181818] text-white text-xs font-semibold px-6 py-3 rounded-full hover:bg-[#282828] transition-colors cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-[#C8A46B]" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Application</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#C8A46B]" />
                    </>
                  )}
                </button>
              </div>
              {submitError && (
                <p className="mt-3 text-xs text-red-600 text-center">
                  {submitError} — email us at{" "}
                  <a href="mailto:hello@ragecreative.co.za" className="font-mono underline">
                    hello@ragecreative.co.za
                  </a>
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
