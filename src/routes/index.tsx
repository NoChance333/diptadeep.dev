import "lenis/dist/lenis.css";
import { createFileRoute } from "@tanstack/react-router";
import { ClientOnly } from "@tanstack/react-router";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ThreeBackground } from "@/components/ThreeBackground";
import { PlaceholderSection } from "@/components/PlaceholderSection";
import { EducationTimeline } from "@/components/EducationTimeline";
import { ResearchSection } from "@/components/ResearchSection";
import { FeaturedProjectSection } from "@/components/FeaturedProjectSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ContactSection } from "@/components/ContactSection";
import { FloatingSectionIndicator } from "@/components/FloatingSectionIndicator";
import { SectionReveal } from "@/components/SectionReveal";
import { BackgroundGlow } from "@/components/BackgroundGlow";
import { MouseSpotlight } from "@/components/MouseSpotlight";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
  {
    name: "description",
    content:
      "Diptadeep Roy — Software Developer pursuing MCA at Adamas University. IEEE published author with interests in software engineering, blockchain and modern web development.",
  },
  {
    property: "og:title",
    content: "Diptadeep Roy — Software Developer",
  },
  {
    property: "og:description",
    content:
      "Turning ideas into reliable software.",
  },
],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <ClientOnly fallback={null}>
        <LoadingScreen />
        <BackgroundGlow />
        <FloatingSectionIndicator />
        <SmoothScroll>
        <PageContent />
        </SmoothScroll> 
      </ClientOnly>
      <noscript>
        <PageContent />
      </noscript>
    </>
  );
}

function PageContent() {
  return (
    <>
      <BackgroundGlow />
      <ThreeBackground />
      {/* <MouseSpotlight /> */}

      <div className="relative z-10">
        <Navigation />

        <main>
          <Hero />

          <PlaceholderSection
            id="about"
            eyebrow="ABOUT"
            title="Curious about systems. Driven to build better software."
            description={[
              "I'm Diptadeep Roy, currently pursuing my Master of Computer Applications at Adamas University.",
              "I enjoy building reliable software, exploring backend systems, and creating applications that solve real-world problems.",
              "My interests include software engineering, modern web development, blockchain technologies, and distributed systems.",
            ]}
          />

          <EducationTimeline />

          <PlaceholderSection
            id="experience"
            eyebrow="EXPERIENCE"
            title="Ready to build software that makes an impact."
            description={[
              "I'm currently pursuing my Master of Computer Applications at Adamas University and actively seeking my first Software Development opportunity.",
              "I'm particularly interested in Software Engineering, Backend Development, Full-Stack Development, and Blockchain-based applications.",
              "Driven by curiosity and continuous learning, I'm eager to contribute to real-world products while growing alongside experienced engineering teams.",
            ]}
          />

          <ResearchSection />
          <FeaturedProjectSection />
          <SkillsSection />
          <ContactSection />
        </main>

        <Footer />
      </div>
    </>
  );
}