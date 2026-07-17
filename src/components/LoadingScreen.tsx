"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setVisible(false);
    }, 2800);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black transform-gpu"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: EASE }}
        >
          {/* Ambient Glow - RULE 2: Hidden on mobile, activated exclusively on desktop targets via md:block */}
          <div
            className="absolute hidden h-[450px] w-[450px] rounded-full blur-3xl opacity-25 md:block transform-gpu"
            style={{
              background:
                "radial-gradient(circle, rgba(59,130,246,0.22), transparent 70%)",
            }}
          />

          <div className="relative flex flex-col items-center transform-gpu">

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE }}
              className="text-4xl md:text-6xl font-semibold tracking-tight text-white transform-gpu"
            >
              Diptadeep Roy
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.75 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-5 text-xs uppercase tracking-[0.35em] text-zinc-400 text-center transform-gpu"
            >
              Software Developer
            </motion.p>

            {/* Progress Line */}
            <div className="mt-12 h-px w-64 overflow-hidden bg-white/10 transform-gpu">
              <motion.div
                className="h-full bg-white transform-gpu"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{
                  delay: 1,
                  duration: 1.4,
                  ease: EASE,
                }}
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 1.6 }}
              className="mt-6 text-xs uppercase tracking-[0.3em] text-zinc-500 transform-gpu"
            >
              Entering Portfolio
            </motion.p>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}