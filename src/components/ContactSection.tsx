import { motion, useReducedMotion } from "framer-motion";
import { SectionReveal } from "@/components/SectionReveal";

const EASE = [0.16, 1, 0.3, 1] as const;

const links = [
  { label: "GitHub", href: "https://github.com/NoChance333" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/diptadeep-roy-7123171ba/" },
];

export function ContactSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <SectionReveal
      id="contact"
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
          CONTACT
        </motion.p>

        <motion.h2
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1, ease: EASE, delay: 0.08 }}
          className="mt-6 max-w-3xl text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.05] tracking-[-0.025em] text-foreground"
        >
          Let's build something together.
        </motion.h2>

        <motion.p
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.95, ease: EASE, delay: 0.14 }}
          className="mx-auto mt-8 max-w-2xl text-base leading-8 text-muted-foreground/90 sm:text-lg"
        >
          Whether it's software engineering, open-source collaboration, research, or simply discussing ideas, I'm always happy to connect.
        </motion.p>

        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0, scaleX: 1 } : { opacity: 0, y: 20, scaleX: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scaleX: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.18 }}
          className="mt-12 h-px w-24 bg-gradient-to-r from-transparent via-white/35 to-transparent"
        />

        <div className="mt-10 flex flex-wrap justify-center gap-3 sm:gap-4">
          {links.map((link, index) => (
            <motion.a
              key={link.label}
              href={link.href}
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.2 + index * 0.06 }}
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-4 py-2 text-sm text-foreground transition-colors hover:bg-white/5"
            >
              {link.label}
            </motion.a>
          ))}
        </div>
        <motion.a
          href="mailto:diptadeeproy5747@gmail.com"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.45 }}
          whileHover={{ y: -1 }}
          className="mt-8 inline-block text-base tracking-wide text-muted-foreground transition-colors duration-300 hover:text-white"
        >
          diptadeeproy5747@gmail.com
        </motion.a>
      </div>
    </SectionReveal>
  );
}
