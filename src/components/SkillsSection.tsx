"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const skills = ["Python", "Solidity", "Geth", "Clef", "MongoDB", "MySQL"];

// Explicit placement values to prevent items from collapsing into a clump in the center
const finalLayout = [
  { name: "Python", className: "-translate-x-[18vw] -translate-y-[16vh]" },
  { name: "Solidity", className: "translate-x-[0vw] -translate-y-[6vh]" },
  { name: "Geth", className: "translate-x-[18vw] -translate-y-[14vh]" },
  { name: "Clef", className: "-translate-x-[16vw] translate-y-[14vh]" },
  { name: "MongoDB", className: "translate-x-[2vw] translate-y-[16vh]" },
  { name: "MySQL", className: "translate-x-[18vw] translate-y-[12vh]" },
];

interface SkillItemProps {
  skill: string;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}

function SkillItem({ skill, index, total, scrollYProgress }: SkillItemProps) {
  // Give each word a much larger, dedicated window inside the scroll timeline so it feels slower
  const segmentLength = 0.6 / total;
  const start = index * segmentLength;
  const end = start + segmentLength * 1.5; // Staggers and extends overlaps smoothly

  const midFadeIn = start + (end - start) * 0.2;
  const midFadeOut = end - (end - start) * 0.2;

  // Smoother translation ranges
  const opacity = useTransform(scrollYProgress, [start, midFadeIn, midFadeOut, end], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [start, midFadeIn, end], [0.85, 1, 1.05]);
  const y = useTransform(scrollYProgress, [start, end], [40, -40]);

  return (
    <motion.div
      style={{ opacity, scale, y }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none transform-gpu"
    >
      <div className="absolute h-[250px] w-[250px] sm:h-[350px] sm:w-[350px] rounded-full bg-blue-500/[0.04] blur-[100px]" />
      <h1 className="relative text-[clamp(2.2rem,6vw,4.5rem)] font-bold tracking-tight text-white px-4 text-center">
        {skill}
      </h1>
    </motion.div>
  );
}

export function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Using window scroll context targeting rather than container targeting slows the delta tracking speed down significantly
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Stretched tracking zones give you breathing room to scroll before the final screen pops up
  const sequenceOpacity = useTransform(scrollYProgress, [0.6, 0.72], [1, 0]);
  const finalOpacity = useTransform(scrollYProgress, [0.68, 0.78], [0, 1]);

  return (
    <div ref={containerRef} id="skills" className="relative h-[600vh] w-full bg-black isolate z-10">
      <div className="sticky top-0 h-screen w-full overflow-hidden transform-gpu flex items-center justify-center">
        {isMounted && (
          <>
            {/* Phase 1: Sequential Word Rolling Animations */}
            <motion.div
              style={{ opacity: sequenceOpacity }}
              className="absolute inset-0 z-20 pointer-events-none"
            >
              <p className="absolute top-12 sm:top-16 left-1/2 -translate-x-1/2 text-xs tracking-[0.45em] uppercase text-white/40 font-medium">
                SKILLS
              </p>
              {skills.map((skill, index) => (
                <SkillItem
                  key={skill}
                  skill={skill}
                  index={index}
                  total={skills.length}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </motion.div>

            {/* Phase 2: Final Multi-Node Constellation Arrangement */}
            <motion.div
              style={{ opacity: finalOpacity }}
              className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
            >
              <p className="absolute top-12 sm:top-16 left-1/2 -translate-x-1/2 text-xs tracking-[0.45em] uppercase text-white/40 font-medium">
                SKILLS
              </p>

              {/* Layout Map Wrapper */}
              <div className="relative w-full h-full flex items-center justify-center max-w-5xl px-4 scale-[0.8] md:scale-100">
                {finalLayout.map((skill) => (
                  <div
                    key={skill.name}
                    className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${skill.className} bg-white/[0.02] border border-white/10 backdrop-blur-md px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl transition-all duration-300`}
                  >
                    <span className="text-xs sm:text-base font-medium tracking-tight text-white/90 whitespace-nowrap">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
