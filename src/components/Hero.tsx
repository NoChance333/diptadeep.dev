import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import heroAsset from "@/assets/hero.png.asset.json";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 20, mass: 0.6 });
  const rotY = useTransform(sx, [-1, 1], [4, -4]);
  const rotX = useTransform(sy, [-1, 1], [-3, 3]);
  const tx = useTransform(sx, [-1, 1], [-8, 8]);
  const ty = useTransform(sy, [-1, 1], [-6, 6]);

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
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.2, ease: EASE, delay: 0.2 }}
        className="relative"
        style={{ perspective: 1200 }}
      >
        <motion.div
          style={{ rotateX: rotX, rotateY: rotY, x: tx, y: ty }}
          className="relative h-40 w-40 sm:h-48 sm:w-48"
        >
          {/* Ambient glow */}
          <div
            className="absolute -inset-10 rounded-full opacity-60 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, oklch(0.72 0.11 240 / 0.35) 0%, transparent 65%)",
            }}
          />
          <div className="relative h-full w-full overflow-hidden rounded-full ring-1 ring-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]">
            <img
              src={heroAsset.url}
              alt="Diptadeep Roy"
              className="h-full w-full object-cover"
              draggable={false}
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 50% 30%, transparent 40%, rgba(0,0,0,0.35) 100%)",
              }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Name */}
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: EASE, delay: 1.0 }}
        className="text-display mt-10 text-center text-[clamp(2.25rem,5.5vw,4.5rem)] text-foreground"
      >
        Diptadeep Roy
      </motion.h1>

      {/* Roles */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: EASE, delay: 1.35 }}
        className="mt-5 text-center text-[13px] tracking-[0.28em] text-muted-foreground uppercase"
      >
        Software Engineer
        <span className="mx-3 text-muted-foreground/40">·</span>
        Blockchain Researcher
        <span className="mx-3 text-muted-foreground/40">·</span>
        MCA Candidate
      </motion.p>

      {/* Massive statement */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.6, ease: EASE, delay: 1.7 }}
        className="text-display mx-auto mt-20 max-w-[18ch] bg-gradient-to-b from-white via-white to-white/50 bg-clip-text text-center text-[clamp(3rem,10vw,9rem)] text-transparent"
      >
        Building secure digital systems.
      </motion.h2>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.6 }}
        className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
        aria-hidden="true"
      >
        <span className="text-[10px] tracking-[0.3em] text-muted-foreground/70 uppercase">
          Scroll
        </span>
        <span className="relative block h-8 w-[1px] overflow-hidden bg-white/10">
          <motion.span
            className="absolute inset-x-0 top-0 h-3 bg-white/70"
            animate={{ y: [-12, 32] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
