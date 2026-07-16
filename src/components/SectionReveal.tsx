import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function SectionReveal({ children, className = "", id }: Props) {
  return (
    <section id={id} className={className}>
      {children}
    </section>
  );
}