"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { stats, statNote } from "@/data/site";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

function format(value: number, decimals = 0) {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export default function Stats() {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const values = gsap.utils.toArray<HTMLElement>("[data-stat-value]");
      const tweens = values.map((node) => {
        const target = Number(node.dataset.statValue ?? 0);
        const decimals = Number(node.dataset.statDecimals ?? 0);
        const counter = { v: 0 };
        return gsap.to(counter, {
          v: target,
          duration: 1.7,
          ease: "power2.out",
          onUpdate: () => {
            node.textContent = format(counter.v, decimals);
          },
          scrollTrigger: { trigger: node, start: "top 88%", once: true },
          onStart: () => {
            node.textContent = "0";
          },
        });
      });
      return () => tweens.forEach((t) => (t.scrollTrigger?.kill(), t.kill()));
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={section}
      aria-labelledby="stats-title"
      className="grain relative overflow-hidden bg-ink py-20 text-cream md:py-24"
    >
      <div className="edge">
        <div className="flex items-center justify-between border-b border-cream/20 pb-4">
          <p className="kicker text-cream/45">( 06 — Sa bilang )</p>
          <p className="kicker text-cream/45">Hindi chismis, totoong bilang</p>
        </div>

        <h2 id="stats-title" className="sr-only">
          Aling Tinay sa bilang
        </h2>

        <div className="mt-12 grid gap-y-10 md:grid-cols-12 md:gap-x-8">
          {stats.map((stat, i) => (
            <div
              key={stat.id}
              className={`relative flex flex-col justify-between gap-4 border-cream/20 ${
                i === 0
                  ? "md:col-span-5 md:pr-8"
                  : i === 1
                  ? "border-t pt-8 md:col-span-4 md:border-l md:border-t-0 md:pl-8 md:pt-0"
                  : "border-t pt-8 md:col-span-3 md:border-l md:border-t-0 md:pl-8 md:pt-0"
              }`}
            >
              <div className="flex items-start gap-2">
                <p className="display text-[clamp(58px,9vw,132px)] leading-[0.8] tabular-nums">
                  {stat.prefix}
                  <span
                    data-stat-value={stat.value}
                    data-stat-decimals={stat.decimals ?? 0}
                  >
                    {format(stat.value, stat.decimals ?? 0)}
                  </span>
                  <span className="text-chili">{stat.suffix}</span>
                </p>
                {stat.placeholder && (
                  <span className="mt-2 shrink-0 border border-cream/35 px-1.5 py-0.5 text-[7.5px] font-bold uppercase tracking-[0.14em] text-cream/50">
                    sample
                  </span>
                )}
              </div>
              <p className="max-w-[27ch] text-[12px] leading-relaxed text-cream/60">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-cream/20 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[62ch] text-[10.5px] leading-relaxed text-cream/40">
            {statNote}
          </p>
          <a
            href="#products"
            className="kicker shrink-0 text-cream/70 underline decoration-cream/30 underline-offset-4 transition-colors hover:text-corn"
            data-cursor="grow"
          >
            Bilangin mo mismo →
          </a>
        </div>
      </div>
    </section>
  );
}
