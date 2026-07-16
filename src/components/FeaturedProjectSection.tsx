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

const architecture = ["User", "Flask Backend", "Ethereum Smart Contract", "IPFS Storage", "NFT Ownership"];

export function FeaturedProjectSection() {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Track scroll position metrics of this component container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // --- Cinematic Timeline Map Settings ---
  // Eyebrow reveal & exit windows
  const eyebrowOpacity = useTransform(scrollYProgress, [0.1, 0.2, 0.75, 0.85], [0, 1, 1, 0]);
  const eyebrowY = useTransform(scrollYProgress, [0.1, 0.2, 0.75, 0.85], [16, 0, 0, -16]);

  // Main Section Headline Transitions
  const titleOpacity = useTransform(scrollYProgress, [0.14, 0.26, 0.72, 0.82], [0, 1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0.14, 0.26, 0.72, 0.82], [24, 0, 0, -24]);
  const titleFilter = useTransform(scrollYProgress, [0.14, 0.26], ["blur(8px)", "blur(0px)"]);

  // Big Glass Showcase Card Frame
  const cardOpacity = useTransform(scrollYProgress, [0.2, 0.32, 0.68, 0.78], [0, 1, 1, 0]);
  const cardY = useTransform(scrollYProgress, [0.2, 0.32, 0.68, 0.78], [40, 0, 0, -40]);

  // Bottom Columns Grid Container 
  const layoutOpacity = useTransform(scrollYProgress, [0.25, 0.38, 0.65, 0.75], [0, 1, 1, 0]);
  const layoutY = useTransform(scrollYProgress, [0.25, 0.38, 0.65, 0.75], [30, 0, 0, -30]);

  // Safe checks for running state transformations
  const useCinematic = isMounted && !shouldReduceMotion;

  return (
    <div ref={containerRef} className="w-full">
      <SectionReveal
        id="featured-project"
        className="relative flex min-h-[100svh] w-full items-center justify-center px-6 py-24 sm:py-28 md:py-32"
      >
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
          
          {/* Eyebrow */}
          <motion.p
            style={useCinematic ? { opacity: eyebrowOpacity, y: eyebrowY } : {}}
            initial={!useCinematic ? { opacity: 0, y: 16 } : undefined}
            whileInView={!useCinematic ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="text-eyebrow"
          >
            FEATURED PROJECT
          </motion.p>

          {/* Big Cinematic Title */}
          <motion.h2
            style={useCinematic ? { opacity: titleOpacity, y: titleY, filter: titleFilter } : {}}
            initial={!useCinematic ? { opacity: 0, y: 24 } : undefined}
            whileInView={!useCinematic ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1, ease: EASE, delay: 0.08 }}
            className="mt-6 max-w-3xl text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.05] tracking-[-0.025em] text-foreground"
          >
            Securing ownership,
            <br />
            through software.
          </motion.h2>

          {/* Large Showcase Glass Image Panel Card */}
          <GlassPanel
            style={useCinematic ? { opacity: cardOpacity, y: cardY } : {}}
            initial={!useCinematic ? { opacity: 0, y: 24, scale: 0.985 } : undefined}
            whileInView={!useCinematic ? { opacity: 1, y: 0, scale: 1 } : undefined}
            viewport={{ once: true, margin: "-12%" }}
            transition={{ duration: 1.05, ease: EASE, delay: 0.12 }}
            className="mt-14 w-full overflow-hidden shadow-[0_22px_70px_-32px_rgba(0,0,0,0.84)]"
          >
            <div className="flex min-h-[22rem] items-center justify-center border-b border-white/10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.035),transparent_70%)] p-8 sm:min-h-[26rem] sm:p-10 md:p-12">
              <motion.img
                src="/images/novis.png"
                alt="NOVIS Web Application"
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: EASE }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="w-full max-w-5xl rounded-[24px] border border-white/10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.75)]"
              />
            </div>
            <div className="px-6 py-8 text-left sm:px-8 sm:py-9">
              <p className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground/80">
                Blockchain-Based Tokenization and Management of Land Documents
              </p>
              <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground/90 sm:text-lg">
                A decentralized approach to secure ownership and transfer, designed to make land records more verifiable, trustworthy, and resilient.
              </p>
            </div>
          </GlassPanel>

          {/* Tech Breakdown & Description Bottom Grid Layer */}
          <motion.div 
            style={useCinematic ? { opacity: layoutOpacity, y: layoutY } : {}}
            initial={!useCinematic ? { opacity: 0, y: 20 } : undefined}
            whileInView={!useCinematic ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.14 }}
            className="mt-14 grid w-full gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10"
          >
            {/* Left Hand Columns */}
            <div className="flex flex-col gap-6 text-left">
              <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.025] px-6 py-6 sm:px-7">
                <p className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground/80">
                  THE CHALLENGE
                </p>
                <p className="mt-4 text-base leading-8 text-muted-foreground/90 sm:text-lg">
                  Land ownership records are often paper-based, difficult to verify, and vulnerable to tampering.
                </p>
              </div>

              <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.025] px-6 py-6 sm:px-7">
                <p className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground/80">
                  THE SOLUTION
                </p>
                <div className="mt-6 flex flex-col items-start gap-3">
                  {architecture.map((step) => (
                    <div
                      key={step}
                      className="flex items-center gap-3 text-sm text-muted-foreground/90"
                    >
                      <span className="h-px w-5 bg-white/15" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Hand Tech Array and Buttons Panel Column */}
            <div className="flex flex-col gap-6">
              <div className="text-left">
                <p className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground/80">
                  Technologies
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {technologies.map((tech) => (
                    <motion.span
                      key={tech}
                      whileHover={{ y: -2, scale: 1.01 }}
                      className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-sm text-muted-foreground/90"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Interaction Buttons Frame */}
              <div className="flex flex-wrap gap-3">
                <motion.a
                  href="https://github.com/NoChance333/final-year-project"
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="inline-flex items-center justify-center rounded-full border border-white/15 px-4 py-2 text-sm text-foreground transition-colors hover:bg-white/5"
                >
                  View GitHub →
                </motion.a>
                <motion.a
                  href="https://ieeexplore.ieee.org/document/11413273"
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="inline-flex items-center justify-center rounded-full border border-white/15 px-4 py-2 text-sm text-foreground transition-colors hover:bg-white/5"
                >
                  Read IEEE Paper →
                </motion.a>
              </div>
            </div>
          </motion.div>

        </div>
      </SectionReveal>
    </div>
  );
}