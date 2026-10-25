import { useCallback, useRef } from "react";
import type { MouseEvent, ReactNode } from "react";

/**
 * Lightweight pointer-tracked 3D tilt (pure CSS transforms, no WebGL).
 * Desktop pointers only, disabled for reduced-motion users and touch
 * devices, so it stays fast on mobile. The wrapper keeps whatever
 * className it is given, so existing layouts are untouched.
 */
type TiltProps = {
  children: ReactNode;
  className?: string;
  /** Maximum tilt in degrees on each axis. */
  max?: number;
};

export default function Tilt({ children, className = "", max = 5 }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);

  const canTilt = useCallback(() => {
    if (typeof window === "undefined") return false;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return false;
    if (!window.matchMedia("(pointer: fine)").matches) return false;
    return true;
  }, []);

  const onMove = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el || !canTilt()) return;
      const rect = el.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      el.style.setProperty("--tilt-x", `${(-py * max).toFixed(2)}deg`);
      el.style.setProperty("--tilt-y", `${(px * max).toFixed(2)}deg`);
    },
    [canTilt, max]
  );

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--tilt-x", "0deg");
    el.style.setProperty("--tilt-y", "0deg");
  }, []);

  return (
    <div
      ref={ref}
      className={`tilt-3d ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}
