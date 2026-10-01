"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { SectionReveal } from "@/components/SectionReveal";
import { useRef, useEffect, useState } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

interface Props {
  id: string;
  eyebrow: string;
  title: string;
  description?: string | string[];
}

export function PlaceholderSection({ id, eyebrow, title, description }: Props) {
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

  // Timeline transformations
  const eyebrowOpacity = useTransform(scrollYProgress, [0.1, 0.2, 0.75, 0.85], [0, 1, 1, 0]);
  const eyebrowY = useTransform(scrollYProgress, [0.1, 0.2, 0.75, 0.85], [20, 0, 0, -20]);

  const titleOpacity = useTransform(scrollYProgress, [0.15, 0.28, 0.72, 0.82], [0, 1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0.15, 0.28, 0.72, 0.82], [30, 0, 0, -30]);

  // RULE 2: Keep dynamic blur tracking strictly isolated to desktop targets
  const titleFilter = useTransform(scrollYProgress, [0.15, 0.28], ["blur(8px)", "blur(0px)"]);

  const paragraphs = Array.isArray(description) ? description : description ? [description] : [];

  return (
    <div ref={containerRef} className="w-full">
      <SectionReveal
        id={id}
        className="relative flex min-h-[100svh] w-full items-center justify-center px-6 py-24 sm:py-28 md:py-32"
      >
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center transform-gpu">
          {/* Eyebrow */}
          <motion.p
            style={{ opacity: eyebrowOpacity, y: eyebrowY }}
            className="text-eyebrow transform-gpu"
          >
            {eyebrow}
          </motion.p>

          {/* Big Cinematic Title */}
          <motion.h2
            style={{
              opacity: titleOpacity,
              y: titleY,
              // RULE 2: Bypass heavy rendering checks completely on mobile targets
              filter: isMobile ? "none" : titleFilter,
            }}
            className="mt-6 max-w-3xl text-[clamp(2.1rem,4.6vw,3.8rem)] leading-[1.05] tracking-[-0.025em] text-foreground text-pretty transform-gpu"
          >
            {title}
          </motion.h2>

          {/* Paragraphs Sequence */}
          {paragraphs.length > 0 && (
            <div className="mt-10 flex w-full flex-col items-center gap-6 sm:gap-7 transform-gpu">
              {paragraphs.map((paragraph, index) => (
                <CinematicParagraph
                  key={`${id}-${index}`}
                  text={paragraph}
                  index={index}
                  progress={scrollYProgress}
                  isMobile={isMobile}
                />
              ))}
            </div>
          )}

          {/* Decorative Bottom Line */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0.8 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
            className="mx-auto mt-14 h-px w-24 origin-center bg-gradient-to-r from-transparent via-white/40 to-transparent transform-gpu"
          />
        </div>
      </SectionReveal>
    </div>
  );
}

interface ParagraphProps {
  text: string;
  index: number;
  progress: MotionValue<number>;
  isMobile: boolean;
}

function CinematicParagraph({ text, index, progress, isMobile }: ParagraphProps) {
  const startFade = 0.24 + index * 0.05;
  const endFade = startFade + 0.1;

  const opacity = useTransform(progress, [startFade, endFade, 0.68, 0.78], [0, 1, 1, 0]);
  const y = useTransform(progress, [startFade, endFade, 0.68, 0.78], [25, 0, 0, -25]);
  const filter = useTransform(progress, [startFade, endFade], ["blur(6px)", "blur(0px)"]);

  return (
    <motion.p
      style={{
        opacity,
        y,
        // RULE 2: Drop pixel-level blur convolution pipelines from processing threads on mobile
        filter: isMobile ? "none" : filter,
      }}
      className="max-w-2xl text-base leading-8 text-muted-foreground/90 sm:text-lg sm:leading-9 text-pretty transform-gpu"
    >
      {text}
    </motion.p>
  );
}
