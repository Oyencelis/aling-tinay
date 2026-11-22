"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const el = dot.current;
    if (!el) return;

    document.body.classList.add("custom-cursor");
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let scale = 1;
    let targetScale = 1;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      const interactive = (e.target as HTMLElement | null)?.closest?.(
        'a, button, [role="button"], input, textarea, select, label'
      );
      targetScale = interactive ? 1.85 : 1;
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };
    const onEnter = () => {
      el.style.opacity = "1";
    };

    const loop = () => {
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      scale += (targetScale - scale) * 0.15;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale})`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.body.classList.remove("custom-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={dot}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[95] h-7 w-7 opacity-0 transition-opacity duration-300"
    >
      <svg viewBox="0 0 100 100" fill="none" className="h-full w-full">
        <path
          d="M50 10c19 0 26 11 26 24 0 8-4 12-4 16s4 8 4 16c0 13-7 24-26 24S24 79 24 66c0-8 4-12 4-16s-4-8-4-16C24 21 31 10 50 10Z"
          fill="#3B2314"
          stroke="#D93A25"
          strokeWidth="7"
        />
        <circle cx="42" cy="46" r="4" fill="#F6EBD9" />
        <circle cx="58" cy="46" r="4" fill="#F6EBD9" />
      </svg>
    </div>
  );
}
