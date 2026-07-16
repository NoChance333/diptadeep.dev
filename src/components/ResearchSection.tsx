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
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Track the scroll progress of this specific section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // --- Cinematic Timeline Settings ---
  // Background parallax / fade
  const bgOpacity = useTransform(scrollYProgress, [0.05, 0.2, 0.8, 0.95], [0, 0.16, 0.16, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  // Eyebrow triggers first
  const eyebrowOpacity = useTransform(scrollYProgress, [0.1, 0.2, 0.75, 0.85], [0, 1, 1, 0]);
  const eyebrowY = useTransform(scrollYProgress, [0.1, 0.2, 0.75, 0.85], [16, 0, 0, -16]);

  // Title follows immediately
  const titleOpacity = useTransform(scrollYProgress, [0.14, 0.26, 0.72, 0.82], [0, 1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0.14, 0.26, 0.72, 0.82], [24, 0, 0, -24]);
  const titleFilter = useTransform(scrollYProgress, [0.14, 0.26], ["blur(8px)", "blur(0px)"]);

  // Main interactive cards content panel
  const gridOpacity = useTransform(scrollYProgress, [0.22, 0.36, 0.68, 0.78], [0, 1, 1, 0]);
  const gridY = useTransform(scrollYProgress, [0.22, 0.36, 0.68, 0.78], [40, 0, 0, -40]);

  // Use dynamic styles only if mounted and the user doesn't prefer reduced motion
  const useCinematic = isMounted && !shouldReduceMotion;

  return (
    <div ref={containerRef} className="w-full">
      <SectionReveal
        id="research"
        className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden px-6 py-24 sm:py-28 md:py-32"
      >
        {/* Background Decorative Layer */}
        <motion.div 
          style={useCinematic ? { opacity: bgOpacity, y: bgY } : { opacity: 0.16 }}
          className="absolute inset-0 overflow-hidden pointer-events-none"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.035),transparent_60%)]" />
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 1200 800"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M120 180C260 240 320 260 420 280" stroke="currentColor" strokeWidth="0.7" />
            <path d="M420 280C560 320 620 360 760 340" stroke="currentColor" strokeWidth="0.7" />
            <path d="M760 340C860 320 920 260 1080 220" stroke="currentColor" strokeWidth="0.7" />
            <path d="M220 540C330 500 390 470 520 490" stroke="currentColor" strokeWidth="0.7" />
            <path d="M520 490C700 520 760 560 980 540" stroke="currentColor" strokeWidth="0.7" />
            <circle cx="120" cy="180" r="2.2" fill="currentColor" />
            <circle cx="420" cy="280" r="2.2" fill="currentColor" />
            <circle cx="760" cy="340" r="2.2" fill="currentColor" />
            <circle cx="1080" cy="220" r="2.2" fill="currentColor" />
            <circle cx="220" cy="540" r="2.2" fill="currentColor" />
            <circle cx="520" cy="490" r="2.2" fill="currentColor" />
            <circle cx="980" cy="540" r="2.2" fill="currentColor" />
          </svg>
        </motion.div>

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center text-center">
          
          {/* Eyebrow */}
          <motion.p
            style={useCinematic ? { opacity: eyebrowOpacity, y: eyebrowY } : {}}
            initial={!useCinematic ? { opacity: 0, y: 16 } : undefined}
            whileInView={!useCinematic ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="text-eyebrow"
          >
            RESEARCH
          </motion.p>

          {/* Big Cinematic Title */}
          <motion.h2
            style={useCinematic ? { opacity: titleOpacity, y: titleY, filter: titleFilter } : {}}
            initial={!useCinematic ? { opacity: 0, y: 24 } : undefined}
            whileInView={!useCinematic ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1, ease: EASE, delay: 0.08 }}
            className="mt-6 max-w-3xl text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.05] tracking-[-0.025em] text-foreground"
          >
            One idea. Months of work. Published.
          </motion.h2>

          {/* Grid Panel Layout */}
          <motion.div 
            style={useCinematic ? { opacity: gridOpacity, y: gridY } : {}}
            initial={!useCinematic ? { opacity: 0, y: 24 } : undefined}
            whileInView={!useCinematic ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, ease: EASE, delay: 0.12 }}
            className="mt-14 grid w-full gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10"
          >
            {/* Paper Card */}
            <GlassPanel className="rounded-[1.75rem] bg-white/[0.03] px-7 py-8 text-left shadow-[0_20px_60px_-30px_rgba(0,0,0,0.75)] backdrop-blur-sm sm:px-8 sm:py-9">
              <p className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground/80">
                IEEE RACS 2025
              </p>
              <h3 className="mt-4 text-[clamp(1.05rem,2.2vw,1.35rem)] leading-[1.35] tracking-[-0.015em] text-foreground">
                Blockchain-Based Tokenization and Management of Land Documents: A Decentralized Approach for Secure Ownership and Transfer
              </h3>
              <div className="mt-8 flex flex-wrap gap-3">
                <motion.a
                  href="/documents/ResearchPaper.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ duration: 0.2, ease: EASE }}
                  className="inline-flex items-center justify-center rounded-full border border-white/10 px-4 py-2 text-sm transition-colors hover:bg-white/5"
                >
                  Read Paper
                </motion.a>

                <motion.a
                  href="https://ieeexplore.ieee.org/document/11413273"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ duration: 0.2, ease: EASE }}
                  className="inline-flex items-center justify-center rounded-full border border-white/10 px-4 py-2 text-sm transition-colors hover:bg-white/5"
                >
                  IEEE Xplore ↗
                </motion.a>

                <motion.a
                  href="https://github.com/NoChance333/final-year-project"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ duration: 0.2, ease: EASE }}
                  className="inline-flex items-center justify-center rounded-full border border-white/10 px-4 py-2 text-sm transition-colors hover:bg-white/5"
                >
                  Source Code ↗
                </motion.a>
              </div>
            </GlassPanel>

            {/* Right Side Info Columns */}
            <div className="flex flex-col gap-8">
              <div className="text-left">
                <p className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground/80">
                  Stack
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-muted-foreground/90"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats Columns */}
              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
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