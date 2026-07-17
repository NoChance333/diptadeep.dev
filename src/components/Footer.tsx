export function Footer() {
  return (
    <footer className="relative z-50 block w-full border-t border-white/10 bg-black px-6 py-14">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <div>
          <div className="text-2xl font-semibold tracking-tight text-white">Diptadeep Roy</div>
          <p className="mt-3 max-w-sm text-sm text-white/50">
            Software engineer
          </p>
        </div>
      </div>
      
      <div className="mx-auto mt-10 flex max-w-6xl items-center justify-between border-t border-white/5 pt-6 text-xs text-white/40">
        <span>© {new Date().getFullYear()} Diptadeep Roy</span>
        <span>Crafted with care.</span>
      </div>
    </footer>
  );
}