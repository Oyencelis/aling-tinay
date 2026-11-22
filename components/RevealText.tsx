"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

type Props = {
  lines: React.ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
};

export default function RevealText({
  lines,
  className = "",
  lineClassName = "",
  delay = 0,
  stagger = 0.09,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const targets = el.querySelectorAll<HTMLElement>("[data-line-inner]");
      const tween = gsap.fromTo(
        targets,
        { yPercent: 120 },
        {
          yPercent: 0,
          duration: 1.05,
          ease: "power4.out",
          stagger,
          delay,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        }
      );
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });
    return () => mm.revert();
  }, [delay, stagger, lines]);

  return (
    <div ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className={`line-mask ${lineClassName}`}>
          <span data-line-inner className="block">
            {line}
          </span>
        </span>
      ))}
    </div>
  );
}
