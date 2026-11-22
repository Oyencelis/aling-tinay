"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Character, type CharacterName } from "../characters/Characters";
import TapedPhoto from "../TapedPhoto";
import Ticker from "../Ticker";
import { site } from "@/data/site";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

type Critter = {
  name: CharacterName;
  pos: string;
  width: string;
  depth: number;
  z: string;
  duration: string;
  delay: string;
  rotate: number;
};

const critters: Critter[] = [
  {
    name: "peanut",
    pos: "left-[1%] top-[38%] sm:left-[4%] sm:top-[40%]",
    width: "clamp(52px, 8vw, 116px)",
    depth: 26,
    z: "z-30",
    duration: "5.4s",
    delay: "0s",
    rotate: -8,
  },
  {
    name: "corn",
    pos: "right-[4%] top-[16%] sm:right-[9%] sm:top-[14%]",
    width: "clamp(48px, 7vw, 104px)",
    depth: 34,
    z: "z-30",
    duration: "6.2s",
    delay: "0.6s",
    rotate: 10,
  },
  {
    name: "cashew",
    pos: "right-[26%] bottom-[8%] hidden sm:block",
    width: "clamp(48px, 6vw, 92px)",
    depth: 18,
    z: "z-10",
    duration: "5.8s",
    delay: "1.1s",
    rotate: 6,
  },
  {
    name: "banana",
    pos: "left-[2%] bottom-[16%] sm:left-[6%] sm:bottom-[20%]",
    width: "clamp(46px, 6.5vw, 100px)",
    depth: 40,
    z: "z-10",
    duration: "6.8s",
    delay: "0.3s",
    rotate: -12,
  },
  {
    name: "worm",
    pos: "right-[1%] bottom-[24%] sm:right-[3%] sm:bottom-[20%]",
    width: "clamp(60px, 9vw, 132px)",
    depth: 48,
    z: "z-30",
    duration: "5s",
    delay: "0.9s",
    rotate: 4,
  },
  {
    name: "chili",
    pos: "right-[38%] top-[4%] hidden md:block",
    width: "clamp(44px, 5vw, 78px)",
    depth: 14,
    z: "z-10",
    duration: "6s",
    delay: "1.4s",
    rotate: -6,
  },
];

const indents = ["0px", "clamp(0px, 7vw, 116px)", "clamp(0px, 1vw, 18px)"];

