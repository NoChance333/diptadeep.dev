"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";

// FIX: Added "education" back into the tracking array right after "about"
const sections = [
  "home",
  "about",
  "education",
  "experience",
  "research",
  "featured-project",
  "skills",
  "contact",
];

function formatTitle(id: string) {
  return id.replace(/-/g, " ").toUpperCase();
}

export function FloatingSectionIndicator() {
  const [active, setActive] = useState("home");
  const { scrollY } = useScroll();

  // Scroll-based opacity: invisible in Hero, fades in as you reach About
  const opacity = useTransform(scrollY, [500, 750], [0, 1]);
  const y = useTransform(scrollY, [500, 750], [-12, 0]);

  useEffect(() => {
    const updateActiveSection = () => {
      const viewportHeight = window.innerHeight;
      const detectionLine = window.scrollY + viewportHeight / 2;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        const bottom = top + el.offsetHeight;

        if (detectionLine >= top && detectionLine < bottom) {
          setActive(id);
          break;
        }
      }
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  return (
    <motion.div
      style={{ opacity, y }}
      initial={{ opacity: 0, y: -12, x: "-50%" }}
      transition={{
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="fixed left-1/2 top-5 md:top-7 z-[60] transform-gpu pointer-events-none w-auto"
    >
      <div className="rounded-full border border-white/10 bg-black/70 px-6 py-2.5 md:px-10 md:py-4 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <AnimatePresence mode="wait">
          <motion.span
            key={active}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="block text-[10px] md:text-[14px] font-semibold uppercase tracking-[0.35em] md:tracking-[0.42em] text-white text-center whitespace-nowrap"
          >
            {formatTitle(active)}
          </motion.span>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
