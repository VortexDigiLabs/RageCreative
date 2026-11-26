/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ShowcaseVideoPlaceholder from "@/components/ShowcaseVideoPlaceholder";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import AiTechnologySection from "@/components/AiTechnologySection";
import PortfolioSection from "@/components/PortfolioSection";
import BrandAcceleratorSection from "@/components/BrandAcceleratorSection";
import ProcessSection from "@/components/ProcessSection";
import CollaborateSection from "@/components/CollaborateSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ProjectBookingModal from "@/components/modals/ProjectBookingModal";
import CollaboratorModal from "@/components/modals/CollaboratorModal";
import ProjectCaseStudyModal from "@/components/modals/ProjectCaseStudyModal";
import { ServiceItem, ProjectItem } from "@/lib/rageData";

// ─── FEATURE FLAGS ────────────────────────────────────────────────────────────
// Set to true once real case studies are ready to publish.
const SHOW_PORTFOLIO = false;
// ─────────────────────────────────────────────────────────────────────────────

export default function App() {
  const [activeSection, setActiveSection] = useState<string>("hero");

  // Modal states
  const [bookingModalOpen, setBookingModalOpen] = useState<boolean>(false);
  const [collaboratorModalOpen, setCollaboratorModalOpen] = useState<boolean>(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<ProjectItem | null>(null);
  const [initialBookingService, setInitialBookingService] = useState<string | undefined>();
  const [notificationToast, setNotificationToast] = useState<string | null>(null);

  // Smooth navigation handler
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Section observer to keep navigation highlight synchronized with scroll
  useEffect(() => {
    const handleIntersection: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    });

    const sections = [
      "hero",
      "about",
      "services",
      ...(SHOW_PORTFOLIO ? ["portfolio"] : []),
      "brand-accelerator",
      "collaborate",
      "contact",
    ];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Modal openers
  const openBooking = (serviceName?: string) => {
    setInitialBookingService(serviceName || "Brand Accelerator Package (R4,000)");
    setBookingModalOpen(true);
  };

  const openCollaborator = () => {
    setCollaboratorModalOpen(true);
  };

  const openCaseStudy = (project: ProjectItem) => {
    setSelectedCaseStudy(project);
  };

  const handleStartSimilarProject = (project: ProjectItem) => {
    setSelectedCaseStudy(null);
    openBooking(`${project.category} Project (Inspired by ${project.title})`);
  };

  const handleSelectService = (service: ServiceItem) => {
    openBooking(service.title);
  };

  const showNotification = (message: string) => {
    setNotificationToast(message);
    setTimeout(() => {
      setNotificationToast(null);
    }, 6000);
  };

  return (
    <div className="min-h-screen bg-[#F8F7F5] text-[#181818] font-sans antialiased selection:bg-[#EADBC4] selection:text-[#181818] relative">
      {/* Top Main Navigation */}
      <Navigation
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenBooking={() => openBooking()}
        onStartProject={() => openBooking()}
        onOpenCollaborator={openCollaborator}
      />

      <main>
        {/* 1. Home / Hero Section with 3D Media Cylinder & 30% Bokeh & Start/Stop Controls */}
        <Hero
          onStartProject={() => openBooking()}
          onBookCall={() => openBooking("Discovery Call")}
          onViewWork={() => handleNavigate(SHOW_PORTFOLIO ? "portfolio" : "services")}
          onBecomeCollaborator={openCollaborator}
        />

        {/* Studio Showcase 16:9 Video Container / Placeholder (as per Image 1) */}
        <ShowcaseVideoPlaceholder />

        {/* 2. About Section */}
        <AboutSection onStartProject={() => openBooking()} />

        {/* 3. Services Section - 5 Pillars */}
        <ServicesSection onSelectService={handleSelectService} />

        {/* Sub-section: Human Creativity Meets Intelligent Technology */}
        <AiTechnologySection />

        {/* 4. Portfolio Section with Sleek Category Filter Submenu */}
        {SHOW_PORTFOLIO && <PortfolioSection onSelectProject={openCaseStudy} />}

        {/* 5. Accelerate Your Brand (Brand Accelerator Package R4,000) */}
        <BrandAcceleratorSection
          onBookPackage={() => openBooking("Brand Accelerator Package (R4,000)")}
        />

        {/* Strategic Methodology Process */}
        <ProcessSection />

        {/* 6. Collaborate Section (Collaborative Ecosystem) */}
        <CollaborateSection onOpenCollaborator={openCollaborator} />

        {/* Endorsements & Testimonials */}
        <TestimonialsSection />

        {/* 7. Contact Section */}
        <ContactSection
          preselectedService={initialBookingService}
          onSuccessNotification={showNotification}
        />
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBooking={() => openBooking()}
        onOpenCollaborator={openCollaborator}
      />

      {/* Interactive Modals */}
      <ProjectBookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialService={initialBookingService}
      />

      <CollaboratorModal
        isOpen={collaboratorModalOpen}
        onClose={() => setCollaboratorModalOpen(false)}
      />

      <ProjectCaseStudyModal
        project={selectedCaseStudy}
        isOpen={!!selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
        onStartSimilarProject={handleStartSimilarProject}
      />

      {/* Ephemeral Toast Notification */}
      {notificationToast && (
        <aside
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-[1200] max-w-md bg-[#181818] text-white p-4 rounded-2xl border border-[#C8A46B]/40 shadow-2xl flex items-start gap-3 animate-in slide-in-from-bottom-5 duration-300"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-[#C8A46B] mt-1 shrink-0 animate-ping" />
          <p className="text-xs leading-relaxed text-[#EDEAE4]">
            {notificationToast}
          </p>
        </aside>
      )}
    </div>
  );
}
