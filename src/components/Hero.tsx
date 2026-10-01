"use client";

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
  const portraitScale = useTransform(progress, [0, 0.16, 0.45, 0.72], [1, 0.96, 0.84, 0.74]);
  const portraitOpacity = useTransform(progress, [0, 0.16, 0.45, 0.70], [1, 1, 0.45, 0]);
  const portraitY = useTransform(progress, [0, 0.3, 0.70], [0, -26, -54]);
  const introOpacity = useTransform(progress, [0, 0.15, 0.38, 0.60], [1, 1, 0.3, 0]);
  const introY = useTransform(progress, [0, 0.60], [0, -28]);

  const headlineOpacity = useTransform(progress, [0, 0.18, 0.45, 0.68], [1, 1, 0.4, 0]);
  const headlineY = useTransform(progress, [0, 0.24, 0.68], [0, -12, -36]);
  const glowOpacity = useTransform(progress, [0, 0.24, 0.62], [0.7, 0.35, 0]);
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
        animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
        transition={{
          opacity: { duration: 2.0, ease: EASE, delay: 2.4 },
          scale: { duration: 2.0, ease: EASE, delay: 2.4 },
          y: { duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 2.4 },
        }}
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

      {/* Intro details wrapper */}
      <motion.div
        style={{ opacity: introOpacity, y: introY }}
        className="flex flex-col items-center text-center transform-gpu"
      >
        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.35, ease: EASE, delay: 2.7 }}
          className="mt-16 text-center text-[clamp(2.4rem,5.8vw,4.8rem)] font-medium leading-[0.9] tracking-[-0.02em] text-foreground"
        >
          Diptadeep Roy
        </motion.h1>

        {/* Roles */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.25, ease: EASE, delay: 2.9 }}
          className="mt-6 text-center text-[12px] uppercase tracking-[0.34em] text-muted-foreground/90 sm:text-[13px]"
        >
          Software Developer
        </motion.p>

        {/* Live Availability Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 3.05 }}
          className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/[0.07] px-3.5 py-1 text-[11px] font-medium tracking-wider uppercase text-emerald-400/90 shadow-[0_0_24px_-4px_rgba(16,185,129,0.25)] backdrop-blur-md transform-gpu"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span>Open to Opportunities</span>
        </motion.div>
      </motion.div>

      {/* Massive statement */}
      <motion.div
        style={{ opacity: headlineOpacity, y: headlineY }}
        className="mx-auto mt-24 max-w-[11.25ch] transform-gpu"
      >
        <motion.h2
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, ease: EASE, delay: 3.25 }}
          className="bg-gradient-to-b from-white via-white to-white/50 bg-clip-text text-center text-[clamp(4rem,10vw,10rem)] leading-[0.9] tracking-[-0.025em] text-transparent text-pretty"
        >
          <span className="block">Turning ideas</span>
          <span className="block">into reliable</span>
          <span className="block">software.</span>
        </motion.h2>
      </motion.div>
    </section>
  );
}
