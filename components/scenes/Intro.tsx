"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RevealText from "../RevealText";
import TapedPhoto from "../TapedPhoto";
import SpinBadge from "../SpinBadge";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function Intro() {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tw = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 },
      });
      tw.to("[data-intro-band]", { xPercent: -22, ease: "none" }, 0)
        .to("[data-intro-photo]", { y: -46, ease: "none" }, 0)
        .to("[data-intro-sticker]", { rotate: 14, scale: 1.08, ease: "none" }, 0);
      return () => tw.kill();
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      id="about"
      ref={section}
      aria-labelledby="about-title"
      className="grain relative overflow-hidden bg-ink py-20 text-cream md:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-16 z-0 w-full overflow-hidden md:top-24"
      >
        <div
          data-intro-band
          className="display whitespace-nowrap text-[18vw] leading-none opacity-[0.13] will-change-transform"
          style={{ WebkitTextStroke: "1.5px #F6EBD9", color: "transparent" }}
        >
          SNACK COMPANY&nbsp;&nbsp;&nbsp;SNACK COMPANY
        </div>
      </div>

      <div className="edge relative z-10">
        <div className="flex items-center justify-between border-b border-cream/15 pb-4">
          <p className="kicker text-cream/45">( 01 — Sino kami )</p>
          <p className="kicker hidden text-cream/45 sm:block">Aling Tinay Peanut Store</p>
        </div>

        <RevealText
          className="mt-12 md:mt-16"
          stagger={0.1}
          lines={[
            <>Si Aling Tinay</>,
            <>
              ang sagot sa <span className="text-chili">kain-kain</span>
            </>,
            <>moments mo.</>,
          ]}
        />

        <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-12 md:items-end">
          <div className="md:col-span-4">
            <RevealText
              className="text-[15px] leading-relaxed text-cream/70"
              stagger={0.06}
              lines={[
                <>Walang magic dito. Mani na pinipili isa-isa,</>,
                <>prinitong mabagal, tinimpla ng saktong alat.</>,
                <>Pagbukas mo ng supot, amoy prito agad.</>,
              ]}
            />
          </div>

          <div className="relative md:col-span-5 md:col-start-8">
            <div
              data-intro-photo
              className="relative z-10 mx-auto w-[86%] will-change-transform sm:w-[68%] md:w-full"
            >
              <TapedPhoto
                src="/images/storefront.webp"
                alt="A small neighborhood sari-sari store with shelves of snacks at golden hour"
                caption="Ang kanto namin"
                rotate={2.5}
                ratio="wide"
                sizes="(max-width: 768px) 80vw, 460px"
              />
              <p className="mt-4 text-[12px] leading-relaxed text-cream/50">
                Simpleng bilihan lang. Pero ang bawat supot, pinag-isipan kung paano ka
                mapapangiti pag-uwi.
              </p>
            </div>

            <div data-intro-sticker className="absolute -left-3 -top-10 z-20 hidden sm:block">
              <SpinBadge
                className="h-24 w-24 md:h-28 md:w-28"
                text="SIMPLENG SARAP • KANTO VIBES • "
                bg="#F2B705"
                center={<circle cx="100" cy="100" r="7" fill="#1A1210" />}
              />
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-cream/15 pt-8 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-[46ch] text-[clamp(18px,2vw,24px)] font-medium leading-[1.25] text-cream/90">
            Simula sa simpleng bilihan sa kanto, isa lang ang panuntunan: kung hindi
            masarap, hindi ibebenta.
          </p>
          <p className="max-w-[34ch] text-[12px] leading-relaxed text-cream/50">
            Kaya kung naubos mo ang isang supot sa isang upuan — normal lang &rsquo;yon.
            Kasama sa sistema.
          </p>
        </div>
      </div>
    </section>
  );
}
