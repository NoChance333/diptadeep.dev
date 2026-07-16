import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const sections = [
  "home",
  "about",
  "education",
  "experience",
  "research",
  "featured-project",
  "skills",
  "contact",
];

function formatTitle(id: string) {
  return id.replace(/-/g, " ").toUpperCase();
}

export function FloatingSectionIndicator() {
  const [active, setActive] = useState("home");

  useEffect(() => {
  const updateActiveSection = () => {
    const center = window.scrollY + window.innerHeight / 2;

    for (const id of sections) {
      const el = document.getElementById(id);
      if (!el) continue;

      const top = el.offsetTop;
      const bottom = top + el.offsetHeight;

      if (center >= top && center < bottom) {
        setActive(id);
        break;
      }
    }
  };

  updateActiveSection();

  window.addEventListener("scroll", updateActiveSection, {
    passive: true,
  });

  window.addEventListener("resize", updateActiveSection);

  return () => {
    window.removeEventListener("scroll", updateActiveSection);
    window.removeEventListener("resize", updateActiveSection);
  };
}, []);

  const hidden = active === "home";

  return (
    <AnimatePresence mode="wait">
      {!hidden && (
        <motion.div
          key={active}
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -18 }}
          transition={{
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="fixed left-1/2 top-7 z-[60] -translate-x-1/2"
        >
          <div className="rounded-full border border-white/15 bg-black/45 px-10 py-4 backdrop-blur-3xl shadow-[0_25px_80px_rgba(0,0,0,0.45)]">
            <AnimatePresence mode="wait">
              <motion.span
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="block text-[14px] font-semibold uppercase tracking-[0.42em] text-white"
              >
                {formatTitle(active)}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}