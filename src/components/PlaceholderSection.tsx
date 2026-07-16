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
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Track the scroll progress of this specific section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // --- Cinematic Timeline Settings (Applies to ALL instances now) ---
  const eyebrowOpacity = useTransform(scrollYProgress, [0.1, 0.2, 0.75, 0.85], [0, 1, 1, 0]);
  const eyebrowY = useTransform(scrollYProgress, [0.1, 0.2, 0.75, 0.85], [20, 0, 0, -20]);

  const titleOpacity = useTransform(scrollYProgress, [0.15, 0.28, 0.72, 0.82], [0, 1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0.15, 0.28, 0.72, 0.82], [30, 0, 0, -30]);
  const titleFilter = useTransform(scrollYProgress, [0.15, 0.28], ["blur(8px)", "blur(0px)"]);

  const paragraphs = Array.isArray(description)
    ? description
    : description
      ? [description]
      : [];

  return (
    <div ref={containerRef} className="w-full">
      <SectionReveal
        id={id}
        className="relative flex min-h-[100svh] w-full items-center justify-center px-6 py-24 sm:py-28 md:py-32"
      >
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          
          {/* Eyebrow */}
          <motion.p
            style={isMounted ? { opacity: eyebrowOpacity, y: eyebrowY } : {}}
            className="text-eyebrow"
          >
            {eyebrow}
          </motion.p>

          {/* Big Cinematic Title */}
          <motion.h2
            style={isMounted ? { opacity: titleOpacity, y: titleY, filter: titleFilter } : {}}
            className="mt-6 max-w-3xl text-[clamp(2.1rem,4.6vw,3.8rem)] leading-[1.05] tracking-[-0.025em] text-foreground text-pretty"
          >
            {title}
          </motion.h2>

          {/* Paragraphs Sequence */}
          {paragraphs.length > 0 && (
            <div className="mt-10 flex w-full flex-col items-center gap-6 sm:gap-7">
              {paragraphs.map((paragraph, index) => (
                <CinematicParagraph
                  key={`${id}-${index}`}
                  text={paragraph}
                  index={index}
                  progress={scrollYProgress}
                  isMounted={isMounted}
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
            className="mx-auto mt-14 h-px w-24 origin-center bg-gradient-to-r from-transparent via-white/40 to-transparent"
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
  isMounted: boolean;
}

function CinematicParagraph({ text, index, progress, isMounted }: ParagraphProps) {
  const startFade = 0.24 + index * 0.05;
  const endFade = startFade + 0.1;

  const opacity = useTransform(progress, [startFade, endFade, 0.68, 0.78], [0, 1, 1, 0]);
  const y = useTransform(progress, [startFade, endFade, 0.68, 0.78], [25, 0, 0, -25]);
  const filter = useTransform(progress, [startFade, endFade], ["blur(6px)", "blur(0px)"]);

  return (
    <motion.p
      style={isMounted ? { opacity, y, filter } : {}}
      className="max-w-2xl text-base leading-8 text-muted-foreground/90 sm:text-lg sm:leading-9 text-pretty"
    >
      {text}
    </motion.p>
  );
}