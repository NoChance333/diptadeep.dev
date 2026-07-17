"use client";

import { motion, MotionProps } from "framer-motion";
import { ReactNode, useState, useEffect } from "react";

interface Props extends MotionProps {
  children: ReactNode;
  className?: string;
}

export function GlassPanel({
  children,
  className = "",
  whileHover,
  whileTap,
  initial,
  animate,
  transition,
  viewport,
  onHoverStart,
  onHoverEnd,
  ...motionProps
}: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <motion.div
      {...motionProps}
      whileHover={!isMobile ? whileHover : undefined}
      whileTap={whileTap}
      initial={initial}
      animate={animate}
      transition={transition}
      viewport={viewport}
      onHoverStart={!isMobile ? (event) => {
        setIsHovered(true);
        onHoverStart?.(event);
      } : undefined}
      onHoverEnd={!isMobile ? (event) => {
        setIsHovered(false);
        onHoverEnd?.(event);
      } : undefined}
      // PERFORMANCE: backdrop-blur-xl is strictly limited to desktop viewports (md:), and transform-gpu keeps calculations smooth
      className={`relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.035] md:backdrop-blur-xl transform-gpu ${className}`}
    >
      {/* OPTIMIZATION: Do not mount the animated sheen flash element inside the DOM on mobile screens */}
      {!isMobile && (
        <motion.div
          animate={isHovered ? "hover" : "rest"}
          variants={{
            rest: { x: "-130%" },
            hover: { x: "130%" },
          }}
          transition={{
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="pointer-events-none absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-white/15 to-transparent blur-xl transform-gpu"
        />
      )}

      {children}
    </motion.div>
  );
}