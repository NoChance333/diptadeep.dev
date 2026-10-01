"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useEffect, useState } from "react";

export function MouseSpotlight() {
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(true); // Default true to avoid flash on mobile init

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 160, damping: 24, mass: 0.6 });
  const springY = useSpring(mouseY, { stiffness: 160, damping: 24, mass: 0.6 });

  const background = useMotionTemplate`radial-gradient(800px circle at ${springX}px ${springY}px, rgba(255,255,255,0.12) 0%, rgba(157,191,255,0.08) 35%, rgba(89,122,255,0.03) 70%, transparent 100%)`;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);

    if (mediaQuery.matches || shouldReduceMotion) {
      mouseX.set(0);
      mouseY.set(0);
      return () => mediaQuery.removeEventListener("change", handler);
    }

    const handlePointerMove = (event: PointerEvent) => {
      // Prevent running if the input source is a touch gesture instead of a mouse cursor
      if (event.pointerType === "touch") return;

      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => {
      mediaQuery.removeEventListener("change", handler);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [mouseX, mouseY, shouldReduceMotion]);

  // RULE 3: Component Culling - Completely remove the layer from the DOM node tree on mobile devices
  if (isMobile || shouldReduceMotion) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden transform-gpu"
      style={{
        background: background,
        opacity: 0.2,
      }}
    />
  );
}
