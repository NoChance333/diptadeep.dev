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
├── src/                  # Main source application layer
│   ├── routes/           # TanStack file-based routing directory
│   ├── components/       # Atomic UI layout architecture
│   │   ├── ui/           # Global baseline interface primitives
│   │   ├── Hero.tsx      # Main cinematic entrance wrapper
│   │   ├── ResearchSection.tsx # IEEE publication showcase module
│   │   ├── FeaturedProjectSection.tsx # NOVIS project container
│   │   ├── EducationTimeline.tsx # Asymmetric MCA tracking timeline
│   │   ├── ContactSection.tsx # Cryptographic messaging gateway
│   │   └── ...           # Additional micro-interaction components
│   ├── hooks/            # Dynamic state and performance optimization hooks
│   ├── lib/              # Structural utility configurations
│   ├── router.tsx        # Master TanStack Router entry boundary
│   └── styles.css        # Core global styles and Tailwind imports
├── public/               # Static production assets
│   ├── documents/        # Downloadable PDF configurations (Research, Resume)
│   └── images/           # High-resolution portfolio media elements
├── vite.config.ts        # Fast Vite bundler compilation configuration
└── tsconfig.json         # Strict TypeScript compilation rules