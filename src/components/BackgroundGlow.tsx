import { motion } from "framer-motion";

export function BackgroundGlow() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      {/* Blue glow */}
      <motion.div
        animate={{
          x: [0, 120, -80, 0],
          y: [0, -60, 80, 0],
        }}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-[10%]
          top-[10%]
          h-[650px]
          w-[650px]
          rounded-full
          bg-blue-500/10
          blur-[170px]
        "
      />

      {/* White glow */}
      <motion.div
        animate={{
          x: [0, -100, 60, 0],
          y: [0, 90, -70, 0],
        }}
        transition={{
          duration: 55,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          right-[8%]
          top-[30%]
          h-[600px]
          w-[600px]
          rounded-full
          bg-white/5
          blur-[190px]
        "
      />

      {/* Indigo glow */}
      <motion.div
        animate={{
          x: [0, 60, -120, 0],
          y: [0, 120, -40, 0],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          bottom-[5%]
          left-[35%]
          h-[700px]
          w-[700px]
          rounded-full
          bg-indigo-500/6
          blur-[220px]
        "
      />
    </div>
  );
}