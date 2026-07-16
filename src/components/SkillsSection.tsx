"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { SectionReveal } from "@/components/SectionReveal";

const skills = [
  "Python",
  "Solidity",
  "Geth",
  "Clef",
  "MongoDB",
  "MySQL",
];

const finalLayout = [
  { name: "Python", left: "20%", top: "28%" },
  { name: "Solidity", left: "50%", top: "38%" },
  { name: "Geth", left: "74%", top: "30%" },
  { name: "Clef", left: "26%", top: "66%" },
  { name: "MongoDB", left: "55%", top: "60%" },
  { name: "MySQL", left: "80%", top: "70%" },
];

interface SkillItemProps {
  skill: string;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}

function SkillItem({ skill, index, total, scrollYProgress }: SkillItemProps) {
  // Compress the entire sequential scrolling down to finish by 75% scroll depth
  const timelineEnd = 0.75; 
  const segmentLength = timelineEnd / total;
  
  const start = index * segmentLength;
  const end = (index + 1) * segmentLength;

  // We explicitly write strictly ascending fractions within our range bounds to satisfy the browser's WAAPI requirements
  const midFadeIn = start + segmentLength * 0.15;
  const midFadeOut = end - segmentLength * 0.15;

  const opacity = useTransform(
    scrollYProgress,
    [start, midFadeIn, midFadeOut, end],
    [0, 1, 1, 0]
  );

  const scale = useTransform(
    scrollYProgress,
    [start, midFadeIn, end],
    [0.65, 1, 1.15]
  );

  const y = useTransform(
    scrollYProgress,
    [start, end],
    [80, -70]
  );

  const filter = useTransform(
    scrollYProgress,
    [start, midFadeIn, end],
    ["blur(4px)", "blur(0px)", "blur(4px)"]
  );

  return (
    <motion.div
      style={{
        opacity,
        scale,
        y,
        filter,
      }}
      className="absolute inset-0 flex items-center justify-center"
    >
      {/* Glow */}
      <motion.div
        style={{ opacity }}
        className="
          absolute
          h-[360px]
          w-[360px]
          rounded-full
          bg-blue-500/20
          blur-[120px]
        "
      />

      <h1
        className="
          relative
          text-[clamp(3rem,8vw,6rem)]
          font-semibold
          tracking-tight
          text-white
        "
      >
        {skill}
      </h1>
    </motion.div>
  );
}

export function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Safely trigger mounts to avoid layout mismatches
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Pass ref target safely. Framer Motion will hook cleanly since markup is identical
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const finalOpacity = useTransform(
    scrollYProgress,
    [0.80, 0.92],
    [0, 1]
  );

  const sequenceOpacity = useTransform(
    scrollYProgress,
    [0.72, 0.77],
    [1, 0]
  );

  return (
    <SectionReveal
      id="skills"
      className="relative h-[650vh]"
    >
      <div
        ref={ref}
        className="sticky top-0 h-screen overflow-hidden"
      >
        {/* Render content explicitly on frontend mount to safely wire up hooks */}
        {isMounted && (
          <>
            {/* Heading */}
            <motion.p
              style={{ opacity: sequenceOpacity }}
              className="absolute top-16 left-1/2 -translate-x-1/2 text-sm tracking-[0.45em] uppercase text-white/45"
            >
              SKILLS
            </motion.p>

            {/* Animated Skills */}
            <motion.div
              style={{ opacity: sequenceOpacity }}
              className="absolute inset-0"
            >
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

            {/* Final Reveal */}
            <motion.div
              style={{ opacity: finalOpacity }}
              className="absolute inset-0"
            >
              <p className="absolute top-16 left-1/2 -translate-x-1/2 text-sm tracking-[0.45em] uppercase text-white/45">
                SKILLS
              </p>

              <motion.div
                className="
                  absolute
                  left-1/2
                  top-1/2
                  h-[70vh]
                  w-[80vw]
                  -translate-x-1/2
                  -translate-y-1/2
                "
              >
                {finalLayout.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={false}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    transition={{
                      delay: index * 0.05,
                      duration: 0.5,
                    }}
                    style={{
                      left: skill.left,
                      top: skill.top,
                    }}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                  >
                    <span
                      className="
                        text-2xl
                        font-medium
                        tracking-tight
                        text-white/90
                      "
                    >
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </>
        )}
      </div>
    </SectionReveal>
  );
}