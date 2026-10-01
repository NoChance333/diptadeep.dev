"use client";

import { ReactLenis } from "lenis/react";
import { type ReactNode, useEffect, useState } from "react";

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [shouldBypass, setShouldBypass] = useState(true); // Default to true to prevent server-side mismatches

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobileViewport = window.matchMedia("(max-width: 768px)").matches;

    // RULE 3: Cull smooth scrolling if reduced motion is requested OR if the user is on a mobile device
    if (reducedMotion || isMobileViewport) {
      setShouldBypass(true);
    } else {
      setShouldBypass(false);
    }

    // Optional: Listen for responsive screen resize adjustments
    const handleResize = (e: MediaQueryListEvent) => {
      setShouldBypass(e.matches || reducedMotion);
    };

    const mobileQuery = window.matchMedia("(max-width: 768px)");
    mobileQuery.addEventListener("change", handleResize);

    return () => mobileQuery.removeEventListener("change", handleResize);
  }, []);

  if (shouldBypass) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        duration: 1.1,
        smoothWheel: true,
        wheelMultiplier: 0.95,
        // RULE 1: Disabled custom touch hijacking completely to preserve native browser inertial scrolling
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
