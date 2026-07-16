import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect } from "react";

export function MouseSpotlight() {
  const shouldReduceMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 160, damping: 24, mass: 0.6 });
  const springY = useSpring(mouseY, { stiffness: 160, damping: 24, mass: 0.6 });
  const background = useMotionTemplate`radial-gradient(800px circle at ${springX}px ${springY}px, rgba(255,255,255,0.12) 0%, rgba(157,191,255,0.08) 35%, rgba(89,122,255,0.03) 70%, transparent 100%)`;

  useEffect(() => {
    if (shouldReduceMotion) {
      mouseX.set(0);
      mouseY.set(0);
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [mouseX, mouseY, shouldReduceMotion]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{
        background: shouldReduceMotion ? "transparent" : background,
        opacity: shouldReduceMotion ? 0 : 0.2,
      }}
    />
  );
}
