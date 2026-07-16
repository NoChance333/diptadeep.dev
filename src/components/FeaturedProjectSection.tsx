import { motion, useReducedMotion } from "framer-motion";
import { SectionReveal } from "@/components/SectionReveal";
import { GlassPanel } from "@/components/GlassPanel";

const EASE = [0.16, 1, 0.3, 1] as const;

const technologies = [
  "Python",
  "Solidity",
  "Flask",
  "MongoDB",
  "Ethereum",
  "IPFS",
  "OpenZeppelin",
  "Tailwind CSS",
];

const architecture = ["User", "Flask Backend", "Ethereum Smart Contract", "IPFS Storage", "NFT Ownership"];

export function FeaturedProjectSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <SectionReveal
      id="featured-project"
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
          FEATURED PROJECT
        </motion.p>

        <motion.h2
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1, ease: EASE, delay: 0.08 }}
          className="mt-6 max-w-3xl text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.05] tracking-[-0.025em] text-foreground"
        >
          Securing ownership,
          <br />
          through software.
        </motion.h2>

 <GlassPanel
  initial={
    shouldReduceMotion
      ? { opacity: 1, y: 0, scale: 1 }
      : { opacity: 0, y: 24, scale: 0.985 }
  }
  whileInView={{ opacity: 1, y: 0, scale: 1 }}
  viewport={{ once: true, margin: "-12%" }}
  transition={{ duration: 1.05, ease: EASE, delay: 0.12 }}
  className="mt-14 w-full overflow-hidden shadow-[0_22px_70px_-32px_rgba(0,0,0,0.84)]"
>
          <div className="flex min-h-[22rem] items-center justify-center border-b border-white/10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.035),transparent_70%)] p-8 sm:min-h-[26rem] sm:p-10 md:p-12">
            <motion.img
              src="/images/novis.png"
              alt="NOVIS Web Application"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{
                scale: 1.02,
                y: -4,
              }}
              className="w-full max-w-5xl rounded-[24px] border border-white/10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.75)]"
            />
          </div>
          <div className="px-6 py-8 text-left sm:px-8 sm:py-9">
            <p className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground/80">
              Blockchain-Based Tokenization and Management of Land Documents
            </p>
            <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground/90 sm:text-lg">
              A decentralized approach to secure ownership and transfer, designed to make land records more verifiable, trustworthy, and resilient.
            </p>
          </div>
        </GlassPanel>

        <div className="mt-14 grid w-full gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
          <div className="flex flex-col gap-6 text-left">
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.14 }}
              className="rounded-[1.4rem] border border-white/10 bg-white/[0.025] px-6 py-6 sm:px-7"
            >
              <p className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground/80">
                THE CHALLENGE
              </p>
              <p className="mt-4 text-base leading-8 text-muted-foreground/90 sm:text-lg">
                Land ownership records are often paper-based, difficult to verify, and vulnerable to tampering.
              </p>
            </motion.div>

            <motion.div
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
              className="rounded-[1.4rem] border border-white/10 bg-white/[0.025] px-6 py-6 sm:px-7"
            >
              <p className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground/80">
                THE SOLUTION
              </p>
              <div className="mt-6 flex flex-col items-start gap-3">
                {architecture.map((step, index) => (
                  <motion.div
                    key={step}
                    initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.75, ease: EASE, delay: 0.24 + index * 0.05 }}
                    className="flex items-center gap-3 text-sm text-muted-foreground/90"
                  >
                    <span className="h-px w-5 bg-white/15" />
                    <span>{step}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="flex flex-col gap-6">
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.16 }}
              className="text-left"
            >
              <p className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground/80">
                Technologies
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {technologies.map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.18 + index * 0.04 }}
                    whileHover={{ y: -2, scale: 1.01 }}
                    className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-sm text-muted-foreground/90"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <div className="flex flex-wrap gap-3">
              <motion.a
                href="https://github.com/NoChance333/final-year-project"
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.22 }}
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-4 py-2 text-sm text-foreground transition-colors hover:bg-white/5"
              >
                View GitHub →
              </motion.a>
              <motion.a
                href="https://ieeexplore.ieee.org/document/11413273"
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.26 }}
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-4 py-2 text-sm text-foreground transition-colors hover:bg-white/5"
              >
                Read IEEE Paper →
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}