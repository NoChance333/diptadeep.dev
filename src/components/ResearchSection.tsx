import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const technologies = ["Solidity", "Flask", "MongoDB", "IPFS", "Ethereum", "OpenZeppelin", "Python"];

const stats = [
  { value: "IEEE Published", label: "Published" },
  { value: "2025 Conference", label: "Venue" },
  { value: "7+ Technologies", label: "Stack" },
];

export function ResearchSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="research"
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden px-6 py-24 sm:py-28 md:py-32"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.035),transparent_60%)]" />
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.16]"
          viewBox="0 0 1200 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M120 180C260 240 320 260 420 280" stroke="currentColor" strokeWidth="0.7" />
          <path d="M420 280C560 320 620 360 760 340" stroke="currentColor" strokeWidth="0.7" />
          <path d="M760 340C860 320 920 260 1080 220" stroke="currentColor" strokeWidth="0.7" />
          <path d="M220 540C330 500 390 470 520 490" stroke="currentColor" strokeWidth="0.7" />
          <path d="M520 490C700 520 760 560 980 540" stroke="currentColor" strokeWidth="0.7" />
          <circle cx="120" cy="180" r="2.2" fill="currentColor" />
          <circle cx="420" cy="280" r="2.2" fill="currentColor" />
          <circle cx="760" cy="340" r="2.2" fill="currentColor" />
          <circle cx="1080" cy="220" r="2.2" fill="currentColor" />
          <circle cx="220" cy="540" r="2.2" fill="currentColor" />
          <circle cx="520" cy="490" r="2.2" fill="currentColor" />
          <circle cx="980" cy="540" r="2.2" fill="currentColor" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        <motion.p
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="text-eyebrow"
        >
          RESEARCH
        </motion.p>

        <motion.h2
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1, ease: EASE, delay: 0.08 }}
          className="mt-6 max-w-3xl text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.05] tracking-[-0.025em] text-foreground"
        >
          One idea. Months of work. Published.
        </motion.h2>

        <div className="mt-14 grid w-full gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 24, scale: 0.985 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, ease: EASE, delay: 0.12 }}
            className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] px-7 py-8 text-left shadow-[0_20px_60px_-30px_rgba(0,0,0,0.75)] backdrop-blur-sm sm:px-8 sm:py-9"
          >
            <p className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground/80">
              IEEE RACS 2025
            </p>
            <h3 className="mt-4 text-[clamp(1.05rem,2.2vw,1.35rem)] leading-[1.35] tracking-[-0.015em] text-foreground">
              Blockchain-Based Tokenization and Management of Land Documents: A Decentralized Approach for Secure Ownership and Transfer
            </h3>
            <div className="mt-8 flex flex-wrap gap-3">
              <motion.a
    href="/documents/ResearchPaper.pdf"
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ y: -2, scale: 1.01 }}
    whileTap={{ scale: 0.99 }}
    transition={{ duration: 0.2, ease: EASE }}
    className="inline-flex items-center justify-center rounded-full border border-white/10 px-4 py-2 text-sm transition-colors hover:bg-white/5"
  >
    Read Paper
  </motion.a>

  <motion.a
    href="https://ieeexplore.ieee.org/document/11413273"
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ y: -2, scale: 1.01 }}
    whileTap={{ scale: 0.99 }}
    transition={{ duration: 0.2, ease: EASE }}
    className="inline-flex items-center justify-center rounded-full border border-white/10 px-4 py-2 text-sm transition-colors hover:bg-white/5"
  >
    IEEE Xplore ↗
  </motion.a>

  <motion.a
    href="https://github.com/NoChance333/final-year-project"
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ y: -2, scale: 1.01 }}
    whileTap={{ scale: 0.99 }}
    transition={{ duration: 0.2, ease: EASE }}
    className="inline-flex items-center justify-center rounded-full border border-white/10 px-4 py-2 text-sm transition-colors hover:bg-white/5"
  >
    Source Code ↗
  </motion.a>
              <div className="mt-8 flex flex-wrap gap-3">

  

</div>
            </div>
          </motion.div>

          <div className="flex flex-col gap-8">
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.95, ease: EASE, delay: 0.16 }}
              className="text-left"
            >
              <p className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground/80">
                Stack
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {technologies.map((technology, index) => (
                  <motion.span
                    key={technology}
                    initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.18 + index * 0.04 }}
                    className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-muted-foreground/90"
                  >
                    {technology}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.95, ease: EASE, delay: 0.2 + index * 0.06 }}
                  className="rounded-[1.25rem] border border-white/10 bg-white/[0.025] px-5 py-5 text-left"
                >
                  <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground/70">
                    {stat.label}
                  </p>
                  <p className="mt-3 text-[clamp(1rem,2vw,1.2rem)] leading-none tracking-[-0.02em] text-foreground">
                    {stat.value}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
