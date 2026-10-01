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
  const sectionOpacity = useTransform(scrollYProgress, [0.06, 0.18, 0.58, 0.70], [0, 1, 1, 0]);

  const eyebrowOpacity = useTransform(scrollYProgress, [0.08, 0.20, 0.44, 0.54], [0, 1, 1, 0]);
  const eyebrowY = useTransform(scrollYProgress, [0.08, 0.20, 0.44, 0.54], [16, 0, 0, -16]);

  const titleOpacity = useTransform(scrollYProgress, [0.12, 0.24, 0.48, 0.58], [0, 1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0.12, 0.24, 0.48, 0.58], [24, 0, 0, -24]);

  const lineOpacity = useTransform(scrollYProgress, [0.26, 0.36, 0.58, 0.68], [0, 1, 1, 0]);
  const lineScale = useTransform(scrollYProgress, [0.26, 0.36, 0.58, 0.68], [0.8, 1, 1, 0.8]);

  const paragraphs = Array.isArray(description) ? description : description ? [description] : [];

  return (
    <div ref={containerRef} className="w-full">
      <SectionReveal
        id={id}
        className="relative flex min-h-[100svh] w-full items-center justify-center px-6 py-24 sm:py-28 md:py-32"
      >
        <motion.div
          style={{ opacity: sectionOpacity }}
          className="mx-auto flex max-w-4xl flex-col items-center text-center transform-gpu"
        >
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
            style={{ opacity: lineOpacity, scaleX: lineScale }}
            className="mx-auto mt-14 h-px w-24 origin-center bg-gradient-to-r from-transparent via-white/40 to-transparent transform-gpu"
          />
        </motion.div>
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

function CinematicParagraph({ text, index, progress }: ParagraphProps) {
  const startIn = 0.16 + index * 0.04;
  const endIn = startIn + 0.08;
  const startOut = 0.50 + index * 0.03;
  const endOut = startOut + 0.09;

  const opacity = useTransform(progress, [startIn, endIn, startOut, endOut], [0, 1, 1, 0]);
  const y = useTransform(progress, [startIn, endIn, startOut, endOut], [20, 0, 0, -20]);

  return (
    <motion.p
      style={{
        opacity,
        y,
      }}
      className="max-w-2xl text-base leading-8 text-muted-foreground/90 sm:text-lg sm:leading-9 text-pretty transform-gpu"
    >
      {text}
    </motion.p>
  );
}
