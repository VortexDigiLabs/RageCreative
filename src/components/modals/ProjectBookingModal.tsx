import React, { useState } from "react";
import { X, CheckCircle2, Calendar, Clock, ArrowRight, ArrowLeft, Sparkles, Phone } from "lucide-react";
import { RAGE_BRAND, SERVICES } from "@/lib/rageData";
import RageLogo from "@/components/RageLogo";

interface ProjectBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export default function ProjectBookingModal({
  isOpen,
  onClose,
  initialService,
}: ProjectBookingModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedService, setSelectedService] = useState<string>(
    initialService || "Brand Accelerator Package (R4,000)"
  );
  const [budget, setBudget] = useState<string>("R10,000 – R25,000");
  const [timeline, setTimeline] = useState<string>("Within 2–4 weeks");
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    preferredDate: "",
    notes: "",
  });
  const [isConfirmed, setIsConfirmed] = useState(false);

  if (!isOpen) return null;

  const handleNext = () => {
    if (step === 1) setStep(2);
    else if (step === 2) setStep(3);
  };

  const handleBack = () => {
    if (step === 3) setStep(2);
    else if (step === 2) setStep(1);
  };

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConfirmed(true);
  };

  const handleResetAndClose = () => {
    setIsConfirmed(false);
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-[#F8F7F5] rounded-3xl border border-[#E6E1D8] shadow-2xl overflow-hidden my-8"
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
                <span>Project Brief &amp; Discovery</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#181818] font-normal">
                {isConfirmed ? "Brief Confirmed" : "Start Your Project"}
              </h3>
            </div>
          </div>

          <button
            onClick={handleResetAndClose}
            className="p-2 text-[#736E67] hover:text-[#181818] hover:bg-[#EDEAE4] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {isConfirmed ? (
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#EDEAE4] text-[#C8A46B] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-[#C8A46B]" />
              </div>

              <div>
                <h4 className="font-serif text-3xl font-normal text-[#181818] mb-2">
                  Discovery Call Scheduled
                </h4>
                <p className="text-sm text-[#66635F] max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#181818]">{formData.name}</strong>. Gareth Ellis and the Rage Creative production team have received your project details for{" "}
                  <strong className="text-[#181818]">{selectedService}</strong>.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#E6E1D8] text-left text-xs space-y-2 max-w-md mx-auto">
                <div className="flex justify-between border-b border-[#F0ECE4] pb-2">
                  <span className="text-[#736E67]">Client Brand:</span>
                  <span className="font-semibold text-[#181818]">{formData.company || "Pending"}</span>
                </div>
                <div className="flex justify-between border-b border-[#F0ECE4] pb-2">
                  <span className="text-[#736E67]">Service Scope:</span>
                  <span className="font-semibold text-[#181818]">{selectedService}</span>
                </div>
                <div className="flex justify-between border-b border-[#F0ECE4] pb-2">
                  <span className="text-[#736E67]">Contact:</span>
                  <span className="font-semibold text-[#181818]">{formData.phone} • {formData.email}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-[#736E67]">Executive Lead:</span>
                  <span className="font-semibold text-[#8C6B37]">{RAGE_BRAND.ceo} ({RAGE_BRAND.phone})</span>
                </div>
              </div>

              <button
                onClick={handleResetAndClose}
                className="inline-flex items-center gap-2 bg-[#181818] text-white text-xs font-semibold px-7 py-3.5 rounded-full hover:bg-[#282828] transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          ) : (
            <div>
              {/* Step indicator */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E6E1D8]/60 text-xs font-mono">
                <span className={step >= 1 ? "text-[#181818] font-semibold" : "text-[#736E67]"}>
                  1. Discipline
                </span>
                <span className="text-[#C8A46B]">→</span>
                <span className={step >= 2 ? "text-[#181818] font-semibold" : "text-[#736E67]"}>
                  2. Budget &amp; Scope
                </span>
                <span className="text-[#C8A46B]">→</span>
                <span className={step >= 3 ? "text-[#181818] font-semibold" : "text-[#736E67]"}>
                  3. Details
                </span>
              </div>

              {/* Step 1: Select Discipline */}
              {step === 1 && (
                <div className="space-y-4">
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#4A4743] block">
                    Choose what you want to build or launch:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedService("Brand Accelerator Package (R4,000)")}
                      className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedService.includes("Brand Accelerator")
                          ? "bg-white border-[#C8A46B] ring-2 ring-[#C8A46B]/20"
                          : "bg-white/60 border-[#E6E1D8] hover:border-[#D9D3C8]"
                      }`}
                    >
                      <span className="text-[10px] font-mono text-[#8C6B37] font-semibold block uppercase">
                        Fixed Package • R4,000
                      </span>
                      <span className="font-serif text-lg text-[#181818] font-medium block">
                        Brand Accelerator
                      </span>
                      <span className="text-xs text-[#736E67] font-light mt-1 block">
                        Logo, Identity, Landing Page, Social kit, Strategy session.
                      </span>
                    </button>

                    {SERVICES.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setSelectedService(s.title)}
                        className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                          selectedService === s.title
                            ? "bg-white border-[#C8A46B] ring-2 ring-[#C8A46B]/20"
                            : "bg-white/60 border-[#E6E1D8] hover:border-[#D9D3C8]"
                        }`}
                      >
                        <span className="text-[10px] font-mono text-[#736E67] uppercase block">
                          Bespoke Discipline
                        </span>
                        <span className="font-serif text-lg text-[#181818] font-medium block">
                          {s.title}
                        </span>
                        <span className="text-xs text-[#736E67] font-light mt-1 block truncate">
                          {s.tagline}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="pt-6 flex justify-end">
                    <button
                      onClick={handleNext}
                      className="inline-flex items-center gap-2 bg-[#181818] text-white text-xs font-semibold px-6 py-3 rounded-full hover:bg-[#282828] transition-colors cursor-pointer"
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Budget & Timeline */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <span className="text-xs uppercase tracking-wider font-semibold text-[#4A4743] block mb-3">
                      Anticipated Investment:
                    </span>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        "R4,000 (Accelerator)",
                        "R10,000 – R25,000",
                        "R25,000 – R60,000",
                        "R60,000+",
                      ].map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setBudget(b)}
                          className={`p-3.5 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer ${
                            budget === b
                              ? "bg-white border-[#C8A46B] text-[#181818] ring-1 ring-[#C8A46B]/30"
                              : "bg-white/60 border-[#E6E1D8] text-[#66635F]"
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs uppercase tracking-wider font-semibold text-[#4A4743] block mb-3">
                      Target Launch Window:
                    </span>
                    <div className="grid grid-cols-3 gap-3">
                      {["Immediate (1–2 wks)", "Within 1 Month", "Flexible / Later"].map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setTimeline(t)}
                          className={`p-3.5 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer ${
                            timeline === t
                              ? "bg-white border-[#C8A46B] text-[#181818] ring-1 ring-[#C8A46B]/30"
                              : "bg-white/60 border-[#E6E1D8] text-[#66635F]"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      onClick={handleBack}
                      className="inline-flex items-center gap-2 text-xs font-medium text-[#736E67] hover:text-[#181818] cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>
                    <button
                      onClick={handleNext}
                      className="inline-flex items-center gap-2 bg-[#181818] text-white text-xs font-semibold px-6 py-3 rounded-full hover:bg-[#282828] transition-colors cursor-pointer"
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Contact Details */}
              {step === 3 && (
                <form onSubmit={handleFinish} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase font-medium text-[#4A4743] mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full text-base sm:text-xs bg-white border border-[#E6E1D8] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#181818]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase font-medium text-[#4A4743] mb-1">
                        Company / Brand Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Maison Luxe"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full text-base sm:text-xs bg-white border border-[#E6E1D8] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#181818]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase font-medium text-[#4A4743] mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@maisonluxe.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full text-base sm:text-xs bg-white border border-[#E6E1D8] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#181818]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase font-medium text-[#4A4743] mb-1">
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
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-medium text-[#4A4743] mb-1">
                      Preferred Discovery Date / Call Time
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Next Tuesday morning (10:00 AM)"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full text-base sm:text-xs bg-white border border-[#E6E1D8] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#181818]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-medium text-[#4A4743] mb-1">
                      Project Notes &amp; Aspirations
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Any specific aesthetic references, current website link, or goals..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full text-base sm:text-xs bg-white border border-[#E6E1D8] rounded-xl p-3 outline-none focus:border-[#181818] resize-none"
                    />
                  </div>

                  <div className="pt-4 flex items-center justify-between border-t border-[#E6E1D8]/60">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="inline-flex items-center gap-2 text-xs font-medium text-[#736E67] hover:text-[#181818] cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 bg-[#181818] text-white text-xs font-semibold px-7 py-3 rounded-full hover:bg-[#282828] transition-colors cursor-pointer"
                    >
                      <span>Confirm Project Brief</span>
                      <CheckCircle2 className="w-4 h-4 text-[#C8A46B]" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
