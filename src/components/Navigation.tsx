import { useEffect, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Research", href: "#research" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const { scrollY } = useScroll();
  const navOpacity = useTransform(scrollY, [0, 700], [1, 0]);
  const navY = useTransform(scrollY, [0, 700], [0, -25]);
  const [scrolled, setScrolled] = useState(false);
  const pointerEvents = useTransform(
  navOpacity,
  (value) => (value < 0.05 ? "none" : "auto")
);

  useMotionValueEvent(scrollY, "change", (latest) => {
  setScrolled(latest > 24);
});


  return (
    <motion.header
  initial={{ y: -60, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  style={{
  opacity: navOpacity,
  y: navY,
  pointerEvents,
}}
transition={{
  delay: 2.6,
  duration: 1.2,
  ease: [0.22, 1, 0.36, 1],
}}
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
    >
      <nav
        className={`glass-panel flex items-center gap-1 rounded-full px-2 py-2 transition-all duration-500 ${
          scrolled ? "shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]" : ""
        }`}
        aria-label="Primary"
      >
       <a
  href="#home"
  className="ml-2 mr-4 text-sm font-medium tracking-tight text-foreground/90"
>
  Diptadeep Roy
</a>
        <ul className="hidden items-center gap-0.5 md:flex">
  {links.map((l) => (
    <li key={l.href}>
      <motion.a
        href={l.href}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        className="rounded-full px-3 py-1.5 tracking-wide font-medium text-muted-foreground transition-colors duration-300 hover:text-foreground"
      >
        {l.label}
      </motion.a>
    </li>
  ))}
</ul>
       <motion.a
  href="/documents/resume.pdf"
target="_blank"
rel="noopener noreferrer"
  whileHover={{ y: -1 }}
  whileTap={{ scale: 0.98 }}
  className="ml-2 rounded-full border border-white/15 px-4 py-1.5 text-[13px] font-medium text-white transition-all duration-300 hover:bg-white hover:text-black"
>
  Resume ↗
</motion.a>
      </nav>
    </motion.header>
  );
}
