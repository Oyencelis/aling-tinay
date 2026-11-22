"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NextLabel from "../NextLabel";
import SpinBadge from "../SpinBadge";
import { Peanut } from "../characters/Characters";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export type FeaturedSceneData = {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  titleSize: string;
  /** Size of the outlined echo behind the title. Defaults to titleSize. */
  echoSize?: string;
  tagline: string;
  body: string;
  photo: string;
  photoAlt: string;
  tags: string[];
  callouts: { text: string; className: string; arrow: "left" | "right" | "down" }[];
  next: { href: string; label: string };
  bg: string;
  fg: string;
  accent: string;
  badgeBg: string;
  badgeFg: string;
  price: string;
  weight: string;
};

function CalloutArrow({ dir, color }: { dir: "left" | "right" | "down"; color: string }) {
  const transforms = {
    left: "rotate(180 24 12)",
    right: "",
    down: "rotate(90 24 12)",
  } as const;
  return (
    <svg viewBox="0 0 48 24" className="h-4 w-8 shrink-0" fill="none" aria-hidden="true">
      <g transform={transforms[dir]}>
        <path d="M2 12h40" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <path d="M36 6l7 6-7 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

export default function FeaturedScene({ data }: { data: FeaturedSceneData }) {
  const section = useRef<HTMLElement>(null);
  const { fg, bg } = data;

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const mm = gsap.matchMedia();

    // Reveals use IntersectionObserver instead of ScrollTrigger: if a trigger
    // ever fails to fire, content would be stranded at opacity 0.
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const covers = Array.from(el.querySelectorAll<HTMLElement>("[data-fs-img]"));
      const coverIO = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            coverIO.unobserve(entry.target);
            gsap.fromTo(
              entry.target,
              { scale: 1.16, clipPath: "inset(0% 0% 100% 0%)" },
              { scale: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "power3.out" }
            );
          });
        },
        { threshold: 0.12 }
      );
      covers.forEach((cover) => coverIO.observe(cover));

      const mobileEls =
        window.innerWidth < 768 ? Array.from(el.querySelectorAll<HTMLElement>("[data-fs-m]")) : [];
      let mobileIO: IntersectionObserver | undefined;
      if (mobileEls.length) {
        gsap.set(mobileEls, { opacity: 0, y: 28 });
        mobileIO = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              mobileIO?.unobserve(entry.target);
              gsap.to(entry.target, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" });
            });
          },
          { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
        );
        mobileEls.forEach((item) => mobileIO?.observe(item));
      }

      return () => {
        coverIO.disconnect();
        mobileIO?.disconnect();
      };
    });

    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      // Scoped to this section: a global selector would let each scene drive the
      // other scene's elements (both scenes share the same attributes).
      const title = el.querySelector<HTMLElement>("[data-fs-title]");
      const echo = el.querySelector<HTMLElement>("[data-fs-echo]");
      const photo = el.querySelector<HTMLElement>("[data-fs-photo]");
      const side = el.querySelector<HTMLElement>("[data-fs-side]");
      const callouts = Array.from(el.querySelectorAll<HTMLElement>("[data-fs-callout]"));
      const price = el.querySelector<HTMLElement>("[data-fs-price]");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=120%",
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(title, { xPercent: -7, ease: "none" }, 0)
        .to(echo, { xPercent: -18, opacity: 0.35, ease: "none" }, 0)
        .to(photo, { yPercent: -5, ease: "none" }, 0)
        .to(side, { yPercent: -8, rotate: 8, ease: "none" }, 0)
        .from(callouts, { y: 24, stagger: 0.12, ease: "power2.out" }, 0.06)
        .from(price, { y: 20, rotate: -16, ease: "power2.out" }, 0.16);

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });

    mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const bits = Array.from(el.querySelectorAll<HTMLElement>("[data-fs-bit]"));
      const setters = bits.map((bit) => ({
        x: gsap.quickTo(bit, "x", { duration: 1.2, ease: "power2.out" }),
        y: gsap.quickTo(bit, "y", { duration: 1.2, ease: "power2.out" }),
        depth: Number(bit.dataset.depth ?? 24),
      }));
      const onMove = (event: PointerEvent) => {
        const nx = event.clientX / window.innerWidth - 0.5;
        const ny = event.clientY / window.innerHeight - 0.5;
        setters.forEach((s) => {
          s.x(nx * s.depth);
          s.y(ny * s.depth);
        });
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      return () => window.removeEventListener("pointermove", onMove);
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id={data.id}
      ref={section}
      aria-labelledby={`${data.id}-title`}
      className="relative isolate overflow-hidden"
      style={{ backgroundColor: bg, color: fg }}
    >
      <div className="relative flex min-h-[100svh] flex-col px-[var(--edge)] pb-4 pt-5 md:pt-[calc(var(--header-h)+14px)]">
        <div className="relative z-40 flex items-center justify-between gap-3 border-b border-current/25 pb-3">
          <p className="kicker opacity-60">( {data.index} )</p>
          <p className="kicker hidden opacity-60 md:block">{data.eyebrow}</p>
          <p className="kicker opacity-60">Bagong luto</p>
        </div>

        <div className="relative flex-1">
          {/* Full-bleed product photograph, desktop */}
          <figure
            data-fs-photo
            className="absolute top-0 z-10 hidden h-full overflow-hidden border-l-[3px] border-current/70 md:block"
            style={{ right: "calc(var(--edge) * -1)", width: "calc(44% + var(--edge))" }}
          >
            <div data-fs-img className="relative h-full w-full will-change-transform">
              <Image
                src={data.photo}
                alt={data.photoAlt}
                fill
                sizes="(min-width: 768px) 46vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="absolute bottom-5 left-5 z-10 flex items-center gap-3 border-2 border-ink bg-cream px-3 py-2 text-[9px] font-bold uppercase tracking-[0.18em] text-ink shadow-[3px_4px_0_0_#1A1210]">
              <span>{data.title} · {data.weight}</span>
              <span className="text-chili">{data.price}</span>
            </figcaption>
          </figure>

          {/* Outlined echo of the product name */}
          <span
            data-fs-echo
            aria-hidden="true"
            className="display pointer-events-none absolute left-0 top-[11%] z-0 hidden whitespace-nowrap leading-[0.78] opacity-25 will-change-transform md:block"
            style={{
              fontSize: data.echoSize ?? data.titleSize,
              WebkitTextStroke: `2px ${fg}`,
              color: "transparent",
            }}
          >
            {data.title}
          </span>

          <h2
            id={`${data.id}-title`}
            data-fs-title
            data-fs-m
            className="display relative z-20 mt-6 will-change-transform md:absolute md:left-0 md:top-[8%] md:mt-0"
            style={{ fontSize: data.titleSize }}
          >
            {data.title}
          </h2>

          <div data-fs-side className="absolute right-[41%] top-[46%] z-30 hidden md:block">
            <SpinBadge
              className="h-24 w-24"
              text="FRESH • CRUNCHY • SULIT • "
              bg={data.badgeBg}
              fg={data.badgeFg}
              center={<circle cx="100" cy="100" r="7" fill={data.badgeFg} />}
            />
          </div>

          {/* Floating mascot bits */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 hidden md:block">
            <span data-fs-bit data-depth={30} className="absolute left-[38%] top-[24%] opacity-80">
              <Peanut className="h-8 w-8 rotate-[18deg]" />
            </span>
            <span data-fs-bit data-depth={48} className="absolute left-[30%] top-[66%] opacity-70">
              <Peanut className="h-5 w-5 -rotate-12" />
            </span>
            <span data-fs-bit data-depth={18} className="absolute left-[49%] top-[80%] rotate-[42deg] opacity-60">
              <Peanut className="h-6 w-6" />
            </span>
          </div>

          {/* Price tag pinned to the photo edge */}
          <div
            data-fs-price
            className="absolute left-[52%] top-[14%] z-30 hidden rotate-[-8deg] border-2 border-ink bg-corn px-3 py-2 text-ink shadow-[3px_4px_0_0_#1A1210] md:block"
          >
            <span className="absolute left-1.5 top-1.5 h-2 w-2 rounded-full border border-ink/40" aria-hidden="true" />
            <span className="block pl-3 text-[8px] font-bold uppercase tracking-[0.16em] text-brown/60">
              {data.title} · {data.weight}
            </span>
            <span className="mt-1 block pl-3 text-[13px] font-bold tabular-nums">{data.price}</span>
          </div>

          {/* Train of crunch callouts */}
          {data.callouts.map((callout, i) => (
            <div
              key={callout.text}
              data-fs-callout
              className={`absolute z-30 hidden items-center gap-2 md:flex ${callout.className}`}
              style={{ color: fg }}
            >
              {callout.arrow === "left" && <CalloutArrow dir="left" color={fg} />}
              <span className="whitespace-nowrap border-b-2 border-current pb-0.5 text-[11px] font-bold uppercase tracking-[0.14em]">
                {callout.text}
              </span>
              {callout.arrow === "right" && <CalloutArrow dir="right" color={fg} />}
              {callout.arrow === "down" && <CalloutArrow dir="down" color={fg} />}
              <span className="sr-only">{`Callout ${i + 1}`}</span>
            </div>
          ))}

          {/* Mobile photo */}
          <figure
            data-fs-m
            className="relative z-10 mt-7 w-full rotate-[-1.5deg] border-2 border-current bg-cream p-2 md:hidden"
            style={{ boxShadow: `7px 8px 0 0 ${data.accent}` }}
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={data.photo}
                alt={data.photoAlt}
                fill
                sizes="90vw"
                className="object-cover"
              />
            </div>
            <figcaption className="flex items-center justify-between px-1 pt-2 text-[9px] font-bold uppercase tracking-[0.18em] text-ink/70">
              <span>{data.title} · {data.weight}</span>
              <span>{data.price}</span>
            </figcaption>
          </figure>

          {/* Copy, in flow on mobile and pinned left on desktop */}
          <div
            data-fs-m
            className="relative z-20 mt-7 max-w-[38ch] md:absolute md:bottom-[3%] md:left-0 md:mt-0 md:max-w-[30ch]"
          >
            <p className="text-[clamp(21px,2.2vw,31px)] font-medium leading-[1.12] tracking-[-0.015em]">
              {data.tagline}
            </p>
            <p className="mt-3 max-w-[36ch] text-[12.5px] leading-relaxed opacity-65">{data.body}</p>
            <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${data.title} variants`}>
              {data.tags.map((tag) => (
                <li
                  key={tag}
                  className="border border-current/50 px-2.5 py-1 text-[9.5px] font-bold uppercase tracking-[0.16em]"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>

          <ul data-fs-m className="mt-5 flex flex-wrap gap-x-4 gap-y-2 md:hidden">
            {data.callouts.map((callout) => (
              <li
                key={callout.text}
                className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.12em] opacity-70"
              >
                <svg viewBox="0 0 12 12" className="h-2 w-2" aria-hidden="true">
                  <circle cx="6" cy="6" r="4" fill="currentColor" />
                </svg>
                {callout.text}
              </li>
            ))}
          </ul>
        </div>

        <div
          data-fs-m
          className="relative z-40 mt-7 flex items-end justify-between gap-4 border-t border-current/25 pt-4"
        >
          <p className="hidden max-w-[24ch] text-[10px] uppercase leading-relaxed tracking-[0.16em] opacity-50 sm:block">
            {data.eyebrow}
          </p>
          <NextLabel href={data.next.href} label={data.next.label} className="ml-auto" />
        </div>
      </div>
    </section>
  );
}
