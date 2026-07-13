import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const wrapRef = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const reducedMotion = useReducedMotion();
  const reducedProgress = useMotionValue(0);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end start"],
  });
  const sx = useSpring(mx, { stiffness: 60, damping: 20, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 20, mass: 0.6 });
  const rotY = useTransform(sx, [-1, 1], [3, -3]);
  const rotX = useTransform(sy, [-1, 1], [-2, 2]);
  const tx = useTransform(sx, [-1, 1], [-6, 6]);
  const ty = useTransform(sy, [-1, 1], [-4, 4]);
  const progress = reducedMotion ? reducedProgress : scrollYProgress;
  const portraitScale = useTransform(progress, [0, 0.16, 0.45, 0.75], [1, 0.96, 0.84, 0.74]);
  const portraitOpacity = useTransform(progress, [0, 0.16, 0.46, 0.78], [1, 1, 0.48, 0]);
  const portraitY = useTransform(progress, [0, 0.3, 0.75], [0, -26, -54]);
  const roleOpacity = useTransform(progress, [0, 0.14, 0.34, 0.6], [1, 1, 0.28, 0]);
  const headlineOpacity = useTransform(progress, [0, 0.2, 0.5, 0.8], [1, 1, 0.76, 0.18]);
  const headlineY = useTransform(progress, [0, 0.24, 0.64], [0, -12, -28]);
  const glowOpacity = useTransform(progress, [0, 0.24, 0.62], [0.7, 0.35, 0.08]);
  const glowY = useTransform(progress, [0, 0.6], [0, -16]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      mx.set((e.clientX / w) * 2 - 1);
      my.set((e.clientY / h) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  return (
    <section
      id="home"
      ref={wrapRef}
      className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden px-6 pt-28"
    >
      {/* Portrait reveal */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.4, ease: EASE, delay: 0.2 }}
        className="relative"
        style={{ perspective: 1200 }}
      >
        <motion.div
          style={{
            rotateX: rotX,
            rotateY: rotY,
            x: tx,
            y: ty,
            scale: portraitScale,
            opacity: portraitOpacity,
            transformOrigin: "center center",
          }}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
          className="relative h-52 w-40 sm:h-48 sm:w-48"
        >
          {/* Ambient glow */}
          <motion.div
            className="absolute -inset-10 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, oklch(0.72 0.11 240 / 0.32) 0%, transparent 68%)",
              opacity: glowOpacity,
              y: glowY,
            }}
          />
          <motion.div
            className="relative h-full w-full overflow-hidden rounded-full ring-[0.75px] ring-white/15 shadow-[0_20px_70px_-22px_rgba(0,0,0,0.82)]"
            style={{ y: portraitY }}
          >
            <img
              src="/images/hero.png"
              alt="Diptadeep Roy"
              className="h-full w-full object-cover"
              draggable={false}
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 50% 30%, transparent 42%, rgba(0,0,0,0.32) 100%)",
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Name */}
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.35, ease: EASE, delay: 0.95 }}
        className="mt-16 text-center text-[clamp(2.4rem,5.8vw,4.8rem)] font-medium leading-[0.9] tracking-[-0.02em] text-foreground"
      >
        Diptadeep Roy
      </motion.h1>

      {/* Roles */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.25, ease: EASE, delay: 1.2 }}
        className="mt-6 text-center text-[12px] uppercase tracking-[0.34em] text-muted-foreground/90 sm:text-[13px]"
        style={{ opacity: roleOpacity }}
      >
        Software Developer
      </motion.p>

      {/* Massive statement */}
      <motion.h2
        initial={{ opacity: 0, y: 36 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.8, ease: EASE, delay: 1.4 }}
        className="mx-auto mt-24 max-w-[11.25ch] bg-gradient-to-b from-white via-white to-white/50 bg-clip-text text-center text-[clamp(4rem,10vw,10rem)] leading-[0.9] tracking-[-0.025em] text-transparent text-pretty"
        style={{ opacity: headlineOpacity, y: headlineY }}
      >
        <span className="block">Turning ideas</span>
        <span className="block">into reliable</span>
        <span className="block">software.</span>
      </motion.h2>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, delay: 2.6 }}
        className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2.5"
        aria-hidden="true"
      >
        <span className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground/70">
          Scroll
        </span>
        <span className="relative flex h-8 w-[1px] items-start overflow-hidden bg-white/12">
          <motion.span
            className="absolute inset-x-0 top-0 h-2 rounded-full bg-white/70"
            animate={{ y: [-6, 28] }}
            transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
