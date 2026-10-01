"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { SectionReveal } from "@/components/SectionReveal";
import { GlassPanel } from "@/components/GlassPanel";
import { useRef, useEffect, useState } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

const technologies = [
  "Python",
  "Solidity",
  "Flask",
  "MongoDB",
  "Ethereum",
  "IPFS",
  "OpenZeppelin",
  "Tailwind CSS",
];

const architecture = [
  "User",
  "Flask Backend",
  "Ethereum Smart Contract",
  "IPFS Storage",
  "NFT Ownership",
];

export function FeaturedProjectSection() {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Balanced 4-point animation system that works uniformly across all screen heights
  const eyebrowOpacity = useTransform(scrollYProgress, [0.05, 0.18, 0.82, 0.92], [0, 1, 1, 0]);
  const eyebrowY = useTransform(scrollYProgress, [0.05, 0.18, 0.82, 0.92], [16, 0, 0, -16]);

  const titleOpacity = useTransform(scrollYProgress, [0.08, 0.22, 0.8, 0.9], [0, 1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0.08, 0.22, 0.8, 0.9], [24, 0, 0, -24]);

  // FIX 1: Balanced the filter array structure to match the scroll range completely
  const titleFilter = useTransform(
    scrollYProgress,
    [0.08, 0.22, 0.8, 0.9],
    ["blur(6px)", "blur(0px)", "blur(0px)", "blur(6px)"],
  );

  const layoutOpacity = useTransform(scrollYProgress, [0.14, 0.28, 0.76, 0.86], [0, 1, 1, 0]);
  const layoutY = useTransform(scrollYProgress, [0.14, 0.28, 0.76, 0.86], [30, 0, 0, -30]);

  // Optimization: Allow cinematic tracking on mobile engines with safer boundaries
  const useCinematic = isMounted && !shouldReduceMotion;

  return (
    <div ref={containerRef} className="w-full relative">
      <SectionReveal
        id="featured-project"
        className="relative flex min-h-screen w-full items-center justify-center px-4 sm:px-6 py-16 sm:py-24 md:py-32"
      >
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
          {/* Eyebrow */}
          <motion.p
            /* FIX 2: Switched ternary empty objects {} to undefined to protect frame evaluation */
            style={useCinematic ? { opacity: eyebrowOpacity, y: eyebrowY } : undefined}
            initial={!useCinematic ? { opacity: 0, y: 16 } : undefined}
            whileInView={!useCinematic ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="text-eyebrow transform-gpu"
          >
            FEATURED PROJECT
          </motion.p>

          {/* Title */}
          <motion.h2
            style={
              useCinematic ? { opacity: titleOpacity, y: titleY, filter: titleFilter } : undefined
            }
            initial={!useCinematic ? { opacity: 0, y: 24 } : undefined}
            whileInView={!useCinematic ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.05 }}
            className="mt-4 max-w-3xl text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.1] tracking-[-0.025em] text-foreground transform-gpu"
          >
            Securing ownership,
            <br />
            through software.
          </motion.h2>

          {/* Large Showcase Glass Image Panel Card */}
          <GlassPanel
            /* FIX 3: Linked the main card layout to the smooth viewport scroll system directly */
            style={useCinematic ? { opacity: layoutOpacity, y: layoutY } : undefined}
            initial={!useCinematic ? { opacity: 0, y: 30 } : undefined}
            whileInView={!useCinematic ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="mt-10 w-full overflow-hidden shadow-[0_22px_70px_-32px_rgba(0,0,0,0.84)] transform-gpu"
          >
            {/* 
              FIX 4: Added aspect-[16/10] and minimum height boundaries. 
              This perfectly retains structural dimensions BEFORE the image arrives, eliminating local layout shifts.
            */}
            <div className="flex w-full aspect-[16/10] min-h-[220px] sm:min-h-[400px] items-center justify-center bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.035),transparent_70%)] p-2 sm:p-6 md:p-10 border-b border-white/10">
              <img
                src="/images/novis.png"
                alt="NOVIS Web Application"
                className="w-full h-full object-cover md:object-contain rounded-md sm:rounded-[12px] border border-white/15 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.8)]"
                loading="eager"
              />
            </div>

            <div className="px-5 py-6 text-left sm:px-8 sm:py-8">
              <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] sm:tracking-[0.32em] text-muted-foreground/80">
                Blockchain-Based Tokenization and Management of Land Documents
              </p>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground/90 sm:text-base sm:leading-8">
                A decentralized approach to secure ownership and transfer, designed to make land
                records more verifiable, trustworthy, and resilient.
              </p>
            </div>
          </GlassPanel>

          {/* Bottom Grid Layer */}
          <motion.div
            style={useCinematic ? { opacity: layoutOpacity, y: layoutY } : undefined}
            initial={!useCinematic ? { opacity: 0, y: 20 } : undefined}
            whileInView={!useCinematic ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.12 }}
            className="mt-10 grid w-full gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8 transform-gpu"
          >
            {/* Left Hand Columns */}
            <div className="flex flex-col gap-5 text-left">
              <div className="rounded-[1.2rem] border border-white/10 bg-white/[0.025] px-5 py-5 sm:px-6">
                <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] sm:tracking-[0.32em] text-muted-foreground/80">
                  THE CHALLENGE
                </p>
                <p className="mt-3 text-sm leading-7 text-muted-foreground/90 sm:text-base sm:leading-8">
                  Land ownership records are often paper-based, difficult to verify, and vulnerable
                  to tampering.
                </p>
              </div>

              <div className="rounded-[1.2rem] border border-white/10 bg-white/[0.025] px-5 py-5 sm:px-6">
                <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] sm:tracking-[0.32em] text-muted-foreground/80">
                  THE SOLUTION
                </p>
                <div className="mt-4 flex flex-col items-start gap-2.5">
                  {architecture.map((step) => (
                    <div
                      key={step}
                      className="flex items-center gap-3 text-xs sm:text-sm text-muted-foreground/90"
                    >
                      <span className="h-px w-4 bg-white/15" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Hand Column */}
            <div className="flex flex-col gap-5">
              <div className="text-left">
                <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] sm:tracking-[0.32em] text-muted-foreground/80">
                  Technologies
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5 sm:gap-2">
                  {technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-1 text-xs sm:text-sm text-muted-foreground/90 inline-block"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Interaction Buttons Frame */}
              <div className="flex flex-wrap gap-3 mt-2">
                <a
                  href="https://github.com/NoChance333/final-year-project"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 px-4 py-2 text-xs sm:text-sm text-foreground transition-colors hover:bg-white/5"
                >
                  View GitHub →
                </a>
                <a
                  href="https://ieeexplore.ieee.org/document/11413273"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 px-4 py-2 text-xs sm:text-sm text-foreground transition-colors hover:bg-white/5"
                >
                  Read IEEE Paper →
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </SectionReveal>
    </div>
  );
}
