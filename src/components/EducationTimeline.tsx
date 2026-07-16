"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { SectionReveal } from "@/components/SectionReveal";
import { useRef, useEffect, useState } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

const milestones = [
  {
    year: "2020",
    title: "Adamas World School",
    subtitle: "Secondary Education",
  },
  {
    year: "2022",
    title: "Central Model School",
    subtitle: "Higher Secondary",
  },
  {
    year: "2025",
    title: "Bachelor of Computer Applications",
    subtitle: "Adamas University",
    detail: "CGPA: 6.65",
  },
  {
    year: "2025 – Present",
    title: "Master of Computer Applications",
    subtitle: "Adamas University",
    detail: "Currently Pursuing",
  },
] as const;

export function EducationTimeline() {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Track scroll metrics for the entire timeline segment
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // --- Cinematic Timeline Settings ---
  // Eyebrow
  const eyebrowOpacity = useTransform(scrollYProgress, [0.1, 0.2, 0.75, 0.85], [0, 1, 1, 0]);
  const eyebrowY = useTransform(scrollYProgress, [0.1, 0.2, 0.75, 0.85], [16, 0, 0, -16]);

  // Main Header
  const titleOpacity = useTransform(scrollYProgress, [0.14, 0.26, 0.72, 0.82], [0, 1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0.14, 0.26, 0.72, 0.82], [24, 0, 0, -24]);
  const titleFilter = useTransform(scrollYProgress, [0.14, 0.26], ["blur(8px)", "blur(0px)"]);

  // Center vertical line fade
  const lineOpacity = useTransform(scrollYProgress, [0.18, 0.32, 0.7, 0.8], [0, 1, 1, 0]);

  const useCinematic = isMounted && !shouldReduceMotion;

  return (
    <div ref={containerRef} className="w-full">
      <SectionReveal
        id="education"
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
            EDUCATION
          </motion.p>

          {/* Big Title */}
          <motion.h2
            style={useCinematic ? { opacity: titleOpacity, y: titleY, filter: titleFilter } : {}}
            initial={!useCinematic ? { opacity: 0, y: 24 } : undefined}
            whileInView={!useCinematic ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1, ease: EASE, delay: 0.08 }}
            className="mt-6 max-w-2xl text-[clamp(1.9rem,4vw,3rem)] leading-[1.05] tracking-[-0.02em] text-foreground"
          >
            A calm path through study, craft, and growth.
          </motion.h2>

          {/* Timeline Node Map Wrapper */}
          <div className="relative mt-16 w-full max-w-3xl">
            {/* Center Vertical Track Line */}
            <motion.div
              style={useCinematic ? { opacity: lineOpacity } : {}}
              className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/35 to-transparent sm:block"
              aria-hidden="true"
            />

            <div className="flex flex-col gap-14 sm:gap-16">
              {milestones.map((milestone, index) => {
                const isEven = index % 2 === 0;

                // Stagger item entry points down the scroll vector based on loop index
                const startFade = 0.2 + index * 0.06;
                const endFade = startFade + 0.1;

                // Hook up structural transforms for each specific timeline block
                const itemOpacity = useTransform(scrollYProgress, [startFade, endFade, 0.68, 0.78], [0, 1, 1, 0]);
                const itemY = useTransform(scrollYProgress, [startFade, endFade, 0.68, 0.78], [30, 0, 0, -30]);

                return (
                  <motion.div
                    key={milestone.year}
                    style={useCinematic ? { opacity: itemOpacity, y: itemY } : {}}
                    initial={!useCinematic ? { opacity: 0, y: 24, scale: 0.98 } : undefined}
                    whileInView={!useCinematic ? { opacity: 1, y: 0, scale: 1 } : undefined}
                    viewport={{ once: true, margin: "-15%" }}
                    transition={{ duration: 0.9, ease: EASE }}
                    className={`relative flex justify-center ${isEven ? "sm:justify-start" : "sm:justify-end"}`}
                  >
                    <div
                      className={`w-full max-w-[22rem] ${
                        isEven
                          ? "sm:pr-10 sm:text-right"
                          : "sm:pl-10 sm:text-left"
                      }`}
                    >
                      <p className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground/80">
                        {milestone.year}
                      </p>
                      <p className="mt-3 text-lg leading-none text-foreground sm:text-xl">
                        {milestone.title}
                      </p>
                      <p className="mt-2 text-sm leading-7 text-muted-foreground/90">
                        {milestone.subtitle}
                      </p>
                      {milestone.detail && (
                        <p className="mt-2 text-sm leading-7 text-muted-foreground/80">
                          {milestone.detail}
                        </p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </SectionReveal>
    </div>
  );
}