import type { CSSProperties, ElementType, ReactNode } from "react";
import { useInView } from "@/hooks/use-in-view";

type Props = { children: ReactNode; delay?: number; as?: ElementType; className?: string };

export function Reveal({ children, delay = 0, as: Tag = "div", className = "" }: Props) {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.12 });
  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      data-visible={inView}
      style={{ "--d": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
