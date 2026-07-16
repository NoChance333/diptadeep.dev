"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { SectionReveal } from "@/components/SectionReveal";
import { useRef, useEffect, useState } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

const milestones = [
  { year: "2020", title: "Adamas World School", subtitle: "Secondary Education" },
  { year: "2022", title: "Central Model School", subtitle: "Higher Secondary" },
  { year: "2025", title: "Bachelor of Computer Applications", subtitle: "Adamas University", detail: "CGPA: 6.65" },
  { year: "2025 – Present", title: "Master of Computer Applications", subtitle: "Adamas University", detail: "Currently Pursuing" },
] as const;

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

  const eyebrowOpacity = useTransform(scrollYProgress, [0.1, 0.2, 0.75, 0.85], [0, 1, 1, 0]);
  const eyebrowY = useTransform(scrollYProgress, [0.1, 0.2, 0.75, 0.85], [16, 0, 0, -16]);

  const titleOpacity = useTransform(scrollYProgress, [0.14, 0.26, 0.72, 0.82], [0, 1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0.14, 0.26, 0.72, 0.82], [24, 0, 0, -24]);
  const titleFilter = useTransform(scrollYProgress, [0.14, 0.26], ["blur(8px)", "blur(0px)"]);

  // Specific transform window for the graduation spotlight card
  const imgOpacity = useTransform(scrollYProgress, [0.2, 0.34, 0.7, 0.8], [0, 1, 1, 0]);
  const imgScale = useTransform(scrollYProgress, [0.2, 0.34], [0.96, 1]);

  const lineOpacity = useTransform(scrollYProgress, [0.25, 0.38, 0.68, 0.78], [0, 1, 1, 0]);

  const useCinematic = isMounted && !shouldReduceMotion;

  return (
    <div ref={containerRef} className="w-full">
      <SectionReveal
        id="education"
        className="relative flex min-h-[100svh] w-full items-center justify-center px-6 py-24 sm:py-28 md:py-32"
      >
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
          
          <motion.p
            style={useCinematic ? { opacity: eyebrowOpacity, y: eyebrowY } : {}}
            className="text-eyebrow"
          >
            EDUCATION
          </motion.p>

          <motion.h2
            style={useCinematic ? { opacity: titleOpacity, y: titleY, filter: titleFilter } : {}}
            className="mt-6 max-w-2xl text-[clamp(1.9rem,4vw,3rem)] leading-[1.05] tracking-[-0.02em] text-foreground"
          >
            A calm path through study, craft, and growth.
          </motion.h2>

{/* Height constraints removed. The frame hugs the portrait aspect ratio natively */}
<motion.div
  style={useCinematic ? { opacity: imgOpacity, scale: imgScale } : {}}
  className="mt-12 w-full max-w-sm overflow-hidden rounded-[2rem] border border-white/10 p-1.5 bg-white/[0.01] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.8)]"
>
  <img 
    src="/images/graduation.jpeg" 
    alt="Graduation Milestone" 
    className="h-auto w-full rounded-[1.6rem] display-block opacity-85 hover:opacity-100 transition-opacity duration-500"
  />
</motion.div>

          {/* Timeline Node Map Wrapper */}
          <div className="relative mt-16 w-full max-w-3xl">
            <motion.div
              style={useCinematic ? { opacity: lineOpacity } : {}}
              className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/35 to-transparent sm:block"
              aria-hidden="true"
            />

            <div className="flex flex-col gap-14 sm:gap-16">
              {milestones.map((milestone, index) => {
                const isEven = index % 2 === 0;
                const startFade = 0.28 + index * 0.06;
                const endFade = startFade + 0.1;

                const itemOpacity = useTransform(scrollYProgress, [startFade, endFade, 0.68, 0.78], [0, 1, 1, 0]);
                const itemY = useTransform(scrollYProgress, [startFade, endFade, 0.68, 0.78], [30, 0, 0, -30]);

                return (
                  <motion.div
                    key={milestone.year}
                    style={useCinematic ? { opacity: itemOpacity, y: itemY } : {}}
                    className={`relative flex justify-center ${isEven ? "sm:justify-start" : "sm:justify-end"}`}
                  >
                    <div className={`w-full max-w-[22rem] ${isEven ? "sm:pr-10 sm:text-right" : "sm:pl-10 sm:text-left"}`}>
                      <p className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground/80">{milestone.year}</p>
                      <p className="mt-3 text-lg leading-none text-foreground sm:text-xl">{milestone.title}</p>
                      <p className="mt-2 text-sm leading-7 text-muted-foreground/90">{milestone.subtitle}</p>
                      {milestone.detail && <p className="mt-2 text-sm leading-7 text-muted-foreground/80">{milestone.detail}</p>}
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