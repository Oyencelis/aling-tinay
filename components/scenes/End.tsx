"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Character, type CharacterName } from "../characters/Characters";
import { site } from "@/data/site";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const cast: { name: CharacterName; w: string; rot: number; delay: string }[] = [
  { name: "peanut", w: "clamp(44px, 7vw, 92px)", rot: -6, delay: "0s" },
  { name: "corn", w: "clamp(38px, 6vw, 80px)", rot: 5, delay: "0.2s" },
  { name: "cashew", w: "clamp(40px, 6.2vw, 84px)", rot: -3, delay: "0.4s" },
  { name: "banana", w: "clamp(42px, 6.6vw, 88px)", rot: 7, delay: "0.1s" },
  { name: "worm", w: "clamp(52px, 8vw, 108px)", rot: -4, delay: "0.3s" },
  { name: "chili", w: "clamp(36px, 5.4vw, 72px)", rot: 4, delay: "0.5s" },
];

export default function End() {
  const footer = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = footer.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tween = gsap.from("[data-end-char]", {
        yPercent: 55,
        xPercent: (i) => (i % 2 === 0 ? -22 : 18),
        rotate: (i) => (i % 2 === 0 ? -14 : 12),
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 72%", once: true },
      });
      const word = gsap.from("[data-end-word]", {
        yPercent: 18,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 62%", once: true },
      });
      return () => {
        tween.scrollTrigger?.kill();
        word.scrollTrigger?.kill();
        tween.kill();
        word.kill();
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <footer ref={footer} className="relative overflow-hidden bg-brown text-cream">
      <div className="edge pt-14 md:pt-16">
        <div className="flex items-center justify-between border-b border-cream/20 pb-4">
          <p className="kicker text-cream/45">( 08 — Paalam )</p>
          <p className="kicker text-cream/45">Uwi ka nang may supot</p>
        </div>

        <div className="mt-8 flex items-end justify-between gap-2 sm:gap-6" aria-hidden="true">
          {cast.map((c) => (
            <div
              key={c.name}
              data-end-char
              className="floaty"
              style={
                {
                  width: c.w,
                  "--float-dur": "4.6s",
                  "--float-delay": c.delay,
                  "--float-rot": `${c.rot}deg`,
                } as CSSProperties
              }
            >
              <Character name={c.name} className="wave h-auto w-full" />
            </div>
          ))}
        </div>

        <div className="relative mt-6 border-t border-cream/20 pt-8">
          <p data-end-word className="display text-[clamp(46px,14vw,196px)] leading-[0.8]">
            Aling Tinay
          </p>
          <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
            <p className="display text-[clamp(16px,2vw,26px)] text-corn">Peanut Store</p>
            <p className="max-w-[30ch] text-[13px] leading-snug text-cream/65">
              {site.tagline} Sana masarap ang meryenda mo.
            </p>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-cream/20 py-10 md:grid-cols-4">
          {site.footer.columns.map((col) => (
            <div key={col.title}>
              <p className="kicker text-cream/40">{col.title}</p>
              <ul className="mt-3 space-y-1.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[13px] text-cream/80 underline-offset-4 hover:text-corn hover:underline"
                      data-cursor="grow"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="kicker text-cream/40">Saan kami</p>
            <p className="mt-3 text-[13px] leading-relaxed text-cream/80">
              {site.address.line1}
              <br />
              {site.address.line2}
              <br />
              {site.address.region}
            </p>
            <a
              href="#visit"
              className="mt-3 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-corn"
              data-cursor="grow"
            >
              Tingnan ang mapa
              <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" aria-hidden="true">
                <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-cream/20 py-6 text-[9.5px] font-bold uppercase tracking-[0.18em] text-cream/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. Lahat ng sarap, karapat-dapat.</p>
          <div className="flex items-center gap-5">
            <span className="normal-case tracking-normal text-cream/35">
              Gawa nang may pagmamahal sa kanto.
            </span>
            <button
              type="button"
              onClick={() => {
                const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number, o?: object) => void } }).__lenis;
                if (lenis) lenis.scrollTo(0, { duration: 1.6 });
                else window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex items-center gap-1.5 uppercase tracking-[0.18em] text-cream/70 hover:text-corn"
              data-cursor="grow"
            >
              Balik sa taas
              <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" aria-hidden="true">
                <path d="M8 14V2M3 7l5-5 5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
