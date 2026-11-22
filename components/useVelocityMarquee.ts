"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Drives a duplicated marquee track with GSAP's ticker and reads Lenis velocity,
 * so the ticker speeds up (and reacts) as the page is scrolled.
 * Falls back to a static row when reduced motion is requested.
 */
export function useVelocityMarquee<T extends HTMLElement>(
  reverse = false,
  baseSpeed = 55
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let half = el.scrollWidth / 2;
    let x = reverse ? -half : 0;
    let measured = false;

    const measure = () => {
      half = el.scrollWidth / 2;
      if (!measured) {
        x = reverse ? -half : 0;
        measured = true;
      }
    };
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);

    const dir = reverse ? 1 : -1;

    const tick = (_time: number, delta: number) => {
      const lenis = (window as unknown as { __lenis?: { velocity?: number } }).__lenis;
      const velocity = Math.abs(Number(lenis?.velocity ?? 0));
      const boost = Math.min(2.6, velocity * 0.02);
      x += dir * baseSpeed * (delta / 1000) * (1 + boost);
      if (half > 0) {
        if (x <= -half) x += half;
        else if (x > 0) x -= half;
      }
      el.style.transform = `translate3d(${x}px, 0, 0)`;
    };

    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      ro.disconnect();
    };
  }, [reverse, baseSpeed]);

  return ref;
}
