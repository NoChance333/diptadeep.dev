"use client";

import { motion, MotionProps, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ReactNode, useCallback, useState, useEffect } from "react";

type MagneticButtonProps = Omit<
  MotionProps,
  "children" | "className" | "onMouseMove" | "onMouseLeave" | "style"
> & {
  children: ReactNode;
  className?: string;
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  style?: React.CSSProperties;
  onMouseMove?: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLElement>) => void;
} & Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "children" | "className" | "type" | "style" | "onMouseMove" | "onMouseLeave"
  > &
  Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    "children" | "className" | "style" | "onMouseMove" | "onMouseLeave"
  >;

export function MagneticButton({
  children,
  className = "",
  href,
  type = "button",
  disabled = false,
  style,
  onMouseMove,
  onMouseLeave,
  whileHover,
  whileTap,
  initial,
  animate,
  transition,
  ...rest
}: MagneticButtonProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 220, damping: 20, mass: 0.5 });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      // RULE 1 & 2: Short-circuit tracking on mobile to eliminate layout thrashing and stuck coordinates
      if (shouldReduceMotion || disabled || isMobile) return;

      const rect = event.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const offsetX = Math.max(-6, Math.min(6, event.clientX - centerX));
      const offsetY = Math.max(-6, Math.min(6, event.clientY - centerY));

      x.set(offsetX);
      y.set(offsetY);
      onMouseMove?.(event);
    },
    [disabled, onMouseMove, shouldReduceMotion, isMobile, x, y],
  );

  const handleMouseLeave = useCallback(
    (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      if (!shouldReduceMotion && !disabled && !isMobile) {
        x.set(0);
        y.set(0);
      }
      onMouseLeave?.(event);
    },
    [disabled, onMouseLeave, shouldReduceMotion, isMobile, x, y],
  );

  const useCinematic = !shouldReduceMotion && !isMobile;

  const sharedProps = {
    ...rest,
    className,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    style: {
      ...(style ?? {}),
      // RULE 4: Ship spring translations inside transform-gpu optimized layers
      x: useCinematic ? springX : 0,
      y: useCinematic ? springY : 0,
    },
    whileHover: useCinematic ? whileHover : undefined,
    whileTap, // Keep tap interactions active for native feeling press down responses
    initial,
    animate,
    transition,
  };

  if (href) {
    return (
      <motion.a href={href} {...sharedProps} className={`${className} transform-gpu`}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      disabled={disabled}
      {...sharedProps}
      className={`${className} transform-gpu`}
    >
      {children}
    </motion.button>
  );
}
