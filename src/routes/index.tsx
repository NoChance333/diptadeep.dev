import { createFileRoute } from "@tanstack/react-router";
import { ClientOnly } from "@tanstack/react-router";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ThreeBackground } from "@/components/ThreeBackground";
import { PlaceholderSection } from "@/components/PlaceholderSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        name: "description",
        content:
          "Diptadeep Roy — Software Engineer, Blockchain Researcher and MCA Candidate. Building secure digital systems.",
      },
      { property: "og:title", content: "Diptadeep Roy — Software Engineer" },
      {
        property: "og:description",
        content:
          "Software Engineer, Blockchain Researcher, MCA Candidate. Building secure digital systems.",
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
        <ThreeBackground />
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
    <div className="relative z-10">
      <Navigation />
      <main>
        <Hero />
        <PlaceholderSection
          id="about"
          eyebrow="About"
          title="A quiet obsession with details."
          description="This chapter is being written. It will introduce the story, the education, and the ideas that shape the work."
        />
        <PlaceholderSection
          id="projects"
          eyebrow="Projects"
          title="Selected work."
          description="A curated collection of engineering work — soon."
        />
        <PlaceholderSection
          id="research"
          eyebrow="Research"
          title="Studying trust at scale."
          description="Peer-reviewed research on blockchain systems and secure infrastructure. Coming soon."
        />
        <PlaceholderSection
          id="skills"
          eyebrow="Skills"
          title="A refined toolkit."
        />
        <PlaceholderSection
          id="contact"
          eyebrow="Contact"
          title="Let's build something considered."
        />
      </main>
      <Footer />
    </div>
  );
}
