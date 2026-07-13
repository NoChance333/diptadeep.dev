import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

const milestones = [
  {
    year: "2020",
    title: "Adamas World School",
    subtitle: "Secondary Education",
  },
  {
    year: "2022",
    title: "Central Model School",
    subtitle: "Higher Secondary",
  },
  {
    year: "2025",
    title: "Bachelor of Computer Applications",
    subtitle: "Adamas University",
    detail: "CGPA: 6.65",
  },
  {
    year: "2025 – Present",
    title: "Master of Computer Applications",
    subtitle: "Adamas University",
    detail: "Currently Pursuing",
  },
] as const;

export function EducationTimeline() {
  const ref = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const progress = shouldReduceMotion ? 1 : scrollYProgress;
  const lineOpacity = useTransform(progress, [0, 0.2, 0.7], [0, 0.25, 1]);
  const lineScaleY = useTransform(progress, [0, 0.2, 0.7], [0, 0.2, 1]);

  return (
    <section
      ref={ref}
      id="education"
      className="relative flex min-h-[100svh] w-full items-center justify-center px-6 py-24 sm:py-28 md:py-32"
    >
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        <motion.p
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="text-eyebrow"
        >
          EDUCATION
        </motion.p>

        <motion.h2
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1, ease: EASE, delay: 0.08 }}
          className="mt-6 max-w-2xl text-[clamp(1.9rem,4vw,3rem)] leading-[1.05] tracking-[-0.02em] text-foreground"
        >
          A calm path through study, craft, and growth.
        </motion.h2>

        <div className="relative mt-16 w-full max-w-3xl">
          <motion.div
            style={{ opacity: lineOpacity, scaleY: lineScaleY }}
            className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/35 to-transparent sm:block"
            aria-hidden="true"
          />

          <div className="flex flex-col gap-14 sm:gap-16">
            {milestones.map((milestone, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={milestone.year}
                  initial={shouldReduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 24, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.08 * index }}
                  className="relative flex justify-center sm:justify-start"
                >
                  <div
                    className={`w-full max-w-[22rem] ${
                      isEven
                        ? "sm:pr-10 sm:text-right"
                        : "sm:pl-10 sm:text-left"
                    }`}
                  >
                    <p className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground/80">
                      {milestone.year}
                    </p>
                    <p className="mt-3 text-lg leading-none text-foreground sm:text-xl">
                      {milestone.title}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground/90">
                      {milestone.subtitle}
                    </p>
                    {milestone.detail && (
                      <p className="mt-2 text-sm leading-7 text-muted-foreground/80">
                        {milestone.detail}
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
