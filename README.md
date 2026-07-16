# Diptadeep Roy — Software Engineering Portfolio

A high-fidelity, production-grade personal portfolio built to showcase modern web engineering practices, full-stack React architectures, and academic research publications. The entire experience features fluid, scroll-interpolated cinematic timelines inspired by premium product showcase engineering.

## 🚀 Architectural Pillars

This portfolio was hand-crafted locally inside VS Code utilizing an optimized, modern frontend framework designed for visual performance, strict type-safe integrity, and zero layout shifting.

* **Framework Architecture:** Built on top of **TanStack Start** and **TanStack Router**, leveraging file-based routing pipelines alongside highly optimized server/client hydration boundaries.
* **Build Engine:** Powered by **Vite** and **Nitro** to compile high-performance production bundles with incredibly lightweight client footings.
* **Cinematic Choreography:** Driven by continuous interpolation logic using `framer-motion`. Instead of simple viewport entry triggers, layout components link directly into dynamic scrollbar vectors (`useScroll`, `useTransform`) for granular scrubbing performance.
* **Design Language:** Engineered using a glassmorphic micro-interaction layer with Tailwind CSS, utilizing custom viewport clamping (`clamp()`) to ensure absolute layout structural integrity across both mobile and desktop screens.

---

## 📂 Project Structure Overview

The project follows standard monolithic full-stack React directory conventions:

```text
├── app/                  # Core App Router routes, global layout wrappers, and pages
│   ├── routes/           # File-based routing sheets (__root.tsx, index.tsx)
│   ├── components/       # Atomic UI design system components
│   │   ├── SectionReveal.tsx # Framer Motion scroll mechanics
│   │   ├── GlassPanel.tsx    # Reusable glassmorphic UI shells
│   │   └── ...           # Custom visual sub-modules
│   └── icon.tsx          # Dynamic SVG browser favicon generator ("DR")
├── public/               # Asset management layer
│   ├── documents/        # PDF distributions (Research Paper, Resume)
│   └── images/           # High-resolution media resources (novis.png, graduation.jpeg)
├── tailwind.config.ts    # Extended typographic scale and design system rules
├── vite.config.ts        # Vite configuration registering TanStack and Nitro plugins
└── tsconfig.json         # Strict TypeScript compiler definitions