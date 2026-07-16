import { motion } from "framer-motion";
import { SectionReveal } from "@/components/SectionReveal";

const EASE = [0.16, 1, 0.3, 1] as const;

interface Props {
  id: string;
  eyebrow: string;
  title: string;
  description?: string | string[];
}

export function PlaceholderSection({ id, eyebrow, title, description }: Props) {
  const paragraphs = Array.isArray(description)
    ? description
    : description
      ? [description]
      : [];

  return (
    <SectionReveal
      id={id}
      className="relative flex min-h-[100svh] w-full items-center justify-center px-6 py-24 sm:py-28 md:py-32"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="text-eyebrow"
        >
          {eyebrow}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.05, ease: EASE, delay: 0.1 }}
          className="mt-6 max-w-3xl text-[clamp(2.1rem,4.6vw,3.8rem)] leading-[1.05] tracking-[-0.025em] text-foreground"
        >
          {title}
        </motion.h2>

        {paragraphs.length > 0 && (
          <div className="mt-10 flex w-full flex-col items-center gap-6 sm:gap-7">
            {paragraphs.map((paragraph, index) => (
              <motion.p
                key={`${id}-${index}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.95, ease: EASE, delay: 0.14 + index * 0.08 }}
                className="max-w-2xl text-base leading-8 text-muted-foreground/90 sm:text-lg sm:leading-9"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, scaleX: 0.8 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
          className="mx-auto mt-14 h-px w-24 origin-center bg-gradient-to-r from-transparent via-white/40 to-transparent"
        />
      </div>
    </SectionReveal>
  );
}
