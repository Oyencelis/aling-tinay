"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RevealText from "../RevealText";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    n: "01",
    title: "Pili",
    copy:
      "Isa-isang sinisuri ang mani at buto. Tanggal ang basag, tanggal ang maasim. Kung duda kami, hindi 'yon umaabot sa kawali.",
    photo: "/images/process-pili.webp",
    alt: "Hands sorting raw peanuts on a worn wooden table",
  },
  {
    n: "02",
    title: "Prito",
    copy:
      "Mabagal na pagprito sa kawali, bagong mantika kada batch. Walang shortcut, walang sunog. Rinig mo ang tamang tunog bago pa naming patayin ang apoy.",
    photo: "/images/process-roast.webp",
    alt: "Peanuts being dry roasted in a large wok over a flame",
  },
  {
    n: "03",
    title: "Pack",
    copy:
      "Lutuan sa umaga, supot sa hapon. Selyado at may tamang dami — hindi hangin ang binabayaran mo.",
    photo: "/images/process-pack.webp",
    alt: "Kraft paper snack bags being sealed by hand beside a metal scoop",
  },
  {
    n: "04",
    title: "Serve",
    copy:
      "Ibibigay sa'yo nang bagong luto. Kung mainit pa ang supot pagdating sa counter, tama 'yon. Ganun talaga dapat.",
    photo: "/images/process-serve.webp",
    alt: "Hands handing a paper bag of peanuts over a wooden store counter",
  },
];

function StepIcon({ index }: { index: number }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 48 48" className="h-9 w-9" aria-hidden="true">
      {index === 0 && (
        <g {...common}>
          <path d="M10 18h28l-3 18a4 4 0 0 1-4 3H17a4 4 0 0 1-4-3Z" />
          <path d="M16 18c0-5 3-9 8-9s8 4 8 9" />
          <circle cx="20" cy="28" r="1.4" fill="currentColor" />
          <circle cx="27" cy="33" r="1.4" fill="currentColor" />
          <circle cx="31" cy="26" r="1.4" fill="currentColor" />
        </g>
      )}
      {index === 1 && (
        <g {...common}>
          <path d="M8 30h32c0 6-5 10-11 10H19C13 40 8 36 8 30Z" />
          <path d="M16 30 19 18M32 30l-3-12" />
          <path d="M22 23c2-4 6-4 8 0" />
          <path d="M14 12c-2 3-2 5 0 8M22 8c-2 3-2 5 0 8M30 12c-2 3-2 5 0 8" />
        </g>
      )}
      {index === 2 && (
        <g {...common}>
          <path d="M13 20h22v16a4 4 0 0 1-4 4H17a4 4 0 0 1-4-4Z" />
          <path d="M13 20l4-8h14l4 8" />
          <path d="M19 20v14M24 20v14M29 20v14" />
        </g>
      )}
      {index === 3 && (
        <g {...common}>
          <path d="M9 28h20v6a5 5 0 0 1-5 5H14a5 5 0 0 1-5-5Z" />
          <path d="M29 30h5a4 4 0 0 1 0 8h-5" />
          <path d="M14 28V16a4 4 0 0 1 8 0v12" />
          <path d="M34 12c3 2 3 6 0 8" />
        </g>
      )}
    </svg>
  );
}

export default function Process() {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const rows = gsap.utils.toArray<HTMLElement>("[data-step-row]");
      const tweens = rows.map((row) => {
        const photo = row.querySelector("[data-step-photo]");
        return gsap.from(photo, {
          clipPath: "inset(0% 0% 100% 0%)",
          y: 22,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 88%", once: true },
        });
      });
      return () => tweens.forEach((t) => (t.scrollTrigger?.kill(), t.kill()));
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      id="crunchy"
      ref={section}
      aria-labelledby="crunchy-title"
      className="grain relative overflow-hidden bg-pandan py-20 text-cream md:py-28"
    >
      <div className="edge">
        <div className="flex items-center justify-between border-b border-cream/25 pb-4">
          <p className="kicker text-cream/55">( 04 — Paano )</p>
          <p className="kicker text-cream/55">Walang short-cut</p>
        </div>

        <RevealText
          className="display mt-10 text-[clamp(38px,7.6vw,110px)]"
          stagger={0.1}
          lines={[<>How we keep it</>, <>crunchy.</>]}
        />

        <div className="mt-10 grid gap-6 border-b border-cream/25 pb-8 md:grid-cols-12">
          <p className="max-w-[40ch] text-[13.5px] leading-relaxed text-cream/65 md:col-span-5">
            Apat na hakbang lang. Walang makina na nagmamadali, walang chemikalya
            na nagpapahaba ng shelf life. Ang haba ng tinatagal niya ay depende sa
            bilis ng pag-ubos mo.
          </p>
          <p className="kicker self-end text-cream/50 md:col-span-3 md:col-start-10 md:text-right">
            Apat na hakbang. Wala nang iba.
          </p>
        </div>

        <ol>
          {steps.map((step, i) => (
            <li
              key={step.n}
              data-step-row
              className="group border-b border-cream/25 transition-colors duration-300 hover:bg-cream hover:text-ink"
            >
              <div className="grid grid-cols-[auto_1fr] items-center gap-x-5 gap-y-4 py-6 transition-colors duration-300 sm:gap-x-8 md:grid-cols-[130px_1fr_240px] md:py-7">
                <div className="flex flex-col gap-2">
                  <span className="display text-[clamp(38px,5.4vw,82px)] leading-none opacity-30 transition-opacity duration-300 group-hover:text-pandan group-hover:opacity-100">
                    {step.n}
                  </span>
                  <span className="hidden opacity-50 transition-opacity duration-300 group-hover:opacity-90 md:block">
                    <StepIcon index={i} />
                  </span>
                </div>

                <div className="min-w-0">
                  <h3 className="display text-[clamp(24px,3.2vw,46px)]">{step.title}</h3>
                  <p className="mt-2 max-w-[48ch] text-[12.5px] leading-relaxed opacity-70">
                    {step.copy}
                  </p>
                </div>

                <div
                  data-step-photo
                  className="col-span-2 w-full max-w-[420px] overflow-hidden border-2 border-current/35 sm:col-span-1 md:col-start-3 md:w-[200px] md:justify-self-end"
                >
                  <div className="relative aspect-[16/10] md:aspect-[4/5]">
                    <Image
                      src={step.photo}
                      alt={step.alt}
                      fill
                      sizes="(max-width: 768px) 90vw, 200px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-[11px] leading-relaxed text-cream/50">
            May tanong sa ingredients? Tanungin si Aling Tinay. Sasagutin ka niya nang
            mahaba.
          </p>
          <a href="#products" className="btn-ink border-cream bg-transparent text-cream shadow-[4px_4px_0_0_#F6EBD9] hover:bg-cream hover:text-pandan" data-cursor="grow">
            Tingnan ang snacks
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
              <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
