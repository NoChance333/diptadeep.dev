import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Research", href: "#research" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 24);
    if (latest > previous && latest > 160) setHidden(true);
    else setHidden(false);
  });

  useEffect(() => {
    // ensure page starts unhidden
    setHidden(false);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
          className="ml-2 mr-3 text-sm font-medium tracking-tight text-foreground/90"
        >
          <span className="inline-block h-1.5 w-1.5 translate-y-[-1px] rounded-full bg-accent-glow animate-pulse-soft" />
          <span className="ml-2">DR</span>
        </a>
        <ul className="hidden items-center gap-0.5 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-3 py-1.5 text-[13px] font-medium text-muted-foreground transition-colors duration-300 hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#resume"
          className="ml-2 rounded-full bg-foreground px-4 py-1.5 text-[13px] font-medium text-background transition-transform duration-300 hover:scale-[1.03]"
        >
          Résumé
        </a>
      </nav>
    </motion.header>
  );
}
