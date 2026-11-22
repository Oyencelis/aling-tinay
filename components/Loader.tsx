"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Loader() {
  const [gone, setGone] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finish = () => {
      document.documentElement.classList.remove("is-locked");
      document.documentElement.dataset.loaded = "true";
      setGone(true);
      window.dispatchEvent(new CustomEvent("loader:done"));
    };

    if (reduced) {
      finish();
      return;
    }

    document.documentElement.classList.add("is-locked");
    const el = root.current;
    if (!el) {
      finish();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: finish });
      tl.set(el, { autoAlpha: 1 })
        .from("[data-loader-word] span", {
          yPercent: 115,
          duration: 0.6,
          stagger: 0.045,
          ease: "power4.out",
        })
        .from("[data-loader-tag]", { autoAlpha: 0, y: 10, duration: 0.4 }, 0.25)
        .from("[data-loader-crack]", { scaleX: 0, duration: 0.35, ease: "power2.out" }, 0.35)
        .to(
          "[data-loader-half='left']",
          { xPercent: -26, rotate: -9, duration: 0.5, ease: "back.in(1.6)" },
          0.75
        )
        .to(
          "[data-loader-half='right']",
          { xPercent: 26, rotate: 9, duration: 0.5, ease: "back.in(1.6)" },
          0.75
        )
        .to("[data-loader-face]", { autoAlpha: 1, duration: 0.25 }, 1.0)
        .to(el, { yPercent: -100, duration: 0.75, ease: "power4.inOut" }, 1.25)
        .to("[data-loader-inner]", { yPercent: 30, autoAlpha: 0, duration: 0.6 }, 1.25);
    }, el);

    const failsafe = window.setTimeout(() => {
      if (!document.documentElement.dataset.loaded) finish();
    }, 4200);

    return () => {
      window.clearTimeout(failsafe);
      ctx.revert();
      document.documentElement.classList.remove("is-locked");
    };
  }, []);

  if (gone) return null;

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-ink text-cream"
      style={{ visibility: "hidden" }}
    >
      <div data-loader-inner className="flex flex-col items-center">
        <div className="mb-8 flex items-center justify-center" aria-hidden="true">
          <svg viewBox="0 0 200 120" className="h-[92px] w-[160px]" fill="none">
            <g data-loader-half="left">
              <path
                d="M100 20c-18 0-26 12-38 12S40 22 28 30C14 39 12 63 26 76c12 11 25 6 36 12 11 6 26 10 38 8V20Z"
                fill="#F6EBD9"
                stroke="#F6EBD9"
                strokeWidth="4"
                strokeLinejoin="round"
              />
              <path d="M44 52c1 8 6 13 12 16" stroke="#1A1210" strokeWidth="4" strokeLinecap="round" />
            </g>
            <g data-loader-half="right">
              <path
                d="M100 20c18 0 26 12 38 12s22-10 34-2c14 9 16 33 2 46-12 11-25 6-36 12-11 6-26 10-38 8V20Z"
                fill="#F6EBD9"
                stroke="#F6EBD9"
                strokeWidth="4"
                strokeLinejoin="round"
              />
              <path d="M156 52c-1 8-6 13-12 16" stroke="#1A1210" strokeWidth="4" strokeLinecap="round" />
            </g>
            <g data-loader-face opacity="0">
              <circle cx="84" cy="58" r="4.5" fill="#1A1210" />
              <circle cx="116" cy="58" r="4.5" fill="#1A1210" />
              <path d="M90 74c6 6 14 6 20 0" stroke="#1A1210" strokeWidth="4" strokeLinecap="round" />
            </g>
            <path data-loader-crack d="M100 20v76" stroke="#D93A25" strokeWidth="3" strokeDasharray="5 7" />
          </svg>
        </div>

        <div data-loader-word className="display flex overflow-hidden text-[13vw] leading-[0.8] sm:text-[64px]">
          {"ALING TINAY".split("").map((char, i) => (
            <span key={i} className="inline-block">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>

        <p data-loader-tag className="kicker mt-4 text-cream/50">
          Sulit · Crunchy · Pang-masa
        </p>
      </div>

      <p className="absolute bottom-8 left-0 w-full text-center text-[10px] uppercase tracking-[0.3em] text-cream/35">
        Binubuksan ang supot…
      </p>
    </div>
  );
}
