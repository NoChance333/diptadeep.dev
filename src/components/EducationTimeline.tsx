"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { SectionReveal } from "@/components/SectionReveal";
import { useRef, useEffect, useState } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

interface Milestone {
  year: string;
  title: string;
  subtitle: string;
  detail?: string;
}

const milestones: Milestone[] = [
  { year: "2020", title: "Adamas World School", subtitle: "Secondary Education" },
  { year: "2022", title: "Central Model School", subtitle: "Higher Secondary" },
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
];

export function EducationTimeline() {
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

  // Global Scroll Transforms for Desktop Configuration
  const eyebrowOpacity = useTransform(scrollYProgress, [0.1, 0.2, 0.75, 0.85], [0, 1, 1, 0]);
  const eyebrowY = useTransform(scrollYProgress, [0.1, 0.2, 0.75, 0.85], [16, 0, 0, -16]);

  const titleOpacity = useTransform(scrollYProgress, [0.14, 0.26, 0.72, 0.82], [0, 1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0.14, 0.26, 0.72, 0.82], [24, 0, 0, -24]);

  // FIX 1: Balanced the filter array to match the 4-point structure completely
  const titleFilter = useTransform(
    scrollYProgress,
    [0.14, 0.26, 0.72, 0.82],
    ["blur(8px)", "blur(0px)", "blur(0px)", "blur(8px)"],
  );

  const imgOpacity = useTransform(scrollYProgress, [0.2, 0.34, 0.7, 0.8], [0, 1, 1, 0]);

  // FIX 2: Balanced scale array structure to prevent rendering errors
  const imgScale = useTransform(scrollYProgress, [0.2, 0.34, 0.7, 0.8], [0.96, 1, 1, 0.96]);

  const lineOpacity = useTransform(scrollYProgress, [0.25, 0.38, 0.68, 0.78], [0, 1, 1, 0]);

  // Optimization: Allow cinematic tracking to run smoothly on mobile viewports safely
  const useCinematic = isMounted && !shouldReduceMotion;

  return (
    <div ref={containerRef} className="w-full relative">
      <SectionReveal
        id="education"
        className="relative flex min-h-[100svh] w-full items-center justify-center px-6 py-24 sm:py-28 md:py-32"
      >
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
          <motion.p
            /* FIX 3: Replaced empty objects {} with undefined to ensure safe style evaluations */
            style={useCinematic ? { opacity: eyebrowOpacity, y: eyebrowY } : undefined}
            initial={!useCinematic ? { opacity: 0, y: 16 } : undefined}
            whileInView={!useCinematic ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="text-eyebrow transform-gpu"
          >
            EDUCATION
          </motion.p>

          <motion.h2
            style={
              useCinematic ? { opacity: titleOpacity, y: titleY, filter: titleFilter } : undefined
            }
            initial={!useCinematic ? { opacity: 0, y: 24 } : undefined}
            whileInView={!useCinematic ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1, ease: EASE, delay: 0.08 }}
            className="mt-6 max-w-2xl text-[clamp(1.9rem,4vw,3rem)] leading-[1.05] tracking-[-0.02em] text-foreground transform-gpu"
          >
            A calm path through study, craft, and growth.
          </motion.h2>

          <motion.div
            style={useCinematic ? { opacity: imgOpacity, scale: imgScale } : undefined}
            initial={!useCinematic ? { opacity: 0, scale: 0.98 } : undefined}
            whileInView={!useCinematic ? { opacity: 1, scale: 1 } : undefined}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.95, ease: EASE, delay: 0.12 }}
            /* 
              FIX 4: Added an aspect-[4/3] ratio and explicit minimum height boundary to the card. 
              This holds the card's box structure solid before the image asset arrives, killing local layout shifts.
            */
            className="mt-12 w-full max-w-sm aspect-[4/3] min-h-[220px] sm:min-h-[280px] overflow-hidden rounded-[2rem] border border-white/10 p-1.5 bg-white/[0.01] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.8)] transform-gpu"
          >
            <img
              src="/images/graduation.jpeg"
              alt="Graduation Milestone"
              className="h-full w-full object-cover rounded-[1.6rem] block opacity-85 hover:opacity-100 transition-opacity duration-500"
              loading="eager"
            />
          </motion.div>

          {/* Timeline Node Map Wrapper */}
          <div className="relative mt-16 w-full max-w-3xl">
            <motion.div
              style={useCinematic ? { opacity: lineOpacity } : undefined}
              initial={!useCinematic ? { opacity: 0 } : undefined}
              whileInView={!useCinematic ? { opacity: 1 } : undefined}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/35 to-transparent sm:block"
              aria-hidden="true"
            />

            <div className="flex flex-col gap-14 sm:gap-16">
              {milestones.map((milestone, index) => {
                const isEven = index % 2 === 0;

                return (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.8, ease: EASE, delay: index * 0.08 }}
                    className={`relative flex justify-center transform-gpu ${isEven ? "sm:justify-start" : "sm:justify-end"}`}
                  >
                    <div
                      className={`w-full max-w-[22rem] ${isEven ? "sm:pr-10 sm:text-right" : "sm:pl-10 sm:text-left"}`}
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
