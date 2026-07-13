export function Footer() {
  return (
    <footer className="relative z-10 mt-32 border-t border-border/60 bg-background/60 px-6 py-14 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <div>
          <div className="text-display text-2xl">Diptadeep Roy</div>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Software engineer
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm text-muted-foreground md:items-end">
          <span className="text-eyebrow">Elsewhere</span>
          <div className="flex gap-6">
            <a
              href="#"
              className="transition-colors duration-300 hover:text-foreground"
            >
              GitHub
            </a>
            <a
              href="#"
              className="transition-colors duration-300 hover:text-foreground"
            >
              LinkedIn
            </a>
            <a
              href="#contact"
              className="transition-colors duration-300 hover:text-foreground"
            >
              Email
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-6xl items-center justify-between border-t border-border/50 pt-6 text-xs text-muted-foreground/70">
        <span>© {new Date().getFullYear()} Diptadeep Roy</span>
        <span>Crafted with care.</span>
      </div>
    </footer>
  );
}
