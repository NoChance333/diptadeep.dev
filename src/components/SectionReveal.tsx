import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function SectionReveal({ children, className = "", id }: Props) {
  return (
    /* RULE 4: Enforcing transform-gpu at the structural root promotes the entire section surface 
       to a hardware-accelerated compositor layer, keeping nested scrolls and animations perfectly fluid. */
    <section 
      id={id} 
      className={`transform-gpu will-change-transform ${className}`}
    >
      {children}
    </section>
  );
}