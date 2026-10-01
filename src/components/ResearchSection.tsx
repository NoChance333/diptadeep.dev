"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { SectionReveal } from "@/components/SectionReveal";
import { GlassPanel } from "@/components/GlassPanel";
import { useRef, useEffect, useState } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

const technologies = ["Solidity", "Flask", "MongoDB", "IPFS", "Ethereum", "OpenZeppelin", "Python"];

const stats = [
  { value: "IEEE Published", label: "Published" },
  { value: "2025 Conference", label: "Venue" },
  { value: "7+ Technologies", label: "Stack" },
];

export function ResearchSection() {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const eyebrowOpacity = useTransform(scrollYProgress, [0.08, 0.18, 0.44, 0.54], [0, 1, 1, 0]);
  const eyebrowY = useTransform(scrollYProgress, [0.08, 0.18, 0.44, 0.54], [16, 0, 0, -16]);

  const titleOpacity = useTransform(scrollYProgress, [0.12, 0.22, 0.46, 0.56], [0, 1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0.12, 0.22, 0.46, 0.56], [24, 0, 0, -24]);

  const gridOpacity = useTransform(scrollYProgress, [0.18, 0.30, 0.68, 0.80], [0, 1, 1, 0]);
  const gridY = useTransform(scrollYProgress, [0.18, 0.30, 0.68, 0.80], [40, 0, 0, -40]);

  const useCinematic = !shouldReduceMotion && !isMobile;

  return (
    <div ref={containerRef} className="w-full">
      <SectionReveal
        id="research"
        className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden px-6 py-24 sm:py-28 md:py-32"
      >
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center text-center transform-gpu">
          <motion.p
            style={!shouldReduceMotion ? { opacity: eyebrowOpacity, y: eyebrowY } : {}}
            className="text-eyebrow transform-gpu"
          >
            RESEARCH
          </motion.p>

          <motion.h2
            style={{
              opacity: !shouldReduceMotion ? titleOpacity : 1,
              y: !shouldReduceMotion ? titleY : 0,
            }}
            className="mt-6 max-w-3xl text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.05] tracking-[-0.025em] text-foreground transform-gpu"
          >
            One idea. Months of work. Published.
          </motion.h2>

          <motion.div
            style={!shouldReduceMotion ? { opacity: gridOpacity, y: gridY } : {}}
            className="mt-14 grid w-full gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 transform-gpu"
          >
            {/* Paper Card */}
            <div className="flex flex-col gap-6 transform-gpu">
              <GlassPanel className="rounded-[1.75rem] bg-white/[0.03] px-7 py-8 text-left shadow-[0_20px_60px_-30px_rgba(0,0,0,0.75)] sm:px-8 sm:py-9">
                <p className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground/80">
                  IEEE RACS 2025
                </p>
                <h3 className="mt-4 text-[clamp(1.05rem,2.2vw,1.35rem)] leading-[1.35] tracking-[-0.015em] text-foreground">
                  Blockchain-Based Tokenization and Management of Land Documents: A Decentralized
                  Approach for Secure Ownership and Transfer
                </h3>
                <div className="mt-8 flex flex-wrap gap-3 transform-gpu">
                  <motion.a
                    href="/documents/ResearchPaper.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={useCinematic ? { y: -2 } : undefined}
                    className="inline-flex items-center justify-center rounded-full border border-white/10 px-4 py-2 text-sm transition-colors hover:bg-white/5 transform-gpu"
                  >
                    Read Paper
                  </motion.a>
                  <motion.a
                    href="https://ieeexplore.ieee.org/document/11413273"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={useCinematic ? { y: -2 } : undefined}
                    className="inline-flex items-center justify-center rounded-full border border-white/10 px-4 py-2 text-sm transition-colors hover:bg-white/5 transform-gpu"
                  >
                    IEEE Xplore ↗
                  </motion.a>
                </div>
              </GlassPanel>

              {/* Graphic Container with Hardware Composite Layering */}
              <div className="mx-auto w-full max-w-xl overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.01] p-1.5 shadow-2xl transform-gpu">
                <img
                  src="/images/research-team.jpeg"
                  alt="Research Collaboration Team"
                  className="block h-auto w-full rounded-[1.3rem] opacity-85 transition-all duration-700 hover:scale-[1.01] hover:opacity-100"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Right Side Info Columns */}
            <div className="flex flex-col gap-8 transform-gpu">
              <div className="text-left transform-gpu">
                <p className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground/80">
                  Stack
                </p>
                <div className="mt-4 flex flex-wrap gap-2 transform-gpu">
                  {technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-muted-foreground/90 inline-block transform-gpu"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 transform-gpu">
                {stats.map((stat) => (
                  <GlassPanel
                    key={stat.label}
                    className="rounded-[1.25rem] bg-white/[0.025] px-5 py-5 text-left"
                  >
                    <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground/70">
                      {stat.label}
                    </p>
                    <p className="mt-3 text-[clamp(1rem,2vw,1.2rem)] leading-none tracking-[-0.02em] text-foreground">
                      {stat.value}
                    </p>
                  </GlassPanel>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </SectionReveal>
    </div>
  );
}
