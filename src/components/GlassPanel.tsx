import { motion, MotionProps } from "framer-motion";
import { ReactNode, useState } from "react";

interface Props extends MotionProps {
  children: ReactNode;
  className?: string;
}

export function GlassPanel({
  children,
  className = "",
  whileHover,
  whileTap,
  initial,
  animate,
  transition,
  viewport,
  onHoverStart,
  onHoverEnd,
  ...motionProps
}: Props) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      {...motionProps}
      whileHover={whileHover}
      whileTap={whileTap}
      initial={initial}
      animate={animate}
      transition={transition}
      viewport={viewport}
      onHoverStart={(event) => {
        setIsHovered(true);
        onHoverStart?.(event);
      }}
      onHoverEnd={(event) => {
        setIsHovered(false);
        onHoverEnd?.(event);
      }}
      className={`relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.035] backdrop-blur-xl ${className}`}
    >
      <motion.div
        animate={isHovered ? "hover" : "rest"}
        variants={{
          rest: { x: "-130%" },
          hover: { x: "130%" },
        }}
        transition={{
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="pointer-events-none absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-white/15 to-transparent blur-xl"
      />

      {children}
    </motion.div>
  );
}