export default function Hero() {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const play = () => {
        gsap
          .timeline({ defaults: { ease: "power4.out" } })
          .from("[data-hero-line]", { yPercent: 118, duration: 1.05, stagger: 0.09 })
          .from("[data-hero-char]", { scale: 0, opacity: 0, duration: 0.65, stagger: 0.06, ease: "back.out(1.8)" }, 0.15)
          .from("[data-hero-fade]", { y: 18, opacity: 0, duration: 0.6, stagger: 0.07 }, 0.5)
          .from("[data-hero-sticker]", { scale: 0, rotate: -30, duration: 0.5, ease: "back.out(2.4)" }, 0.75)
          .from("[data-hero-photo]", { y: 34, rotate: 12, opacity: 0, duration: 0.8 }, 0.55);
      };

      if (document.documentElement.dataset.loaded === "true") play();
      else window.addEventListener("loader:done", play, { once: true });

      // Scrolling out of the hero: type peels away, mascots scatter at different depths.
      const exit = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: 0.55,
        },
      });
      exit
        .to("[data-hero-line]", { yPercent: (i) => -55 - i * 16, ease: "none" }, 0)
        .to(
          "[data-hero-char]",
          {
            y: (i, target) => -(55 + Number((target as HTMLElement).dataset.depth ?? 20) * 2.4),
            x: (i) => (i % 2 === 0 ? -46 : 46),
            rotate: (i) => (i % 2 === 0 ? -16 : 16),
            ease: "none",
          },
          0
        )
        .to("[data-hero-photo]", { y: 110, rotate: 16, ease: "none" }, 0)
        .to("[data-hero-sticker]", { scale: 1.35, rotate: 14, ease: "none" }, 0)
        .to("[data-hero-bottom]", { y: 18, opacity: 0, ease: "none" }, 0)
        .to("[data-hero-ticker]", { opacity: 0.15, ease: "none" }, 0);

      return () => {
        window.removeEventListener("loader:done", play);
        exit.scrollTrigger?.kill();
        exit.kill();
      };
    });

    // Desktop-only cursor parallax on a nested layer so it never fights the float loop.
    mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const layers = gsap.utils.toArray<HTMLElement>("[data-hero-parallax]");
      const setters = layers.map((layer) => ({
        x: gsap.quickTo(layer, "x", { duration: 1.1, ease: "power2.out" }),
        y: gsap.quickTo(layer, "y", { duration: 1.1, ease: "power2.out" }),
        depth: Number(layer.dataset.depth ?? 20),
      }));

      const onMove = (e: PointerEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        setters.forEach((s) => {
          s.x(nx * s.depth);
          s.y(ny * s.depth);
        });
      };
      const onLeave = () => setters.forEach((s) => (s.x(0), s.y(0)));

      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerleave", onLeave);
      return () => {
        window.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerleave", onLeave);
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="home"
      ref={section}
      aria-label="Aling Tinay Peanut Store"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-cream pb-[34px] pt-[var(--header-h)] text-ink"
    >
      <div className="edge relative z-20 flex items-center justify-between gap-4 border-b border-ink/10 py-3.5">
        <p className="kicker text-brown/60">( Meryenda supply, araw-araw )</p>
        <p className="kicker hidden text-brown/60 sm:block">Pritong mani · Cornick · At iba pa</p>
      </div>

      <div className="edge relative flex flex-1 items-center py-6">
        {critters.map((c) => (
          <div
            key={c.name}
            aria-hidden="true"
            className={`pointer-events-none absolute ${c.pos} ${c.z}`}
            data-hero-char
            data-depth={c.depth}
            style={{ width: c.width }}
          >
            <div data-hero-parallax data-depth={c.depth}>
              <div
                className="floaty"
                style={
                  {
                    "--float-dur": c.duration,
                    "--float-delay": c.delay,
                    "--float-rot": `${c.rotate}deg`,
                  } as CSSProperties
                }
              >
                <Character
                  name={c.name}
                  className="h-auto w-full drop-shadow-[3px_4px_0_rgba(26,18,16,0.16)]"
                />
              </div>
            </div>
          </div>
        ))}

        <h1 className="display relative z-20 w-full text-[clamp(58px,15vw,176px)]">
          {site.hero.lines.map((line, i) => (
            <span key={line} className="line-mask block">
              <span
                data-hero-line
                className={`block ${
                  i === 1 ? "text-chili" : i === 2 ? "text-ink/95" : ""
                }`}
                style={{
                  marginLeft: indents[i],
                  WebkitTextStroke: i === 2 ? "2.5px #1A1210" : undefined,
                  color: i === 2 ? "transparent" : undefined,
                }}
              >
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div
          aria-hidden="true"
          className="absolute right-[4%] top-[30%] z-30 hidden rotate-[-9deg] sm:block"
        >
          <div data-hero-sticker className="sticker border-ink bg-corn px-3 py-1.5">
            <span className="display text-[clamp(15px,1.5vw,22px)]">Sulit!</span>
          </div>
        </div>

        <div
          data-hero-photo
          className="absolute bottom-[2%] right-[16%] z-20 hidden w-[196px] lg:block xl:w-[224px]"
        >
          <TapedPhoto
            src="/images/hands-snack.webp"
            alt="Two hands passing a paper bag of peanuts over a wooden table"
            caption="Bagong luto"
            rotate={4}
            ratio="wide"
            priority
            sizes="224px"
          />
        </div>
      </div>

      <div
        data-hero-bottom
        className="edge relative z-20 flex flex-col gap-6 pb-3 pt-2 sm:flex-row sm:items-end sm:justify-between"
      >
        <div className="max-w-[34ch]" data-hero-fade>
          <p className="text-[clamp(18px,2.2vw,27px)] font-medium leading-[1.15] tracking-[-0.01em]">
            {site.hero.tagalog}
          </p>
          <p className="mt-2 text-[12px] leading-relaxed text-brown/60">{site.hero.note}</p>
        </div>

        <a
          href="#about"
          className="group flex items-center gap-3 self-start sm:self-auto"
          data-hero-fade
          data-cursor="grow"
        >
          <span className="kicker text-brown/55">Scroll</span>
          <span className="relative block h-12 w-px bg-ink/25" aria-hidden="true">
            <span className="scroll-dot absolute -left-[2.5px] top-0 block h-1.5 w-1.5 rounded-full bg-chili" />
          </span>
          <span className="kicker text-brown/55">Pababa</span>
        </a>
      </div>

      <div data-hero-ticker className="absolute inset-x-0 bottom-0 z-20 border-t border-ink/15 bg-cream/90">
        <Ticker
          className="py-2 text-brown/55"
          speed={24}
          items={[
            "Bagong luto araw-araw",
            "Sulit",
            "Crunchy",
            "Pang-masa",
            "Pritong mani",
            "Cornick",
            "At iba pa",
          ]}
        />
      </div>
    </section>
  );
}
