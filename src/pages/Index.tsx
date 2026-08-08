import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ResumeSection from "@/components/ResumeSection";
import ProjectsSection from "@/components/ProjectsSection";
import PublicationsSection from "@/components/PublicationsSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

/**
 * Section order alternates tone (base / raised) so neighbouring bands
 * separate on their own, without a rule between them.
 */
const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-blue focus:px-4 focus:py-2 focus:text-blue-foreground"
      >
        Skip to content
      </a>
      <Navbar />
      <main>
        <HeroSection />
        <ResumeSection />
        <ProjectsSection />
        <PublicationsSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
