import { motion } from "framer-motion";

interface Props {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
}

export function PlaceholderSection({ id, eyebrow, title, description }: Props) {
  return (
    <section
      id={id}
      className="relative flex min-h-[70vh] w-full items-center justify-center px-6 py-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-3xl text-center"
      >
        <p className="text-eyebrow">{eyebrow}</p>
        <h2 className="text-display mt-6 text-[clamp(2rem,5vw,4rem)]">
          {title}
        </h2>
        {description && (
          <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground">
            {description}
          </p>
        )}
        <div className="mx-auto mt-10 h-px w-24 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      </motion.div>
    </section>
  );
}
