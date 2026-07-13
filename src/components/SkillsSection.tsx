import { motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

const skills = [
  { name: "Python", category: "Programming Language", className: "left-[7%] top-[16%] sm:left-[10%] sm:top-[18%]" },
  { name: "Java", category: "Programming Language", className: "left-[22%] top-[28%] sm:left-[26%] sm:top-[27%]" },
  { name: "C", category: "Programming Language", className: "left-[73%] top-[16%] sm:left-[71%] sm:top-[18%]" },
  { name: "C++", category: "Programming Language", className: "left-[64%] top-[32%] sm:left-[61%] sm:top-[30%]" },
  { name: "Flask", category: "Backend", className: "left-[14%] top-[46%] sm:left-[16%] sm:top-[48%]" },
  { name: "MongoDB", category: "Database", className: "left-[40%] top-[24%] sm:left-[43%] sm:top-[22%]" },
  { name: "MySQL", category: "Database", className: "left-[33%] top-[62%] sm:left-[35%] sm:top-[64%]" },
  { name: "Git", category: "Tooling", className: "left-[58%] top-[58%] sm:left-[58%] sm:top-[58%]" },
  { name: "GitHub", category: "Tooling", className: "left-[82%] top-[44%] sm:left-[81%] sm:top-[46%]" },
  { name: "Linux", category: "Environment", className: "left-[12%] top-[74%] sm:left-[14%] sm:top-[74%]" },
  { name: "Solidity", category: "Blockchain", className: "left-[46%] top-[74%] sm:left-[48%] sm:top-[74%]" },
  { name: "Ethereum", category: "Blockchain", className: "left-[76%] top-[72%] sm:left-[74%] sm:top-[74%]" },
  { name: "IPFS", category: "Storage", className: "left-[24%] top-[84%] sm:left-[24%] sm:top-[85%]" },
  { name: "OpenZeppelin", category: "Blockchain", className: "left-[68%] top-[86%] sm:left-[68%] sm:top-[87%]" },
  { name: "Tailwind CSS", category: "Frontend", className: "left-[52%] top-[90%] sm:left-[53%] sm:top-[90%]" },
  { name: "HTML", category: "Frontend", className: "left-[8%] top-[90%] sm:left-[8%] sm:top-[90%]" },
  { name: "CSS", category: "Frontend", className: "left-[38%] top-[92%] sm:left-[39%] sm:top-[92%]" },
  { name: "JavaScript", category: "Frontend", className: "left-[86%] top-[90%] sm:left-[86%] sm:top-[90%]" },
];

export function SkillsSection() {
  const shouldReduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState<string | null>(null);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const onMove = (event: MouseEvent) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      cursorX.set((event.clientX / width) * 2 - 1);
      cursorY.set((event.clientY / height) * 2 - 1);
    };

    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [cursorX, cursorY, shouldReduceMotion]);

  return (
    <section
      id="skills"
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden px-6 py-24 sm:py-28 md:py-32"
    >
      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        <motion.p
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="text-eyebrow"
        >
          SKILLS
        </motion.p>

        <motion.h2
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1, ease: EASE, delay: 0.08 }}
          className="mt-6 max-w-3xl text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.05] tracking-[-0.025em] text-foreground"
        >
          Always learning.
          <br />
          Always building.
        </motion.h2>

        <div className="relative mt-16 h-[70vh] min-h-[34rem] w-full overflow-hidden sm:h-[78vh] sm:min-h-[40rem]">
          {skills.map((skill, index) => {
            const shiftX = useTransform(cursorX, [-1, 1], [-2.5, 2.5]);
            const shiftY = useTransform(cursorY, [-1, 1], [-2.5, 2.5]);
            const isHovered = hovered === skill.name;

            return (
              <motion.div
                key={skill.name}
                initial={shouldReduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 16, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.05 * index }}
                onHoverStart={() => setHovered(skill.name)}
                onHoverEnd={() => setHovered(null)}
                className={`absolute ${skill.className}`}
                style={{ x: shiftX, y: shiftY }}
              >
                <motion.span
                  whileHover={{ scale: 1.06, color: "rgb(255 255 255 / 0.96)" }}
                  transition={{ duration: 0.2, ease: EASE }}
                  className="relative inline-flex items-center justify-center whitespace-nowrap text-[clamp(0.95rem,2.1vw,1.18rem)] leading-none tracking-[-0.02em] text-muted-foreground/85"
                >
                  {skill.name}
                  {isHovered && (
                    <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap text-[11px] uppercase tracking-[0.28em] text-muted-foreground/70">
                      {skill.category}
                    </span>
                  )}
                </motion.span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
