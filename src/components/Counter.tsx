import { useEffect, useState } from "react";
import { prefersReducedMotion, useInView } from "@/hooks/use-in-view";

type Props = { value: number; suffix?: string; duration?: number; className?: string };

export function Counter({ value, suffix = "", duration = 1600, className }: Props) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.4 });
  const [display, setDisplay] = useState(value);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    setDisplay(0);
    setArmed(true);
  }, []);

  useEffect(() => {
    if (!armed || !inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [armed, inView, value, duration]);

  return (
    <span ref={ref} className={className} aria-label={`${value}${suffix}`}>
      <span aria-hidden="true">
        {display}
        {suffix}
      </span>
    </span>
  );
}
