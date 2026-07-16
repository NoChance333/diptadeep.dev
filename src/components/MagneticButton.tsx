import { motion, MotionProps, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ReactNode, useCallback } from "react";

type MagneticButtonProps = Omit<MotionProps, "children" | "className" | "onMouseMove" | "onMouseLeave" | "style"> & {
  children: ReactNode;
  className?: string;
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  style?: React.CSSProperties;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className" | "type" | "style"> &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className" | "style">;

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
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 220, damping: 20, mass: 0.5 });

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      if (shouldReduceMotion || disabled) return;

      const rect = event.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const offsetX = Math.max(-6, Math.min(6, event.clientX - centerX));
      const offsetY = Math.max(-6, Math.min(6, event.clientY - centerY));

      x.set(offsetX);
      y.set(offsetY);
      onMouseMove?.(event);
    },
    [disabled, onMouseMove, shouldReduceMotion, x, y],
  );

  const handleMouseLeave = useCallback(
    (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      if (!shouldReduceMotion && !disabled) {
        x.set(0);
        y.set(0);
      }
      onMouseLeave?.(event);
    },
    [disabled, onMouseLeave, shouldReduceMotion, x, y],
  );

  const sharedProps = {
    ...rest,
    className,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    style: {
      ...(style ?? {}),
      x: shouldReduceMotion ? 0 : springX,
      y: shouldReduceMotion ? 0 : springY,
    },
    whileHover: shouldReduceMotion ? undefined : whileHover,
    whileTap: shouldReduceMotion ? undefined : whileTap,
    initial,
    animate,
    transition,
  };

  if (href) {
    return (
      <motion.a href={href} {...sharedProps}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button type={type} disabled={disabled} {...sharedProps}>
      {children}
    </motion.button>
  );
}
