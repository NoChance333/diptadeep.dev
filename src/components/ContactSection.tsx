"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { SectionReveal } from "@/components/SectionReveal";
import { useRef, useEffect, useState } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

const links = [
  { label: "GitHub", href: "https://github.com/NoChance333" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/diptadeep-roy-7123171ba/" },
];

export function ContactSection() {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Track scroll timeline metrics of this contact block
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // --- Cinematic Timeline Settings ---
  // Eyebrow
  const eyebrowOpacity = useTransform(scrollYProgress, [0.15, 0.28, 0.85, 0.95], [0, 1, 1, 0]);
  const eyebrowY = useTransform(scrollYProgress, [0.15, 0.28, 0.85, 0.95], [16, 0, 0, -16]);

  // Headline
  const titleOpacity = useTransform(scrollYProgress, [0.18, 0.32, 0.82, 0.92], [0, 1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0.18, 0.32, 0.82, 0.92], [24, 0, 0, -24]);
  const titleFilter = useTransform(scrollYProgress, [0.18, 0.32], ["blur(8px)", "blur(0px)"]);

  // Sub-description string paragraph
  const descOpacity = useTransform(scrollYProgress, [0.22, 0.36, 0.8, 0.9], [0, 1, 1, 0]);
  const descY = useTransform(scrollYProgress, [0.22, 0.36, 0.8, 0.9], [20, 0, 0, -20]);

  // Interactive buttons and links array
  const actionsOpacity = useTransform(scrollYProgress, [0.26, 0.4, 0.78, 0.88], [0, 1, 1, 0]);
  const actionsY = useTransform(scrollYProgress, [0.26, 0.4, 0.78, 0.88], [16, 0, 0, -16]);

  const useCinematic = isMounted && !shouldReduceMotion;

  return (
    <div ref={containerRef} className="w-full">
      <SectionReveal
        id="contact"
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
            CONTACT
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
            Let's build something together.
          </motion.h2>

          {/* Core Subtitle Paragraph */}
          <motion.p
            style={useCinematic ? { opacity: descOpacity, y: descY } : {}}
            initial={!useCinematic ? { opacity: 0, y: 20 } : undefined}
            whileInView={!useCinematic ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.95, ease: EASE, delay: 0.14 }}
            className="mx-auto mt-8 max-w-2xl text-base leading-8 text-muted-foreground/90 sm:text-lg"
          >
            Whether it's software engineering, open-source collaboration, research, or simply discussing ideas, I'm always happy to connect.
          </motion.p>

          {/* Animated Action / Links Frame Wrapper */}
          <motion.div 
            style={useCinematic ? { opacity: actionsOpacity, y: actionsY } : {}}
            className="flex flex-col items-center w-full"
          >
            {/* Divider Decorative Rule Line */}
            <div className="mt-12 h-px w-24 bg-gradient-to-r from-transparent via-white/35 to-transparent" />

            {/* Social Network Link Badges */}
            <div className="mt-10 flex flex-wrap justify-center gap-3 sm:gap-4">
              {links.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="inline-flex items-center justify-center rounded-full border border-white/15 px-4 py-2 text-sm text-foreground transition-colors hover:bg-white/5"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            {/* Dynamic Direct Email Anchor */}
            <motion.a
              href="mailto:diptadeeproy5747@gmail.com"
              whileHover={{ y: -1 }}
              className="mt-8 inline-block text-base tracking-wide text-muted-foreground transition-colors duration-300 hover:text-white"
            >
              diptadeeproy5747@gmail.com
            </motion.a>
          </motion.div>

        </div>
      </SectionReveal>
    </div>
  );
}